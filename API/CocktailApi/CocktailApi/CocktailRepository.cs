using CocktailApi.Data;
using CocktailApi.Models;
using CocktailApi.Models.API;
using Microsoft.EntityFrameworkCore;

namespace CocktailApi
{
    public class CocktailRepository
    {
        private DbSet<Cocktail> _cocktails;

        public CocktailRepository(DataContext context) {
            _cocktails = context.Cocktails;
        }

        public Cocktail GetById(int id)
        {
            return _cocktails.FirstOrDefault(x => x.Id == id);
        }

        public  IQueryable<Cocktail> GetFromQuery(CocktailQuery query) {
            IQueryable<Cocktail> cocktails = _cocktails.AsQueryable();


            if (query?.SearchParameter != null) {
                cocktails = cocktails.Where(x => x.Name.Contains(query.SearchParameter));
            }

            if (query?.UID != null) {
                cocktails = cocktails.Where(x => x.UserUID.Equals(query.UID));
            }

            if (query?.IsPublic != null) {
                cocktails = cocktails.Where(x => x.IsPublic == query.IsPublic.Value);
            }


            if (query?.Sort != null) {
                switch (query.Sort) {
                    case SortType.Alphabetical:
                        cocktails = cocktails.OrderBy(x => x.Name);
                        break;

                }
            }


            return cocktails;

        }


    }
}
