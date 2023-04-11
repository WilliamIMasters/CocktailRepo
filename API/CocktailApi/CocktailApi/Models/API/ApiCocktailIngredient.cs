namespace CocktailApi.Models.API
{
    public class ApiCocktailIngredient
    {
        public int Id { get; set; }


        public string Quantity { get; set; }


        public int CocktailId { get; set; }


        public int IngredientId { get; set; }
    }
}
