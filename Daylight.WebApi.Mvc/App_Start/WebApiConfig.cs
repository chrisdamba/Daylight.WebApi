using System.Linq;
using System.Web.Http;

namespace Daylight.WebApi.Mvc
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                 "API_Patients",
                 "API/Patients/{patientId}",
                 new { controller = "Patient", patientId = RouteParameter.Optional }
             );

            config.Routes.MapHttpRoute(
                "API_PatientThumbnails",
                "API/Patients/{patientId}/Thumbnail",
                new { controller = "Thumbnail" }
            );

            config.Routes.MapHttpRoute(
               "API_PatientVitals",
               "API/Patients/{patientId}/Vitals/{observationId}",
               new { controller = "Vital", observationId = RouteParameter.Optional }
           );

            config.Routes.MapHttpRoute(
               "API_PatientConditions",
                "API/Patients/{patientId}/Conditions/{conditionId}",
               new { controller = "Condition", conditionId = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                "API_PatientMedications",
                "API/Patients/{patientId}/Conditions/{conditionId}/Medications/{medicationtId}",
                new { controller = "Medication", medicationtId = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                "API_Events", 
                "API/Events/{eventId}", 
                new { controller = "Event", eventId = RouteParameter.Optional }
            );

            var appXmlType = config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
            config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType);
        }
    }
}
