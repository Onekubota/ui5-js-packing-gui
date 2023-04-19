sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function (JSONModel) {
	"use strict";
	return new JSONModel({
		"columnSettings": [
			{
				"columnKey": "dlv",
				"text": "",
				"index": 0,
				"visible": true,
				"defaultVisible": true,
				"defaultIndex": 0,
				"mandatory": true
			},
			{
				"columnKey": "productID",
				"text": "",
				"index": 1,
				"visible": true,
				"defaultVisible": true,
				"defaultIndex": 1,
				"mandatory": true
			},
			{
				"columnKey": "productDesc",
				"text": "",
				"index": 2,
				"visible": true,
				"defaultVisible": true,
				"defaultIndex": 2,
				"mandatory": false
			},
			{
				"columnKey": "quantity",
				"text": "",
				"index": 3,
				"visible": true,
				"defaultVisible": true,
				"defaultIndex": 3,
				"mandatory": true
			},
			{
				"columnKey": "uom",
				"text": "",
				"index": 4,
				"visible": true,
				"defaultVisible": true,
				"defaultIndex": 4,
				"mandatory": true
			},
			{
				"columnKey": "batch",
				"text": "",
				"index": 5,
				"visible": false,
				"defaultVisible": false,
				"defaultIndex": 5,
				"mandatory": false
			},
			{
				"columnKey": "sn",
				"text": "",
				"index": 6,
				"visible": true,
				"defaultVisible": true,
				"defaultIndex": 6,
				"mandatory": false
			},
			{
				"columnKey": "stockType",
				"text": "",
				"index": 7,
				"visible": false,
				"defaultVisible": false,
				"defaultIndex": 7,
				"mandatory": false
			},
			{
				"columnKey": "loadingWeight",
				"text": "",
				"index": 8,
				"visible": false,
				"defaultVisible": false,
				"defaultIndex": 8,
				"mandatory": false
			},
			{
				"columnKey": "weightUoM",
				"text": "",
				"index": 9,
				"visible": false,
				"defaultVisible": false,
				"defaultIndex": 9,
				"mandatory": false
			},
			{
				"columnKey": "volume",
				"text": "",
				"index": 10,
				"visible": false,
				"defaultVisible": false,
				"defaultIndex": 10,
				"mandatory": false
			},
			{
				"columnKey": "volumeUoM",
				"text": "",
				"index": 11,
				"visible": false,
				"defaultVisible": false,
				"defaultIndex": 11,
				"mandatory": false
			},
			{
				"columnKey": "stockDocumentNumber",
				"text": "",
				"index": 12,
				"visible": false,
				"defaultVisible": false,
				"defaultIndex": 12,
				"mandatory": false
			},
			{
				"columnKey": "stockItemNumber",
				"text": "",
				"index": 13,
				"visible": false,
				"defaultVisible": false,
				"defaultIndex": 13,
				"mandatory": false
			}
		],
		"enableRestore": false
	});
});