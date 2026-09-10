using Microsoft.EntityFrameworkCore;
using PregnantWeb.Models;

namespace PregnantWeb.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users => Set<User>();
        public DbSet<RegisterOrder> RegisterOrders => Set<RegisterOrder>();
        public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();
        public DbSet<ContactInfo> ContactInfo => Set<ContactInfo>();
        public DbSet<Blog> Blogs => Set<Blog>();
        public DbSet<CoursePromoSummary> Promo => Set<CoursePromoSummary>();
        public DbSet<CourseLesson> CourseLessons => Set<CourseLesson>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder);

   
            // so we tell EF Core which property to use as the primary key.
            //modelBuilder.Entity<Blog>().HasKey(b => b.BlogId);
            modelBuilder.Entity<CoursePromoSummary>().HasKey(p => p.CourseId);

            // CourseId column on CourseLessons defaults to PregnantOnline for
            // any row that doesn't specify one.
            modelBuilder.Entity<CourseLesson>()
                .Property(l => l.CourseId)
                .HasDefaultValue(CourseId.PregnantOnline);

            // No HasData seed here: CourseLessons content for both courses
            // is now managed directly in the database, not via migrations.
        }
    }
}
