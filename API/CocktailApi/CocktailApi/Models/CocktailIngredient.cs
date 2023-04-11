using System.ComponentModel.DataAnnotations.Schema;

namespace CocktailApi.Models
{
    public class CocktailIngredient
    {
        public int Id { get; set; }


        public string Quantity { get; set; }


        public int CocktailId { get; set; }


        public int IngredientId { get; set; }


        public virtual Ingredient? Ingredient { get; set; }


    }
}
