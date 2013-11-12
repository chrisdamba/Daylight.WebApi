using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Daylight.WebApi.Contracts.Entities;
using Daylight.WebApi.Mvc.Models;

namespace Daylight.WebApi.Mvc.Factories
{
    public interface IItemFactory
    {
        void Delete(Guid patientId);

        Patient Save(PatientViewModel model);
    }
}