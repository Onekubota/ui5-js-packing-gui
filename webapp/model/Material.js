sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function(JSONModel) {
	"use strict";

	return new JSONModel({
		"otherMaterials": [],
		"favoriteMaterials": [],
		"currentMaterial": {},
		"materialLayout": [],
		"selectedMaterialId": "",
		"defaultMaterialId": "",
		"originalMaterialId": ""
	});
});