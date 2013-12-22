using System.Linq;
using System.Web.Http;

namespace Daylight.WebApi.Mvc
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                 name: "API_Patients",
                 routeTemplate: "API/Patients/{patientId}",
                 defaults: new { controller = "Patient", patientId = RouteParameter.Optional }
             );

            config.Routes.MapHttpRoute(
                name: "API_PatientThumbnails",
                routeTemplate: "API/Patients/{patientId}/Thumbnail",
                defaults: new { controller = "Thumbnail" }
            );

            config.Routes.MapHttpRoute(
                name: "API_PatientConditions",
                routeTemplate: "API/Patients/{patientId}/Conditions/{conditionId}",
                defaults: new { controller = "Step", stepId = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "API_PatientAttachments",
                routeTemplate: "API/Patients/{patientId}/Conditions/{conditionId}/Attachments/{attachmentId}",
                defaults: new { controller = "Attachment", attachmentId = RouteParameter.Optional }
            );

            var appXmlType = config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
            config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType);
        }
    }
}
