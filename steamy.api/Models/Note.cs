using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace steamy.api.Models
{
    public class Note
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public int? GameId {get;set;}
        public Game? Game { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public string UserId { get; set; } = string.Empty;
        public User? User { get; set; } 
    }

}