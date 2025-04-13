using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using BookReviewApi.Models;

namespace BookReviewApi.Context 
{
// Uses EFC to map models to database tables 
public class ApplicationContext : IdentityDbContext<IdentityUser> // Providing built in tables to manage users, roles and authentication
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) // Using dbcontext to build cutom tables 
        {
        }
        // Creating tables for each model 
        public DbSet<Member> Members { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<BookGenre> BookGenres { get; set; }
        public DbSet<Review> Reviews { get; set; }


	}
}
