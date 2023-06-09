    sap.ui.define([
    	"sap/ui/model/json/JSONModel"
    ], function (JSONModel) {
    	"use strict";
    	return new JSONModel({
    		"columnSettings": [{
    			"columnKey": "productID",
    			"text": "",
    			"index": 0,
    			"visible": true,
    			"defaultVisible": true,
    			"defaultIndex": 0,
    			"mandatory": true
    		}, {
    			"columnKey": "productDesc",
    			"text": "",
    			"index": 1,
    			"visible": false,
    			"defaultVisible": false,
    			"defaultIndex": 1,
    			"mandatory": false
    		}, {
    			"columnKey": "quantity",
    			"text": "",
    			"index": 2,
    			"visible": true,
    			"defaultVisible": true,
    			"defaultIndex": 2,
    			"mandatory": true
    		}, {
    			"columnKey": "uom",
    			"text": "",
    			"index": 3,
    			"visible": true,
    			"defaultVisible": true,
    			"defaultIndex": 3,
    			"mandatory": true
    		}, {
    			"columnKey": "stockType",
    			"text": "",
    			"index": 4,
    			"visible": false,
    			"defaultVisible": false,
    			"defaultIndex": 4,
    			"mandatory": false
    		}, {
    			"columnKey": "loadingWeight",
    			"text": "",
    			"index": 7,
    			"visible": false,
    			"defaultVisible": false,
    			"defaultIndex": 7,
    			"mandatory": false
    		}, {
    			"columnKey": "weightUoM",
    			"text": "",
    			"index": 8,
    			"visible": false,
    			"defaultVisible": false,
    			"defaultIndex": 8,
    			"mandatory": false
    		}, {
    			"columnKey": "volume",
    			"text": "",
    			"index": 9,
    			"visible": false,
    			"defaultVisible": false,
    			"defaultIndex": 9,
    			"mandatory": false
    		}, {
    			"columnKey": "volumeUoM",
    			"text": "",
    			"index": 10,
    			"visible": false,
    			"defaultVisible": false,
    			"defaultIndex": 10,
    			"mandatory": false
    		}, {
    			"columnKey": "stockDocumentNumber",
    			"text": "",
    			"index": 11,
    			"visible": false,
    			"defaultVisible": false,
    			"defaultIndex": 11,
    			"mandatory": false
    		}, {
    			"columnKey": "stockItemNumber",
    			"text": "",
    			"index": 12,
    			"visible": false,
    			"defaultVisible": false,
    			"defaultIndex": 12,
    			"mandatory": false
    		}],
    		"enableRestore": false
    	});
    });