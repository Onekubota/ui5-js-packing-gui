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
			.then(function (bAll, mSession) {
				this.setBusy(true);
				mSession.single = !bAll;
				mSession.updatingTrackNums = false;
				if (bAll) {
					return Service.printAll();
				}
				return Service.print();
			}, oShipController, "init package matrial buttons")
			.then(function (result, mSession) {
				var aHusWithoutTrks = result
					// .filter(entity => entity.CheckTrackNumberRequirement.TracknumRequirement === Const.TRACK_REQUIREMENT.POPUP)
					.map(entity => entity.CheckTrackNumberRequirement);
				var aHusWithTrks = ODataHelper.getShipHandlingUnitsForPrint()
					.filter(oHu => oHu.TrackNum.trim() !== "");
				if (aHusWithoutTrks.length > 0) {
					var aHuList = [...aHusWithoutTrks, ...aHusWithTrks];
					return this.onOpenAssignTrackNumberDialog(aHuList, mSession.single);
				}
			}, oShipController, "Check if ship all needs to get tracknumbers")
			// .then(function(aHandlingUnits, mSession) {
			// 	mSession.updatingTrackNums = true;
			// 	this.oTrkNumberDialog.setBusy(true);
			// 	return Service.updateTrackingNumbers(aHandlingUnits);
			// }, oShipController, "Data from dialog")
			// .then(function(result, mSession) {
			// 	if (mSession.updatingTrackNums) {
			// 		this.oTrkNumberDialog.setBusy(false);
			// 		this.oTrkNumberDialog.close();
			// 		debugger;
			// 	}
			// }, oShipController, "Data from dialog")
			.then(function () {
				Message.addSuccess(this.getI18nText("printSuccess"));
				this.playAudio(Const.INFO);
				this.setBusy(false);
			}, oShipController, "init package matrial buttons");

		oWorkFlow
			.errors()
			.always(function (bIgnore) {
				this.setBusy(false);
				if (!bIgnore)
					this.playAudio(Const.ERROR);
			}, oShipController, "Error/Reject");
		return oWorkFlow;
	};
});