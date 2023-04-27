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
			.then(function(bAll, mSession) {
				this.setBusy(true);
				if (bAll) {
					return Service.printAll();
				}
				return Service.print();
			}, oShipController, "init package matrial buttons")
			.then(function(result, mSession) {
				var aHusWithoutTrks = result
					.filter(entity => entity.CheckTrackNumberRequirement.TracknumRequirement === true)
					.map(entity => entity.CheckTrackNumberRequirement);
				if (aHusWithoutTrks.length > 0) {
					return this.onOpenAssignTrackNumberDialog(aHusWithoutTrks);
				}
			}, oShipController, "Check if ship all needs to get tracknumbers")
			.then(function() {
				Message.addSuccess(this.getI18nText("printSuccess"));
				this.playAudio(Const.INFO);
				this.setBusy(false);
			}, oShipController, "init package matrial buttons");

		oWorkFlow
			.errors()
			.always(function(sError) {
				this.playAudio(Const.ERROR);
			});
		return oWorkFlow;
	};
});