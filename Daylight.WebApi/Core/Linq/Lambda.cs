using System;
using System.Linq.Expressions;

namespace Daylight.WebApi.Core.Linq
{
    /// <summary>
    /// Holds lambda operations
    /// </summary>
    public static class Lambda
    {
        /// <summary>
        /// Gets name of property
        /// </summary>
        /// <typeparam name="T">Instance type</typeparam>
        /// <param name="property">Instance property</param>
        /// <returns>Property name</returns>
        public static string Property<T>(Expression<Func<T, object>> property)
        {
            var unaryExpression = property.Body as UnaryExpression;
            var memberExpression =
                (MemberExpression) (unaryExpression != null ? unaryExpression.Operand : property.Body);
            return memberExpression.Member.Name;
        }

        public static Func<T, object> Selector<T>(string propertyName)
        {
            ParameterExpression param = Expression.Parameter(typeof (T), "x"); // x
            Expression property = Expression.Property(param, propertyName); // x.ColumnName
            Func<T, object> lambda = Expression.Lambda<Func<T, object>>( // x => x.ColumnName
                Expression.Convert(property, typeof (object)),
                param)
                                               .Compile();

            return lambda;
        }
    }
}
