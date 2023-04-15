/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["zscm/ewm/packoutbdlvs1/model/Material","zscm/ewm/packoutbdlvs1/utils/Util"],function(M,U){"use strict";var _;var a;return{setData:function(m){this.storeMaterialAsMap(m);var b=this.separateMaterials(m);var f=b[0];var o=b[1];this.setFavoriteMaterials(f);this.setOtherMaterials(o);this.setMaterialLayout(f);this.setDefaultMaterialId(m);},separateMaterials:function(m){var f=[];var o=[];m.forEach(function(b){if(b.IsFavorite===true){b.Selected=false;f.push(b);}else{o.push(b);}});return[f,o];},transformMaterialLayout:function(m){var b=[],o,r,c,d,R;if(m.length>0){for(var i=0;i<m.length;){R=Math.ceil(m.length/2);for(r=0;r<R;r++){if(b[r]===undefined){b[r]={cells:[]};}for(c=0;c<2;c++){o=m[i];if(o!==undefined){d={pressed:false,materialCode:o.DisplayCode,materialName:o.PackagingMaterialDescription,materialId:o.PackagingMaterial,isInternal:o.IsInternalNR};b[r].cells[c]=d;i++;}}}}}return b;},storeMaterialAsMap:function(m){_={};a={};m.forEach(function(o){_[o.PackagingMaterialDescription]=o;a[o.PackagingMaterial]=o;});},getMaterialByName:function(n){var m;if(_){m=_[n];}return m;},getMaterialById:function(m){var o;if(a){o=a[m];}return o;},setOtherMaterials:function(m){M.setProperty("/otherMaterials",m);},getOtherMaterials:function(){return M.getProperty("/otherMaterials");},setFavoriteMaterials:function(m){M.setProperty("/favoriteMaterials",m);},getFavoriteMaterials:function(){return M.getProperty("/favoriteMaterials");},setMaterialLayout:function(m){M.setProperty("/materialLayout",this.transformMaterialLayout(m));},getMaterialLayout:function(){return M.getProperty("/materialLayout");},setCurrentMaterial:function(m){M.setProperty("/currentMaterial",m);},getCurrentMaterial:function(){return M.getProperty("/currentMaterial");},getCurrentMaterialId:function(){return M.getProperty("/currentMaterial/PackagingMaterial");},getCurrentMaterialUom:function(){return M.getProperty("/currentMaterial/MaxWeightUoM");},setOriginalMaterialId:function(m){M.setProperty("/originalMaterialId",m);},getOriginalMaterialId:function(){return M.getProperty("/originalMaterialId");},getCurrentMaterialMaxWeight:function(){return M.getProperty("/currentMaterial/HandlingUnitMaxWeight");},getCurrentMaterialMaxWeightTol:function(){return M.getProperty("/currentMaterial/MaxWeightTol");},getCurrentMaterialTareWeight:function(){return M.getProperty("/currentMaterial/GrossWeight");},getMaterialIdByPath:function(p){return M.getProperty(p+"/materialId");},getFavoriteMaterialIdByPath:function(p){return M.getProperty(p+"/PackagingMaterial");},getSelectedMaterialId:function(){return M.getProperty("/selectedMaterialId");},setSelectedMaterialId:function(m){M.setProperty("/selectedMaterialId",m);},getDefaultMaterialId:function(){return M.getProperty("/defaultMaterialId");},setDefaultMaterialId:function(m){var r=U.find(m,function(o){if(o.IsDefault===true){return true;}return false;});if(r){this.setFavoriteMaterialSelectedById(r.PackagingMaterial,true);M.setProperty("/defaultMaterialId",r.PackagingMaterial);}else{M.setProperty("/defaultMaterialId","");}},setFavoriteMaterialSelectedByDefault:function(){var f=this.getFavoriteMaterials();f.forEach(function(m){this.setFavoriteMaterialSelectedById(m.PackagingMaterial,m.IsDefault);}.bind(this));},setMaterialPressedById:function(m,p){var l=this.getMaterialLayout();l.forEach(function(L){L.cells.forEach(function(o){if(o.materialId===m){o.pressed=p;}});});M.updateBindings(true);},setCurrentMaterialById:function(m){var o=this.getMaterialById(m);this.setCurrentMaterial(o);},IsSelectedMaterialExternal:function(m){if(U.isEmpty(m)){m=this.getSelectedMaterialId();}var o=this.getMaterialById(m);return!o.IsInternalNR;},IsMaterialFavorite:function(m){var f=this.getFavoriteMaterials();var r=U.find(f,function(o){if(o.PackagingMaterial===m){return true;}return false;});if(r){return true;}return false;},clearFormerPressedMaterial:function(){var s=this.getSelectedMaterialId();if(!U.isEmpty(s)){this.setMaterialPressedById(s,false);}},setFavoriteMaterialSelectedById:function(m,s){var o=this.getMaterialById(m);o.Selected=s;M.updateBindings(true);}};});
