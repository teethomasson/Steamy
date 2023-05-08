using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using steamy.api.Data;

namespace steamy.api.Services
{
    public class UserService
    {
        private readonly UserDbContext _context;
        public UserService(UserDbContext context)
        {
            _context = context;
        }
    }
}