using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using steamy.api.Models;
using steamy.api.Data;

namespace steamy.api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        public UserProfileController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        // GET: api/UserProfile
        [HttpGet]
        public async Task<ActionResult<User>> GetUser()
        {
            var username = User.Identity.Name;
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == username);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/UserProfile
        [HttpPut]
        public async Task<IActionResult> PutUser(User user)
        {
            var username = User.Identity.Name;
            var existingUser = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == username);

            if (existingUser == null)
            {
                return NotFound();
            }

            existingUser.FirstName = user.FirstName;
            existingUser.LastName = user.LastName;
            existingUser.ProfilePictureUrl = user.ProfilePictureUrl;

            var result = await _userManager.UpdateAsync(existingUser);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return NoContent();
        }

        // DELETE: api/UserProfile
        [HttpDelete]
        public async Task<IActionResult> DeleteUser()
        {
            var username = User.Identity.Name;
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == username);

            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return NoContent();
        }
    }
}
