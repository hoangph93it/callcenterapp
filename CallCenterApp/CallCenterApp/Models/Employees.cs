﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CallCenterApp.Models
{
    public class Employees
    {
        public int ID { get; set; }
        public string EmployeeID { get; set; }
        public string Name { get; set; }
        public string DOB { get; set; }
        public string Gender { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Id_Depart { get; set; }
    }
}