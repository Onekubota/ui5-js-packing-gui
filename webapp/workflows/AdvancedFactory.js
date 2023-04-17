sap.ui.define([
	"zscm/ewm/packoutbdlvs1/workflows/Factory",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/ChangeMaterial",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/CloseShipHU",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/CreateShipHU",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/DeleteShipHU",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/PackAll",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/PackItem",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/PackPartial",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/PackWithDifference",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/ProductChange",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/SelectShipHU",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/SourceChange",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/UnpackAll",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/UnpackItem",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/QuantityChange",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/Leave",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/RestoreShipHU",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/Clear",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/Print",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/ShippingHUChange",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/FeatureSetChange"
], function(BaseObject, ChangeMaterial, CloseShipHU, CreateShipHU, DeleteShipHU, PackAll, PackItem, PackPartial, PackWithDifference,
	ProductChange, SelectShipHU, SourceChange, UnpackAll, UnpackItem, QuantityChange, Leave, RestoreShipHU, Clear, Print,
	ShippingHUChange, FeatureSetChange) {
	"use strict";
	var Factory = BaseObject.extend("zscm.ewm.packoutbdlvs1.workflows.AdvancedFactory", {
		aImplemention: [
			null,
			SourceChange,
			ProductChange,
			PackItem,
			PackWithDifference,
			PackPartial,
			UnpackItem,
			UnpackAll,
			SelectShipHU,
			CloseShipHU,
			ChangeMaterial,
			DeleteShipHU,
			CreateShipHU,
			QuantityChange,
			Leave,
			RestoreShipHU,
			PackAll,
			Clear,
			Print,
			ShippingHUChange,
			FeatureSetChange
		]
	});
	return Factory;
});