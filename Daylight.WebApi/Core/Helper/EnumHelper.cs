using System;
using System.ComponentModel;

namespace Daylight.WebApi.Core.Helper
{
    /// <summary>
    /// A helper for returning display names for enums marked with the <see cref="LocalizedDisplayNameAttribute"/>.
    /// </summary>
    /// <remarks>
    /// It would be good if we can improve this so we can put a single attribute on an enum, and it
    /// will use the enum value as the key in a single resources file, rather than specifying on
    /// each enum field. (Also means we could do away with FieldDisplayNameAttribute).
    /// </remarks>
    public static class EnumHelper
    {
        /// <summary>
        /// Returns the DisplayName value for the first DisplayNameAttribute for this enum value, else falls back to the enum as a string.
        /// </summary>
        /// <typeparam name="T">The type of enum to get the display name for.</typeparam>
        /// <param name="member">The enum item to name.</param>
        /// <returns>A display name, or the enum as a string.</returns>
        public static string GetDisplayName<T>(T member)
        {
            // Ensure member is an enum
            var type = member.GetType();
            if (type.IsEnum == false)
            {
                throw new ApplicationException("Cannot use EnumHelper with a non-enum type.");
            }

            // Get enum member info
            var info = type.GetMember(member.ToString());
            object[] attributes = null;

            // Get display name of first display name attribute for this enum member, if any
            if (info.Length <= 0) return member.ToString();
            attributes = info[0].GetCustomAttributes(typeof (DisplayNameAttribute), false);
            if (attributes != null && attributes.Length > 0)
            {
                return ((DisplayNameAttribute) attributes[0]).DisplayName;
            }

            // Fall back to the enum as a string
            return member.ToString();
        }

        /// <summary>
        /// Gets the value of the description attribute from the given Enum value.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public static string GetDescription(this Enum value)
        {
            var field = value.GetType().GetField(value.ToString());

            var attribute = Attribute.GetCustomAttribute(field, typeof (DescriptionAttribute)) as DescriptionAttribute;

            return attribute == null ? value.ToString() : attribute.Description;
        }
    }
}
