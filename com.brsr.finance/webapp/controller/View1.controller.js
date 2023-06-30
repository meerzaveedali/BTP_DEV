sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,MessageBox) {
        "use strict";
        var that;
        return Controller.extend("com.brsr.finance.controller.View1", {
            onInit: function () {
                 that = this;
                 var oData = {
                     "ProductCollection": [
                        {
                            "ProductId1": "2024",
                            "Name": "FY-24"
                        },
                         {
                             "ProductId1": "2023",
                             "Name": "FY-23"
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
                         
                     ],
                     "ProductCollection2": [
                         {
                             "ProductId2": "XYZ",
                             "Name": "XYZ"
                         },
                         {
                             "ProductId2": "EHS",
                             "Name": "EHS"
                         }
                     ],
                     "ProductCollection3": [
                         {
                             "ProductId3": "1",
                             "Name": "1"
                         },
                         {
                             "ProductId3": "2",
                             "Name": "2"
                         },
                         {
                             "ProductId3": "3",
                             "Name": "3"
                         },
                         {
                             "ProductId3": "4",
                             "Name": "4"
                         },
                         {
                             "ProductId3": "5",
                             "Name": "5"
                         },
                         {
                             "ProductId3": "6",
                             "Name": "6"
                         }
                     ],
                     "Editable": true,
                     "Enabled": true
                 };
 
                 // set explored app's demo model on this sample
                 var oModel = new JSONModel(oData);
                 this.getView().setModel(oModel);
                 this.UserEmail = "";
                 this.Name = "";
 
                 that.oDataModel = this.getOwnerComponent().getModel();
                 that._getUserId();
                 
 
            },
            _onClear : function(){
                // this.getView().byId("_IDGenObjectPageSection2").setVisible(true);
                // this.getView().byId("_IDGenOverflowToolbar1").setVisible(false)
                this._clearText();
                this._setEditable();
                
             },
            _getUserId: function (val) {
                var that = this;
                var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                var appPath = appId.replaceAll(".", "/");
                var appModulePath = jQuery.sap.getModulePath(appPath);
                var url;
                url = appModulePath + "/user-api/currentUser";
                $.ajax({
                    url: url,
                    type: 'GET',
                    contentType: 'application/json',
                    success: function (data, response) {
                        var userData = JSON.parse(data);
                        that.Name = userData.firstname + '' + userData.lastname;
                        that.UserEmail = userData.email;
                    },
                    error: function (e) {

                        MessageBox.warning("Error while getting userdata.");
                    }
                });
            },
            _clearText : function(){
                this.getView().byId("id_answ1").setValue();                        
                this.getView().byId("id_answ2").setValue(); 
                this.getView().byId("id_answ4").setValue();                    
                this.getView().byId("id_answ5").setValue();                        
                this.getView().byId("id_answ6").setValue();                      
                
                this.getView().byId("_IDGenTable1").destroyItems();
                
             },
             _setEditable : function(){
                this.getView().byId("id_answ1").setEditable(true);                        
                this.getView().byId("id_answ2").setEditable(true);
                this.getView().byId("id_answ4").setEditable(true);                  
                this.getView().byId("id_answ5").setEditable(true);                        
                this.getView().byId("id_answ6").setEditable(true);                       
                
             },
            onApprovalHistory : function() {
                var that = this;
               // var oDialog = new Dialog({
               //     content : [
               //         new sap.m.Text({text:"hello"})
               //     ]
               // });
               // oDialog.open();
               var filterValues = new Array();
               var fy = new sap.ui.model.Filter({
                   path : "fiscalYear",
                   operator : sap.ui.model.FilterOperator.EQ,
                   value1 : this.getView().byId("id_fiscalyear").getSelectedKey(),
                   
               });
               filterValues.push(fy)

               var bf = new sap.ui.model.Filter({
                   path : "businessFunction",
                   operator : sap.ui.model.FilterOperator.EQ,
                   value1 : "Finance"
               });
               filterValues.push(bf)

               this.oDataModel.read("/brsr_businessfunctions_approvalHistoryLog", 
               {  async : false,
                   filters : filterValues ,             
                   success : function(data){
                       console.log(data);
                       var selfData = data.results;
                       var oJsonModel = new JSONModel();
                       oJsonModel.setData(selfData);
                       that.getView().setModel(oJsonModel, "approvalHistory");

                       if(!that.dialog){
                           that.dialog = sap.ui.xmlfragment(that.getView().getId(), "com.brsr.finance.view.approvalHistory", that);
                           that.getView().addDependent(that.dialog);
                       }
                       that.dialog.open();
                   },
                   error : function(error){
                       console.log(data);
                   }

               });
               
               
              
            },
            onFChange : function(){
                // this.getView().byId("id_answ1").setValue();                        
                // this.getView().byId("id_answ2").setValue();                    
                // this.getView().byId("id_answ5").setValue();                        
                // this.getView().byId("id_answ6").setValue();                                             
                // this.getView().byId("_IDGenTable1").destroyItems();
                
             
             },
             onApprovalHistory : function() {
                var that = this;
               // var oDialog = new Dialog({
               //     content : [
               //         new sap.m.Text({text:"hello"})
               //     ]
               // });
               // oDialog.open();
               var filterValues = new Array();
               var fy = new sap.ui.model.Filter({
                   path : "fiscalYear",
                   operator : sap.ui.model.FilterOperator.EQ,
                   value1 : this.getView().byId("id_fiscalyear").getSelectedKey(),
                   
               });
               filterValues.push(fy)

               var bf = new sap.ui.model.Filter({
                   path : "businessFunction",
                   operator : sap.ui.model.FilterOperator.EQ,
                   value1 : "Quality Assurance"
               });
               filterValues.push(bf)

               this.oDataModel.read("/brsr_businessfunctions_approvalHistoryLog", 
               {  async : false,
                   filters : filterValues ,             
                   success : function(data){
                       console.log(data);
                       var selfData = data.results;
                       var oJsonModel = new JSONModel();
                       oJsonModel.setData(selfData);
                       that.getView().setModel(oJsonModel, "approvalHistory");

                       if(!that.dialog){
                           that.dialog = sap.ui.xmlfragment(that.getView().getId(), "com.brsr.finance.view.approvalHistory", that);
                           that.getView().addDependent(that.dialog);
                       }
                       that.dialog.open();
                   },
                   error : function(error){
                       console.log(data);
                   }

               });
               
               
              
            },
            onClose: function(){
                this.dialog.close();
               },
            onSubmitHeader: function(){
                var self = this;
                self._onClear();
                self.getView().byId("_IDGenButton3").setVisible(true);
                self.fiscalyear = this.getView().byId("id_fiscalyear").getSelectedKey();
                self.oModel  = this.getOwnerComponent().getModel();
                self.path = "/brsr_businessfunctions_status";
                var Filter1 = new sap.ui.model.Filter("fiscalYear", sap.ui.model.FilterOperator.EQ, self.fiscalyear);
                var Filter2 = new sap.ui.model.Filter("businessFunction", sap.ui.model.FilterOperator.EQ, 'Finance');

                self.oBusy = new sap.m.BusyDialog();
                self.oBusy.open();
                self.oModel.read(self.path,{
                    filters: [Filter1,Filter2],
                    success : function(data){
                    if(data.results.length > 0){
                     self.status = data.results[0].status;
                    //  if(self.status == "Approved" || self.status == "Submitted" || self.status == "Rejected" || self.status == "Draft" ){
                     self._status(self);
                     self._getQ3Table(self);
                     self.oBusy.close();
                     }
                     else{
                        self.oBusy.close();
                        // sap.m.MessageBox.show("report is not created for this fiscal year");
                        var oItem = new sap.m.ColumnListItem({
                           cells: [new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}), 
                                   new sap.m.TextArea({  maxLength: 1500 , wrapping: "Hard"}), 
                                   new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}),
                                   new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}),
                                   new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"})                             
                               ]
                           });
           
                            var oTable = self.getView().byId("_IDGenTable1");
                            if(self.getView().byId("_IDGenTable1").getItems().length < 1){
                            oTable.addItem(oItem);
                            oTable.setMode("Delete");
                            that.getView().byId("toggleInfoToolbar").setVisible(true);
                            }
                        
                        self.getView().byId("_IDGenObjectPageSection2").setVisible(true);
                        self.getView().byId("_IDGenButton1").setVisible(true);
                        self.getView().byId("_IDGenButton0").setVisible(true);
                     }

                     
                 
                    },
                
                    error : function(error) {
                     console.log(error);
                     self.oBusy.close();
                    //  sap.m.MessageBox.show("report is not created for this fiscal year");
                     var oItem = new sap.m.ColumnListItem({
                        cells: [new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}), 
                                new sap.m.TextArea({  maxLength: 1500 , wrapping: "Hard"}), 
                                new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}),
                                new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}),
                                new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"})                             
                            ]
                        });
        
                         var oTable = self.getView().byId("_IDGenTable1");
                         if(self.getView().byId("_IDGenTable1").getItems().length < 1){
                         oTable.addItem(oItem);
                         oTable.setMode("Delete");
                         that.getView().byId("toggleInfoToolbar").setVisible(true);
                         }
                     
                     self.getView().byId("_IDGenObjectPageSection2").setVisible(true);
                     self.getView().byId("_IDGenButton1").setVisible(true);
                     self.getView().byId("_IDGenButton0").setVisible(true);
                    
                    }

                });
                

             },
             _status : function(self){
                var that = self;
                var Filter1 = new sap.ui.model.Filter("fiscalYear", sap.ui.model.FilterOperator.EQ, self.fiscalyear);
                var Filter2 = new sap.ui.model.Filter("businessFunction", sap.ui.model.FilterOperator.EQ, 'Finance');
                var pathBf = "/qualitative_data";
                    self.oBusy.open();
                     that.oModel.read(pathBf,{
                        urlParameters: {
                            "$expand": "Finance",
                        },
                        filters : [Filter1,Filter2],
                        success : function(data){
                            if(data.results[0].Finance.results.length  > 0){
                          that.getView().byId("id_answ1").setValue(data.results[0].Finance.results[0].answer);                        
                          that.getView().byId("id_answ2").setValue(data.results[0].Finance.results[1].answer);                    
                          that.getView().byId("id_answ4").setValue(data.results[0].Finance.results[3].answer);                        
                          that.getView().byId("id_answ5").setValue(data.results[0].Finance.results[4].answer);  
                          that.getView().byId("id_answ6").setValue(data.results[0].Finance.results[5].answer);                     
                          
                          
                          if(self.status == "Approved" || self.status == "Submitted" || self.status == "Processing" ){
                        //   sap.m.MessageBox.confirm("Report has been submitted");
                          that.getView().byId("id_answ1").setEditable(false);
                          that.getView().byId("id_answ2").setEditable(false);
                          that.getView().byId("id_answ4").setEditable(false);
                          that.getView().byId("id_answ5").setEditable(false);
                          that.getView().byId("id_answ6").setEditable(false);
                          
                          that.getView().byId("_IDGenObjectPageSection2").setVisible(true);
                          that.getView().byId("_IDGenButton1").setVisible(false);
                          that.getView().byId("_IDGenButton0").setVisible(false);
                          }
                          if(self.status == "Draft" || self.status == "Rejected" ){
                            // if(self.status == "Draft"){
                            // // sap.m.MessageBox.confirm("Report is in draft status");
                            // }
                            // if(self.status == "Rejected"){
                            // sap.m.MessageBox.confirm("Report Rejected");
                            // }
                          that.getView().byId("id_answ1").setEditable(true);
                          that.getView().byId("id_answ2").setEditable(true);
                          that.getView().byId("id_answ4").setEditable(true);
                          that.getView().byId("id_answ5").setEditable(true);
                          that.getView().byId("id_answ6").setEditable(true);
                          that.getView().byId("_IDGenObjectPageSection2").setVisible(true);
                          that.getView().byId("_IDGenButton1").setVisible(true);
                          that.getView().byId("_IDGenButton0").setVisible(true);

                          }
                          
                          self.oBusy.close();
                        } else{
                            var oItem = new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}), 
                                        new sap.m.TextArea({  maxLength: 1500 , wrapping: "Hard"}), 
                                        new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}),
                                        new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}),
                                        new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"})                             
                                    ]
                                });
                
                                 var oTable = self.getView().byId("_IDGenTable1");
                                 if(self.getView().byId("_IDGenTable1").getItems().length < 1){
                                 oTable.addItem(oItem);
                                 oTable.setMode("Delete");
                                 self.getView().byId("toggleInfoToolbar").setVisible(true); 
                                 
                                 }

                            self.getView().byId("_IDGenObjectPageSection2").setVisible(true);
                            self.getView().byId("_IDGenButton1").setVisible(true);
                            self.getView().byId("_IDGenButton0").setVisible(true);

                        }
                          
                        },
                        error : function(error){
                         console.log(error);
                        }
                     });

             },
             _getQ3Table : function(self){
                var that = self;
                var pathBf = "/qualitative_data_Finance(up__fiscalYear='" +that.fiscalyear+ "',up__businessFunction='Finance',principle='4',indicator='Essential',questionID='2E')/principle4_essential_2";
                    self.oBusy.open();
                    that.oModel.read(pathBf,{
                        success : function(data){
                           console.log(data);
                           var qid1L = data.results;
                           var oView = that.getView();
                           var oJsonModel = new JSONModel();
                           oJsonModel.setData(qid1L);
                           oView.setModel(oJsonModel,"qid2EModel");
                           var oItemEdit = {
                            path : "qid2EModel>/",
                            template : new sap.m.ColumnListItem({
                              cells : [new sap.m.TextArea({maxLength: 1500 , value:"{qid2EModel>stakeholder_group}",wrapping: "Hard"}), 
                              new sap.m.TextArea({maxLength: 1500 , value:"{qid2EModel>identifies_as_vulnerable_marginalized_group}",wrapping: "Hard" }),
                              new sap.m.TextArea({maxLength: 1500 , value:"{qid2EModel>channels_of_communication}",wrapping: "Hard"}),
                              new sap.m.TextArea({maxLength: 1500 , value:"{qid2EModel>frequency_of_engagement}",wrapping: "Hard"}),
                              new sap.m.TextArea({maxLength: 1500 , value:"{qid2EModel>purpose_scope_of_engagement}",wrapping: "Hard"})]
                            })
                           }
                           var oItemText = {
                            path : "qid2EModel>/",
                            template : new sap.m.ColumnListItem({
                              cells : [new sap.m.TextArea({maxLength: 1500 , value:"{qid2EModel>stakeholder_group}",editable : false, wrapping: "Hard"}), 
                              new sap.m.TextArea({maxLength: 1500 , value:"{qid2EModel>identifies_as_vulnerable_marginalized_group}",editable : false, wrapping: "Hard"}),
                              new sap.m.TextArea({maxLength: 1500 , value:"{qid2EModel>channels_of_communication}",editable : false, wrapping: "Hard"}),
                              new sap.m.TextArea({maxLength: 1500 , value:"{qid2EModel>frequency_of_engagement}",editable : false, wrapping: "Hard"}),
                              new sap.m.TextArea({maxLength: 1500 , value:"{qid2EModel>purpose_scope_of_engagement}",editable : false, wrapping: "Hard"})
                             ]
                            })
                           }

                           if(that.status == "Approved" || that.status == "Submitted"  || self.status == "Processing" ){
                            var oTable = that.getView().byId("_IDGenTable1");
                            oTable.bindItems(oItemText);
                            oTable.setMode("None");
                            that.getView().byId("toggleInfoToolbar").setVisible(false); 
                           }else if(that.status == "Draft" || that.status == "Rejected"){
                            var oTable = that.getView().byId("_IDGenTable1");
                            oTable.bindItems(oItemEdit);
                            oTable.setMode("Delete");
                            that.getView().byId("toggleInfoToolbar").setVisible(true); 
                           }
                        //    that.getView().byId("_IDGenTable4").setVisible(true);
                        //    }else if(that.status == "Draft"){
                        //     that.getView().byId("_IDGenTable1").setVisible(true);
                        //    that.getView().byId("_IDGenTable4").setVisible(false);

                        //    }

                        },
                        error : function(data){
                            console.log(error);

                        }
                    });
                    
             },
             onAddRow1L : function(){
                //   var obj = {
                //     "nic_code" :  "",
                //     "name_of_product_or_service" : "",
                //     "total_turnover_contributed" : "",
                //     "boundry_of_life_cycle_assessment" : "",
                //     "conducted_by_independent_external_agency" : "",
                //     "results_communicated_in_public_domain" : "" 
                //   };
                //   var oModel = this.getOwnerComponent().getModel("qualityAssurance").getData()['1L'].push(obj);
                //   this.getOwnerComponent().getModel("qualityAssurance").refresh(true);
                var oItem = new sap.m.ColumnListItem({
                    cells: [new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}),
                            new sap.m.TextArea({  maxLength: 1500 , wrapping: "Hard"}), 
                            new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}),
                            new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}),
                            new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"})
                        ]
                });
    
                var oTable = this.getView().byId("_IDGenTable1");
                oTable.addItem(oItem);
                 },  
                    
                deleteRowTab1: function (oEvent) {
                    var oTable = this.getView().byId("_IDGenTable1");
                    oTable.removeItem(oEvent.getParameter("listItem").destroy());
                }, 
                
            onSave : function(){
                var that = this;
                let fiscalyear = this.getView().byId("id_fiscalyear").getSelectedKey();
                    var getQ1 = this.getView().byId("id_answ1").getValue();
                    var getQ2 = this.getView().byId("id_answ2").getValue();
                    var Name = this.Name;
                    var UserEmail = this.UserEmail;
                //   var getQ3 = this.getView().byId("_IDGenTable1").getBinding("items").getModel().getData()["1L"];
                    var getQ3 = [];
                    for (var i = 0; i < this.getView().byId("_IDGenTable1").getItems().length; i++) {
                    var row = {
                        stakeholder_group : "",
                        identifies_as_vulnerable_marginalized_group : "",
                        channels_of_communication : "",
                        frequency_of_engagement : "",
                        purpose_scope_of_engagement : ""
                    };
                    if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[0].getValue() !== ""){
                        row.stakeholder_group = this.getView().byId("_IDGenTable1").getItems()[i].getCells()[0].getValue();
                    }else{
                        row.stakeholder_group = "NA";
                    }

                    if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[1].getValue() !== ""){
                        row.identifies_as_vulnerable_marginalized_group = this.getView().byId("_IDGenTable1").getItems()[i].getCells()[1].getValue();
                    }else{
                        row.identifies_as_vulnerable_marginalized_group = "NA"; 
                    }

                    if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[2].getValue() !== ""){
                        row.channels_of_communication = this.getView().byId("_IDGenTable1").getItems()[i].getCells()[2].getValue()
                    }else{
                        row.channels_of_communication = "NA";
                    }

                    if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[3].getValue() !== ""){
                        row.frequency_of_engagement  =  this.getView().byId("_IDGenTable1").getItems()[i].getCells()[3].getValue();
                    }else{
                        row.frequency_of_engagement = "NA";
                    }

                    if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[4].getValue() !== ""){
                        row.purpose_scope_of_engagement = this.getView().byId("_IDGenTable1").getItems()[i].getCells()[4].getValue();
                    }else{
                        row.purpose_scope_of_engagement = "NA";
                    }

                    

                    if(row.stakeholder_group !== "NA" &&  row.identifies_as_vulnerable_marginalized_group !== "NA" &&  row.channels_of_communication !== "NA" && 
                    row.frequency_of_engagement !== "NA" && 
                    row.purpose_scope_of_engagement !==  "NA"){
                        getQ3.push(row);
                        }
        
                    }
            
                    var getQ4 = this.getView().byId("id_answ4").getValue();
                    var getQ5 = this.getView().byId("id_answ5").getValue();
                    var getQ6 = this.getView().byId("id_answ6").getValue();

    
                // if(getQ2 == "" || getQ2 == "" || getQ5 == "" ){
                //    MessageBox.alert("Mandatory feilds should not be empty");
                //    return;
                // }
    
                var  financeArr = [];
                if(getQ1 == ""){
                    getQ1 = "NA";
                }
                var q1  = {
                    "principle": "3", 				
                    "indicator": "Leadership", 		
                    "questionID": "2L", 			
                    "answer": getQ1
                };
                financeArr.push(q1);
    
                if(getQ2 == ""){
                    getQ2 = "NA";
                }
                var q2  = {
                    "principle": "4", 				
                    "indicator": "Essential", 		
                    "questionID": "1E", 			
                    "answer": getQ2
                };
                financeArr.push(q2);
    
                
                if(getQ3 == ""){
                    getQ3 = "NA";
                
                }
                var q3  = {
                    "principle": "4", 				
                    "indicator": "Essential", 		
                    "questionID": "2E", 			
                    "principle4_essential_2" : getQ3
                };
                financeArr.push(q3);
                
                if(getQ4 == ""){
                    getQ4 = "NA";
                }
                var q4  = {
                    "principle": "4", 				
                    "indicator": "Leadership", 		
                    "questionID": "1L", 			
                    "answer": getQ4
                };
                financeArr.push(q4);
                
                if(getQ5 == ""){
                    getQ5 = "NA";
                }
                var q5 = {
                    "principle": "2", 				
                    "indicator": "Leadership", 		
                    "questionID": "2L", 			
                    "answer": getQ5
                };
                financeArr.push(q5);
                
                if(getQ6 == ""){
                    getQ6 = "NA";
                }
                var q6 = {
                    "principle": "4", 				
                    "indicator": "Leadership", 		
                    "questionID": "3L", 			
                    "answer": getQ6
                };
                financeArr.push(q6);
    
                    let obj =  {
                        "fiscalYear": fiscalyear,
                        "businessFunction": "Finance",
                        "creator_email": UserEmail,
                        "creator_name": Name,
                        "status" : "Draft",
                        "Finance" : financeArr
                        
                    };
                    sap.m.MessageBox.confirm("Do you want to save",{
                    actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    emphasizedAction: sap.m.MessageBox.Action.OK,
                    onClose: function (sAction) {
                    if(sAction == "OK") {
                    var oBusy = new sap.m.BusyDialog(); 
    
                    oBusy.open();             
                    var oModel = that.getOwnerComponent().getModel()
                    oModel.create("/qualitative_data", obj,{
                        success : function(odata){
                            oBusy.close();
                            that.getView().byId("_IDGenObjectPageSection2").setVisible(true);
                            that.getView().byId("_IDGenButton1").setVisible(true);
                            that.getView().byId("_IDGenButton0").setVisible(true);
                          var successMsg = "Draft Saved";
                           MessageBox.success(successMsg, {
                            icon: MessageBox.Icon.SUCCESS,
                            title: "SUCCESS",
                            actions: [MessageBox.Action.OK],
                            initialFocus: MessageBox.Action.OK,
                            onClose: function (Action) {
            
                                
                            }
                        });
    
                        },
                        error : function(error){
                            oBusy.close();
                            console.log(error);
                        }
                    });
                    }
                    }
                    
                    });

            },
            
            onConfirmBtnPress : function(){
                
                var that = this;
                let fiscalyear = this.getView().byId("id_fiscalyear").getSelectedKey();
                var Name = this.Name;
                var UserEmail = this.UserEmail;
                    var getQ1 = this.getView().byId("id_answ1").getValue();
                    var getQ2 = this.getView().byId("id_answ2").getValue();
                //   var getQ3 = this.getView().byId("_IDGenTable1").getBinding("items").getModel().getData()["1L"];
                    var getQ3 = [];
                    for (var i = 0; i < this.getView().byId("_IDGenTable1").getItems().length; i++) {
                    var row = {
                        stakeholder_group : "",
                        identifies_as_vulnerable_marginalized_group : "",
                        channels_of_communication : "",
                        frequency_of_engagement : "",
                        purpose_scope_of_engagement : ""
                    };
                    if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[0].getValue() !== ""){
                        row.stakeholder_group = this.getView().byId("_IDGenTable1").getItems()[i].getCells()[0].getValue();
                    }else{
                        row.stakeholder_group = "NA";
                    }

                    if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[1].getValue() !== ""){
                        row.identifies_as_vulnerable_marginalized_group = this.getView().byId("_IDGenTable1").getItems()[i].getCells()[1].getValue();
                    }else{
                        row.identifies_as_vulnerable_marginalized_group = "NA"; 
                    }

                    if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[2].getValue() !== ""){
                        row.channels_of_communication = this.getView().byId("_IDGenTable1").getItems()[i].getCells()[2].getValue()
                    }else{
                        row.channels_of_communication = "NA";
                    }

                    if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[3].getValue() !== ""){
                        row.frequency_of_engagement  =  this.getView().byId("_IDGenTable1").getItems()[i].getCells()[3].getValue();
                    }else{
                        row.frequency_of_engagement = "NA";
                    }

                    if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[4].getValue() !== ""){
                        row.purpose_scope_of_engagement = this.getView().byId("_IDGenTable1").getItems()[i].getCells()[4].getValue();
                    }else{
                        row.purpose_scope_of_engagement = "NA";
                    }

                    

                    if(row.stakeholder_group !== "NA" &&  row.identifies_as_vulnerable_marginalized_group !== "NA" &&  row.channels_of_communication !== "NA" && 
                    row.frequency_of_engagement !== "NA" && 
                    row.purpose_scope_of_engagement !==  "NA"){
                        getQ3.push(row);
                        }
        
                    }
            
                    var getQ4 = this.getView().byId("id_answ4").getValue();
                    var getQ5 = this.getView().byId("id_answ5").getValue();
                    var getQ6 = this.getView().byId("id_answ6").getValue();

    
                // if(getQ2 == "" || getQ2 == "" || getQ5 == "" ){
                //    MessageBox.alert("Mandatory feilds should not be empty");
                //    return;
                // }
    
                var  financeArr = [];
                if(getQ1 == ""){
                    getQ1 = "NA";
                }
                var q1  = {
                    "principle": "3", 				
                    "indicator": "Leadership", 		
                    "questionID": "2L", 			
                    "answer": getQ1
                };
                financeArr.push(q1);
    
                if(getQ2 == ""){
                    getQ2 = "NA";
                }
                var q2  = {
                    "principle": "4", 				
                    "indicator": "Essential", 		
                    "questionID": "1E", 			
                    "answer": getQ2
                };
                financeArr.push(q2);
    
                
                if(getQ3 == ""){
                    getQ3 = "NA";
                
                }
                var q3  = {
                    "principle": "4", 				
                    "indicator": "Essential", 		
                    "questionID": "2E", 			
                    "principle4_essential_2" : getQ3
                };
                financeArr.push(q3);
                
                if(getQ4 == ""){
                    getQ4 = "NA";
                }
                var q4  = {
                    "principle": "4", 				
                    "indicator": "Leadership", 		
                    "questionID": "1L", 			
                    "answer": getQ4
                };
                financeArr.push(q4);
                
                if(getQ5 == ""){
                    getQ5 = "NA";
                }
                var q5 = {
                    "principle": "2", 				
                    "indicator": "Leadership", 		
                    "questionID": "2L", 			
                    "answer": getQ5
                };
                financeArr.push(q5);
                
                if(getQ6 == ""){
                    getQ6 = "NA";
                }
                var q6 = {
                    "principle": "4", 				
                    "indicator": "Leadership", 		
                    "questionID": "3L", 			
                    "answer": getQ6
                };
                financeArr.push(q6);
    
                    let obj =  {
                        "fiscalYear": fiscalyear,
                        "businessFunction": "Finance",
                        "creator_email": UserEmail,
                        "creator_name": Name,
                        "status" : "Submitted",
                        "Finance" : financeArr
                        
                    };
                    sap.m.MessageBox.confirm("Do you want to Submit",{
                    actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    emphasizedAction: sap.m.MessageBox.Action.OK,
                    onClose: function (sAction) {
                    if(sAction == "OK") {
                    var oBusy = new sap.m.BusyDialog(); 
    
                    oBusy.open();             
                    var oModel = that.getOwnerComponent().getModel()
                    oModel.create("/qualitative_data", obj,{
                        success : function(odata){
                            oBusy.close();
                            that.getView().byId("_IDGenObjectPageSection2").setVisible(true);
                            that.getView().byId("_IDGenButton1").setVisible(true);
                            that.getView().byId("_IDGenButton0").setVisible(true);
                            
    
                        },
                        error : function(error){
                            oBusy.close();
                            console.log(error);
                        }
                       });

                        var paOBJ =  {
   
                            "definitionId": "eu10.sap-process-automation-q40kapza.zbrsrfinance.zapproval_process_for_finance",
                        
                            "context": {
                        
                             "zbusiness_function":  "Finance", 
                             "zfinance_creator_email": UserEmail,
                             "zfinance_creator_name" : Name, 
                             "zfiscal_year": fiscalyear,
                             "zfinance_principle3_leadership_2": getQ1,      
                             "zfinance_principle4_essential_1": getQ2,          
                             "zfinance_principle4_essential_2": getQ3,
                             "zfinance_principle4_leadership_1": getQ4, 
                             "zfinance_principle4_leadership_2": getQ5,
                             "zfinance_principle4_leadership_3": getQ6            
                            }           
                        };
            
                        var appId = that.getOwnerComponent().getManifestEntry("/sap.app/id");
                        var appPath = appId.replaceAll(".", "/");
                        var appModulePath = jQuery.sap.getModulePath(appPath);
            
                            that.getView().setBusy(true);
                            $.ajax({
                                url: appModulePath + "/bpmworkflowruntime/v1/xsrf-token",
                                method: "GET",
                                headers: {
                                    "X-CSRF-Token": "Fetch"
                                },
                                success: function (result, xhr, data) {
                                    var token = data.getResponseHeader("X-CSRF-Token");
                                    if (token === null) return;
            
                                    $.ajax({
                                        url: appModulePath + "/bpmworkflowruntime/v1/workflow-instances",
                                        type: "POST",
                                        data: JSON.stringify(paOBJ),
                                        headers: {
                                            "X-CSRF-Token": token,
                                            "Content-Type": "application/json"
                                        },
                                        async: false,
                                        success: function (data, response) {
                                            var successMsg;
                                            that.getView().setBusy(false);
                                            successMsg = "Request Sent for Approval";
                                            MessageBox.success(successMsg, {
                                                icon: MessageBox.Icon.SUCCESS,
                                                title: "SUCCESS",
                                                actions: [MessageBox.Action.OK],
                                                initialFocus: MessageBox.Action.OK,
                                                onClose: function (Action) {
                                                    // that.clearForm();
                                                    that.getView().setBusy(false);
                                                    that.getView().byId("_IDGenObjectPageSection2").setVisible(false);
                                                    that.getView().byId("_IDGenButton1").setVisible(false);
                                                    that.getView().byId("_IDGenButton0").setVisible(false);
                                                }
                                            });
                                        },
                                        error: function (e) {
                                            that.getView().setBusy(false);
                                            MessageBox.show(JSON.stringify(e), {
                                                icon: MessageBox.Icon.ERROR,
                                                title: "ERROR"
                                            });
                                        }
                                    });
                                        }
                                    });
                    }
                   }
                    });
                    
                    

                    
                
                },
           
               
                                    
                
                FormValidate: function(){
                    var that = this;
                    var counter = 0;
                    var validData= [];
        
        
                if(that.getView().byId("id_answ2").getValue() === ""){
    
                    validData.push({
                        "PRODUCTCODE": "Q2",
                        "type": "Warning",
                        "desc": "Field is Mandatory"
                    });
                    counter++;
    
                }
                    
                if(that.getView().byId("_IDGenTable1").getItems().length === 0){
    
                    validData.push({
                        "PRODUCTCODE": "Q3",
                        "type": "Warning",
                        "desc": "Enter atleast 1 row of Data"
                    });
                    counter++;
    
                }
                   
                if (counter !== 0){
                var validpayload = new JSONModel(validData);
                that.getView().setModel(validpayload, "message");
                var oButton = that.getView().byId("messagePopoverBtn");
                oButton.setVisible(true);
                setTimeout(function () {
                                    that.oMP.openBy(oButton);
                                }.bind(that), 100);
                that.createMessagePopover();
                
                }
                else{
                    that.onConfirmBtnPress();
                }
        
                },
                createMessagePopover: function () {
                    this.oMP = new MessagePopover({
                        // activeTitlePress: function (oEvent) {
                        //     var oItem = oEvent.getParameter("item"),
                        //         oPage = that.getView().byId("ObjectPageLayout");
                        // },
                        activeTitlePress: function (oEvent) {
                            var oItem = oEvent.getParameter("item"),
                                oPage = that.getView().byId("ObjectPageLayout")
                        },
                        items: {
                            path: "message>/",
                            template: new MessageItem(
                                {
                                    title: "{message>PRODUCTCODE}",
                                    activeTitle: true,
                                    subtitle: "{message>desc}",
                                    type: "{message>type}",
                                    counter: 1
                                })
                        },
                        groupItems: false
                    });
                    this.getView().byId("messagePopoverBtn").addDependent(this.oMP);
                },
                handleMessagePopoverPress: function (oEvent) {
                    if (!this.oMP) {
                        this.createMessagePopover();
                    }
                    this.oMP.toggle(oEvent.getSource());
                }

            
                
        
        });
    });
