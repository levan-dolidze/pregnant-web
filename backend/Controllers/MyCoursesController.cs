using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PregnantWeb.Data;
using PregnantWeb.Models;

namespace PregnantWeb.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MyCoursesController : ControllerBase
    {
        private readonly AppDbContext _db;

        public MyCoursesController(AppDbContext db)
        {
            _db = db;
        }

        [Authorize]
        [HttpGet("GetMyOrders")]
        public async Task<ActionResult<List<MyOrderSummary>>> GetMyOrders([FromQuery] int? id = null)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c =>
                c.Type == JwtRegisteredClaimNames.Sub || c.Type == ClaimTypes.NameIdentifier);

            if (userIdClaim is null || !int.TryParse(userIdClaim.Value, out var userId))
            {
                return Unauthorized();
            }

            // id, if sent, is validated against the authenticated user's own id
            // from the token - it is never trusted on its own. Asking for a
            // different id than your own token's is rejected outright, so this
            // cannot be used to read someone else's orders.
            if (id.HasValue && id.Value != userId)
            {
                return Forbid();
            }

            var orders = await (
                from order in _db.RegisterOrders
                where order.UserId == userId
                join promo in _db.Promo on order.ProductId equals promo.CourseId
                orderby order.CreatedAt descending
                select new MyOrderSummary
                {
                    OrderId = order.Id,
                    ProductId = order.ProductId,
                    CourseName = promo.CourseName,
                    Description = promo.Description,
                    LessonQty = promo.LessonQty,
                    Status = order.Status,
                    CreatedAt = order.CreatedAt
                }
            ).ToListAsync();

            return Ok(orders);
        }

        [Authorize]
        [HttpGet("GetCoursesMenu")]
        public async Task<ActionResult<List<CourseChapter>>> GetCoursesMenu([FromQuery] CourseId courseId)
        {
            var lessons = await _db.CourseLessons
                .Where(l => l.CourseId == courseId)
                .ToListAsync();

            var menu = lessons
                .GroupBy(l => l.Chapter)
                .Select(g => new CourseChapter
                {
                    Chapter = g.Key,
                    Sections = g
                        .OrderBy(l => l.SectionId)
                        .Select(l => new CourseSection { Id = l.SectionId, Name = l.SectionName })
                        .ToList()
                })
                .ToList();

            return Ok(menu);
        }

        [Authorize]
        [HttpGet("GetMyCourseBy")]
        public async Task<ActionResult<CourseLessonContent>> GetMyCourseBy([FromQuery] MyCourseByRequest request)
        {
            var lesson = await _db.CourseLessons.FirstOrDefaultAsync(l =>
                l.CourseId == request.CourseId && l.Chapter == request.Chapter && l.SectionId == request.Section);

            if (lesson == null)
            {
                return NotFound();
            }

            var content = new CourseLessonContent
            {
                CourseId = lesson.CourseId,
                Chapter = lesson.Chapter,
                Section = lesson.SectionId,
                Url = lesson.Url,
                Title = lesson.Title,
                Duration = lesson.Duration,
                TypeId = lesson.TypeId
            };

            return Ok(content);
        }
    }
}
