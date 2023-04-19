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

        [HttpGet("profile/{steamIdOrUsername}")]
        public async Task<ActionResult<dynamic>> GetUserProfileAsync(string steamIdOrUsername)
        {
            try
            {
                ulong steamId;
                if (ulong.TryParse(steamIdOrUsername, out ulong parsedSteamId))
                {
                    steamId = parsedSteamId;
                }
                else
                {
                    steamId = await _steamService.ResolveVanityUrlAsync(steamIdOrUsername);
                }

                var profile = await _steamService.GetUserProfileAsync(steamId);
                return Ok(profile);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }


}