using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace CallCenterApp.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/jquery-{version}.min.js",
                "~/Scripts/modernizr-{version}.js",
                "~/Scripts/bootstrap.min.js",
                "~/Scripts/home.js",
                "~/Scripts/jquery.toast.js",
                "~/Scripts/employees/employees.js",
                "~/Scripts/moment.min.js",
                "~/Scripts/moment-with-locales.js",
                "~/Scripts/bootstrap-datetimepicker.js",
                "~/Scripts/jquery-confirm.min.js",
                "~/Scripts/jquery.unobtrusive-ajax.js"));
            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/home.css",
                "~/Content/bootstrap.min.css",
                "~/Content/jquery.toast.css",
                "~/Content/jquery-confirm.min.css",
                "~/Content/bootstrap-datetimepicker.css"));
        }
    }
}