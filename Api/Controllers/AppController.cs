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
            var info = new {
                loans = "/api/loans"
            };

            return Ok(info);
        }
    }
}
