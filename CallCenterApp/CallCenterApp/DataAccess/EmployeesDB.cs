using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Configuration;
using CallCenterApp.Models;
using System.Data.SqlClient;
using System.Data.Common;
using System.Web.Helpers;

namespace CallCenterApp.DataAccess
{
    public class EmployeesDB
    {
        //Declare connection string
        string constr = ConfigurationManager.ConnectionStrings["ConstrCallCenter"].ConnectionString;
        //Return list Employee
        public List<EmployeeDepart> ListAllEmployeeDepart()
        {
            List<EmployeeDepart> lst = new List<EmployeeDepart>();
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();
                SqlCommand com = new SqlCommand("SP_LIST_ALL_EMPLOYEE", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new EmployeeDepart
                    {
                        ID = Int32.Parse(rdr["ID"].ToString()),
                        EmployeeID = rdr["EmployeeID"] == DBNull.Value ? "" : rdr["EmployeeID"].ToString(),
                        Name = rdr["Name"] == DBNull.Value ? "" : rdr["Name"].ToString(),
                        DOB = rdr["DOB"] == DBNull.Value ? "" : rdr["DOB"].ToString(),
                        Gender = rdr["Gender"] == DBNull.Value ? "" : rdr["Gender"].ToString(),
                        HomeAddress = rdr["HomeAddress"] == DBNull.Value ? "" : rdr["HomeAddress"].ToString(),
                        Phone = rdr["Phone"] == DBNull.Value ? 0 : Int32.Parse(rdr["Phone"].ToString()),
                        Email = rdr["Email"] == DBNull.Value ? "" : rdr["Email"].ToString(),
                        StartDate = rdr["StartDate"] == DBNull.Value ? "" : rdr["StartDate"].ToString(),
                        EndDate = rdr["EndDate"] == DBNull.Value ? "" : rdr["EndDate"].ToString(),
                        DepartmentName = rdr["DepartmentName"] == DBNull.Value ? "" : rdr["DepartmentName"].ToString()
                    });
                }
                return lst;
            }
        }
        //Method search employees
        public List<EmployeeDepart> SearchEmployee(string EmployeeID, string Name, int? Id_Depart)
        {
            List<EmployeeDepart> lst_emp = new List<EmployeeDepart>();
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();
                SqlCommand com = new SqlCommand("SP_SEARCH_EMPLOYEES", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.Add(new SqlParameter("@EmployeeID", EmployeeID));
                com.Parameters.Add(new SqlParameter("@Name", Name));
                com.Parameters.Add(new SqlParameter("@Id_Depart", Id_Depart));
                using (SqlDataReader rdr = com.ExecuteReader())
                {
                    if (rdr.HasRows)
                    {
                        lst_emp = Helpers.GetPOBaseTListFromReader<EmployeeDepart>(rdr);
                    }
                }
            }
            return lst_emp;
        }
        //public List<EmployeeDepart> SearchEmployee(string EmployeeID, string Name, int? Id_Depart)
        //{
        //    List<EmployeeDepart> lst_emp = new List<EmployeeDepart>();
        //    using (SqlConnection con = new SqlConnection(constr))
        //    {
        //        con.Open();
        //        SqlCommand com = new SqlCommand("SP_SEARCH_EMPLOYEES", con);
        //        com.CommandType = CommandType.StoredProcedure;
        //        com.Parameters.AddWithValue("@EmployeeID", EmployeeID);
        //        com.Parameters.AddWithValue("@Name", Name);
        //        com.Parameters.AddWithValue("@Id_Depart", Id_Depart);
        //        SqlDataReader rdr = com.ExecuteReader();
        //        while (rdr.Read())
        //        {
        //            lst_emp.Add(new EmployeeDepart
        //            {
        //                ID = Int32.Parse(rdr["ID"].ToString()),
        //                EmployeeID = rdr["EmployeeID"] == DBNull.Value ? "" : rdr["EmployeeID"].ToString(),
        //                Name = rdr["Name"] == DBNull.Value ? "" : rdr["Name"].ToString(),
        //                DOB = rdr["DOB"] == DBNull.Value ? "" : rdr["DOB"].ToString(),
        //                Gender = rdr["Gender"] == DBNull.Value ? "" : rdr["Gender"].ToString(),
        //                HomeAddress = rdr["HomeAddress"] == DBNull.Value ? "" : rdr["HomeAddress"].ToString(),
        //                Phone = rdr["Phone"] == DBNull.Value ? 0 : Int32.Parse(rdr["Phone"].ToString()),
        //                Email = rdr["Email"] == DBNull.Value ? "" : rdr["Email"].ToString(),
        //                StartDate = rdr["StartDate"] == DBNull.Value ? "" : rdr["StartDate"].ToString(),
        //                EndDate = rdr["EndDate"] == DBNull.Value ? "" : rdr["EndDate"].ToString(),
        //                DepartmentName = rdr["DepartmentName"] == DBNull.Value ? "" : rdr["DepartmentName"].ToString()
        //            });
        //        }
        //    }
        //    return lst_emp;
        //}
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
                com.Parameters.AddWithValue("@HomeAddress", emp.HomeAddress);
                com.Parameters.AddWithValue("@Phone", emp.Phone);
                com.Parameters.AddWithValue("@Email", emp.Email);
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
                com.Parameters.AddWithValue("@HomeAddress", emp.HomeAddress);
                com.Parameters.AddWithValue("@Phone", emp.Phone);
                com.Parameters.AddWithValue("@Email", emp.Email);
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