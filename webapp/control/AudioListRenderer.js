/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([],function(){"use strict";var A={};A.render=function(r,a){var b=r;b.write("<div");b.writeControlData(a);b.write(">");var I=a.getItems();for(var i=0;i<I.length;i++){b.renderControl(I[i]);}b.write("</div>");};return A;},true);
