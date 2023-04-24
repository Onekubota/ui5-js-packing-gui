sap.ui.define([
	"zscm/ewm/packoutbdlvs1/workflows/WorkFlow",
	"zscm/ewm/packoutbdlvs1/utils/Util",
	"zscm/ewm/packoutbdlvs1/service/ODataService",
	"zscm/ewm/packoutbdlvs1/modelHelper/Global",
	"zscm/ewm/packoutbdlvs1/modelHelper/Message",
	"zscm/ewm/packoutbdlvs1/utils/Const"
], function (WorkFlow, Util, Service, Global, Message, Const) {
	"use strict";
	return function (oSourceController, oShipController) {
		var oWorkFlow = new WorkFlow()
			.then(function () {
				this.setBusy(true);
				this.oRateShopModel.setData([]);
				var itemHelper = this.oItemHelper.getModel().getProperty("/0");
				if (itemHelper) {
					var carrierId = itemHelper.CarrierServiceId;
					if (!!carrierId && carrierId !== "") {
						return Service.getRateShops(carrierId);
					}
				}
			}, oSourceController)
			.then(function (result) {
				this.oRateShopModel.setData(result);
				this.getRateShopDialog().open();
				this.setBusy(false);
			}, oSourceController)

		oWorkFlow
			.errors()
			.always(function () {
				this.setBusy(false);
				this.playAudio(Const.ERROR);
			}, oSourceController);
		return oWorkFlow;
	};
});