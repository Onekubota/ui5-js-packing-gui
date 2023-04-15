/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"zscm/ewm/packoutbdlvs1/workflows/WorkFlow",
	"zscm/ewm/packoutbdlvs1/utils/Util",
	"zscm/ewm/packoutbdlvs1/service/ODataService",
	"zscm/ewm/packoutbdlvs1/modelHelper/Material",
	"zscm/ewm/packoutbdlvs1/modelHelper/Global",
	"zscm/ewm/packoutbdlvs1/modelHelper/Message",
	"zscm/ewm/packoutbdlvs1/utils/Const"
], function(WorkFlow, Util, Service, MaterialHelper, Global, Message, Const) {
	"use strict";
	return function(oSourceController, oShipController) {
		var oWorkFlow = new WorkFlow()
			.then(function() {
				return Service.terminateSession();
			}, oSourceController)
			.then(function() {
				this.clearSourceBeforeLeave();
				this.unbindODOInfo();
				this.unbindProductInfo();
				return this.disableButtons();
			}, oSourceController, "clear source side")
			.then(function() {
				this.updateInputWithDefault(Const.ID.SHIP_INPUT, "");
				this.clearShipHUTabs();
				this.oItemHelper.clear();
				MaterialHelper.setCurrentMaterial({});
				Global.removeAllShipHandlingUnits();
				this.setCurrentShipHandlingUnit("");
				this.clearPackingInstr();                
			}, oShipController, "clear ship side")
			.then(function() {
				Message.clearAll();
			}, oShipController, "clear message")
			.then(function() {
				this.navToHome();
			}, oSourceController, "nav to home")
			.then(function() {
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