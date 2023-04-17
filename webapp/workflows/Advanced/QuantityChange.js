sap.ui.define([
	"zscm/ewm/packoutbdlvs1/workflows/WorkFlow",
	"zscm/ewm/packoutbdlvs1/utils/Util"
], function(WorkFlow, Util) {
	"use strict";
	return function(oSourceController, oShipController) {
		var oWorkFlow = new WorkFlow()
			.then(function(){
				
			}, oSourceController)
			.then(function(){
				
			}, oShipController);
			
			oWorkFlow
				.errors()
				.subscribe("", function() {
					
				});
		return oWorkFlow;
			
	};
});