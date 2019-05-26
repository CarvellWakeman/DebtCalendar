using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class ApiControllerBase : ControllerBase
    {
        public ApiControllerBase() : base()
        {
        }

        public override OkObjectResult Ok(object value)
        {
            var result = new
            {
                data = value
            };
            return base.Ok(result);
        }
    }
}
