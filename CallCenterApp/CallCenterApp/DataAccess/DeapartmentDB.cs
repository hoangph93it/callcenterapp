using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CallCenterApp.Models;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace CallCenterApp.DataAccess
{
    public class DeapartmentDB
    {
        string constr = ConfigurationManager.ConnectionStrings["ConstrCallCenter"].ConnectionString;
        public List<Department> ListDeparment()
        {
            List<Department> lst_depart = new List<Department>();
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();
                SqlCommand com = new SqlCommand("SP_DROPDOWN_LIST_DEPARMENT", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst_depart.Add(new Department
                    {
                        ID = Int32.Parse(rdr["ID"].ToString()),
                        Name = rdr["Name"] == DBNull.Value ? "" : rdr["Name"].ToString(),
                        StartDate = rdr["StartDate"] == DBNull.Value ? "" : rdr["StartDate"].ToString(),
                        Manager = rdr["Manager"] == DBNull.Value ? 0 : Int32.Parse(rdr["Manager"].ToString())
                    });
                }
                return lst_depart;
            }
        }
    }
}