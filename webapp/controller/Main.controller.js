sap.ui.define([
	"zscm/ewm/packoutbdlvs1/controller/BaseMain",
	"sap/tl/ewm/lib/reuses1/controllers/Base.controller",
	"zscm/ewm/packoutbdlvs1/utils/Util",
	"zscm/ewm/packoutbdlvs1/service/ODataService",
	"zscm/ewm/packoutbdlvs1/modelHelper/OData",
	"zscm/ewm/packoutbdlvs1/utils/Const",
	"sap/ui/model/json/JSONModel",
	"zscm/ewm/packoutbdlvs1/model/Message",
	"zscm/ewm/packoutbdlvs1/modelHelper/Message",
	"sap/m/MessagePopoverItem",
	"sap/m/MessagePopover",
	"sap/m/MessageBox",
	"zscm/ewm/packoutbdlvs1/modelHelper/Global",
	"zscm/ewm/packoutbdlvs1/model/SerialNumber",
	"zscm/ewm/packoutbdlvs1/workflows/SimpleFactory",
	"zscm/ewm/packoutbdlvs1/workflows/AdvancedFactory",
	"zscm/ewm/packoutbdlvs1/modelHelper/PackingMode",
	"zscm/ewm/packoutbdlvs1/modelHelper/Material"
], function (Controller, CommonBase, Util, Service, ODataHelper, Const, JSONModel, MessageModel, MessageHelper,
	MessagePopoverItem,
	MessagePopover, MessageBox, Global, SerialNumberModel, SimpleFactory, AdvancedFactory, PackingMode, Material) {
	"use strict";
	return Controller.extend("zscm.ewm.packoutbdlvs1.controller.Main", {
		sRouteName: "main",
		init: function () {
			CommonBase.prototype.initAccessCode.call(this);
			var oSourceController = this.byId("id-source-view").getController();
			var oShipController = this.byId("id-ship-view").getController();
			this.oWorkFlowFactory = new AdvancedFactory(oSourceController, oShipController);
		},

		onRouteMatched: function (oParameter) {
			Controller.prototype.onRouteMatched.call(this);
			this.publish(Const.EVENT_BUS.CHANNELS.USER_SETTING, Const.EVENT_BUS.EVENTS.SUCCESS);
			setTimeout(function(){
				this.publish(Const.EVENT_BUS.CHANNELS.EXCEPTION_LIST, Const.EVENT_BUS.EVENTS.SUCCESS, Global.getExceptionList());
			}.bind(this), 0);
		},

		getRateShops: function() {
			setTimeout(function(){
				this.publish(Const.EVENT_BUS.CHANNELS.RATE_SHOP, Const.EVENT_BUS.EVENTS.GET);
			}.bind(this), 0);
		}
	});
});