/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["zscm/ewm/packoutbdlvs1/controller/BaseController","zscm/ewm/packoutbdlvs1/modelHelper/Items","sap/ui/model/json/JSONModel","zscm/ewm/packoutbdlvs1/utils/Util","zscm/ewm/packoutbdlvs1/modelHelper/ItemWeight","zscm/ewm/packoutbdlvs1/modelHelper/Material","zscm/ewm/packoutbdlvs1/service/ODataService","zscm/ewm/packoutbdlvs1/modelHelper/Message","zscm/ewm/packoutbdlvs1/utils/Const","sap/m/MessageBox","zscm/ewm/packoutbdlvs1/modelHelper/Global"],function(C,T,J,U,I,M,S,a,b,c,G){"use strict";return C.extend("zscm.ewm.packoutbdlvs1.controller.WorkFlowController",{getWorkFlowFactory:function(){return this.oView.getParent().getParent().getParent().getController().oWorkFlowFactory;},oItemHelper:null,formatTableTitle:function(h,i){if(!h){return;}return this.getI18nText("itemsOfHandkingUnit",[h,i.length]);},onSerialNumberPopover:function(e){this.openSerialNumberPopover(e,b.ITEM_MODEL_NAME,this.oItemHelper);},setButtonToolTip:function(i){var B=this.byId(i);if(U.isEmpty(B)){return;}var t=B.getTooltip();if(U.isEmpty(t)){B.setTooltip(B.getText());}},updateItemWeightInNeed:function(s,d){var p=M.getCurrentMaterialId();var A=this.oItemHelper.getAllItems();var i=U.findIndex(A,function(o){if(!I.isSpecificItemWeightExisted(p,o.OriginId)){return true;}return false;});if(i!==-1){return this.updateItemWeight(s,d);}return U.getResolvePromise();},updateItemWeight:function(s,d){return new Promise(function(r,e){var p=M.getCurrentMaterialId();this.setBusy(true);S.getItemWeight(s,d).then(function(R){this.setBusy(false);I.addItemWeightForPackMat(p,R);r();}.bind(this)).catch(function(E){this.setBusy(false);this.playAudio(b.ERROR);a.addError(E);e();}.bind(this));}.bind(this));},handleSettingDialogButtonPressed:function(e){if(!this._oDialog){this._oDialog=sap.ui.xmlfragment(this.getTableSettingDialogName(),this);}this.getView().addDependent(this._oDialog);this.setDisplayMessageBoxForColumnSettingChange(true);this._oDialog.open();},onConfirmColumnSettingsChange:function(e){this.updatePersonalizationService();e.getSource().close();this.updateTableColumn();},onCancelColumnSettingsChange:function(e){this.rollBackColumnSettingsModel();e.getSource().close();},updatePersonalizationService:function(){var t=JSON.parse(JSON.stringify(this.oColumnSettingsHelper.getColumnSettings()));t.forEach(function(o){o.index=o.defaultIndex;});this.oColumnSettingsHelper.setColumnSettings(t);this.setContainerItemValue(this.getPersonlServiceContainerItemName(),t);},rollBackColumnSettingsModel:function(){this.getPersonalizationContainer().then(function(o){var t=o.getItemValue(this.getPersonlServiceContainerItemName());if(t){this.oColumnSettingsHelper.setColumnSettings(t);this.oColumnSettingsHelper.updateRestore();}}.bind(this));},setContainerItemValue:function(i,v){this.getPersonalizationContainer().then(function(o){o.setItemValue(i,v);o.save();}.bind(this));},initColumnSetting:function(p){this.getPersonalizationContainer().then(function(o){var s=this.getPersonlServiceContainerItemName();var t=o.getItemValue(s);if(U.isEmpty(t)||this.isDefaultColumnSettingChange(o)){var d=this.getDefaultColumnSetting();this.updateDefaultColumnSetting(d,o);this.initColumnSettingModel();this.initColumnSettingText();t=JSON.parse(JSON.stringify(this.oColumnSettingsHelper.getColumnSettings()));o.setItemValue(this.getPersonlServiceContainerItemName(),t);o.save();}else{var n=JSON.parse(JSON.stringify(t));this.oColumnSettingsHelper.setColumnSettings(n);this.initColumnSettingText();if(this.getViewName()===b.VIEW_SHIP){if(this.oColumnSettingsHelper.handleStatusColumnSetting(G.getAsyncMode(),this.getI18nText("status"))){this.updatePersonalizationService();}}}this.updateTableColumn();this.oColumnSettingsHelper.updateRestore();}.bind(this));},onRestoreColumnSettings:function(){var d=this.getDefaultColumnSetting();var D=this.initDefaultColumnSettingText(d);this.oColumnSettingsHelper.restore(D);this.oColumnSettingsHelper.handleStatusColumnSetting(G.getAsyncMode(),this.getI18nText("status"));},updateTableColumn:function(){var t=this.oColumnSettingsHelper.getColumnSettings();var o=this.byId(this.sTableId);var d=o.getColumns();t.forEach(function(e){for(var i=0;i<d.length;i++){if(d[i].getHeader().getText()===this.getI18nText(e.columnKey)){d[i].setVisible(e.visible);}}}.bind(this));},isColumnMandatory:function(s){var d=this.oColumnSettingsHelper.getColumnSettings();var i=d.findIndex(function(o){if(s===this.getI18nText(o.columnKey)&&o.mandatory){return true;}}.bind(this));return i!==-1?true:false;},setMandatoryColumnVisible:function(t){var i=t.getItems();i.forEach(function(o){if(this.isColumnMandatory(o.getCells()[0].getText())&&!o.getSelected()){o.setSelected(true);t.fireSelectionChange({listItem:o,listItems:[],selected:true});}}.bind(this));},getColumnSettingTable:function(p){var o=p.getAggregation("content")[0];return o;},isMandatoryColumnInvisible:function(t){var i=t.getItems();var d=i.findIndex(function(o){if(this.isColumnMandatory(o.getCells()[0].getText())&&!o.getSelected()){return true;}}.bind(this));return d!==-1;},setDisplayMessageBoxForColumnSettingChange:function(v){this._oDialog.removeAllCustomData();var o=new sap.ui.core.CustomData({key:v});this._oDialog.addCustomData(o);},onChangeColumnsItems:function(e){var p=e.getSource();var o=this.getColumnSettingTable(p);var d=this._oDialog.getCustomData()[0].getKey();if(this.isMandatoryColumnInvisible(o)){if(d==="true"){this._oDialog.setBusy(true);var m=this.getI18nText("deselectMandatoryField");var f=!!this.getView().$().closest(".sapUiSizeCompact").length;this.playAudio(b.ERROR);c.error(m,{styleClass:f?"sapUiSizeCompact":"",actions:[sap.m.MessageBox.Action.OK],onClose:function(){this._oDialog.setBusy(false);this.setMandatoryColumnVisible(o);this.oColumnSettingsHelper.setMandatoryColumnVisible();this.oColumnSettingsHelper.updateRestore();this.setDisplayMessageBoxForColumnSettingChange(true);}.bind(this)});this.setDisplayMessageBoxForColumnSettingChange(false);}else{this.setMandatoryColumnVisible(o);this.oColumnSettingsHelper.setMandatoryColumnVisible();}}this.oColumnSettingsHelper.updateRestore();},initColumnSettingText:function(){var d=this.oColumnSettingsHelper.getColumnSettings();d.forEach(function(o){var k=o.columnKey;var t=this.getI18nText(k);this.oColumnSettingsHelper.setColumnTextByKey(k,t);}.bind(this));},isDefaultColumnSettingChange:function(o){var d=this.getDefaultColumnSettingInService(o);var D=this.getDefaultColumnSetting();if(JSON.stringify(d)===JSON.stringify(D)){return false;}return true;},getDefaultColumnSettingInService:function(o){var v=this.getDefaultColumnSettingNameInService();var t=o.getItemValue(v);return t;},updateDefaultColumnSetting:function(t,o){var n=JSON.parse(JSON.stringify(t));var v=this.getDefaultColumnSettingNameInService();o.setItemValue(v,n);o.setItemValue(this.getPersonlServiceContainerItemName(),"");},initDefaultColumnSettingText:function(d){var t=d.columnSettings;t.forEach(function(o){var k=o.columnKey;var s=this.getI18nText(k);o.text=s;}.bind(this));return t;}});});
