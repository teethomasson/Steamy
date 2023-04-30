using SteamWebAPI2.Interfaces;
using SteamWebAPI2.Utilities;
using Microsoft.Extensions.Caching.Memory;
using System.Threading.Tasks;
using Steam.Models.SteamCommunity;


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
            if(profile!=null){
                return profile.Data.First();
            }
            else{
                throw new Exception("Unable to Retrieve User Profile");
            }
        }


        public async Task<IEnumerable<OwnedGameModel>> GetTopGamesByPlaytimeAsync(ulong steamId, int count = 15)
        {
            var playerService = _steamWebInterfaceFactory.CreateSteamWebInterface<PlayerService>(new HttpClient());
            var ownedGamesResponse = await playerService.GetOwnedGamesAsync(steamId, includeAppInfo: true);
    
            var topGames = ownedGamesResponse.Data.OwnedGames
                .Where(game => game.PlaytimeForever > TimeSpan.FromMinutes(0))
                .OrderByDescending(game => game.PlaytimeForever)
                .Take(count)
                .ToList();

            return (IEnumerable<OwnedGameModel>)topGames;
        }

        public async Task<IEnumerable<OwnedGameModel>> GetAllOwnedGames(ulong steamId)
        {
            var playerService = _steamWebInterfaceFactory.CreateSteamWebInterface<PlayerService>(new HttpClient());
            var ownedGamesReponse = await playerService.GetOwnedGamesAsync(steamId, includeAppInfo:true);

            var ownedGames = ownedGamesReponse.Data.OwnedGames.ToList();
            return (IEnumerable<OwnedGameModel>)ownedGames;
        }

        public async Task<uint> GetSteamLevel(ulong steamId)
        {
            var playerService = _steamWebInterfaceFactory.CreateSteamWebInterface<PlayerService>(new HttpClient());
            var steamLevel = await playerService.GetSteamLevelAsync(steamId);

            return steamLevel.Data.GetValueOrDefault();
        }

        public async Task<IEnumerable<RecentlyPlayedGameModel>> GetRecentlyPlayedGames(ulong steamId)
        {
            var playerService = _steamWebInterfaceFactory.CreateSteamWebInterface<PlayerService>(new HttpClient());
            var recentlyPlayedGamesResponse = await playerService.GetRecentlyPlayedGamesAsync(steamId);

            if (recentlyPlayedGamesResponse != null && recentlyPlayedGamesResponse.Data != null)
            {
                return (IEnumerable<RecentlyPlayedGameModel>)recentlyPlayedGamesResponse.Data;
            }

            throw new Exception("Failed to retrieve recently played games.");
        }


    }

}