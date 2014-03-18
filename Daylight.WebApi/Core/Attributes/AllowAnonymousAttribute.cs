using System;

namespace Daylight.WebApi.Core.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public sealed class AllowAnonymousAttribute : Attribute { }
}
