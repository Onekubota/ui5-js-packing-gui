/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"zscm/ewm/packoutbdlvs1/workflows/Factory",
	"zscm/ewm/packoutbdlvs1/workflows/Simple/Initialization",
	"zscm/ewm/packoutbdlvs1/workflows/Simple/ChangeMaterial",
	"zscm/ewm/packoutbdlvs1/workflows/Simple/CloseShipHU",
	"zscm/ewm/packoutbdlvs1/workflows/Simple/CreateShipHU",
	"zscm/ewm/packoutbdlvs1/workflows/Simple/DeleteShipHU",
	"zscm/ewm/packoutbdlvs1/workflows/Simple/PackAll",
	"zscm/ewm/packoutbdlvs1/workflows/Simple/PackItem",
	"zscm/ewm/packoutbdlvs1/workflows/Simple/PackPartial",
	"zscm/ewm/packoutbdlvs1/workflows/Simple/PackWithDifference",
	"zscm/ewm/packoutbdlvs1/workflows/Simple/ProductChange",
	"zscm/ewm/packoutbdlvs1/workflows/Simple/SelectShipHU",
	"zscm/ewm/packoutbdlvs1/workflows/Simple/SourceChange",
	"zscm/ewm/packoutbdlvs1/workflows/Simple/UnpackAll",
	"zscm/ewm/packoutbdlvs1/workflows/Simple/UnpackItem",
	"zscm/ewm/packoutbdlvs1/workflows/Simple/QuantityChange",
	"zscm/ewm/packoutbdlvs1/workflows/Simple/Leave",
	"zscm/ewm/packoutbdlvs1/workflows/Simple/RestoreShipHU",
	"zscm/ewm/packoutbdlvs1/workflows/Simple/Clear",
	"zscm/ewm/packoutbdlvs1/workflows/Advanced/Print"
], function(BaseObject, Initialization, ChangeMaterial, CloseShipHU, CreateShipHU, DeleteShipHU, PackAll, PackItem, PackPartial,
	PackWithDifference, ProductChange, SelectShipHU, SourceChange, UnpackAll, UnpackItem, QuantityChange, Leave, RestoreShipHU, Clear, Print) {
	"use strict";
	var Factory = BaseObject.extend("zscm.ewm.packoutbdlvs1.workflows.SimpleFactory", {
		aImplemention: [
			Initialization,
			SourceChange,
			ProductChange,
			PackItem,
			null,
			null,
			UnpackItem,
			null,
			null,
			CloseShipHU,
			ChangeMaterial,
			null,
			CreateShipHU,
			QuantityChange,
			Leave,
			RestoreShipHU,
			PackAll,
			Clear,
			Print,
			null
		]

	});
	return Factory;
});