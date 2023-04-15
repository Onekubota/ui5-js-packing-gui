/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"zscm/ewm/packoutbdlvs1/modelHelper/Items",
	"sap/ui/model/json/JSONModel",
	"zscm/ewm/packoutbdlvs1/control/Audio"
], function(Controller,TableItemsHelper, JSONModel, Audio) {
	"use strict";
	return Controller.extend("zscm.ewm.packoutbdlvs1.controller.App", {
		onInit: function() {
			this.getView().setModel(this.getOwnerComponent().getModel());
		},
		bindAudioList: function(aFilter) { 
			this.byId("audio-player").bindItems({
                path: "/AudioURISet",
                template: new Audio({
                	src: "{AudioUri}",
                	type: "{Msgty}"
                }),
                filters: aFilter
            });
		}
	});
});