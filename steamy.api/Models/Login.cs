using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace steamy.api.Models
{
    public class Login
    {
        public string? UserId {get; set;} = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
