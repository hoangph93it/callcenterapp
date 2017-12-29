using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CallCenterApp.DataAccess;
using CallCenterApp.Models;
namespace CallCenterApp.Controllers
{
    public class EmployeesController : Controller
    {
        EmployeesDB emp_db = new EmployeesDB();
        // GET: Employees
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult ListEmpDepart()
        {
            return Json(emp_db.ListAllEmployeeDepart(), JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult SearchEmpDepart(string EmployeeID, string Name, int ? Id_Depart)
        {
            return Json(emp_db.SearchEmployee(EmployeeID, Name, Id_Depart), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetById(int ID)
        {
            var emp = emp_db.ListAllEmployeeDepart().Find(em => em.ID.Equals(ID));
            return Json(emp, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Employees emp)
        {
            return Json(emp_db.AddEmployee(emp), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Employees emp)
        {
            return Json(emp_db.UpdateEmployee(emp), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(emp_db.DeleteEmployee(ID), JsonRequestBehavior.AllowGet);
        }
    }
}