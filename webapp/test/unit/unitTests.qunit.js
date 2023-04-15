/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zscmewmpackoutbdlvs1/zewm_pkodl_mans1/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
