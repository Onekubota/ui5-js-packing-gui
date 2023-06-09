sap.ui.define([
	"zscm/ewm/packoutbdlvs1/workflows/WorkFlow",
	"zscm/ewm/packoutbdlvs1/modelHelper/Global",
	"zscm/ewm/packoutbdlvs1/utils/Util",
	"zscm/ewm/packoutbdlvs1/service/ODataService",
	"zscm/ewm/packoutbdlvs1/utils/Const",
	"zscm/ewm/packoutbdlvs1/modelHelper/Message"
], function(WorkFlow, Global, Util, Service, Const, Message) {
	"use strict";
	return function(oSourceController, oShipController) {
		var oWorkFlow = new WorkFlow()
			.then(function() {
				var oPromise = this.flushPendings();
				this.setBusy(true);
				return oPromise;
			}, oShipController)
			.then(function() {
				return Service.terminateSession();
			})
			.then(function() {
				this.clearSourceBeforeLeave();
				this.byId("product-info").unbindElement();
				return Global.setPackAllEnable(false);
			}, oSourceController, "clear source side")
			.then(function() {
				this.clearShipHUTabs();
				this.oItemHelper.clear();
				this.setCurrentShipHandlingUnit("");
				this.clearPackingInstr();
			}, oShipController, "clear ship side")
			.then(function() {
				Message.clearAll();
			}, oShipController, "clear message")
			.then(function() {
				this.navToHome();
			}, oSourceController, "nav to home")
			.then(function(preResult, oParams) {
				this.setBusy(false);
			}, oShipController);

		oWorkFlow
			.errors()
			.always(function() {
				this.setBusy(false);
				this.playAudio(Const.ERROR);
			}, oSourceController);
		return oWorkFlow;

	};
});