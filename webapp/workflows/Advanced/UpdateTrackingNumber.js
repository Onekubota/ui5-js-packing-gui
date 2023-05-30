sap.ui.define([
	"zscm/ewm/packoutbdlvs1/workflows/WorkFlow",
	"zscm/ewm/packoutbdlvs1/service/ODataService",
	"zscm/ewm/packoutbdlvs1/utils/Const",
	"zscm/ewm/packoutbdlvs1/modelHelper/Message",
	"zscm/ewm/packoutbdlvs1/modelHelper/Global",
	"zscm/ewm/packoutbdlvs1/modelHelper/OData"
], function(WorkFlow, Service, Const, Message, Global, ODataHelper) {
	"use strict";
	return function(oSourceController, oShipController) {
		var oWorkFlow = new WorkFlow()
		.then(function(aHandlingUnits, mSession) {
			this.oTrkNumberDialog.setBusy(true);
			var aHusNew = aHandlingUnits.filter(oHu => oHu.preAssigned === false);
			ODataHelper.setUseBatch(false);
			return Service.updateTrackingNumbers(aHusNew);
		}, oShipController, "init package matrial buttons")
		.then(function(result, mSession) {
			ODataHelper.setUseBatch(true);
			var aErrors = result.filter(o => o.error !== null).map(o => o.error);
			var aSuccess = result.filter(o => o.data !== null).map(o => o.data);
			this.oTrkNumberDialog.setBusy(false);
			aSuccess.forEach(function(data) {
				var sShipHU = data.HuId;
				if (data.MsgVar.trim() !== "") {
					Message.addSuccess(data.MsgVar);
				}
				this.getWorkFlowFactory().getShipHUSelectionWorkFlow().run(sShipHU);
			}, this);
			if (aErrors.length > 0) {				
				this.showUpdateTrackingBackendErrors(aErrors);
			}
			if (aSuccess.length > 0) {
				this.oTrkNumberDialog.resolve(aSuccess);				
			}
			this.oTrkNumberDialog.close();
		}, oShipController, "init package matrial buttons");

		oWorkFlow
			.errors()
			.always(function(oError) {
				ODataHelper.setUseBatch(true);
				this.oTrkNumberDialog.setBusy(false);
				this.playAudio(Const.ERROR);
			}, oShipController, "Error/Reject");
		return oWorkFlow;
	};
});