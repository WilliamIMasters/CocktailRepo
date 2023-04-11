using CocktailApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace CocktailApi.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cocktail>().ToTable("Cocktails");
            modelBuilder.Entity<Ingredient>().ToTable("Ingredients");
            modelBuilder.Entity<CocktailIngredient>().HasOne<Ingredient>(x => x.Ingredient);

        }

        public DbSet<Cocktail> Cocktails { get; set; }
        public DbSet<CocktailIngredient> CocktailIngredients { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }

    }
}
