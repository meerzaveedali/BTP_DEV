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
        var oCont, oTableJsonModel, oTable, oFileUploader,fileName;
        return Controller.extend("excelupload.controller.View1", {
        onInit: function () {
            oCont = this;
            this.oDataModel = this.getOwnerComponent().getModel();
            oTableJsonModel = new JSONModel();
            oTable = oCont.getView().byId("Tableid");
            oFileUploader = oCont.getView().byId("id_fileUploader");
            fileName = "";
            var oEdit = {
                editable: false
            };
            var myedit = {};
            myedit.edit = oEdit;
            var oEditModel = new JSONModel(myedit);
            this.getView().setModel(oEditModel, "editModel");
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
        fnSelectChange1: function(oEvent){

                     let sKey = oEvent.getSource().getProperty("selectedKey"); 
                     if (sKey == "01"){
                        this.getView().byId("idplantform").setVisible(true);
                     }
                     if (sKey === "07")
                     {

                        var monetary  = this.getView().byId("idMonetaryTable");
                        monetary.setVisible(true);
                        monetary.removeAllItems();
                        var nonMonetary = this.getView().byId("idNonMonetaryTable");
                        nonMonetary.setVisible(true);
                        nonMonetary.removeAllItems();
                        var oTable = this.getView().byId("idTable");
                        oTable.setVisible(true);
                        oTable.removeAllItems();
                        var oTable1 = this.getView().byId("idTable1");
                        oTable1.setVisible(true);
                        oTable1.removeAllItems();
                        var TableSegment  = this.getView().byId("idTableSegment");
                        TableSegment.setVisible(false);
                        var PEmpTable = this.getView().byId("idPEmpTable");
                        PEmpTable.setVisible(false);
                        var NPEmpTable = this.getView().byId("idNPEmpTable");
                        NPEmpTable.setVisible(false);
                        var WorkerTable = this.getView().byId("idWorkerTable");
                        WorkerTable.setVisible(false);
                        var NonWorkerTable  = this.getView().byId("idNonWorkerTable");
                        NonWorkerTable.setVisible(false);
                        var RetireBenfTable = this.getView().byId("idRetireBenfTable");
                        RetireBenfTable.setVisible(false);
                        var MembershipEmpTable = this.getView().byId("idMembershipEmpTable");
                        MembershipEmpTable.setVisible(false);
                        var MembershipWorTable = this.getView().byId("idMembershipWorTable");
                        MembershipWorTable.setVisible(false);
                        var RateofWorkAndLeaveTable = this.getView().byId("idRateofWorkAndLeaveTable");
                        RateofWorkAndLeaveTable.setVisible(false);
                        var PEmpTrainingTable  = this.getView().byId("idPEmpTrainingTable");
                        PEmpTrainingTable.setVisible(false);
                        var WorkTrainingTable = this.getView().byId("idWorkTrainingTable");
                        WorkTrainingTable.setVisible(false);
                        var PerEmpTable  = this.getView().byId("idPerEmpTable");
                        PerEmpTable.setVisible(false);
                        var PerWorkTable = this.getView().byId("idPerWorkTable");
                        PerWorkTable.setVisible(false);
                        var EmpHumanRightTable = this.getView().byId("idEmpHumanRightTable");
                        EmpHumanRightTable.setVisible(false);
                        var WorkHumanRightTable = this.getView().byId("idWorkHumanRightTable");
                        WorkHumanRightTable.setVisible(false);
                        var PEmpWageTable = this.getView().byId("idPEmpWageTable");
                        PEmpWageTable.setVisible(false);
                        var WorkWageTable = this.getView().byId("idWorkWageTable");
                        WorkWageTable.setVisible(false);
                        var WageTable = this.getView().byId("idWageTable");
                        WageTable.setVisible(false);
                        var ComplaintTable = this.getView().byId("idComplaintTable");
                        ComplaintTable.setVisible(false);
                        var AssessmentsTable = this.getView().byId("idAssessmentsTable");
                        AssessmentsTable.setVisible(false);
                        var that = this;
                        this.oDataModel.read("/qualitative_data_Legal_Compliance(up__fiscalYear='2024',up__businessFunction='Legal_Compliance',principle='1',indicator='Essential',questionID='2')/principle1_essential_2", {
                            success : function(oData){
                                        let aItems = [];
                                        let aItems1 = [];
                                    for(let i=0;i<oData.results.length;i++){
                                        if(oData.results[i].type === "Monetary"){
                                            let oItem = new sap.m.ColumnListItem({
                                                cells: [
                                                  new sap.m.Text({ text: oData.results[i].typeOfPaidAmount}),
                                                  new sap.m.Input({ value: oData.results[i].ngrbcPrinciple, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].nameOfInstitutions, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].amountInINR, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].briefOfTheCase, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].hasAnAppealBeen, editable:"{editModel>/edit/editable}"}),
                                                ]
                                              });
                                              if(oData.results[i].typeOfPaidAmount === "Compounding fee"){
                                                aItems[2] = oItem;
                                            }
                                            if(oData.results[i].typeOfPaidAmount === "Penalty/ Fine"){
                                                aItems[0] = oItem;
                                            }
                                            if(oData.results[i].typeOfPaidAmount === "Settlement"){
                                                aItems[1] = oItem;
                                            }
                                            
                                        }
                                        if(oData.results[i].type === "Non-Monetary"){
                                            let oItem = new sap.m.ColumnListItem({
                                                cells: [
                                                  new sap.m.Text({ text: oData.results[i].typeOfPaidAmount}),
                                                  new sap.m.Input({ value: oData.results[i].ngrbcPrinciple, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].nameOfInstitutions, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].amountInINR, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].briefOfTheCase, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].hasAnAppealBeen, editable:"{editModel>/edit/editable}"}),
                                                ]
                                              });
                                              if(oData.results[i].typeOfPaidAmount === "Punishment"){
                                                aItems1[1] = oItem;
                                            }
                                            if(oData.results[i].typeOfPaidAmount === "Imprisonment"){
                                                aItems1[0] = oItem;
                                            }
                                        }
                                    }
                                    for(let i=0;i<aItems.length;i++)
                                        monetary.addItem(aItems[i]);

                                    for(let i=0;i<aItems1.length;i++)
                                        nonMonetary.addItem(aItems1[i]);
                            },
                            error : function(oError){

                            }

                        });

                        this.oDataModel.read("/qualitative_data_Legal_Compliance(up__fiscalYear='2024',up__businessFunction='Legal_Compliance',principle='1',indicator='Essential',questionID='5')/principle1_essential_5", {
                            success : function(oData){
                                let aItems = [];
                                    for(let i=0;i<oData.results.length;i++){
                                            let oItem = new sap.m.ColumnListItem({
                                                cells: [
                                                  new sap.m.Text({ text: oData.results[i].typeOfWorkers}),
                                                  new sap.m.Input({ value: oData.results[i].valueForCurrentFinancialYear, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].valueForPreviousFinancialYear, editable:"{editModel>/edit/editable}"}),
                                                ]
                                              });
                                              if(oData.results[i].typeOfWorkers === "Workers"){
                                                aItems[3] = oItem;
                                            }
                                            if(oData.results[i].typeOfWorkers === "Directors"){
                                                aItems[0] = oItem;
                                            }
                                            if(oData.results[i].typeOfWorkers === "Employees"){
                                                aItems[2] = oItem;
                                            }
                                            if(oData.results[i].typeOfWorkers === "KMPs"){
                                                aItems[1] = oItem;
                                            }
                                            }
                                        for(let i=0;i<aItems.length;i++)
                                            oTable.addItem(aItems[i]);
                        },
                            error : function(oError){

                            }

                        });

                        this.oDataModel.read("/qualitative_data_Legal_Compliance(up__fiscalYear='2024',up__businessFunction='Legal_Compliance',principle='1',indicator='Essential',questionID='6')/principle1_essential_6 ", {
                            success : function(oData){
                                let aItems= [];
                                    for(let i=0;i<oData.results.length;i++){
                                            let oItem = new sap.m.ColumnListItem({
                                                cells: [
                                                  new sap.m.Text({ text: oData.results[i].detailsOfComplaints}),
                                                  new sap.m.Input({ value: oData.results[i].numberForCurrentFinancialYear, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].remarksForCurrentFinancialYear, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].numberForPreviousFinancialYear, editable:"{editModel>/edit/editable}"}),
                                                  new sap.m.Input({ value: oData.results[i].remarksForPreviousFinancialYear, editable:"{editModel>/edit/editable}"}),
                                                ]
                                              });

                                              if(oData.results[i].detailsOfComplaints === "Number of complaints received in relation to issues of Conflict of Interest of the Directors"){
                                                aItems[0] = oItem;
                                            }
                                            if(oData.results[i].detailsOfComplaints === "Number of complaints received in relation to issues of Conflict of Interest of the KMPs"){
                                                aItems[1] = oItem;
                                            }

                                    }
                                            
                                    for(let i=0;i<aItems.length;i++)
                                            oTable1.addItem(aItems[i]);
                                        },
                            error : function(oError){

                            }

                        });
                        
                     }
                     else if(sKey === "04"){

                        var TableSegment  = this.getView().byId("idTableSegment");
                        TableSegment.setVisible(true);
                        TableSegment.removeAllItems();
                        var PEmpTable = this.getView().byId("idPEmpTable");
                        PEmpTable.setVisible(true);
                        PEmpTable.removeAllItems();
                        var NPEmpTable = this.getView().byId("idNPEmpTable");
                        NPEmpTable.setVisible(true);
                        NPEmpTable.removeAllItems();
                        var WorkerTable = this.getView().byId("idWorkerTable");
                        WorkerTable.setVisible(true);
                        WorkerTable.removeAllItems();
                        var NonWorkerTable  = this.getView().byId("idNonWorkerTable");
                        NonWorkerTable.setVisible(true);
                        NonWorkerTable.removeAllItems();
                        var RetireBenfTable = this.getView().byId("idRetireBenfTable");
                        RetireBenfTable.setVisible(true);
                        RetireBenfTable.removeAllItems();
                        var MembershipEmpTable = this.getView().byId("idMembershipEmpTable");
                        MembershipEmpTable.setVisible(true);
                        MembershipEmpTable.removeAllItems();
                        var MembershipWorTable = this.getView().byId("idMembershipWorTable");
                        MembershipWorTable.setVisible(true);
                        MembershipWorTable.removeAllItems();
                        var RateofWorkAndLeaveTable = this.getView().byId("idRateofWorkAndLeaveTable");
                        RateofWorkAndLeaveTable.setVisible(true);
                        RateofWorkAndLeaveTable.removeAllItems();
                        var PEmpTrainingTable  = this.getView().byId("idPEmpTrainingTable");
                        PEmpTrainingTable.setVisible(true);
                        PEmpTrainingTable.removeAllItems();
                        var WorkTrainingTable = this.getView().byId("idWorkTrainingTable");
                        WorkTrainingTable.setVisible(true);
                        WorkTrainingTable.removeAllItems();
                        var PerEmpTable  = this.getView().byId("idPerEmpTable");
                        PerEmpTable.setVisible(true);
                        PerEmpTable.removeAllItems();
                        var PerWorkTable = this.getView().byId("idPerWorkTable");
                        PerWorkTable.setVisible(true);
                        PerWorkTable.removeAllItems();
                        var EmpHumanRightTable = this.getView().byId("idEmpHumanRightTable");
                        EmpHumanRightTable.setVisible(true);
                        EmpHumanRightTable.removeAllItems();
                        var WorkHumanRightTable = this.getView().byId("idWorkHumanRightTable");
                        WorkHumanRightTable.setVisible(true);
                        WorkHumanRightTable.removeAllItems();
                        var PEmpWageTable = this.getView().byId("idPEmpWageTable");
                        PEmpWageTable.setVisible(true);
                        PEmpWageTable.removeAllItems();
                        var WorkWageTable = this.getView().byId("idWorkWageTable");
                        WorkWageTable.setVisible(true);
                        WorkWageTable.removeAllItems();
                        var WageTable = this.getView().byId("idWageTable");
                        WageTable.setVisible(true);
                        WageTable.removeAllItems();
                        var ComplaintTable = this.getView().byId("idComplaintTable");
                        ComplaintTable.setVisible(true);
                        ComplaintTable.removeAllItems();
                        var AssessmentsTable = this.getView().byId("idAssessmentsTable");
                        AssessmentsTable.setVisible(true);
                        AssessmentsTable.removeAllItems();
                        var monetary  = this.getView().byId("idMonetaryTable");
                        monetary.setVisible(false);
                        var nonMonetary = this.getView().byId("idNonMonetaryTable");
                        nonMonetary.setVisible(false);
                        var oTable = this.getView().byId("idTable");
                        oTable.setVisible(false);
                        var oTable1 = this.getView().byId("idTable1");
                        oTable1.setVisible(false);
                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2024',up__businessFunction='HR',principle='1',indicator='Essential',questionID='1')/principle1_essential_1", {
                            success : function(oData){
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].segment}),
                                          new sap.m.Input({ value: oData.results[i].numberOfTrainingPrograms}),
                                          new sap.m.Input({ value: oData.results[i].topicsCoveredUnderTraining}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfPersonsInRespectiveCategory}),
                                        ]
                                      });
                                      TableSegment.addItem(oItem);
                    }
                            },
                            error : function(oError){
                                debugger;
                            }
                        });
                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2024',up__businessFunction='HR',principle='3',indicator='Essential',questionID='1a')/principle3_essential_1a", {
                            success : function(oData){
                                for(let i=0;i<oData.results.length;i++){
                                    if(oData.results[i].type === "Permanent employees"){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].category}),
                                          new sap.m.Input({ value: oData.results[i].total}),
                                          new sap.m.Input({ value: oData.results[i].numberOfHealthInsurance}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfHealthInsurance}),
                                          new sap.m.Input({ value: oData.results[i].numberOfAccidentInsurance}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfAccidentInsurance}),
                                          new sap.m.Input({ value: oData.results[i].numberOfMaternityBenefits}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfMaternityBenefits}),
                                          new sap.m.Input({ value: oData.results[i].numberOfPaternityBenefits}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfPaternityBenefits}),
                                          new sap.m.Input({ value: oData.results[i].numberOfDayCareFacilities}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfDayCareFacilities}),
                                        ]
                                      });
                                      PEmpTable.addItem(oItem);
                                    }
                                    else 
                                        if(oData.results[i].type === "Other than Permanent employees"){
                                            let oItem = new sap.m.ColumnListItem({
                                                cells: [
                                                  new sap.m.Text({ text: oData.results[i].category}),
                                                  new sap.m.Input({ value: oData.results[i].total}),
                                                  new sap.m.Input({ value: oData.results[i].numberOfHealthInsurance}),
                                                  new sap.m.Input({ value: oData.results[i].percentageOfHealthInsurance}),
                                                  new sap.m.Input({ value: oData.results[i].numberOfAccidentInsurance}),
                                                  new sap.m.Input({ value: oData.results[i].percentageOfAccidentInsurance}),
                                                  new sap.m.Input({ value: oData.results[i].numberOfMaternityBenefits}),
                                                  new sap.m.Input({ value: oData.results[i].percentageOfMaternityBenefits}),
                                                  new sap.m.Input({ value: oData.results[i].numberOfPaternityBenefits}),
                                                  new sap.m.Input({ value: oData.results[i].percentageOfPaternityBenefits}),
                                                  new sap.m.Input({ value: oData.results[i].numberOfDayCareFacilities}),
                                                  new sap.m.Input({ value: oData.results[i].percentageOfDayCareFacilities}),
                                                ]
                                              });
                                              NPEmpTable.addItem(oItem);
                                    }
                                 }
                            },
                            error : function(oError){
                                debugger;
                            }
                        });
                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2024',up__businessFunction='HR',principle='3',indicator='Essential',questionID='1b')/principle3_essential_1b", {
                            success : function(oData){
                                for(let i=0;i<oData.results.length;i++){
                                    if(oData.results[i].type === "Permanent workers"){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].category}),
                                          new sap.m.Input({ value: oData.results[i].total}),
                                          new sap.m.Input({ value: oData.results[i].numberOfHealthInsurance}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfHealthInsurance}),
                                          new sap.m.Input({ value: oData.results[i].numberOfAccidentInsurance}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfAccidentInsurance}),
                                          new sap.m.Input({ value: oData.results[i].numberOfMaternityBenefits}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfMaternityBenefits}),
                                          new sap.m.Input({ value: oData.results[i].numberOfPaternityBenefits}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfPaternityBenefits}),
                                          new sap.m.Input({ value: oData.results[i].numberOfDayCareFacilities}),
                                          new sap.m.Input({ value: oData.results[i].percentageOfDayCareFacilities}),
                                        ]
                                      });
                                      WorkerTable.addItem(oItem);
                                    }
                                    else 
                                        if(oData.results[i].type === "Other than Permanent workers"){
                                            let oItem = new sap.m.ColumnListItem({
                                                cells: [
                                                  new sap.m.Text({ text: oData.results[i].category}),
                                                  new sap.m.Input({ value: oData.results[i].total}),
                                                  new sap.m.Input({ value: oData.results[i].numberOfHealthInsurance}),
                                                  new sap.m.Input({ value: oData.results[i].percentageOfHealthInsurance}),
                                                  new sap.m.Input({ value: oData.results[i].numberOfAccidentInsurance}),
                                                  new sap.m.Input({ value: oData.results[i].percentageOfAccidentInsurance}),
                                                  new sap.m.Input({ value: oData.results[i].numberOfMaternityBenefits}),
                                                  new sap.m.Input({ value: oData.results[i].percentageOfMaternityBenefits}),
                                                  new sap.m.Input({ value: oData.results[i].numberOfPaternityBenefits}),
                                                  new sap.m.Input({ value: oData.results[i].percentageOfPaternityBenefits}),
                                                  new sap.m.Input({ value: oData.results[i].numberOfDayCareFacilities}),
                                                  new sap.m.Input({ value: oData.results[i].percentageOfDayCareFacilities}),
                                                ]
                                              });
                                              NonWorkerTable.addItem(oItem);
                                    }
                                 }
                            },
                            error : function(oError){
                                debugger;
                            }
                        });
                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2024',up__businessFunction='HR',principle='3',indicator='Essential',questionID='2')/principle3_essential_2", {
                            success : function(oData){
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].benefits}),
                                          new sap.m.Input({ value: oData.results[i].currentFYEmployees}),
                                          new sap.m.Input({ value: oData.results[i].currentFYWorkers}),
                                          new sap.m.Input({ value: oData.results[i].currentFYauthority}),
                                          new sap.m.Input({ value: oData.results[i].previousFYEmployees}),
                                          new sap.m.Input({ value: oData.results[i].previousFYWorkers}),
                                          new sap.m.Input({ value: oData.results[i].previousFYauthority}),
                                        ]
                                      });
                                      RetireBenfTable.addItem(oItem);
                    }
                            },
                            error : function(oError){
                                debugger;
                            }
                        });

                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2024',up__businessFunction='HR',principle='3',indicator='Essential',questionID='5')/principle3_essential_5", {
                            success : function(oData){
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].gender}),
                                          new sap.m.Input({ value: oData.results[i].permanentEmployeesReturnToWorkRate}),
                                          new sap.m.Input({ value: oData.results[i].permanentEmployeesRetentionRate}),
                                          new sap.m.Input({ value: oData.results[i].permanentWorkersReturnToWorkRate}),
                                          new sap.m.Input({ value: oData.results[i].permanentWorkersRetentionRate}),
                                        ]
                                      });
                                      RateofWorkAndLeaveTable.addItem(oItem);
                    }
                            },
                            error : function(oError){
                                debugger;
                            }
                        });

                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2024',up__businessFunction='HR',principle='3',indicator='Essential',questionID='7')/principle3_essential_7", {
                            success : function(oData){
                                for(let i=0;i<oData.results.length;i++){
                                    if(oData.results[i].type === "Total Permanent Employees"){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].category}),
                                          new sap.m.Input({ value: oData.results[i].currentFYTotalEmployees}),
                                          new sap.m.Input({ value: oData.results[i].currentFYTotalEmployeesPartOfUnions}),
                                          new sap.m.Input({ value: oData.results[i].currentFYPercentage}),
                                          new sap.m.Input({ value: oData.results[i].previousFYTotalEmployees}),
                                          new sap.m.Input({ value: oData.results[i].previousFYTotalEmployeesPartOfUnions}),
                                          new sap.m.Input({ value: oData.results[i].previousFYPercentage}),
                                        ]
                                      });
                                      MembershipEmpTable.addItem(oItem);
                    }       else
                         if(oData.results[i].type === "Total Permanent Workers"){
                        let oItem = new sap.m.ColumnListItem({
                            cells: [
                              new sap.m.Text({ text: oData.results[i].category}),
                              new sap.m.Input({ value: oData.results[i].currentFYTotalEmployees}),
                              new sap.m.Input({ value: oData.results[i].currentFYTotalEmployeesPartOfUnions}),
                              new sap.m.Input({ value: oData.results[i].currentFYPercentage}),
                              new sap.m.Input({ value: oData.results[i].previousFYTotalEmployees}),
                              new sap.m.Input({ value: oData.results[i].previousFYTotalEmployeesPartOfUnions}),
                              new sap.m.Input({ value: oData.results[i].previousFYPercentage}),
                            ]
                          });
                          MembershipWorTable.addItem(oItem);
        }
                }
                            },
                            error : function(oError){
                                debugger;
                            }
                        });

                        
                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2024',up__businessFunction='HR',principle='3',indicator='Essential',questionID='8')/principle3_essential_8", {
                            success : function(oData){
                                for(let i=0;i<oData.results.length;i++){
                                    if(oData.results[i].type === "Employees"){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].category}),
                                          new sap.m.Input({ value: oData.results[i].currentFYTotal}),
                                          new sap.m.Input({ value: oData.results[i].currentFYNumberHealthSafetyMeasures}),
                                          new sap.m.Input({ value: oData.results[i].currentFYPercentageHealthSafetyMeasures}),
                                          new sap.m.Input({ value: oData.results[i].currentFYNumberSkillUpgradation}),
                                          new sap.m.Input({ value: oData.results[i].currentFYPercentageSkillUpgradation}),
                                          new sap.m.Input({ value: oData.results[i].previousFYTotal}),
                                          new sap.m.Input({ value: oData.results[i].previousFYNumberHealthSafetyMeasures}),
                                          new sap.m.Input({ value: oData.results[i].previousFYPercentageHealthSafetyMeasures}),
                                          new sap.m.Input({ value: oData.results[i].previousFYNumberSkillUpgradation}),
                                          new sap.m.Input({ value: oData.results[i].previousFYPercentageSkillUpgradation}),
                                        ]
                                      });
                                      PEmpTrainingTable.addItem(oItem);
                    }       else
                         if(oData.results[i].type === "Workers"){
                        let oItem = new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({ text: oData.results[i].category}),
                                new sap.m.Input({ value: oData.results[i].currentFYTotal}),
                                new sap.m.Input({ value: oData.results[i].currentFYNumberHealthSafetyMeasures}),
                                new sap.m.Input({ value: oData.results[i].currentFYPercentageHealthSafetyMeasures}),
                                new sap.m.Input({ value: oData.results[i].currentFYNumberSkillUpgradation}),
                                new sap.m.Input({ value: oData.results[i].currentFYPercentageSkillUpgradation}),
                                new sap.m.Input({ value: oData.results[i].previousFYTotal}),
                                new sap.m.Input({ value: oData.results[i].previousFYNumberHealthSafetyMeasures}),
                                new sap.m.Input({ value: oData.results[i].previousFYPercentageHealthSafetyMeasures}),
                                new sap.m.Input({ value: oData.results[i].previousFYNumberSkillUpgradation}),
                                new sap.m.Input({ value: oData.results[i].previousFYPercentageSkillUpgradation}),
                            ]
                          });
                          WorkTrainingTable.addItem(oItem);
        }
                }
                            },
                            error : function(oError){
                                debugger;
                            }
                        });

                                
                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2024',up__businessFunction='HR',principle='3',indicator='Essential',questionID='9')/principle3_essential_9", {
                            success : function(oData){
                                for(let i=0;i<oData.results.length;i++){
                                    if(oData.results[i].type === "Employees"){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                            new sap.m.Text({ text: oData.results[i].category}),
                                            new sap.m.Input({ value: oData.results[i].currentFYTotal}),
                                            new sap.m.Input({ value: oData.results[i].currentFYNumber}),
                                            new sap.m.Input({ value: oData.results[i].currentFYPercentage}),
                                            new sap.m.Input({ value: oData.results[i].previousFYTotal}),
                                            new sap.m.Input({ value: oData.results[i].previousFYNumber}),
                                            new sap.m.Input({ value: oData.results[i].previousFYPercentage}),
                                        ]
                                      });
                                      PerEmpTable.addItem(oItem);
                    }       else
                         if(oData.results[i].type === "Workers"){
                        let oItem = new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({ text: oData.results[i].category}),
                                new sap.m.Input({ value: oData.results[i].currentFYTotal}),
                                new sap.m.Input({ value: oData.results[i].currentFYNumber}),
                                new sap.m.Input({ value: oData.results[i].currentFYPercentage}),
                                new sap.m.Input({ value: oData.results[i].previousFYTotal}),
                                new sap.m.Input({ value: oData.results[i].previousFYNumber}),
                                new sap.m.Input({ value: oData.results[i].previousFYPercentage}),
                            ]
                          });
                          PerWorkTable.addItem(oItem);
        }
                }
                            },
                            error : function(oError){
                                debugger;
                            }
                        });

                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2024',up__businessFunction='HR',principle='5',indicator='Essential',questionID='1')/principle5_essential_1", {
                            success : function(oData){
                                for(let i=0;i<oData.results.length;i++){
                                    if(oData.results[i].type === "Employees"){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                            new sap.m.Text({ text: oData.results[i].category}),
                                            new sap.m.Input({ value: oData.results[i].currentFYTotal}),
                                            new sap.m.Input({ value: oData.results[i].currentFYNumber}),
                                            new sap.m.Input({ value: oData.results[i].currentFYPercentage}),
                                            new sap.m.Input({ value: oData.results[i].previousFYTotal}),
                                            new sap.m.Input({ value: oData.results[i].previousFYNumber}),
                                            new sap.m.Input({ value: oData.results[i].previousFYPercentage}),
                                        ]
                                      });
                                      EmpHumanRightTable.addItem(oItem);
                    }       else
                         if(oData.results[i].type === "Workers"){
                        let oItem = new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({ text: oData.results[i].category}),
                                new sap.m.Input({ value: oData.results[i].currentFYTotal}),
                                new sap.m.Input({ value: oData.results[i].currentFYNumber}),
                                new sap.m.Input({ value: oData.results[i].currentFYPercentage}),
                                new sap.m.Input({ value: oData.results[i].previousFYTotal}),
                                new sap.m.Input({ value: oData.results[i].previousFYNumber}),
                                new sap.m.Input({ value: oData.results[i].previousFYPercentage}),
                            ]
                          });
                          WorkHumanRightTable.addItem(oItem);
        }
                }
                            },
                            error : function(oError){
                                debugger;
                            }
                        });

                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2024',up__businessFunction='HR',principle='5',indicator='Essential',questionID='2')/principle5_essential_2", {
                            success : function(oData){
                                for(let i=0;i<oData.results.length;i++){
                                    if(oData.results[i].type === "Employees"){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                            new sap.m.Text({ text: oData.results[i].subType + " " + oData.results[i].category}),
                                            new sap.m.Input({ value: oData.results[i].currentFYTotal}),
                                            new sap.m.Input({ value: oData.results[i].currentFYNumberEqualToMinimumWage}),
                                            new sap.m.Input({ value: oData.results[i].currentFYPercentageEqualToMinimumWage}),
                                            new sap.m.Input({ value: oData.results[i].currentFYNumberMoreThanMinimumWage}),
                                            new sap.m.Input({ value: oData.results[i].currentFYPercentageMoreThanMinimumWage}),
                                            new sap.m.Input({ value: oData.results[i].previousFYTotal}),
                                            new sap.m.Input({ value: oData.results[i].previousFYNumberEqualToMinimumWage}),
                                            new sap.m.Input({ value: oData.results[i].previousFYPercentageEqualToMinimumWage}),
                                            new sap.m.Input({ value: oData.results[i].previousFYNumberMoreThanMinimumWage}),
                                            new sap.m.Input({ value: oData.results[i].previousFYPercentageMoreThanMinimumWage}),
                                        ]
                                      });
                                      PEmpWageTable.addItem(oItem);
                    }       else
                         if(oData.results[i].type === "Workers"){
                        let oItem = new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({ text: oData.results[i].subType + " " + oData.results[i].category }),
                                new sap.m.Input({ value: oData.results[i].currentFYTotal}),
                                new sap.m.Input({ value: oData.results[i].currentFYNumberEqualToMinimumWage}),
                                new sap.m.Input({ value: oData.results[i].currentFYPercentageEqualToMinimumWage}),
                                new sap.m.Input({ value: oData.results[i].currentFYNumberMoreThanMinimumWage}),
                                new sap.m.Input({ value: oData.results[i].currentFYPercentageMoreThanMinimumWage}),
                                new sap.m.Input({ value: oData.results[i].previousFYTotal}),
                                new sap.m.Input({ value: oData.results[i].previousFYNumberEqualToMinimumWage}),
                                new sap.m.Input({ value: oData.results[i].previousFYPercentageEqualToMinimumWage}),
                                new sap.m.Input({ value: oData.results[i].previousFYNumberMoreThanMinimumWage}),
                                new sap.m.Input({ value: oData.results[i].previousFYPercentageMoreThanMinimumWage}),
                            ]
                          });
                          WorkWageTable.addItem(oItem);
        }
                }
                            },
                            error : function(oError){
                                debugger;
                            }
                        });

                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2024',up__businessFunction='HR',principle='5',indicator='Essential',questionID='3')/principle5_essential_3", {
                            success : function(oData){
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].type}),
                                          new sap.m.Input({ value: oData.results[i].maleNumber}),
                                          new sap.m.Input({ value: oData.results[i].maleMedianRemuneration}),
                                          new sap.m.Input({ value: oData.results[i].femaleNumber}),
                                          new sap.m.Input({ value: oData.results[i].femaleMedianRemuneration}),
                                        ]
                                      });
                                      WageTable.addItem(oItem);
                    }
                            },
                            error : function(oError){
                                debugger;
                            }
                        });

                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2024',up__businessFunction='HR',principle='5',indicator='Essential',questionID='6')/principle5_essential_6", {
                            success : function(oData){
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].type}),
                                          new sap.m.Input({ value: oData.results[i].currentFYComplaintsFiled}),
                                          new sap.m.Input({ value: oData.results[i].currentFYComplaintsPending}),
                                          new sap.m.Input({ value: oData.results[i].currentFYComplaintsRemarks}),
                                          new sap.m.Input({ value: oData.results[i].previousFYComplaintsFiled}),
                                          new sap.m.Input({ value: oData.results[i].previousFYComplaintsPending}),
                                          new sap.m.Input({ value: oData.results[i].previousFYComplaintsRemarks}),
                                        ]
                                      });
                                      ComplaintTable.addItem(oItem);
                    }
                            },
                            error : function(oError){
                                debugger;
                            }
                        });

                        this.oDataModel.read("/qualitative_data_HR(up__fiscalYear='2024',up__businessFunction='HR',principle='5',indicator='Essential',questionID='9')/principle5_essential_9", {
                            success : function(oData){
                                for(let i=0;i<oData.results.length;i++){
                                    let oItem = new sap.m.ColumnListItem({
                                        cells: [
                                          new sap.m.Text({ text: oData.results[i].type}),
                                          new sap.m.Input({ value: oData.results[i].percentage}),
                                        ]
                                      });
                                      AssessmentsTable.addItem(oItem);
                    }
                            },
                            error : function(oError){
                                debugger;
                            }
                        });
                     }
        },
        onCancel : function(){
            this.getView().byId("idEdit").setVisible(true);
            this.getView().byId("idSubmit").setVisible(false);
            this.getView().byId("idCancel").setVisible(false);
            this.getView().getModel("editModel").setData({edit:false});
        },
        onEdit : function(){
            this.getView().byId("idEdit").setVisible(false);
            this.getView().byId("idSubmit").setVisible(true);
            this.getView().byId("idCancel").setVisible(true);
            let sKey = this.getView().byId("id_BF").getProperty("selectedKey");
            if(sKey === "07"){
                this.getView().getModel("editModel").setData({edit:true});
            }
        },
        // OnSubmit : function() {
            
        //     this.getView().byId("idEdit").setVisible(true);
        //     this.getView().byId("idSubmit").setVisible(false);
        //     this.getView().byId("idCancel").setVisible(false);
        //     let sKey = this.getView().byId("id_BF").getProperty("selectedKey");
        //     if (sKey === "07")
        //         { 
        //             this.getView().getModel("editModel").setData({edit:false});
        //             var monetary  = this.getView().byId("idMonetaryTable");
        //             var nonMonetary = this.getView().byId("idNonMonetaryTable");
        //             var oTable = this.getView().byId("idTable");
        //             var oTable1 = this.getView().byId("idTable1");
        //             var omonetaryItems = monetary.getItems();
        //             var ononMonetaryItems = nonMonetary.getItems();
        //             var oTableItems = oTable.getItems();
        //             var oTable1Items = oTable1.getItems();

        //            var oPayload = {
                
        //             "status": "Submitted",
                
        //             "creator_email": "renuka.dimber@bristlecone.com",
                
        //             "creator_name": "Renuka Dimber",
                
        //             "Legal_Compliance": [
                
        //                 {
                
        //                     "principle": "1",
                
        //                     "indicator": "Essential",
                
        //                     "questionID": "2",
                
        //                     "principle1_essential_2": [
                
        //                         {
                
        //                             "type": "Monetary",
                
        //                             "typeOfPaidAmount": "Penalty/ Fine",
                
        //                             "ngrbcPrinciple": omonetaryItems[0].getAggregation("cells")[1].getProperty("value"),
                
        //                             "nameOfInstitutions": omonetaryItems[0].getAggregation("cells")[2].getProperty("value"),
                
        //                             "amountInINR": omonetaryItems[0].getAggregation("cells")[3].getProperty("value"),
                
        //                             "briefOfTheCase": omonetaryItems[0].getAggregation("cells")[4].getProperty("value"),
                
        //                             "hasAnAppealBeen": omonetaryItems[0].getAggregation("cells")[5].getProperty("value")
                
        //                         },
                
        //                         {
                
        //                             "type": "Monetary",
                
        //                             "typeOfPaidAmount": "Settlement",
                
        //                             "ngrbcPrinciple": omonetaryItems[1].getAggregation("cells")[1].getProperty("value"),
                
        //                             "nameOfInstitutions": omonetaryItems[1].getAggregation("cells")[2].getProperty("value"),
                
        //                             "amountInINR": omonetaryItems[1].getAggregation("cells")[3].getProperty("value"),
                
        //                             "briefOfTheCase": omonetaryItems[1].getAggregation("cells")[4].getProperty("value"),
                
        //                             "hasAnAppealBeen": omonetaryItems[1].getAggregation("cells")[5].getProperty("value")
                
        //                         },
                
        //                         {
                
        //                             "type": "Monetary",
                
        //                             "typeOfPaidAmount": "Compounding fee",
                
        //                             "ngrbcPrinciple": omonetaryItems[2].getAggregation("cells")[1].getProperty("value"),
                
        //                             "nameOfInstitutions": omonetaryItems[2].getAggregation("cells")[2].getProperty("value"),
                
        //                             "amountInINR": omonetaryItems[2].getAggregation("cells")[3].getProperty("value"),
                
        //                             "briefOfTheCase": omonetaryItems[2].getAggregation("cells")[4].getProperty("value"),
                
        //                             "hasAnAppealBeen": omonetaryItems[2].getAggregation("cells")[5].getProperty("value")
                
        //                         },
                
        //                         {
                
        //                             "type": "Non-Monetary",
                
        //                             "typeOfPaidAmount": "Imprisonment",
                
        //                             "ngrbcPrinciple": ononMonetaryItems[0].getAggregation("cells")[1].getProperty("value"),
                
        //                             "nameOfInstitutions": ononMonetaryItems[0].getAggregation("cells")[2].getProperty("value"),
                
        //                             "amountInINR": ononMonetaryItems[0].getAggregation("cells")[3].getProperty("value"),
                
        //                             "briefOfTheCase": ononMonetaryItems[0].getAggregation("cells")[4].getProperty("value"),
                
        //                             "hasAnAppealBeen": ononMonetaryItems[0].getAggregation("cells")[5].getProperty("value")
                
        //                         },
                
        //                         {
                
        //                             "type": "Non-Monetary",
                
        //                             "typeOfPaidAmount": "Punishment",
                
        //                             "ngrbcPrinciple": ononMonetaryItems[1].getAggregation("cells")[1].getProperty("value"),
                
        //                             "nameOfInstitutions": ononMonetaryItems[1].getAggregation("cells")[2].getProperty("value"),
                
        //                             "amountInINR": ononMonetaryItems[1].getAggregation("cells")[3].getProperty("value"),
                
        //                             "briefOfTheCase": ononMonetaryItems[1].getAggregation("cells")[4].getProperty("value"),
                
        //                             "hasAnAppealBeen": ononMonetaryItems[1].getAggregation("cells")[5].getProperty("value")
                
        //                         }
                
        //                     ]
                
        //                 },
                
        //                 {
                
        //                     "principle": "1",
                
        //                     "indicator": "Essential",
                
        //                     "questionID": "5",
                
        //                     "principle1_essential_5": [
                
        //                         {
                
        //                             "typeOfWorkers": "Directors",
                
        //                             "valueForCurrentFinancialYear": oTableItems[0].getAggregation("cells")[1].getProperty("value"),
                
        //                             "valueForPreviousFinancialYear": oTableItems[0].getAggregation("cells")[2].getProperty("value")
                
        //                         },
                
        //                         {
                
        //                             "typeOfWorkers": "KMPs",
                
        //                             "valueForCurrentFinancialYear": oTableItems[1].getAggregation("cells")[1].getProperty("value"),
                
        //                             "valueForPreviousFinancialYear": oTableItems[1].getAggregation("cells")[2].getProperty("value")
                
        //                         },
                
        //                         {
                
        //                             "typeOfWorkers": "Employees",
                
        //                             "valueForCurrentFinancialYear": oTableItems[2].getAggregation("cells")[1].getProperty("value"),
                
        //                             "valueForPreviousFinancialYear": oTableItems[2].getAggregation("cells")[2].getProperty("value")
                
        //                         },
                
        //                         {
                
        //                             "typeOfWorkers": "Workers",
                
        //                             "valueForCurrentFinancialYear": oTableItems[3].getAggregation("cells")[1].getProperty("value"),
                
        //                             "valueForPreviousFinancialYear": oTableItems[3].getAggregation("cells")[2].getProperty("value")
                
        //                         }
                
        //                     ]
                
        //                 },
                
        //                 {
                
        //                     "principle": "1",
                
        //                     "indicator": "Essential",
                
        //                     "questionID": "6",
                
        //                     "principle1_essential_6": [
                
        //                         {
                
        //                             "detailsOfComplaints": "Number of complaints received in relation to issues of Conflict of Interest of the Directors",
                
        //                             "numberForCurrentFinancialYear": oTable1Items[0].getAggregation("cells")[1].getProperty("value"),
                
        //                             "remarksForCurrentFinancialYear": oTable1Items[0].getAggregation("cells")[2].getProperty("value"),
                
        //                             "numberForPreviousFinancialYear": oTable1Items[0].getAggregation("cells")[3].getProperty("value"),
                
        //                             "remarksForPreviousFinancialYear": oTable1Items[0].getAggregation("cells")[4].getProperty("value")
                
        //                         },
                
        //                         {
                
        //                             "detailsOfComplaints": "Number of complaints received in relation to issues of Conflict of Interest of the KMPs",
                
        //                             "numberForCurrentFinancialYear": oTable1Items[1].getAggregation("cells")[1].getProperty("value"),
                
        //                             "remarksForCurrentFinancialYear": oTable1Items[1].getAggregation("cells")[2].getProperty("value"),
                
        //                             "numberForPreviousFinancialYear": oTable1Items[1].getAggregation("cells")[3].getProperty("value"),
                
        //                             "remarksForPreviousFinancialYear": oTable1Items[1].getAggregation("cells")[4].getProperty("value")
                
        //                         }
                
        //                     ]
                
        //                 }
                
        //             ]
                
        //         };
        //         var that = this;
        //        this.oDataModel.update("/qualitative_data(fiscalYear='2024',businessFunction='Legal_Compliance')", oPayload, {
                
        //         success : function(oData){
        //                 MessageBox.show("Data Saved Successfully");
                        
        //         },

        //         error : function(oError){
        //             MessageBox.show(oError);
        //         }
            
            
            
        //     });

        //                 var workObj = {

        //                     "definitionId": "eu10.sap-process-automation-q40kapza.zbrsrlegalcompliance.zapproval_process_for_legal_compliance",
                        
        //                     "context": {
                        
        //                         "zbusiness_function": "Legal_Compliance",
                        
        //                         "zfiscal_year": "2024",
                        
        //                         "zlegal_compliance_creator_email": "shriyansh.k@bristlecone.com",
                        
        //                         "zlegal_compliance_creator_name": "Shriyansh Keserwani",
                        
        //                         "zlegal_compliance_principle1_essential_2": [
                        
        //                             {
                        
        //                                 "type": "Monetary",
                        
        //                                 "typeOfPaidAmount": "Penalty/Fine",
                        
        //                                 "ngrbcPrinciple": omonetaryItems[0].getAggregation("cells")[1].getProperty("value"),
                        
        //                                 "nameOfInstitutions": omonetaryItems[0].getAggregation("cells")[2].getProperty("value"),
                        
        //                                 "amountInINR": omonetaryItems[0].getAggregation("cells")[3].getProperty("value"),
                        
        //                                 "briefOfTheCase": omonetaryItems[0].getAggregation("cells")[4].getProperty("value"),
                        
        //                                 "hasAnAppealBeen": omonetaryItems[0].getAggregation("cells")[5].getProperty("value")
                        
        //                             },
                        
        //                             {
                        
        //                                 "type": "Monetary",
                        
        //                                 "typeOfPaidAmount": "Settlement",
                        
        //                                 "ngrbcPrinciple": omonetaryItems[1].getAggregation("cells")[1].getProperty("value"),
                        
        //                                 "nameOfInstitutions": omonetaryItems[1].getAggregation("cells")[2].getProperty("value"),
                        
        //                                 "amountInINR": omonetaryItems[1].getAggregation("cells")[3].getProperty("value"),
                        
        //                                 "briefOfTheCase": omonetaryItems[1].getAggregation("cells")[4].getProperty("value"),
                        
        //                                 "hasAnAppealBeen": omonetaryItems[1].getAggregation("cells")[5].getProperty("value")
                        
        //                             },
                        
        //                             {
                        
        //                                 "type": "Monetary",
                        
        //                                 "typeOfPaidAmount": "Compounding fee",
                        
        //                                 "ngrbcPrinciple": omonetaryItems[2].getAggregation("cells")[1].getProperty("value"),
                        
        //                                 "nameOfInstitutions": omonetaryItems[2].getAggregation("cells")[2].getProperty("value"),
                        
        //                                 "amountInINR": omonetaryItems[2].getAggregation("cells")[3].getProperty("value"),
                        
        //                                 "briefOfTheCase": omonetaryItems[2].getAggregation("cells")[4].getProperty("value"),
                        
        //                                 "hasAnAppealBeen": omonetaryItems[2].getAggregation("cells")[5].getProperty("value")
                        
        //                             },
                        
        //                             {
                        
        //                                 "type": "Non-Monetary",
                        
        //                                 "typeOfPaidAmount": "Imprisonment",
                        
        //                                 "ngrbcPrinciple": ononMonetaryItems[0].getAggregation("cells")[1].getProperty("value"),
                        
        //                                 "nameOfInstitutions": ononMonetaryItems[0].getAggregation("cells")[2].getProperty("value"),
                        
        //                                 "amountInINR": ononMonetaryItems[0].getAggregation("cells")[3].getProperty("value"),
                        
        //                                 "briefOfTheCase": ononMonetaryItems[0].getAggregation("cells")[4].getProperty("value"),
                        
        //                                 "hasAnAppealBeen": ononMonetaryItems[0].getAggregation("cells")[5].getProperty("value")
                        
        //                             },
                        
        //                             {
                        
        //                                 "type": "Non-Monetary",
                        
        //                                 "typeOfPaidAmount": "Punishment",
                        
        //                                 "ngrbcPrinciple": ononMonetaryItems[1].getAggregation("cells")[1].getProperty("value"),
                        
        //                                 "nameOfInstitutions": ononMonetaryItems[1].getAggregation("cells")[2].getProperty("value"),
                        
        //                                 "amountInINR": ononMonetaryItems[1].getAggregation("cells")[3].getProperty("value"),
                        
        //                                 "briefOfTheCase": ononMonetaryItems[1].getAggregation("cells")[4].getProperty("value"),
                        
        //                                 "hasAnAppealBeen": ononMonetaryItems[1].getAggregation("cells")[5].getProperty("value")
                        
        //                             }
                        
        //                         ],
                        
        //                         "zlegal_compliance_principle1_essential_5": [
                        
        //                             {
                        
        //                                 "typeOfWorkers": "Directors",
                        
        //                                 "valueForCurrentFinancialYear": oTableItems[0].getAggregation("cells")[1].getProperty("value"),
                        
        //                                 "valueForPreviousFinancialYear": oTableItems[0].getAggregation("cells")[2].getProperty("value")
                        
        //                             },
                        
        //                             {
                        
        //                                 "typeOfWorkers": "KMPs",
                        
        //                                 "valueForCurrentFinancialYear": oTableItems[1].getAggregation("cells")[1].getProperty("value"),
                        
        //                                 "valueForPreviousFinancialYear": oTableItems[1].getAggregation("cells")[2].getProperty("value")
                        
        //                             },
                        
        //                             {
                        
        //                                 "typeOfWorkers": "Employees",
                        
        //                                 "valueForCurrentFinancialYear": oTableItems[2].getAggregation("cells")[1].getProperty("value"),
                        
        //                                 "valueForPreviousFinancialYear": oTableItems[2].getAggregation("cells")[2].getProperty("value")
                        
        //                             },
                        
        //                             {
                        
        //                                 "typeOfWorkers": "Workers",
                        
        //                                 "valueForCurrentFinancialYear": oTableItems[3].getAggregation("cells")[1].getProperty("value"),
                        
        //                                 "valueForPreviousFinancialYear": oTableItems[3].getAggregation("cells")[2].getProperty("value")
                        
        //                             }
                        
        //                         ],
                        
        //                         "zlegal_compliance_principle1_essential_6": [
                        
        //                             {
                        
        //                                 "detailsOfComplaints": "Number of complaints received in relation to issues of Conflict of Interest of the Directors",
                        
        //                                 "numberForCurrentFinancialYear": oTable1Items[0].getAggregation("cells")[1].getProperty("value"),
                        
        //                                 "remarksForCurrentFinancialYear": oTable1Items[0].getAggregation("cells")[2].getProperty("value"),
                        
        //                                 "numberForPreviousFinancialYear": oTable1Items[0].getAggregation("cells")[3].getProperty("value"),
                        
        //                                 "remarksForPreviousFinancialYear": oTable1Items[0].getAggregation("cells")[4].getProperty("value")
                        
        //                             },
                        
        //                             {
                        
        //                                 "detailsOfComplaints": "Number of complaints received in relation to issues of Conflict of Interest of the KMPs",
                        
        //                                 "numberForCurrentFinancialYear": oTable1Items[1].getAggregation("cells")[1].getProperty("value"),
                        
        //                                 "remarksForCurrentFinancialYear": oTable1Items[1].getAggregation("cells")[2].getProperty("value"),
                        
        //                                 "numberForPreviousFinancialYear": oTable1Items[1].getAggregation("cells")[3].getProperty("value"),
                        
        //                                 "remarksForPreviousFinancialYear": oTable1Items[1].getAggregation("cells")[4].getProperty("value")
                        
        //                             }
                        
        //                         ],
                        
        //                         "zlegal_compliance_principle1_essential_3": [
                        
        //                             {
                        
        //                                 "case_details": "",
                        
        //                                 "name_regulatory_agencies": ""
                        
        //                             }
                        
        //                         ],
                        
        //                         "zlegal_compliance_principle7_essential_1": [
                        
        //                             {
                        
        //                                 "sr_no": "",
                        
        //                                 "name_of_trade_industy_associations": "",
                        
        //                                 "reach_of_trade_industy_associations": ""
                        
        //                             }
                        
        //                         ],
                        
        //                         "zlegal_compliance_principle7_essential_2": [
                        
        //                             {
                        
        //                                 "name_of_authority": "",
                        
        //                                 "brief_of_case": "",
                        
        //                                 "corrective_actions_taken": ""
                        
        //                             }
                        
        //                         ],
                        
        //                         "zlegal_compliance_principle7_leadership_1": [
                        
        //                             {
                        
        //                                 "sr_no": "",
                        
        //                                 "public_policy_advocated": "",
                        
        //                                 "method_resorted_for_advocacy": "",
                        
        //                                 "information_available_in_public_domain": "",
                        
        //                                 "frequency_of_review_by_board": "",
                        
        //                                 "web_link": ""
                        
        //                             }
                        
        //                         ]
                        
        //                     }
                        
        //                 };

        //                 var appId = that.getOwnerComponent().getManifestEntry("/sap.app/id");
        //                 var appPath = appId.replaceAll(".", "/");
        //                 var appModulePath = jQuery.sap.getModulePath(appPath);
        //                     that.getView().setBusy(true);

        //                     $.ajax({
        //                         url: appModulePath + "/bpmworkflowruntime/v1/xsrf-token",
        //                         method: "GET",
        //                         headers: {
        //                             "X-CSRF-Token": "Fetch"
        //                         },
        //                         success: function (result, xhr, data) {
        //                             var token = data.getResponseHeader("X-CSRF-Token");
        //                             if (token === null) return;
            
        //                             $.ajax({
        //                                 url: appModulePath + "/bpmworkflowruntime/v1/workflow-instances",
        //                                 type: "POST",
        //                                 data: JSON.stringify(workObj),
        //                                 headers: {
        //                                     "X-CSRF-Token": token,
        //                                     "Content-Type": "application/json"
        //                                 },
        //                                 async: false,
        //                                 success: function (data, response) {
        //                                     var successMsg;
        //                                     that.getView().setBusy(false);
        //                                     successMsg = "Request Sent for Approval";
        //                                     MessageBox.success(successMsg, {
        //                                         icon: MessageBox.Icon.SUCCESS,
        //                                         title: "SUCCESS",
        //                                         actions: [MessageBox.Action.OK],
        //                                         initialFocus: MessageBox.Action.OK,
        //                                         onClose: function (Action) {
        //                                             // that.clearForm();
        //                                             that.getView().setBusy(false);
        //                                         }
        //                                     });
        //                                 },
        //                                 error: function (e) {
        //                                     that.getView().setBusy(false);
        //                                     MessageBox.show(JSON.stringify(e), {
        //                                         icon: MessageBox.Icon.ERROR,
        //                                         title: "ERROR"
        //                                     });
        //                                 }
        //                             });
        //                                 },
        //                                 error: function (e) {
        //                                     that.getView().setBusy(false);
        //                                     MessageBox.show(JSON.stringify(e), {
        //                                         icon: MessageBox.Icon.ERROR,
        //                                         title: "ERROR"
        //                                     });
        //                                 }
        //                             });

        //     }
        // },
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
                    if(ColumnsData[0] == "Value Date"){
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
                    if(ColumnsData[0] == "Value Date"){
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
            }else if (ColumnsData[0] == "Value Date"){
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
                    if(ColumnsData[0] == "Value Date"){
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
                    if(ColumnsData[0] == "Value Date"){
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
                    if(ColumnsData[0] == "Value Date"){
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
                    if(ColumnsData[0] == "Value Date"){
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
                    if(ColumnsData[0] == "Value Date"){
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
                    if(ColumnsData[0] == "Value Date"){
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
                    if(ColumnsData[0] == "Value Date"){
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
                    if(ColumnsData[0] == "Value Date"){
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
                    if(ColumnsData[0] == "Value Date"){
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
                    if(ColumnsData[0] == "Value Date"){
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
            
            }else if (selectedFileTemp == "14"){
                //In case of Supplier Master Data we are using sap.ui.table.Table api for displaying data
                oTable.setVisible(false);
                newTable.setVisible(true);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[0] == "Value Date"){
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
            }else if (selectedFileTemp == "15"){
                //In case of Supplier Master Data we are using sap.ui.table.Table api for displaying data
                oTable.setVisible(false);
                newTable.setVisible(true);

                if(oModelData.length === 0){
                    MessageBox.warning("File is Empty");
                }else{
                    var ColumnsData = Object.keys(oModelData[0]);
                    var oColumnNames = [];
                    if(ColumnsData[0] == "Value Date"){
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
                    // "data_title" : vData[i]?.['Data Title'] || '',
                    // "company_code" : vData[i]?.['Company Code'] || '', // NK
                    // "country" : vData[i]?.['Country'] || '', //NK
                    // "location_text" : vData[i]?.['Location Text'] || '', //NK
                    // "plant_id" : vData[i]?.['Plant Id'] || '', //NK
                    "plant_id" : this.getView().byId("IdFormSelect").getSelectedItem().getText() || '', //NK
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
            columns = [
                {
                    label: 'Value Date',
                    property: 'value_date',
                    width: '18'
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
            }
            ];
            if(selectedTemplate == "01"){
                var newColumns = {
                    label: 'id_injury_type',
                    property: 'id_injury_type',
                    width: '25'
                  };
                  columns.splice(1, 0, newColumns);
          
                }else{
            if(selectedTemplate == "02"){
            var newColumns = {
                label: 'id_complaint_type',
                property: 'id_complaint_type',
                width: '25'
              };
              columns.splice(1, 0, newColumns);
              var newColumns2 = {
                label: 'id_status_type',
                property: 'id_status_type',
                width: '25'
              };
              columns.splice(3, 0, newColumns2);
      
            }else if(selectedTemplate == "04"){
            var newColumns = {
                label : "id_waste_type",
                property :"id_waste_type",
                width: '25'
              };
              columns.splice(1, 0, newColumns);

           }
           else if(selectedTemplate == "05"){
            var newColumns = {
                label : "id_waste_type",
                property :"id_waste_type",
                width: '25'
              };
              columns.splice(1, 0, newColumns);

           }
           else if(selectedTemplate == "06"){
            var newColumns = {
                label : "id_waste_type",
                property :"id_waste_type",
                width: '25'
              };
              columns.splice(1, 0, newColumns);
              

           } if(selectedTemplate == "07"){
            var newColumns = {
                label : "id_Energy Source_type",
                property :"id_Energy Source_type",
                width: '25'
              };
              columns.splice(3, 0, newColumns);
              

           } else if(selectedTemplate == "08"){
            var newColumns = {
                label : "id_Energy Source_type",
                property :"id_Energy Source_type",
                width: '25'
              };
              columns.splice(3, 0, newColumns);
              

           } else if(selectedTemplate == "09"){
            var newColumns = {
                label : "id_Energy Source_type",
                property :"id_Energy Source_type",
                width: '25'
              };
              columns.splice(1, 0, newColumns);
              

           }
           else if(selectedTemplate == "10"){
            var newColumns = {
                label : "id_water_type",
                property :"id_water_type",
                width: '25'
              };
              columns.splice(1, 0, newColumns);
              var newColumns2 = {
                label : "id_treatment_type",
                property :"id_treatment_type",
                width: '25'
              };
              columns.splice(2, 0, newColumns2);
           }
           else if(selectedTemplate == "11"){
            var newColumns = {
                label : "id_water_type",
                property :"id_water_type",
                width: '25'
              };
              columns.splice(1, 0, newColumns);
              
           }else if(selectedTemplate == "12"){
            var newColumns = {
                label : "id_water_type",
                property :"id_water_type",
                width: '25'
              };
              columns.splice(1, 0, newColumns);

           }
           else if(selectedTemplate == "13"){
            var newColumns = {
                label : "id_air_emission_type",
                property :"id_air_emission_type",
                width: '25'
              };
              columns.splice(1, 0, newColumns);
           }
           else if(selectedTemplate == "15"){
            var newColumns = {
                label : "category",
                property :"category",
                width: '25'
              };
              columns.splice(3, 0, newColumns);

           }

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
                fileName = "P-6_E_I-7 Scope1Emissions";
           }
           else if(selectedTemplate == "04"){
            fileName = "P-6_E_I-9 Waste Disposed";
           
           }
           else if(selectedTemplate == "05"){
            fileName = "P-6_E_I-9 Waste Generated";

           }
           else if(selectedTemplate == "06"){
            fileName = "P-6_E_I-9 Waste Recovered";

           }
           else if(selectedTemplate == "07"){
            fileName = "P-6_E_I-1 ElectricityConsumption";

           } else if(selectedTemplate == "08"){
            fileName = "P-6_E_I-1 EnergyConsumption";

           }
           else if(selectedTemplate == "09"){
            fileName = "P-6_E_I-1 FuelConsumption";

           }
           else if(selectedTemplate == "10"){
            fileName = "P-6_E_I-3 WaterConsumed";

           }
           else if(selectedTemplate == "11"){
            fileName = "P-6_E_I-3 WaterWithdrawl";
            var newColumns = {
                "key" : "id_water_type",
                "value" :"id_water_type"
              };
              temp.splice(5, 0, newColumns);
           } else if(selectedTemplate == "12"){
            fileName = "P-6_E_I-3 WaterDischarge";
            var newColumns = {
                "key" : "id_water_type",
                "value" :"id_water_type"
              };
              temp.splice(5, 0, newColumns);
           }
           else if(selectedTemplate == "13"){
            fileName = "P-6_E_I-5 Air Emission";
            var newColumns = {
                "key" : "id_air_emission_type",
                "value" :"id_air_emission_type"
              };
              temp.splice(5, 0, newColumns);

           }
           else if(selectedTemplate == "14"){
            fileName = "P-6_E_I-6 Scope2Emissions";
            var newColumns = {
                "key" : "Fis_year",
                "value" :"Fis_year"
              };
              temp.splice(8, 0, newColumns);
           }
           else if(selectedTemplate == "15"){
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
