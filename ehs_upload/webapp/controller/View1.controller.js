sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("ehsupload.controller.View1", {
            onInit: function () {

              var data = {  
                "ProductCollection": [
                    {
                        "ProductId1": "EHS",
                        "Name": "EHS"
                    },
                     {
                         "ProductId1": "2023",
                         "Name": ""
                     },
                     {
                         "ProductId1": "2022",
                         "Name": "FY-22"
                     },
                     {
                         "ProductId1": "2021",
                         "Name": "FY-21"
                     },
                     {
                         "ProductId1": "2020",
                         "Name": "FY-20"
                     }
                     
                 ]
                }

            }
        });
    });
