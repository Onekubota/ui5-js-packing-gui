/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["zscm/ewm/packoutbdlvs1/controller/WorkFlowController","zscm/ewm/packoutbdlvs1/modelHelper/Global","zscm/ewm/packoutbdlvs1/service/ODataService","zscm/ewm/packoutbdlvs1/modelHelper/Message","zscm/ewm/packoutbdlvs1/utils/Util","zscm/ewm/packoutbdlvs1/model/Material","zscm/ewm/packoutbdlvs1/modelHelper/Material","zscm/ewm/packoutbdlvs1/modelHelper/Items","sap/ui/model/json/JSONModel","zscm/ewm/packoutbdlvs1/modelHelper/OData","zscm/ewm/packoutbdlvs1/utils/Const","zscm/ewm/packoutbdlvs1/modelHelper/Cache","zscm/ewm/packoutbdlvs1/utils/CustomError","sap/m/ValueColor","sap/ui/core/ValueState","sap/m/MessageBox","zscm/ewm/packoutbdlvs1/modelHelper/ItemWeight","zscm/ewm/packoutbdlvs1/model/AdvancedShipTableSetting","zscm/ewm/packoutbdlvs1/modelHelper/ColumnSettings","zscm/ewm/packoutbdlvs1/modelHelper/PackingMode","zscm/ewm/packoutbdlvs1/model/PackingMode","zscm/ewm/packoutbdlvs1/model/BasicShipTableSetting","zscm/ewm/packoutbdlvs1/model/InternalShipTableSetting"],function(C,G,S,M,U,a,b,T,J,O,c,d,e,V,f,g,I,A,h,P,j,B,k){"use strict";var q="quantity_input";var t="shipHU-";var w="weight-chart-id";var l="weight-comparison-id";var m="actual-weight-input";var n="empty-material-msg-strip";var o="no-change-strip";var p="empty-material-strip";var r="packaging-material-table";return C.extend("zscm.ewm.packoutbdlvs1.controller.Right",{oItemHelper:new T(new J([])),oColumnSettingsHelper:new h(new J([])),init:function(){sap.ui.Device.resize.attachHandler(function(){this.adjustContainerHeight();}.bind(this));this.setModel(j,"packMode");this.oInitTab=this.getTabByIndex(0);this.oInitTab.setText(c.INIT_TAB_TITLE);var W=this.getWeightChartByTitle(c.INIT_TAB_TITLE);if(!U.isEmpty(W)){W.setTooltip("");}U.flushPendings.set(this.flushPendings.bind(this));var i=this;this.oTemplate=new sap.m.Button({type:{path:"material>Selected",formatter:i.formatMaterialButtonType},text:{parts:[{path:"material>DisplayCode"},{path:"material>PackagingMaterialDescription"},{path:"material>PackagingMaterial"}],formatter:i.formatFavoriteMaterialText},enabled:{path:"global>/pendingTaskNumber",formatter:i.formatSimpleMaterialButtonEnable},press:i.onPressMaterial.bind(i),width:"100%"});this.setButtonToolTip("delete-ship-unit");this.setButtonToolTip("create-ship-unit");this.setButtonToolTip("print-button");this.setButtonToolTip("unpack-all-button");this.setButtonToolTip("unpack-button");this.setButtonToolTip("id-weight");this.setButtonToolTip("close-ship-hu");this.setButtonToolTip("close-closed-ship-hu");this.getRouter().attachRouteMatched(this.onRouteMatched,this);},initModel:function(){this.sTableId="ShipProductTable";this.setModel(this.oItemHelper.getModel(),c.ITEM_MODEL_NAME);this.setModel(a,"material");this.setModel(this.oColumnSettingsHelper.getModel(),c.COLUM_SETTING_MODEL_NAME);},getPersonlServiceContainerItemName:function(){if(P.isAdvancedMode()){return"advancedShipTableSettings";}else if(P.isBasicMode()){return"basicShipTableSettings";}else{return"internaldShipTableSettings";}},getDefaultColumnSettingNameInService:function(){if(P.isAdvancedMode()){return"advancedShipDefaultSettings";}else if(P.isBasicMode()){return"basicShipDefaultSettings";}else{return"internalShipDefaultSettings";}},getDefaultColumnSetting:function(){if(P.isAdvancedMode()){return JSON.parse(JSON.stringify(this._mAdvancedShipTableDefaultSettings));}else if(P.isBasicMode()){return JSON.parse(JSON.stringify(this._mBasicShipDefaultDefaultSettings));}else{return JSON.parse(JSON.stringify(this._mInternalShipTableDefaultSettings));}},getViewName:function(){return c.VIEW_SHIP;},getTableSettingDialogName:function(){return"zscm.ewm.packoutbdlvs1.view.ShipTableSettingDialog";},onAfterRendering:function(){this.adjustContainerHeight();},formatMaterialButtonType:function(D){if(D===true){return sap.m.ButtonType.Emphasized;}return sap.m.ButtonType.Default;},onProductItemPressed:function(E){this.oItemHelper.setItemsStatusToNone();var i=E.getSource().getBindingContext(c.ITEM_MODEL_NAME);var s=i.getPath();var u=i.getModel();u.setProperty(s+"/Status",sap.ui.core.MessageType.Success);this.focus(q);},updateUIElementsAfterCloseShipHU:function(i,s){var u;this.setBusy(false);if(i.MsgVar===""){u=this.getI18nText("closeShippingHU",G.getCurrentShipHandlingUnit());M.addSuccess(u);this.playAudio(c.INFO);}this.updateInputWithDefault(c.ID.SHIP_INPUT,"");},adjustContainerHeight:function(){var R=this.getView();var L=R.getParent().getContent()[0];var i=R.byId("right-container");var s=L.byId("left-container");var u=document.getElementById(s.getId());var v=document.getElementById(i.getId());if(!u||!v){return;}var x=R.byId("right-grid");var y=L.byId("left-grid");var z=document.getElementById(x.getId());var D=document.getElementById(y.getId());var E=z.offsetTop+z.offsetHeight;var F=D.offsetTop+D.offsetHeight;if(F>E){i.setHeight(F+"px");s.setHeight(F+"px");}else{i.setHeight(E+"px");s.setHeight(E+"px");}},delayCalledAdjustContainerHeight:function(){jQuery.sap.delayedCall(0,this,this.adjustContainerHeight);},getTabByIndex:function(i){var s=this.byId("shipHUBar");var u=s.getItems();return u[i];},getTabId:function(s){var i=U.getStringCharCode(s);return t+i;},getElementInTab:function(s,E){var i=sap.ui.core.Fragment.createId(this.getTabId(s),E);return sap.ui.getCore().byId(i);},updatePackingInstr:function(s,i){if(U.isEmpty(s)||U.isEmpty(i)){this.clearPackingInstr();return;}this.setPackingInstrText(i);var u=this.getI18nText("checkPackingInstr",s);M.addSuccess(u);this.playAudio(c.INFO);},clearPackingInstr:function(){this.setPackingInstrText("");},setPackingInstrText:function(s){var H=G.getCurrentShipHandlingUnit();if(U.isEmpty(H)){return;}var i=this.getElementInTab(H,"id-packing-instruction");if(!U.isEmpty(i)){i.setText(s);}},hasTabByTitle:function(s){var i=this.getTabIndexByTitle(s);if(i===-1){return false;}else{return true;}},getTabByTitle:function(s){var i=this.byId("shipHUBar");var u=i.getItems();var v=this.getTabIndexByTitle(s);if(v===-1){throw new e();}else{return u[v];}},getTabIndexByTitle:function(s){var i=this.byId("shipHUBar");var u=i.getItems();var v=this;var x=U.findIndex(u,function(y){var z=y.getText();if(z===s||z===v.decoratTabtitle(s)){return true;}return false;});if(x===-1){return-1;}return x;},decoratTabtitle:function(s){return"*"+s+"*";},onPressMaterial:function(E){var i=E.getSource();var s=i.getBindingContext("material").sPath;var u=b.getFavoriteMaterialIdByPath(s);if(b.IsSelectedMaterialExternal(u)){var v=this.getI18nText("createShipHUContactAdmin");this.showErrorMessageBox(v);return;}var x=b.getCurrentMaterialId();if(U.isEmpty(x)){var y={};y.sHuId="";y.sMaterialId=u;this.setBusy(true);this.getWorkFlowFactory().getShipHUCreationWorkFlow().run(y);}else{if(x===u){return;}else{this.setBusy(true);b.setSelectedMaterialId(u);this.getWorkFlowFactory().getMaterialChangeWorkFlow().run(G.getCurrentShipHandlingUnit());}}},initiateMaterialTable:function(s,i){var u=this.byId(s);u.destroyColumns();for(var v=0;v<i;v++){u.addColumn(new sap.m.Column());}},addTooltipToFavoriteMaterial:function(s){var i=this.byId(s);var u=i.getItems();var v=b.getFavoriteMaterials();var x=0;u.forEach(function(y){var z=y.getCells();z.forEach(function(D){var E=v[x++];var F=E.PackagingMaterial;if(!U.isEmpty(E.PackagingMaterialDescription)){F+=" - "+E.PackagingMaterialDescription;}D.setTooltip(F);});});},onOpenCreateShipHUDialog:function(){return new Promise(function(i,s){var v=this.getView();if(!this.oHandlingUnitDialog){this.oHandlingUnitDialog=sap.ui.xmlfragment(v.getId(),"zscm.ewm.packoutbdlvs1.view.CreateDialog",this);this.initiateMaterialTable(r,2);v.addDependent(this.oHandlingUnitDialog);}if(!this.oHandlingUnitDialog.isOpen()){this.updateInputWithDefault(c.ID.CREATE_SHIP_INPUT,"");this.oHandlingUnitDialog.open();}this.addTooltipToFavoriteMaterial(r);}.bind(this));},onBeforeOpenCreateDialog:function(){var D=b.getDefaultMaterialId();if(U.isEmpty(D)){b.setSelectedMaterialId("");}else{b.setMaterialPressedById(D,true);b.setSelectedMaterialId(D);}},onAfterOpenCreateDialog:function(){this.focus(c.ID.CREATE_SHIP_INPUT);},onAfterCloseCreateDialog:function(){this.getView().getParent().getContent()[0].byId("product-input").focus();this.clearComboBox("other-material-combo");this.setMessageStripVisible(n,false);b.clearFormerPressedMaterial();b.setSelectedMaterialId("");this.updateInputWithDefault(c.ID.CREATE_SHIP_INPUT,"");},handleButtonsEnableAfterCreate:function(s){if(!U.isEmpty(G.getSourceId())&&!O.isShipHUClosed()){if(s.isSingleConsGroupNoReduction&&!s.isSNEnable){G.setPackAllEnable(true);}var i=G.getProductId();if(!U.isEmpty(i)){G.setExceptionEnable(true);}}this.handleUnpackEnable();},needAutoCreateShippingHU:function(s){var i=G.getShipHandlingUnits();if(P.isInternalMode()){return i.length===0;}var u=false;if(i.length===0){u=true;}else{if(U.isEmpty(s)){return false;}else{var R=this.getShippingHUsByConsolidationGroup(s);var E=this.getEmptyShipHus();if(R.length===0&&E.length===0){u=true;}}}return u;},onOpenDeleteShipHUDialog:function(){var s=G.getCurrentShipHandlingUnit();var W;if(this.oItemHelper.isEmpty()){W=this.getTextAccordingToMode("deleteEmptyHU","deleteEmptyShipHU",[s]);}else{W=this.getTextAccordingToMode("deleteNonEmptyHU","deleteNonEmptyShipHU",[s,G.getSourceId()]);}g.warning(W,{actions:[g.Action.OK,g.Action.CANCEL],onClose:function(i){if(i===g.Action.OK){this.setBusy(true);var R=false;if(!this.oItemHelper.isEmpty()){R=(G.isPackFromBin()||G.isSourceTypeODO());}var D={"bCallService":true,"bRefreshSource":R};this.getWorkFlowFactory().getShipHUDeleteWorkFlow().run(D);}}.bind(this)});this.playAudio(c.WARNING);},deleteCurrentShipHandlingUnit:function(){this.oItemHelper.clear();var s=G.getCurrentShipHandlingUnit();G.removeShipHandlingUnit(s);b.setCurrentMaterial({});},getShippingHUsByConsolidationGroup:function(s){var i=G.getShipHandlingUnits();var R=[];i.forEach(function(u){if(d.getShipHUConsGroup(u)===s&&!O.isShipHUClosed(u)){R.push(u);}});return R;},handleUnpackEnable:function(){if(G.getPendingTaskNumber()===0&&!G.getCurrentShipHandlingUnitClosed()&&!U.isEmpty(G.getSourceId())&&!this.oItemHelper.isEmpty()&&this.oItemHelper.getHighLightedItemIndex()===0){G.setUnpackEnable(true);}else{G.setUnpackEnable(false);}},autoCreateShipHUAfterClose:function(){var D=b.getDefaultMaterialId();var s=b.getCurrentMaterialId();if(U.isEmpty(D)){return;}var i={};i.sHuId="";i.sMaterialId=D;this.setBusy(true);this.getWorkFlowFactory().getShipHUCreationWorkFlow().run(i);b.setFavoriteMaterialSelectedById(D,true);b.setFavoriteMaterialSelectedById(s,false);},onShipHUIDChange:function(E){var i=U.trim(E.getParameter("newValue")).toUpperCase();this._changeHandlingUnitId(c.ID.CREATE_SHIP_INPUT,"create",i);},onShipHUIDSubmit:function(E){if(this.byId(c.ID.CREATE_SHIP_INPUT).getValueState()==="None"){this.byId("create").firePress();}},onChangeShippingHUId:function(E){var i=U.trim(E.getParameter("newValue")).toUpperCase();this._changeHandlingUnitId(c.ID.CHANGE_SHIP_INPUT,"confirm-change-material-button",i);if(i!==G.getCurrentShipHandlingUnit()){this.setMessageStripVisible(o,false);}else{var s=this.getTextAccordingToMode("changeHUMaterialWithOldId","changeShipHUMaterialWithOldId");this.updateInputWithError(c.ID.CHANGE_SHIP_INPUT,s);this.playAudio(c.ERROR);}},onChangeShippingHUIdSubmit:function(){if(this.byId(c.ID.CHANGE_SHIP_INPUT).getValueState()==="None"){this.byId("confirm-change-material-button").firePress();}},_changeHandlingUnitId:function(i,s,u){if(U.isEmpty(b.getSelectedMaterialId())){this.updateInputWithDefault(i,u);}else if(b.IsSelectedMaterialExternal()){if(u===""){this.updateInputWithError(i);this.playAudio(c.ERROR);return;}else{this.updateInputWithDefault(i,u);}}else{this.updateInputWithDefault(i,u);}},onToggleMaterial:function(E){var i=E.getSource();var s=i.getBindingContext("material");var u=s.sPath;if(i.getPressed()){b.clearFormerPressedMaterial();var v=b.getMaterialIdByPath(u);b.setSelectedMaterialId(v);this.setMessageStripVisible(n,false);this.clearComboBox("other-material-combo");}else{b.setSelectedMaterialId("");}this.focus(c.ID.CREATE_SHIP_INPUT);},onSelectOtherMaterial:function(E){var i=U.trim(E.getParameter("newValue"));setTimeout(function(){var s=this.byId("other-material-combo");var u=s.getSelectedKey();if(!U.isEmpty(u)){this.updateInputWithDefault("other-material-combo");b.clearFormerPressedMaterial();b.setSelectedMaterialId(u);this.setMessageStripVisible(n,false);}else{if(!U.isEmpty(i)){this.updateInputWithError("other-material-combo",this.getI18nText("incorrectMaterial"));}}}.bind(this),0);},onCreateShippingHU:function(E){var D=E.getSource().getParent();var i=this.getView().byId(c.ID.CREATE_SHIP_INPUT);var H=i.getValue();var s=b.getSelectedMaterialId();if(U.isEmpty(s)){this.setMessageStripVisible(n,true);this.playAudio(c.ERROR);return;}else if(b.IsSelectedMaterialExternal()){if(H===""){this.updateInputWithError(c.ID.CREATE_SHIP_INPUT);this.focus(c.ID.CREATE_SHIP_INPUT);this.playAudio(c.ERROR);return;}}var u={};u.sHuId=H;u.sMaterialId=s;u.oDialog=D;D.setBusy(true);this.getWorkFlowFactory().getShipHUCreationWorkFlow().run(u);},onPrint:function(){this.getWorkFlowFactory().getPrintWorkFlow().run();},onRemoveClosedShipHU:function(){this.getWorkFlowFactory().getShipHUCloseWorkFlow().run(true);},updateParameterAfterCreation:function(i,s){var u=i.HuId;s.sHuId=i.HuId;s.fLoadingWeight=U.parseNumber(U.formatNumber(i.NetWeight,2));s.sWeightUoM=i.WeightUoM;G.addShipHandlingUnit(u);this.setCurrentShipHandlingUnit(u);b.setCurrentMaterialById(s.sMaterialId);},updateMaterialButtonsAfterCreation:function(s){var D=b.getDefaultMaterialId();if(!U.isEmpty(D)){b.setFavoriteMaterialSelectedById(D,false);}b.setFavoriteMaterialSelectedById(s,true);},updateDataBingdingAfterCreation:function(s){this.oItemHelper.clear();},handlePackAllEnableAfterCreate:function(s){if(!U.isEmpty(G.getSourceId())&&!O.isShipHUClosed()){if(s.isSingleConsGroupNoReduction&&!s.isSNEnable){G.setPackAllEnable(true);}}},createNewTab:function(s,F){return new Promise(function(i,u){var v=this.getView();var x=v.byId("shipHUBar");this.oInitTab.setVisible(false);var y=sap.ui.xmlfragment(this.getTabId(s),F,this);y.setKey(s);y.setText(s);x.insertItem(y,0);x.setSelectedKey(s);this.delayCalledAdjustContainerHeight();i(s);}.bind(this));},onEditMaterial:function(E){var v=this.getView();var D=v.byId("change-material-dialog");if(!D){D=sap.ui.xmlfragment(v.getId(),"zscm.ewm.packoutbdlvs1.view.ChangeMaterialDialog",this);this.initiateMaterialTable("pack-material-table",2);v.addDependent(D);}D.open();this.addTooltipToFavoriteMaterial("pack-material-table");},onBeforeOpenChangeMaterial:function(){var s=b.getCurrentMaterialId();b.setOriginalMaterialId(s);b.setSelectedMaterialId(s);if(b.IsMaterialFavorite(s)){b.setMaterialPressedById(s,true);}else{var i=this.getView().byId("change-material-combo");i.setSelectedKey(s);}},onAfterOpenChangeMaterial:function(){this.focus(c.ID.CHANGE_SHIP_INPUT);},onAfterCloseChangeDialog:function(){this.clearComboBox("change-material-combo");b.clearFormerPressedMaterial();b.setSelectedMaterialId("");this.setMessageStripVisible(p,false);this.setMessageStripVisible(o,false);this.setMessageStripVisible(c.ID.ERROR_MATERIAL_STRIP,false);this.updateInputWithDefault(c.ID.CHANGE_SHIP_INPUT,"");},onChangeMaterial:function(E){var D=E.getSource().getParent();var H=this.getView().byId(c.ID.CHANGE_SHIP_INPUT).getValue();var s=b.getCurrentMaterialId();var i=b.getSelectedMaterialId();var u=G.getCurrentShipHandlingUnit();this.setMessageStripVisible(c.ID.ERROR_MATERIAL_STRIP,false);if(U.isEmpty(i)){this.setMessageStripVisible(p,true);return;}else if(b.IsSelectedMaterialExternal()){if(H===""){this.updateInputWithError(c.ID.CHANGE_SHIP_INPUT);this.playAudio(c.ERROR);this.focus(c.ID.CHANGE_SHIP_INPUT);return;}}var v=b.getOriginalMaterialId();if(i===v&&u===H){if(!this.getView().byId(o).getVisible()){this.getView().byId(o).setVisible(true);this.playAudio(c.WARNING);}else{D.close();}return;}var x={};x.sHuId=H;x.oDialog=D;x.bMaterialChanged=(s!==i);D.setBusy(true);this.getWorkFlowFactory().getMaterialChangeWorkFlow().run(x);},onToggleMaterialInChange:function(E){var i=E.getSource();var s=i.getBindingContext("material");var u=s.sPath;if(i.getPressed()){b.clearFormerPressedMaterial();var v=b.getMaterialIdByPath(u);b.setSelectedMaterialId(v);this.setMessageStripVisible(p,false);this.clearComboBox("change-material-combo");if(v!==b.getOriginalMaterialId()){this.setMessageStripVisible(o,false);}}else{b.setSelectedMaterialId("");}this.focus(c.ID.CHANGE_SHIP_INPUT);},onSelectOtherMaterialInChange:function(E){var i=U.trim(E.getParameter("newValue"));setTimeout(function(){var s=this.byId("change-material-combo");var u=s.getSelectedKey();if(!U.isEmpty(u)){this.updateInputWithDefault("change-material-combo");b.clearFormerPressedMaterial();b.setSelectedMaterialId(u);this.setMessageStripVisible(n,false);if(u!==b.getOriginalMaterialId()){this.setMessageStripVisible(o,false);}}else{if(!U.isEmpty(i)){this.updateInputWithError("change-material-combo",this.getI18nText("incorrectMaterial"));}}}.bind(this),0);},recreateTab:function(s,N,i){return new Promise(function(u,v){var x=this.getView();var y=x.byId("shipHUBar");if(s!==N){var z=this.getTabIndexByTitle(s);var D=this.getTabByTitle(s);D.destroy();var E;if(i){E=sap.ui.xmlfragment(this.getTabId(N),"zscm.ewm.packoutbdlvs1.view.SimpleTabContent",this);}else{E=sap.ui.xmlfragment(this.getTabId(N),"zscm.ewm.packoutbdlvs1.view.TabContent",this);}E.setKey(N);E.setText(N);y.insertItem(E,z);y.setSelectedKey(N);this.delayCalledAdjustContainerHeight();d.replaceShipHUConsGroup(s,N);}u(N);}.bind(this));},updateMaterialButtonsAfterChange:function(){b.setFavoriteMaterialSelectedById(b.getCurrentMaterialId(),false);b.setFavoriteMaterialSelectedById(b.getSelectedMaterialId(),true);},updateCurrentMaterialAfterChange:function(){var i=b.getMaterialById(b.getSelectedMaterialId());b.setCurrentMaterial(i);},onCloseCurrentShipHU:function(E){this.getWorkFlowFactory().getShipHUCloseWorkFlow().run();},formatCloseBtn:function(s,i){if(!U.isEmpty(i)){if(!this.oItemHelper||this.oItemHelper.isEmpty()){G.setCloseShipHUEnable(false);return false;}G.setCloseShipHUEnable(true);return true;}G.setCloseShipHUEnable(false);return false;},removeTabByTabName:function(s){return new Promise(function(i,u){var v=this.getTabByTitle(s);v.destroy();this.delayCalledAdjustContainerHeight();i();}.bind(this));},removeTabAfterClose:function(s){this.removeTabByTabName(s).then(function(){this.oItemHelper.clear();}.bind(this));},onChangeQuantityPack:function(E){var s=E.getSource();var N=U.trim(E.getParameter("newValue"));if(!U.isEmpty(N)){var Q=U.parseNumber(N);var i=U.formatNumber(Q);if(U.isEmpty(i)||Q<0){var u=this.getI18nText("inputQuantityNotice");this.updateInputWithError(s,u);this.playAudio(c.ERROR);}else{this.updateInputWithDefault(s);var v=s.getBindingContext(c.ITEM_MODEL_NAME).getObject();var x={oProduct:v,iQuantity:U.formatNumber(U.parseNumber(N)-U.parseNumber(v.PreviousAlterQuan),3),mSource:s};if(x.iQuantity!==0){this.getWorkFlowFactory().getQuantityChangeWorkFlow().run(x);}}}else{this.updateInputWithError(s);this.playAudio(c.ERROR);}},onActualWeightChangeSimple:function(E){this.checkActualWeight(E,[function(){this.setBusy(false);}.bind(this)]);},onActualWeightChangeAdvanced:function(E){this.checkActualWeight(E,[function(){return S.getHUSet(G.getCurrentShipHandlingUnit(),c.SHIP_TYPE_HU);},function(R){this.setBusy(false);var N=U.parseNumber(U.formatNumber(R.NetWeight,2));this.updateNetWeightRelated(N,R.WeightUoM);}.bind(this)]);},checkActualWeight:function(E,u){var i=E.getSource();var s=U.trim(E.getParameter("newValue"));var v=U.isEmpty(s);var W=U.parseNumber(s);var x=U.formatNumber(W,3);var y=U.parseNumber(U.formatNumber(b.getCurrentMaterialMaxWeightTol(),3));var z=U.parseNumber(U.formatNumber(b.getCurrentMaterialTareWeight(),3));var D=y+z;var F;if(v){this.updateInputWithDefault(i,"");}else if(isNaN(W)){this.updateInputWithError(i);}else if(W>D){F=this.getI18nText("exceedWeight",[D]);this.updateInputWithError(i,F);}else if(W<=0){F=this.getI18nText("grossWeightLessThan0Error");this.updateInputWithError(i,F);}else{if(!this.checkQuantityOverflow(W,i)){this.updateInputWithDefault(i,x);}var H=O.getHUInfo(G.getCurrentShipHandlingUnit(),c.SHIP_TYPE_HU);x=U.parseNumber(i.getValue()).toString();this.setBusy(true);var K=S.updateHU(H,x);u.forEach(function(L){K=K.then(L);});K.catch(function(){this.setBusy(false);this.updateInputWithError(i);}.bind(this));}i.focus();},restoreShipHUTabs:function(s){this.clearShipHUTabs();s.forEach(function(i){this.createNewTab(i.HuId);}.bind(this));},clearShipHUTabs:function(){var s=this.byId("shipHUBar");var i=s.getItems();if(i.length>1){i.splice(i.length-1,1);i.forEach(function(u){u.destroy();});}},onMaterialQuickView:function(E){var L=E.getSource();var v=this.getView();var Q=v.byId("material-quick-view");if(!Q){Q=sap.ui.xmlfragment(v.getId(),"zscm.ewm.packoutbdlvs1.view.MaterialQuickView",this);v.addDependent(Q);}Q.openBy(L);},onGetScaleWeight:function(E){this.setBusy(true);S.getScaleWeight().then(function(R){this.setBusy(false);var i=U.parseNumber(U.formatNumber(R.GrossWeight,2));this.updateScaleWeight(i);var N=U.parseNumber(U.formatNumber(R.NetWeight,2));this.updateNetWeightRelated(N,R.UoM);}.bind(this)).catch(function(){this.setBusy(false);}.bind(this));},formatQuickViewDisplay:function(i,v,u){var s=parseFloat(v);if(s===0){return i;}else{v=U.formatNumber(s,3);return i+" "+v+" "+u;}},updateNetWeightRelated:function(W,u,H){W=U.parseNumber(U.formatNumber(W,2));if(U.isEmpty(H)){H=G.getCurrentShipHandlingUnit();}var i=sap.ui.core.Fragment.createId(this.getTabId(H),w);var s=sap.ui.getCore().byId(i);var v=s.getActual();var x=U.parseNumber(U.formatNumber(b.getCurrentMaterialMaxWeight(),2));v.setColor(this.getWeightChartColor(W,x));v.setValue(W);this.updateWeightChartToolTip(W);i=sap.ui.core.Fragment.createId(this.getTabId(H),l);var y=sap.ui.getCore().byId(i);var E=y.getFormElements()[0];var z=E.getFields()[0];if(W!==0){z.setText(W+" "+u);}else{z.setText("");}},getWeightChartColor:function(W,i){if(W>=i){return V.Critical;}return V.Good;},updateWeightChartToolTip:function(W){var s=G.getCurrentShipHandlingUnit();if(!U.isEmpty(s)&&this.hasTabByTitle(s)){var E=U.formatNumber(W,2);var i=b.getCurrentMaterialUom();var u=U.formatNumber(parseFloat(b.getCurrentMaterialMaxWeight()),2);var v=U.formatNumber(parseFloat(b.getCurrentMaterialMaxWeightTol()),2);var x=this.getI18nText("toolTipTxt",[E,i,u,i,v,i]);var y=this.getWeightChartByTitle(s);y.setTooltip(x);}},getWeightChartByTitle:function(s){var i=this.getTabByTitle(s);return this.getWeightChartInTab(i);},getWeightChartInTab:function(i){var s=i.getContent()[0];var R=s.getContent()[1];var W;if(!U.isEmpty(R)){var F=R.getContent()[0];W=F.getItems()[0];}return W;},onSelectShippingHU:function(E){var s=E.getParameter("item").getText();if(s===" "){return;}if(G.getPendingTaskNumber()>0){var i=G.getCurrentShipHandlingUnit();E.getSource().setSelectedKey(i);return;}var u=this.getView().byId("shipHUBar").getSelectedKey();this.getWorkFlowFactory().getShipHUSelectionWorkFlow().run(u);},onShippingHUChange:function(E){var i=U.trim(E.getParameter("newValue")).toUpperCase();if(G.isShipHandlingUnitExist(i)){if(G.isShipHandlingUintActived(i)){this.updateInputWithDefault(c.ID.SHIP_INPUT,"");}else{this.getView().byId("shipHUBar").setSelectedKey(i);this.getWorkFlowFactory().getShipHUSelectionWorkFlow().run(i);this.updateInputWithDefault(c.ID.SHIP_INPUT,"");}}else{this.getWorkFlowFactory().getShipHUChangeWorkFlow().run(i);}},clearActualWeight:function(H){var i=sap.ui.core.Fragment.createId(this.getTabId(H),m);var s=sap.ui.getCore().byId(i);this.updateInputWithDefault(s,"");},getNextProposedShipHUByConsGroup:function(s){var i=G.getShipHandlingUnits();var u=U.findIndex(i,function(x){var y=d.getShipHUConsGroup(x);if(y===s){return true;}return false;});var v=u===-1?i[0]:i[u];return v;},selectTabByTabName:function(s){var v=this.getView();var i=v.byId("shipHUBar");i.setSelectedKey(s);this.adjustContainerHeight();return this.updateTabContent(s);},updateTabContent:function(H){return new Promise(function(i,s){this.setBusy(true);S.getHUItems(H,c.SHIP_TYPE_HU).then(function(u){this.oItemHelper.setItems(u);this.updateShippingHUMaterial(H);this.updateShipItemStatus();this.handleButtonsEnableAfterSwitch();this.setBusy(false);i();}.bind(this)).catch(function(){this.setBusy(false);s();}.bind(this));}.bind(this));},handleButtonsEnableAfterSwitch:function(){if(!U.isEmpty(G.getSourceId())){this.publish(c.EVENT_BUS.CHANNELS.PACKALL_ENABLE,c.EVENT_BUS.EVENTS.SUCCESS);}var s=G.getProductId();if(!U.isEmpty(s)){this.publish(c.EVENT_BUS.CHANNELS.EXCEPTION_ENABLE,c.EVENT_BUS.EVENTS.SUCCESS);}this.handleUnpackEnable();},updateShippingHUMaterial:function(H){this.setCurrentShipHandlingUnit(H);var s=O.getShipHUMaterialId(H);var i=b.getMaterialById(s);b.setCurrentMaterial(i);},clearComboBox:function(s){this.getView().byId(s).clearSelection();this.updateInputWithDefault(s,"");},setMessageStripVisible:function(s,v){this.getView().byId(s).setVisible(v);},hilightShipHandlingUnitsByConsolidationGroup:function(s){this.dehilightShipHandlingUnits();var H=this.getHightlightShipHandlingUnits(s);if(H.length>0){this.hilightShipHandlingUnits(H);}},hilightShipHandlingUnits:function(H){var i=this;var D=false;H.forEach(function(u){var v=i.getTabByTitle(u);v.data("title",u);v.setText(i.decoratTabtitle(u));D=true;});function s(){H.forEach(function(u){var v=i.getTabByTitle(u);if(D){v.setText(u);}else{v.setText(i.decoratTabtitle(u));}});D=!D;i.delayId=jQuery.sap.delayedCall(1000,null,s);}i.delayId=jQuery.sap.delayedCall(1000,null,s);},getEmptyShipHus:function(){var s=G.getShipHandlingUnits();var E=[];s.forEach(function(i){if(d.getIsEmptyHU(i)){E.push(i);}});return E;},getHightlightShipHandlingUnits:function(s){var i=d.getShipHUConsGroup(G.getCurrentShipHandlingUnit());if(P.isInternalMode()){return[];}if(U.isEmpty(s)){return[];}var u=this.getShippingHUsByConsolidationGroup(s);var H=[];if(u.length>0){H=u;}else{H=this.getEmptyShipHus();}if(H.length===1&&H[0]===G.getCurrentShipHandlingUnit()){H=[];}return H;},dehilightShipHandlingUnits:function(){var i=this;var H=G.getShipHandlingUnits();jQuery.sap.clearDelayedCall(i.delayId);H.forEach(function(s){var u=i.getTabByTitle(s);u.setText(s);});},onUnpack:function(E){this.setBusy(true);var i=this.oItemHelper.getHighLightedItem();this.getWorkFlowFactory().getUnpackWorkFlow().run(i);},onUnpackAll:function(E){this.setBusy(true);var i=this.oItemHelper.getModel().getData();this.getWorkFlowFactory().getUnpackAllWorkFlow().run(i);},updateScaleWeight:function(W){var i=this.getTabByTitle(G.getCurrentShipHandlingUnit());var s=this.getScaleWeightInTab(i);this.updateInputWithDefault(s,W);},getScaleWeightInTab:function(i){var s=i.getContent()[0];var R=s.getContent()[1];var F=R.getContent()[1];var u=F.getFormContainers()[0];var v=u.getFormElements()[1];var x=v.getFields()[0];return x;},onHighlightColumnListItem:function(E){var i=E.getSource().getBindingContext(c.ITEM_MODEL_NAME);if(!G.getCurrentShipHandlingUnitClosed()&&!U.isEmpty(G.getSourceId())){this.oItemHelper.setItemsStatusToNone();var s=i.getPath();var u=i.getModel();u.setProperty(s+"/Status",sap.ui.core.MessageType.Success);}},formatShipHUIdRequired:function(s){if(!U.isEmpty(s)&&b.IsSelectedMaterialExternal()){return true;}return false;},formatMaterialDisplay:function(D,s){if(U.isEmpty(D)){return s;}return D;},formatDeleteBtn:function(s,i,u){if(i||u>0){return false;}return!U.isEmpty(s);},formatEditIconVisible:function(i,s){if(U.isEmpty(s)||i){return false;}return true;},formatCreateButton:function(F,i,s){var E=false;if(s===0&&(F.length>0||i.length>0)){E=true;}return E;},formatFavoriteMaterialText:function(s,i,u){if(!U.isEmpty(s)){return s;}else if(!U.isEmpty(i)){return i;}return u;},formatMaterialComboText:function(s,i){if(U.isEmpty(s)){return i;}else{return i+" - "+s;}},formatMaterialButtonIcon:function(i){if(i===true){return"sap-icon://accept";}return"";},formatShipHUIdEditable:function(E){if(E===false){return true;}return false;},formatMaxWeightInChart:function(v){return v===undefined?0:U.parseNumber(U.formatNumber(v,2));},formatTargetValueDisplay:function(v){return v!==undefined;},formatMaxCapacityInfo:function(i,u){return i===undefined?"":"/"+U.parseNumber(U.formatNumber(i,2))+" "+u;},formatThreshold:function(W){return Number(W);},formatPrintText:function(i){var s;if(i){s=this.getI18nText("reprint");}else{s=this.getI18nText("print");}return s;},formatWeightEnable:function(i,s,u){var E=false;if(!i&&s.length>0&&u===0){E=true;}return E;},formatWeightEnableInSimpleMode:function(i,s){var E=false;if(i.length>0&&s===0){E=true;}return E;},formatPrintEnable:function(H,i){if(U.isEmpty(H)||i>0){return false;}return true;},setCurrentShipHandlingUnit:function(H){G.setCurrentShipHandlingUnit(H);if(U.isEmpty(H)){G.setCurrentShipHandlingUnitClosed(false);}else{G.setCurrentShipHandlingUnitClosed(O.isShipHUClosed(H));}},updateShipItemStatus:function(){if(this.oItemHelper.isEmpty()){return;}this.oItemHelper.setItemsStatusToNone();if(!U.isEmpty(G.getSourceId())&&!G.getCurrentShipHandlingUnitClosed()){this.oItemHelper.setItemHighlightByIndex(0);return;}},formatCompleteIconVisible:function(i){if(i){return false;}return true;},formatBusyIndicatorVisible:function(i){if(i){return true;}return false;},getLoadingWeightInCurrentShipHandlingUnit:function(){var L=0;var s=b.getCurrentMaterialId();var i=this.oItemHelper.getAllItems();i.forEach(function(u){var W=I.getItemWeight(s,u.OriginId);L+=u.Quan*W;});return L;},getWeightUOMInCurrentShipHandlingUnit:function(){var W;var s=b.getCurrentMaterialId();W=I.getWeightUOMForSpecificPackMat(s);return W;},getGrossWeight:function(){var i=this.getGrossWeightInput();return i.getValue();},setGrossWeight:function(v){var i=this.getGrossWeightInput();if(!U.isEmpty(i)){i.setValue(v);}},clearGrossWeight:function(){this.setGrossWeight("");},getGrossWeightInput:function(){var H=G.getCurrentShipHandlingUnit();var i=this.getElementInTab(H,"actual-weight-input");return i;},unpackCallback:function(u){if(U.isEmpty(u.HuId)){M.addSuccess(this.getTextAccordingToMode("handlingUnitDeleted","shipHandlingUnitDeleted",[G.getCurrentShipHandlingUnit()]));this.playAudio(c.INFO);var D={"bCallService":false,"bRefreshSource":true};this.getWorkFlowFactory().getShipHUDeleteWorkFlow().run(D);throw new e(c.ERRORS.INTERRUPT_WITH_NO_ACTION);}else{return u;}},flushPendings:function(){var s=this.oItemHelper.getAllItems();var u;var W=[];var v=[];for(var i=0;i<s.length;i++){u=s[i];u.PackedQuan=u.PackedQuan?u.PackedQuan:0;if((u.OperationDeltaQuan-u.PackedQuan!==0)&&(u.OperationDeltaQuan!==u.DefaultAltQuan)){var x={oProduct:u,sQuantity:"0",iIndex:i,bAdd:false};W.push(this.getWorkFlowFactory().getPackItemWorkFlow().run(x));}}if(W.length>0){if(G.getAsyncMode()){return new Promise(function(y,z){jQuery.sap.delayedCall(0,null,function(){W.forEach(function(D){v.push(D.getAsyncPromise());});Promise.all(v).then(function(){y();}).catch(function(E){z(E);});});});}else{W.forEach(function(y){v.push(y.getResult());});return Promise.all(v);}}else{return Promise.resolve();}},formatItemInputEnable:function(i,s,u,D){var E=true;if(i!==sap.ui.core.MessageType.Success||(u===D&&u!==s)){E=false;}return E;},formatSimpleMaterialButtonEnable:function(i){if(i>0){return false;}return true;},formatDialogMaterialLabel:function(F){if(F.length===0){return this.getI18nText("packMaterial");}else{return this.getI18nText("favoritePackMaterial");}},getHandlingUnitDisplayWhenScanOnOtherSide:function(){return new Promise(function(i,s){var W=this.getI18nText("scanExistingHUonOtherSide");g.warning(W,{actions:[g.Action.YES,g.Action.NO],onClose:function(u){if(u===g.Action.YES){i();}else{s(c.ERRORS.INTERRUPT_WITH_NO_ACTION);}}.bind(this)});}.bind(this));},handleUnpackItemsWithDifferentODO:function(i){return new Promise(function(s,u){if(G.isSourceTypeODO()){var v=i.EWMRefDeliveryDocumentNumber;var x=G.getSourceId();if(v!==x){var y=G.getBin();var z=this.getI18nText("unpackToBin",[v,y]);M.addSuccess(z);this.setBusy(false);u(c.ERRORS.INTERRUPT_WITH_NO_ACTION);}}s();}.bind(this));},handleUnpackAllItemsWithDifferentODO:function(i){return new Promise(function(s,u){if(G.isSourceTypeODO()){var v=G.getSourceId();var x=U.findIndex(i,function(D){if(D.EWMRefDeliveryDocumentNumber!==v){return true;}});if(x!==-1){var y=G.getBin();var z=this.getI18nText("unpackAllToBin",[v,y]);M.addSuccess(z);}x=U.findIndex(i,function(D){if(D.EWMRefDeliveryDocumentNumber===v){return true;}});if(x==-1){this.setBusy(false);u(c.ERRORS.INTERRUPT_WITH_NO_ACTION);}}s();}.bind(this));},initColumnSettingModel:function(){this.oColumnSettingsHelper.setData(this.getDefaultColumnSetting());this.oColumnSettingsHelper.handleStatusColumnSetting(G.getAsyncMode(),this.getI18nText("status"));},resetMaterialButtons:function(){var D=b.getDefaultMaterialId();var s=b.getCurrentMaterialId();if(!U.isEmpty(D)){b.setFavoriteMaterialSelectedById(D,true);}b.setFavoriteMaterialSelectedById(s,false);},formatCreateDialogTitle:function(s){return this.getTextAccordingToMode("createNewHU","createNewShipHU",[],s);},formatChangeDialogTitle:function(s){return this.getTextAccordingToMode("changeHandlingUnitMaterial","changeShipHandlingUnitMaterial",[],s);},formatDialogLabel:function(s){return this.getTextAccordingToMode("handlingUnitLabel","shipHandlingUnit",[],s);},updateCacheIsEmptyHU:function(){if(this.oItemHelper.getItemsNum()===0){d.setIsEmptyHU(G.getCurrentShipHandlingUnit(),true);}else{d.setIsEmptyHU(G.getCurrentShipHandlingUnit(),false);}},initDefaultColumnSetting:function(){this._mAdvancedShipTableDefaultSettings=JSON.parse(JSON.stringify(A.getData()));this._mBasicShipDefaultDefaultSettings=JSON.parse(JSON.stringify(B.getData()));this._mInternalShipTableDefaultSettings=JSON.parse(JSON.stringify(k.getData()));}});});
