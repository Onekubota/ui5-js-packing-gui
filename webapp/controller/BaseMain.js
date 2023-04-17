sap.ui.define([
	"zscm/ewm/packoutbdlvs1/controller/BaseController",
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
	return Controller.extend("zscm.ewm.packoutbdlvs1.controller.BaseMain", {
		sRouteName: "main",
		init: function () {
			CommonBase.prototype.initAccessCode.call(this);
			this.setButtonToolTip("leave-button");
		},
		initModel: function () {
			this.setModel(SerialNumberModel, "serialNum");
			this.setModel(MessageModel, "message");
		},
		onMessagePopoverPress: function (oEvent) {
			if (!this.oMessagePopover) {
				this.initMessagePopover();
			}
			this.oMessagePopover.toggle(oEvent.getSource());
		},
		initMessagePopover: function () {
			var oMessageTemplate = new MessagePopoverItem({
				type: '{type}',
				title: '{text}'
			});

			var oMessagePopover = new MessagePopover({
				items: {
					path: '/',
					template: oMessageTemplate
				}
			});
			oMessagePopover.setModel(MessageModel);
			this.oMessagePopover = oMessagePopover;
		},

		formatTitle: function (sBin, sWorkStation, sWarehouse) {
			if (Util.isEmpty(sWarehouse) || Util.isEmpty(sWorkStation) || Util.isEmpty(sBin)) {
				if (!Util.isEmpty(sWarehouse) && !Util.isEmpty(sWorkStation)) {
					return this.getI18nText("pageTitleNoStorageBin", [sWorkStation, sWarehouse]);
				} else {
					return "";
				}
			}
			return this.getI18nText("pageTitle", [sBin, sWorkStation, sWarehouse]);
		},

		onLeave: function (oEvent) {
			var bHaveShip = !Util.isEmpty(Global.getCurrentShipHandlingUnit());
			var sWarning = bHaveShip ? this.getTextAccordingToMode("leaveMsgSaveHU", "leaveMsgSaveShipHU") : this.getI18nText(
				"leaveMsgWhenNoShipHU");
			this.playAudio(Const.WARNING);
			MessageBox.warning(
				sWarning, {
					actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
					onClose: function (oAction) {
						if (oAction === MessageBox.Action.OK) {
							this.setBusy(true);
							this.oWorkFlowFactory.getLeaveWorkFlow().run();
						}
					}.bind(this)
				}
			);

		},

		leavePage: function (oEvent) {
			var bHaveShip = !Util.isEmpty(Global.getCurrentShipHandlingUnit());
			var oComponent = this.getOwnerComponent();
			if (bHaveShip) {
				var sWarning = this.getI18nText("leavePageMsg");
				this.playAudio(Const.WARNING);
				MessageBox.warning(
					sWarning, {
						actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
						onClose: function (oAction) {
							if (oAction === MessageBox.Action.OK) {
								this.navBack(oComponent);
							}
						}.bind(this)
					}
				);
			} else {
				this.navBack(oComponent);
			}
		},

		navBack: function (oComponent) {
			oComponent.navigateBack.call(oComponent, arguments);
		},

		onRouteMatched: function () {
			this.getOwnerComponent().getShellUIService().setBackNavigation(this.leavePage.bind(this));
		}
	});
});