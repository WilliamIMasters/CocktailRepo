using CocktailApi.Controllers.util;
using CocktailApi.Data;
using CocktailApi.Models;
using CocktailApi.Models.API;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http.Headers;
using System.Net;
using Microsoft.EntityFrameworkCore.Query;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CocktailApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CocktailsController : ControllerBase
    {
        private readonly DataContext _context;

        private CocktailRepository _cocktails;

        private UserServices _userHelper;

        public CocktailsController(DataContext dataContext)
        {
            _context = dataContext;
            _cocktails = new CocktailRepository(dataContext);
            _userHelper = new UserServices();
        }


        // GET: api/Cocktails
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Cocktail>>> Get()
        {
            return Ok(await _context.Cocktails.ToListAsync());
        }

        // GET: api/Cocktails/Public
        [HttpGet]
        [Route("Public")]
        [Authorize]
        public async Task<ActionResult<List<Cocktail>>> GetPublic([FromQuery] CocktailQuery? getParameters)
        {
            getParameters.IsPublic = true;

            var cocktails = _cocktails.GetFromQuery(getParameters);//FindCocktails(getParameters);

            return Ok(await cocktails.ToListAsync());

        }

        // GET: api/Cocktails/User
        [HttpGet]
        [Route("User")]
        [Authorize]
        public async Task<ActionResult<List<Cocktail>>> GetUser([FromHeader] string authorization, [FromQuery] CocktailQuery? getParameters)
        {
            var uid = await _userHelper.GetUidFromAuth(authorization);
            getParameters.UID = uid;

            var cocktails = _cocktails.GetFromQuery(getParameters);

            return Ok( await cocktails.ToListAsync() );
        }

        // GET api/Cocktails/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Cocktail>> Get(int id, [FromHeader] string authorization)
        {
            var cocktail = _cocktails.GetById(id);//await _context.Cocktails.FindAsync(id);

            if (cocktail == null) return NotFound();
            var uid = await _userHelper.GetUidFromAuth(authorization);
            if(!cocktail.IsPublic && cocktail.UserUID != uid) return NotFound();

            return Ok(cocktail);
        }

        // POST api/Cocktails
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<int>> Post([FromHeader] string authorization, Cocktail cocktail)
        {

            if (cocktail == null) return NotFound();
            if (cocktail?.Id != null && cocktail.Id != 0) {
                return await UpdateExistingCocktail(cocktail, authorization);
            }

            cocktail.UserUID = await _userHelper.GetUidFromAuth(authorization);

            _context.Cocktails.Add(cocktail);
            await _context.SaveChangesAsync();

            return Ok(cocktail.Id);
        }

        // PUT api/Cocktails/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/Cocktails/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<bool>> Delete(int id, [FromHeader] string authorization)
        {
            var cocktail = await _context.Cocktails.FindAsync(id);

            if (cocktail == null) return NotFound();

            var uid = await _userHelper.GetUidFromAuth(authorization);
            if (cocktail.UserUID != uid) return BadRequest();

            _context.Cocktails.Remove(cocktail);
            _context.SaveChanges();

            return Ok(true);

        }

        private async Task<ActionResult<int>> UpdateExistingCocktail(Cocktail cocktail, string authorization)
        {
            var dbCocktail = _context.Cocktails.Include(x => x.Ingredients).FirstOrDefault(x => x.Id == cocktail.Id);
            if (dbCocktail == null) return NotFound();

            var uid = await _userHelper.GetUidFromAuth(authorization);

            if(dbCocktail.UserUID != uid) {
                return BadRequest();
            }
            
            
            dbCocktail.Name = cocktail.Name;
            dbCocktail.Description = cocktail.Description;
            dbCocktail.Ingredients = cocktail.Ingredients;
            dbCocktail.IsPublic = cocktail.IsPublic;
            dbCocktail.GlassType = cocktail.GlassType;

            await _context.SaveChangesAsync();
            
            return Ok(dbCocktail.Id);

        }

        private IQueryable<Cocktail> FindCocktails(CocktailQuery? query)
        {
            IQueryable<Cocktail> cocktails = _context.Cocktails.AsQueryable();
            //IQueryable<Cocktail> cocktailQuery = .Cocktails

            if (query?.SearchParameter != null) {
                cocktails = cocktails.Where(x => x.Name.Contains(query.SearchParameter));
            }

            if(query?.UID != null) {
                cocktails = cocktails.Where(x => x.UserUID.Equals(query.UID));
            }

            if(query?.IsPublic != null) {
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
