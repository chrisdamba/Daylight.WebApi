using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Mvc;

namespace Daylight.WebApi.Mvc
{
    public static class ContentExtensions
    {
        internal static readonly IDictionary<string, MvcHtmlString> cache = new ConcurrentDictionary<string, MvcHtmlString>();

        public static string CDNRoot { get; set; }

        public static string Version { get; set; }

        static ContentExtensions()
        {
        }

        public static MvcHtmlString VersionContent(this UrlHelper urlHelper, string contentPath)
        {
            if (cache.ContainsKey(contentPath))
                return cache[contentPath];
            cache[contentPath] = string.IsNullOrWhiteSpace(CDNRoot) ? BuildRelativeUrl(urlHelper, contentPath) : BuildCDNUrl(urlHelper, contentPath);
            return cache[contentPath];
        }

        private static MvcHtmlString BuildCDNUrl(UrlHelper urlHelper, string contentPath)
        {
            return MvcHtmlString.Create(CDNRoot + "/" + Version + contentPath.Replace("~/", "/"));
        }

        private static MvcHtmlString BuildRelativeUrl(UrlHelper urlHelper, string contentPath)
        {
            try
            {
                string contentPath1 = urlHelper.Content(contentPath);
                string path = contentPath1;
                int length = contentPath1.IndexOfAny(new char[2]
        {
          '?',
          '&'
        });
                if (length > 0)
                    path = contentPath1.Substring(0, length);
                long ticks = File.GetLastWriteTimeUtc(urlHelper.RequestContext.HttpContext.Server.MapPath(path)).Ticks;
                return MvcHtmlString.Create(AppendParams(contentPath1, new object[1]
        {
          (object) (Version + (object) "." + (string) (object) ticks)
        }));
            }
            catch
            {
                return MvcHtmlString.Create(AppendParams(urlHelper.Content(contentPath), new object[1]
        {
          (object) Version
        }));
            }
        }

        private static string AppendParams(string contentPath, params object[] parameters)
        {
            if (parameters.Length > 0)
                return contentPath + (((IEnumerable<char>)contentPath).Contains('?') ? "&q=" : "?q=") + string.Join("&q=", parameters);
            else
                return contentPath;
        }
    }
}