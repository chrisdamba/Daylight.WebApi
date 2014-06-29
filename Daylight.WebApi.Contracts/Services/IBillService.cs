using System;
using Daylight.WebApi.Contracts.Entities;

namespace Daylight.WebApi.Contracts.Services
{
    public interface IBillService
    {
        void Save(Bill bill, Guid conditionId, Guid patientId);
    }
}
