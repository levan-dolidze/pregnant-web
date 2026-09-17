using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PregnantWeb.Data;
using PregnantWeb.Models;
using PregnantWeb.Services;

namespace PregnantWeb.Controllers;

[ApiController]
[Route("Pregnantportal/api/[controller]")]
public class RegisterController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IEmailService _emailService;
    private readonly IConfiguration _config;

    public RegisterController(AppDbContext db, IEmailService emailService, IConfiguration config)
    {
        _db = db;
        _emailService = emailService;
        _config = config;
    }

    //[Authorize]
    [HttpPost("RegisterOrder")]
    public async Task<IActionResult> RegisterOrder([FromBody] Register request)
    {
        var userIdClaim = User.Claims.FirstOrDefault(c =>
            c.Type == JwtRegisteredClaimNames.Sub || c.Type == ClaimTypes.NameIdentifier);

        if (userIdClaim is null || !int.TryParse(userIdClaim.Value, out var userId))
        {
            return Unauthorized();
        }

        var payLinks = await _db.PayLinks.ToDictionaryAsync(p => p.ProductId, p => p.PaymentUrl);

        string paymentUrl;

        switch (request.ProductId)
        {
            case CourseId.PregnantOnline:
                paymentUrl = payLinks.GetValueOrDefault(nameof(CourseId.PregnantOnline));
                break;
            case CourseId.PregnantGuide:
                paymentUrl = payLinks.GetValueOrDefault(nameof(CourseId.PregnantGuide));
                break;
            default:
                return BadRequest(new { description = "Unknown product." });
        }

        if (string.IsNullOrEmpty(paymentUrl))
        {
            return BadRequest(new { description = "Payment link is not configured." });
        }

        var order = new RegisterOrder
        {
            SessionId = request.SessionId,
            UserName = request.UserName,
            UserLastName = request.UserLastName,
            Email = request.Email,
            MobileNumber = request.MobileNumber,
            ProductId = request.ProductId,
            PaymentUrl = paymentUrl,
            UserId = userId,
            Status = OrderStatus.Pending,
        };

        _db.RegisterOrders.Add(order);
        await _db.SaveChangesAsync();

        var orderNumber = order.Id.ToString("D5");

        try
        {
            await _emailService.SendAsync(
                request.Email,
                "ჩემი შეკვეთა",
                $"გამარჯობა {request.UserName},\n\nთქვენი შეკვეთა #{orderNumber} წარმატებით დარეგისტრირდა, გადახდისთვის ეწვიეთ ბმულს:\n{paymentUrl}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to send confirmation email: {ex.Message}");
        }

        try
        {
            var ownerEmail = _config["Notifications:OwnerEmail"];
            if (!string.IsNullOrWhiteSpace(ownerEmail))
            {
                var frontendBaseUrl = _config["App:FrontendBaseUrl"] ?? "http://localhost:4200";
                var orderDetailsUrl = $"{frontendBaseUrl}/admin/orders/{order.Id}";

                await _emailService.SendHtmlAsync(
                    ownerEmail,
                    "ახალი შეკვეთა",
                    $"<p>შეკვეთის ნომერი: {orderNumber}<br/>" +
                    $"მომხმარებელი: {WebUtility.HtmlEncode(request.UserName)} {WebUtility.HtmlEncode(request.UserLastName)}<br/>" +
                    $"პროდუქტი: {request.ProductId}<br/>" +
                    $"მობილური: {WebUtility.HtmlEncode(request.MobileNumber)}<br/>" +
                    $"Email: {WebUtility.HtmlEncode(request.Email)}</p>" +
                    $"<p><a href=\"{orderDetailsUrl}\">შეკვეთის დეტალების ნახვა</a></p>");
            }
        }
        catch (Exception ex)
        {
            // Don't fail the whole registration just because the owner notification couldn't be sent.
            Console.WriteLine($"Failed to send owner notification email: {ex.Message}");
        }

        // paymentUrl is still returned in the response, alongside being saved above.
        return Ok(new { paymentUrl });
    }
}
