using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace Daylight.WebApi.Core.Attributes
{
    /// <summary>
    /// This class is used to validate if the two properties entered match or not.
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true, Inherited = true)]
    public sealed class PropertiesMustMatchAttribute : ValidationAttribute
    {
        private const string defaultErrorMessage = "'{0}' and '{1}' do not match.";

        public PropertiesMustMatchAttribute(string originalProperty, string confirmProperty)
            : base(defaultErrorMessage)
        {
            OriginalProperty = originalProperty;
            ConfirmProperty = confirmProperty;
        }

        public string ConfirmProperty
        {
            get;
            private set;
        }

        public string OriginalProperty
        {
            get;
            private set;
        }

        public override string FormatErrorMessage(string name)
        {
            return String.Format(CultureInfo.CurrentUICulture, ErrorMessageString,
            OriginalProperty, ConfirmProperty);
        }

        /// <summary>
        /// Checks whether the property values are equal.
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public override bool IsValid(object value)
        {
            var properties = TypeDescriptor.GetProperties(value);
            var originalValue = (string)properties.Find(OriginalProperty, true).GetValue(value);
            var confirmValue = (string)properties.Find(ConfirmProperty, true).GetValue(value);

            return Equals(originalValue, confirmValue);
        }
    }
}
