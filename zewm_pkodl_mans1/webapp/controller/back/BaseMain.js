/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["zscm/ewm/packoutbdlvs1/controller/BaseController","sap/tl/ewm/lib/reuses1/controllers/Base.controller","zscm/ewm/packoutbdlvs1/utils/Util","zscm/ewm/packoutbdlvs1/service/ODataService","zscm/ewm/packoutbdlvs1/modelHelper/OData","zscm/ewm/packoutbdlvs1/utils/Const","sap/ui/model/json/JSONModel","zscm/ewm/packoutbdlvs1/model/Message","zscm/ewm/packoutbdlvs1/modelHelper/Message","sap/m/MessagePopoverItem","sap/m/MessagePopover","sap/m/MessageBox","zscm/ewm/packoutbdlvs1/modelHelper/Global","zscm/ewm/packoutbdlvs1/model/SerialNumber","zscm/ewm/packoutbdlvs1/workflows/SimpleFactory","zscm/ewm/packoutbdlvs1/workflows/AdvancedFactory","zscm/ewm/packoutbdlvs1/modelHelper/PackingMode","zscm/ewm/packoutbdlvs1/modelHelper/Material"],function(C,a,U,S,O,b,J,M,c,d,e,f,G,g,h,A,P,i){"use strict";return C.extend("zscm.ewm.packoutbdlvs1.controller.BaseMain",{sRouteName:"main",init:function(){a.prototype.initAccessCode.call(this);this.setButtonToolTip("leave-button");},initModel:function(){this.setModel(g,"serialNum");this.setModel(M,"message");},onMessagePopoverPress:function(E){if(!this.oMessagePopover){this.initMessagePopover();}this.oMessagePopover.toggle(E.getSource());},initMessagePopover:function(){var m=new d({type:'{type}',title:'{text}'});var o=new e({items:{path:'/',template:m}});o.setModel(M);this.oMessagePopover=o;},formatTitle:function(B,w,W){if(U.isEmpty(W)||U.isEmpty(w)||U.isEmpty(B)){return"";}return this.getI18nText("pageTitle",[B,w,W]);},onLeave:function(E){var H=!U.isEmpty(G.getCurrentShipHandlingUnit());var w=H?this.getTextAccordingToMode("leaveMsgSaveHU","leaveMsgSaveShipHU"):this.getI18nText("leaveMsgWhenNoShipHU");this.playAudio(b.WARNING);f.warning(w,{actions:[f.Action.OK,f.Action.CANCEL],onClose:function(o){if(o===f.Action.OK){this.setBusy(true);this.oWorkFlowFactory.getLeaveWorkFlow().run();}}.bind(this)});},leavePage:function(E){var H=!U.isEmpty(G.getCurrentShipHandlingUnit());var o=this.getOwnerComponent();if(H){var w=this.getI18nText("leavePageMsg");this.playAudio(b.WARNING);f.warning(w,{actions:[f.Action.OK,f.Action.CANCEL],onClose:function(j){if(j===f.Action.OK){this.navBack(o);}}.bind(this)});}else{this.navBack(o);}},navBack:function(o){o.navigateBack.call(o,arguments);},onRouteMatched:function(){this.getOwnerComponent().getShellUIService().setBackNavigation(this.leavePage.bind(this));}});});
