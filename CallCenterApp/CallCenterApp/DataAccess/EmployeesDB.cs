using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Configuration;
using CallCenterApp.Models;
using System.Data.SqlClient;
using System.Data.Common;

namespace CallCenterApp.DataAccess
{
    public class EmployeesDB
    {
        //Declare connection string
        string constr = ConfigurationManager.ConnectionStrings["ConstrCallCenter"].ConnectionString;
        //Return list Employee
        public List<Employees> ListAllEmployee()
        {
            List<Employees> lst = new List<Employees>();
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();
                SqlCommand com = new SqlCommand("SP_LIST_ALL_EMPLOYEE", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Employees
                    {
                        ID = Int32.Parse(rdr["ID"].ToString()),
                        EmployeeID = rdr["EmployeeID"].ToString(),
                        Name = rdr["Name"].ToString(),
                        DOB = rdr["DOB"].ToString(),
                        Gender = rdr["Gender"].ToString(),
                        StartDate = rdr["StartDate"].ToString(),
                        EndDate = rdr["EndDate"].ToString(),
                        Id_Depart = rdr["Id_Depart"].ToString()
                    });
                }
                return lst;
            }
        }
        //Method for adding an employee
        public int AddEmployee(Employees emp)
        {
            int i;
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();
                SqlCommand com = new SqlCommand("SP_INSERT_UPDATE_EMPLOYEE", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@ID", emp.ID);
                com.Parameters.AddWithValue("@EmployeeID", emp.EmployeeID);
                com.Parameters.AddWithValue("@Name", emp.Name);
                com.Parameters.AddWithValue("@DOB", emp.DOB);
                com.Parameters.AddWithValue("@Gender", emp.Gender);
                com.Parameters.AddWithValue("@StartDate", emp.StartDate);
                com.Parameters.AddWithValue("@EndDate", emp.EndDate);
                com.Parameters.AddWithValue("@Id_Depart", emp.Id_Depart);
                com.Parameters.AddWithValue("@Action", "INSERT");
                i = com.ExecuteNonQuery();
            }
            return i;
        }
        //Method update employee
        public int UpdateEmployee(Employees emp)
        {
            int i;
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();
                SqlCommand com = new SqlCommand("SP_INSERT_UPDATE_EMPLOYEE", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@ID", emp.ID);
                com.Parameters.AddWithValue("@EmployeeID", emp.EmployeeID);
                com.Parameters.AddWithValue("@Name", emp.Name);
                com.Parameters.AddWithValue("@DOB", emp.DOB);
                com.Parameters.AddWithValue("@Gender", emp.Gender);
                com.Parameters.AddWithValue("@StartDate", emp.StartDate);
                com.Parameters.AddWithValue("@EndDate", emp.EndDate);
                com.Parameters.AddWithValue("@Id_Depart", emp.Id_Depart);
                com.Parameters.AddWithValue("@Action", "UPDATE");
                i = com.ExecuteNonQuery();
            }
            return i;
        }
        //Method delete employee
        public int DeleteEmployee(int ID)
        {
            int i;
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();
                SqlCommand com = new SqlCommand("SP_DELETE_EMPLOYEE", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@ID", ID);
                i = com.ExecuteNonQuery();
            }
            return i;
        }
    }
}