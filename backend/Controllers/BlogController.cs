using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PregnantWeb.Data;
using PregnantWeb.Models;

namespace PregnantWeb.Controllers
{
    [ApiController]
    [Route("Pregnantportal/api/[controller]")]
    public class BlogController : ControllerBase
    {
        private readonly AppDbContext _db;

        public BlogController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetBlogs")]
        public async Task<ActionResult<List<Blog>>> GetBlogs()
        {
            var blogs = await _db.Blogs.ToListAsync();
            return Ok(blogs);
        }

        [HttpGet("GetBlogById")]
        public async Task<ActionResult<Blog>> GetBlogById([FromQuery] string BlogId)
        {
            var blog = await _db.Blogs.FirstOrDefaultAsync(b => b.BlogId == BlogId);
            if (blog == null)
            {
                return NotFound();
            }

            return Ok(blog);
        }
    }
}
