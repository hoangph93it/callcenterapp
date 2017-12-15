using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CallCenterApp.Models;
using CallCenterApp.DataAccess;
namespace CallCenterApp.Controllers
{
    public class DepartmentController : Controller
    {
        DeapartmentDB depart_db = new DeapartmentDB();
        // GET: Department
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult ListDepartment()
        {
            return Json(depart_db.ListDeparment(), JsonRequestBehavior.AllowGet);
        }
    }
}