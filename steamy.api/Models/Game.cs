using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace steamy.api.Models
{
    public class Game
    {
        public int GameId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? ImageUrl {get;set;}
    }
}