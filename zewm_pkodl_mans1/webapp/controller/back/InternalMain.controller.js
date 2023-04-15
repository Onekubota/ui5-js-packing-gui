/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["zscm/ewm/packoutbdlvs1/controller/BaseMain","sap/tl/ewm/lib/reuses1/controllers/Base.controller","zscm/ewm/packoutbdlvs1/utils/Util","zscm/ewm/packoutbdlvs1/service/ODataService","zscm/ewm/packoutbdlvs1/modelHelper/OData","zscm/ewm/packoutbdlvs1/utils/Const","sap/ui/model/json/JSONModel","zscm/ewm/packoutbdlvs1/model/Message","zscm/ewm/packoutbdlvs1/modelHelper/Message","sap/m/MessagePopoverItem","sap/m/MessagePopover","sap/m/MessageBox","zscm/ewm/packoutbdlvs1/modelHelper/Global","zscm/ewm/packoutbdlvs1/model/SerialNumber","zscm/ewm/packoutbdlvs1/workflows/SimpleFactory","zscm/ewm/packoutbdlvs1/workflows/AdvancedFactory","zscm/ewm/packoutbdlvs1/modelHelper/PackingMode","zscm/ewm/packoutbdlvs1/modelHelper/Material",],function(C,a,U,S,O,b,J,M,c,d,e,f,G,g,h,A,P,i){"use strict";return C.extend("zscm.ewm.packoutbdlvs1.controller.InternalMain",{sRouteName:"internal",init:function(){a.prototype.initAccessCode.call(this);var s=this.byId("id-source-view").getController();var o=this.byId("id-ship-view").getController();this.oWorkFlowFactory=new A(s,o);},onRouteMatched:function(p){C.prototype.onRouteMatched.call(this);this.publish(b.EVENT_BUS.CHANNELS.USER_SETTING,b.EVENT_BUS.EVENTS.SUCCESS);setTimeout(function(){this.publish(b.EVENT_BUS.CHANNELS.EXCEPTION_LIST,b.EVENT_BUS.EVENTS.SUCCESS,G.getExceptionList());}.bind(this),0);}});});
