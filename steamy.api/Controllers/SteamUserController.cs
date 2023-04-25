using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace steamy.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
public class SteamUserController : ControllerBase
{
        private readonly SteamService _steamService;

        public SteamUserController(SteamService steamService)
        {
            _steamService = steamService;
        }

        [HttpGet("vanity/{vanityUrl}")]
        public async Task<ActionResult<ulong>> ResolveVanityUrlAsync(string vanityUrl)
        {
            try
            {
                ulong steamId = await _steamService.ResolveVanityUrlAsync(vanityUrl);
                return Ok(steamId);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("profile/{steamIdOrVanityUrl}")]
    public async Task<IActionResult> GetUserProfile(string steamIdOrVanityUrl)
    {
        try
        {
            ulong steamId;
            if (!ulong.TryParse(steamIdOrVanityUrl, out steamId))
            {
                steamId = await _steamService.ResolveVanityUrlAsync(steamIdOrVanityUrl);
            }

            var profiles = await _steamService.GetUserProfileAsync(steamId);
            return Ok(profiles);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
    
}
}


