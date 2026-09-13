using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PregnantWeb.Data;
using PregnantWeb.Models;
using PregnantWeb.Services;

namespace PregnantWeb.Controllers;

[ApiController]
[Route("Pregnantportal/api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IEmailService _emailService;
    private readonly IConfiguration _config;

    public ContactController(AppDbContext db, IEmailService emailService, IConfiguration config)
    {
        _db = db;
        _emailService = emailService;
        _config = config;
    }

    [HttpGet("GetContactInfo")]
    public async Task<ActionResult<ContactInfo>> GetContactInfo()
    {
        var info = await _db.ContactInfo.FirstOrDefaultAsync();
        if (info == null)
        {
            return NotFound();
        }

        return Ok(info);
    }

    [HttpPost("SendContactMessage")]
    public async Task<IActionResult> SendMessage([FromBody] SendMessage request)
    {
        var contactMessage = new ContactMessage
        {
            Message = request.Message,
            MobileNumber = request.MobileNumber,
        };

        _db.ContactMessages.Add(contactMessage);
        await _db.SaveChangesAsync();

        try
        {
            var ownerEmail = _config["Notifications:OwnerEmail"];
            if (!string.IsNullOrWhiteSpace(ownerEmail))
            {
                await _emailService.SendAsync(
                    ownerEmail,
                    "ახალი შეკითხვა ვებ გვერდიდან",
                    $"მობილური: {request.MobileNumber}\n\n მომხმარებლის შეკითხვა:\n{request.Message}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to send contact message notification email: {ex.Message}");
        }

        return Ok();
    }
}
