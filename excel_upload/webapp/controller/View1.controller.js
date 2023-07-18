sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/util/Export",
    "sap/ui/core/util/ExportTypeCSV",
    "sap/m/BusyDialog",
    "sap/m/Column",
    "sap/m/Label",
    "sap/m/Text",
    "sap/m/MessageBox",
    "sap/m/ColumnListItem",
    "sap/ui/model/json/JSONModel",
    "sap/ui/export/Spreadsheet",
    "sap/ui/export/library",
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Export, ExportTypeCSV, BusyDialog, Column, Label, Text, MessageBox, ColumnListItem, JSONModel,Spreadsheet) {
        "use strict";
        var oCont, oDataModel, oTableJsonModel, oTable, oFileUploader,fileName;
        return Controller.extend("excelupload.controller.View1", {
        onInit: function () {
            oCont = this;
            oDataModel = this.getOwnerComponent().getModel();
            oTableJsonModel = new JSONModel();
            oTable = oCont.getView().byId("Tableid");
            oFileUploader = oCont.getView().byId("id_fileUploader");
            fileName = "";
        },
        fnUploadStart : function(){ // uploadStart event from fileuploader
            oCont.getView().setBusy(true);
        },
        fnSelectChange : function(oEvent){ //selectChange event from Select drop down
            // var selectedMasterKey = this.getView().byId("id_BF").getSelectedKey();
            var selectedBF = this.getView().byId("id_BF").getSelectedKey();
            var selectedFile = this.getView().byId("id_File").getSelectedKey();
            //oTable.setModel(null,"oTableJsonModel");
            oTable.destroyAggregation("columns");
            oTable.destroyAggregation("items");
            oFileUploader.clear();
            if(selectedBF != ''){
                oCont.getView().byId("id_fileUploader").setEnabled(true);
            } else{
                oCont.getView().byId("id_fileUploader").setEnabled(false);
                
            }
        },
        onTemplateDownload : function(){

        },
        fnFileUploadComplete : function(oEvent){
            var that = this; 
            oCont.getView().setBusy(false);
            var file = oEvent.getParameter("files") && oEvent.getParameter("files")[0];
            that.fileName = file.name;
            // var oFile = oEvent.getParameter("files")[0];
            // this.oFile = oFile;
            var aResults = [];
            if (file && window.FileReader) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    workbook.SheetNames.forEach(function(sheetName) {
                        // Here is your object for every sheet in workbook
                        aResults = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);   
                    });
                    console.log(aResults);
                    oTableJsonModel.setProperty("/Data", aResults);
                    // var oModel = new JSONModel({"xslx":aResults});
                        // self.getView().setModel(oModel, "xlModel");
                        // self.getView().getModel("xlModel").setProperty("/xslx", aResults);
                    var promise =  new Promise(function(resolve){
                        resolve();
                     }).then(function() {
                        that.generateTableCsv();
                    });
                };
                reader.onerror = function(ex) {
                    console.log(ex);
                };
                reader.readAsBinaryString(file);
            } 
            
        },

        

        generateTableCsv : function(){
                
            var that = this;
            var oTable = that.getView().byId("Tableid");
            var newTable = oCont.getView().byId("newTable");

            var oModel = that.getView().getModel();
            var oModelData = oTableJsonModel.getProperty("/Data");
            oTable.setModel(oTableJsonModel);
            var selectedFileTemp = this.getView().byId("id_File").getSelectedKey();
            
            if(selectedFileTemp =="01"){
                
                oTable.setVisible(true);
                newTable.setVisible(false);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[5] == "Value"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header: new Label({
                                text: "{Text}",
                                wrapping : false
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);
                        var oItemTemplate = new ColumnListItem();
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(new Text({
                                text: "{" + oHeaderName + "}"
                            }));
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }	
            }else if (selectedFileTemp == "02"){
                oTable.setVisible(true);
                newTable.setVisible(false);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[7] == "id_complaint_type"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header: new Label({
                                text: "{Text}",
                                wrapping : true,
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);
                        var oItemTemplate = new ColumnListItem();
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(new Text({
                                text: "{" + oHeaderName + "}"
                            }));
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            }else if (selectedFileTemp == "03"){
                oTable.setVisible(true);
                newTable.setVisible(false);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[5] == "Value"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header: new Label({
                                text: "{Text}",
                                wrapping : true,
                                design : "Bold"
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);
                        var oItemTemplate = new ColumnListItem();
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(new Text({
                                text: "{" + oHeaderName + "}"
                            }));
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            }else if (selectedFileTemp == "04"){
                oTable.setVisible(true);
                newTable.setVisible(false);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[5] == "id_waste_type"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header: new Label({
                                text: "{Text}",
                                wrapping : true,
                                design : "Bold"
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);
                        var oItemTemplate = new ColumnListItem();
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(new Text({
                                text: "{" + oHeaderName + "}"
                            }));
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            }else if (selectedFileTemp == "05"){
                //In case of Supplier Master Data we are using sap.ui.table.Table api for displaying data
                oTable.setVisible(false);
                newTable.setVisible(true);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[5] == "ID Waste Type"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header : new Text({
                                text: "{Text}",
                                wrapping : true
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);

                        newTable.setModel(oTableJsonModel);
                        newTable.setVisibleRowCount(oTableJsonModel.getData().Data.length)

                        var oNewTemplate = new sap.ui.table.Column({
                            width : "auto",
                            minWidth : 5,
                            autoResizable : true,
                            label : new sap.m.Label({
                                wrapping : true,
                                tooltip : "{Text}",
                                text : "{Text}"
                            }),
                            template : new sap.m.Text({
                                text : "{Text}",
                                tooltip : "{Text}",
                                wrapping : false
                            })
                        });
                        //newTable.bindAggregation("columns", "/columnNames", oNewTemplate);

                        newTable.bindColumns("/columnNames", function(sId, oContext) {
                            var columnName = oContext.getObject().Text;
                            return new sap.ui.table.Column({
                                width : "5rem",
                                minWidth : 5,
                                autoResizable : true,
                                label: columnName,
                                template: columnName,
                            });
                        });
                        newTable.bindRows("/Data");

                        var oItemTemplate = new ColumnListItem({
                            vAlign : "Middle"
                        });
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(
                                new Text({
                                    text: "{" + oHeaderName + "}",
                                    wrapping : true
                                })
                            );
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            }else if (selectedFileTemp == "06"){
                //In case of Supplier Master Data we are using sap.ui.table.Table api for displaying data
                oTable.setVisible(false);
                newTable.setVisible(true);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[5] == "ID Waste Type"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header : new Text({
                                text: "{Text}",
                                wrapping : true
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);

                        newTable.setModel(oTableJsonModel);
                        newTable.setVisibleRowCount(oTableJsonModel.getData().Data.length)

                        var oNewTemplate = new sap.ui.table.Column({
                            width : "auto",
                            minWidth : 5,
                            autoResizable : true,
                            label : new sap.m.Label({
                                wrapping : true,
                                tooltip : "{Text}",
                                text : "{Text}"
                            }),
                            template : new sap.m.Text({
                                text : "{Text}",
                                tooltip : "{Text}",
                                wrapping : false
                            })
                        });
                        //newTable.bindAggregation("columns", "/columnNames", oNewTemplate);

                        newTable.bindColumns("/columnNames", function(sId, oContext) {
                            var columnName = oContext.getObject().Text;
                            return new sap.ui.table.Column({
                                width : "5rem",
                                minWidth : 5,
                                autoResizable : true,
                                label: columnName,
                                template: columnName,
                            });
                        });
                        newTable.bindRows("/Data");

                        var oItemTemplate = new ColumnListItem({
                            vAlign : "Middle"
                        });
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(
                                new Text({
                                    text: "{" + oHeaderName + "}",
                                    wrapping : true
                                })
                            );
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            }else if (selectedFileTemp == "07"){
                //In case of Supplier Master Data we are using sap.ui.table.Table api for displaying data
                oTable.setVisible(false);
                newTable.setVisible(true);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[5] == "Value"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header : new Text({
                                text: "{Text}",
                                wrapping : true
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);

                        newTable.setModel(oTableJsonModel);
                        newTable.setVisibleRowCount(oTableJsonModel.getData().Data.length)

                        var oNewTemplate = new sap.ui.table.Column({
                            width : "auto",
                            minWidth : 5,
                            autoResizable : true,
                            label : new sap.m.Label({
                                wrapping : true,
                                tooltip : "{Text}",
                                text : "{Text}"
                            }),
                            template : new sap.m.Text({
                                text : "{Text}",
                                tooltip : "{Text}",
                                wrapping : false
                            })
                        });
                        //newTable.bindAggregation("columns", "/columnNames", oNewTemplate);

                        newTable.bindColumns("/columnNames", function(sId, oContext) {
                            var columnName = oContext.getObject().Text;
                            return new sap.ui.table.Column({
                                width : "5rem",
                                minWidth : 5,
                                autoResizable : true,
                                label: columnName,
                                template: columnName,
                            });
                        });
                        newTable.bindRows("/Data");

                        var oItemTemplate = new ColumnListItem({
                            vAlign : "Middle"
                        });
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(
                                new Text({
                                    text: "{" + oHeaderName + "}",
                                    wrapping : true
                                })
                            );
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            }else if (selectedFileTemp == "08"){
                //In case of Supplier Master Data we are using sap.ui.table.Table api for displaying data
                oTable.setVisible(false);
                newTable.setVisible(true);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[5] == "Value"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header : new Text({
                                text: "{Text}",
                                wrapping : true
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);

                        newTable.setModel(oTableJsonModel);
                        newTable.setVisibleRowCount(oTableJsonModel.getData().Data.length)

                        var oNewTemplate = new sap.ui.table.Column({
                            width : "auto",
                            minWidth : 5,
                            autoResizable : true,
                            label : new sap.m.Label({
                                wrapping : true,
                                tooltip : "{Text}",
                                text : "{Text}"
                            }),
                            template : new sap.m.Text({
                                text : "{Text}",
                                tooltip : "{Text}",
                                wrapping : false
                            })
                        });
                        //newTable.bindAggregation("columns", "/columnNames", oNewTemplate);

                        newTable.bindColumns("/columnNames", function(sId, oContext) {
                            var columnName = oContext.getObject().Text;
                            return new sap.ui.table.Column({
                                width : "5rem",
                                minWidth : 5,
                                autoResizable : true,
                                label: columnName,
                                template: columnName,
                            });
                        });
                        newTable.bindRows("/Data");

                        var oItemTemplate = new ColumnListItem({
                            vAlign : "Middle"
                        });
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(
                                new Text({
                                    text: "{" + oHeaderName + "}",
                                    wrapping : true
                                })
                            );
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            }else if (selectedFileTemp == "09"){
                //In case of Supplier Master Data we are using sap.ui.table.Table api for displaying data
                oTable.setVisible(false);
                newTable.setVisible(true);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[5] == "Value"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header : new Text({
                                text: "{Text}",
                                wrapping : true
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);

                        newTable.setModel(oTableJsonModel);
                        newTable.setVisibleRowCount(oTableJsonModel.getData().Data.length)

                        var oNewTemplate = new sap.ui.table.Column({
                            width : "auto",
                            minWidth : 5,
                            autoResizable : true,
                            label : new sap.m.Label({
                                wrapping : true,
                                tooltip : "{Text}",
                                text : "{Text}"
                            }),
                            template : new sap.m.Text({
                                text : "{Text}",
                                tooltip : "{Text}",
                                wrapping : false
                            })
                        });
                        //newTable.bindAggregation("columns", "/columnNames", oNewTemplate);

                        newTable.bindColumns("/columnNames", function(sId, oContext) {
                            var columnName = oContext.getObject().Text;
                            return new sap.ui.table.Column({
                                width : "5rem",
                                minWidth : 5,
                                autoResizable : true,
                                label: columnName,
                                template: columnName,
                            });
                        });
                        newTable.bindRows("/Data");

                        var oItemTemplate = new ColumnListItem({
                            vAlign : "Middle"
                        });
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(
                                new Text({
                                    text: "{" + oHeaderName + "}",
                                    wrapping : true
                                })
                            );
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            }else if (selectedFileTemp == "10"){
                //In case of Supplier Master Data we are using sap.ui.table.Table api for displaying data
                oTable.setVisible(false);
                newTable.setVisible(true);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[5] == "id_water_type"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header : new Text({
                                text: "{Text}",
                                wrapping : true
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);

                        newTable.setModel(oTableJsonModel);
                        newTable.setVisibleRowCount(oTableJsonModel.getData().Data.length)

                        var oNewTemplate = new sap.ui.table.Column({
                            width : "auto",
                            minWidth : 5,
                            autoResizable : true,
                            label : new sap.m.Label({
                                wrapping : true,
                                tooltip : "{Text}",
                                text : "{Text}"
                            }),
                            template : new sap.m.Text({
                                text : "{Text}",
                                tooltip : "{Text}",
                                wrapping : false
                            })
                        });
                        //newTable.bindAggregation("columns", "/columnNames", oNewTemplate);

                        newTable.bindColumns("/columnNames", function(sId, oContext) {
                            var columnName = oContext.getObject().Text;
                            return new sap.ui.table.Column({
                                width : "5rem",
                                minWidth : 5,
                                autoResizable : true,
                                label: columnName,
                                template: columnName,
                            });
                        });
                        newTable.bindRows("/Data");

                        var oItemTemplate = new ColumnListItem({
                            vAlign : "Middle"
                        });
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(
                                new Text({
                                    text: "{" + oHeaderName + "}",
                                    wrapping : true
                                })
                            );
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            
            }else if (selectedFileTemp == "11"){
                //In case of Supplier Master Data we are using sap.ui.table.Table api for displaying data
                oTable.setVisible(false);
                newTable.setVisible(true);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[5]== "id_air_emission_type"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header : new Text({
                                text: "{Text}",
                                wrapping : true
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);

                        newTable.setModel(oTableJsonModel);
                        newTable.setVisibleRowCount(oTableJsonModel.getData().Data.length)

                        var oNewTemplate = new sap.ui.table.Column({
                            width : "auto",
                            minWidth : 5,
                            autoResizable : true,
                            label : new sap.m.Label({
                                wrapping : true,
                                tooltip : "{Text}",
                                text : "{Text}"
                            }),
                            template : new sap.m.Text({
                                text : "{Text}",
                                tooltip : "{Text}",
                                wrapping : false
                            })
                        });
                        //newTable.bindAggregation("columns", "/columnNames", oNewTemplate);

                        newTable.bindColumns("/columnNames", function(sId, oContext) {
                            var columnName = oContext.getObject().Text;
                            return new sap.ui.table.Column({
                                width : "5rem",
                                minWidth : 5,
                                autoResizable : true,
                                label: columnName,
                                template: columnName,
                            });
                        });
                        newTable.bindRows("/Data");

                        var oItemTemplate = new ColumnListItem({
                            vAlign : "Middle"
                        });
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(
                                new Text({
                                    text: "{" + oHeaderName + "}",
                                    wrapping : true
                                })
                            );
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            
            }else if (selectedFileTemp == "12"){
                //In case of Supplier Master Data we are using sap.ui.table.Table api for displaying data
                oTable.setVisible(false);
                newTable.setVisible(true);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[8] == "Fis_year"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header : new Text({
                                text: "{Text}",
                                wrapping : true
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);

                        newTable.setModel(oTableJsonModel);
                        newTable.setVisibleRowCount(oTableJsonModel.getData().Data.length)

                        var oNewTemplate = new sap.ui.table.Column({
                            width : "auto",
                            minWidth : 5,
                            autoResizable : true,
                            label : new sap.m.Label({
                                wrapping : true,
                                tooltip : "{Text}",
                                text : "{Text}"
                            }),
                            template : new sap.m.Text({
                                text : "{Text}",
                                tooltip : "{Text}",
                                wrapping : false
                            })
                        });
                        //newTable.bindAggregation("columns", "/columnNames", oNewTemplate);

                        newTable.bindColumns("/columnNames", function(sId, oContext) {
                            var columnName = oContext.getObject().Text;
                            return new sap.ui.table.Column({
                                width : "5rem",
                                minWidth : 5,
                                autoResizable : true,
                                label: columnName,
                                template: columnName,
                            });
                        });
                        newTable.bindRows("/Data");

                        var oItemTemplate = new ColumnListItem({
                            vAlign : "Middle"
                        });
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(
                                new Text({
                                    text: "{" + oHeaderName + "}",
                                    wrapping : true
                                })
                            );
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            
            }else if (selectedFileTemp == "13"){
                //In case of Supplier Master Data we are using sap.ui.table.Table api for displaying data
                oTable.setVisible(false);
                newTable.setVisible(true);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[7] == "category"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header : new Text({
                                text: "{Text}",
                                wrapping : true
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);

                        newTable.setModel(oTableJsonModel);
                        newTable.setVisibleRowCount(oTableJsonModel.getData().Data.length)

                        var oNewTemplate = new sap.ui.table.Column({
                            width : "auto",
                            minWidth : 5,
                            autoResizable : true,
                            label : new sap.m.Label({
                                wrapping : true,
                                tooltip : "{Text}",
                                text : "{Text}"
                            }),
                            template : new sap.m.Text({
                                text : "{Text}",
                                tooltip : "{Text}",
                                wrapping : false
                            })
                        });
                        //newTable.bindAggregation("columns", "/columnNames", oNewTemplate);

                        newTable.bindColumns("/columnNames", function(sId, oContext) {
                            var columnName = oContext.getObject().Text;
                            return new sap.ui.table.Column({
                                width : "5rem",
                                minWidth : 5,
                                autoResizable : true,
                                label: columnName,
                                template: columnName,
                            });
                        });
                        newTable.bindRows("/Data");

                        var oItemTemplate = new ColumnListItem({
                            vAlign : "Middle"
                        });
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(
                                new Text({
                                    text: "{" + oHeaderName + "}",
                                    wrapping : true
                                })
                            );
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            
            }
            

        },

        onClear : function(oEvent){
            oCont.getView().byId("id_BF").setSelectedKey(); 
            oCont.getView().byId("id_File").setSelectedKey(); 
            oFileUploader.clear();
            oTableJsonModel.setData([]);
            oCont.getView().byId("idSubmit").setVisible(false);
            oCont.getView().byId("idClear").setVisible(false);
        },

        onSubmit : function(){
            var self = this;
            var str = this.fileName;
            var selecedBF = this.getView().byId("id_BF").getSelectedKey();
            var vData = oTableJsonModel.getProperty("/Data");
            var oModel = this.getOwnerComponent().getModel();
			var aDeferredGroups = oModel.getDeferredGroups();
            aDeferredGroups = aDeferredGroups.concat(["createGrp"]);
            oModel.setDeferredGroups(aDeferredGroups);

            if(selecedBF == "01"){
              var matchPrinciple = str.match(/P-(\d+)/);
              if (matchPrinciple) {
              var extractedPrinciple = matchPrinciple[1];
              }
              var matchQuestion = str.match(/I-(\d+)/);
              if(matchQuestion){
                var extactQuestionNumber = matchQuestion[1];
              }
              var matchIndicator = str.match(/([A-Za-z])_I/);
              if(matchIndicator){
                var extactIndicator = matchIndicator[1];
              }
              if(extactIndicator === "E"){

                var indicator = "Essential";
              }else {
                var indicator = "Leadership";
              }

             for (var i = 0; i < vData.length; i++){
                var data = {  
                    "businessFunction" : "EHS",
                    "principle" : extractedPrinciple,
                    "indicator" : indicator,
                    "questionID" : extactQuestionNumber,
                    "value_date" : vData[i]?.['Value Date'] || '',
                    "id_waste_type": vData[i]?.['id_waste_type'] || '',
                    "id_complaint_type" : vData[i]?.['id_complaint_type'] || '',
                    "id_injury_type" : vData[i]?.['id_injury_type'] || '',
                    "category" : vData[i]?.['category'] || '',
                    "id_water_type" : vData[i]?.['id_water_type'] || '',
                    "id_air_emission_type" : vData[i]?.['id_air_emission_type'] || '',
                    "employee_type" : vData[i]?.['employee_type'] || '',
                    "data_title" : vData[i]?.['Data Title'] || '',
                    "company_code" : vData[i]?.['Company Code'] || '', // NK
                    "country" : vData[i]?.['Country'] || '', //NK
                    "location_text" : vData[i]?.['Location Text'] || '', //NK
                    "plant_id" : vData[i]?.['Plant Id'] || '', //NK
                    "value" : vData[i]?.['Value'] || '', //NK
                    "unit_text" : vData[i]?.['Unit Text'] || '' //NK
                    
                  };
                  
                oModel.create("/quantitative_data", data, {
					groupId: "createGrp"
				});
                //return;
                var oBusy = new sap.m.BusyDialog();
            // oBusy.open();            
             }
             oModel.submitChanges({
				groupId: "createGrp",
				success: function(res) {
                    // oBusy.close();
					// var msg = "";
					// var aResponses = res.__batchResponses[0].__changeResponses;

                    if(res?.__batchResponses[0].__changeResponses){
                        var aResponses = res.__batchResponses[0].__changeResponses;
                        for (var i = 0; i < res.__batchResponses[0].__changeResponses.length; i++){
                            if(i === 0){
                                var successMessage = "Data Uploaded Successfully!";
                                MessageBox.show(
                                    successMessage, {
                                        icon: sap.m.MessageBox.Icon.SUCCESS,
                                        title: "Success",
                                        actions: [],
                                        onClose: function(oAction) { }
                                    }
                                );
                            }
                        }
                        oFileUploader.clear();
                        oTableJsonModel.setData([]);
                    }else{
                        var errorJSON= JSON.parse(res.__batchResponses[0].response.body);
                        var msg = errorJSON.error.message.value;
                        // var isMessageDisplayed = false;
                        // if(isMessageDisplayed)
                        sap.m.MessageBox.information(msg);
                        oFileUploader.clear();
                        oTableJsonModel.setData([]);
                       
                    }

                    // self.getView().byId("_IDGenTable1").setBusy(false);
                    // that.onRefreshTable();
					// for (var i = 0; i < aResponses.length; i++) {
                    //       if(aResponses[i].statusCode === "201") {
                    //       	msg = msg + aResponses[i].data.FilePath + " Uploaded successfully \n";
                    //       }else{
                    //       		msg = msg + aResponses[i].data.FilePath + " creation failed \n";
                    //       }
					// }
                    // sap.m.MessageBox.information(msg);
                    // that.onRefreshTable();


				},
				error: function(err) {
					sap.m.MessageBox.error("Batch operation failed");
				}
			
            });

            }

        },
        
        createColumnConfig : function(){
            var selectedBF = this.getView().byId("id_BF").getSelectedKey();
            var selectedTemplate = this.getView().byId("id_File").getSelectedKey();
           var columns = [];
           if(selectedBF == "01"){
            columns = [{
                label: 'Company Code',
                property: 'company_code',
                width: '25'
            },
            {
                label: 'Country',
                property: 'Country',
                width: '25'
            },
            {
                label: 'Location Text',
                property: 'location_text',
                width: '25'
            },
            {
                label: 'Plant Id',
                property: 'plant_id',
                width: '30'
            },
            {
                label: 'Data Title',
                property: 'data_title',
                width: '40'
            },
            {
                label: 'Value',
                property: 'value ',
                width: '18'
            },
            {
                label: 'Unit Text',
                property: 'unit_text',
                width: '18'
            },
            {
                label: 'Value Date',
                property: 'value_date',
                width: '18'
            }];
            
            if(selectedTemplate == "02"){
            var newColumns = {
                label: 'id_complaint_type',
                property: 'id_complaint_type',
                width: '25'
              };
              columns.splice(7, 0, newColumns);
      
            }else if(selectedTemplate == "04"){
            var newColumns = {
                label : "id_waste_type",
                property :"id_waste_type",
                width: '25'
              };
              columns.splice(5, 0, newColumns);

           }
           else if(selectedTemplate == "05"){
            var newColumns = {
                label : "id_waste_type",
                property :"id_waste_type",
                width: '25'
              };
              columns.splice(5, 0, newColumns);

           }
           else if(selectedTemplate == "06"){
            var newColumns = {
                label : "id_waste_type",
                property :"id_waste_type",
                width: '25'
              };
              columns.splice(5, 0, newColumns);

           }else if(selectedTemplate == "10"){
            var newColumns = {
                label : "id_water_type",
                property :"id_water_type",
                width: '25'
              };
              columns.splice(5, 0, newColumns);
           }
           else if(selectedTemplate == "11"){
            var newColumns = {
                label : "id_air_emission_type",
                property :"id_air_emission_type",
                width: '25'
              };
              columns.splice(5, 0, newColumns);

           }
           else if(selectedTemplate == "12"){
            var newColumns = {
                label : "Fis_year",
                property :"Fis_year",
                width: '25'
              };
              columns.splice(8, 0, newColumns);
           }
           else if(selectedTemplate == "13"){
            var newColumns = {
                label : "category",
                property :"category",
                width: '25'
              };
              columns.splice(7, 0, newColumns);

           }

            }

          
          return columns;
        },
        onTemplateDownload : function(){
            var selectedBF = this.getView().byId("id_BF").getSelectedKey();
            var selectedTemplate = this.getView().byId("id_File").getSelectedKey();
            var fileName =  "";
            var temp = [];
            if(selectedBF == "01"){
            
            temp = [{
				"key": "company_code",
				"value": "company_code"
			}, {
				"key": "Country",
				"value": "Country"
			},
            {
				"key": "Location_text",
				"value": "Location_text"
			},
            {
                "key" : "plant_id",
                "value" : "plant_id"          
            },
            {
                "key" : "data_title",
                "value" : "data_title"          
            },
            {
				"key": "Value",
				"value": "Value"
			},
            {
				"key": "unit_text",
				"value": "unit_text"
			},
            {
				"key": "value_date",
				"value": "value_date"
			}
            ];
            if(selectedTemplate == "01"){
                fileName = "P-3_E_I-11_Details of Safety Related Incidents";         
           }
            else if(selectedTemplate == "02"){
                fileName = "P-3_E_I-13 Complaints"
                var newColumns = {
                    "key" : "id_complaint_type",
                    "value" :"id_complaint_type"
                  };
                  temp.splice(7, 0, newColumns);
                }
            else if(selectedTemplate == "03"){
                fileName = "P-6_E_I-6 Scope1Emissions";
           }
           else if(selectedTemplate == "04"){
            fileName = "P-6_E_I-8 Waste Disposed";
            var newColumns = {
                "key" : "id_waste_type",
                "value" :"id_waste_type"
              };
              temp.splice(5, 0, newColumns);

           }
           else if(selectedTemplate == "05"){
            fileName = "P-6_E_I-8 Waste Generated";
            var newColumns = {
                "key" : "id_waste_type",
                "value" :"id_waste_type"
              };
              temp.splice(5, 0, newColumns);

           }
           else if(selectedTemplate == "06"){
            fileName = "P-6_E_I-8 Waste Recovered";
            var newColumns = {
                "key" : "id_waste_type",
                "value" :"id_waste_type"
              };
              temp.splice(5, 0, newColumns);

           }
           else if(selectedTemplate == "07"){
            fileName = "P-6_E_I-1 ElectricityConsumption";

           }
           else if(selectedTemplate == "08"){
            fileName = "P-6_E_I-1 FuelConsumption";

           }
           else if(selectedTemplate == "09"){
            fileName = "P-6_E_I-3 WaterConsumed";

           }
           else if(selectedTemplate == "10"){
            fileName = "P-6_E_I-3 WaterWithdrawl";
            var newColumns = {
                "key" : "id_water_type",
                "value" :"id_water_type"
              };
              temp.splice(5, 0, newColumns);
           }
           else if(selectedTemplate == "11"){
            fileName = "P-6_E_I-5 Air Emission";
            var newColumns = {
                "key" : "id_air_emission_type",
                "value" :"id_air_emission_type"
              };
              temp.splice(5, 0, newColumns);

           }
           else if(selectedTemplate == "12"){
            fileName = "P-6_E_I-6 Scope2Emissions";
            var newColumns = {
                "key" : "Fis_year",
                "value" :"Fis_year"
              };
              temp.splice(8, 0, newColumns);
           }
           else if(selectedTemplate == "13"){
            fileName = "P-6_L_I-4 Scope3Emissions";
            var newColumns = {
                "key" : "category",
                "value" :"category"
              };
              temp.splice(7, 0, newColumns);

           }else {
            sap.m.MessageToast.show('Please select drop down');
           }
        }


        var aCols, aProducts, oSettings, oSheet;
        aCols = this.createColumnConfig();
        aProducts = temp;
        oSettings = {
            workbook: { columns: aCols },
            dataSource: aProducts,
            fileName: fileName
        };
        oSheet = new Spreadsheet(oSettings);
			oSheet.build()
				.then( function() {
					sap.m.MessageToast.show('Spreadsheet export has finished');
				})
				.finally(oSheet.destroy);
        },
       

        // onChangeFile : function(oEvent){
        //     // debugger;
        //     this._import(oEvent.getParameter("files") && oEvent.getParameter("files")[0]);
        // },
        _import: function(file){
            var self = this;
            var aResults = [];
            if (file && window.FileReader) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    workbook.SheetNames.forEach(function(sheetName) {
                        // Here is your object for every sheet in workbook
                        aResults = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);   
                    });
                    console.log(aResults);
                    var oModel = new JSONModel({"xslx":aResults});
                        self.getView().setModel(oModel, "xlModel");
                        // self.getView().getModel("xlModel").setProperty("/xslx", aResults);
            
                };
                reader.onerror = function(ex) {
                    console.log(ex);
                };
                reader.readAsBinaryString(file);
            } 
        },
        onUploadExcel : function(){
            var self = this;
            var sys = this.getView().getModel("xlModel").getData().xslx;
			var oModel = this.getOwnerComponent().getModel();
			var aDeferredGroups = oModel.getDeferredGroups();
			aDeferredGroups = aDeferredGroups.concat(["createGrp"]);
			oModel.setDeferredGroups(aDeferredGroups);

            for (var i = 0; i < sys.length; i++) {
                // var path = sys[i]['File Path'];
                // var filePath = path.replace("/", "//");
                var data = {  
                    "businessFunction" : "EHS",
                    "principle" : "6",
                    "indicator" : "Essential",
                    "questionID" : "8",
                    "value_date" : sys[i]['Value Date'],
                    "id_waste_type": sys[i]['ID Waste Type'],
                    "id_complaint_type" : "",
                    "id_injury_type" : "",
                    "category" : " ",
                    "id_water_type" : " ",
                    "id_air_emission_type" : "",
                    "employee_type" : "",
                    "data_title" : sys[i]['Data Title'],
                    "company_code" : sys[i]['Company Code'], // NK
                    "country" : sys[i]['country'], //NK
                    "location_text" : sys[i]['Location Text'], //NK
                    "plant_id" : sys[i]['Plant Id'], //NK
                    "value" : sys[i]['Value'], //NK
                    "unit_text" : sys[i]['Unit Text'] //NK
                    
                  };
				oModel.create("/quantitative_data", data, {
					groupId: "createGrp"
				});
			}
            var oBusy = new sap.m.BusyDialog();
            // oBusy.open();
            oModel.submitChanges({
				groupId: "createGrp",
				success: function(res) {
                    // oBusy.close();
					// var msg = "";
					var aResponses = res.__batchResponses[0].__changeResponses;
                    if(aResponses){
                        sap.m.MessageBox.information("Uploaded successfully");
                    }
                    else{
                       var errorJSON= JSON.parse(res.__batchResponses[0].response.body);
                       var msg = errorJSON.error.message.value;
                       sap.m.MessageBox.information(msg);
                    }
                    that.getView().byId("_IDGenTable1").setBusy(false);
                    // that.onRefreshTable();
					// for (var i = 0; i < aResponses.length; i++) {
                    //       if(aResponses[i].statusCode === "201") {
                    //       	msg = msg + aResponses[i].data.FilePath + " Uploaded successfully \n";
                    //       }else{
                    //       		msg = msg + aResponses[i].data.FilePath + " creation failed \n";
                    //       }
					// }
                    // sap.m.MessageBox.information(msg);
                    // that.onRefreshTable();


				},
				error: function(err) {
					sap.m.MessageBox.error("Batch operation failed");
				}
			
            });
        },
        // createColumnConfig: function() {
        //     return [
        //         {
        //             label: 'Company Code',
        //             property: 'company_code',
        //             width: '25'
        //         },
        //         {
        //             label: 'Country',
        //             property: 'Country',
        //             width: '25'
        //         },
        //         {
        //             label: 'Location Text',
        //             property: 'location_text',
        //             width: '25'
        //         },
        //         {
        //             label: 'Plant Id',
        //             property: 'plant_id',
        //             width: '30'
        //         },
        //         {
        //             label: 'Data Title',
        //             property: 'data_title',
        //             width: '40'
        //         },
        //         {
        //             label: 'ID Waste Type',
        //             property: 'id_waste_type',
        //             width: '40'
        //         },
        //         {
        //             label: 'Value',
        //             property: 'value ',
        //             width: '18'
        //         },
        //         {
        //             label: 'Unit Text',
        //             property: 'unit_text',
        //             width: '18'
        //         },
        //         {
        //             label: 'Value Date',
        //             property: 'value_date',
        //             width: '18'
        //         }
        //         ];
        // },
        downloadTemplate : function() {
            let temp = [{
				"key": "company_code",
				"value": "company_code"
			}, {
				"key": "Country",
				"value": "Country"
			},
            {
				"key": "Location_text",
				"value": "Location_text"
			},
            {
                "key" : "plant_id",
                "value" : "plant_id"          
            },
            {
                "key" : "data_title",
                "value" : "data_title"          
            },
            {
				"key": "id_waste_type",
				"value": "id_waste_type"
			},
            {
				"key": "Value",
				"value": "Value"
			},
            {
				"key": "unit_text",
				"value": "unit_text"
			},
            {
				"key": "value_date",
				"value": "value_date"
			}
         ];
            // this.getOwnerComponent().getModel("systemsData").setProperty("/Temp", temp);

            var aCols, aProducts, oSettings, oSheet;

			aCols = this.createColumnConfig();
			// aProducts = this.getView().getModel("systemsData").getProperty('/Temp');
            aProducts = temp;
			oSettings = {
				workbook: { columns: aCols },
				dataSource: aProducts,
                fileName: 'P-6_E_I- 8 Waste Disposed.xlsx'
			};

			oSheet = new Spreadsheet(oSettings);
			oSheet.build()
				.then( function() {
					sap.m.MessageToast.show('Spreadsheet export has finished');
				})
				.finally(oSheet.destroy);
            

            }
        });
    });
