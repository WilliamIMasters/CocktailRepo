using CocktailApi.Data;
using CocktailApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CocktailApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CocktailIngredientController : ControllerBase
    {

        private readonly DataContext _context;

        public CocktailIngredientController(DataContext dataContext)
        {
            _context = dataContext;
        }



        // GET: api/<CocktailIngredientController>
        [HttpGet]
        public async Task<ActionResult<List<CocktailIngredient>>> Get()
        {
            return Ok(await _context.CocktailIngredients.ToListAsync());
        }

        // GET api/<CocktailIngredientController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CocktailIngredientController>
        [HttpPost]
        public async Task<ActionResult<int>> Post([FromBody] CocktailIngredient cocktailIngredient)
        {
            _context.CocktailIngredients.Add(cocktailIngredient);
            await _context.SaveChangesAsync();

            return Ok(cocktailIngredient.Id);

        }

        // PUT api/<CocktailIngredientController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CocktailIngredientController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
