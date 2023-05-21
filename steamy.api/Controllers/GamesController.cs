using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace steamy.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly string _rawgKey;

        public GamesController(IHttpClientFactory clientFactory, IConfiguration configuration)
        {
            _clientFactory = clientFactory;
            _rawgKey = configuration["App:RawgKey"];
        }

        // GET: api/games/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGame(int id)
        {
            var request = new HttpRequestMessage(HttpMethod.Get,
                $"https://api.rawg.io/api/games/{id}?key={_rawgKey}");

            var client = _clientFactory.CreateClient();

            HttpResponseMessage response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                string game = await response.Content.ReadAsStringAsync();
                return Ok(game);
            }
            else
            {
                return BadRequest("Error getting game data from RAWG API");
            }
        }

        // GET: api/games
        [HttpGet]
        public async Task<IActionResult> GetGames(string search = "", int pageSize = 10, int pageNumber = 1)
        {
            var request = new HttpRequestMessage(HttpMethod.Get,
                $"https://api.rawg.io/api/games?search={search}&page_size={pageSize}&page={pageNumber}&key={_rawgKey}");

            var client = _clientFactory.CreateClient();

            HttpResponseMessage response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                string games = await response.Content.ReadAsStringAsync();
                return Ok(games);
            }
            else if (response.StatusCode == System.Net.HttpStatusCode.TooManyRequests)
            {
                if (response.Headers.TryGetValues("Retry-After", out var values))
                {
                    string retryAfter = values.First();
                    return StatusCode((int)response.StatusCode, $"Rate limit exceeded. Try again after {retryAfter} seconds.");
                }
                else
                {
                    return StatusCode((int)response.StatusCode, "Rate limit exceeded. No Retry-After header provided.");
                }
            }
            else if ((int)response.StatusCode >= 400 && (int)response.StatusCode < 500)
            {
                string errorDescription = await response.Content.ReadAsStringAsync();
                return BadRequest($"Client error when calling the API. Description: {errorDescription}");
            }
            else if ((int)response.StatusCode >= 500)
            {
                return StatusCode((int)response.StatusCode, "Server error when calling the API. Please try again later.");
            }
            else
            {
                return StatusCode((int)response.StatusCode, response.ReasonPhrase);
            }
        }

    }
}
