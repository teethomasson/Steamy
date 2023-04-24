using SteamWebAPI2.Interfaces;
using SteamWebAPI2.Utilities;
using Microsoft.Extensions.Caching.Memory;
using System.Threading.Tasks;

namespace steamy.api
{
    public class SteamService
    {
        private readonly SteamWebInterfaceFactory _steamWebInterfaceFactory;
        private readonly IMemoryCache _cache;

        public SteamService(SteamWebInterfaceFactory steamWebInterfaceFactory, IMemoryCache memoryCache)
        {
            _steamWebInterfaceFactory = steamWebInterfaceFactory;
            _cache = memoryCache;
        }

        public async Task<ulong> ResolveVanityUrlAsync(string vanityUrl)
        {
            // Check if the vanityUrl is cached
            if (_cache.TryGetValue(vanityUrl, out ulong cachedSteamId))
            {
                return cachedSteamId;
            }

            var steamUser = _steamWebInterfaceFactory.CreateSteamWebInterface<SteamUser>(new HttpClient());
            var response = await steamUser.ResolveVanityUrlAsync(vanityUrl);

            if (response != null && response.Data != 0)
            {
                ulong steamId = response.Data;

                // Cache the result with an absolute expiration time
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetAbsoluteExpiration(TimeSpan.FromHours(1));

                _cache.Set(vanityUrl, steamId, cacheEntryOptions);

                return steamId;
            }

            throw new Exception("Failed to resolve vanity URL.");
        }

        public async Task<dynamic> GetUserProfileAsync(ulong steamId)
        {
            var steamUser = _steamWebInterfaceFactory.CreateSteamWebInterface<SteamUser>(new HttpClient());
            var profile = await steamUser.GetPlayerSummariesAsync(new List<ulong> { steamId });
            return profile.Data.FirstOrDefault();
        }

    }

}