namespace CocktailApi.Models.API
{
    public class ApiCocktail
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }


        public virtual ICollection<ApiCocktailIngredient> Ingredients { get; set; }

    }
}
