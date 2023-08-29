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
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Export, ExportTypeCSV, BusyDialog, Column, Label, Text, MessageBox, ColumnListItem, JSONModel,Spreadsheet) {
        "use strict";
        var oCont, oTableJsonModel, oTable, oFileUploader,fileName;
        return Controller.extend("excelupload.controller.View1", {
        onInit: function () {
            oCont = this;
            this.oDataModel = this.getOwnerComponent().getModel();
            oTableJsonModel = new JSONModel();
            oTable = oCont.getView().byId("Tableid");
            oFileUploader = oCont.getView().byId("id_fileUploader");
            fileName = "";
            var oEdit = {
                editable: false
            };
            var myedit = {};
            myedit.edit = oEdit;
            var oEditModel = new JSONModel(myedit);
            this.getView().setModel(oEditModel, "editModel");
            this.getView().setModel(oEditModel,"hrEditModel");
            this.getView().setModel(oEditModel,"procurementEditModel");
			this.getView().setModel(oEditModel,"financeEditModel");
        },
        fnUploadStart : function(){ // uploadStart event from fileuploader
            oCont.getView().setBusy(true);
        },
        fnSelectChange : function(oEvent){ //selectChange event from Select drop down
            // var selectedMasterKey = this.getView().byId("id_BF").getSelectedKey();
            var selectedBF = this.getView().byId("id_BF").getSelectedKey();
            var selectedFile = this.getView().byId("id_File").getSelectedKey();
            //oTable.setModel(null,"oTableJsonModel");
            oTable.destroyAggregation("columns");
            oTable.destroyAggregation("items");
            oFileUploader.clear();
            if(selectedBF != ''){
                oCont.getView().byId("id_fileUploader").setEnabled(true);
            } else{
                oCont.getView().byId("id_fileUploader").setEnabled(false);
                
            }
        },
        fnSelectChange1: function(oEvent){
                    this.getView().byId("id_File").setEnabled(false);
                     let sKey = oEvent.getSource().getProperty("selectedKey");
                     if(sKey === "00"){
                        this.getView().byId("id_File").setEnabled(true);
                     } 
                     else if (sKey === "07")
                     {

                        var monetary  = this.getView().byId("idMonetaryTable");
                        monetary.setVisible(true);
                        monetary.removeAllItems();
                        var nonMonetary = this.getView().byId("idNonMonetaryTable");
                        nonMonetary.setVisible(true);
                        nonMonetary.removeAllItems();
                        var oTable = this.getView().byId("idTable");
                        oTable.setVisible(true);
                        oTable.removeAllItems();
                        var oTable1 = this.getView().byId("idTable1");
                        oTable1.setVisible(true);
                        oTable1.removeAllItems();
                        var idQuestionsTable = this.getView().byId("idQuestionsTable");
                        idQuestionsTable.setVisible(true);
                        idQuestionsTable.removeAllItems();
                        var TableSegment  = this.getView().byId("idTableSegment");
                        TableSegment.setVisible(false);
                        var PEmpTable = this.getView().byId("idPEmpTable");
                        PEmpTable.setVisible(false);
                        var NPEmpTable = this.getView().byId("idNPEmpTable");
                        NPEmpTable.setVisible(false);
                        var WorkerTable = this.getView().byId("idWorkerTable");
                        WorkerTable.setVisible(false);
                        var NonWorkerTable  = this.getView().byId("idNonWorkerTable");
                        NonWorkerTable.setVisible(false);
                        var RetireBenfTable = this.getView().byId("idRetireBenfTable");
                        RetireBenfTable.setVisible(false);
                        var MembershipEmpTable = this.getView().byId("idMembershipEmpTable");
                        MembershipEmpTable.setVisible(false);
                        var MembershipWorTable = this.getView().byId("idMembershipWorTable");
                        MembershipWorTable.setVisible(false);
                        var RateofWorkAndLeaveTable = this.getView().byId("idRateofWorkAndLeaveTable");
                        RateofWorkAndLeaveTable.setVisible(false);
                        var PEmpTrainingTable  = this.getView().byId("idPEmpTrainingTable");
                        PEmpTrainingTable.setVisible(false);
                        var WorkTrainingTable = this.getView().byId("idWorkTrainingTable");
                        WorkTrainingTable.setVisible(false);
                        var PerEmpTable  = this.getView().byId("idPerEmpTable");
                        PerEmpTable.setVisible(false);
                        var PerWorkTable = this.getView().byId("idPerWorkTable");
                        PerWorkTable.setVisible(false);
                        var EmpHumanRightTable = this.getView().byId("idEmpHumanRightTable");
                        EmpHumanRightTable.setVisible(false);
                        var WorkHumanRightTable = this.getView().byId("idWorkHumanRightTable");
                        WorkHumanRightTable.setVisible(false);
                        var PEmpWageTable = this.getView().byId("idPEmpWageTable");
                        PEmpWageTable.setVisible(false);
                        var WorkWageTable = this.getView().byId("idWorkWageTable");
                        WorkWageTable.setVisible(false);
                        var WageTable = this.getView().byId("idWageTable");
                        WageTable.setVisible(false);
                        var ComplaintTable = this.getView().byId("idComplaintTable");
                        ComplaintTable.setVisible(false);
                        var AssessmentsTable = this.getView().byId("idAssessmentsTable");
                        AssessmentsTable.setVisible(false);
                        var SpendTable = this.getView().byId("idSpendTable");
                        SpendTable.setVisible(false);
                        var GrossWageTable = this.getView().byId("idGrossWageTable");
                        GrossWageTable.setVisible(false);
                        var CompFiledTable = this.getView().byId("idCompFiledTable");
                        CompFiledTable.setVisible(false);
                        var JobCreationTable = this.getView().byId("idJobCreationTable");
                        JobCreationTable.setVisible(false);
                        var inputMaterialTable = this.getView().byId("idInputMaterialTable");
                        inputMaterialTable.setVisible(false);
                        var detailsConcentrationTable = this.getView().byId("idDetailsConcentrationTable");
                        detailsConcentrationTable.setVisible(false);
                        var that = this;
                        that.getView().setBusy(true);
                        this.oDataModel.read("/qualitative_data_Legal_Compliance(up__fiscalYear='2030',up__businessFunction='Legal_Compliance',principle='1',indicator='Essential',questionID='2')/principle1_essential_2", {
                            success : function(oData){
                                        let aItems = [];
                                        let aItems1 = [];
                                    for(let i=0;i<oData.results.length;i++){
                                        if(oData.results[i].type === "Monetary"){
                                            let oItem = new sap.m.ColumnListItem({
                                                cells: [
                                                  new sap.m.Text({ text: oData.results[i].typeOfPaidAmount}),
                                                  new sap.m.Input({ value: oData.results[i].ngrbcPrinciple, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].nameOfInstitutions, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].amountInINR, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].briefOfTheCase, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].hasAnAppealBeen, editable:"{editModel>/edit/editable}"}),
                                                ]
                                              });
                                              if(oData.results[i].position === 0){
                                                aItems[0] = oItem;
                                            }
                                            if(oData.results[i].position === 1){
                                                aItems[1] = oItem;
                                            }
                                            if(oData.results[i].position === 2){
                                                aItems[2] = oItem;
                                            }
                                            
                                        }
                                        if(oData.results[i].type === "Non-Monetary"){
                                            let oItem = new sap.m.ColumnListItem({
                                                cells: [
                                                  new sap.m.Text({ text: oData.results[i].typeOfPaidAmount}),
                                                  new sap.m.Input({ value: oData.results[i].ngrbcPrinciple, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].nameOfInstitutions, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].amountInINR, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].briefOfTheCase, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].hasAnAppealBeen, editable:"{editModel>/edit/editable}"}),
                                                ]
                                              });
                                              if(oData.results[i].position === 0){
                                                aItems1[0] = oItem;
                                            }
                                            if(oData.results[i].position === 1){
                                                aItems1[1] = oItem;
                                            }
                                        }
                                    }
                                    for(let i=0;i<aItems.length;i++)
                                        monetary.addItem(aItems[i]);

                                    for(let i=0;i<aItems1.length;i++)
                                        nonMonetary.addItem(aItems1[i]);
                            },
                            error : function(oError){
                                debugger;
                            }

                        });

                        this.oDataModel.read("/qualitative_data_Legal_Compliance(up__fiscalYear='2030',up__businessFunction='Legal_Compliance',principle='1',indicator='Essential',questionID='5')/principle1_essential_5", {
                            success : function(oData){
                                let aItems = [];
                                    for(let i=0;i<oData.results.length;i++){
                                            let oItem = new sap.m.ColumnListItem({
                                                cells: [
                                                  new sap.m.Text({ text: oData.results[i].typeOfWorkers}),
                                                  new sap.m.Input({ value: oData.results[i].valueForCurrentFinancialYear, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].valueForPreviousFinancialYear, editable:"{editModel>/edit/editable}"}),
                                                ]
                                              });
                                              if(oData.results[i].position === 0){
                                                aItems[0] = oItem;
                                            }
                                            if(oData.results[i].position === 1){
                                                aItems[1] = oItem;
                                            }
                                            if(oData.results[i].position === 2){
                                                aItems[2] = oItem;
                                            }
                                            if(oData.results[i].position === 3){
                                                aItems[3] = oItem;
                                            }
                                            }
                                        for(let i=0;i<aItems.length;i++)
                                            oTable.addItem(aItems[i]);
                        },
                            error : function(oError){
                                    debugger;
                            }

                        });

                        this.oDataModel.read("/qualitative_data_Legal_Compliance(up__fiscalYear='2030',up__businessFunction='Legal_Compliance',principle='1',indicator='Essential',questionID='6')/principle1_essential_6", {
                            success : function(oData){
                                let aItems= [];
                                    for(let i=0;i<oData.results.length;i++){
                                            let oItem = new sap.m.ColumnListItem({
                                                cells: [
                                                  new sap.m.Text({ text: oData.results[i].detailsOfComplaints}),
                                                  new sap.m.Input({ value: oData.results[i].numberForCurrentFinancialYear, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].remarksForCurrentFinancialYear, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].numberForPreviousFinancialYear, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].remarksForPreviousFinancialYear, editable:"{editModel>/edit/editable}"}),
                                                ]
                                              });

                                              if(oData.results[i].position === 0){
                                                aItems[0] = oItem;
                                            }
                                            if(oData.results[i].position === 1){
                                                aItems[1] = oItem;
                                            }

                                    }
                                            
                                    for(let i=0;i<aItems.length;i++)
                                            oTable1.addItem(aItems[i]);
                                        that.getView().setBusy(false);
                                        },
                            error : function(oError){
                                    debugger;
                            }

                        });

                        
                        this.oDataModel.read("/qualitative_data_Legal_Compliance(up__fiscalYear='2030',up__businessFunction='Legal_Compliance',principle='9',indicator='Essential',questionID='7a')", {
                            success : function(oData){
                                let oItem = new sap.m.ColumnListItem({
                                    cells: [
                                      new sap.m.Text({ text: "Number of instances of data breaches"}),
                                      new sap.m.Input({ value: oData.answer, editable:"{editModel>/edit/editable}"}),
                                    ]
                                  });
                                 idQuestionsTable.addItem(oItem);
                                        },
                            error : function(oError){
                                    debugger;
                            }

                        });


                        this.oDataModel.read("/qualitative_data_Legal_Compliance(up__fiscalYear='2030',up__businessFunction='Legal_Compliance',principle='9',indicator='Essential',questionID='7b')", {
                            success : function(oData){
                                let oItem = new sap.m.ColumnListItem({
                                    cells: [
                                      new sap.m.Text({ text: "Percentage of data breaches involving personally identifiable information of customers"}),
                                      new sap.m.Input({ value: oData.answer, editable:"{editModel>/edit/editable}"}),
                                    ]
                                  });
                                 idQuestionsTable.addItem(oItem);
                                        },
                            error : function(oError){
                                    debugger;
                            }

                        });
                        
                        this.oDataModel.read("/qualitative_data_Legal_Compliance(up__fiscalYear='2030',up__businessFunction='Legal_Compliance',principle='9',indicator='Essential',questionID='7c')", {
                            success : function(oData){
                                let oItem = new sap.m.ColumnListItem({
                                    cells: [
                                      new sap.m.Text({ text: "Impact, if any, of the data breaches"}),
                                      new sap.m.Input({ value: oData.answer, editable:"{editModel>/edit/editable}"}),
                                    ]
                                  });
                                 idQuestionsTable.addItem(oItem);
                                        },
                            error : function(oError){
                                    debugger;
                            }

                        });
                     }
                     else if(sKey === "04"){

                        var TableSegment  = this.getView().byId("idTableSegment");
                        TableSegment.setVisible(true);
                        TableSegment.removeAllItems();
                        var PEmpTable = this.getView().byId("idPEmpTable");
                        PEmpTable.setVisible(true);
                        PEmpTable.removeAllItems();
                        var NPEmpTable = this.getView().byId("idNPEmpTable");
                        NPEmpTable.setVisible(true);
                        NPEmpTable.removeAllItems();
                        var WorkerTable = this.getView().byId("idWorkerTable");
                        WorkerTable.setVisible(true);
                        WorkerTable.removeAllItems();
                        var NonWorkerTable  = this.getView().byId("idNonWorkerTable");
                        NonWorkerTable.setVisible(true);
                        NonWorkerTable.removeAllItems();
                        var RetireBenfTable = this.getView().byId("idRetireBenfTable");
                        RetireBenfTable.setVisible(true);
                        RetireBenfTable.removeAllItems();
                        var MembershipEmpTable = this.getView().byId("idMembershipEmpTable");
                        MembershipEmpTable.setVisible(true);
                        MembershipEmpTable.removeAllItems();
                        var MembershipWorTable = this.getView().byId("idMembershipWorTable");
                        MembershipWorTable.setVisible(true);
                        MembershipWorTable.removeAllItems();
                        var RateofWorkAndLeaveTable = this.getView().byId("idRateofWorkAndLeaveTable");
                        RateofWorkAndLeaveTable.setVisible(true);
                        RateofWorkAndLeaveTable.removeAllItems();
                        var PEmpTrainingTable  = this.getView().byId("idPEmpTrainingTable");
                        PEmpTrainingTable.setVisible(true);
                        PEmpTrainingTable.removeAllItems();
                        var WorkTrainingTable = this.getView().byId("idWorkTrainingTable");
                        WorkTrainingTable.setVisible(true);
                        WorkTrainingTable.removeAllItems();
                        var PerEmpTable  = this.getView().byId("idPerEmpTable");
                        PerEmpTable.setVisible(true);
                        PerEmpTable.removeAllItems();
                        var PerWorkTable = this.getView().byId("idPerWorkTable");
                        PerWorkTable.setVisible(true);
                        PerWorkTable.removeAllItems();
                        var EmpHumanRightTable = this.getView().byId("idEmpHumanRightTable");
                        EmpHumanRightTable.setVisible(true);
                        EmpHumanRightTable.removeAllItems();
                        var WorkHumanRightTable = this.getView().byId("idWorkHumanRightTable");
                        WorkHumanRightTable.setVisible(true);
                        WorkHumanRightTable.removeAllItems();
                        var PEmpWageTable = this.getView().byId("idPEmpWageTable");
                        PEmpWageTable.setVisible(true);
                        PEmpWageTable.removeAllItems();
                        var WorkWageTable = this.getView().byId("idWorkWageTable");
                        WorkWageTable.setVisible(true);
                        WorkWageTable.removeAllItems();
                        var WageTable = this.getView().byId("idWageTable");
                        WageTable.setVisible(true);
                        WageTable.removeAllItems();
                        var ComplaintTable = this.getView().byId("idComplaintTable");
                        ComplaintTable.setVisible(true);
                        ComplaintTable.removeAllItems();
                        var AssessmentsTable = this.getView().byId("idAssessmentsTable");
                        AssessmentsTable.setVisible(true);
                        AssessmentsTable.removeAllItems();
                        var SpendTable = this.getView().byId("idSpendTable");
                        SpendTable.setVisible(true);
                        SpendTable.removeAllItems();
                        var GrossWageTable = this.getView().byId("idGrossWageTable");
                        GrossWageTable.setVisible(true);
                        GrossWageTable.removeAllItems();
                        var CompFiledTable = this.getView().byId("idCompFiledTable");
                        CompFiledTable.setVisible(true);
                        CompFiledTable.removeAllItems();
                        var JobCreationTable = this.getView().byId("idJobCreationTable");
                        JobCreationTable.setVisible(true);
                        JobCreationTable.removeAllItems();
                        var monetary  = this.getView().byId("idMonetaryTable");
                        monetary.setVisible(false);
                        var nonMonetary = this.getView().byId("idNonMonetaryTable");
                        nonMonetary.setVisible(false);
                        var oTable = this.getView().byId("idTable");
                        oTable.setVisible(false);
                        var oTable1 = this.getView().byId("idTable1");
                        oTable1.setVisible(false);
                        var idQuestionsTable = this.getView().byId("idQuestionsTable");
                        idQuestionsTable.setVisible(false);
                        var inputMaterialTable = this.getView().byId("idInputMaterialTable");
                        inputMaterialTable.setVisible(false);
                        var detailsConcentrationTable = this.getView().byId("idDetailsConcentrationTable");
                        detailsConcentrationTable.setVisible(false);
                        var that = this;
                        that.getView().setBusy(true);
                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2030',up__businessFunction='HR',principle='1',indicator='Essential',questionID='1')/principle1_essential_1", {
                            success : function(oData){
                                let aItems= [];
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].segment}),
                                          new sap.m.Input({ value: oData.results[i].numberOfTrainingPrograms, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].topicsCoveredUnderTraining, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfPersonsInRespectiveCategory, editable: "{hrEditModel>/edit/editable}"}),
                                        ]
                                      });
                                      if (oData.results[i].position === 0){
                                        aItems[0] = oItem;
                                      }
                                      else if(oData.results[i].position === 1){
                                        aItems[1] = oItem;
                                      }
                                      else if(oData.results[i].position === 2){
                                        aItems[2] = oItem;
                                      }
                                      else if(oData.results[i].position === 3){
                                        aItems[3] = oItem;
                                      }
                                    }
                                    for(let i=0;i<aItems.length;i++)
                                    TableSegment.addItem(aItems[i]);
                            },
                            error : function(oError){
                                debugger;
                            }
                        });
                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2030',up__businessFunction='HR',principle='3',indicator='Essential',questionID='1a')/principle3_essential_1a", {
                            success : function(oData){
                                let aItems = [];
                                let aItems1 = [];
                                for(let i=0;i<oData.results.length;i++){
                                    if(oData.results[i].type === "Permanent employees"){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].category}),
                                          new sap.m.Input({ value: oData.results[i].total, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].numberOfHealthInsurance, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfHealthInsurance, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].numberOfAccidentInsurance, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfAccidentInsurance, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].numberOfMaternityBenefits, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfMaternityBenefits, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].numberOfPaternityBenefits, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfPaternityBenefits, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].numberOfDayCareFacilities, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfDayCareFacilities, editable: "{hrEditModel>/edit/editable}"}),
                                        ]
                                      });
                                      if (oData.results[i].position === 0){
                                        aItems[0] = oItem;
                                      }
                                      else if(oData.results[i].position === 1){
                                        aItems[1] = oItem;
                                      }
                                      else if(oData.results[i].position === 2){
                                        aItems[2] = oItem;
                                      }
                                    }
                                    else 
                                    if(oData.results[i].type === "Other than Permanent employees"){
                                        let oItem = new sap.m.ColumnListItem({
                                            cells: [
                                                new sap.m.Text({ text: oData.results[i].category}),
                                                new sap.m.Input({ value: oData.results[i].total, editable: "{hrEditModel>/edit/editable}"}),
                                                new sap.m.Input({ value: oData.results[i].numberOfHealthInsurance, editable: "{hrEditModel>/edit/editable}"}),
                                                new sap.m.Input({ value: oData.results[i].percentageOfHealthInsurance, editable: "{hrEditModel>/edit/editable}"}),
                                                new sap.m.Input({ value: oData.results[i].numberOfAccidentInsurance, editable: "{hrEditModel>/edit/editable}"}),
                                                new sap.m.Input({ value: oData.results[i].percentageOfAccidentInsurance, editable: "{hrEditModel>/edit/editable}"}),
                                                new sap.m.Input({ value: oData.results[i].numberOfMaternityBenefits, editable: "{hrEditModel>/edit/editable}"}),
                                                new sap.m.Input({ value: oData.results[i].percentageOfMaternityBenefits, editable: "{hrEditModel>/edit/editable}"}),
                                                new sap.m.Input({ value: oData.results[i].numberOfPaternityBenefits, editable: "{hrEditModel>/edit/editable}"}),
                                                new sap.m.Input({ value: oData.results[i].percentageOfPaternityBenefits, editable: "{hrEditModel>/edit/editable}"}),
                                                new sap.m.Input({ value: oData.results[i].numberOfDayCareFacilities, editable: "{hrEditModel>/edit/editable}"}),
                                                new sap.m.Input({ value: oData.results[i].percentageOfDayCareFacilities, editable: "{hrEditModel>/edit/editable}"}),
                                            ]
                                        });
                                        if (oData.results[i].position === 0){
                                            aItems1[0] = oItem;
                                          }
                                          else if(oData.results[i].position === 1){
                                            aItems1[1] = oItem;
                                          }
                                          else if(oData.results[i].position === 2){
                                            aItems1[2] = oItem;
                                          }
                                    }
                                }
                                    for(let i=0;i<aItems.length;i++)
                                        PEmpTable.addItem(aItems[i]);
                                    for(let i=0;i<aItems1.length;i++)
                                        NPEmpTable.addItem(aItems1[i]);
                            },
                            error : function(oError){
                                debugger;
                            }
                        });
                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2030',up__businessFunction='HR',principle='3',indicator='Essential',questionID='1b')/principle3_essential_1b", {
                            success : function(oData){
                                let aItems = [];
                                let aItems1 = [];
                                for(let i=0;i<oData.results.length;i++){
                                    if(oData.results[i].type === "Permanent workers"){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].category}),
                                          new sap.m.Input({ value: oData.results[i].total, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].numberOfHealthInsurance, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfHealthInsurance, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].numberOfAccidentInsurance, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfAccidentInsurance, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].numberOfMaternityBenefits, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfMaternityBenefits, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].numberOfPaternityBenefits, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfPaternityBenefits, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].numberOfDayCareFacilities, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfDayCareFacilities, editable: "{hrEditModel>/edit/editable}"}),
                                        ]
                                      });

                                      if (oData.results[i].position === 0){
                                        aItems[0] = oItem;
                                      }
                                      else if(oData.results[i].position === 1){
                                        aItems[1] = oItem;
                                      }
                                      else if(oData.results[i].position === 2){
                                        aItems[2] = oItem;
                                      }
                                    }
                                    else 
                                        if(oData.results[i].type === "Other than Permanent workers"){
                                            let oItem = new sap.m.ColumnListItem({
                                                cells: [
                                                  new sap.m.Text({ text: oData.results[i].category}),
                                                  new sap.m.Input({ value: oData.results[i].total, editable: "{hrEditModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].numberOfHealthInsurance, editable: "{hrEditModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].percentageOfHealthInsurance, editable: "{hrEditModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].numberOfAccidentInsurance, editable: "{hrEditModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].percentageOfAccidentInsurance, editable: "{hrEditModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].numberOfMaternityBenefits, editable: "{hrEditModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].percentageOfMaternityBenefits, editable: "{hrEditModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].numberOfPaternityBenefits, editable: "{hrEditModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].percentageOfPaternityBenefits, editable: "{hrEditModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].numberOfDayCareFacilities, editable: "{hrEditModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].percentageOfDayCareFacilities, editable: "{hrEditModel>/edit/editable}"}),
                                                ]
                                              });
                                              if (oData.results[i].position === 0){
                                                aItems1[0] = oItem;
                                              }
                                              else if(oData.results[i].position === 1){
                                                aItems1[1] = oItem;
                                              }
                                              else if(oData.results[i].position === 2){
                                                aItems1[2] = oItem;
                                              }
                                            }
                                        }
                                        for(let i=0;i<aItems.length;i++)
                                            WorkerTable.addItem(aItems[i]);
                                        for(let i=0;i<aItems.length;i++)
                                            NonWorkerTable.addItem(aItems1[i]);
                            },
                            error : function(oError){
                                debugger;
                            }
                        });
                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2030',up__businessFunction='HR',principle='3',indicator='Essential',questionID='2')/principle3_essential_2", {
                            success : function(oData){
                                let aItems = [];
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].benefits}),
                                          new sap.m.Input({ value: oData.results[i].currentFYEmployees, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].currentFYWorkers, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].currentFYauthority, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].previousFYEmployees, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].previousFYWorkers, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].previousFYauthority, editable: "{hrEditModel>/edit/editable}"}),
                                        ]
                                      });
                                      if (oData.results[i].position === 0){
                                        aItems[0] = oItem;
                                      }
                                      else if(oData.results[i].position === 1){
                                        aItems[1] = oItem;
                                      }
                                      else if(oData.results[i].position === 2){
                                        aItems[2] = oItem;
                                      }
                                      else if(oData.results[i].position === 3){
                                        aItems[3] = oItem;
                                      }
                                    }
                                    for(let i=0;i<aItems.length;i++)
                                        RetireBenfTable.addItem(aItems[i]);
                            },
                            error : function(oError){
                                debugger;
                            }
                        });

                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2030',up__businessFunction='HR',principle='3',indicator='Essential',questionID='5')/principle3_essential_5", {
                            success : function(oData){
                                let aItems = [];
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].gender}),
                                          new sap.m.Input({ value: oData.results[i].permanentEmployeesReturnToWorkRate, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].permanentEmployeesRetentionRate, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].permanentWorkersReturnToWorkRate, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].permanentWorkersRetentionRate, editable: "{hrEditModel>/edit/editable}"}),
                                        ]
                                      });
                                      if (oData.results[i].position === 0){
                                        aItems[0] = oItem;
                                      }
                                      else if(oData.results[i].position === 1){
                                        aItems[1] = oItem;
                                      }
                                      else if(oData.results[i].position === 2){
                                        aItems[2] = oItem;
                                      }
                                    }
                                    for(let i=0;i<aItems.length;i++)
                                        RateofWorkAndLeaveTable.addItem(aItems[i]);
                            },
                            error : function(oError){
                                debugger;
                            }
                        });

                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2030',up__businessFunction='HR',principle='3',indicator='Essential',questionID='7')/principle3_essential_7", {
                            success : function(oData){
                                let aItems = [];
                                let aItems1 = [];
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].category}),
                                          new sap.m.Input({ value: oData.results[i].currentFYTotalEmployees, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].currentFYTotalEmployeesPartOfUnions, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].currentFYPercentage, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].previousFYTotalEmployees, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].previousFYTotalEmployeesPartOfUnions, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].previousFYPercentage, editable: "{hrEditModel>/edit/editable}"}),
                                        ]
                                      });
                                      if (oData.results[i].position === 0){
                                        aItems[0] = oItem;
                                      }
                                      else if(oData.results[i].position === 1){
                                        aItems[1] = oItem;
                                      }

                          else if (oData.results[i].position === 2){
                            aItems1[0] = oItem;
                          }
                          else if(oData.results[i].position === 3){
                            aItems1[1] = oItem;
                          }
                        
                        for(let i=0;i<aItems.length;i++)
                            MembershipWorTable.addItem(aItems[i]);
                        for(let i=0;i<aItems1.length;i++)
                            MembershipEmpTable.addItem(aItems1[i]);
                
                            }
		},
                            error : function(oError){
                                debugger;
                            }
                        });

                        
                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2030',up__businessFunction='HR',principle='3',indicator='Essential',questionID='8')/principle3_essential_8", {
                            success : function(oData){
                                let aItems = [];
                                let aItems1 = [];
                                for(let i=0;i<oData.results.length;i++){
                                    if(oData.results[i].type === "Employees"){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].category}),
                                          new sap.m.Input({ value: oData.results[i].currentFYTotal, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].currentFYNumberHealthSafetyMeasures, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].currentFYPercentageHealthSafetyMeasures, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].currentFYNumberSkillUpgradation, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].currentFYPercentageSkillUpgradation, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].previousFYTotal, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].previousFYNumberHealthSafetyMeasures, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].previousFYPercentageHealthSafetyMeasures, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].previousFYNumberSkillUpgradation, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].previousFYPercentageSkillUpgradation, editable: "{hrEditModel>/edit/editable}"}),
                                        ]
                                      });
                                      if (oData.results[i].position === 0){
                                        aItems[0] = oItem;
                                      }
                                      else if(oData.results[i].position === 1){
                                        aItems[1] = oItem;
                                      }
                                      else if(oData.results[i].position === 2){
                                        aItems[2] = oItem;
                                      }
                                      
                    }       else
                         if(oData.results[i].type === "Workers"){
                        let oItem = new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({ text: oData.results[i].category}),
                                new sap.m.Input({ value: oData.results[i].currentFYTotal, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].currentFYNumberHealthSafetyMeasures, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].currentFYPercentageHealthSafetyMeasures, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].currentFYNumberSkillUpgradation, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].currentFYPercentageSkillUpgradation, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].previousFYTotal, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].previousFYNumberHealthSafetyMeasures, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].previousFYPercentageHealthSafetyMeasures, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].previousFYNumberSkillUpgradation, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].previousFYPercentageSkillUpgradation, editable: "{hrEditModel>/edit/editable}"}),
                            ]
                          });
                          if (oData.results[i].position === 0){
                            aItems1[0] = oItem;
                          }
                          else if(oData.results[i].position === 1){
                            aItems1[1] = oItem;
                          }
                          else if(oData.results[i].position === 2){
                            aItems1[2] = oItem;
                          }
                         
        }
                    for(let i=0;i<aItems.length;i++)
                        PEmpTrainingTable.addItem(aItems[i]);
                    for(let i=0;i<aItems1.length;i++)
                        WorkTrainingTable.addItem(aItems1[i]);
                }
                            },
                            error : function(oError){
                                debugger;
                            }
                        });

                                
                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2030',up__businessFunction='HR',principle='3',indicator='Essential',questionID='9')/principle3_essential_9", {
                            success : function(oData){
                                let aItems = [];
                                let aItems1 = [];
                                for(let i=0;i<oData.results.length;i++){
                                    if(oData.results[i].type === "Employees"){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                            new sap.m.Text({ text: oData.results[i].category}),
                                            new sap.m.Input({ value: oData.results[i].currentFYTotal, editable: "{hrEditModel>/edit/editable}"}),
                                            new sap.m.Input({ value: oData.results[i].currentFYNumber, editable: "{hrEditModel>/edit/editable}"}),
                                            new sap.m.Input({ value: oData.results[i].currentFYPercentage, editable: "{hrEditModel>/edit/editable}"}),
                                            new sap.m.Input({ value: oData.results[i].previousFYTotal, editable: "{hrEditModel>/edit/editable}"}),
                                            new sap.m.Input({ value: oData.results[i].previousFYNumber, editable: "{hrEditModel>/edit/editable}"}),
                                            new sap.m.Input({ value: oData.results[i].previousFYPercentage, editable: "{hrEditModel>/edit/editable}"}),
                                        ]
                                      });
                                      if (oData.results[i].position === 0){
                                        aItems[0] = oItem;
                                      }
                                      else if(oData.results[i].position === 1){
                                        aItems[1] = oItem;
                                      }
                                      else if(oData.results[i].position === 2){
                                        aItems[2] = oItem;
                                      }
                                      
                    }       else
                         if(oData.results[i].type === "Workers"){
                        let oItem = new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({ text: oData.results[i].category}),
                                new sap.m.Input({ value: oData.results[i].currentFYTotal, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].currentFYNumber, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].currentFYPercentage, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].previousFYTotal, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].previousFYNumber, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].previousFYPercentage, editable: "{hrEditModel>/edit/editable}"}),
                            ]
                          });
                          if (oData.results[i].position === 0){
                            aItems1[0] = oItem;
                          }
                          else if(oData.results[i].position === 1){
                            aItems1[1] = oItem;
                          }
                          else if(oData.results[i].position === 2){
                            aItems1[2] = oItem;
                          }
                        }
                    }
                    for(let i=0;i<aItems.length;i++)
                        PerEmpTable.addItem(aItems[i]);
                    for(let i=0;i<aItems1.length;i++)
                        PerWorkTable.addItem(aItems1[i]);
                            },
                            error : function(oError){
                                debugger;
                            }
                        });

                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2030',up__businessFunction='HR',principle='5',indicator='Essential',questionID='1')/principle5_essential_1", {
                            success : function(oData){
                                let aItems = [];
                                let aItems1 = [];
                                for(let i=0;i<oData.results.length;i++){
                                    if(oData.results[i].type === "Employees"){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                            new sap.m.Text({ text: oData.results[i].category}),
                                            new sap.m.Input({ value: oData.results[i].currentFYTotal, editable: "{hrEditModel>/edit/editable}"}),
                                            new sap.m.Input({ value: oData.results[i].currentFYNumber, editable: "{hrEditModel>/edit/editable}"}),
                                            new sap.m.Input({ value: oData.results[i].currentFYPercentage, editable: "{hrEditModel>/edit/editable}"}),
                                            new sap.m.Input({ value: oData.results[i].previousFYTotal, editable: "{hrEditModel>/edit/editable}"}),
                                            new sap.m.Input({ value: oData.results[i].previousFYNumber, editable: "{hrEditModel>/edit/editable}"}),
                                            new sap.m.Input({ value: oData.results[i].previousFYPercentage, editable: "{hrEditModel>/edit/editable}"}),
                                        ]
                                      });
                                      if (oData.results[i].position === 0){
                                        aItems[0] = oItem;
                                      }
                                      else if(oData.results[i].position === 1){
                                        aItems[1] = oItem;
                                      }
                                      else if(oData.results[i].position === 2){
                                        aItems[2] = oItem;
                                      }
                                     
                    }       else
                         if(oData.results[i].type === "Workers"){
                        let oItem = new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({ text: oData.results[i].category}),
                                new sap.m.Input({ value: oData.results[i].currentFYTotal, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].currentFYNumber, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].currentFYPercentage, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].previousFYTotal, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].previousFYNumber, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].previousFYPercentage, editable: "{hrEditModel>/edit/editable}"}),
                            ]
                          });

                          if (oData.results[i].position === 0){
                            aItems1[0] = oItem;
                          }
                          else if(oData.results[i].position === 1){
                            aItems1[1] = oItem;
                          }
                          else if(oData.results[i].position === 2){
                            aItems1[2] = oItem;
                          }
                        }
                    }
                    for(let i=0;i<aItems.length;i++)
                        EmpHumanRightTable.addItem(aItems[i]);
                    for(let i=0;i<aItems1.length;i++)
                        WorkHumanRightTable.addItem(aItems1[i]);
                            },
                            error : function(oError){
                                debugger;
                            }
                        });

                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2030',up__businessFunction='HR',principle='5',indicator='Essential',questionID='2')/principle5_essential_2", {
                            success : function(oData){
                                let aItems = [];
                                let aItems1 = [];
                                for(let i=0;i<oData.results.length;i++){
                                    if(oData.results[i].type === "Employees"){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                            new sap.m.Text({ text: oData.results[i].subType + " " + oData.results[i].category}),
                                            new sap.m.Input({ value: oData.results[i].currentFYTotal, editable: "{hrEditModel>/edit/editable}"}),
                                            new sap.m.Input({ value: oData.results[i].currentFYNumberEqualToMinimumWage, editable: "{hrEditModel>/edit/editable}"}),
                                            new sap.m.Input({ value: oData.results[i].currentFYPercentageEqualToMinimumWage, editable: "{hrEditModel>/edit/editable}"}),
                                            new sap.m.Input({ value: oData.results[i].currentFYNumberMoreThanMinimumWage, editable: "{hrEditModel>/edit/editable}"}),
                                            new sap.m.Input({ value: oData.results[i].currentFYPercentageMoreThanMinimumWage, editable: "{hrEditModel>/edit/editable}"}),
                                            new sap.m.Input({ value: oData.results[i].previousFYTotal, editable: "{hrEditModel>/edit/editable}"}),
                                            new sap.m.Input({ value: oData.results[i].previousFYNumberEqualToMinimumWage, editable: "{hrEditModel>/edit/editable}"}),
                                            new sap.m.Input({ value: oData.results[i].previousFYPercentageEqualToMinimumWage, editable: "{hrEditModel>/edit/editable}"}),
                                            new sap.m.Input({ value: oData.results[i].previousFYNumberMoreThanMinimumWage, editable: "{hrEditModel>/edit/editable}"}),
                                            new sap.m.Input({ value: oData.results[i].previousFYPercentageMoreThanMinimumWage, editable: "{hrEditModel>/edit/editable}"}),
                                        ]
                                      });
                                      if (oData.results[i].position === 0){
                                        aItems[0] = oItem;
                                      }
                                      else if(oData.results[i].position === 1){
                                        aItems[1] = oItem;
                                      }
                                      else if(oData.results[i].position === 2){
                                        aItems[2] = oItem;
                                      }
                                      else if(oData.results[i].position === 3){
                                        aItems[3] = oItem;
                                      }
                                     
                    }       else
                         if(oData.results[i].type === "Workers"){
                        let oItem = new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({ text: oData.results[i].subType + " " + oData.results[i].category }),
                                new sap.m.Input({ value: oData.results[i].currentFYTotal, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].currentFYNumberEqualToMinimumWage, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].currentFYPercentageEqualToMinimumWage, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].currentFYNumberMoreThanMinimumWage, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].currentFYPercentageMoreThanMinimumWage, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].previousFYTotal, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].previousFYNumberEqualToMinimumWage, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].previousFYPercentageEqualToMinimumWage, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].previousFYNumberMoreThanMinimumWage, editable: "{hrEditModel>/edit/editable}"}),
                                new sap.m.Input({ value: oData.results[i].previousFYPercentageMoreThanMinimumWage, editable: "{hrEditModel>/edit/editable}"}),
                            ]
                          });
                          if (oData.results[i].position === 0){
                            aItems1[0] = oItem;
                          }
                          else if(oData.results[i].position === 1){
                            aItems1[1] = oItem;
                          }
                          else if(oData.results[i].position === 2){
                            aItems1[2] = oItem;
                          }
                          else if(oData.results[i].position === 3){
                            aItems1[3] = oItem;
                          }
                          
                        }
                    }
                    for(let i=0;i<aItems.length;i++)
                        PEmpWageTable.addItem(aItems[i]);
                    for(let i=0;i<aItems.length;i++)
                        WorkWageTable.addItem(aItems1[i]);
                            },
                            error : function(oError){
                                debugger;
                            }
                        });

                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2030',up__businessFunction='HR',principle='5',indicator='Essential',questionID='3')/principle5_essential_3", {
                            success : function(oData){
                                let aItems = [];
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].type}),
                                          new sap.m.Input({ value: oData.results[i].maleNumber, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].maleMedianRemuneration, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].femaleNumber, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].femaleMedianRemuneration, editable: "{hrEditModel>/edit/editable}"}),
                                        ]
                                      });
                                      if (oData.results[i].position === 0){
                                        aItems[0] = oItem;
                                      }
                                      else if(oData.results[i].position === 1){
                                        aItems[1] = oItem;
                                      }
                                      else if (oData.results[i].position === 2){
                                        aItems[2] = oItem;
                                      }
                                      else if(oData.results[i].position === 3){
                                        aItems[3] = oItem;
                                      }
                                    }
                                    for(let i=0;i<aItems.length;i++)
                                         WageTable.addItem(aItems[i]);
                            },
                            error : function(oError){
                                debugger;
                            }
                        });

                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2030',up__businessFunction='HR',principle='5',indicator='Essential',questionID='6')/principle5_essential_6", {
                            success : function(oData){
                                let aItems = [];
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].type}),
                                          new sap.m.Input({ value: oData.results[i].currentFYComplaintsFiled, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].currentFYComplaintsPending, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].currentFYComplaintsRemarks, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].previousFYComplaintsFiled, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].previousFYComplaintsPending, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].previousFYComplaintsRemarks, editable: "{hrEditModel>/edit/editable}"}),
                                        ]
                                      });
                                      if (oData.results[i].position === 0){
                                        aItems[0] = oItem;
                                      }
                                      else if(oData.results[i].position === 1){
                                        aItems[1] = oItem;
                                      }
                                      else if (oData.results[i].position === 2){
                                        aItems[2] = oItem;
                                      }
                                      else if(oData.results[i].position === 3){
                                        aItems[3] = oItem;
                                      }
                                      else if (oData.results[i].position === 4){
                                        aItems[4] = oItem;
                                      }
                                      else if(oData.results[i].position === 5){
                                        aItems[5] = oItem;
                                      }

                                    }
                                    for(let i=0;i<aItems.length;i++)
                                        ComplaintTable.addItem(aItems[i]);
                            },
                            error : function(oError){
                                debugger;
                            }
                        });

                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2030',up__businessFunction='HR',principle='5',indicator='Essential',questionID='10')/principle5_essential_10", {
                            success : function(oData){
                                let aItems = [];
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].type}),
                                          new sap.m.Input({ value: oData.results[i].percentage, editable: "{hrEditModel>/edit/editable}"}),
                                        ]
                                      });
                                      if (oData.results[i].position === 0){
                                        aItems[0] = oItem;
                                      }
                                      else if(oData.results[i].position === 1){
                                        aItems[1] = oItem;
                                      }
                                      else if (oData.results[i].position === 2){
                                        aItems[2] = oItem;
                                      }
                                      else if(oData.results[i].position === 3){
                                        aItems[3] = oItem;
                                      }
                                      else if (oData.results[i].position === 4){
                                        aItems[4] = oItem;
                                      }
                                      else if(oData.results[i].position === 5){
                                        aItems[5] = oItem;
                                      }
                                      
                                    }
                                    for(let i=0;i<aItems.length;i++)
                                        AssessmentsTable.addItem(aItems[i]);
                                },
                            error : function(oError){
                                debugger;
                            }
                        });

                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2030',up__businessFunction='HR',principle='3',indicator='Essential',questionID='1c')/principle3_essential_1c", {
                            success : function(oData){
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].type}),
                                          new sap.m.Input({ value: oData.results[i].valueForCurrentFinancialYear, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].valueForPreviousFinancialYear, editable: "{hrEditModel>/edit/editable}"}),
                                        ]
                                      });
                                      
                                      SpendTable.addItem(oItem);
                                    }
                                },
                            error : function(oError){
                                debugger;
                            }
                        });

                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2030',up__businessFunction='HR',principle='5',indicator='Essential',questionID='3b')/principle5_essential_3b", {
                            success : function(oData){
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].type}),
                                          new sap.m.Input({ value: oData.results[i].valueForCurrentFinancialYear, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].valueForPreviousFinancialYear, editable: "{hrEditModel>/edit/editable}"}),
                                        ]
                                      });
                                      
                                      GrossWageTable.addItem(oItem);
                                    }
                                },
                            error : function(oError){
                                debugger;
                            }
                        });

                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2030',up__businessFunction='HR',principle='5',indicator='Essential',questionID='7')/principle5_essential_7", {
                            success : function(oData){
                                let aItems = [];
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].type}),
                                          new sap.m.Input({ value: oData.results[i].valueForCurrentFinancialYear, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].valueForPreviousFinancialYear, editable: "{hrEditModel>/edit/editable}"}),
                                        ]
                                      });
                                      if (oData.results[i].position === 0){
                                        aItems[0] = oItem;
                                      }
                                      else if(oData.results[i].position === 1){
                                        aItems[1] = oItem;
                                      }
                                      else if (oData.results[i].position === 2){
                                        aItems[2] = oItem;
                                      }
                                      
                                    }
                                    for(let i=0;i<aItems.length;i++)
                                        CompFiledTable.addItem(aItems[i]);
                                },
                            error : function(oError){
                                debugger;
                            }
                        });

                        
                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2030',up__businessFunction='HR',principle='8',indicator='Essential',questionID='5')/principle8_essential_5", {
                            success : function(oData){
                                let aItems = [];
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].location}),
                                          new sap.m.Input({ value: oData.results[i].valueForCurrentFinancialYear, editable: "{hrEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].valueForPreviousFinancialYear, editable: "{hrEditModel>/edit/editable}"}),
                                        ]
                                      });
                                      if (oData.results[i].position === 0){
                                        aItems[0] = oItem;
                                      }
                                      else if(oData.results[i].position === 1){
                                        aItems[1] = oItem;
                                      }
                                      else if (oData.results[i].position === 2){
                                        aItems[2] = oItem;
                                      }
                                      else if (oData.results[i].position === 3){
                                        aItems[3] = oItem;
                                      }
                                      
                                    }
                                    for(let i=0;i<aItems.length;i++)
                                        JobCreationTable.addItem(aItems[i]);
                                        that.getView().setBusy(false);
                                },
                            error : function(oError){
                                debugger;
                            }
                        });
                     }else if(sKey === "08"){
                        var inputMaterialTable = this.getView().byId("idInputMaterialTable");
                        inputMaterialTable.setVisible(true);
                        inputMaterialTable.removeAllItems();
                        var detailsConcentrationTable = this.getView().byId("idDetailsConcentrationTable");
                        detailsConcentrationTable.setVisible(true);
                        detailsConcentrationTable.removeAllItems();
                        var TableSegment  = this.getView().byId("idTableSegment");
                        TableSegment.setVisible(false);
                        var PEmpTable = this.getView().byId("idPEmpTable");
                        PEmpTable.setVisible(false);
                        var NPEmpTable = this.getView().byId("idNPEmpTable");
                        NPEmpTable.setVisible(false);
                        var WorkerTable = this.getView().byId("idWorkerTable");
                        WorkerTable.setVisible(false);
                        var NonWorkerTable  = this.getView().byId("idNonWorkerTable");
                        NonWorkerTable.setVisible(false);
                        var RetireBenfTable = this.getView().byId("idRetireBenfTable");
                        RetireBenfTable.setVisible(false);
                        var MembershipEmpTable = this.getView().byId("idMembershipEmpTable");
                        MembershipEmpTable.setVisible(false);
                        var MembershipWorTable = this.getView().byId("idMembershipWorTable");
                        MembershipWorTable.setVisible(false);
                        var RateofWorkAndLeaveTable = this.getView().byId("idRateofWorkAndLeaveTable");
                        RateofWorkAndLeaveTable.setVisible(false);
                        var PEmpTrainingTable  = this.getView().byId("idPEmpTrainingTable");
                        PEmpTrainingTable.setVisible(false);
                        var WorkTrainingTable = this.getView().byId("idWorkTrainingTable");
                        WorkTrainingTable.setVisible(false);
                        var PerEmpTable  = this.getView().byId("idPerEmpTable");
                        PerEmpTable.setVisible(false);
                        var PerWorkTable = this.getView().byId("idPerWorkTable");
                        PerWorkTable.setVisible(false);
                        var EmpHumanRightTable = this.getView().byId("idEmpHumanRightTable");
                        EmpHumanRightTable.setVisible(false);
                        var WorkHumanRightTable = this.getView().byId("idWorkHumanRightTable");
                        WorkHumanRightTable.setVisible(false);
                        var PEmpWageTable = this.getView().byId("idPEmpWageTable");
                        PEmpWageTable.setVisible(false);
                        var WorkWageTable = this.getView().byId("idWorkWageTable");
                        WorkWageTable.setVisible(false);
                        var WageTable = this.getView().byId("idWageTable");
                        WageTable.setVisible(false);
                        var ComplaintTable = this.getView().byId("idComplaintTable");
                        ComplaintTable.setVisible(false);
                        var AssessmentsTable = this.getView().byId("idAssessmentsTable");
                        AssessmentsTable.setVisible(false);
                        var SpendTable = this.getView().byId("idSpendTable");
                        SpendTable.setVisible(false);
                        var GrossWageTable = this.getView().byId("idGrossWageTable");
                        GrossWageTable.setVisible(false);
                        var CompFiledTable = this.getView().byId("idCompFiledTable");
                        CompFiledTable.setVisible(false);
                        var JobCreationTable = this.getView().byId("idJobCreationTable");
                        JobCreationTable.setVisible(false);
                        var monetary  = this.getView().byId("idMonetaryTable");
                        monetary.setVisible(false);
                        var nonMonetary = this.getView().byId("idNonMonetaryTable");
                        nonMonetary.setVisible(false);
                        var oTable = this.getView().byId("idTable");
                        oTable.setVisible(false);
                        var oTable1 = this.getView().byId("idTable1");
                        oTable1.setVisible(false);
                        var idQuestionsTable = this.getView().byId("idQuestionsTable");
                        idQuestionsTable.setVisible(false);


                        var that = this;
                        that.getView().setBusy(true);
                        this.oDataModel.read("/qualitative_data_Procurement(up__fiscalYear='2030',up__businessFunction='Procurement',principle='8',indicator='Essential',questionID='4')/principle8_essential_4", {
                            success : function(oData){
                                let aItems = [];
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].sourceOfInputMaterial}),
                                          new sap.m.Input({ value: oData.results[i].valueForCurrentFinancialYear, editable: "{procurementEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].valueForPreviousFinancialYear, editable: "{procurementEditModel>/edit/editable}"}),
                                        ]
                                      });
                                      if (oData.results[i].position === 0){
                                        aItems[0] = oItem;
                                      }
                                      else if(oData.results[i].position === 1){
                                        aItems[1] = oItem;
                                      }  
                                    }
                                    for(let i=0;i<aItems.length;i++)
                                        inputMaterialTable.addItem(aItems[i]);

                                },
                            error : function(oError){
                                that.getView().setBusy(false);
                                debugger;
                            }
                        });


                        this.oDataModel.read("/qualitative_data_Procurement(up__fiscalYear='2030',up__businessFunction='Procurement',principle='1',indicator='Essential',questionID='9')/principle1_essential_9", {
                            success : function(oData){
                                let aItems = [];
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].parameter}),
                                          new sap.m.Text({ text: oData.results[i].metrics}),
                                          new sap.m.Input({ value: oData.results[i].valueForCurrentFinancialYear, editable: "{procurementEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].valueForPreviousFinancialYear, editable: "{procurementEditModel>/edit/editable}"}),
                                        ]
                                      });
                                      if (oData.results[i].position === 0){
                                        aItems[0] = oItem;
                                      }
                                      else if(oData.results[i].position === 1 ){
                                        aItems[1] = oItem;
                                      }  
                                      else if(oData.results[i].position === 2){
                                        aItems[2] = oItem;
                                      }
                                      else if(oData.results[i].position === 3){
                                        aItems[3] = oItem;
                                      }  
                                      else if(oData.results[i].position === 4){
                                        aItems[4] = oItem;
                                      }
                                      else if(oData.results[i].position === 5){
                                        aItems[5] = oItem;
                                      }  
                                      else if(oData.results[i].position === 6){
                                        aItems[6] = oItem;
                                      }
                                      else if(oData.results[i].position === 7){
                                        aItems[7] = oItem;
                                      }  
                                      else if(oData.results[i].position === 8){
                                        aItems[8] = oItem;
                                      }
                                      else if(oData.results[i].position === 9){
                                        aItems[9] = oItem;
                                      }  
                                    }
                                    for(let i=0;i<aItems.length;i++)
                                    detailsConcentrationTable.addItem(aItems[i]);
                                    that.getView().setBusy(false);

                                },
                            error : function(oError){
                                that.getView().setBusy(false);
                                debugger;
                            }
                        });

                     } else if(sKey === "03"){
							var rDTable = this.getView().byId("idRDTable");
							rDTable.setVisible(true);
							rDTable.removeAllItems();
							var turnoverTable= this.getView().byId("idTurnoverTable");
							turnoverTable.setVisible(true);
							turnoverTable.removeAllItems();
							var accountTable = this.getView().byId("idAccountTable");
							accountTable.setVisible(true);
							accountTable.removeAllItems();
	   						var inputMaterialTable = this.getView().byId("idInputMaterialTable");
	                        inputMaterialTable.setVisible(false);
	                        var detailsConcentrationTable = this.getView().byId("idDetailsConcentrationTable");
	                        detailsConcentrationTable.setVisible(false);
	                        var TableSegment  = this.getView().byId("idTableSegment");
	                        TableSegment.setVisible(false);
	                        var PEmpTable = this.getView().byId("idPEmpTable");
	                        PEmpTable.setVisible(false);
	                        var NPEmpTable = this.getView().byId("idNPEmpTable");
	                        NPEmpTable.setVisible(false);
	                        var WorkerTable = this.getView().byId("idWorkerTable");
	                        WorkerTable.setVisible(false);
	                        var NonWorkerTable  = this.getView().byId("idNonWorkerTable");
	                        NonWorkerTable.setVisible(false);
	                        var RetireBenfTable = this.getView().byId("idRetireBenfTable");
	                        RetireBenfTable.setVisible(false);
	                        var MembershipEmpTable = this.getView().byId("idMembershipEmpTable");
	                        MembershipEmpTable.setVisible(false);
	                        var MembershipWorTable = this.getView().byId("idMembershipWorTable");
	                        MembershipWorTable.setVisible(false);
	                        var RateofWorkAndLeaveTable = this.getView().byId("idRateofWorkAndLeaveTable");
	                        RateofWorkAndLeaveTable.setVisible(false);
	                        var PEmpTrainingTable  = this.getView().byId("idPEmpTrainingTable");
	                        PEmpTrainingTable.setVisible(false);
	                        var WorkTrainingTable = this.getView().byId("idWorkTrainingTable");
	                        WorkTrainingTable.setVisible(false);
	                        var PerEmpTable  = this.getView().byId("idPerEmpTable");
	                        PerEmpTable.setVisible(false);
	                        var PerWorkTable = this.getView().byId("idPerWorkTable");
	                        PerWorkTable.setVisible(false);
	                        var EmpHumanRightTable = this.getView().byId("idEmpHumanRightTable");
	                        EmpHumanRightTable.setVisible(false);
	                        var WorkHumanRightTable = this.getView().byId("idWorkHumanRightTable");
	                        WorkHumanRightTable.setVisible(false);
	                        var PEmpWageTable = this.getView().byId("idPEmpWageTable");
	                        PEmpWageTable.setVisible(false);
	                        var WorkWageTable = this.getView().byId("idWorkWageTable");
	                        WorkWageTable.setVisible(false);
	                        var WageTable = this.getView().byId("idWageTable");
	                        WageTable.setVisible(false);
	                        var ComplaintTable = this.getView().byId("idComplaintTable");
	                        ComplaintTable.setVisible(false);
	                        var AssessmentsTable = this.getView().byId("idAssessmentsTable");
	                        AssessmentsTable.setVisible(false);
	                        var SpendTable = this.getView().byId("idSpendTable");
	                        SpendTable.setVisible(false);
	                        var GrossWageTable = this.getView().byId("idGrossWageTable");
	                        GrossWageTable.setVisible(false);
	                        var CompFiledTable = this.getView().byId("idCompFiledTable");
	                        CompFiledTable.setVisible(false);
	                        var JobCreationTable = this.getView().byId("idJobCreationTable");
	                        JobCreationTable.setVisible(false);
	                        var monetary  = this.getView().byId("idMonetaryTable");
	                        monetary.setVisible(false);
	                        var nonMonetary = this.getView().byId("idNonMonetaryTable");
	                        nonMonetary.setVisible(false);
	                        var oTable = this.getView().byId("idTable");
	                        oTable.setVisible(false);
	                        var oTable1 = this.getView().byId("idTable1");
	                        oTable1.setVisible(false);
	                        var idQuestionsTable = this.getView().byId("idQuestionsTable");
	                        idQuestionsTable.setVisible(false);

	 					var that = this;
                        that.getView().setBusy(true);
                        this.oDataModel.read("/qualitative_data_Finance(up__fiscalYear='2030',up__businessFunction='Finance',principle='2',indicator='Essential',questionID='1')/principle2_essential_1", {
                            success : function(oData){
                                let aItems = [];
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].typeOfInvestment}),
                                          new sap.m.Input({ value: oData.results[i].valueForCurrentFinancialYear, editable: "{financeEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].valueForPreviousFinancialYear, editable: "{financeEditModel>/edit/editable}"}),
 										  new sap.m.Input({ value: oData.results[i].detailsOfImprovements, editable: "{financeEditModel>/edit/editable}"}),
                                        ]
                                      });
                                      if (oData.results[i].position === 0){
                                        aItems[0] = oItem;
                                      }
                                      else if(oData.results[i].position === 1){
                                        aItems[1] = oItem;
                                      }  
                                    }
                                    for(let i=0;i<aItems.length;i++)
										rDTable.addItem(aItems[i]);

                                },
                            error : function(oError){
                                that.getView().setBusy(false);
                                debugger;
                            }
                        });

                        this.oDataModel.read("/qualitative_data_Finance(up__fiscalYear='2030',up__businessFunction='Finance',principle='9',indicator='Essential',questionID='2')/principle9_essential_2", {
                            success : function(oData){
                                let aItems = [];
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].nameOfProductOrService}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfTotalTurnOver, editable: "{financeEditModel>/edit/editable}"}),
                                        ]
                                      });
                                      if (oData.results[i].position === 0){
                                        aItems[0] = oItem;
                                      }
                                      else if(oData.results[i].position === 1){
                                        aItems[1] = oItem;
                                      } 
 									  else if(oData.results[i].position === 2){
	                                        aItems[2] = oItem;
	                                      } 
                                    }
                                    for(let i=0;i<aItems.length;i++)
                                        turnoverTable.addItem(aItems[i]);

                                },
                            error : function(oError){
                                that.getView().setBusy(false);
                                debugger;
                            }
                        });

                        this.oDataModel.read("/qualitative_data_Finance(up__fiscalYear='2030',up__businessFunction='Finance',principle='1',indicator='Essential',questionID='8')/principle1_essential_8", {
                            success : function(oData){
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].type}),
                                          new sap.m.Input({ value: oData.results[i].valueForCurrentFinancialYear, editable: "{financeEditModel>/edit/editable}"}),
                                          new sap.m.Input({ value: oData.results[i].valueForPreviousFinancialYear, editable: "{financeEditModel>/edit/editable}"}),
                                        ]
                                      });
									accountTable.addItem(oItem);
									that.getView().setBusy(false);
							}

                                },
                            error : function(oError){
                                that.getView().setBusy(false);
                                debugger;
                            }
                        });


					}
        },
        onCancel : function(){
            this.getView().byId("idEdit").setVisible(true);
            this.getView().byId("idSubmitQuantitative").setVisible(false);
            this.getView().byId("idCancel").setVisible(false);
            this.getView().getModel("editModel").setData({edit:false});
            this.getView().getModel("hrEditModel").setData({edit:false});
            this.getView().getModel("procurementEditModel").setData({edit:false});
 			this.getView().getModel("financeEditModel").setData({edit:false});
        },
        onEdit : function(){
            this.getView().byId("idEdit").setVisible(false);
            this.getView().byId("idSubmitQuantitative").setVisible(true);
            this.getView().byId("idCancel").setVisible(true);
            let sKey = this.getView().byId("id_BF").getProperty("selectedKey");
            if(sKey === "07"){
                this.getView().getModel("editModel").setData({edit:true});
            }
            else if(sKey === "04"){
                this.getView().getModel("hrEditModel").setData({edit:true});
            }
            else if(sKey === "08"){
                this.getView().getModel("procurementEditModel").setData({edit:true});
            }
 			else if(sKey === "03"){
	                this.getView().getModel("financeEditModel").setData({edit:true});
	            }

        },
        OnSubmit : function() {
            
            this.getView().byId("idEdit").setVisible(true);
            this.getView().byId("idSubmitQuantitative").setVisible(false);
            this.getView().byId("idCancel").setVisible(false);
            let sKey = this.getView().byId("id_BF").getProperty("selectedKey");
            if (sKey === "07")
                { 
                    this.getView().getModel("editModel").setData({edit:false});
                    var monetary  = this.getView().byId("idMonetaryTable");
                    var nonMonetary = this.getView().byId("idNonMonetaryTable");
                    var oTable = this.getView().byId("idTable");
                    var oTable1 = this.getView().byId("idTable1");
                    var omonetaryItems = monetary.getItems();
                    var ononMonetaryItems = nonMonetary.getItems();
                    var oTableItems = oTable.getItems();
                    var oTable1Items = oTable1.getItems();
                    var idQuestionsTable = this.getView().byId("idQuestionsTable").getItems();

                   var oPayload = {
                
                    "status": "Submitted",
                
                    "creator_email": "renuka.dimber@bristlecone.com",
                
                    "creator_name": "Renuka Dimber",
                
                    "Legal_Compliance": [
                
                        {
                
                            "principle": "1",
                
                            "indicator": "Essential",
                
                            "questionID": "2",
                
                            "principle1_essential_2": [
                
                                {

									"position" : 0,
                
                                    "type": "Monetary",
                
                                    "typeOfPaidAmount": "Penalty/ Fine",
                
                                    "ngrbcPrinciple": omonetaryItems[0].getAggregation("cells")[1].getProperty("value"),
                
                                    "nameOfInstitutions": omonetaryItems[0].getAggregation("cells")[2].getProperty("value"),
                
                                    "amountInINR": omonetaryItems[0].getAggregation("cells")[3].getProperty("value"),
                
                                    "briefOfTheCase": omonetaryItems[0].getAggregation("cells")[4].getProperty("value"),
                
                                    "hasAnAppealBeen": omonetaryItems[0].getAggregation("cells")[5].getProperty("value")
                
                                },
                
                                {
                
									"position" : 1,

                                    "type": "Monetary",
                
                                    "typeOfPaidAmount": "Settlement",
                
                                    "ngrbcPrinciple": omonetaryItems[1].getAggregation("cells")[1].getProperty("value"),
                
                                    "nameOfInstitutions": omonetaryItems[1].getAggregation("cells")[2].getProperty("value"),
                
                                    "amountInINR": omonetaryItems[1].getAggregation("cells")[3].getProperty("value"),
                
                                    "briefOfTheCase": omonetaryItems[1].getAggregation("cells")[4].getProperty("value"),
                
                                    "hasAnAppealBeen": omonetaryItems[1].getAggregation("cells")[5].getProperty("value")
                
                                },
                
                                {
                
									"position" : 2,

                                    "type": "Monetary",
                
                                    "typeOfPaidAmount": "Compounding fee",
                
                                    "ngrbcPrinciple": omonetaryItems[2].getAggregation("cells")[1].getProperty("value"),
                
                                    "nameOfInstitutions": omonetaryItems[2].getAggregation("cells")[2].getProperty("value"),
                
                                    "amountInINR": omonetaryItems[2].getAggregation("cells")[3].getProperty("value"),
                
                                    "briefOfTheCase": omonetaryItems[2].getAggregation("cells")[4].getProperty("value"),
                
                                    "hasAnAppealBeen": omonetaryItems[2].getAggregation("cells")[5].getProperty("value")
                
                                },
                
                                {

									"position" : 0,
                
                                    "type": "Non-Monetary",
                
                                    "typeOfPaidAmount": "Imprisonment",
                
                                    "ngrbcPrinciple": ononMonetaryItems[0].getAggregation("cells")[1].getProperty("value"),
                
                                    "nameOfInstitutions": ononMonetaryItems[0].getAggregation("cells")[2].getProperty("value"),
                
                                    "amountInINR": ononMonetaryItems[0].getAggregation("cells")[3].getProperty("value"),
                
                                    "briefOfTheCase": ononMonetaryItems[0].getAggregation("cells")[4].getProperty("value"),
                
                                    "hasAnAppealBeen": ononMonetaryItems[0].getAggregation("cells")[5].getProperty("value")
                
                                },
                
                                {
                
									"position" : 1,

                                    "type": "Non-Monetary",
                
                                    "typeOfPaidAmount": "Punishment",
                
                                    "ngrbcPrinciple": ononMonetaryItems[1].getAggregation("cells")[1].getProperty("value"),
                
                                    "nameOfInstitutions": ononMonetaryItems[1].getAggregation("cells")[2].getProperty("value"),
                
                                    "amountInINR": ononMonetaryItems[1].getAggregation("cells")[3].getProperty("value"),
                
                                    "briefOfTheCase": ononMonetaryItems[1].getAggregation("cells")[4].getProperty("value"),
                
                                    "hasAnAppealBeen": ononMonetaryItems[1].getAggregation("cells")[5].getProperty("value")
                
                                }
                
                            ]
                
                        },
                
                        {
                
                            "principle": "1",
                
                            "indicator": "Essential",
                
                            "questionID": "5",
                
                            "principle1_essential_5": [
                
                                {
                
									"position" : 0,

                                    "typeOfWorkers": "Directors",
                
                                    "valueForCurrentFinancialYear": oTableItems[0].getAggregation("cells")[1].getProperty("value"),
                
                                    "valueForPreviousFinancialYear": oTableItems[0].getAggregation("cells")[2].getProperty("value")
                
                                },
                
                                {

									"position" : 1,
                
                                    "typeOfWorkers": "KMPs",
                
                                    "valueForCurrentFinancialYear": oTableItems[1].getAggregation("cells")[1].getProperty("value"),
                
                                    "valueForPreviousFinancialYear": oTableItems[1].getAggregation("cells")[2].getProperty("value")
                
                                },
                
                                {

									"position" : 2,
                
                                    "typeOfWorkers": "Employees",
                
                                    "valueForCurrentFinancialYear": oTableItems[2].getAggregation("cells")[1].getProperty("value"),
                
                                    "valueForPreviousFinancialYear": oTableItems[2].getAggregation("cells")[2].getProperty("value")
                
                                },
                
                                {

									"position" : 3,	
                
                                    "typeOfWorkers": "Workers",
                
                                    "valueForCurrentFinancialYear": oTableItems[3].getAggregation("cells")[1].getProperty("value"),
                
                                    "valueForPreviousFinancialYear": oTableItems[3].getAggregation("cells")[2].getProperty("value")
                
                                }
                
                            ]
                
                        },
                
                        {
                
                            "principle": "1",
                
                            "indicator": "Essential",
                
                            "questionID": "6",
                
                            "principle1_essential_6": [
                
                                {
                
									"position" : 0,

                                    "detailsOfComplaints": "Number of complaints received in relation to issues of Conflict of Interest of the Directors",
                
                                    "numberForCurrentFinancialYear": oTable1Items[0].getAggregation("cells")[1].getProperty("value"),
                
                                    "remarksForCurrentFinancialYear": oTable1Items[0].getAggregation("cells")[2].getProperty("value"),
                
                                    "numberForPreviousFinancialYear": oTable1Items[0].getAggregation("cells")[3].getProperty("value"),
                
                                    "remarksForPreviousFinancialYear": oTable1Items[0].getAggregation("cells")[4].getProperty("value")
                
                                },
                
                                {

									"position" : 1,
                
                                    "detailsOfComplaints": "Number of complaints received in relation to issues of Conflict of Interest of the KMPs",
                
                                    "numberForCurrentFinancialYear": oTable1Items[1].getAggregation("cells")[1].getProperty("value"),
                
                                    "remarksForCurrentFinancialYear": oTable1Items[1].getAggregation("cells")[2].getProperty("value"),
                
                                    "numberForPreviousFinancialYear": oTable1Items[1].getAggregation("cells")[3].getProperty("value"),
                
                                    "remarksForPreviousFinancialYear": oTable1Items[1].getAggregation("cells")[4].getProperty("value")
                
                                }
                
                            ]
                
                        },
                        { 

                                        "principle": "9", 
                            
                                        "indicator": "Essential", 
                            
                                        "questionID": "7a", 
                            
                                        "answer":idQuestionsTable[0].getAggregation("cells")[1].getProperty("value")
                            
                                    }, 
                            
                                    { 
                            
                                        "principle": "9", 
                            
                                        "indicator": "Essential", 
                            
                                        "questionID": "7b", 
                            
                                        "answer": idQuestionsTable[1].getAggregation("cells")[1].getProperty("value") 
                            
                                    }, 
                            
                                    { 
                            
                                        "principle": "9", 
                            
                                        "indicator": "Essential", 
                            
                                        "questionID": "7c", 
                            
                                        "answer": idQuestionsTable[2].getAggregation("cells")[1].getProperty("value")
                            
                                    } 
                
                    ]
                
                };
                var that = this;
               this.oDataModel.update("/qualitative_data(fiscalYear='2024',businessFunction='Legal_Compliance')", oPayload, {
                
                success : function(oData){
                        MessageBox.show("Data Saved Successfully");
                        
                },

                error : function(oError){
                    MessageBox.show(oError);
                }
            
            
            
            });

                        var workObj = {

                            "definitionId": "eu10.sap-process-automation-q40kapza.zbrsrlegalcompliance.zapproval_process_for_legal_compliance",
                        
                            "context": {
                        
                                "zbusiness_function": "Legal_Compliance",
                        
                                "zfiscal_year": "2024",
                        
                                "zlegal_compliance_creator_email": "shriyansh.k@bristlecone.com",
                        
                                "zlegal_compliance_creator_name": "Shriyansh Keserwani",
                        
                                "zlegal_compliance_principle1_essential_2": [
                        
                                    {
                        
                                        "type": "Monetary",
                        
                                        "typeOfPaidAmount": "Penalty/Fine",
                        
                                        "ngrbcPrinciple": omonetaryItems[0].getAggregation("cells")[1].getProperty("value"),
                        
                                        "nameOfInstitutions": omonetaryItems[0].getAggregation("cells")[2].getProperty("value"),
                        
                                        "amountInINR": omonetaryItems[0].getAggregation("cells")[3].getProperty("value"),
                        
                                        "briefOfTheCase": omonetaryItems[0].getAggregation("cells")[4].getProperty("value"),
                        
                                        "hasAnAppealBeen": omonetaryItems[0].getAggregation("cells")[5].getProperty("value")
                        
                                    },
                        
                                    {
                        
                                        "type": "Monetary",
                        
                                        "typeOfPaidAmount": "Settlement",
                        
                                        "ngrbcPrinciple": omonetaryItems[1].getAggregation("cells")[1].getProperty("value"),
                        
                                        "nameOfInstitutions": omonetaryItems[1].getAggregation("cells")[2].getProperty("value"),
                        
                                        "amountInINR": omonetaryItems[1].getAggregation("cells")[3].getProperty("value"),
                        
                                        "briefOfTheCase": omonetaryItems[1].getAggregation("cells")[4].getProperty("value"),
                        
                                        "hasAnAppealBeen": omonetaryItems[1].getAggregation("cells")[5].getProperty("value")
                        
                                    },
                        
                                    {
                        
                                        "type": "Monetary",
                        
                                        "typeOfPaidAmount": "Compounding fee",
                        
                                        "ngrbcPrinciple": omonetaryItems[2].getAggregation("cells")[1].getProperty("value"),
                        
                                        "nameOfInstitutions": omonetaryItems[2].getAggregation("cells")[2].getProperty("value"),
                        
                                        "amountInINR": omonetaryItems[2].getAggregation("cells")[3].getProperty("value"),
                        
                                        "briefOfTheCase": omonetaryItems[2].getAggregation("cells")[4].getProperty("value"),
                        
                                        "hasAnAppealBeen": omonetaryItems[2].getAggregation("cells")[5].getProperty("value")
                        
                                    },
                        
                                    {
                        
                                        "type": "Non-Monetary",
                        
                                        "typeOfPaidAmount": "Imprisonment",
                        
                                        "ngrbcPrinciple": ononMonetaryItems[0].getAggregation("cells")[1].getProperty("value"),
                        
                                        "nameOfInstitutions": ononMonetaryItems[0].getAggregation("cells")[2].getProperty("value"),
                        
                                        "amountInINR": ononMonetaryItems[0].getAggregation("cells")[3].getProperty("value"),
                        
                                        "briefOfTheCase": ononMonetaryItems[0].getAggregation("cells")[4].getProperty("value"),
                        
                                        "hasAnAppealBeen": ononMonetaryItems[0].getAggregation("cells")[5].getProperty("value")
                        
                                    },
                        
                                    {
                        
                                        "type": "Non-Monetary",
                        
                                        "typeOfPaidAmount": "Punishment",
                        
                                        "ngrbcPrinciple": ononMonetaryItems[1].getAggregation("cells")[1].getProperty("value"),
                        
                                        "nameOfInstitutions": ononMonetaryItems[1].getAggregation("cells")[2].getProperty("value"),
                        
                                        "amountInINR": ononMonetaryItems[1].getAggregation("cells")[3].getProperty("value"),
                        
                                        "briefOfTheCase": ononMonetaryItems[1].getAggregation("cells")[4].getProperty("value"),
                        
                                        "hasAnAppealBeen": ononMonetaryItems[1].getAggregation("cells")[5].getProperty("value")
                        
                                    }
                        
                                ],
                        
                                "zlegal_compliance_principle1_essential_5": [
                        
                                    {
                        
                                        "typeOfWorkers": "Directors",
                        
                                        "valueForCurrentFinancialYear": oTableItems[0].getAggregation("cells")[1].getProperty("value"),
                        
                                        "valueForPreviousFinancialYear": oTableItems[0].getAggregation("cells")[2].getProperty("value")
                        
                                    },
                        
                                    {
                        
                                        "typeOfWorkers": "KMPs",
                        
                                        "valueForCurrentFinancialYear": oTableItems[1].getAggregation("cells")[1].getProperty("value"),
                        
                                        "valueForPreviousFinancialYear": oTableItems[1].getAggregation("cells")[2].getProperty("value")
                        
                                    },
                        
                                    {
                        
                                        "typeOfWorkers": "Employees",
                        
                                        "valueForCurrentFinancialYear": oTableItems[2].getAggregation("cells")[1].getProperty("value"),
                        
                                        "valueForPreviousFinancialYear": oTableItems[2].getAggregation("cells")[2].getProperty("value")
                        
                                    },
                        
                                    {
                        
                                        "typeOfWorkers": "Workers",
                        
                                        "valueForCurrentFinancialYear": oTableItems[3].getAggregation("cells")[1].getProperty("value"),
                        
                                        "valueForPreviousFinancialYear": oTableItems[3].getAggregation("cells")[2].getProperty("value")
                        
                                    }
                        
                                ],
                        
                                "zlegal_compliance_principle1_essential_6": [
                        
                                    {
                        
                                        "detailsOfComplaints": "Number of complaints received in relation to issues of Conflict of Interest of the Directors",
                        
                                        "numberForCurrentFinancialYear": oTable1Items[0].getAggregation("cells")[1].getProperty("value"),
                        
                                        "remarksForCurrentFinancialYear": oTable1Items[0].getAggregation("cells")[2].getProperty("value"),
                        
                                        "numberForPreviousFinancialYear": oTable1Items[0].getAggregation("cells")[3].getProperty("value"),
                        
                                        "remarksForPreviousFinancialYear": oTable1Items[0].getAggregation("cells")[4].getProperty("value")
                        
                                    },
                        
                                    {
                        
                                        "detailsOfComplaints": "Number of complaints received in relation to issues of Conflict of Interest of the KMPs",
                        
                                        "numberForCurrentFinancialYear": oTable1Items[1].getAggregation("cells")[1].getProperty("value"),
                        
                                        "remarksForCurrentFinancialYear": oTable1Items[1].getAggregation("cells")[2].getProperty("value"),
                        
                                        "numberForPreviousFinancialYear": oTable1Items[1].getAggregation("cells")[3].getProperty("value"),
                        
                                        "remarksForPreviousFinancialYear": oTable1Items[1].getAggregation("cells")[4].getProperty("value")
                        
                                    }
                        
                                ],

                                  "zlegal_compliance_principle9_essential_7a": idQuestionsTable[0].getAggregation("cells")[1].getProperty("value"), 

                                   "zlegal_compliance_principle9_essential_7b": idQuestionsTable[1].getAggregation("cells")[1].getProperty("value"), 

                                   "zlegal_compliance_principle9_essential_7c": idQuestionsTable[2].getAggregation("cells")[1].getProperty("value"), 
                        
                                "zlegal_compliance_principle1_essential_3": [
                        
                                    {
                        
                                        "case_details": "",
                        
                                        "name_regulatory_agencies": ""
                        
                                    }
                        
                                ],
                        
                                "zlegal_compliance_principle7_essential_1": [
                        
                                    {
                        
                                        "sr_no": "",
                        
                                        "name_of_trade_industy_associations": "",
                        
                                        "reach_of_trade_industy_associations": ""
                        
                                    }
                        
                                ],
                        
                                "zlegal_compliance_principle7_essential_2": [
                        
                                    {
                        
                                        "name_of_authority": "",
                        
                                        "brief_of_case": "",
                        
                                        "corrective_actions_taken": ""
                        
                                    }
                        
                                ],
                        
                                "zlegal_compliance_principle7_leadership_1": [
                        
                                    {
                        
                                        "sr_no": "",
                        
                                        "public_policy_advocated": "",
                        
                                        "method_resorted_for_advocacy": "",
                        
                                        "information_available_in_public_domain": "",
                        
                                        "frequency_of_review_by_board": "",
                        
                                        "web_link": ""
                        
                                    }
                        
                                ]
                        
                            }
                        
                        };

                        var appId = that.getOwnerComponent().getManifestEntry("/sap.app/id");
                        var appPath = appId.replaceAll(".", "/");
                        var appModulePath = jQuery.sap.getModulePath(appPath);
                            that.getView().setBusy(true);

                            $.ajax({
                                url: appModulePath + "/bpmworkflowruntime/v1/xsrf-token",
                                method: "GET",
                                headers: {
                                    "X-CSRF-Token": "Fetch"
                                },
                                success: function (result, xhr, data) {
                                    var token = data.getResponseHeader("X-CSRF-Token");
                                    if (token === null) return;
            
                                    $.ajax({
                                        url: appModulePath + "/bpmworkflowruntime/v1/workflow-instances",
                                        type: "POST",
                                        data: JSON.stringify(workObj),
                                        headers: {
                                            "X-CSRF-Token": token,
                                            "Content-Type": "application/json"
                                        },
                                        async: false,
                                        success: function (data, response) {
                                            var successMsg;
                                            that.getView().setBusy(false);
                                            successMsg = "Request Sent for Approval";
                                            MessageBox.success(successMsg, {
                                                icon: MessageBox.Icon.SUCCESS,
                                                title: "SUCCESS",
                                                actions: [MessageBox.Action.OK],
                                                initialFocus: MessageBox.Action.OK,
                                                onClose: function (Action) {
                                                    // that.clearForm();
                                                    that.getView().setBusy(false);
                                                }
                                            });
                                        },
                                        error: function (e) {
                                            that.getView().setBusy(false);
                                            MessageBox.show(JSON.stringify(e), {
                                                icon: MessageBox.Icon.ERROR,
                                                title: "ERROR"
                                            });
                                        }
                                    });
                                        },
                                        error: function (e) {
                                            that.getView().setBusy(false);
                                            MessageBox.show(JSON.stringify(e), {
                                                icon: MessageBox.Icon.ERROR,
                                                title: "ERROR"
                                            });
                                        }
                                    });

            }
            else if(sKey === "04"){
                this.getView().getModel("hrEditModel").setData({edit:false});
                var TableSegment  = this.getView().byId("idTableSegment").getItems();
                var PEmpTable = this.getView().byId("idPEmpTable").getItems();
                var NPEmpTable = this.getView().byId("idNPEmpTable").getItems();
                var WorkerTable = this.getView().byId("idWorkerTable").getItems();
                var NonWorkerTable  = this.getView().byId("idNonWorkerTable").getItems();
                var RetireBenfTable = this.getView().byId("idRetireBenfTable").getItems();
                var MembershipEmpTable = this.getView().byId("idMembershipEmpTable").getItems();
                var MembershipWorTable = this.getView().byId("idMembershipWorTable").getItems();
                var RateofWorkAndLeaveTable = this.getView().byId("idRateofWorkAndLeaveTable").getItems();
                var PEmpTrainingTable  = this.getView().byId("idPEmpTrainingTable").getItems()
                var WorkTrainingTable = this.getView().byId("idWorkTrainingTable").getItems();
                var PerEmpTable  = this.getView().byId("idPerEmpTable").getItems();
                var PerWorkTable = this.getView().byId("idPerWorkTable").getItems();
                var EmpHumanRightTable = this.getView().byId("idEmpHumanRightTable").getItems();
                var WorkHumanRightTable = this.getView().byId("idWorkHumanRightTable").getItems();
                var PEmpWageTable = this.getView().byId("idPEmpWageTable").getItems();
                var WorkWageTable = this.getView().byId("idWorkWageTable").getItems();
                var WageTable = this.getView().byId("idWageTable").getItems();
                var ComplaintTable = this.getView().byId("idComplaintTable").getItems();
                var AssessmentsTable = this.getView().byId("idAssessmentsTable").getItems();
                var SpendTable = this.getView().byId("idSpendTable").getItems();
                var GrossWageTable = this.getView().byId("idGrossWageTable").getItems();
                var CompFiledTable = this.getView().byId("idCompFiledTable").getItems();
                var JobCreationTable = this.getView().byId("idJobCreationTable").getItems();

                var oPayload = { 

                    
                        "status": "Submitted", 
                    
                        "creator_email": "renuka.dimber@bristlecone.com", 
                    
                        "creator_name": "Renuka Dimber", 
                    
                        "HR": [ 
                    
                            { 
                    
                                "principle": "1", 
                    
                                "indicator": "Essential", 
                    
                                "questionID": "1", 
                    
                                "principle1_essential_1": [ 
                    
                                    { 

										"position": 0,
                    
                                        "segment": "Board of Directors", 
                    
                                        "numberOfTrainingPrograms": TableSegment[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "topicsCoveredUnderTraining": TableSegment[0].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "percentageOfPersonsInRespectiveCategory": TableSegment[0].getAggregation("cells")[3].getProperty("value") 
                    
                                    }, 
                    
                                    {  

										"position": 1,
                    
                                        "segment": "Key Managerial Personnel", 
                    
                                        "numberOfTrainingPrograms": TableSegment[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "topicsCoveredUnderTraining": TableSegment[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "percentageOfPersonsInRespectiveCategory": TableSegment[1].getAggregation("cells")[3].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 

										"position": 2,
                    
                                        "segment": "Employees other than BoD and KMPs", 
                    
                                        "numberOfTrainingPrograms": TableSegment[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "topicsCoveredUnderTraining": TableSegment[2].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "percentageOfPersonsInRespectiveCategory": TableSegment[2].getAggregation("cells")[3].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 

										"position": 3,
                    
                                        "segment": "Workers", 
                    
                                        "numberOfTrainingPrograms": TableSegment[3].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "topicsCoveredUnderTraining": TableSegment[3].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "percentageOfPersonsInRespectiveCategory": TableSegment[3].getAggregation("cells")[3].getProperty("value") 
                    
                                    } 
                    
                                ] 
                    
                            }, 
                    
                            { 
                    
                                "principle": "3", 
                    
                                "indicator": "Essential", 
                    
                                "questionID": "1a", 
                    
                                "principle3_essential_1a": [ 
                    
                                    { 
	 

										"position": 0,

                                        "type": "Permanent employees", 
                    
                                        "category": "Male", 
                    
                                        "total":PEmpTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "numberOfHealthInsurance":PEmpTable[0].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "percentageOfHealthInsurance":PEmpTable[0].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "numberOfAccidentInsurance":PEmpTable[0].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "percentageOfAccidentInsurance":PEmpTable[0].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "numberOfMaternityBenefits":PEmpTable[0].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "percentageOfMaternityBenefits":PEmpTable[0].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "numberOfPaternityBenefits":PEmpTable[0].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "percentageOfPaternityBenefits":PEmpTable[0].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "numberOfDayCareFacilities":PEmpTable[0].getAggregation("cells")[10].getProperty("value"), 
                    
                                        "percentageOfDayCareFacilities":PEmpTable[0].getAggregation("cells")[11].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 

										"position": 1,
                    
                                        "type": "Permanent employees", 
                    
                                        "category": "Female", 
                    
                                        "total": PEmpTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "numberOfHealthInsurance": PEmpTable[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "percentageOfHealthInsurance": PEmpTable[1].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "numberOfAccidentInsurance": PEmpTable[1].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "percentageOfAccidentInsurance": PEmpTable[1].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "numberOfMaternityBenefits": PEmpTable[1].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "percentageOfMaternityBenefits": PEmpTable[1].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "numberOfPaternityBenefits": PEmpTable[1].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "percentageOfPaternityBenefits": PEmpTable[1].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "numberOfDayCareFacilities": PEmpTable[1].getAggregation("cells")[10].getProperty("value"), 
                    
                                        "percentageOfDayCareFacilities": PEmpTable[1].getAggregation("cells")[11].getProperty("value") 
                    
                                    }, 
                    
                                    { 
                    

	 

										"position": 2,

                                        "type": "Permanent employees", 
                    
                                        "category": "Total", 
                    
                                        "total": PEmpTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "numberOfHealthInsurance": PEmpTable[2].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "percentageOfHealthInsurance": PEmpTable[2].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "numberOfAccidentInsurance": PEmpTable[2].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "percentageOfAccidentInsurance": PEmpTable[2].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "numberOfMaternityBenefits": PEmpTable[2].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "percentageOfMaternityBenefits": PEmpTable[2].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "numberOfPaternityBenefits": PEmpTable[2].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "percentageOfPaternityBenefits": PEmpTable[2].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "numberOfDayCareFacilities": PEmpTable[2].getAggregation("cells")[10].getProperty("value"), 
                    
                                        "percentageOfDayCareFacilities": PEmpTable[2].getAggregation("cells")[11].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 

										"position": 0,
                    
                                        "type": "Other than Permanent employees", 
                    
                                        "category": "Male", 
                    
                                        "total": NPEmpTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "numberOfHealthInsurance": NPEmpTable[0].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "percentageOfHealthInsurance": NPEmpTable[0].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "numberOfAccidentInsurance": NPEmpTable[0].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "percentageOfAccidentInsurance": NPEmpTable[0].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "numberOfMaternityBenefits": NPEmpTable[0].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "percentageOfMaternityBenefits": NPEmpTable[0].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "numberOfPaternityBenefits": NPEmpTable[0].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "percentageOfPaternityBenefits": NPEmpTable[0].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "numberOfDayCareFacilities": NPEmpTable[0].getAggregation("cells")[10].getProperty("value"), 
                    
                                        "percentageOfDayCareFacilities": NPEmpTable[0].getAggregation("cells")[11].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 

										"position": 1,
                    
                                        "type": "Other than Permanent employees", 
                    
                                        "category": "Female", 
                    
                                        "total": NPEmpTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "numberOfHealthInsurance": NPEmpTable[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "percentageOfHealthInsurance": NPEmpTable[1].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "numberOfAccidentInsurance": NPEmpTable[1].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "percentageOfAccidentInsurance": NPEmpTable[1].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "numberOfMaternityBenefits": NPEmpTable[1].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "percentageOfMaternityBenefits": NPEmpTable[1].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "numberOfPaternityBenefits": NPEmpTable[1].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "percentageOfPaternityBenefits": NPEmpTable[1].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "numberOfDayCareFacilities": NPEmpTable[1].getAggregation("cells")[10].getProperty("value"), 
                    
                                        "percentageOfDayCareFacilities": NPEmpTable[1].getAggregation("cells")[11].getProperty("value") 
                    
                                    }, 
                    
                                    {
	
	 

										"position": 2, 
                    
                                        "type": "Other than Permanent employees", 
                    
                                        "category": "Total", 
                    
                                        "total": NPEmpTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "numberOfHealthInsurance": NPEmpTable[2].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "percentageOfHealthInsurance": NPEmpTable[2].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "numberOfAccidentInsurance": NPEmpTable[2].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "percentageOfAccidentInsurance": NPEmpTable[2].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "numberOfMaternityBenefits": NPEmpTable[2].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "percentageOfMaternityBenefits": NPEmpTable[2].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "numberOfPaternityBenefits": NPEmpTable[2].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "percentageOfPaternityBenefits": NPEmpTable[2].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "numberOfDayCareFacilities": NPEmpTable[2].getAggregation("cells")[10].getProperty("value"), 
                    
                                        "percentageOfDayCareFacilities": NPEmpTable[2].getAggregation("cells")[11].getProperty("value") 
                    
                                    } 
                    
                                ] 
                    
                            }, 
                    
                            { 
                    
                                "principle": "3", 
                    
                                "indicator": "Essential", 
                    
                                "questionID": "1b", 
                    
                                "principle3_essential_1b": [ 
                    
                                    { 

	 

										"position": 0,
                    
                                        "type": "Permanent workers", 
                    
                                        "category": "Male", 
                    
                                        "total": WorkerTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "numberOfHealthInsurance": WorkerTable[0].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "percentageOfHealthInsurance": WorkerTable[0].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "numberOfAccidentInsurance": WorkerTable[0].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "percentageOfAccidentInsurance": WorkerTable[0].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "numberOfMaternityBenefits": WorkerTable[0].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "percentageOfMaternityBenefits": WorkerTable[0].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "numberOfPaternityBenefits": WorkerTable[0].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "percentageOfPaternityBenefits": WorkerTable[0].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "numberOfDayCareFacilities": WorkerTable[0].getAggregation("cells")[10].getProperty("value"), 
                    
                                        "percentageOfDayCareFacilities": WorkerTable[0].getAggregation("cells")[11].getProperty("value") 
                    
                                    }, 
                    
                                    { 
                    

	 

										"position": 1,

                                        "type": "Permanent workers", 
                    
                                        "category": "Female", 
                    
                                        "total": WorkerTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "numberOfHealthInsurance": WorkerTable[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "percentageOfHealthInsurance": WorkerTable[1].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "numberOfAccidentInsurance": WorkerTable[1].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "percentageOfAccidentInsurance": WorkerTable[1].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "numberOfMaternityBenefits": WorkerTable[1].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "percentageOfMaternityBenefits": WorkerTable[1].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "numberOfPaternityBenefits": WorkerTable[1].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "percentageOfPaternityBenefits": WorkerTable[1].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "numberOfDayCareFacilities": WorkerTable[1].getAggregation("cells")[10].getProperty("value"), 
                    
                                        "percentageOfDayCareFacilities": WorkerTable[1].getAggregation("cells")[11].getProperty("value") 
                    
                                    }, 
                    
                                    { 
                    
	 

										"position": 2,

                                        "type": "Permanent workers", 
                    
                                        "category": "Total", 
                    
                                        "total": WorkerTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "numberOfHealthInsurance": WorkerTable[2].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "percentageOfHealthInsurance": WorkerTable[2].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "numberOfAccidentInsurance": WorkerTable[2].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "percentageOfAccidentInsurance": WorkerTable[2].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "numberOfMaternityBenefits": WorkerTable[2].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "percentageOfMaternityBenefits": WorkerTable[2].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "numberOfPaternityBenefits": WorkerTable[2].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "percentageOfPaternityBenefits": WorkerTable[2].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "numberOfDayCareFacilities": WorkerTable[2].getAggregation("cells")[10].getProperty("value"), 
                    
                                        "percentageOfDayCareFacilities": WorkerTable[2].getAggregation("cells")[11].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 

										"position": 0,
                    
                                        "type": "Other than Permanent workers", 
                    
                                        "category": "Male", 
                    
                                        "total": NonWorkerTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "numberOfHealthInsurance": NonWorkerTable[0].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "percentageOfHealthInsurance": NonWorkerTable[0].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "numberOfAccidentInsurance": NonWorkerTable[0].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "percentageOfAccidentInsurance": NonWorkerTable[0].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "numberOfMaternityBenefits": NonWorkerTable[0].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "percentageOfMaternityBenefits": NonWorkerTable[0].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "numberOfPaternityBenefits": NonWorkerTable[0].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "percentageOfPaternityBenefits": NonWorkerTable[0].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "numberOfDayCareFacilities": NonWorkerTable[0].getAggregation("cells")[10].getProperty("value"), 
                    
                                        "percentageOfDayCareFacilities": NonWorkerTable[0].getAggregation("cells")[11].getProperty("value") 
                    
                                    }, 
                    
                                    {
	
	 

										"position": 1, 
                    
                                        "type": "Other than Permanent workers", 
                    
                                        "category": "Female", 
                    
                                        "total": NonWorkerTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "numberOfHealthInsurance": NonWorkerTable[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "percentageOfHealthInsurance": NonWorkerTable[1].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "numberOfAccidentInsurance": NonWorkerTable[1].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "percentageOfAccidentInsurance": NonWorkerTable[1].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "numberOfMaternityBenefits": NonWorkerTable[1].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "percentageOfMaternityBenefits": NonWorkerTable[1].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "numberOfPaternityBenefits": NonWorkerTable[1].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "percentageOfPaternityBenefits": NonWorkerTable[1].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "numberOfDayCareFacilities": NonWorkerTable[1].getAggregation("cells")[10].getProperty("value"), 
                    
                                        "percentageOfDayCareFacilities": NonWorkerTable[1].getAggregation("cells")[11].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 

										"position": 2,
                    
                                        "type": "Other than Permanent workers", 
                    
                                        "category": "Total", 
                    
                                        "total": NonWorkerTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "numberOfHealthInsurance": NonWorkerTable[2].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "percentageOfHealthInsurance": NonWorkerTable[2].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "numberOfAccidentInsurance": NonWorkerTable[2].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "percentageOfAccidentInsurance": NonWorkerTable[2].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "numberOfMaternityBenefits": NonWorkerTable[2].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "percentageOfMaternityBenefits": NonWorkerTable[2].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "numberOfPaternityBenefits": NonWorkerTable[2].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "percentageOfPaternityBenefits": NonWorkerTable[2].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "numberOfDayCareFacilities": NonWorkerTable[2].getAggregation("cells")[10].getProperty("value"), 
                    
                                        "percentageOfDayCareFacilities": NonWorkerTable[2].getAggregation("cells")[11].getProperty("value") 
                    
                                    } 
                    
                                ] 
                    
                            }, 
                    
                            { 
                    
                                "principle": "3", 
                    
                                "indicator": "Essential", 
                    
                                "questionID": "2", 
                    
                                "principle3_essential_2": [ 
                    
                                    { 

	 

										"position": 0,
                    
                                        "benefits": "PF", 
                    
                                        "currentFYEmployees":RetireBenfTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYWorkers": RetireBenfTable[0].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYauthority": RetireBenfTable[0].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYEmployees": RetireBenfTable[0].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYWorkers": RetireBenfTable[0].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYauthority": RetireBenfTable[0].getAggregation("cells")[6].getProperty("value")
                    
                                    }, 
                    
                                    { 

	 

										"position": 1,
                    
                                        "benefits": "Gratuity", 
                    
                                        "currentFYEmployees": RetireBenfTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYWorkers": RetireBenfTable[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYauthority": RetireBenfTable[1].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYEmployees": RetireBenfTable[1].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYWorkers": RetireBenfTable[1].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYauthority": RetireBenfTable[1].getAggregation("cells")[6].getProperty("value")
                    
                                    }, 
                    
                                    { 

	 

										"position": 2,
                    
                                        "benefits": "ESI", 
                    
                                        "currentFYEmployees": RetireBenfTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYWorkers": RetireBenfTable[2].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYauthority": RetireBenfTable[2].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYEmployees": RetireBenfTable[2].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYWorkers": RetireBenfTable[2].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYauthority": RetireBenfTable[2].getAggregation("cells")[6].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 

										"position": 3,
                    
                                        "benefits": "Others – please specify", 
                    
                                        "currentFYEmployees": RetireBenfTable[3].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYWorkers": RetireBenfTable[3].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYauthority": RetireBenfTable[3].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYEmployees": RetireBenfTable[3].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYWorkers": RetireBenfTable[3].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYauthority": RetireBenfTable[3].getAggregation("cells")[6].getProperty("value") 
                    
                                    } 
                    
                                ] 
                    
                            }, 
                    
                            { 
                    
                                "principle": "3", 
                    
                                "indicator": "Essential", 
                    
                                "questionID": "5", 
                    
                                "principle3_essential_5": [ 
                    
                                    { 

	 

										"position": 0,
                    
                                        "gender": "Male", 
                    
                                        "permanentEmployeesReturnToWorkRate":RateofWorkAndLeaveTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "permanentEmployeesRetentionRate":RateofWorkAndLeaveTable[0].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "permanentWorkersReturnToWorkRate":RateofWorkAndLeaveTable[0].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "permanentWorkersRetentionRate":RateofWorkAndLeaveTable[0].getAggregation("cells")[4].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 

										"position": 1,
                    
                                        "gender": "Female", 
                    
                                        "permanentEmployeesReturnToWorkRate":RateofWorkAndLeaveTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "permanentEmployeesRetentionRate":RateofWorkAndLeaveTable[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "permanentWorkersReturnToWorkRate":RateofWorkAndLeaveTable[1].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "permanentWorkersRetentionRate":RateofWorkAndLeaveTable[1].getAggregation("cells")[4].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 

										"position": 2,
                    
                                        "gender": "Total", 
                    
                                        "permanentEmployeesReturnToWorkRate":RateofWorkAndLeaveTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "permanentEmployeesRetentionRate":RateofWorkAndLeaveTable[2].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "permanentWorkersReturnToWorkRate":RateofWorkAndLeaveTable[2].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "permanentWorkersRetentionRate":  RateofWorkAndLeaveTable[2].getAggregation("cells")[4].getProperty("value") 
                    
                                    } 
                    
                                ] 
                    
                            }, 
                    
                            { 
                    
                                "principle": "3", 
                    
                                "indicator": "Essential", 
                    
                                "questionID": "7", 
                    
                                "principle3_essential_7": [ 
                    
                                    { 

	 

										"position": 0,
                    
                                        "type": " Total Permanent Employees", 
                    
                                        "category": "Male", 
                    
                                        "currentFYTotalEmployees": MembershipEmpTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYTotalEmployeesPartOfUnions": MembershipEmpTable[0].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentage": MembershipEmpTable[0].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYTotalEmployees": MembershipEmpTable[0].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYTotalEmployeesPartOfUnions": MembershipEmpTable[0].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYPercentage": MembershipEmpTable[0].getAggregation("cells")[6].getProperty("value")
                    
                                    }, 
                    
                                    { 

	 

										"position": 1,
                    
                                        "type": " Total Permanent Employees", 
                    
                                        "category": "Female", 
                    
                                        "currentFYTotalEmployees": MembershipEmpTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYTotalEmployeesPartOfUnions": MembershipEmpTable[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentage": MembershipEmpTable[1].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYTotalEmployees": MembershipEmpTable[1].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYTotalEmployeesPartOfUnions": MembershipEmpTable[1].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYPercentage": MembershipEmpTable[1].getAggregation("cells")[6].getProperty("value")
                    
                                    }, 
                    
                                    { 

	 

										"position": 2,
                    
                                        "type": " Total Permanent Workers", 
                    
                                        "category": "Male", 
                    
                                        "currentFYTotalEmployees": MembershipWorTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYTotalEmployeesPartOfUnions": MembershipWorTable[0].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentage": MembershipWorTable[0].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYTotalEmployees": MembershipWorTable[0].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYTotalEmployeesPartOfUnions": MembershipWorTable[0].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYPercentage": MembershipWorTable[0].getAggregation("cells")[6].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 

										"position": 3,
                    
                                        "type": " Total Permanent Workers", 
                    
                                        "category": "Female", 
                    
                                        "currentFYTotalEmployees": MembershipWorTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYTotalEmployeesPartOfUnions": MembershipWorTable[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentage": MembershipWorTable[1].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYTotalEmployees": MembershipWorTable[1].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYTotalEmployeesPartOfUnions": MembershipWorTable[1].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYPercentage": MembershipWorTable[1].getAggregation("cells")[6].getProperty("value") 
                    
                                    } 
                    
                                ] 
                    
                            }, 
                    
                            { 
                    
                                "principle": "3", 
                    
                                "indicator": "Essential", 
                    
                                "questionID": "8", 
                    
                                "principle3_essential_8": [ 
                    
                                    { 

	 

										"position": 0,
                    
                                        "type": "Employees", 
                    
                                        "category": "Male", 
                    
                                        "currentFYTotal": PEmpTrainingTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumberHealthSafetyMeasures": PEmpTrainingTable[0].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentageHealthSafetyMeasures": PEmpTrainingTable[0].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "currentFYNumberSkillUpgradation": PEmpTrainingTable[0].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "currentFYPercentageSkillUpgradation": PEmpTrainingTable[0].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYTotal": PEmpTrainingTable[0].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "previousFYNumberHealthSafetyMeasures": PEmpTrainingTable[0].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "previousFYPercentageHealthSafetyMeasures": PEmpTrainingTable[0].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "previousFYNumberSkillUpgradation": PEmpTrainingTable[0].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "previousFYPercentageSkillUpgradation": PEmpTrainingTable[0].getAggregation("cells")[10].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 

										"position": 1,
                    
                                        "type": "Employees", 
                    
                                        "category": "Female", 
                    
                                        "currentFYTotal": PEmpTrainingTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumberHealthSafetyMeasures": PEmpTrainingTable[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentageHealthSafetyMeasures": PEmpTrainingTable[1].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "currentFYNumberSkillUpgradation": PEmpTrainingTable[1].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "currentFYPercentageSkillUpgradation": PEmpTrainingTable[1].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYTotal": PEmpTrainingTable[1].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "previousFYNumberHealthSafetyMeasures": PEmpTrainingTable[1].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "previousFYPercentageHealthSafetyMeasures": PEmpTrainingTable[1].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "previousFYNumberSkillUpgradation": PEmpTrainingTable[1].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "previousFYPercentageSkillUpgradation": PEmpTrainingTable[1].getAggregation("cells")[10].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 

										"position": 2,
                    
                                        "type": "Employees", 
                    
                                        "category": "Total", 
                    
                                        "currentFYTotal": PEmpTrainingTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumberHealthSafetyMeasures": PEmpTrainingTable[2].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentageHealthSafetyMeasures": PEmpTrainingTable[2].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "currentFYNumberSkillUpgradation": PEmpTrainingTable[2].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "currentFYPercentageSkillUpgradation": PEmpTrainingTable[2].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYTotal": PEmpTrainingTable[2].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "previousFYNumberHealthSafetyMeasures": PEmpTrainingTable[2].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "previousFYPercentageHealthSafetyMeasures": PEmpTrainingTable[2].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "previousFYNumberSkillUpgradation": PEmpTrainingTable[2].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "previousFYPercentageSkillUpgradation": PEmpTrainingTable[2].getAggregation("cells")[10].getProperty("value") 
                    
                                    }, 
                    
                                    { 
                    
	 

										"position": 0,
	
                                        "type": "Workers", 
                    
                                        "category": "Male", 
                    
                                        "currentFYTotal":WorkTrainingTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumberHealthSafetyMeasures": WorkTrainingTable[0].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentageHealthSafetyMeasures": WorkTrainingTable[0].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "currentFYNumberSkillUpgradation": WorkTrainingTable[0].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "currentFYPercentageSkillUpgradation": WorkTrainingTable[0].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYTotal": WorkTrainingTable[0].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "previousFYNumberHealthSafetyMeasures": WorkTrainingTable[0].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "previousFYPercentageHealthSafetyMeasures": WorkTrainingTable[0].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "previousFYNumberSkillUpgradation": WorkTrainingTable[0].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "previousFYPercentageSkillUpgradation": WorkTrainingTable[0].getAggregation("cells")[10].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 

										"position": 1,
                    
                                        "type": "Workers", 
                    
                                        "category": "Female", 
                    
                                        "currentFYTotal": WorkTrainingTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumberHealthSafetyMeasures": WorkTrainingTable[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentageHealthSafetyMeasures": WorkTrainingTable[1].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "currentFYNumberSkillUpgradation": WorkTrainingTable[1].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "currentFYPercentageSkillUpgradation": WorkTrainingTable[1].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYTotal": WorkTrainingTable[1].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "previousFYNumberHealthSafetyMeasures": WorkTrainingTable[1].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "previousFYPercentageHealthSafetyMeasures": WorkTrainingTable[1].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "previousFYNumberSkillUpgradation": WorkTrainingTable[1].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "previousFYPercentageSkillUpgradation": WorkTrainingTable[1].getAggregation("cells")[10].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 

										"position": 2,
                    
                                        "type": "Workers", 
                    
                                        "category": "Total", 
                    
                                        "currentFYTotal": WorkTrainingTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumberHealthSafetyMeasures": WorkTrainingTable[2].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentageHealthSafetyMeasures": WorkTrainingTable[2].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "currentFYNumberSkillUpgradation": WorkTrainingTable[2].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "currentFYPercentageSkillUpgradation": WorkTrainingTable[2].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYTotal": WorkTrainingTable[2].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "previousFYNumberHealthSafetyMeasures": WorkTrainingTable[2].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "previousFYPercentageHealthSafetyMeasures": WorkTrainingTable[2].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "previousFYNumberSkillUpgradation":WorkTrainingTable[2].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "previousFYPercentageSkillUpgradation": WorkTrainingTable[2].getAggregation("cells")[10].getProperty("value") 
                    
                                    } 
                    
                                ] 
                    
                            }, 
                    
                            { 
                    
                                "principle": "3", 
                    
                                "indicator": "Essential", 
                    
                                "questionID": "9", 
                    
                                "principle3_essential_9": [ 
                    
                                    { 

	 

										"position": 0,
                    
                                        "type": "Employees", 
                    
                                        "category": "Male", 
                    
                                        "currentFYTotal": PerEmpTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumber": PerEmpTable[0].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentage": PerEmpTable[0].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYTotal": PerEmpTable[0].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYNumber": PerEmpTable[0].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYPercentage": PerEmpTable[0].getAggregation("cells")[6].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 

										"position": 1,
                    
                                        "type": "Employees", 
                    
                                        "category": "Female", 
                    
                                        "currentFYTotal": PerEmpTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumber": PerEmpTable[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentage": PerEmpTable[1].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYTotal": PerEmpTable[1].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYNumber": PerEmpTable[1].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYPercentage": PerEmpTable[1].getAggregation("cells")[6].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 

										"position": 2,
                    
                                        "type": "Employees", 
                    
                                        "category": "Total", 
                    
                                        "currentFYTotal": PerEmpTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumber": PerEmpTable[2].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentage": PerEmpTable[2].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYTotal": PerEmpTable[2].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYNumber": PerEmpTable[2].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYPercentage": PerEmpTable[2].getAggregation("cells")[6].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 

										"position": 0,
                    
                                        "type": "Workers", 
                    
                                        "category": "Male", 
                    
                                        "currentFYTotal":PerWorkTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumber":PerWorkTable[0].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentage":PerWorkTable[0].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYTotal":PerWorkTable[0].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYNumber":PerWorkTable[0].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYPercentage":PerWorkTable[0].getAggregation("cells")[6].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 

										"position": 1,
                    
                                        "type": "Workers", 
                    
                                        "category": "Female", 
                    
                                        "currentFYTotal": PerWorkTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumber": PerWorkTable[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentage": PerWorkTable[1].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYTotal": PerWorkTable[1].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYNumber": PerWorkTable[1].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYPercentage": PerWorkTable[1].getAggregation("cells")[6].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 

										"position": 2,
                    
                                        "type": "Workers", 
                    
                                        "category": "Total", 
                    
                                        "currentFYTotal": PerWorkTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumber": PerWorkTable[2].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentage": PerWorkTable[2].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYTotal": PerWorkTable[2].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYNumber": PerWorkTable[2].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYPercentage": PerWorkTable[2].getAggregation("cells")[6].getProperty("value") 
                    
                                    } 
                    
                                ] 
                    
                            }, 
                    
                            { 
                    
                                "principle": "5", 
                    
                                "indicator": "Essential", 
                    
                                "questionID": "1", 
                    
                                "principle5_essential_1": [ 
                    
                                    { 
                    
	 

										"position": 0,

                                        "type": "Employees", 
                    
                                        "category": "Permanent", 
                    
                                        "currentFYTotal": EmpHumanRightTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumber": EmpHumanRightTable[0].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentage": EmpHumanRightTable[0].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYTotal": EmpHumanRightTable[0].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYNumber": EmpHumanRightTable[0].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYPercentage": EmpHumanRightTable[0].getAggregation("cells")[6].getProperty("value") 
                    
                                    }, 
                    
                                    { 
		
	 

										"position": 1,
                    
                                        "type": "Employees", 
                    
                                        "category": "Other than permanent", 
                    
                                        "currentFYTotal": EmpHumanRightTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumber": EmpHumanRightTable[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentage": EmpHumanRightTable[1].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYTotal": EmpHumanRightTable[1].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYNumber": EmpHumanRightTable[1].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYPercentage": EmpHumanRightTable[1].getAggregation("cells")[6].getProperty("value") 
                    
                                    }, 
                    
                                    { 
                                  
	 

										"position": 2,

                                        "type": "Employees", 
                    
                                        "category": "Total Employees", 
                    
                                        "currentFYTotal": EmpHumanRightTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumber": EmpHumanRightTable[2].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentage": EmpHumanRightTable[2].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYTotal": EmpHumanRightTable[2].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYNumber": EmpHumanRightTable[2].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYPercentage": EmpHumanRightTable[2].getAggregation("cells")[6].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 
                    
	 

										"position": 0,
                    
                                        "type": "Workers", 
                    
                                        "category": "Permanent", 
                    
                                        "currentFYTotal": WorkHumanRightTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumber": WorkHumanRightTable[0].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentage": WorkHumanRightTable[0].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYTotal": WorkHumanRightTable[0].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYNumber": WorkHumanRightTable[0].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYPercentage": WorkHumanRightTable[0].getAggregation("cells")[6].getProperty("value") 
                    
                                    }, 
                    
                                    {
	 
                    
	 

										"position": 1, 
                    
                                        "type": "Workers", 
                    
                                        "category": "Other than permanent", 
                    
                                        "currentFYTotal": WorkHumanRightTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumber": WorkHumanRightTable[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentage": WorkHumanRightTable[1].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYTotal": WorkHumanRightTable[1].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYNumber": WorkHumanRightTable[1].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYPercentage": WorkHumanRightTable[1].getAggregation("cells")[6].getProperty("value") 
                    
                                    }, 
                    
                                    { 
	 
                    
	 

										"position": 2,
                    
                                        "type": "Workers", 
                    
                                        "category": "Total Workers", 
                    
                                        "currentFYTotal": WorkHumanRightTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumber": WorkHumanRightTable[2].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentage": WorkHumanRightTable[2].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYTotal": WorkHumanRightTable[2].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYNumber": WorkHumanRightTable[2].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYPercentage": WorkHumanRightTable[2].getAggregation("cells")[6].getProperty("value")
                    
                                    } 
                    
                                ] 
                    
                            }, 
                    
                            { 
                    
                                "principle": "5", 
                    
                                "indicator": "Essential", 
                    
                                "questionID": "2", 
                    
                                "principle5_essential_2": [ 
                    
                                    { 
	
	 

										"position": 0,
                    
                                        "type": "Employees", 
                    
                                        "subType": "Permanent", 
                    
                                        "category": "Male", 
                    
                                        "currentFYTotal": PEmpWageTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumberEqualToMinimumWage": PEmpWageTable[0].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentageEqualToMinimumWage": PEmpWageTable[0].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "currentFYNumberMoreThanMinimumWage": PEmpWageTable[0].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "currentFYPercentageMoreThanMinimumWage": PEmpWageTable[0].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYTotal": PEmpWageTable[0].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "previousFYNumberEqualToMinimumWage": PEmpWageTable[0].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "previousFYPercentageEqualToMinimumWage": PEmpWageTable[0].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "previousFYNumberMoreThanMinimumWage": PEmpWageTable[0].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "previousFYPercentageMoreThanMinimumWage": PEmpWageTable[0].getAggregation("cells")[10].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 
	
	 

										"position": 0,
                    
                                        "type": "Workers", 
                    
                                        "subType": "Permanent", 
                    
                                        "category": "Male", 
                    
                                        "currentFYTotal": WorkWageTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumberEqualToMinimumWage": WorkWageTable[0].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentageEqualToMinimumWage": WorkWageTable[0].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "currentFYNumberMoreThanMinimumWage": WorkWageTable[0].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "currentFYPercentageMoreThanMinimumWage": WorkWageTable[0].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYTotal": WorkWageTable[0].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "previousFYNumberEqualToMinimumWage": WorkWageTable[0].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "previousFYPercentageEqualToMinimumWage": WorkWageTable[0].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "previousFYNumberMoreThanMinimumWage": WorkWageTable[0].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "previousFYPercentageMoreThanMinimumWage": WorkWageTable[0].getAggregation("cells")[10].getProperty("value")
                    
                                    }, 
                    
                                    { 
	 
	
	 

										"position": 3,
                    
                                        "type": "Employees", 
                    
                                        "subType": "Other than Permanent", 
                    
                                        "category": "Female", 
                    
                                        "currentFYTotal": PEmpWageTable[3].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumberEqualToMinimumWage": PEmpWageTable[3].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentageEqualToMinimumWage": PEmpWageTable[3].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "currentFYNumberMoreThanMinimumWage": PEmpWageTable[3].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "currentFYPercentageMoreThanMinimumWage": PEmpWageTable[3].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYTotal": PEmpWageTable[3].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "previousFYNumberEqualToMinimumWage": PEmpWageTable[3].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "previousFYPercentageEqualToMinimumWage": PEmpWageTable[3].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "previousFYNumberMoreThanMinimumWage": PEmpWageTable[3].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "previousFYPercentageMoreThanMinimumWage": PEmpWageTable[3].getAggregation("cells")[10].getProperty("value") 
                    
                                    }, 
                    
                                    { 
	 
	
	 

										"position": 2,
                    
                                        "type": "Employees", 
                    
                                        "subType": "Other than Permanent", 
                    
                                        "category": "Male", 
                    
                                        "currentFYTotal": PEmpWageTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumberEqualToMinimumWage": PEmpWageTable[2].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentageEqualToMinimumWage": PEmpWageTable[2].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "currentFYNumberMoreThanMinimumWage": PEmpWageTable[2].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "currentFYPercentageMoreThanMinimumWage": PEmpWageTable[2].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYTotal": PEmpWageTable[2].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "previousFYNumberEqualToMinimumWage": PEmpWageTable[2].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "previousFYPercentageEqualToMinimumWage": PEmpWageTable[2].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "previousFYNumberMoreThanMinimumWage": PEmpWageTable[2].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "previousFYPercentageMoreThanMinimumWage": PEmpWageTable[2].getAggregation("cells")[10].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 
	
	 

										"position": 1,
                    
                                        "type": "Employees", 
                    
                                        "subType": "Permanent", 
                    
                                        "category": "Female", 
                    
                                        "currentFYTotal": PEmpWageTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumberEqualToMinimumWage": PEmpWageTable[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentageEqualToMinimumWage": PEmpWageTable[1].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "currentFYNumberMoreThanMinimumWage": PEmpWageTable[1].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "currentFYPercentageMoreThanMinimumWage": PEmpWageTable[1].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYTotal": PEmpWageTable[1].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "previousFYNumberEqualToMinimumWage": PEmpWageTable[1].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "previousFYPercentageEqualToMinimumWage": PEmpWageTable[1].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "previousFYNumberMoreThanMinimumWage": PEmpWageTable[1].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "previousFYPercentageMoreThanMinimumWage": PEmpWageTable[1].getAggregation("cells")[10].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 
	
	 

										"position": 1,
                    
                                        "type": "Workers", 
                    
                                        "subType": "Permanent", 
                    
                                        "category": "Female", 
                    
                                        "currentFYTotal":WorkWageTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumberEqualToMinimumWage": WorkWageTable[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentageEqualToMinimumWage": WorkWageTable[1].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "currentFYNumberMoreThanMinimumWage": WorkWageTable[1].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "currentFYPercentageMoreThanMinimumWage": WorkWageTable[1].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYTotal": WorkWageTable[1].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "previousFYNumberEqualToMinimumWage": WorkWageTable[1].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "previousFYPercentageEqualToMinimumWage": WorkWageTable[1].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "previousFYNumberMoreThanMinimumWage": WorkWageTable[1].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "previousFYPercentageMoreThanMinimumWage": WorkWageTable[1].getAggregation("cells")[10].getProperty("value") 
                    
                                    }, 
                    
                                    {
	
	 
	
	 

										"position": 2, 
                    
                                        "type": "Workers", 
                    
                                        "subType": "Other than Permanent", 
                    
                                        "category": "Male", 
                    
                                        "currentFYTotal": WorkWageTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumberEqualToMinimumWage": WorkWageTable[2].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentageEqualToMinimumWage": WorkWageTable[2].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "currentFYNumberMoreThanMinimumWage": WorkWageTable[2].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "currentFYPercentageMoreThanMinimumWage": WorkWageTable[2].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYTotal": WorkWageTable[2].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "previousFYNumberEqualToMinimumWage": WorkWageTable[2].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "previousFYPercentageEqualToMinimumWage": WorkWageTable[2].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "previousFYNumberMoreThanMinimumWage": WorkWageTable[2].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "previousFYPercentageMoreThanMinimumWage": WorkWageTable[2].getAggregation("cells")[10].getProperty("value") 
                    
                                    }, 
                    
                                    {
	
	 
	
	 

										"position": 3, 
                    
                                        "type": "Workers", 
                    
                                        "subType": "Other than Permanent", 
                    
                                        "category": "Female", 
                    
                                        "currentFYTotal": WorkWageTable[3].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYNumberEqualToMinimumWage": WorkWageTable[3].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYPercentageEqualToMinimumWage": WorkWageTable[3].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "currentFYNumberMoreThanMinimumWage": WorkWageTable[3].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "currentFYPercentageMoreThanMinimumWage": WorkWageTable[3].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYTotal": WorkWageTable[3].getAggregation("cells")[6].getProperty("value"), 
                    
                                        "previousFYNumberEqualToMinimumWage": WorkWageTable[3].getAggregation("cells")[7].getProperty("value"), 
                    
                                        "previousFYPercentageEqualToMinimumWage": WorkWageTable[3].getAggregation("cells")[8].getProperty("value"), 
                    
                                        "previousFYNumberMoreThanMinimumWage": WorkWageTable[3].getAggregation("cells")[9].getProperty("value"), 
                    
                                        "previousFYPercentageMoreThanMinimumWage": WorkWageTable[3].getAggregation("cells")[10].getProperty("value") 
                    
                                    } 
                    
                                ] 
                    
                            }, 
                    
                            { 
                    
                                "principle": "5", 
                    
                                "indicator": "Essential", 
                    
                                "questionID": "3", 
                    
                                "principle5_essential_3": [ 
                    
                                    { 
                     
	
	 

										"position": 0,

                                        "type": "Board of Directors (BoD)", 
                    
                                        "maleNumber": WageTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "maleMedianRemuneration": WageTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "femaleNumber": WageTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "femaleMedianRemuneration": WageTable[0].getAggregation("cells")[1].getProperty("value")
                    
                                    }, 
                    
                                    { 

	 
	
	 

										"position": 1,
                    
                                        "type": "Key Managerial Personnel", 
                    
                                        "maleNumber": WageTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "maleMedianRemuneration": WageTable[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "femaleNumber": WageTable[1].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "femaleMedianRemuneration": WageTable[1].getAggregation("cells")[4].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 
	
	 

										"position": 2,
                    
                                        "type": "Employees other than BoD and KMP", 
                    
                                        "maleNumber": WageTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "maleMedianRemuneration": WageTable[2].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "femaleNumber": WageTable[2].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "femaleMedianRemuneration": WageTable[2].getAggregation("cells")[4].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 
	
	 

										"position": 3,
                    
                                        "type": "Workers", 
                    
                                        "maleNumber": WageTable[3].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "maleMedianRemuneration": WageTable[3].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "femaleNumber": WageTable[3].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "femaleMedianRemuneration": WageTable[3].getAggregation("cells")[4].getProperty("value") 
                    
                                    } 
                    
                                ] 
                    
                            }, 
                    
                            { 
                    
                                "principle": "5", 
                    
                                "indicator": "Essential", 
                    
                                "questionID": "6", 
                    
                                "principle5_essential_6": [ 
                    
                                    { 
	 
	
	 

										"position": 0,
                    
                                        "type": "Sexual Harassment", 
                    
                                        "currentFYComplaintsFiled":ComplaintTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYComplaintsPending": ComplaintTable[0].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYComplaintsRemarks": ComplaintTable[0].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYComplaintsFiled": ComplaintTable[0].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYComplaintsPending": ComplaintTable[0].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYComplaintsRemarks": ComplaintTable[0].getAggregation("cells")[6].getProperty("value") 
                    
                                    }, 
                    
                                    { 
	 
	
	 

										"position": 1,
                    
                                        "type": "Discrimination at workplace", 
                    
                                        "currentFYComplaintsFiled": ComplaintTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYComplaintsPending":  ComplaintTable[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYComplaintsRemarks":  ComplaintTable[1].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYComplaintsFiled":  ComplaintTable[1].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYComplaintsPending":  ComplaintTable[1].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYComplaintsRemarks":  ComplaintTable[1].getAggregation("cells")[6].getProperty("value") 
                    
                                    }, 
                    
                                    { 
	 
	
	 

										"position": 2,
                    
                                        "type": "Child Labour", 
                    
                                        "currentFYComplaintsFiled":  ComplaintTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYComplaintsPending": ComplaintTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYComplaintsRemarks": ComplaintTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "previousFYComplaintsFiled": ComplaintTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "previousFYComplaintsPending": ComplaintTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "previousFYComplaintsRemarks": ComplaintTable[2].getAggregation("cells")[1].getProperty("value") 
                    
                                    }, 
                    
                                    { 
	 
	
	 

										"position": 3,
                    
                                        "type": "Forced Labour/Involuntary Labour", 
                    
                                        "currentFYComplaintsFiled": ComplaintTable[3].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYComplaintsPending": ComplaintTable[3].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYComplaintsRemarks": ComplaintTable[3].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYComplaintsFiled": ComplaintTable[3].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYComplaintsPending": ComplaintTable[3].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYComplaintsRemarks": ComplaintTable[3].getAggregation("cells")[6].getProperty("value") 
                    
                                    }, 
                    
                                    { 
	 
	
	 

										"position": 4,
                    
                                        "type": "Wages", 
                    
                                        "currentFYComplaintsFiled": ComplaintTable[4].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYComplaintsPending": ComplaintTable[4].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYComplaintsRemarks": ComplaintTable[4].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYComplaintsFiled": ComplaintTable[4].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYComplaintsPending": ComplaintTable[4].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYComplaintsRemarks": ComplaintTable[4].getAggregation("cells")[6].getProperty("value") 
                    
                                    }, 
                    
                                    { 

	 
	
	 

										"position": 5,
                    
                                        "type": "Other human rights related issues", 
                    
                                        "currentFYComplaintsFiled": ComplaintTable[5].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "currentFYComplaintsPending": ComplaintTable[5].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "currentFYComplaintsRemarks": ComplaintTable[5].getAggregation("cells")[3].getProperty("value"), 
                    
                                        "previousFYComplaintsFiled": ComplaintTable[5].getAggregation("cells")[4].getProperty("value"), 
                    
                                        "previousFYComplaintsPending": ComplaintTable[5].getAggregation("cells")[5].getProperty("value"), 
                    
                                        "previousFYComplaintsRemarks": ComplaintTable[5].getAggregation("cells")[6].getProperty("value")
                    
                                    } 
                    
                                ] 
                    
                            }, 
                    
                            { 
                    
                                "principle": "5", 
                    
                                "indicator": "Essential", 
                    
                                "questionID": "10", 
                    
                                "principle5_essential_10": [ 
                    
                                    { 
	 
	
	 

										"position": 0,
                    
                                        "type": "Child labour", 
                    
                                        "percentage":AssessmentsTable[0].getAggregation("cells")[1].getProperty("value") 
                    
                                    }, 
                    
                                    { 
	 
	
	 

										"position": 1,
                    
                                        "type": "Forced/involuntary labour", 
                    
                                        "percentage": AssessmentsTable[1].getAggregation("cells")[1].getProperty("value") 
                    
                                    }, 
                    
                                    { 
	 
	
	 

										"position": 2,
                    
                                        "type": "Sexual harassment", 
                    
                                        "percentage": AssessmentsTable[2].getAggregation("cells")[1].getProperty("value")
                    
                                    }, 
                    
                                    { 
	 
	
	 

										"position": 3,
                    
                                        "type": "Discrimination at workplace", 
                    
                                        "percentage": AssessmentsTable[3].getAggregation("cells")[1].getProperty("value")
                    
                                    }, 
                    
                                    { 
	 
	
	 

										"position": 4,
                    
                                        "type": "Wages", 
                    
                                        "percentage": AssessmentsTable[4].getAggregation("cells")[1].getProperty("value") 
                    
                                    }, 
                    
                                    {
	 
	
	 

										"position": 5, 
                    
                                        "type": "Others – please specify", 
                    
                                        "percentage": AssessmentsTable[5].getAggregation("cells")[1].getProperty("value") 
                    
                                    } 
                    
                                ] 
                    
                            }, 
                    
                            { 
                    
                                "principle": "3", 
                    
                                "indicator": "Essential", 
                    
                                "questionID": "1c", 
                    
                                "principle3_essential_1c": [ 
                    
                                    { 
	
                    
                                        "type": "Cost incurred on well-being measures as a % of total revenue of the company", 
                    
                                        "valueForCurrentFinancialYear":SpendTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear":SpendTable[0].getAggregation("cells")[2].getProperty("value") 
                    
                                    } 
                    
                                ] 
                    
                            }, 
                    
                            { 
                    
                                "principle": "5", 
                    
                                "indicator": "Essential", 
                    
                                "questionID": "3b", 
                    
                                "principle5_essential_3b": [ 
                    
                                    { 
                    
                                        "type": "Gross wages paid to females as % of total wages", 
                    
                                        "valueForCurrentFinancialYear":GrossWageTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear":GrossWageTable[0].getAggregation("cells")[2].getProperty("value") 
                    
                                    } 
                    
                                ] 
                    
                            }, 
                    
                            { 
                    
                                "principle": "5", 
                    
                                "indicator": "Essential", 
                    
                                "questionID": "7", 
                    
                                "principle5_essential_7": [ 
                    
                                    { 
                     
	
	 

										"position": 0,

                                        "type": "Total Complaints reported under Sexual Harassment on of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH)", 
                    
                                        "valueForCurrentFinancialYear":CompFiledTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear":CompFiledTable[0].getAggregation("cells")[2].getProperty("value") 
                    
                                    }, 
                    
                                    { 
	 
	
	 

										"position": 1,
                    
                                        "type": "Complaints on POSH as a % of female employees / workers", 
                    
                                        "valueForCurrentFinancialYear": CompFiledTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear": CompFiledTable[1].getAggregation("cells")[2].getProperty("value")
                    
                                    }, 
                    
                                    {
	 
	
	 

										"position": 2, 
                    
                                        "type": "Complaints on POSH upheld", 
                    
                                        "valueForCurrentFinancialYear": CompFiledTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear": CompFiledTable[2].getAggregation("cells")[2].getProperty("value") 
                    
                                    } 
                    
                                ] 
                    
                            }, 
                    
                            { 
                    
                                "principle": "8", 
                    
                                "indicator": "Essential", 
                    
                                "questionID": "5", 
                    
                                "principle8_essential_5": [ 
                    
                                    { 
	 
	
	 

										"position": 0,
                    
                                        "location": "Rural", 
                    
                                        "valueForCurrentFinancialYear":JobCreationTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear": JobCreationTable[0].getAggregation("cells")[2].getProperty("value") 
                    
                                    }, 
                    
                                    { 
	 
	
	 

										"position": 1,
                    
                                        "location": "Semi-urban", 
                    
                                        "valueForCurrentFinancialYear": JobCreationTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear": JobCreationTable[1].getAggregation("cells")[2].getProperty("value") 
                    
                                    }, 
                    
                                    { 
	 
	
	 

										"position": 2,
                    
                                        "location": "Urban", 
                    
                                        "valueForCurrentFinancialYear": JobCreationTable[2].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear": JobCreationTable[2].getAggregation("cells")[2].getProperty("value") 
                    
                                    }, 
                    
                                    { 
	 
	
	 

										"position": 3,
                    
                                        "location": "Metropolitan", 
                    
                                        "valueForCurrentFinancialYear": JobCreationTable[3].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear": JobCreationTable[3].getAggregation("cells")[2].getProperty("value")
                    
                                    } 
                    
                                ] 
                    
                            } 
                    
                        ] 
                    
                    };
                    this.oDataModel.update("/qualitative_data(fiscalYear='2030',businessFunction='HR')", oPayload, {
                
                        success : function(oData){
                                MessageBox.show("Data Saved Successfully");
                                
                        },
        
                        error : function(oError){
                            MessageBox.show(oError);
                        }
                    
                    
                    
                    });

                    var workObj = { 

                            "definitionId": "eu10.sap-process-automation-q40kapza.zbrsrhr.zapproval_process_for_hr", 
                        
                            "context": { 
                        
                                "zbusiness_function": "HR", 
                        
                                "zfiscal_year": "2020", 
                        
                                "zhr_creator_email": "shriyansh.k@bristlecone.com", 
                        
                                "zhr_creator_name": "Shriyansh Keserwani", 
                        
                                "zhr_principle1_essential_1": [ 
                        
                                    { 
                        
                                        "segment": "Board of Directors", 
                        
                                        "numberOfTrainingPrograms": TableSegment[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "topicsCoveredUnderTraining": TableSegment[0].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "percentageOfPersonsInRespectiveCategory": TableSegment[0].getAggregation("cells")[3].getProperty("value")  
                        
                                    }, 
                        
                                    { 
                        
                                        "segment": "Key Managerial Personnel", 
                        
                                        "numberOfTrainingPrograms": TableSegment[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "topicsCoveredUnderTraining": TableSegment[1].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "percentageOfPersonsInRespectiveCategory": TableSegment[1].getAggregation("cells")[3].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "segment": "Employees other than BoD and KMPs", 
                        
                                        "numberOfTrainingPrograms": TableSegment[2].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "topicsCoveredUnderTraining": TableSegment[2].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "percentageOfPersonsInRespectiveCategory": TableSegment[2].getAggregation("cells")[3].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "segment": "Workers", 
                        
                                        "numberOfTrainingPrograms": TableSegment[3].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "topicsCoveredUnderTraining": TableSegment[3].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "percentageOfPersonsInRespectiveCategory": TableSegment[3].getAggregation("cells")[3].getProperty("value")  
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle3_essential_1a": [ 
                        
                                    { 
                        
                                        "type": "Permanent employees", 
                        
                                        "category": "Male", 
                        
                                        "total": PEmpTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "numberOfHealthInsurance": PEmpTable[0].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "percentageOfHealthInsurance": PEmpTable[0].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "numberOfAccidentInsurance": PEmpTable[0].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "percentageOfAccidentInsurance": PEmpTable[0].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "numberOfMaternityBenefits": PEmpTable[0].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "percentageOfMaternityBenefits": PEmpTable[0].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "numberOfPaternityBenefits": PEmpTable[0].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "percentageOfPaternityBenefits": PEmpTable[0].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "numberOfDayCareFacilities": PEmpTable[0].getAggregation("cells")[10].getProperty("value"), 
                        
                                        "percentageOfDayCareFacilities": PEmpTable[0].getAggregation("cells")[11].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Permanent employees", 
                        
                                        "category": "Female", 
                        
                                        "total": PEmpTable[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "numberOfHealthInsurance": PEmpTable[1].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "percentageOfHealthInsurance": PEmpTable[1].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "numberOfAccidentInsurance": PEmpTable[1].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "percentageOfAccidentInsurance": PEmpTable[1].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "numberOfMaternityBenefits": PEmpTable[1].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "percentageOfMaternityBenefits": PEmpTable[1].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "numberOfPaternityBenefits": PEmpTable[1].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "percentageOfPaternityBenefits": PEmpTable[1].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "numberOfDayCareFacilities": PEmpTable[1].getAggregation("cells")[10].getProperty("value"), 
                        
                                        "percentageOfDayCareFacilities": PEmpTable[1].getAggregation("cells")[11].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Permanent employees", 
                        
                                        "category": "Total", 
                        
                                        "total": PEmpTable[2].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "numberOfHealthInsurance": PEmpTable[2].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "percentageOfHealthInsurance": PEmpTable[2].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "numberOfAccidentInsurance": PEmpTable[2].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "percentageOfAccidentInsurance": PEmpTable[2].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "numberOfMaternityBenefits": PEmpTable[2].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "percentageOfMaternityBenefits": PEmpTable[2].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "numberOfPaternityBenefits": PEmpTable[2].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "percentageOfPaternityBenefits": PEmpTable[2].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "numberOfDayCareFacilities": PEmpTable[2].getAggregation("cells")[10].getProperty("value"), 
                        
                                        "percentageOfDayCareFacilities": PEmpTable[2].getAggregation("cells")[11].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Other than Permanent employees", 
                        
                                        "category": "Male", 
                        
                                        "total": NPEmpTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "numberOfHealthInsurance": NPEmpTable[0].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "percentageOfHealthInsurance": NPEmpTable[0].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "numberOfAccidentInsurance": NPEmpTable[0].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "percentageOfAccidentInsurance": NPEmpTable[0].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "numberOfMaternityBenefits": NPEmpTable[0].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "percentageOfMaternityBenefits": NPEmpTable[0].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "numberOfPaternityBenefits": NPEmpTable[0].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "percentageOfPaternityBenefits": NPEmpTable[0].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "numberOfDayCareFacilities": NPEmpTable[0].getAggregation("cells")[10].getProperty("value"), 
                        
                                        "percentageOfDayCareFacilities": NPEmpTable[0].getAggregation("cells")[11].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Other than Permanent employees", 
                        
                                        "category": "Female", 
                        
                                        "total": NPEmpTable[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "numberOfHealthInsurance": NPEmpTable[1].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "percentageOfHealthInsurance": NPEmpTable[1].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "numberOfAccidentInsurance": NPEmpTable[1].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "percentageOfAccidentInsurance": NPEmpTable[1].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "numberOfMaternityBenefits": NPEmpTable[1].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "percentageOfMaternityBenefits": NPEmpTable[1].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "numberOfPaternityBenefits": NPEmpTable[1].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "percentageOfPaternityBenefits": NPEmpTable[1].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "numberOfDayCareFacilities": NPEmpTable[1].getAggregation("cells")[10].getProperty("value"), 
                        
                                        "percentageOfDayCareFacilities": NPEmpTable[1].getAggregation("cells")[11].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Other than Permanent employees", 
                        
                                        "category": "Total", 
                        
                                        "total": NPEmpTable[2].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "numberOfHealthInsurance": NPEmpTable[2].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "percentageOfHealthInsurance": NPEmpTable[2].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "numberOfAccidentInsurance": NPEmpTable[2].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "percentageOfAccidentInsurance": NPEmpTable[2].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "numberOfMaternityBenefits": NPEmpTable[2].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "percentageOfMaternityBenefits": NPEmpTable[2].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "numberOfPaternityBenefits": NPEmpTable[2].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "percentageOfPaternityBenefits": NPEmpTable[2].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "numberOfDayCareFacilities": NPEmpTable[2].getAggregation("cells")[10].getProperty("value"), 
                        
                                        "percentageOfDayCareFacilities": NPEmpTable[2].getAggregation("cells")[11].getProperty("value") 
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle3_essential_1b": [ 
                        
                                    { 
                        
                                        "type": "Permanent workers", 
                        
                                        "category": "Male", 
                        
                                        "total": WorkerTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "numberOfHealthInsurance": WorkerTable[0].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "percentageOfHealthInsurance": WorkerTable[0].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "numberOfAccidentInsurance": WorkerTable[0].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "percentageOfAccidentInsurance": WorkerTable[0].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "numberOfMaternityBenefits": WorkerTable[0].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "percentageOfMaternityBenefits": WorkerTable[0].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "numberOfPaternityBenefits": WorkerTable[0].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "percentageOfPaternityBenefits": WorkerTable[0].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "numberOfDayCareFacilities": WorkerTable[0].getAggregation("cells")[10].getProperty("value"), 
                        
                                        "percentageOfDayCareFacilities": WorkerTable[0].getAggregation("cells")[11].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Permanent workers", 
                        
                                        "category": "Female", 
                        
                                        "total": WorkerTable[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "numberOfHealthInsurance": WorkerTable[1].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "percentageOfHealthInsurance": WorkerTable[1].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "numberOfAccidentInsurance": WorkerTable[1].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "percentageOfAccidentInsurance": WorkerTable[1].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "numberOfMaternityBenefits": WorkerTable[1].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "percentageOfMaternityBenefits": WorkerTable[1].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "numberOfPaternityBenefits": WorkerTable[1].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "percentageOfPaternityBenefits": WorkerTable[1].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "numberOfDayCareFacilities": WorkerTable[1].getAggregation("cells")[10].getProperty("value"), 
                        
                                        "percentageOfDayCareFacilities": WorkerTable[1].getAggregation("cells")[11].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Permanent workers", 
                        
                                        "category": "Total", 
                        
                                        "total": WorkerTable[2].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "numberOfHealthInsurance": WorkerTable[2].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "percentageOfHealthInsurance": WorkerTable[2].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "numberOfAccidentInsurance": WorkerTable[2].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "percentageOfAccidentInsurance": WorkerTable[2].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "numberOfMaternityBenefits": WorkerTable[2].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "percentageOfMaternityBenefits": WorkerTable[2].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "numberOfPaternityBenefits": WorkerTable[2].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "percentageOfPaternityBenefits": WorkerTable[2].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "numberOfDayCareFacilities": WorkerTable[2].getAggregation("cells")[10].getProperty("value"), 
                        
                                        "percentageOfDayCareFacilities": WorkerTable[2].getAggregation("cells")[11].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Other than Permanent workers", 
                        
                                        "category": "Male", 
                        
                                        "total": NonWorkerTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "numberOfHealthInsurance": NonWorkerTable[0].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "percentageOfHealthInsurance": NonWorkerTable[0].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "numberOfAccidentInsurance": NonWorkerTable[0].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "percentageOfAccidentInsurance": NonWorkerTable[0].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "numberOfMaternityBenefits": NonWorkerTable[0].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "percentageOfMaternityBenefits": NonWorkerTable[0].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "numberOfPaternityBenefits": NonWorkerTable[0].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "percentageOfPaternityBenefits": NonWorkerTable[0].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "numberOfDayCareFacilities": NonWorkerTable[0].getAggregation("cells")[10].getProperty("value"), 
                        
                                        "percentageOfDayCareFacilities": NonWorkerTable[0].getAggregation("cells")[11].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Other than Permanent workers", 
                        
                                        "category": "Female", 
                        
                                        "total": NonWorkerTable[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "numberOfHealthInsurance": NonWorkerTable[1].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "percentageOfHealthInsurance": NonWorkerTable[1].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "numberOfAccidentInsurance": NonWorkerTable[1].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "percentageOfAccidentInsurance": NonWorkerTable[1].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "numberOfMaternityBenefits": NonWorkerTable[1].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "percentageOfMaternityBenefits": NonWorkerTable[1].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "numberOfPaternityBenefits": NonWorkerTable[1].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "percentageOfPaternityBenefits": NonWorkerTable[1].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "numberOfDayCareFacilities": NonWorkerTable[1].getAggregation("cells")[10].getProperty("value"), 
                        
                                        "percentageOfDayCareFacilities": NonWorkerTable[1].getAggregation("cells")[11].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Other than Permanent workers", 
                        
                                        "category": "Total", 
                        
                                        "total":  NonWorkerTable[2].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "numberOfHealthInsurance":  NonWorkerTable[2].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "percentageOfHealthInsurance":  NonWorkerTable[2].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "numberOfAccidentInsurance":  NonWorkerTable[2].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "percentageOfAccidentInsurance":  NonWorkerTable[2].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "numberOfMaternityBenefits":  NonWorkerTable[2].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "percentageOfMaternityBenefits":  NonWorkerTable[2].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "numberOfPaternityBenefits":  NonWorkerTable[2].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "percentageOfPaternityBenefits":  NonWorkerTable[2].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "numberOfDayCareFacilities":  NonWorkerTable[2].getAggregation("cells")[10].getProperty("value"), 
                        
                                        "percentageOfDayCareFacilities":  NonWorkerTable[2].getAggregation("cells")[11].getProperty("value")
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle3_essential_2": [ 
                        
                                    { 
                        
                                        "benefits": "PF", 
                        
                                        "currentFYEmployees": RetireBenfTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYWorkers": RetireBenfTable[0].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYauthority": RetireBenfTable[0].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYEmployees": RetireBenfTable[0].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYWorkers": RetireBenfTable[0].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYauthority": RetireBenfTable[0].getAggregation("cells")[6].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "benefits": "Gratuity", 
                        
                                        "currentFYEmployees": RetireBenfTable[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYWorkers": RetireBenfTable[1].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYauthority": RetireBenfTable[1].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYEmployees": RetireBenfTable[1].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYWorkers": RetireBenfTable[1].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYauthority": RetireBenfTable[1].getAggregation("cells")[6].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "benefits": "ESI", 
                        
                                        "currentFYEmployees": RetireBenfTable[2].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYWorkers": RetireBenfTable[2].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYauthority": RetireBenfTable[2].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYEmployees": RetireBenfTable[2].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYWorkers": RetireBenfTable[2].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYauthority": RetireBenfTable[2].getAggregation("cells")[6].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "benefits": "Others – please specify", 
                        
                                        "currentFYEmployees": RetireBenfTable[3].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYWorkers": RetireBenfTable[3].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYauthority": RetireBenfTable[3].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYEmployees": RetireBenfTable[3].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYWorkers":RetireBenfTable[3].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYauthority": RetireBenfTable[3].getAggregation("cells")[6].getProperty("value") 
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle3_essential_5": [ 
                        
                                    { 
                        
                                        "gender": "Male", 
                        
                                        "permanentEmployeesReturnToWorkRate": RateofWorkAndLeaveTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "permanentEmployeesRetentionRate": RateofWorkAndLeaveTable[0].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "permanentWorkersReturnToWorkRate": RateofWorkAndLeaveTable[0].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "permanentWorkersRetentionRate": RateofWorkAndLeaveTable[0].getAggregation("cells")[4].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "gender": "Female", 
                        
                                        "permanentEmployeesReturnToWorkRate": RateofWorkAndLeaveTable[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "permanentEmployeesRetentionRate": RateofWorkAndLeaveTable[1].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "permanentWorkersReturnToWorkRate": RateofWorkAndLeaveTable[1].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "permanentWorkersRetentionRate": RateofWorkAndLeaveTable[1].getAggregation("cells")[4].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "gender": "Total", 
                        
                                        "permanentEmployeesReturnToWorkRate": RateofWorkAndLeaveTable[2].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "permanentEmployeesRetentionRate": RateofWorkAndLeaveTable[2].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "permanentWorkersReturnToWorkRate": RateofWorkAndLeaveTable[2].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "permanentWorkersRetentionRate": RateofWorkAndLeaveTable[2].getAggregation("cells")[4].getProperty("value") 
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle3_essential_7": [ 
                        
                                    { 
                        
                                        "type": " Total Permanent Employees", 
                        
                                        "category": "Male", 
                        
                                        "currentFYTotalEmployees": MembershipEmpTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYTotalEmployeesPartOfUnions": MembershipEmpTable[0].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentage": MembershipEmpTable[0].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYTotalEmployees": MembershipEmpTable[0].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYTotalEmployeesPartOfUnions": MembershipEmpTable[0].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYPercentage": MembershipEmpTable[0].getAggregation("cells")[6].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "type": " Total Permanent Employees", 
                        
                                        "category": "Female", 
                        
                                        "currentFYTotalEmployees": MembershipEmpTable[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYTotalEmployeesPartOfUnions": MembershipEmpTable[1].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentage": MembershipEmpTable[1].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYTotalEmployees": MembershipEmpTable[1].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYTotalEmployeesPartOfUnions": MembershipEmpTable[1].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYPercentage": MembershipEmpTable[1].getAggregation("cells")[6].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": " Total Permanent Workers", 
                        
                                        "category": "Male", 
                        
                                        "currentFYTotalEmployees": MembershipWorTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYTotalEmployeesPartOfUnions": MembershipWorTable[0].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentage": MembershipWorTable[0].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYTotalEmployees": MembershipWorTable[0].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYTotalEmployeesPartOfUnions": MembershipWorTable[0].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYPercentage": MembershipWorTable[0].getAggregation("cells")[6].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "type": " Total Permanent Workers", 
                        
                                        "category": "Female", 
                        
                                        "currentFYTotalEmployees": MembershipWorTable[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYTotalEmployeesPartOfUnions": MembershipWorTable[1].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentage": MembershipWorTable[1].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYTotalEmployees": MembershipWorTable[1].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYTotalEmployeesPartOfUnions": MembershipWorTable[1].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYPercentage": MembershipWorTable[1].getAggregation("cells")[6].getProperty("value") 
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle3_essential_8": [ 
                        
                                    { 
                        
                                        "type": "Employees", 
                        
                                        "category": "Male", 
                        
                                        "currentFYTotal":  PEmpTrainingTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumberHealthSafetyMeasures":  PEmpTrainingTable[0].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentageHealthSafetyMeasures":  PEmpTrainingTable[0].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "currentFYNumberSkillUpgradation":  PEmpTrainingTable[0].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "currentFYPercentageSkillUpgradation":  PEmpTrainingTable[0].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYTotal":  PEmpTrainingTable[0].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "previousFYNumberHealthSafetyMeasures":  PEmpTrainingTable[0].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "previousFYPercentageHealthSafetyMeasures":  PEmpTrainingTable[0].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "previousFYNumberSkillUpgradation":  PEmpTrainingTable[0].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "previousFYPercentageSkillUpgradation":  PEmpTrainingTable[0].getAggregation("cells")[10].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Employees", 
                        
                                        "category": "Female", 
                        
                                        "currentFYTotal": PEmpTrainingTable[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumberHealthSafetyMeasures": PEmpTrainingTable[1].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentageHealthSafetyMeasures": PEmpTrainingTable[1].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "currentFYNumberSkillUpgradation": PEmpTrainingTable[1].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "currentFYPercentageSkillUpgradation": PEmpTrainingTable[1].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYTotal": PEmpTrainingTable[1].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "previousFYNumberHealthSafetyMeasures": PEmpTrainingTable[1].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "previousFYPercentageHealthSafetyMeasures": PEmpTrainingTable[1].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "previousFYNumberSkillUpgradation": PEmpTrainingTable[1].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "previousFYPercentageSkillUpgradation": PEmpTrainingTable[1].getAggregation("cells")[10].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Employees", 
                        
                                        "category": "Total", 
                        
                                        "currentFYTotal": PEmpTrainingTable[2].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumberHealthSafetyMeasures": PEmpTrainingTable[2].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentageHealthSafetyMeasures": PEmpTrainingTable[2].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "currentFYNumberSkillUpgradation": PEmpTrainingTable[2].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "currentFYPercentageSkillUpgradation": PEmpTrainingTable[2].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYTotal": PEmpTrainingTable[2].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "previousFYNumberHealthSafetyMeasures": PEmpTrainingTable[2].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "previousFYPercentageHealthSafetyMeasures": PEmpTrainingTable[2].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "previousFYNumberSkillUpgradation": PEmpTrainingTable[2].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "previousFYPercentageSkillUpgradation": PEmpTrainingTable[2].getAggregation("cells")[10].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Workers", 
                        
                                        "category": "Male", 
                        
                                        "currentFYTotal":WorkTrainingTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumberHealthSafetyMeasures": WorkTrainingTable[0].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentageHealthSafetyMeasures": WorkTrainingTable[0].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "currentFYNumberSkillUpgradation": WorkTrainingTable[0].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "currentFYPercentageSkillUpgradation": WorkTrainingTable[0].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYTotal": WorkTrainingTable[0].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "previousFYNumberHealthSafetyMeasures": WorkTrainingTable[0].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "previousFYPercentageHealthSafetyMeasures": WorkTrainingTable[0].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "previousFYNumberSkillUpgradation": WorkTrainingTable[0].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "previousFYPercentageSkillUpgradation": WorkTrainingTable[0].getAggregation("cells")[10].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Workers", 
                        
                                        "category": "Female", 
                        
                                        "currentFYTotal": WorkTrainingTable[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumberHealthSafetyMeasures": WorkTrainingTable[1].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentageHealthSafetyMeasures": WorkTrainingTable[1].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "currentFYNumberSkillUpgradation": WorkTrainingTable[1].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "currentFYPercentageSkillUpgradation": WorkTrainingTable[1].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYTotal": WorkTrainingTable[1].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "previousFYNumberHealthSafetyMeasures":WorkTrainingTable[1].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "previousFYPercentageHealthSafetyMeasures": WorkTrainingTable[1].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "previousFYNumberSkillUpgradation": WorkTrainingTable[1].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "previousFYPercentageSkillUpgradation": WorkTrainingTable[1].getAggregation("cells")[10].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Workers", 
                        
                                        "category": "Total", 
                        
                                        "currentFYTotal": WorkTrainingTable[2].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumberHealthSafetyMeasures": WorkTrainingTable[2].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentageHealthSafetyMeasures": WorkTrainingTable[2].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "currentFYNumberSkillUpgradation": WorkTrainingTable[2].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "currentFYPercentageSkillUpgradation": WorkTrainingTable[2].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYTotal": WorkTrainingTable[2].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "previousFYNumberHealthSafetyMeasures": WorkTrainingTable[2].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "previousFYPercentageHealthSafetyMeasures": WorkTrainingTable[2].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "previousFYNumberSkillUpgradation": WorkTrainingTable[2].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "previousFYPercentageSkillUpgradation":WorkTrainingTable[2].getAggregation("cells")[10].getProperty("value") 
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle3_essential_9": [ 
                        
                                    { 
                        
                                        "type": "Employees", 
                        
                                        "category": "Male", 
                        
                                        "currentFYTotal": PerEmpTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumber": PerEmpTable[0].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentage": PerEmpTable[0].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYTotal": PerEmpTable[0].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYNumber": PerEmpTable[0].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYPercentage": PerEmpTable[0].getAggregation("cells")[6].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Employees", 
                        
                                        "category": "Female", 
                        
                                        "currentFYTotal": PerEmpTable[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumber": PerEmpTable[1].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentage": PerEmpTable[1].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYTotal": PerEmpTable[1].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYNumber": PerEmpTable[1].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYPercentage": PerEmpTable[1].getAggregation("cells")[6].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Employees", 
                        
                                        "category": "Total", 
                        
                                        "currentFYTotal": PerEmpTable[2].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumber": PerEmpTable[2].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentage": PerEmpTable[2].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYTotal": PerEmpTable[2].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYNumber": PerEmpTable[2].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYPercentage": PerEmpTable[2].getAggregation("cells")[6].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Workers", 
                        
                                        "category": "Male", 
                        
                                        "currentFYTotal": PerWorkTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumber": PerWorkTable[0].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentage": PerWorkTable[0].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYTotal": PerWorkTable[0].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYNumber": PerWorkTable[0].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYPercentage": PerWorkTable[0].getAggregation("cells")[6].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Workers", 
                        
                                        "category": "Female", 
                        
                                        "currentFYTotal": PerWorkTable[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumber": PerWorkTable[1].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentage": PerWorkTable[1].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYTotal": PerWorkTable[1].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYNumber": PerWorkTable[1].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYPercentage": PerWorkTable[1].getAggregation("cells")[6].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Workers", 
                        
                                        "category": "Total", 
                        
                                        "currentFYTotal": PerWorkTable[2].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumber": PerWorkTable[2].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentage": PerWorkTable[2].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYTotal": PerWorkTable[2].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYNumber": PerWorkTable[2].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYPercentage": PerWorkTable[2].getAggregation("cells")[6].getProperty("value")
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle5_essential_1": [ 
                        
                                    { 
                        
                                        "type": "Employees", 
                        
                                        "category": "Permanent", 
                        
                                        "currentFYTotal": EmpHumanRightTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumber": EmpHumanRightTable[0].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentage": EmpHumanRightTable[0].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYTotal": EmpHumanRightTable[0].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYNumber": EmpHumanRightTable[0].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYPercentage": EmpHumanRightTable[0].getAggregation("cells")[6].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Employees", 
                        
                                        "category": "Other than permanent", 
                        
                                        "currentFYTotal": EmpHumanRightTable[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumber": EmpHumanRightTable[1].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentage": EmpHumanRightTable[1].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYTotal": EmpHumanRightTable[1].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYNumber": EmpHumanRightTable[1].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYPercentage": EmpHumanRightTable[1].getAggregation("cells")[6].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Employees", 
                        
                                        "category": "Total Employees", 
                        
                                        "currentFYTotal": EmpHumanRightTable[2].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumber": EmpHumanRightTable[2].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentage": EmpHumanRightTable[2].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYTotal": EmpHumanRightTable[2].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYNumber": EmpHumanRightTable[2].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYPercentage": EmpHumanRightTable[2].getAggregation("cells")[6].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Workers", 
                        
                                        "category": "Permanent", 
                        
                                        "currentFYTotal": WorkHumanRightTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumber": WorkHumanRightTable[0].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentage": WorkHumanRightTable[0].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYTotal": WorkHumanRightTable[0].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYNumber": WorkHumanRightTable[0].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYPercentage": WorkHumanRightTable[0].getAggregation("cells")[6].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Workers", 
                        
                                        "category": "Other than permanent", 
                        
                                        "currentFYTotal": WorkHumanRightTable[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumber": WorkHumanRightTable[1].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentage": WorkHumanRightTable[1].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYTotal": WorkHumanRightTable[1].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYNumber": WorkHumanRightTable[1].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYPercentage": WorkHumanRightTable[1].getAggregation("cells")[6].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Workers", 
                        
                                        "category": "Total Workers", 
                        
                                        "currentFYTotal": WorkHumanRightTable[2].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumber": WorkHumanRightTable[2].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentage": WorkHumanRightTable[2].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYTotal": WorkHumanRightTable[2].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYNumber": WorkHumanRightTable[2].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYPercentage": WorkHumanRightTable[2].getAggregation("cells")[6].getProperty("value") 
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle5_essential_2": [ 
                        
                                    { 
                        
                                        "type": "Employees", 
                        
                                        "subType": "Permanent", 
                        
                                        "category": "Male", 
                        
                                        "currentFYTotal": PEmpWageTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumberEqualToMinimumWage": PEmpWageTable[0].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentageEqualToMinimumWage": PEmpWageTable[0].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "currentFYNumberMoreThanMinimumWage": PEmpWageTable[0].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "currentFYPercentageMoreThanMinimumWage": PEmpWageTable[0].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYTotal": PEmpWageTable[0].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "previousFYNumberEqualToMinimumWage": PEmpWageTable[0].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "previousFYPercentageEqualToMinimumWage": PEmpWageTable[0].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "previousFYNumberMoreThanMinimumWage": PEmpWageTable[0].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "previousFYPercentageMoreThanMinimumWage": PEmpWageTable[0].getAggregation("cells")[10].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Workers", 
                        
                                        "subType": "Permanent", 
                        
                                        "category": "Male", 
                        
                                        "currentFYTotal": WorkWageTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumberEqualToMinimumWage": WorkWageTable[0].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentageEqualToMinimumWage": WorkWageTable[0].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "currentFYNumberMoreThanMinimumWage": WorkWageTable[0].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "currentFYPercentageMoreThanMinimumWage": WorkWageTable[0].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYTotal": WorkWageTable[0].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "previousFYNumberEqualToMinimumWage": WorkWageTable[0].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "previousFYPercentageEqualToMinimumWage": WorkWageTable[0].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "previousFYNumberMoreThanMinimumWage": WorkWageTable[0].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "previousFYPercentageMoreThanMinimumWage": WorkWageTable[0].getAggregation("cells")[10].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Employees", 
                        
                                        "subType": "Other than Permanent", 
                        
                                        "category": "Female", 
                        
                                        "currentFYTotal": PEmpWageTable[3].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumberEqualToMinimumWage": PEmpWageTable[3].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentageEqualToMinimumWage": PEmpWageTable[3].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "currentFYNumberMoreThanMinimumWage": PEmpWageTable[3].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "currentFYPercentageMoreThanMinimumWage": PEmpWageTable[3].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYTotal": PEmpWageTable[3].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "previousFYNumberEqualToMinimumWage": PEmpWageTable[3].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "previousFYPercentageEqualToMinimumWage": PEmpWageTable[3].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "previousFYNumberMoreThanMinimumWage": PEmpWageTable[3].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "previousFYPercentageMoreThanMinimumWage": PEmpWageTable[3].getAggregation("cells")[10].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Employees", 
                        
                                        "subType": "Other than Permanent", 
                        
                                        "category": "Male", 
                        
                                        "currentFYTotal": PEmpWageTable[2].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumberEqualToMinimumWage": PEmpWageTable[2].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentageEqualToMinimumWage": PEmpWageTable[2].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "currentFYNumberMoreThanMinimumWage": PEmpWageTable[2].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "currentFYPercentageMoreThanMinimumWage": PEmpWageTable[2].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYTotal": PEmpWageTable[2].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "previousFYNumberEqualToMinimumWage": PEmpWageTable[2].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "previousFYPercentageEqualToMinimumWage": PEmpWageTable[2].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "previousFYNumberMoreThanMinimumWage": PEmpWageTable[2].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "previousFYPercentageMoreThanMinimumWage": PEmpWageTable[2].getAggregation("cells")[10].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Employees", 
                        
                                        "subType": "Permanent", 
                        
                                        "category": "Female", 
                        
                                        "currentFYTotal": PEmpWageTable[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumberEqualToMinimumWage": PEmpWageTable[1].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentageEqualToMinimumWage": PEmpWageTable[1].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "currentFYNumberMoreThanMinimumWage": PEmpWageTable[1].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "currentFYPercentageMoreThanMinimumWage": PEmpWageTable[1].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYTotal": PEmpWageTable[1].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "previousFYNumberEqualToMinimumWage":PEmpWageTable[1].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "previousFYPercentageEqualToMinimumWage": PEmpWageTable[1].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "previousFYNumberMoreThanMinimumWage": PEmpWageTable[1].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "previousFYPercentageMoreThanMinimumWage": PEmpWageTable[1].getAggregation("cells")[10].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Workers", 
                        
                                        "subType": "Permanent", 
                        
                                        "category": "Female", 
                        
                                        "currentFYTotal": WorkWageTable[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumberEqualToMinimumWage": WorkWageTable[1].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentageEqualToMinimumWage": WorkWageTable[1].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "currentFYNumberMoreThanMinimumWage": WorkWageTable[1].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "currentFYPercentageMoreThanMinimumWage": WorkWageTable[1].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYTotal": WorkWageTable[1].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "previousFYNumberEqualToMinimumWage":WorkWageTable[1].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "previousFYPercentageEqualToMinimumWage": WorkWageTable[1].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "previousFYNumberMoreThanMinimumWage": WorkWageTable[1].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "previousFYPercentageMoreThanMinimumWage": WorkWageTable[1].getAggregation("cells")[10].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Workers", 
                        
                                        "subType": "Other than Permanent", 
                        
                                        "category": "Male", 
                        
                                        "currentFYTotal": WorkWageTable[2].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumberEqualToMinimumWage": WorkWageTable[2].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYPercentageEqualToMinimumWage": WorkWageTable[2].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "currentFYNumberMoreThanMinimumWage": WorkWageTable[2].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "currentFYPercentageMoreThanMinimumWage": WorkWageTable[2].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYTotal": WorkWageTable[2].getAggregation("cells")[6].getProperty("value"), 
                        
                                        "previousFYNumberEqualToMinimumWage": WorkWageTable[2].getAggregation("cells")[7].getProperty("value"), 
                        
                                        "previousFYPercentageEqualToMinimumWage": WorkWageTable[2].getAggregation("cells")[8].getProperty("value"), 
                        
                                        "previousFYNumberMoreThanMinimumWage": WorkWageTable[2].getAggregation("cells")[9].getProperty("value"), 
                        
                                        "previousFYPercentageMoreThanMinimumWage": WorkWageTable[2].getAggregation("cells")[10].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Workers", 
                        
                                        "subType": "Other than Permanent", 
                        
                                        "category": "Female", 
                        
                                        "currentFYTotal": WorkWageTable[3].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumberEqualToMinimumWage": WorkWageTable[3].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYPercentageEqualToMinimumWage": WorkWageTable[3].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYNumberMoreThanMinimumWage": WorkWageTable[3].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYPercentageMoreThanMinimumWage": WorkWageTable[3].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "previousFYTotal": WorkWageTable[3].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "previousFYNumberEqualToMinimumWage": WorkWageTable[3].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "previousFYPercentageEqualToMinimumWage": WorkWageTable[3].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "previousFYNumberMoreThanMinimumWage": WorkWageTable[3].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "previousFYPercentageMoreThanMinimumWage": WorkWageTable[3].getAggregation("cells")[1].getProperty("value") 
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle5_essential_3": [ 
                        
                                    { 
                        
                                        "type": "Board of Directors (BoD)", 
                        
                                        "maleNumber":  WageTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "maleMedianRemuneration":  WageTable[0].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "femaleNumber":  WageTable[0].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "femaleMedianRemuneration":  WageTable[0].getAggregation("cells")[4].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Key Managerial Personnel", 
                        
                                        "maleNumber": WageTable[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "maleMedianRemuneration": WageTable[1].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "femaleNumber": WageTable[1].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "femaleMedianRemuneration": WageTable[1].getAggregation("cells")[4].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Employees other than BoD and KMP", 
                        
                                        "maleNumber": WageTable[2].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "maleMedianRemuneration": WageTable[2].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "femaleNumber": WageTable[2].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "femaleMedianRemuneration":WageTable[2].getAggregation("cells")[4].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Workers", 
                        
                                        "maleNumber": WageTable[3].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "maleMedianRemuneration": WageTable[3].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "femaleNumber": WageTable[3].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "femaleMedianRemuneration": WageTable[3].getAggregation("cells")[1].getProperty("value") 
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle5_essential_6": [ 
                        
                                    { 
                        
                                        "type": "Sexual Harassment", 
                        
                                        "currentFYComplaintsFiled": ComplaintTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYComplaintsPending": ComplaintTable[0].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYComplaintsRemarks": ComplaintTable[0].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYComplaintsFiled": ComplaintTable[0].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYComplaintsPending": ComplaintTable[0].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYComplaintsRemarks": ComplaintTable[0].getAggregation("cells")[6].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Discrimination at workplace", 
                        
                                        "currentFYComplaintsFiled": ComplaintTable[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYComplaintsPending": ComplaintTable[1].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYComplaintsRemarks": ComplaintTable[1].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYComplaintsFiled": ComplaintTable[1].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYComplaintsPending": ComplaintTable[1].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYComplaintsRemarks": ComplaintTable[1].getAggregation("cells")[6].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Child Labour", 
                        
                                        "currentFYComplaintsFiled": ComplaintTable[2].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYComplaintsPending": ComplaintTable[2].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYComplaintsRemarks": ComplaintTable[2].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYComplaintsFiled": ComplaintTable[2].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYComplaintsPending":ComplaintTable[2].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYComplaintsRemarks": ComplaintTable[2].getAggregation("cells")[6].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Forced Labour/Involuntary Labour", 
                        
                                        "currentFYComplaintsFiled": ComplaintTable[3].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYComplaintsPending": ComplaintTable[3].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYComplaintsRemarks": ComplaintTable[3].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYComplaintsFiled": ComplaintTable[3].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYComplaintsPending": ComplaintTable[3].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYComplaintsRemarks": ComplaintTable[3].getAggregation("cells")[6].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Wages", 
                        
                                        "currentFYComplaintsFiled": ComplaintTable[4].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYComplaintsPending": ComplaintTable[4].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYComplaintsRemarks": ComplaintTable[4].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYComplaintsFiled": ComplaintTable[4].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYComplaintsPending": ComplaintTable[4].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYComplaintsRemarks": ComplaintTable[4].getAggregation("cells")[6].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Other human rights related issues", 
                        
                                        "currentFYComplaintsFiled":ComplaintTable[5].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "currentFYComplaintsPending": ComplaintTable[5].getAggregation("cells")[2].getProperty("value"), 
                        
                                        "currentFYComplaintsRemarks": ComplaintTable[5].getAggregation("cells")[3].getProperty("value"), 
                        
                                        "previousFYComplaintsFiled": ComplaintTable[5].getAggregation("cells")[4].getProperty("value"), 
                        
                                        "previousFYComplaintsPending": ComplaintTable[5].getAggregation("cells")[5].getProperty("value"), 
                        
                                        "previousFYComplaintsRemarks": ComplaintTable[5].getAggregation("cells")[6].getProperty("value")
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle5_essential_10": [ 
                        
                                    { 
                        
                                        "type": "Child labour", 
                        
                                        "percentage": AssessmentsTable[0].getAggregation("cells")[1].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Forced/involuntary labour", 
                        
                                        "percentage": AssessmentsTable[1].getAggregation("cells")[1].getProperty("value") 
                     
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Sexual harassment", 
                        
                                        "percentage": AssessmentsTable[2].getAggregation("cells")[1].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Discrimination at workplace", 
                        
                                        "percentage": AssessmentsTable[3].getAggregation("cells")[1].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Wages", 
                        
                                        "percentage": AssessmentsTable[4].getAggregation("cells")[1].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Others – please specify", 
                        
                                        "percentage": AssessmentsTable[5].getAggregation("cells")[1].getProperty("value") 
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle8_essential_5": [ 
                        
                                    { 
                        
                                        "location": "Rural", 
                        
                                        "valueForCurrentFinancialYear":JobCreationTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "valueForPreviousFinancialYear": JobCreationTable[0].getAggregation("cells")[2].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "location": "Semi-urban", 
                        
                                        "valueForCurrentFinancialYear": JobCreationTable[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "valueForPreviousFinancialYear": JobCreationTable[1].getAggregation("cells")[2].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "location": "Urban", 
                        
                                        "valueForCurrentFinancialYear":  JobCreationTable[2].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "valueForPreviousFinancialYear":  JobCreationTable[2].getAggregation("cells")[2].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "location": "Metropolitan", 
                        
                                        "valueForCurrentFinancialYear": JobCreationTable[3].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "valueForPreviousFinancialYear": JobCreationTable[3].getAggregation("cells")[2].getProperty("value") 
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle5_essential_3b": [ 
                        
                                    { 
                        
                                        "type": "Gross wages paid to females as % of total wages", 
                        
                                        "valueForCurrentFinancialYear": GrossWageTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "valueForPreviousFinancialYear": GrossWageTable[0].getAggregation("cells")[2].getProperty("value") 
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle3_essential_1c": [ 
                        
                                    { 
                        
                                        "type": "Cost incurred on well-being measures as a % of total revenue of the company", 
                        
                                        "valueForCurrentFinancialYear": SpendTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "valueForPreviousFinancialYear": SpendTable[0].getAggregation("cells")[1].getProperty("value")
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle5_essential_7": [ 
                        
                                    { 
                        
                                        "type": "Total Complaints reported under Sexual Harassment on of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH)", 
                        
                                        "valueForCurrentFinancialYear": CompFiledTable[0].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "valueForPreviousFinancialYear":CompFiledTable[0].getAggregation("cells")[2].getProperty("value")
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Complaints on POSH as a % of female employees / workers", 
                        
                                        "valueForCurrentFinancialYear": CompFiledTable[1].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "valueForPreviousFinancialYear": CompFiledTable[1].getAggregation("cells")[2].getProperty("value") 
                        
                                    }, 
                        
                                    { 
                        
                                        "type": "Complaints on POSH upheld", 
                        
                                        "valueForCurrentFinancialYear": CompFiledTable[2].getAggregation("cells")[1].getProperty("value"), 
                        
                                        "valueForPreviousFinancialYear": CompFiledTable[2].getAggregation("cells")[2].getProperty("value") 
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle3_essential_6": [ 
                        
                                    { 
                        
                                        "permanent_workers": "", 
                        
                                        "other_than_permanent_workers": "", 
                        
                                        "permanent_employees": "", 
                        
                                        "other_than_permanent_employees": "" 
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle8_essential_1": [ 
                        
                                    { 
                        
                                        "name_brief_details_of_project": "", 
                        
                                        "sia_notification_no": "", 
                        
                                        "date": "", 
                        
                                        "conducted_by_independent_external_agency": "", 
                        
                                        "results_communicated_in_public_domain": "", 
                        
                                        "relevant_web_link": "" 
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle8_essential_2": [ 
                        
                                    { 
                        
                                        "sr_no": "", 
                        
                                        "name_of_project": "", 
                        
                                        "state": "", 
                        
                                        "district": "", 
                        
                                        "no_of_project_affected_families": "", 
                        
                                        "percentage_of_pafs_covered_by_rnr": "", 
                        
                                        "amounts_paid_to_pafs": "" 
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle8_leadership_1": [ 
                        
                                    { 
                        
                                        "details_of_negative_social_impact": "", 
                        
                                        "corrective_actions_taken": "" 
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle8_leadership_2": [ 
                        
                                    { 
                        
                                        "sr_no": "", 
                        
                                        "state": "", 
                        
                                        "aspirational_district": "", 
                        
                                        "amount_spent": "" 
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle8_leadership_4": [ 
                        
                                    { 
                        
                                        "sr_no": "", 
                        
                                        "intellectual_property_based_on_traditional_knowledge": "", 
                        
                                        "owned_acquired": "", 
                        
                                        "benefit_shared": "", 
                        
                                        "basis_of_calculationg_benefits_shared": "" 
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle8_leadership_5": [ 
                        
                                    { 
                        
                                        "name_of_authority": "", 
                        
                                        "brief_of_case": "", 
                        
                                        "corrective_actions_taken": "" 
                        
                                    } 
                        
                                ], 
                        
                                "zhr_principle8_leadership_6": [ 
                        
                                    { 
                        
                                        "sr_no": "", 
                        
                                        "csr_project": "", 
                        
                                        "no_of_persons_benefitted": "", 
                        
                                        "percentage_of_beneficiaries": "" 
                        
                                    } 
                        
                                ] 
                        
                            } 
                        
                        } 
                    
                        
                    var that = this;    
                    var appId = that.getOwnerComponent().getManifestEntry("/sap.app/id");
                    var appPath = appId.replaceAll(".", "/");
                    var appModulePath = jQuery.sap.getModulePath(appPath);
                        that.getView().setBusy(true);

                        $.ajax({
                            url: appModulePath + "/bpmworkflowruntime/v1/xsrf-token",
                            method: "GET",
                            headers: {
                                "X-CSRF-Token": "Fetch"
                            },
                            success: function (result, xhr, data) {
                                var token = data.getResponseHeader("X-CSRF-Token");
                                if (token === null) return;
        
                                $.ajax({
                                    url: appModulePath + "/bpmworkflowruntime/v1/workflow-instances",
                                    type: "POST",
                                    data: JSON.stringify(workObj),
                                    headers: {
                                        "X-CSRF-Token": token,
                                        "Content-Type": "application/json"
                                    },
                                    async: false,
                                    success: function (data, response) {
                                        var successMsg;
                                        that.getView().setBusy(false);
                                        successMsg = "Request Sent for Approval";
                                        MessageBox.success(successMsg, {
                                            icon: MessageBox.Icon.SUCCESS,
                                            title: "SUCCESS",
                                            actions: [MessageBox.Action.OK],
                                            initialFocus: MessageBox.Action.OK,
                                            onClose: function (Action) {
                                                // that.clearForm();
                                                that.getView().setBusy(false);
                                            }
                                        });
                                    },
                                    error: function (e) {
                                        that.getView().setBusy(false);
                                        MessageBox.show(JSON.stringify(e), {
                                            icon: MessageBox.Icon.ERROR,
                                            title: "ERROR"
                                        });
                                    }
                                });
                                    },
                                    error: function (e) {
                                        that.getView().setBusy(false);
                                        MessageBox.show(JSON.stringify(e), {
                                            icon: MessageBox.Icon.ERROR,
                                            title: "ERROR"
                                        });
                                    }
                                });

            }else if(sKey === "08"){
	 			this.getView().getModel("procurementEditModel").setData({edit:false});
                var inputMaterialTable = this.getView().byId("idInputMaterialTable").getItems();
                var detailsConcentrationTable = this.getView().byId("idDetailsConcentrationTable").getItems();

                var oPayload = { 

                    
                        "status": "Submitted", 
                    
                        "creator_email": "shriyansh.k@bristlecone.com", 
                    
                        "creator_name": "Shriyansh Keserwani", 
                    
                        "Procurement": [ 
                    
                            { 
                    
                                "principle": "8", 
                    
                                "indicator": "Essential", 
                    
                                "questionID": "4", 
                    
                                "principle8_essential_4": [ 
                    
                                    { 

										"position": 0,
                    
                                        "sourceOfInputMaterial": "Directly sourced from MSMEs/ small producers", 
                    
                                        "valueForCurrentFinancialYear": inputMaterialTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear": inputMaterialTable[0].getAggregation("cells")[2].getProperty("value") 
                    
                                    }, 
                    
                                    { 

										"position": 1,
                    
                                        "sourceOfInputMaterial": "Sourced directly from within the district and neighbouring districts", 
                    
                                        "valueForCurrentFinancialYear": inputMaterialTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear": inputMaterialTable[1].getAggregation("cells")[2].getProperty("value")
                    
                                    } 
                    
                                ] 
                    
                            },  
                    
                            { 
                    
                                "principle": "1", 
                    
                                "indicator": "Essential", 
                    
                                "questionID": "9", 
                    
                                "principle1_essential_9": [ 
                    
                                    { 

										"position": 0,
                    
                                        "parameter": "Concentration of Purchases", 
                    
                                        "metrics": "a. Purchases from trading houses as % of total purchases", 
                    
                                        "valueForCurrentFinancialYear":detailsConcentrationTable[0].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear":detailsConcentrationTable[0].getAggregation("cells")[3].getProperty("value")
                    
                                    }, 
                    
                                    { 

										"position": 1,
                    
                                        "parameter": "Concentration of Purchases", 
                    
                                        "metrics": "b. Number of trading houses where purchases are made from", 
                    
                                        "valueForCurrentFinancialYear": detailsConcentrationTable[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear": detailsConcentrationTable[1].getAggregation("cells")[3].getProperty("value") 
                    
                                    }, 
                    
                                    { 
                    
										
										"position": 2,

                                        "parameter": "Concentration of Purchases", 
                    
                                        "metrics": "c. Purchases from top 10 trading houses as % of total purchases from trading houses", 
                    
                                        "valueForCurrentFinancialYear": detailsConcentrationTable[2].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear": detailsConcentrationTable[2].getAggregation("cells")[3].getProperty("value")
                    
                                    }, 
                    
                                    { 


										"position": 3,
                    
                                        "parameter": "Concentration of Sales", 
                    
                                        "metrics": "a. Sales to dealers / distributors as % of total sales", 
                    
                                        "valueForCurrentFinancialYear":detailsConcentrationTable[3].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear": detailsConcentrationTable[3].getAggregation("cells")[3].getProperty("value") 
                    
                                    }, 
                    
                                    { 

										"position": 4,
                    
                                        "parameter": "Concentration of Sales", 
                    
                                        "metrics": "b. Number of dealers / distributors to whom sales are made", 
                    
                                        "valueForCurrentFinancialYear": detailsConcentrationTable[4].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear": detailsConcentrationTable[4].getAggregation("cells")[3].getProperty("value")
                    
                                    }, 
                    
                                    { 

										"position": 5,
                    
                                        "parameter": "Concentration of Sales", 
                    
                                        "metrics": "c. Sales to top 10 dealers / distributors as % of total sales to dealers / distributors", 
                    
                                        "valueForCurrentFinancialYear": detailsConcentrationTable[5].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear": detailsConcentrationTable[5].getAggregation("cells")[3].getProperty("value") 
                    
                                    }, 
                    
                                    { 

										
										"position": 6,
                    
                                        "parameter": "Share of RPTs in", 
                    
                                        "metrics": "a. Purchases (Purchases with related parties / Total Purchases)", 
                    
                                        "valueForCurrentFinancialYear": detailsConcentrationTable[6].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear": detailsConcentrationTable[6].getAggregation("cells")[3].getProperty("value")
                    
                                    }, 
                    
                                    { 

										"position": 7,
                    
                                        "parameter": "Share of RPTs in", 
                    
                                        "metrics": "b. Sales (Sales to related parties / Total Sales)", 
                    
                                        "valueForCurrentFinancialYear": detailsConcentrationTable[7].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear": detailsConcentrationTable[7].getAggregation("cells")[3].getProperty("value")
                    
                                    }, 
                    
                                    { 

										"position": 8,
                    
                                        "parameter": "Share of RPTs in", 
                    
                                        "metrics": "c. Loans & advances (Loans & advances given to related parties / Total loans & advances)", 
                    
                                        "valueForCurrentFinancialYear": detailsConcentrationTable[8].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear": detailsConcentrationTable[8].getAggregation("cells")[3].getProperty("value") 
                    
                                    }, 
                    
                                    { 

										"position": 9,
                    
                                        "parameter": "Share of RPTs in", 
                    
                                        "metrics": "d. Investments( Investments in related parties / Total Investments made)", 
                    
                                        "valueForCurrentFinancialYear": detailsConcentrationTable[9].getAggregation("cells")[2].getProperty("value"), 
                    
                                        "valueForPreviousFinancialYear": detailsConcentrationTable[9].getAggregation("cells")[3].getProperty("value") 
                    
                                    } 
                    
                                ] 
                    
                            } 
                    
                        ] 
                    
                    } 
                var that = this;           
                this.getView().setBusy(true);
                this.oDataModel.update("/qualitative_data(fiscalYear='2030',businessFunction='Procurement')", oPayload, {
                
                    success : function(oData){
                            MessageBox.show("Data Saved Successfully");
                            that.getView().setBusy(false);
                            
                    },
    
                    error : function(oError){
                        MessageBox.show(oError);
                        that.getView().setBusy(false);
                    }
                
                });
                
                var workObj = { 

                        "definitionId": "eu10.sap-process-automation-q40kapza.zbrsrprocurement.zapproval_process_for_procurement", 
                    
                        "context": { 
                    
                            "zbusiness_function": "Procurement", 
                    
                            "zfiscal_year": "2023", 
                    
                            "zprocurement_creator_email": "shriyansh.k@bristlecone.com", 
                    
                            "zprocurement_creator_name": "Shriyansh Keserwani", 
                    
                            "zprocurement_principle8_essential_4": [ 
                    
                                { 
                    
                                    "sourceOfInputMaterial": "Directly sourced from MSMEs/ small producers", 
                    
                                    "valueForCurrentFinancialYear": inputMaterialTable[0].getAggregation("cells")[1].getProperty("value"), 
                    
                                    "valueForPreviousFinancialYear": inputMaterialTable[0].getAggregation("cells")[2].getProperty("value") 
                    
                                }, 
                    
                                { 
                    
                                    "sourceOfInputMaterial": "Sourced directly from within the district and neighbouring districts", 
                    
                                    "valueForCurrentFinancialYear": inputMaterialTable[1].getAggregation("cells")[1].getProperty("value"), 
                    
                                    "valueForPreviousFinancialYear": inputMaterialTable[1].getAggregation("cells")[2].getProperty("value") 
                    
                                } 
                    
                            ], 
                     
                    
                            "zprocurement_principle1_essential_9": [ 
                    
                                { 
                    
                                    "parameter": "Concentration of Purchases", 
                    
                                    "metrics": "a. Purchases from trading houses as % of total purchases", 
                    
                                    "valueForCurrentFinancialYear":detailsConcentrationTable[0].getAggregation("cells")[2].getProperty("value"), 
                    
                                    "valueForPreviousFinancialYear": detailsConcentrationTable[0].getAggregation("cells")[3].getProperty("value")
                    
                                }, 
                    
                                { 
                    
                                    "parameter": "Concentration of Purchases", 
                    
                                    "metrics": "b. Number of trading houses where purchases are made from", 
                    
                                    "valueForCurrentFinancialYear": detailsConcentrationTable[1].getAggregation("cells")[2].getProperty("value"), 
                    
                                    "valueForPreviousFinancialYear": detailsConcentrationTable[1].getAggregation("cells")[2].getProperty("value")
                    
                                }, 
                    
                                { 
                    
                                    "parameter": "Concentration of Purchases", 
                    
                                    "metrics": "c. Purchases from top 10 trading houses as % of total purchases from trading houses", 
                    
                                    "valueForCurrentFinancialYear": detailsConcentrationTable[2].getAggregation("cells")[2].getProperty("value"), 
                    
                                    "valueForPreviousFinancialYear": detailsConcentrationTable[2].getAggregation("cells")[3].getProperty("value")
                    
                                }, 
                    
                                { 
                    
                                    "parameter": "Concentration of Sales", 
                    
                                    "metrics": "a. Sales to dealers / distributors as % of total sales", 
                    
                                    "valueForCurrentFinancialYear": detailsConcentrationTable[3].getAggregation("cells")[2].getProperty("value"), 
                    
                                    "valueForPreviousFinancialYear": detailsConcentrationTable[3].getAggregation("cells")[3].getProperty("value") 
                    
                                }, 
                    
                                { 
                    
                                    "parameter": "Concentration of Sales", 
                    
                                    "metrics": "b. Number of dealers / distributors to whom sales are made", 
                    
                                    "valueForCurrentFinancialYear": detailsConcentrationTable[4].getAggregation("cells")[2].getProperty("value"), 
                    
                                    "valueForPreviousFinancialYear": detailsConcentrationTable[4].getAggregation("cells")[3].getProperty("value")
                    
                                }, 
                    
                                { 
                    
                                    "parameter": "Concentration of Sales", 
                    
                                    "metrics": "c. Sales to top 10 dealers / distributors as % of total sales to dealers / distributors", 
                    
                                    "valueForCurrentFinancialYear": detailsConcentrationTable[5].getAggregation("cells")[2].getProperty("value"), 
                    
                                    "valueForPreviousFinancialYear": detailsConcentrationTable[5].getAggregation("cells")[3].getProperty("value") 
                    
                                }, 
                    
                                { 
                    
                                    "parameter": "Share of RPTs in", 
                    
                                    "metrics": "a. Purchases (Purchases with related parties / Total Purchases)", 
                    
                                    "valueForCurrentFinancialYear": detailsConcentrationTable[6].getAggregation("cells")[2].getProperty("value"), 
                    
                                    "valueForPreviousFinancialYear": detailsConcentrationTable[6].getAggregation("cells")[3].getProperty("value") 
                    
                                }, 
                    
                                { 
                    
                                    "parameter": "Share of RPTs in", 
                    
                                    "metrics": "b. Sales (Sales to related parties / Total Sales)", 
                    
                                    "valueForCurrentFinancialYear": detailsConcentrationTable[7].getAggregation("cells")[2].getProperty("value"), 
                    
                                    "valueForPreviousFinancialYear": detailsConcentrationTable[7].getAggregation("cells")[3].getProperty("value") 
                    
                                }, 
                    
                                { 
                    
                                    "parameter": "Share of RPTs in", 
                    
                                    "metrics": "c. Loans & advances (Loans & advances given to related parties / Total loans & advances)", 
                    
                                    "valueForCurrentFinancialYear": detailsConcentrationTable[8].getAggregation("cells")[2].getProperty("value"), 
                    
                                    "valueForPreviousFinancialYear": detailsConcentrationTable[8].getAggregation("cells")[3].getProperty("value") 
                    
                                }, 
                    
                                { 
                    
                                    "parameter": "Share of RPTs in", 
                    
                                    "metrics": "d. Investments( Investments in related parties / Total Investments made)", 
                    
                                    "valueForCurrentFinancialYear": detailsConcentrationTable[9].getAggregation("cells")[2].getProperty("value"), 
                    
                                    "valueForPreviousFinancialYear": detailsConcentrationTable[9].getAggregation("cells")[3].getProperty("value")
                    
                                } 
                    
                            ] 
                    
                        } 
                    
                    } 
                var that = this;    
                    var appId = that.getOwnerComponent().getManifestEntry("/sap.app/id");
                    var appPath = appId.replaceAll(".", "/");
                    var appModulePath = jQuery.sap.getModulePath(appPath);
                        that.getView().setBusy(true);

                        $.ajax({
                            url: appModulePath + "/bpmworkflowruntime/v1/xsrf-token",
                            method: "GET",
                            headers: {
                                "X-CSRF-Token": "Fetch"
                            },
                            success: function (result, xhr, data) {
                                var token = data.getResponseHeader("X-CSRF-Token");
                                if (token === null) return;
        
                                $.ajax({
                                    url: appModulePath + "/bpmworkflowruntime/v1/workflow-instances",
                                    type: "POST",
                                    data: JSON.stringify(workObj),
                                    headers: {
                                        "X-CSRF-Token": token,
                                        "Content-Type": "application/json"
                                    },
                                    async: false,
                                    success: function (data, response) {
                                        var successMsg;
                                        that.getView().setBusy(false);
                                        successMsg = "Request Sent for Approval";
                                        MessageBox.success(successMsg, {
                                            icon: MessageBox.Icon.SUCCESS,
                                            title: "SUCCESS",
                                            actions: [MessageBox.Action.OK],
                                            initialFocus: MessageBox.Action.OK,
                                            onClose: function (Action) {
                                                // that.clearForm();
                                                that.getView().setBusy(false);
                                            }
                                        });
                                    },
                                    error: function (e) {
                                        that.getView().setBusy(false);
                                        MessageBox.show(JSON.stringify(e), {
                                            icon: MessageBox.Icon.ERROR,
                                            title: "ERROR"
                                        });
                                    }
                                });
                                    },
                                    error: function (e) {
                                        that.getView().setBusy(false);
                                        MessageBox.show(JSON.stringify(e), {
                                            icon: MessageBox.Icon.ERROR,
                                            title: "ERROR"
                                        });
                                    }
                                });
            }else if(sKey === "03"){
					this.getView().getModel("financeEditModel").setData({edit:false});
					var rDTable = this.getView().byId("idRDTable").getItems();
					var turnoverTable= this.getView().byId("idTurnoverTable").getItems();
					var accountTable = this.getView().byId("idAccountTable").getItems();

					var  oPayload = { 

						
						    "status": "Submitted", 
						
						    "creator_email": "shriyansh.k@bristlecone.com", 
						
						    "creator_name": "Shriyansh Keserwani", 
						
						    "Finance": [ 
						
						        { 
						
						            "principle": "2", 
						
						            "indicator": "Essential", 
						
						            "questionID": "1", 
						
						            "principle2_essential_1": [ 
						
						                { 

											"position" : 0,
						
						                    "typeOfInvestment": "R&D", 
						
						                    "valueForCurrentFinancialYear": rDTable[0].getAggregation("cells")[1].getProperty("value"), 
						
						                    "valueForPreviousFinancialYear": rDTable[0].getAggregation("cells")[2].getProperty("value"), 
						
						                    "detailsOfImprovements": rDTable[0].getAggregation("cells")[3].getProperty("value") 
						
						                }, 
						
						                { 

											"position" : 1,
						
						                    "typeOfInvestment": "Capex", 
						
						                    "valueForCurrentFinancialYear": rDTable[1].getAggregation("cells")[1].getProperty("value"), 
						
						                    "valueForPreviousFinancialYear": rDTable[1].getAggregation("cells")[2].getProperty("value"), 
						
						                    "detailsOfImprovements": rDTable[1].getAggregation("cells")[3].getProperty("value") 
						
						                } 
						
						            ] 
						
						        }, 
						
						        { 
						
						            "principle": "9", 
						
						            "indicator": "Essential", 
						
						            "questionID": "2", 
						
						            "principle9_essential_2": [ 
						
						                { 

											"position" : 0,
						
						                    "nameOfProductOrService": "Environmental and social parameters relevant to the product", 
						
						                    "percentageOfTotalTurnOver": turnoverTable[0].getAggregation("cells")[1].getProperty("value") 
						
						                }, 
						
						                { 

											"position" : 1,
						
						                    "nameOfProductOrService": "Safe and responsible usage", 
						
						                    "percentageOfTotalTurnOver": turnoverTable[1].getAggregation("cells")[1].getProperty("value") 
						
						                }, 
						
						                { 

											"position" : 2,
						
						                    "nameOfProductOrService": "Recycling and/or safe disposal", 
						
						                    "percentageOfTotalTurnOver": turnoverTable[2].getAggregation("cells")[1].getProperty("value") 
						
						                } 
						
						            ] 
						
						        }, 
						
						
						        { 
						
						            "principle": "1", 
						
						            "indicator": "Essential", 
						
						            "questionID": "8", 
						
						            "principle1_essential_8": [ 
						
						                { 

											"position" : 0,
						
						                    "type": "Number of days of accounts payables", 
						
						                    "valueForCurrentFinancialYear": accountTable[0].getAggregation("cells")[1].getProperty("value"), 
						
						                    "valueForPreviousFinancialYear": accountTable[0].getAggregation("cells")[2].getProperty("value") 
						
						                } 
						
						            ] 
						
						        } 
						
						    ] 
						
						};
											 

				
				
					var that = this;           
                	this.getView().setBusy(true);
                	this.oDataModel.update("/qualitative_data(fiscalYear='2030',businessFunction='Finance')", oPayload, {
                
                    	success : function(oData){
                            MessageBox.show("Data Saved Successfully");
                            that.getView().setBusy(false);
                            
                    	},
    
                   	 error : function(oError){
                       	 	MessageBox.show(oError);
                        	that.getView().setBusy(false);
                    	}
                
                });

			var workObj = { 

				    "definitionId": "eu10.sap-process-automation-q40kapza.zbrsrfinance.zapproval_process_for_finance", 
				
				    "context": { 
				
				        "zbusiness_function": "Finance", 
				
				        "zfinance_creator_email": "shriyansh.k@bristlecone.com", 
				
				        "zfinance_creator_name": "Shriyansh Keserwani", 
				
				        "zfiscal_year": "2023", 
				
				        "zfinance_principle2_essential_1": [ 
				
				            { 
				
				                "typeOfInvestment": "R&D", 
				
				                "valueForCurrentFinancialYear": rDTable[0].getAggregation("cells")[1].getProperty("value"), 
				
				                "valueForPreviousFinancialYear": rDTable[0].getAggregation("cells")[2].getProperty("value"), 
				
				                "detailsOfImprovements": rDTable[0].getAggregation("cells")[3].getProperty("value") 
				
				            }, 
				
				            { 
				
				                "typeOfInvestment": "Capex", 
				
				                "valueForCurrentFinancialYear":	rDTable[1].getAggregation("cells")[1].getProperty("value"), 
				
				                "valueForPreviousFinancialYear":	rDTable[1].getAggregation("cells")[2].getProperty("value"), 
				
				                "detailsOfImprovements": rDTable[1].getAggregation("cells")[3].getProperty("value") 
				
				            } 
				
				        ], 
				
				        "zfinance_principle9_essential_2": [ 
				
				            { 
				
				                "nameOfProductOrService": "Environmental and social parameters relevant to the product", 
				
				                "percentageOfTotalTurnOver": turnoverTable[0].getAggregation("cells")[1].getProperty("value") 
				
				            }, 
				
				            { 
				
				                "nameOfProductOrService": "Safe and responsible usage", 
				
				                "percentageOfTotalTurnOver": turnoverTable[1].getAggregation("cells")[1].getProperty("value") 
				
				            }, 
				
				            { 
				
				                "nameOfProductOrService": "Recycling and/or safe disposal", 
				
				                "percentageOfTotalTurnOver": turnoverTable[2].getAggregation("cells")[1].getProperty("value")
				
				            } 
				
				        ], 
			
				
				        "zfinance_principle1_essential_8": [ 
				
				            { 
				
				                "type": "Number of days of accounts payables", 
				
				                "valueForCurrentFinancialYear": accountTable[0].getAggregation("cells")[1].getProperty("value"), 
				
				                "valueForPreviousFinancialYear": accountTable[0].getAggregation("cells")[2].getProperty("value") 
				
				            } 
				
				        ], 
				
				
				
				        "zfinance_principle4_essential_2": [ 
				
				            { 
				
				                "stakeholder_group": "", 
				
				                "identifies_as_vulnerable_marginalized_group": "", 
				
				                "channels_of_communication": "", 
				
				                "frequency_of_engagement": "", 
				
				                "purpose_scope_of_engagement": "" 
				
				            } 
				
				        ] 
				
				    } 
				
				} 



 					var that = this;    
                    var appId = that.getOwnerComponent().getManifestEntry("/sap.app/id");
                    var appPath = appId.replaceAll(".", "/");
                    var appModulePath = jQuery.sap.getModulePath(appPath);
                        that.getView().setBusy(true);

                        $.ajax({
                            url: appModulePath + "/bpmworkflowruntime/v1/xsrf-token",
                            method: "GET",
                            headers: {
                                "X-CSRF-Token": "Fetch"
                            },
                            success: function (result, xhr, data) {
                                var token = data.getResponseHeader("X-CSRF-Token");
                                if (token === null) return;
        
                                $.ajax({
                                    url: appModulePath + "/bpmworkflowruntime/v1/workflow-instances",
                                    type: "POST",
                                    data: JSON.stringify(workObj),
                                    headers: {
                                        "X-CSRF-Token": token,
                                        "Content-Type": "application/json"
                                    },
                                    async: false,
                                    success: function (data, response) {
                                        var successMsg;
                                        that.getView().setBusy(false);
                                        successMsg = "Request Sent for Approval";
                                        MessageBox.success(successMsg, {
                                            icon: MessageBox.Icon.SUCCESS,
                                            title: "SUCCESS",
                                            actions: [MessageBox.Action.OK],
                                            initialFocus: MessageBox.Action.OK,
                                            onClose: function (Action) {
                                                // that.clearForm();
                                                that.getView().setBusy(false);
                                            }
                                        });
                                    },
                                    error: function (e) {
                                        that.getView().setBusy(false);
                                        MessageBox.show(JSON.stringify(e), {
                                            icon: MessageBox.Icon.ERROR,
                                            title: "ERROR"
                                        });
                                    }
                                });
                                    },
                                    error: function (e) {
                                        that.getView().setBusy(false);
                                        MessageBox.show(JSON.stringify(e), {
                                            icon: MessageBox.Icon.ERROR,
                                            title: "ERROR"
                                        });
                                    }
                                });

			}
        },
        onTemplateDownload : function(){

        },
        fnFileUploadComplete : function(oEvent){
            var that = this; 
            oCont.getView().setBusy(false);
            var file = oEvent.getParameter("files") && oEvent.getParameter("files")[0];
            that.fileName = file.name;
            // var oFile = oEvent.getParameter("files")[0];
            // this.oFile = oFile;
            var aResults = [];
            if (file && window.FileReader) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    workbook.SheetNames.forEach(function(sheetName) {
                        // Here is your object for every sheet in workbook
                        aResults = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);   
                    });
                    console.log(aResults);
                    oTableJsonModel.setProperty("/Data", aResults);
                    // var oModel = new JSONModel({"xslx":aResults});
                        // self.getView().setModel(oModel, "xlModel");
                        // self.getView().getModel("xlModel").setProperty("/xslx", aResults);
                    var promise =  new Promise(function(resolve){
                        resolve();
                     }).then(function() {
                        that.generateTableCsv();
                    });
                };
                reader.onerror = function(ex) {
                    console.log(ex);
                };
                reader.readAsBinaryString(file);
            } 
            
        },

        

        generateTableCsv : function(){
                
            var that = this;
            var oTable = that.getView().byId("Tableid");
            var newTable = oCont.getView().byId("newTable");

            var oModel = that.getView().getModel();
            var oModelData = oTableJsonModel.getProperty("/Data");
            oTable.setModel(oTableJsonModel);
            var selectedFileTemp = this.getView().byId("id_File").getSelectedKey();
            
            if(selectedFileTemp =="01"){
                
                oTable.setVisible(true);
                newTable.setVisible(false);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[5] == "Value"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header: new Label({
                                text: "{Text}",
                                wrapping : false
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);
                        var oItemTemplate = new ColumnListItem();
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(new Text({
                                text: "{" + oHeaderName + "}"
                            }));
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }	
            }else if (selectedFileTemp == "02"){
                oTable.setVisible(true);
                newTable.setVisible(false);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[7] == "id_complaint_type"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header: new Label({
                                text: "{Text}",
                                wrapping : true,
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);
                        var oItemTemplate = new ColumnListItem();
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(new Text({
                                text: "{" + oHeaderName + "}"
                            }));
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            }else if (selectedFileTemp == "03"){
                oTable.setVisible(true);
                newTable.setVisible(false);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[5] == "Value"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header: new Label({
                                text: "{Text}",
                                wrapping : true,
                                design : "Bold"
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);
                        var oItemTemplate = new ColumnListItem();
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(new Text({
                                text: "{" + oHeaderName + "}"
                            }));
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            }else if (selectedFileTemp == "04"){
                oTable.setVisible(true);
                newTable.setVisible(false);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[5] == "id_waste_type"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header: new Label({
                                text: "{Text}",
                                wrapping : true,
                                design : "Bold"
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);
                        var oItemTemplate = new ColumnListItem();
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(new Text({
                                text: "{" + oHeaderName + "}"
                            }));
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            }else if (selectedFileTemp == "05"){
                //In case of Supplier Master Data we are using sap.ui.table.Table api for displaying data
                oTable.setVisible(false);
                newTable.setVisible(true);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[5] == "ID Waste Type"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header : new Text({
                                text: "{Text}",
                                wrapping : true
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);

                        newTable.setModel(oTableJsonModel);
                        newTable.setVisibleRowCount(oTableJsonModel.getData().Data.length)

                        var oNewTemplate = new sap.ui.table.Column({
                            width : "auto",
                            minWidth : 5,
                            autoResizable : true,
                            label : new sap.m.Label({
                                wrapping : true,
                                tooltip : "{Text}",
                                text : "{Text}"
                            }),
                            template : new sap.m.Text({
                                text : "{Text}",
                                tooltip : "{Text}",
                                wrapping : false
                            })
                        });
                        //newTable.bindAggregation("columns", "/columnNames", oNewTemplate);

                        newTable.bindColumns("/columnNames", function(sId, oContext) {
                            var columnName = oContext.getObject().Text;
                            return new sap.ui.table.Column({
                                width : "5rem",
                                minWidth : 5,
                                autoResizable : true,
                                label: columnName,
                                template: columnName,
                            });
                        });
                        newTable.bindRows("/Data");

                        var oItemTemplate = new ColumnListItem({
                            vAlign : "Middle"
                        });
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(
                                new Text({
                                    text: "{" + oHeaderName + "}",
                                    wrapping : true
                                })
                            );
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            }else if (selectedFileTemp == "06"){
                //In case of Supplier Master Data we are using sap.ui.table.Table api for displaying data
                oTable.setVisible(false);
                newTable.setVisible(true);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[5] == "ID Waste Type"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header : new Text({
                                text: "{Text}",
                                wrapping : true
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);

                        newTable.setModel(oTableJsonModel);
                        newTable.setVisibleRowCount(oTableJsonModel.getData().Data.length)

                        var oNewTemplate = new sap.ui.table.Column({
                            width : "auto",
                            minWidth : 5,
                            autoResizable : true,
                            label : new sap.m.Label({
                                wrapping : true,
                                tooltip : "{Text}",
                                text : "{Text}"
                            }),
                            template : new sap.m.Text({
                                text : "{Text}",
                                tooltip : "{Text}",
                                wrapping : false
                            })
                        });
                        //newTable.bindAggregation("columns", "/columnNames", oNewTemplate);

                        newTable.bindColumns("/columnNames", function(sId, oContext) {
                            var columnName = oContext.getObject().Text;
                            return new sap.ui.table.Column({
                                width : "5rem",
                                minWidth : 5,
                                autoResizable : true,
                                label: columnName,
                                template: columnName,
                            });
                        });
                        newTable.bindRows("/Data");

                        var oItemTemplate = new ColumnListItem({
                            vAlign : "Middle"
                        });
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(
                                new Text({
                                    text: "{" + oHeaderName + "}",
                                    wrapping : true
                                })
                            );
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            }else if (selectedFileTemp == "07"){
                //In case of Supplier Master Data we are using sap.ui.table.Table api for displaying data
                oTable.setVisible(false);
                newTable.setVisible(true);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[5] == "Value"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header : new Text({
                                text: "{Text}",
                                wrapping : true
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);

                        newTable.setModel(oTableJsonModel);
                        newTable.setVisibleRowCount(oTableJsonModel.getData().Data.length)

                        var oNewTemplate = new sap.ui.table.Column({
                            width : "auto",
                            minWidth : 5,
                            autoResizable : true,
                            label : new sap.m.Label({
                                wrapping : true,
                                tooltip : "{Text}",
                                text : "{Text}"
                            }),
                            template : new sap.m.Text({
                                text : "{Text}",
                                tooltip : "{Text}",
                                wrapping : false
                            })
                        });
                        //newTable.bindAggregation("columns", "/columnNames", oNewTemplate);

                        newTable.bindColumns("/columnNames", function(sId, oContext) {
                            var columnName = oContext.getObject().Text;
                            return new sap.ui.table.Column({
                                width : "5rem",
                                minWidth : 5,
                                autoResizable : true,
                                label: columnName,
                                template: columnName,
                            });
                        });
                        newTable.bindRows("/Data");

                        var oItemTemplate = new ColumnListItem({
                            vAlign : "Middle"
                        });
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(
                                new Text({
                                    text: "{" + oHeaderName + "}",
                                    wrapping : true
                                })
                            );
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            }else if (selectedFileTemp == "08"){
                //In case of Supplier Master Data we are using sap.ui.table.Table api for displaying data
                oTable.setVisible(false);
                newTable.setVisible(true);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[5] == "Value"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header : new Text({
                                text: "{Text}",
                                wrapping : true
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);

                        newTable.setModel(oTableJsonModel);
                        newTable.setVisibleRowCount(oTableJsonModel.getData().Data.length)

                        var oNewTemplate = new sap.ui.table.Column({
                            width : "auto",
                            minWidth : 5,
                            autoResizable : true,
                            label : new sap.m.Label({
                                wrapping : true,
                                tooltip : "{Text}",
                                text : "{Text}"
                            }),
                            template : new sap.m.Text({
                                text : "{Text}",
                                tooltip : "{Text}",
                                wrapping : false
                            })
                        });
                        //newTable.bindAggregation("columns", "/columnNames", oNewTemplate);

                        newTable.bindColumns("/columnNames", function(sId, oContext) {
                            var columnName = oContext.getObject().Text;
                            return new sap.ui.table.Column({
                                width : "5rem",
                                minWidth : 5,
                                autoResizable : true,
                                label: columnName,
                                template: columnName,
                            });
                        });
                        newTable.bindRows("/Data");

                        var oItemTemplate = new ColumnListItem({
                            vAlign : "Middle"
                        });
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(
                                new Text({
                                    text: "{" + oHeaderName + "}",
                                    wrapping : true
                                })
                            );
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            }else if (selectedFileTemp == "09"){
                //In case of Supplier Master Data we are using sap.ui.table.Table api for displaying data
                oTable.setVisible(false);
                newTable.setVisible(true);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[5] == "Value"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header : new Text({
                                text: "{Text}",
                                wrapping : true
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);

                        newTable.setModel(oTableJsonModel);
                        newTable.setVisibleRowCount(oTableJsonModel.getData().Data.length)

                        var oNewTemplate = new sap.ui.table.Column({
                            width : "auto",
                            minWidth : 5,
                            autoResizable : true,
                            label : new sap.m.Label({
                                wrapping : true,
                                tooltip : "{Text}",
                                text : "{Text}"
                            }),
                            template : new sap.m.Text({
                                text : "{Text}",
                                tooltip : "{Text}",
                                wrapping : false
                            })
                        });
                        //newTable.bindAggregation("columns", "/columnNames", oNewTemplate);

                        newTable.bindColumns("/columnNames", function(sId, oContext) {
                            var columnName = oContext.getObject().Text;
                            return new sap.ui.table.Column({
                                width : "5rem",
                                minWidth : 5,
                                autoResizable : true,
                                label: columnName,
                                template: columnName,
                            });
                        });
                        newTable.bindRows("/Data");

                        var oItemTemplate = new ColumnListItem({
                            vAlign : "Middle"
                        });
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(
                                new Text({
                                    text: "{" + oHeaderName + "}",
                                    wrapping : true
                                })
                            );
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            }else if (selectedFileTemp == "10"){
                //In case of Supplier Master Data we are using sap.ui.table.Table api for displaying data
                oTable.setVisible(false);
                newTable.setVisible(true);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[5] == "id_water_type"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header : new Text({
                                text: "{Text}",
                                wrapping : true
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);

                        newTable.setModel(oTableJsonModel);
                        newTable.setVisibleRowCount(oTableJsonModel.getData().Data.length)

                        var oNewTemplate = new sap.ui.table.Column({
                            width : "auto",
                            minWidth : 5,
                            autoResizable : true,
                            label : new sap.m.Label({
                                wrapping : true,
                                tooltip : "{Text}",
                                text : "{Text}"
                            }),
                            template : new sap.m.Text({
                                text : "{Text}",
                                tooltip : "{Text}",
                                wrapping : false
                            })
                        });
                        //newTable.bindAggregation("columns", "/columnNames", oNewTemplate);

                        newTable.bindColumns("/columnNames", function(sId, oContext) {
                            var columnName = oContext.getObject().Text;
                            return new sap.ui.table.Column({
                                width : "5rem",
                                minWidth : 5,
                                autoResizable : true,
                                label: columnName,
                                template: columnName,
                            });
                        });
                        newTable.bindRows("/Data");

                        var oItemTemplate = new ColumnListItem({
                            vAlign : "Middle"
                        });
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(
                                new Text({
                                    text: "{" + oHeaderName + "}",
                                    wrapping : true
                                })
                            );
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            
            }else if (selectedFileTemp == "11"){
                //In case of Supplier Master Data we are using sap.ui.table.Table api for displaying data
                oTable.setVisible(false);
                newTable.setVisible(true);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[5]== "id_air_emission_type"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header : new Text({
                                text: "{Text}",
                                wrapping : true
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);

                        newTable.setModel(oTableJsonModel);
                        newTable.setVisibleRowCount(oTableJsonModel.getData().Data.length)

                        var oNewTemplate = new sap.ui.table.Column({
                            width : "auto",
                            minWidth : 5,
                            autoResizable : true,
                            label : new sap.m.Label({
                                wrapping : true,
                                tooltip : "{Text}",
                                text : "{Text}"
                            }),
                            template : new sap.m.Text({
                                text : "{Text}",
                                tooltip : "{Text}",
                                wrapping : false
                            })
                        });
                        //newTable.bindAggregation("columns", "/columnNames", oNewTemplate);

                        newTable.bindColumns("/columnNames", function(sId, oContext) {
                            var columnName = oContext.getObject().Text;
                            return new sap.ui.table.Column({
                                width : "5rem",
                                minWidth : 5,
                                autoResizable : true,
                                label: columnName,
                                template: columnName,
                            });
                        });
                        newTable.bindRows("/Data");

                        var oItemTemplate = new ColumnListItem({
                            vAlign : "Middle"
                        });
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(
                                new Text({
                                    text: "{" + oHeaderName + "}",
                                    wrapping : true
                                })
                            );
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            
            }else if (selectedFileTemp == "12"){
                //In case of Supplier Master Data we are using sap.ui.table.Table api for displaying data
                oTable.setVisible(false);
                newTable.setVisible(true);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[8] == "Fis_year"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header : new Text({
                                text: "{Text}",
                                wrapping : true
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);

                        newTable.setModel(oTableJsonModel);
                        newTable.setVisibleRowCount(oTableJsonModel.getData().Data.length)

                        var oNewTemplate = new sap.ui.table.Column({
                            width : "auto",
                            minWidth : 5,
                            autoResizable : true,
                            label : new sap.m.Label({
                                wrapping : true,
                                tooltip : "{Text}",
                                text : "{Text}"
                            }),
                            template : new sap.m.Text({
                                text : "{Text}",
                                tooltip : "{Text}",
                                wrapping : false
                            })
                        });
                        //newTable.bindAggregation("columns", "/columnNames", oNewTemplate);

                        newTable.bindColumns("/columnNames", function(sId, oContext) {
                            var columnName = oContext.getObject().Text;
                            return new sap.ui.table.Column({
                                width : "5rem",
                                minWidth : 5,
                                autoResizable : true,
                                label: columnName,
                                template: columnName,
                            });
                        });
                        newTable.bindRows("/Data");

                        var oItemTemplate = new ColumnListItem({
                            vAlign : "Middle"
                        });
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(
                                new Text({
                                    text: "{" + oHeaderName + "}",
                                    wrapping : true
                                })
                            );
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            
            }else if (selectedFileTemp == "13"){
                //In case of Supplier Master Data we are using sap.ui.table.Table api for displaying data
                oTable.setVisible(false);
                newTable.setVisible(true);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[7] == "category"){
                        $.each(ColumnsData, function (i, value) {
                            oColumnNames.push({
                                Text: ColumnsData[i]
                            });
                        });
                        oTableJsonModel.setProperty("/columnNames", oColumnNames);
                        var oTemplate = new Column({
                            header : new Text({
                                text: "{Text}",
                                wrapping : true
                            })
                        });
                        oTable.bindAggregation("columns", "/columnNames", oTemplate);

                        newTable.setModel(oTableJsonModel);
                        newTable.setVisibleRowCount(oTableJsonModel.getData().Data.length)

                        var oNewTemplate = new sap.ui.table.Column({
                            width : "auto",
                            minWidth : 5,
                            autoResizable : true,
                            label : new sap.m.Label({
                                wrapping : true,
                                tooltip : "{Text}",
                                text : "{Text}"
                            }),
                            template : new sap.m.Text({
                                text : "{Text}",
                                tooltip : "{Text}",
                                wrapping : false
                            })
                        });
                        //newTable.bindAggregation("columns", "/columnNames", oNewTemplate);

                        newTable.bindColumns("/columnNames", function(sId, oContext) {
                            var columnName = oContext.getObject().Text;
                            return new sap.ui.table.Column({
                                width : "5rem",
                                minWidth : 5,
                                autoResizable : true,
                                label: columnName,
                                template: columnName,
                            });
                        });
                        newTable.bindRows("/Data");

                        var oItemTemplate = new ColumnListItem({
                            vAlign : "Middle"
                        });
                        var oTableHeaders = oTable.getColumns();
                        $.each(oTableHeaders, function (j, value) {
                            var oHeaderName = oTableHeaders[j].getHeader().getText();
                            oItemTemplate.addCell(
                                new Text({
                                    text: "{" + oHeaderName + "}",
                                    wrapping : true
                                })
                            );
                        });
                        
                        oTable.bindAggregation("items", {
                            path: "/Data",
                            template: oItemTemplate
                        });
                        
                        this.getView().byId("idSubmit").setVisible(true);
                        this.getView().byId("idClear").setVisible(true);
                    }
                    else{
                        MessageBox.warning("Invalid Template");
                        oFileUploader.clear();
                    }
                }
            
            }
            

        },

        onClear : function(oEvent){
            oCont.getView().byId("id_BF").setSelectedKey(); 
            oCont.getView().byId("id_File").setSelectedKey(); 
            oFileUploader.clear();
            oTableJsonModel.setData([]);
            oCont.getView().byId("idSubmit").setVisible(false);
            oCont.getView().byId("idClear").setVisible(false);
        },

        onSubmit : function(){
            var self = this;
            var str = this.fileName;
            var selecedBF = this.getView().byId("id_BF").getSelectedKey();
            var vData = oTableJsonModel.getProperty("/Data");
            var oModel = this.getOwnerComponent().getModel();
			var aDeferredGroups = oModel.getDeferredGroups();
            aDeferredGroups = aDeferredGroups.concat(["createGrp"]);
            oModel.setDeferredGroups(aDeferredGroups);

            if(selecedBF == "01"){
              var matchPrinciple = str.match(/P-(\d+)/);
              if (matchPrinciple) {
              var extractedPrinciple = matchPrinciple[1];
              }
              var matchQuestion = str.match(/I-(\d+)/);
              if(matchQuestion){
                var extactQuestionNumber = matchQuestion[1];
              }
              var matchIndicator = str.match(/([A-Za-z])_I/);
              if(matchIndicator){
                var extactIndicator = matchIndicator[1];
              }
              if(extactIndicator === "E"){

                var indicator = "Essential";
              }else {
                var indicator = "Leadership";
              }

             for (var i = 0; i < vData.length; i++){
                var data = {  
                    "businessFunction" : "EHS",
                    "principle" : extractedPrinciple,
                    "indicator" : indicator,
                    "questionID" : extactQuestionNumber,
                    "value_date" : vData[i]?.['Value Date'] || '',
                    "id_waste_type": vData[i]?.['id_waste_type'] || '',
                    "id_complaint_type" : vData[i]?.['id_complaint_type'] || '',
                    "id_injury_type" : vData[i]?.['id_injury_type'] || '',
                    "category" : vData[i]?.['category'] || '',
                    "id_water_type" : vData[i]?.['id_water_type'] || '',
                    "id_air_emission_type" : vData[i]?.['id_air_emission_type'] || '',
                    "employee_type" : vData[i]?.['employee_type'] || '',
                    "data_title" : vData[i]?.['Data Title'] || '',
                    "company_code" : vData[i]?.['Company Code'] || '', // NK
                    "country" : vData[i]?.['Country'] || '', //NK
                    "location_text" : vData[i]?.['Location Text'] || '', //NK
                    "plant_id" : vData[i]?.['Plant Id'] || '', //NK
                    "value" : vData[i]?.['Value'] || '', //NK
                    "unit_text" : vData[i]?.['Unit Text'] || '' //NK
                    
                  };
                  
                oModel.create("/quantitative_data", data, {
					groupId: "createGrp"
				});
                //return;
                var oBusy = new sap.m.BusyDialog();
            // oBusy.open();            
             }
             oModel.submitChanges({
				groupId: "createGrp",
				success: function(res) {
                    // oBusy.close();
					// var msg = "";
					// var aResponses = res.__batchResponses[0].__changeResponses;

                    if(res?.__batchResponses[0].__changeResponses){
                        var aResponses = res.__batchResponses[0].__changeResponses;
                        for (var i = 0; i < res.__batchResponses[0].__changeResponses.length; i++){
                            if(i === 0){
                                var successMessage = "Data Uploaded Successfully!";
                                MessageBox.show(
                                    successMessage, {
                                        icon: sap.m.MessageBox.Icon.SUCCESS,
                                        title: "Success",
                                        actions: [],
                                        onClose: function(oAction) { }
                                    }
                                );
                            }
                        }
                        oFileUploader.clear();
                        oTableJsonModel.setData([]);
                    }else{
                        var errorJSON= JSON.parse(res.__batchResponses[0].response.body);
                        var msg = errorJSON.error.message.value;
                        // var isMessageDisplayed = false;
                        // if(isMessageDisplayed)
                        sap.m.MessageBox.information(msg);
                        oFileUploader.clear();
                        oTableJsonModel.setData([]);
                       
                    }

                    // self.getView().byId("_IDGenTable1").setBusy(false);
                    // that.onRefreshTable();
					// for (var i = 0; i < aResponses.length; i++) {
                    //       if(aResponses[i].statusCode === "201") {
                    //       	msg = msg + aResponses[i].data.FilePath + " Uploaded successfully \n";
                    //       }else{
                    //       		msg = msg + aResponses[i].data.FilePath + " creation failed \n";
                    //       }
					// }
                    // sap.m.MessageBox.information(msg);
                    // that.onRefreshTable();


				},
				error: function(err) {
					sap.m.MessageBox.error("Batch operation failed");
				}
			
            });

            }

        },
        
        createColumnConfig : function(){
            var selectedBF = this.getView().byId("id_BF").getSelectedKey();
            var selectedTemplate = this.getView().byId("id_File").getSelectedKey();
           var columns = [];
           if(selectedBF == "01"){
            columns = [{
                label: 'Company Code',
                property: 'company_code',
                width: '25'
            },
            {
                label: 'Country',
                property: 'Country',
                width: '25'
            },
            {
                label: 'Location Text',
                property: 'location_text',
                width: '25'
            },
            {
                label: 'Plant Id',
                property: 'plant_id',
                width: '30'
            },
            {
                label: 'Data Title',
                property: 'data_title',
                width: '40'
            },
            {
                label: 'Value',
                property: 'value ',
                width: '18'
            },
            {
                label: 'Unit Text',
                property: 'unit_text',
                width: '18'
            },
            {
                label: 'Value Date',
                property: 'value_date',
                width: '18'
            }];
            
            if(selectedTemplate == "02"){
            var newColumns = {
                label: 'id_complaint_type',
                property: 'id_complaint_type',
                width: '25'
              };
              columns.splice(7, 0, newColumns);
      
            }else if(selectedTemplate == "04"){
            var newColumns = {
                label : "id_waste_type",
                property :"id_waste_type",
                width: '25'
              };
              columns.splice(5, 0, newColumns);

           }
           else if(selectedTemplate == "05"){
            var newColumns = {
                label : "id_waste_type",
                property :"id_waste_type",
                width: '25'
              };
              columns.splice(5, 0, newColumns);

           }
           else if(selectedTemplate == "06"){
            var newColumns = {
                label : "id_waste_type",
                property :"id_waste_type",
                width: '25'
              };
              columns.splice(5, 0, newColumns);

           }else if(selectedTemplate == "10"){
            var newColumns = {
                label : "id_water_type",
                property :"id_water_type",
                width: '25'
              };
              columns.splice(5, 0, newColumns);
           }
           else if(selectedTemplate == "11"){
            var newColumns = {
                label : "id_air_emission_type",
                property :"id_air_emission_type",
                width: '25'
              };
              columns.splice(5, 0, newColumns);

           }
           else if(selectedTemplate == "12"){
            var newColumns = {
                label : "Fis_year",
                property :"Fis_year",
                width: '25'
              };
              columns.splice(8, 0, newColumns);
           }
           else if(selectedTemplate == "13"){
            var newColumns = {
                label : "category",
                property :"category",
                width: '25'
              };
              columns.splice(7, 0, newColumns);

           }

            }

          
          return columns;
        },
        onTemplateDownload : function(){
            var selectedBF = this.getView().byId("id_BF").getSelectedKey();
            var selectedTemplate = this.getView().byId("id_File").getSelectedKey();
            var fileName =  "";
            var temp = [];
            if(selectedBF == "01"){
            
            temp = [{
				"key": "company_code",
				"value": "company_code"
			}, {
				"key": "Country",
				"value": "Country"
			},
            {
				"key": "Location_text",
				"value": "Location_text"
			},
            {
                "key" : "plant_id",
                "value" : "plant_id"          
            },
            {
                "key" : "data_title",
                "value" : "data_title"          
            },
            {
				"key": "Value",
				"value": "Value"
			},
            {
				"key": "unit_text",
				"value": "unit_text"
			},
            {
				"key": "value_date",
				"value": "value_date"
			}
            ];
            if(selectedTemplate == "01"){
                fileName = "P-3_E_I-11_Details of Safety Related Incidents";         
           }
            else if(selectedTemplate == "02"){
                fileName = "P-3_E_I-13 Complaints"
                var newColumns = {
                    "key" : "id_complaint_type",
                    "value" :"id_complaint_type"
                  };
                  temp.splice(7, 0, newColumns);
                }
            else if(selectedTemplate == "03"){
                fileName = "P-6_E_I-6 Scope1Emissions";
           }
           else if(selectedTemplate == "04"){
            fileName = "P-6_E_I-8 Waste Disposed";
            var newColumns = {
                "key" : "id_waste_type",
                "value" :"id_waste_type"
              };
              temp.splice(5, 0, newColumns);

           }
           else if(selectedTemplate == "05"){
            fileName = "P-6_E_I-8 Waste Generated";
            var newColumns = {
                "key" : "id_waste_type",
                "value" :"id_waste_type"
              };
              temp.splice(5, 0, newColumns);

           }
           else if(selectedTemplate == "06"){
            fileName = "P-6_E_I-8 Waste Recovered";
            var newColumns = {
                "key" : "id_waste_type",
                "value" :"id_waste_type"
              };
              temp.splice(5, 0, newColumns);

           }
           else if(selectedTemplate == "07"){
            fileName = "P-6_E_I-1 ElectricityConsumption";

           }
           else if(selectedTemplate == "08"){
            fileName = "P-6_E_I-1 FuelConsumption";

           }
           else if(selectedTemplate == "09"){
            fileName = "P-6_E_I-3 WaterConsumed";

           }
           else if(selectedTemplate == "10"){
            fileName = "P-6_E_I-3 WaterWithdrawl";
            var newColumns = {
                "key" : "id_water_type",
                "value" :"id_water_type"
              };
              temp.splice(5, 0, newColumns);
           }
           else if(selectedTemplate == "11"){
            fileName = "P-6_E_I-5 Air Emission";
            var newColumns = {
                "key" : "id_air_emission_type",
                "value" :"id_air_emission_type"
              };
              temp.splice(5, 0, newColumns);

           }
           else if(selectedTemplate == "12"){
            fileName = "P-6_E_I-6 Scope2Emissions";
            var newColumns = {
                "key" : "Fis_year",
                "value" :"Fis_year"
              };
              temp.splice(8, 0, newColumns);
           }
           else if(selectedTemplate == "13"){
            fileName = "P-6_L_I-4 Scope3Emissions";
            var newColumns = {
                "key" : "category",
                "value" :"category"
              };
              temp.splice(7, 0, newColumns);

           }else {
            sap.m.MessageToast.show('Please select drop down');
           }
        }


        var aCols, aProducts, oSettings, oSheet;
        aCols = this.createColumnConfig();
        aProducts = temp;
        oSettings = {
            workbook: { columns: aCols },
            dataSource: aProducts,
            fileName: fileName
        };
        oSheet = new Spreadsheet(oSettings);
			oSheet.build()
				.then( function() {
					sap.m.MessageToast.show('Spreadsheet export has finished');
				})
				.finally(oSheet.destroy);
        },
       

        // onChangeFile : function(oEvent){
        //     // debugger;
        //     this._import(oEvent.getParameter("files") && oEvent.getParameter("files")[0]);
        // },
        _import: function(file){
            var self = this;
            var aResults = [];
            if (file && window.FileReader) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    workbook.SheetNames.forEach(function(sheetName) {
                        // Here is your object for every sheet in workbook
                        aResults = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);   
                    });
                    console.log(aResults);
                    var oModel = new JSONModel({"xslx":aResults});
                        self.getView().setModel(oModel, "xlModel");
                        // self.getView().getModel("xlModel").setProperty("/xslx", aResults);
            
                };
                reader.onerror = function(ex) {
                    console.log(ex);
                };
                reader.readAsBinaryString(file);
            } 
        },
        onUploadExcel : function(){
            var self = this;
            var sys = this.getView().getModel("xlModel").getData().xslx;
			var oModel = this.getOwnerComponent().getModel();
			var aDeferredGroups = oModel.getDeferredGroups();
			aDeferredGroups = aDeferredGroups.concat(["createGrp"]);
			oModel.setDeferredGroups(aDeferredGroups);

            for (var i = 0; i < sys.length; i++) {
                // var path = sys[i]['File Path'];
                // var filePath = path.replace("/", "//");
                var data = {  
                    "businessFunction" : "EHS",
                    "principle" : "6",
                    "indicator" : "Essential",
                    "questionID" : "8",
                    "value_date" : sys[i]['Value Date'],
                    "id_waste_type": sys[i]['ID Waste Type'],
                    "id_complaint_type" : "",
                    "id_injury_type" : "",
                    "category" : " ",
                    "id_water_type" : " ",
                    "id_air_emission_type" : "",
                    "employee_type" : "",
                    "data_title" : sys[i]['Data Title'],
                    "company_code" : sys[i]['Company Code'], // NK
                    "country" : sys[i]['country'], //NK
                    "location_text" : sys[i]['Location Text'], //NK
                    "plant_id" : sys[i]['Plant Id'], //NK
                    "value" : sys[i]['Value'], //NK
                    "unit_text" : sys[i]['Unit Text'] //NK
                    
                  };
				oModel.create("/quantitative_data", data, {
					groupId: "createGrp"
				});
			}
            var oBusy = new sap.m.BusyDialog();
            // oBusy.open();
            oModel.submitChanges({
				groupId: "createGrp",
				success: function(res) {
                    // oBusy.close();
					// var msg = "";
					var aResponses = res.__batchResponses[0].__changeResponses;
                    if(aResponses){
                        sap.m.MessageBox.information("Uploaded successfully");
                    }
                    else{
                       var errorJSON= JSON.parse(res.__batchResponses[0].response.body);
                       var msg = errorJSON.error.message.value;
                       sap.m.MessageBox.information(msg);
                    }
                    that.getView().byId("_IDGenTable1").setBusy(false);
                    // that.onRefreshTable();
					// for (var i = 0; i < aResponses.length; i++) {
                    //       if(aResponses[i].statusCode === "201") {
                    //       	msg = msg + aResponses[i].data.FilePath + " Uploaded successfully \n";
                    //       }else{
                    //       		msg = msg + aResponses[i].data.FilePath + " creation failed \n";
                    //       }
					// }
                    // sap.m.MessageBox.information(msg);
                    // that.onRefreshTable();


				},
				error: function(err) {
					sap.m.MessageBox.error("Batch operation failed");
				}
			
            });
        },
        // createColumnConfig: function() {
        //     return [
        //         {
        //             label: 'Company Code',
        //             property: 'company_code',
        //             width: '25'
        //         },
        //         {
        //             label: 'Country',
        //             property: 'Country',
        //             width: '25'
        //         },
        //         {
        //             label: 'Location Text',
        //             property: 'location_text',
        //             width: '25'
        //         },
        //         {
        //             label: 'Plant Id',
        //             property: 'plant_id',
        //             width: '30'
        //         },
        //         {
        //             label: 'Data Title',
        //             property: 'data_title',
        //             width: '40'
        //         },
        //         {
        //             label: 'ID Waste Type',
        //             property: 'id_waste_type',
        //             width: '40'
        //         },
        //         {
        //             label: 'Value',
        //             property: 'value ',
        //             width: '18'
        //         },
        //         {
        //             label: 'Unit Text',
        //             property: 'unit_text',
        //             width: '18'
        //         },
        //         {
        //             label: 'Value Date',
        //             property: 'value_date',
        //             width: '18'
        //         }
        //         ];
        // },
        downloadTemplate : function() {
            let temp = [{
				"key": "company_code",
				"value": "company_code"
			}, {
				"key": "Country",
				"value": "Country"
			},
            {
				"key": "Location_text",
				"value": "Location_text"
			},
            {
                "key" : "plant_id",
                "value" : "plant_id"          
            },
            {
                "key" : "data_title",
                "value" : "data_title"          
            },
            {
				"key": "id_waste_type",
				"value": "id_waste_type"
			},
            {
				"key": "Value",
				"value": "Value"
			},
            {
				"key": "unit_text",
				"value": "unit_text"
			},
            {
				"key": "value_date",
				"value": "value_date"
			}
         ];
            // this.getOwnerComponent().getModel("systemsData").setProperty("/Temp", temp);

            var aCols, aProducts, oSettings, oSheet;

			aCols = this.createColumnConfig();
			// aProducts = this.getView().getModel("systemsData").getProperty('/Temp');
            aProducts = temp;
			oSettings = {
				workbook: { columns: aCols },
				dataSource: aProducts,
                fileName: 'P-6_E_I- 8 Waste Disposed.xlsx'
			};

			oSheet = new Spreadsheet(oSettings);
			oSheet.build()
				.then( function() {
					sap.m.MessageToast.show('Spreadsheet export has finished');
				})
				.finally(oSheet.destroy);
            

            }
        });
    });
