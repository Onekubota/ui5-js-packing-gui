/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"zscm/ewm/packoutbdlvs1/workflows/WorkFlow",
	// "zscm/ewm/packoutbdlvs1/utils/Util",
	// "zscm/ewm/packoutbdlvs1/service/ODataService",
	// "zscm/ewm/packoutbdlvs1/modelHelper/Global",
	// "zscm/ewm/packoutbdlvs1/modelHelper/OData",
	// "zscm/ewm/packoutbdlvs1/utils/Const",
	// "zscm/ewm/packoutbdlvs1/modelHelper/Cache"
], function (WorkFlow 
	//, Util, Service, Global, ODataHelper, Const, Cache
	) {
	"use strict";
	return function (oSourceController, oFeatureController) {
		var oWorkFlow = new WorkFlow()
			.then(function (sInput, mSession) {
				debugger;
				// mSession.sHuId = sInput;
				// this.updateInputWithDefault(Const.ID.SHIP_INPUT, "");
			}, oFeatureController);

		// oWorkFlow
		// 	.errors()
		// 	.subscribe(Const.ERRORS.SCAN_SOURCEHU_IN_SHIP_INPUT, function (sError) {
		// 		sError = this.getTextAccordingToMode("scanSourceInHUInput", "scanSourceInShippingInput");
		// 		this.updateInputWithError(Const.ID.SHIP_INPUT, sError);
		// 		this.focus(Const.ID.SHIP_INPUT);
		// 	}, oShipController);
		return oWorkFlow;

	};
});