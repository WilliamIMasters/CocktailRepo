using CocktailApi.Models.enums;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace CocktailApi.Models
{
    public class Cocktail: ICloneable
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public bool IsPublic { get; set; }

        public GlassTypes GlassType { get; set; }

        public string UserUID { get; set; }


        public virtual ICollection<CocktailIngredient> Ingredients { get; set; }

        public object Clone()
        {
            return this.MemberwiseClone();
        }
    }
}
