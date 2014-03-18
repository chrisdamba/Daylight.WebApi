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
               name: "API_PatientVitals",
               routeTemplate: "API/Patients/{patientId}/Vitals/{observationId}",
               defaults: new { controller = "Vital", observationId = RouteParameter.Optional }
           );

            config.Routes.MapHttpRoute(
                name: "API_PatientConditions",
                routeTemplate: "API/Patients/{patientId}/Conditions/{conditionId}",
                defaults: new { controller = "Condition", conditionId = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "API_PatientMedications",
                routeTemplate: "API/Patients/{patientId}/Conditions/{conditionId}/Medications/{medicationtId}",
                defaults: new { controller = "Medication", medicationtId = RouteParameter.Optional }
            );

            var appXmlType = config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
            config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType);
        }
    }
}
