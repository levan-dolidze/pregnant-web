using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PregnantWeb.Data;
using PregnantWeb.Models;

namespace PregnantWeb.Controllers
{
    [ApiController]
    [Route("Pregnantportal/api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ProductsController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetPromo")]
        public async Task<ActionResult<List<CoursePromoSummary>>> GetPromo()
        {
            var promo = await _db.Promo.ToListAsync();
            return Ok(promo);
        }
    }
}
