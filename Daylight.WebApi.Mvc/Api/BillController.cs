using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Daylight.WebApi.Core.Attributes;
using Daylight.WebApi.Mvc.Factories;
using Daylight.WebApi.Mvc.Models;
using Daylight.WebApi.Security;

namespace Daylight.WebApi.Mvc.Api
{
    [Backbone]
    [HttpRequiredFeature(FeatureIdentifier.Billing)]
    public class BillController : ApiController
    {
        private readonly IViewFactory viewFactory;
        private readonly IItemFactory itemFactory;

        public BillController(IViewFactory viewFactory, IItemFactory itemFactory)
        {
            this.itemFactory = itemFactory;
            this.viewFactory = viewFactory;
        }

        public IEnumerable<BillViewModel> Get(Guid patientId)
        {
            return viewFactory.GetPatient(patientId).Bills;
        }

        public BillViewModel Get(Guid billId, Guid patientId)
        {
            return viewFactory.GetBill(billId, patientId);
        }

        public BillViewModel Post([FromBody]BillViewModel model, Guid patientId)
        {
            if (model == null || !ModelState.IsValid || model.Id != Guid.Empty)
            {
                throw this.BadRequestException("Bill is null or invalid");
            }

            var bill = itemFactory.Save(model, patientId);
            var bmodel = viewFactory.GetBill(bill.BillId, patientId);
            return bmodel;
        }

        public BillViewModel Put([FromBody]BillViewModel model, Guid patientId)
        {
            if (model == null || !ModelState.IsValid || model.Id == Guid.Empty)
            {
                throw this.BadRequestException("Bill is null or invalid");
            }

            var bill = itemFactory.Save(model, patientId);
            return viewFactory.GetBill(bill.BillId, patientId);
        }

        public HttpResponseMessage Delete(Guid billId, Guid patientId)
        {
            itemFactory.DeleteBill(billId, patientId);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
