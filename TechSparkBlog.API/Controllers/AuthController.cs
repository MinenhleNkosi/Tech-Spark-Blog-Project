
using Microsoft.AspNetCore.Mvc;
using TechSparkBlog.Application.Interfaces;
using TechSparkBlog.Domain.Entities;

namespace TechSparkBlog.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            await _userService.RegisterUserAsync(user);
            return Ok(new { Message = "Registration successful" });
        }
    }
}
