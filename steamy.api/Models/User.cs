using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace steamy.api.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime JoinDate { get; set; }

        public string? ProfilePictureUrl { get; set; } 

        public ICollection<Note>? Notes { get; set; } 

        public ICollection<IdentityUserRole<string>>? UserRoles { get; set; }

    }

}
