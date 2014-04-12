using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;

namespace Daylight.WebApi.Core.Attributes
{
    /// <summary>
    /// Attribute for validating general passwords
    /// </summary>
    public class PasswordAttribute : ValidationAttribute
    {
        public int MinLength { get; internal set; }

        public int MaxLength { get; internal set; }

        public string RegularExpression { get; internal set; }

        public bool IsRequired { get; internal set; }

        public string MemberName = "Password";

        public PasswordAttribute(string RegularExpression = @"(\S)", int MinLength = 6, int MaxLength = 50, bool IsRequired = true)
        {
            this.RegularExpression = RegularExpression;
            this.MinLength = MinLength;
            this.MaxLength = MaxLength;
            this.IsRequired = IsRequired;
        }

        public override string FormatErrorMessage(string name)
        {
            return CustomErrorMessage ?? string.Format("{0} must be between 6-30 characters in length", MemberName);
        }

        public override bool IsValid(object value)
        {
            var str = (string)value;

            if (string.IsNullOrEmpty(str))
            {
                if (IsRequired)
                {
                    CustomErrorMessage = "Password is required";
                    return false;
                }
                return true;
            }

            if (str.Length < MinLength || str.Length > MaxLength)
            {
                CustomErrorMessage = string.Format("Your {0} must be between {1}-{2} characters in length", MemberName, MinLength, MaxLength);
                return false;
            }

            SetupRegex();

            Match match = Regex.Match(str);

            if (!((match.Success && (match.Index == 0)) && (match.Length == str.Length)))
            {
                CustomErrorMessage = string.Format("Your {0} must not contain any space character", MemberName);
                return false;
            }

            return true;
        }

        private string RegularExpressionString
        {
            get { return string.Format("{0}{{{1},{2}}}", RegularExpression, MinLength, MaxLength); }
        }

        private void SetupRegex()
        {
            if (Regex == null)
            {
                if (string.IsNullOrEmpty(this.RegularExpressionString))
                {
                    throw new InvalidOperationException("Empty Pattern");
                }
                Regex = new Regex(RegularExpressionString);
            }
        }

        private string CustomErrorMessage { get; set; }

        private Regex Regex { get; set; }
    }
}
