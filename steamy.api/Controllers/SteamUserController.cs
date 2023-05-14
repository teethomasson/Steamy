using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Steam.Models.SteamCommunity;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

namespace steamy.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
public class SteamUserController : ControllerBase
{
    private readonly SteamUserService _steamService;

    public SteamUserController(SteamUserService steamService)
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
    [HttpGet("profile/topGames/{steamId}/{count}")]
    public async Task<ActionResult<IEnumerable<OwnedGameModel>>> GetTopGamesByPlaytime(ulong steamId, int count  =15)
    {
        try
        {
            var topGames = await _steamService.GetTopGamesByPlaytimeAsync(steamId, count);
            return Ok(topGames);
        }
            catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpGet("profile/recentlyPlayed/{steamId}")]
    public async Task<ActionResult<IEnumerable<RecentlyPlayedGameModel>>> GetRecentlyPlayedGames(ulong steamId)
    {
        try
        {
            var recentGames = await _steamService.GetRecentlyPlayedGames(steamId);
            return Ok(recentGames);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpGet("profile/allGames/{steamId}")]
    public async Task<ActionResult<IEnumerable<OwnedGameModel>>> GetAllOwnedGames(ulong steamId)
    {
        try
        {
            var ownedGames =  await _steamService.GetAllOwnedGames(steamId);
            return Ok(ownedGames);  
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpGet("profile/steamLevel/{steamId}")]
    public async Task<ActionResult<int>> GetSteamLevel(ulong steamId)
    {
        try
        {
            var steamLevel = await _steamService.GetSteamLevel(steamId);
            return Ok(steamLevel);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("flagemoji/{countryCode}")]
    public IActionResult GetFlagEmoji(string countryCode)
    {
        try
        {
            string flagEmoji = _steamService.CountryCodeToFlagEmoji(countryCode);
            return Ok(flagEmoji);
        }
        catch (Exception e)
        {
            return BadRequest(new { error = e.Message });
        }
    }

    [HttpGet("/signin")]
    [AllowAnonymous]
    public IActionResult SignInSteam()
    {
        // Request a redirect to the external login provider
        var redirectUrl = Url.Action("Index", "Home");
        var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
        return Challenge(properties, OpenIdConnectDefaults.AuthenticationScheme);
    }


}
}