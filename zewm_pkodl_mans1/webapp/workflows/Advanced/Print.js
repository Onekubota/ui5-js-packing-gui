/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"zscm/ewm/packoutbdlvs1/workflows/WorkFlow",
	"zscm/ewm/packoutbdlvs1/service/ODataService",
	"zscm/ewm/packoutbdlvs1/utils/Const",
	"zscm/ewm/packoutbdlvs1/modelHelper/Message"
], function(WorkFlow, Service, Const, Message) {
	"use strict";
	return function(oSourceController, oShipController) {
		var oWorkFlow = new WorkFlow()
			.then(function() {
				return Service.print();
			}, oShipController, "init package matrial buttons")
			.then(function() {
				Message.addSuccess(this.getI18nText("printSuccess"));
				this.playAudio(Const.INFO);
			}, oShipController, "init package matrial buttons");

		oWorkFlow
			.errors()
			.always(function(sError) {
				this.playAudio(Const.ERROR);
			});
		return oWorkFlow;
	};
});