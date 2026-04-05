using Microsoft.AspNetCore.Mvc;

namespace EmlakPortali.MVC.Controllers
{
    public class PropertyController : Controller
    {
        public IActionResult Create()
        {
            return View();
        }

        public IActionResult Details(int id)
        {
            ViewBag.PropertyId = id;
            return View();
        }
    }
}
