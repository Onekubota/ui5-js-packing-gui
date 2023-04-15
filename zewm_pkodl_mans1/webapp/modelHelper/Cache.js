/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"zscm/ewm/packoutbdlvs1/model/Global",
	"zscm/ewm/packoutbdlvs1/utils/Util"
], function (Model, Util) {
	//todo:: consider a more elegant way, or in a more propriate place
	"use strict";
	var _mCache = {};
	var _mIsEmptyHU = {};
	return {
		updateShipHUConsGroup: function (sHU, sConsGroup) {
			_mCache[sHU] = sConsGroup;
		},
		getShipHUConsGroup: function (sHU) {
			return _mCache[sHU] === undefined ? "" : _mCache[sHU];
		},
		clearShipHU: function (sHU) {
			_mCache[sHU] = undefined;
		},
		replaceShipHUConsGroup: function (sOldConsGroup, sNewHU) {
			var sConsGroup = this.getShipHUConsGroup(sOldConsGroup);
			this.updateShipHUConsGroup(sNewHU, sConsGroup);
			this.clearShipHU(sOldConsGroup);
		},
		setIsEmptyHU: function (sHU, bValue) {
			_mIsEmptyHU[sHU] = bValue;
		},
		getIsEmptyHU: function (sHU) {
			return _mIsEmptyHU[sHU] === undefined ? true : _mIsEmptyHU[sHU];
		},
		reset: function () {
			_mCache = {};
			_mIsEmptyHU = {};
		}
	};
});