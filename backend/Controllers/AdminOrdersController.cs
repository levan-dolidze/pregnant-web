using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PregnantWeb.Data;
using PregnantWeb.Models;

namespace PregnantWeb.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Policy = "AdminOnly")]
public class AdminOrdersController : ControllerBase
{
    private readonly AppDbContext _db;

    public AdminOrdersController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<List<RegisterOrder>>> GetOrders([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var orders = await _db.RegisterOrders
            .OrderByDescending(o => o.CreatedAt)
            .Skip((Math.Max(page, 1) - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return Ok(orders);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<RegisterOrder>> GetOrderById(int id)
    {
        var order = await _db.RegisterOrders.FirstOrDefaultAsync(o => o.Id == id);

        if (order is null)
        {
            return NotFound();
        }

        return Ok(order);
    }

    [HttpPost("{id}/confirm")]
    public async Task<ActionResult<RegisterOrder>> ConfirmOrder(int id)
    {
        return await SetStatus(id, OrderStatus.Confirmed);
    }

    [HttpPost("{id}/reject")]
    public async Task<ActionResult<RegisterOrder>> RejectOrder(int id)
    {
        return await SetStatus(id, OrderStatus.Rejected);
    }

    private async Task<ActionResult<RegisterOrder>> SetStatus(int id, OrderStatus status)
    {
        var order = await _db.RegisterOrders.FirstOrDefaultAsync(o => o.Id == id);

        if (order is null)
        {
            return NotFound();
        }

        order.Status = status;
        await _db.SaveChangesAsync();

        return Ok(order);
    }
}
