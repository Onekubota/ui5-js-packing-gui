sap.ui.define(["sap/ui/model/Filter","sap/ui/model/FilterOperator","zscm/ewm/packoutbdlvs1/utils/Util","zscm/ewm/packoutbdlvs1/utils/Response","zscm/ewm/packoutbdlvs1/modelHelper/OData","zscm/ewm/packoutbdlvs1/modelHelper/Global","zscm/ewm/packoutbdlvs1/utils/Const"],function(F,a,U,R,O,G,C){"use strict";var _;var b="read",c="create",D="remove",P="update";return{getPromise:function(p,m,d,e,h){var f=[];if(U.isEmpty(m)){m=b;}if(U.isEmpty(d)){d={};}if(U.isEmpty(e)){e={};}if(!U.isEmpty(h)){_.setHeaders(h);}return new Promise(function(r,g){e=jQuery.sap.extend(e,{success:function(o){if(o===undefined){r(o);}else if(!R.parseError(o,g)){R.parseSuccess(o);R.parseWarning(o);o=o.results?o.results:o;r(o);}},error:function(E){g(E);}});if(m===b||m===D){f.push(p,e);}else{f.push(p,d,e);}_[m].apply(_,f);});},init:function(d){_=d;return this;},destroy:function(){_=null;},setOdataHeader:function(m){_.setHeaders({"pack_mode":m});},logonPackStation:function(){return this.getPromise("/PackingStationSet(EWMWarehouse='',EWMWorkCenter='')");},verifyWorkCenter:function(v){return this.getPromise(O.getWorkCenterPath(v),b,{});},verifyStorageBin:function(v){return this.getPromise(O.getDefaultBinPath(v));},verifySource:function(s){var d={"SourceId":s,"EWMWarehouse":G.getWarehouseNumber(),"EWMWorkCenter":G.getPackStation(),"EWMStorageBin":G.getBin()};return this.getPromise("/ValidateActionSet",c,d);},verifyProduct:function(v){var u=O.getVarifyProductEANParameters(v);return this.getPromise("/ValidateProduct",c,{},{urlParameters:u});},getPackagingMaterials:function(n){var w=G.getWarehouseNumber();var W=G.getPackStation();var B=G.getBin();var o=new F("EWMWarehouse",a.EQ,w);var d=new F("EWMWorkCenter",a.EQ,W);var e=new F("EWMStorageBin",a.EQ,B);return this.getPromise("/PackMatSet",b,{},{filters:[o,d,e]});},createShippingHU:function(h,m){var d={"HuId":h,"EWMWarehouse":G.getWarehouseNumber(),"EWMWorkCenter":G.getPackStation(),"PackagingMaterial":m,"EWMRefDeliveryDocumentNumber":"","EWMStorageBin":G.getBin(),"Type":"1"};return this.getPromise("/HUSet",c,d);},exceptionPack:function(p,q,e,u){var o=O.getExceptionPackParameters(p,q,e,u);return this.getPromise("/Pack",c,{},{urlParameters:o});},pack:function(p,q,u){var o=O.getPackParameters(p,q,u);return this.getPromise("/Pack",c,{},{urlParameters:o,changeSetId:p.DocumentReltdStockDocUUID+p.DocumentReltdStockDocItemUUID});},packAll:function(p){var u=O.getPackAllParameters(p);return this.getPromise("/Pack",c,{},{urlParameters:u});},unpack:function(p,n){var u=O.getUnpackParameters(p,n);return this.getPromise("/UnPack",c,{},{urlParameters:u});},unpackAll:function(p){var u=O.getUnpackAllParameters(p);return this.getPromise("/UnPack",c,{},{urlParameters:u});},getExceptionList:function(){var w=G.getWarehouseNumber();var W=G.getPackStation();var o=new F("EWMWarehouse",a.EQ,w);var d=new F("EWMWorkCenter",a.EQ,W);return this.getPromise("/ExceptionListSet",b,{},{filters:[o,d]});},getMaterialAndExceptionList:function(){var m=this.getPackagingMaterials();var e=this.getExceptionList();return Promise.all([m,e]);},closeShipHandlingUnit:function(){var u=O.getCloseShipHandlingUnitParameters();return this.getPromise("/Close",c,{},{urlParameters:u});},getScaleWeight:function(){var d=O.getScaleWeightData();return this.getPromise("/ScaleWeightSet",c,d);},verifySerialNumber:function(p,s){var u=O.getValidateSnParamters(p,s);return this.getPromise("/ValidateSn",c,{},{urlParameters:u});},changeMaterial:function(s){var u=O.getChangeMaterialParameters(s);return this.getPromise("/ChangePackMat",c,{},{urlParameters:u});},getHUSet:function(h,H){return this.getPromise(O.getHUPath(h,H));},getHUItemSet:function(h,H){return this.getPromise(O.getHUPath(h,H)+"/Items");},getHUODOSet:function(h,H){return this.getPromise(O.getHUPath(h,H)+"/ODOs");},getHUItems:function(h,H,i){if(!i){var o=this.getHUSet(h,H);}var I=this.getHUItemSet(h,H);var d=this.getHUODOSet(h,H);return Promise.all([o,I,d]).then(function(r){var e=r[1];var f=r[2];var v={};f.forEach(function(g){v[g.DocumentReltdStockDocUUID]=g;});e.forEach(function(g){g.AlterQuan=U.formatNumber(parseFloat(g.AlterQuan),3);g.Quan=U.formatNumber(parseFloat(g.Quan),3);g.NetWeight=U.formatNumber(parseFloat(g.NetWeight),3,3);g.Volume=U.formatNumber(parseFloat(g.Volume),3,3);g.QtyReduced=U.formatNumber(parseFloat(g.QtyReduced),3);if(g.StockItemNumber==="0"){g.StockItemNumber="";}var j=v[g.DocumentReltdStockDocUUID];if(!U.isEmpty(j)){g.CustomerName=j.CustomerName;g.PackInstr=j.PackInstr;}});return e;});},updateHU:function(h,t){var p=O.getUpdateHUPath();var d={"HuId":h.HuId,"EWMWarehouse":h.EWMWarehouse,"EWMWorkCenter":h.EWMWorkCenter,"PackagingMaterial":h.PackagingMaterial,"WeightUoM":h.WeightUoM,"TotalWeight":t,"EWMRefDeliveryDocumentNumber":h.EWMRefDeliveryDocumentNumber};return this.getPromise(p,P,d);},deleteShippingHU:function(){var u=O.getDeleteHUParameters();return this.getPromise("/ChangePackMat",c,{},{urlParameters:u});},getRuntimeEnvironment:function(){return this.getPromise("/RuntimeEnvSet");},terminateSession:function(){var h={"sap-terminate":"session"};return this.getPromise("/LeavePackStation",c,{},{},h);},getAudiosList:function(){var w=G.getWarehouseNumber();var W=G.getPackStation();var o=new F("EWMWarehouse",a.EQ,w);var d=new F("EWMWorkCenter",a.EQ,W);var B=new F("EWMStorageBin",a.EQ,"");return this.getPromise("/AudioURISet",b,{},{filters:[o,d,B]});},getOpenShippingHU:function(){var w=G.getWarehouseNumber();var W=G.getPackStation();var B=G.getBin();var o=new F("EWMWarehouse",a.EQ,w);var d=new F("EWMWorkCenter",a.EQ,W);var e=new F("EWMStorageBin",a.EQ,B);var i=new F("IsPickHu",a.EQ,false);return this.getPromise("/HUSet",b,{},{filters:[o,d,e,i],urlParameters:{"$expand":"Items"}});},print:function(){return this.getPromise("/Print",c,{},{urlParameters:O.getPrintParameters()});},getItemWeight:function(s,S){if(U.isEmpty(s)){s=G.getSourceId();S=G.getSourceType();}var w=G.getWarehouseNumber();var W=G.getPackStation();var B=G.getBin();var o=new F("EWMWarehouse",a.EQ,w);var d=new F("EWMWorkCenter",a.EQ,W);var e=new F("EWMStorageBin",a.EQ,B);var f=new F("SourceId",a.EQ,s);var g=new F("SourceType",a.EQ,S);var h=new F("PackagingMaterial",a.EQ,O.getPackageMaterial());return this.getPromise("/HUItemWeightSet",b,{},{filters:[o,d,e,f,g,h]});},getWorkCenterSet:function(){var w=G.getWarehouseNumber();var W=new F("EWMWarehouse",a.EQ,w);return this.getPromise("/SearchHelpWorkCenterSet",b,{},{filters:[W]});},getStorageBinSet:function(){var w=G.getWarehouseNumber();var W=new F("EWMWarehouse",a.EQ,w);return this.getPromise("/SearchHelpBinSet",b,{},{filters:[W]});}};});
