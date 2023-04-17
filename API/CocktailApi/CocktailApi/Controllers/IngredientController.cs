using CocktailApi.Data;
using CocktailApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CocktailApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientController : ControllerBase
    {

        private readonly DataContext _context;

        public IngredientController(DataContext dataContext)
        {
            _context = dataContext;
        }


        // GET: api/<IngredientController>
        [HttpGet]
        public async Task<ActionResult<List<Ingredient>>> Get()
        {
            return Ok(await _context.Ingredients.ToListAsync());
        }

        // GET api/<IngredientController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<IngredientController>
        [HttpPost]
        public async Task<ActionResult<int>> Post([FromBody] Ingredient ingredient)
        {

            if (ingredient == null) return NotFound();
            if (ingredient?.Id != null && ingredient.Id != 0) {
                return BadRequest("IngredientAlreadyExists");
            }

            _context.Ingredients.Add(ingredient);
            await _context.SaveChangesAsync();

            return Ok(ingredient.Id);
        }

        // PUT api/<IngredientController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<IngredientController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
