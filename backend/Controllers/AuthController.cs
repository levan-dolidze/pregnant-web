using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PregnantWeb.Data;
using PregnantWeb.Models;
using PregnantWeb.Services;

namespace PregnantWeb.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IConfiguration _config;
        private readonly IEmailService _emailService;
        private readonly PasswordHasher<User> _passwordHasher = new();

        public AuthController(AppDbContext db, IConfiguration config, IEmailService emailService)
        {
            _db = db;
            _config = config;
            _emailService = emailService;
        }

        [HttpPost("UserRegister")]
        public async Task<IActionResult> UserRegister([FromBody] UserRegister request)
        {
            if (request.Password != request.ConfirmPassword)
            {
                return BadRequest("Password and confirmation do not match.");
            }

            var emailTaken = await _db.Users.AnyAsync(u => u.Email == request.Email);
            var personalNumberTaken = await _db.Users.AnyAsync(u => u.PersonalNumber == request.PersonalNumber);

            if (emailTaken|| personalNumberTaken)
            {
                return BadRequest(new
                {
                    status = 400,
                    description = "მომხმარებელი უკვე რეგისტრირებულია"
                });
            }

            var user = new User
            {
                PersonalNumber = request.PersonalNumber,
                MobileNumber = request.MobileNumber,
                Email = request.Email,
                Role = "user"
            };

            // Hash the password before it ever touches the database.
            user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok(new { userId = user.Id });
        }

        [HttpPost("PasswordRecovery")]
        public async Task<ActionResult<ApiResponseBase<object>>> PasswordRecovery([FromBody] PasswordRecoveryRequest request)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.PersonalNumber == request.PersonalNumber);

            if (user is null)
            {
                return NotFound(new ApiResponseBase<object>
                {
                    Success = false,
                    Result = new HttpResult { Code = 404, Description = "მომხმარებელი ვერ მოიძებნა" },
                    Loaded = true
                });
            }

            var tempPassword = Random.Shared.Next(0, 1_000_000).ToString("D6");


            try
            {
                await _emailService.SendAsync(
                    user.Email,
                    "პაროლის აღდგენა",
                    $"თქვენი დროებითი პაროლია: {tempPassword}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send password recovery email: {ex.Message}");
                return StatusCode(500, new ApiResponseBase<object>
                {
                    Success = false,
                    Result = new HttpResult { Code = 500, Description = "ვერ მოხერხდა ელ-ფოსტის გაგზავნა" },
                    Loaded = true
                });
            }

            user.PasswordHash = _passwordHasher.HashPassword(user, tempPassword);
            await _db.SaveChangesAsync();

            return Ok(new ApiResponseBase<object>
            {
                Success = true,
                Result = new HttpResult { Code = 200, Description = "დროებითი პაროლი გამოგზავნილია თქვენს ელ-ფოსტაზე" },
                Loaded = true
            });
        }

        [HttpPost("ConfirmPasswordChange")]
        public async Task<ActionResult<ApiResponseBase<object>>> ConfirmPasswordChange([FromBody] ConfirmPasswordChangeRequest request)
        {
            if (request.NewPassword != request.ConfirmNewPassword)
            {
                return BadRequest(new ApiResponseBase<object>
                {
                    Success = false,
                    Result = new HttpResult { Code = 400, Description = "პაროლი და დადასტურება არ ემთხვევა" },
                    Loaded = true
                });
            }

            var user = await _db.Users.FirstOrDefaultAsync(u => u.PersonalNumber == request.PersonalNumber);

            if (user is null)
            {
                return NotFound(new ApiResponseBase<object>
                {
                    Success = false,
                    Result = new HttpResult { Code = 404, Description = "მომხმარებელი ვერ მოიძებნა" },
                    Loaded = true
                });
            }

            // The temp password from PasswordRecovery is currently stored as
            // the user's PasswordHash, so verifying it here proves the caller
            // actually received the email before letting them set a new one.
            var verification = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.TemporaryPassword);
            if (verification == PasswordVerificationResult.Failed)
            {
                return Unauthorized(new ApiResponseBase<object>
                {
                    Success = false,
                    Result = new HttpResult { Code = 401, Description = "დროებითი პაროლი არასწორია" },
                    Loaded = true
                });
            }

            // Overwriting PasswordHash here is what invalidates the temp password.
            user.PasswordHash = _passwordHasher.HashPassword(user, request.NewPassword);
            await _db.SaveChangesAsync();

            return Ok(new ApiResponseBase<object>
            {
                Success = true,
                Result = new HttpResult { Code = 200, Description = "პაროლი წარმატებით შეიცვალა" },
                Loaded = true
            });
        }

        [HttpPost("Login")]
        public async Task<ActionResult<ApiResponseBase<AuthTokenResponse>>> Login([FromBody] Login request)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.PersonalNumber == request.Username);

            if (user is null)
            {
                return Unauthorized(new ApiResponseBase<AuthTokenResponse>
                {
                    Success = false,
                    Result = new HttpResult { Code = 401, Description = "მომხმარებელი ვერ მოიძებნა" },
                    Loaded = true
                });
            }

            var verification = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
            if (verification == PasswordVerificationResult.Failed)
            {
                return Unauthorized(new ApiResponseBase<AuthTokenResponse>
                {
                    Success = false,
                    Result = new HttpResult { Code = 401, Description = "პაროლი არასწორია" },
                    Loaded = true
                });
            }

            var expiresInSeconds = _config.GetValue<int>("Jwt:ExpiresInSeconds");
            var role = user.Role ?? "user";
            var token = GenerateJwtToken(user, role, expiresInSeconds);

            var response = new ApiResponseBase<AuthTokenResponse>
            {
                Success = true,
                Result = new HttpResult { Code = 200, Description = "წარმატებული ავტორიზაცია" },
                Data = new AuthTokenResponse
                {
                    AccessToken = token,
                    ExpiresIn = expiresInSeconds,
                    User = new AuthUser { Id = user.Id, Role = role }
                },
                Loaded = true
            };

            return Ok(response);
        }

        // Role comes straight from the Users table (see Models/User.cs) - it is
        // never read from anything the client sends, so it can't be spoofed
        // by registering with a particular value; there is no such field on
        // any request DTO, and no endpoint lets a caller set their own Role.
        private string GenerateJwtToken(User user, string role, int expiresInSeconds)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("role", role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddSeconds(expiresInSeconds),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
