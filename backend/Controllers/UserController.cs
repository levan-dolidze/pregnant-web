using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PregnantWeb.Data;
using PregnantWeb.Models;

namespace PregnantWeb.Controllers;

[ApiController]
[Route("Pregnantportal/api/[controller]")]
public class UserController : ControllerBase
{
    private readonly AppDbContext _db;

    public UserController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost("UserCheck")]
    public async Task<ActionResult<ApiResponseBase<object>>> UserCheck([FromBody] UserCheckRequest request)
    {
        var exists = await _db.Users.AnyAsync(u => u.PersonalNumber == request.User);

        if (!exists)
        {
            return NotFound(new ApiResponseBase<object>
            {
                Success = false,
                Result = new HttpResult { Code = 404, Description = "მომხმარებელი ვერ მოიძებნა" },
                Loaded = true
            });
        }

        return Ok(new ApiResponseBase<object>
        {
            Success = true,
            Result = new HttpResult { Code = 200, Description = "მომხმარებელი მოიძებნა" },
            Loaded = true
        });
    }

    [HttpGet("GetUsers")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<List<UserSummary>>> GetUsers()
    {
        var users = await _db.Users
            .OrderByDescending(u => u.CreatedAt)
            .Select(u => new UserSummary
            {
                Id = u.Id,
                PersonalNumber = u.PersonalNumber,
                MobileNumber = u.MobileNumber,
                Email = u.Email,
                Role = u.Role,
                CreatedAt = u.CreatedAt
            })
            .ToListAsync();

        return Ok(users);
    }
}
