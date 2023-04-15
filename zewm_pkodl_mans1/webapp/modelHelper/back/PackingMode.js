/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["zscm/ewm/packoutbdlvs1/model/PackingMode","zscm/ewm/packoutbdlvs1/utils/Util","zscm/ewm/packoutbdlvs1/utils/Const"],function(M,U,C){"use strict";return{setModes:function(m){M.setProperty("/modes",m);return this;},setSelectedMode:function(m){M.setProperty("/selectedMode",m);return this;},getSelectedMode:function(){return M.getProperty("/selectedMode");},reset:function(){this.setModes([]);this.setSelectedMode("");return this;},isBasicMode:function(){var m=M.getProperty("/selectedMode");return m===C.BASIC_MODE;},isAdvancedMode:function(){var m=M.getProperty("/selectedMode");return m===C.ADVANCED_MODE;},isInternalMode:function(){var m=M.getProperty("/selectedMode");return m===C.INTERNAL_MODE;}};});
