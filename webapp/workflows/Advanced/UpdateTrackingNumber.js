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
			return Service.updateTrackingNumbers(aHusNew);
		}, oShipController, "init package matrial buttons")
		.then(function(result, mSession) {
			this.oTrkNumberDialog.setBusy(false);
			this.oTrkNumberDialog.resolve();
			this.oTrkNumberDialog.close();
			return Service.updateTrackingNumbers(aHandlingUnits);
		}, oShipController, "init package matrial buttons");

		oWorkFlow
			.errors()
			.always(function(oError) {
				this.oTrkNumberDialog.setBusy(false);
				this.playAudio(Const.ERROR);
			}, oShipController, "Error/Reject");
		return oWorkFlow;
	};
});