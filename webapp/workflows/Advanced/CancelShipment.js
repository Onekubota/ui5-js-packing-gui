sap.ui.define([
	"zscm/ewm/packoutbdlvs1/workflows/WorkFlow",
	"zscm/ewm/packoutbdlvs1/service/ODataService",
	"zscm/ewm/packoutbdlvs1/utils/Const",
	"zscm/ewm/packoutbdlvs1/modelHelper/Message",
	"zscm/ewm/packoutbdlvs1/modelHelper/Global",
	"zscm/ewm/packoutbdlvs1/modelHelper/OData"
], function (WorkFlow, Service, Const, Message, Global, ODataHelper) {
	"use strict";
	return function (oSourceController, oShipController) {
		var oWorkFlow = new WorkFlow()
			.then(function (mSession) {
				this.setBusy(true);
				var aItems = this.getView().byId("cancelShipSmartTable--inner").getSelectedItems();
				var aSelData = aItems.map(i => i.getBindingContext().getObject());
				return Service.cancelShipHandlingUnits(aSelData);
			}, oShipController, "Initiate cancel shipment")
			.then(function (result, mSession) {
				result.forEach(function (oHu) {
					var sShipHU = oHu.HuId;
					this.getWorkFlowFactory().getShipHUSelectionWorkFlow().run(sShipHU);
				}, this);
				this.onCancelShipmentDialog();
				this.setBusy(false);
			}, oShipController, "init package matrial buttons");

		oWorkFlow
			.errors()
			.always(function (oError) {
				this.setBusy(false);
				this.playAudio(Const.ERROR);
			}, oShipController, "Error/Reject");
		return oWorkFlow;
	};
});