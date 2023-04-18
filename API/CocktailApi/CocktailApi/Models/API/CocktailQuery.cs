namespace CocktailApi.Models.API
{
    public class CocktailQuery
    {
        public string? SearchParameter { get; set; }


        public bool? IsPublic { get; set; }
        public string? UID { get; set; }



        public SortType? Sort => SortType.Alphabetical;
    }


    public enum SortType
    {
        Alphabetical,
        AlphabeticalDecending,
    }
}
