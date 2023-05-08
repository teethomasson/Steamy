using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using steamy.api.Models;
using steamy.api.Services;

namespace steamy.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
        public class AccountController : ControllerBase
        {
            private readonly UserManager<User> _userManager;
            private readonly SignInManager<User> _signInManager;
            private readonly EmailService _emailService;

            public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, EmailService emailService)
            {
                _userManager = userManager;
                _signInManager = signInManager;
                _emailService = emailService;
            }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Register model)
        {
            if (ModelState.IsValid)
            {
                var user = new User
                {
                    UserName = model.Email,
                    Email = model.Email,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    JoinDate = DateTime.UtcNow
                };

                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    var emailConfirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, emailConfirmationToken }, protocol: HttpContext.Request.Scheme);
                    await _emailService.SendEmailAsync(user.Email, "Confirm your email", $"Please confirm your account by clicking this link: {callbackUrl} <a href='{callbackUrl}'>link</a>");

                    return Ok(new { message = "User registration successful." });
                }
                else
                {
                    // Collect error messages
                    var errors = result.Errors.Select(e => e.Description);
                    return BadRequest(new { errors = errors });
                }
            }

            return BadRequest(ModelState);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return BadRequest("User Id and code are required.");
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{userId}'.");
            }

            var result = await _userManager.ConfirmEmailAsync(user, code);

            if (!result.Succeeded)
            {
                return BadRequest("Error confirming email.");
            }

            return Ok("Email confirmed successfully.");
        }

    }
}