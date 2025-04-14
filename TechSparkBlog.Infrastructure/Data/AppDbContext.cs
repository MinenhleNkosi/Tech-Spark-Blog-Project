
using Microsoft.EntityFrameworkCore;
using TechSparkBlog.Domain.Entities;

namespace TechSparkBlog.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        //public DbSet<Post> BlogPosts { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Add any additional configuration here
        }
    }
}
