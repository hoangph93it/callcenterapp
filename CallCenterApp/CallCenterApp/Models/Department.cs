using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CallCenterApp.Models
{
    public class Department
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string StartDate { get; set; }
        public int Manager { get; set; }
    }
}