sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/viz/ui5/format/ChartFormatter'
    
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,ChartFormatter) {
        "use strict";

        return Controller.extend("dashboard.controller.View1", {
            onInit: function () {
                var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
                var oPopOver = this.getView().byId("idPopOver");
                oPopOver.connect(oVizFrame.getVizUid());
                oPopOver.setFormatString(ChartFormatter.DefaultPattern.Status);
                var oVizFrame1 = this.oVizFrame = this.getView().byId("idVizFrame1");
                var oPopOver2 = this.getView().byId("idPopOver2");
                oPopOver2.connect(oVizFrame1.getVizUid());
                oPopOver2.setFormatString(ChartFormatter.DefaultPattern.Status);
                
            },
            onSelect : function(oEvent){
                debugger;
                var oData = oEvent.getParameter("data");
                var sStatus = oData[0].data.Status;
                var sBusinessFunction = oData[0].data.businessfunction;
                // var sFiscalYear = oData[0].data.fiscalYear;
                sap.m.MessageBox.show(
                    "Status: " + sStatus + "\n" +
                    "Business Function: " + sBusinessFunction + "\n",
                    {
                      title: "Pie Chart Selection",
                      icon: sap.m.MessageBox.Icon.INFORMATION
                    }
                    );
            },
            onValidate : function(oEvent){
                debugger;


            }
            
        });

    });
