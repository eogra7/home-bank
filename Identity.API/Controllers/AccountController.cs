using System;
using System.Text;
using System.Threading.Tasks;
using IdentityServer4;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Identity.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        [HttpGet("Login")]
        public async Task<IActionResult> Login(string returnUrl)
        {
            // Check if the Authorization header is present
            if (!Request.Headers.ContainsKey("Authorization"))
            {
                Response.Headers["WWW-Authenticate"] = "Basic realm=\"Identity.API\"";
                return Unauthorized();
            }

            // Decode and validate the Basic Auth credentials
            var authHeader = Request.Headers["Authorization"].ToString();
            if (authHeader.StartsWith("Basic ", StringComparison.OrdinalIgnoreCase))
            {
                var encodedCredentials = authHeader.Substring("Basic ".Length).Trim();
                var decodedBytes = Convert.FromBase64String(encodedCredentials);
                var decodedCredentials = Encoding.UTF8.GetString(decodedBytes).Split(':', 2);

                if (decodedCredentials.Length == 2)
                {
                    var username = decodedCredentials[0];
                    var password = decodedCredentials[1];

                    // Replace this with your actual user validation logic
                    if (ValidateUser(username, password))
                    {

                        await HttpContext.SignInAsync(new IdentityServerUser(username)
                        {
                            DisplayName = username
                        });
                        // Redirect to the specified returnUrl
                        return Redirect(returnUrl ?? "/");
                    }
                }
            }

            // If authentication fails, prompt again
            Response.Headers["WWW-Authenticate"] = "Basic realm=\"Identity.API\"";
            return Unauthorized();
        }
        
        [HttpGet("Logout")]
        public async Task<IActionResult> Logout(string logoutId)
        {
            // Sign out the user
            await HttpContext.SignOutAsync();
            return Redirect("http://localhost:4200");
        }

        private bool ValidateUser(string username, string password)
        {
            // Replace this with your actual user validation logic
            return username == "admin" && password == "password"; // Example only
        }
    }
}
