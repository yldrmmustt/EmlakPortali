using Microsoft.AspNetCore.Mvc;

namespace EmlakPortali.MVC.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
