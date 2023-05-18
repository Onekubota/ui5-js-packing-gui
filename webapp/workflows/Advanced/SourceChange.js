sap.ui.define([
	"zscm/ewm/packoutbdlvs1/workflows/WorkFlow",
	"zscm/ewm/packoutbdlvs1/utils/Util",
	"zscm/ewm/packoutbdlvs1/service/ODataService",
	"zscm/ewm/packoutbdlvs1/modelHelper/Global",
	"zscm/ewm/packoutbdlvs1/modelHelper/OData",
	"zscm/ewm/packoutbdlvs1/utils/Const",
	"zscm/ewm/packoutbdlvs1/modelHelper/ItemWeight",
	"zscm/ewm/packoutbdlvs1/utils/CustomError",
	"sap/m/MessageBox",
	"zscm/ewm/packoutbdlvs1/modelHelper/Message",
	"zscm/ewm/packoutbdlvs1/modelHelper/Cache",
	"zscm/ewm/packoutbdlvs1/modelHelper/PackingMode"
], function (WorkFlow, Util, Service, Global, ODataHelper, Const, ItemWeight, CustomError, MessageBox, Message, Cache, PackingMode) {
	"use strict";
	return function (oSourceController, oShipController) {
		var oWorkFlow = new WorkFlow()
			.then(function (mPara, mSession) {
				mSession.sInput = mPara.sReferenceNumber;
				mSession.bReferenceNumberValidated = !!mPara.bReferenceNumberValidated;
			}, oSourceController, "disable ui interaction")
			.then(function () {
				this.updateInputWithDefault(Const.ID.SOURCE_INPUT, "");
				this.updateInputWithDefault(Const.ID.PRODUCT_INPUT, "");
			}, oSourceController)
			.then(function (mResponse, mSession) {
				if (Global.isShipHandlingUnitExist(mSession.sInput)) {
					if (ODataHelper.isShipHUClosed(mSession.sInput)) {
						throw new CustomError(Const.ERRORS.SHIP_HU_ALREADY_CLOSED);
					}
					return this.getHandlingUnitDisplayWhenScanOnOtherSide();
				}
			}, oShipController, "if the user scans the ship hu, determine how to display it")
			.then(function (preResult, mSession) {
				if (Global.isShipHandlingUnitExist(mSession.sInput)) {
					if (mSession.sInput === Global.getCurrentShipHandlingUnit()) {
						var oDeleteInfo = {
							"bCallService": false,
							"bRefreshSource": false
						};
						this.getWorkFlowFactory().getShipHUDeleteWorkFlow().run(oDeleteInfo);
					} else {
						Cache.clearShipHU(mSession.sInput);
						this.removeTabByTabName(mSession.sInput);
						Global.removeShipHandlingUnit(mSession.sInput);
					}
				}
			}, oShipController, "remove ship hu if need")
			.then(function () {
				this.setBusy(true);
				this.unbindProductInfo();
				this.unbindImage();
				this.oItemHelper.clear();
				Global.setProductId("");
			}, oSourceController, "clear the info of previouse source hu/bin")
			.then(function () {
				this.updateInputWithDefault(Const.ID.SHIP_INPUT, "");
			}, oShipController, "clear the ship input")
			.then(function () {
				if (Util.isEmpty(Global.getCurrentShipHandlingUnit())) {
					ItemWeight.clear();
				}
			}, oSourceController, "clear ItemWeight")
			.then(function (preResult, oParam) {
				this.clearPackingInstr();
			}, oShipController, "update packing info")
			.then(function (preResult, mSession) {
					if (!mSession.bReferenceNumberValidated) {
						return Service
							.verifySource(mSession.sInput);
					}
				}, oSourceController,
				"verify reference number based on bReferenceNumberValidated flag: if it is triggered by unpack/unpackAll action do not need to verify"
			)
			.then(function (mResponse, mSession) {
				if (!mSession.bReferenceNumberValidated && mResponse.Closed) {
					throw new CustomError(Const.ERRORS.SHIP_HU_ALREADY_CLOSED);
				}
				if (!mSession.bReferenceNumberValidated) {
					// Global.setBin(mResponse.EWMStorageBin);
					Global.setSourceId(mResponse.SourceId);
					Global.setSourceType(mResponse.SourceType);
					Global.setSourceMaterialId(mResponse.PackagingMaterial);
					Global.setIsPickHUInSourceSide(mResponse.IsPickHU);
				}
			}, oShipController, "set gloable model")
			.then(function () {
				return Service
					.getHUItems(Global.getSourceId());
			}, oSourceController, "request the HU/Bin items")
			.then(function (aItem, mSession) {
				this.oItemHelper.setItems(aItem);
				if (aItem.length !== 0) {
					this.bindODOInfo();
					if (!PackingMode.isInternalMode()) {
						this.oItemHelper.setItemsStatusByConsGrp();
					}
					mSession.consolidationGroup = aItem[0].EWMConsolidationGroup;
				}
				mSession.aItem = aItem;
			}, oSourceController, "update items info to helper method")
			.then(function () {
				this.handlePackAllEnable();
			}, oSourceController, "enable pack all if the items of source/ship hu belongs to same consolidation group")
			.then(function (mFirstItem, mSession) {
				Global.setExceptionEnable(false);
			}, oSourceController, "disable exception buttons")
			.then(function (vPre, mSession) {
				this.setBusy(false);
				this.dehilightShipHandlingUnits();
				this.updateInputWithDefault(Const.ID.SHIP_INPUT, "");
			}, oShipController, "highlight tab if possible")
			.then(function (vPre, mSession) {
				if (!this.oItemHelper.isEmpty() && !ODataHelper.isShipHUClosed()) {
					Global.setUnpackEnable(true);
				}
				this.updateShipItemStatus();
			}, oShipController, "highlight unpack/unpackAll button and hight light first item")
			.then(function (vPre, mSession) {
				if (mSession.aItem.length !== 0 && this.needAutoCreateShippingHU(mSession.consolidationGroup)) {
					this.onOpenCreateShipHUDialog();
				}
			}, oShipController, "open create shiphu dialog in need")
			.then(function (vPre, mSession) {
				if (!Util.isEmpty(Global.getCurrentShipHandlingUnit())) {
					this.updateItemWeightInNeed();
				}
			}, oSourceController, "check if there exists source item which is not in ItemWeight")
			.then(function () {
				this.setBusy(false);
				this.focus(Const.ID.PRODUCT_INPUT);
			}, oSourceController, "enable ui interaction")
			.then(function (preResult, mSession) {
				this.delayCalledAdjustContainerHeight();
			}, oShipController);

		oWorkFlow
			.errors()
			.subscribe(Const.ERRORS.HU_SHIP_ASSIGNED, function (sError) {
				this.updateInputWithError(Const.ID.SOURCE_INPUT, sError);
			}, oSourceController)
			.subscribe(Const.ERRORS.HU_NOT_EXIST, function (sError) {
				this.updateInputWithError(Const.ID.SOURCE_INPUT, sError);
			}, oSourceController)
			.subscribe(Const.ERRORS.BIN_NOT_EXIST, function () {
				var sError = this.getI18nText(Const.ERRORS.BIN_NOT_EXIST);
				this.updateInputWithError(Const.ID.SOURCE_INPUT, sError);
			}, oSourceController)
			.subscribe(Const.ERRORS.BIN_NOT_IN_PACKING_STATION, function () {
				var sError = this.getI18nText(Const.ERRORS.BIN_NOT_EXIST);
				this.updateInputWithError(Const.ID.SOURCE_INPUT, sError);
			}, oSourceController)
			.subscribe(Const.ERRORS.SOURCE_NO_ITEM, function () {
				var sError = this.getTextAccordingToMode("sourceWithoutItem", "sourceNoItem", [Global.getSourceId()]);
				this.updateInputWithError(Const.ID.SOURCE_INPUT, sError);
			}, oSourceController)
			.subscribe(Const.ERRORS.HU_NOT_IN_WORK_CENTER, function (sError) {
				this.updateInputWithError(Const.ID.SOURCE_INPUT, sError);
			}, oSourceController)
			.subscribe(Const.ERRORS.STORAGE_BIN_NOT_IN_WAREHOUSE, function (sError) {
				this.updateInputWithError(Const.ID.SOURCE_INPUT, sError);
			}, oSourceController)
			.subscribe(Const.ERRORS.HU_OR_BIN_NOT_IN_WAREHOUSE, function (sError) {
				this.updateInputWithError(Const.ID.SOURCE_INPUT, sError);
			}, oSourceController)
			.subscribe(Const.ERRORS.SHIP_HU_ALREADY_CLOSED, function (sError, vPara, mSession) {
				var sErrorMessage = this.getTextAccordingToMode("HUClosedMsg", "shipHUClosedMsg", [mSession.sInput]);
				this.updateInputWithError(Const.ID.SOURCE_INPUT, sErrorMessage);
			}, oSourceController)
			.default(function () {
				this.updateInputWithError(Const.ID.SOURCE_INPUT);
			}, oSourceController)
			.always(function () {
				this.setBusy(false);
				this.focus(Const.ID.SOURCE_INPUT);
				Global.setSourceId("");
				this.oItemHelper.setItems([]);
				this.unbindODOInfo();
				this.unbindProductInfo();
				this.unbindImage();
				this.disableButtons();
				this.playAudio(Const.ERROR);
			}, oSourceController)
			.always(function () {
				Global.setUnpackEnable(false);
				if (!this.oItemHelper.isEmpty()) {
					this.oItemHelper.setItemsStatusToNone();
				}
			}, oShipController);
		return oWorkFlow;

	};
});