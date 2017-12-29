using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;

namespace CallCenterApp.DataAccess
{
    public class Helpers
    {
        public static List<T> GetPOBaseTListFromReader<T>(SqlDataReader reader)
        {
            List<T> records = new List<T>();
            records = PopulateEntities<T>(reader);
            return records;
        }
        /// <summary>
        /// Mapping tự động các giá trị từ IDataReader sang một list DTO
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="rd"></param>
        /// <returns></returns>
        public static List<T> PopulateEntities<T>(IDataReader rd)
        {
            List<T> entities = new List<T>();
            while (rd.Read())
            {
                T ent = Activator.CreateInstance<T>();
                PopulateEntity<T>(ent, rd);
                entities.Add(ent);

            }
            return entities;
        }
        /// <summary>
        /// Tự động mapping các giá trị của IDataRecord sang đối tượng tương ứng.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        /// <param name="record"></param>
        public static void PopulateEntity<T>(T entity, IDataRecord record)
        {
            if (record != null && record.FieldCount > 0)
            {
                Type type = entity.GetType();
                for (int i = 0; i < record.FieldCount; i++)
                {
                    if (DBNull.Value != record[i])
                    {
                        PropertyInfo property = type.GetProperty(record.GetName(i), BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                        if (property != null)
                        {
                            property.SetValue(entity, record[property.Name], null);
                        }
                    }
                }
            }
        }
    }
}