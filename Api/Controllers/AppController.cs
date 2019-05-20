using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("/")]
    [ApiController]
    public class AppController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var result = new
            {
                Application = "Loans API",
                Info = new
                {
                    Swagger = UriHelper.BuildAbsolute(Request.Scheme, Request.Host, Request.PathBase, "/swagger")
                }
            };

            return Ok(result);

        }
    }
}
