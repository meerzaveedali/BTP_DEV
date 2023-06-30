sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/MessagePopover",
    "sap/m/MessageItem"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, Dialog,MessagePopover , MessageItem) {
        "use strict";
        var that;
        return Controller.extend("qualityassurance.controller.View1", {
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
             /*******************Get User Login Details*********************/
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
                this.getView().byId("id_answ5").setValue();                        
                this.getView().byId("id_answ6").setValue();                      
                this.getView().byId("id_answ7").setValue();                        
                this.getView().byId("id_answ8").setValue();                       
                this.getView().byId("id_answ9").setValue();
                this.getView().byId("_IDGenTable1").destroyItems();
                this.getView().byId("_IDGenTable2").destroyItems();
             },
             _setEditable : function(){
                this.getView().byId("id_answ1").setEditable(true);                        
                this.getView().byId("id_answ2").setEditable(true);                    
                this.getView().byId("id_answ5").setEditable(true);                        
                this.getView().byId("id_answ6").setEditable(true);                       
                this.getView().byId("id_answ7").setEditable(true);                         
                this.getView().byId("id_answ8").setEditable(true);                       
                this.getView().byId("id_answ9").setEditable(true); 
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
                    value1 : "Quality_Assurance"
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
                            that.dialog = sap.ui.xmlfragment(that.getView().getId(), "qualityassurance.view.approvalHistory", that);
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
                self.fiscalyear = this.getView().byId("id_fiscalyear").getSelectedKey();
                self.oModel  = this.getOwnerComponent().getModel();
                self.getView().byId("_IDGenButton3").setVisible(true);
                // self.path = "/qualitative_data(fiscalYear='"+self.fiscalyear+"',businessFunction='Quality%20Assurance')";
                self.path = "/brsr_businessfunctions_status";
                var Filter1 = new sap.ui.model.Filter("fiscalYear", sap.ui.model.FilterOperator.EQ, self.fiscalyear);
                var Filter2 = new sap.ui.model.Filter("businessFunction", sap.ui.model.FilterOperator.EQ, 'Quality_Assurance');
                self.oBusy = new sap.m.BusyDialog();
                self.oBusy.open();

                self.oModel.read(self.path,{
                    filters: [Filter1,Filter2],
                    success : function(data){
                     if(data.results.length > 0){
                     self.status = data.results[0].status;
                    //  if(self.status == "Approved" ||  self.status == "Submitted" || self.status == "Rejected" || self.status == "Draft" ){
                     self._status(self);
                     self._getQ3Table(self);
                     self._getQ4Table(self);
                     self.oBusy.close();
                     }else {
                        self.oBusy.close();
                    //  sap.m.MessageBox.show("report is not created for this fiscal year");
                     var oItem = new sap.m.ColumnListItem({
                        cells: [new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}), 
                                new sap.m.TextArea({  maxLength: 1500 , wrapping: "Hard"}), 
                                new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}),
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

                     var oItem = new sap.m.ColumnListItem({
                        cells: [new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard", width:"100%"}), 
                                new sap.m.TextArea({  maxLength: 1500 , wrapping: "Hard", width:"100%"}), 
                                new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard", width:"100%"})
                            ]
                    });
        
                    var oTable = self.getView().byId("_IDGenTable2");
                    if(self.getView().byId("_IDGenTable2").getItems().length < 1){
                    oTable.addItem(oItem);
                    oTable.setMode("Delete");
                    self.getView().byId("_IDGenButton2").setVisible(true); 
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

                     var oItem = new sap.m.ColumnListItem({
                        cells: [new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard", width:"100%"}), 
                                new sap.m.TextArea({  maxLength: 1500 , wrapping: "Hard", width:"100%"}), 
                                new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard", width:"100%"})
                            ]
                    });
        
                    var oTable = self.getView().byId("_IDGenTable2");
                    if(self.getView().byId("_IDGenTable2").getItems().length < 1){
                    oTable.addItem(oItem);
                    self.getView().byId("_IDGenButton2").setVisible(true); 
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
                var Filter2 = new sap.ui.model.Filter("businessFunction", sap.ui.model.FilterOperator.EQ, 'Quality_Assurance');
                var pathBf = "/qualitative_data";
                    self.oBusy.open();
                     that.oModel.read(pathBf,{
                        urlParameters: {
                            "$expand": "quality_assurance",
                        },
                        filters : [Filter1,Filter2],
                        success : function(data){
                            if(data.results[0].quality_assurance.results.length  > 0){
                          that.getView().byId("id_answ1").setValue(data.results[0].quality_assurance.results[0].answer);                        
                          that.getView().byId("id_answ2").setValue(data.results[0].quality_assurance.results[1].answer);                    
                          that.getView().byId("id_answ5").setValue(data.results[0].quality_assurance.results[4].answer);                        
                          that.getView().byId("id_answ6").setValue(data.results[0].quality_assurance.results[5].answer);                      
                          that.getView().byId("id_answ7").setValue(data.results[0].quality_assurance.results[6].answer);                        
                          that.getView().byId("id_answ8").setValue(data.results[0].quality_assurance.results[7].answer);                       
                          that.getView().byId("id_answ9").setValue(data.results[0].quality_assurance.results[8].answer);
                          
                          if(self.status == "Approved" || self.status == "Submitted" || self.status == "Processing" ){
                        //   sap.m.MessageBox.confirm("Report has been submitted");
                          that.getView().byId("id_answ1").setEditable(false);
                          that.getView().byId("id_answ2").setEditable(false);
                          that.getView().byId("id_answ5").setEditable(false);
                          that.getView().byId("id_answ6").setEditable(false);
                          that.getView().byId("id_answ7").setEditable(false);
                          that.getView().byId("id_answ8").setEditable(false);
                          that.getView().byId("id_answ9").setEditable(false);
                          that.getView().byId("_IDGenObjectPageSection2").setVisible(true);
                          that.getView().byId("_IDGenButton1").setVisible(false);
                          that.getView().byId("_IDGenButton0").setVisible(false);
                          }
                          if(self.status == "Draft" || self.status == "Rejected" ){
                            if(self.status == "Draft"){
                            // sap.m.MessageBox.confirm("Report is in draft status");
                            }
                            if(self.status == "Rejected"){
                            // sap.m.MessageBox.confirm("Report Rejected");
                            }
                          that.getView().byId("id_answ1").setEditable(true);
                          that.getView().byId("id_answ2").setEditable(true);
                          that.getView().byId("id_answ5").setEditable(true);
                          that.getView().byId("id_answ6").setEditable(true);
                          that.getView().byId("id_answ7").setEditable(true);
                          that.getView().byId("id_answ8").setEditable(true);
                          that.getView().byId("id_answ9").setEditable(true);
                          that.getView().byId("_IDGenObjectPageSection2").setVisible(true);
                          that.getView().byId("_IDGenButton1").setVisible(true);
                          that.getView().byId("_IDGenButton0").setVisible(true);

                          }
                          
                          self.oBusy.close();
                        }else{
                            var oItem = new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}), 
                                        new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}), 
                                        new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}),
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
        
                             var oItem = new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard", width:"100%"}), 
                                        new sap.m.TextArea({  maxLength: 1500 , wrapping: "Hard", width:"100%"}), 
                                        new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard", width:"100%"})
                                    ]
                            });
                
                            var oTable = self.getView().byId("_IDGenTable2");
                            if(self.getView().byId("_IDGenTable2").getItems().length < 1){
                            oTable.addItem(oItem);
                            oTable.setMode("Delete");
                            self.getView().byId("_IDGenButton2").setVisible(true);  
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
                var pathBf = "/qualitative_data_quality_assurance(up__fiscalYear='" +that.fiscalyear+ "',up__businessFunction='Quality_Assurance',principle='2',indicator='Leadership',questionID='1L')/principle2_leadership_1";
                    self.oBusy.open();
                    that.oModel.read(pathBf,{
                        success : function(data){
                           console.log(data);
                           var qid1L = data.results;
                           var oView = that.getView();
                           var oJsonModel = new JSONModel();
                           oJsonModel.setData(qid1L);
                           oView.setModel(oJsonModel,"qid1LModel");
                           var oItemEdit = {
                            path : "qid1LModel>/",
                            template : new sap.m.ColumnListItem({
                              cells : [new sap.m.TextArea({maxLength: 1500 , value:"{qid1LModel>nic_code}",wrapping: "Hard"}), 
                              new sap.m.TextArea({maxLength: 1500 , value:"{qid1LModel>name_of_product_or_service}",wrapping: "Hard" }),
                              new sap.m.TextArea({maxLength: 1500 , value:"{qid1LModel>total_turnover_contributed}",wrapping: "Hard"}),
                              new sap.m.TextArea({maxLength: 1500 , value:"{qid1LModel>boundry_of_life_cycle_assessment}",wrapping: "Hard"}),
                              new sap.m.TextArea({maxLength: 1500 , value:"{qid1LModel>conducted_by_independent_external_agency}",wrapping: "Hard"}),
                              new sap.m.TextArea({maxLength: 1500 , value:"{qid1LModel>results_communicated_in_public_domain}",wrapping: "Hard"}),]
                            })
                           }
                           var oItemText = {
                            path : "qid1LModel>/",
                            template : new sap.m.ColumnListItem({
                              cells : [new sap.m.TextArea({maxLength: 1500 , value:"{qid1LModel>nic_code}",editable : false, wrapping: "Hard"}), 
                              new sap.m.TextArea({maxLength: 1500 , value:"{qid1LModel>name_of_product_or_service}",editable : false, wrapping: "Hard"}),
                              new sap.m.TextArea({maxLength: 1500 , value:"{qid1LModel>total_turnover_contributed}",editable : false, wrapping: "Hard"}),
                              new sap.m.TextArea({maxLength: 1500 , value:"{qid1LModel>boundry_of_life_cycle_assessment}",editable : false, wrapping: "Hard"}),
                              new sap.m.TextArea({maxLength: 1500 , value:"{qid1LModel>conducted_by_independent_external_agency}",editable : false, wrapping: "Hard"}),
                              new sap.m.TextArea({maxLength: 1500 , value:"{qid1LModel>results_communicated_in_public_domain}",editable : false, wrapping: "Hard"}),]
                            })
                           }

                           if(that.status == "Approved" || that.status == "Submitted" || self.status == "Processing" ){
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
                        error : function(error){
                            console.log(error);

                        }
                    });
                    
             },
             _getQ4Table : function(self){
                var that = self;
                var pathBf = "/qualitative_data_quality_assurance(up__fiscalYear='" +that.fiscalyear+ "',up__businessFunction='Quality_Assurance',principle='2',indicator='Leadership',questionID='2L')/principle2_leadership_2";
                    self.oBusy.open();
                    that.oModel.read(pathBf,{
                        success : function(data){
                           console.log(data);
                           var qid2L = data.results;
                        
                        var oView = that.getView();
                        var oJsonModel = new JSONModel();
                           oJsonModel.setData(qid2L);
                           oView.setModel(oJsonModel,"qid2LModel");
                        
                           var oItemEdit ={
                            path: "qid2LModel>/",
                            template: new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500 , value:"{qid2LModel>name_of_product_or_service}",wrapping: "Hard", width:"100%"}), 
                                        new sap.m.TextArea({  maxLength: 1500 , value:"{qid2LModel>description_of_risk_or_concern}", wrapping: "Hard", width:"100%"}), 
                                        new sap.m.TextArea({ maxLength: 1500 , value:"{qid2LModel>action_taken}",  wrapping: "Hard" , width:"100%"})
                                    ]
                                
                            })
                        }
                         
                        var oItemText ={
                            path: "qid2LModel>/",
                            template: new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500 , value:"{qid2LModel>name_of_product_or_service}",editable : false, wrapping: "Hard", width:"100%"}), 
                                        new sap.m.TextArea({  maxLength: 1500 , value:"{qid2LModel>description_of_risk_or_concern}", editable : false, wrapping: "Hard", width:"100%"}), 
                                        new sap.m.TextArea({ maxLength: 1500 , value:"{qid2LModel>action_taken}", editable : false,  wrapping: "Hard", width:"100%"})
                                    ]
                                
                            })
                        }
                        if(self.status == "Approved" || self.status == "Submitted" || self.status == "Processing"  ){
                            var oTable = that.getView().byId("_IDGenTable2");
                            oTable.bindItems(oItemText);
                            oTable.setMode("None");
                            that.getView().byId("_IDGenButton2").setVisible(false); 
                        } else if(self.status == "Draft" || self.status == "Rejected" ){
                            var oTable = that.getView().byId("_IDGenTable2");
                            oTable.bindItems(oItemEdit);
                            oTable.setMode("Delete");
                            that.getView().byId("_IDGenButton2").setVisible(true); 
                        }
                            
                        
                        //    if(that.status == "Approved" || that.status == "Submitted" || that.status == "Rejected"){
                        //    that.getView().byId("_IDGenTable2").setVisible(true);
                        //    that.getView().byId("_IDGenTable3").setVisible(true);
                        //    } else if(that.status == "Draft"){
                        //     that.getView().byId("_IDGenTable2").setVisible(true);
                        //    that.getView().byId("_IDGenTable3").setVisible(true);
                        //    }

                        },
                        error : function(error){
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
                cells: [new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}), new sap.m.TextArea({  maxLength: 1500 , wrapping: "Hard"}), 
                        new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}),
                        new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}),
                        new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"}),
                        new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard"})
                    ]
            });

            var oTable = this.getView().byId("_IDGenTable1");
            oTable.addItem(oItem);
             },  
             onAddRow2L : function(){
                // var obj = {
                //   "name_of_product_or_service" :  "",
                //   "description_of_risk_or_concern" : "",
                //   "action_taken" : ""
                // };
                // var oModel = this.getOwnerComponent().getModel("qualityAssurance").getData()['2L'].push(obj);
                // this.getOwnerComponent().getModel("qualityAssurance").refresh(true);
                var oItem = new sap.m.ColumnListItem({
                    cells: [new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard", width:"100%"}), 
                            new sap.m.TextArea({  maxLength: 1500 , wrapping: "Hard", width:"100%"}), 
                            new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard", width:"100%"})
                        ]
                });
    
                var oTable = this.getView().byId("_IDGenTable2");
                oTable.addItem(oItem);
               },   
             deleteRowTab1: function (oEvent) {
                var oTable = this.getView().byId("_IDGenTable1");
                oTable.removeItem(oEvent.getParameter("listItem").destroy());
            }, 
            deleteRowTab2: function (oEvent) {
                var oTable = this.getView().byId("_IDGenTable2");
                oTable.removeItem(oEvent.getParameter("listItem").destroy());
            },  
            onSave : function(){
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
                        nic_code : "",
                        name_of_product_or_service : "",
                        total_turnover_contributed : "",
                        boundry_of_life_cycle_assessment : "",
                        conducted_by_independent_external_agency : "",
                        results_communicated_in_public_domain : ""
                    };
                    if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[0].getValue() !== ""){
                        row.nic_code = this.getView().byId("_IDGenTable1").getItems()[i].getCells()[0].getValue();
                    }else{
                        row.nic_code = "NA";
                    }

                    if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[1].getValue() !== ""){
                        row.name_of_product_or_service = this.getView().byId("_IDGenTable1").getItems()[i].getCells()[1].getValue();
                    }else{
                        row.name_of_product_or_service = "NA"; 
                    }

                    if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[2].getValue() !== ""){
                        row.total_turnover_contributed = this.getView().byId("_IDGenTable1").getItems()[i].getCells()[2].getValue()
                    }else{
                        row.total_turnover_contributed = "NA";
                    }

                    if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[3].getValue() !== ""){
                        row.boundry_of_life_cycle_assessment  =  this.getView().byId("_IDGenTable1").getItems()[i].getCells()[3].getValue();
                    }else{
                        row.boundry_of_life_cycle_assessment = "NA";
                    }

                    if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[4].getValue() !== ""){
                        row.conducted_by_independent_external_agency = this.getView().byId("_IDGenTable1").getItems()[i].getCells()[4].getValue();
                    }else{
                        row.conducted_by_independent_external_agency = "NA";
                    }

                    if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[5].getValue() !== ""){
                        row.results_communicated_in_public_domain = this.getView().byId("_IDGenTable1").getItems()[i].getCells()[5].getValue();
                    }else{
                        row.results_communicated_in_public_domain = "NA";
                    }

                    if(row.nic_code !== "NA" &&  row.name_of_product_or_service !== "NA" &&  row.total_turnover_contributed !== "NA" && 
                    row.boundry_of_life_cycle_assessment !== "NA" && 
                    row.conducted_by_independent_external_agency !==  "NA" &&
                    row.results_communicated_in_public_domain !== "NA"){
                        getQ3.push(row);
                        }
            
                    // if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[0].getValue() !== "",
                    // this.getView().byId("_IDGenTable1").getItems()[i].getCells()[1].getValue() !== "",
                    // this.getView().byId("_IDGenTable1").getItems()[i].getCells()[2].getValue() !== "",
                    // this.getView().byId("_IDGenTable1").getItems()[i].getCells()[3].getValue() !== "",
                    // this.getView().byId("_IDGenTable1").getItems()[i].getCells()[4].getValue() !==  "",
                    // this.getView().byId("_IDGenTable1").getItems()[i].getCells()[5].getValue() !==  "") {
                    
                    // getQ3.push({
                    //        "nic_code": this.getView().byId("_IDGenTable1").getItems()[i].getCells()[0].getValue(), 
                    //        "name_of_product_or_service": this.getView().byId("_IDGenTable1").getItems()[i].getCells()[1].getValue(),
                    //        "total_turnover_contributed": this.getView().byId("_IDGenTable1").getItems()[i].getCells()[2].getValue(),
                    //        "boundry_of_life_cycle_assessment": this.getView().byId("_IDGenTable1").getItems()[i].getCells()[3].getValue(),
                    //        "conducted_by_independent_external_agency": this.getView().byId("_IDGenTable1").getItems()[i].getCells()[4].getValue(),
                    //        "results_communicated_in_public_domain": this.getView().byId("_IDGenTable1").getItems()[i].getCells()[5].getValue()
                    //    });
                    // }
                  }
           
               //   var getQ4 = this.getView().byId("_IDGenTable2").getBinding("items").getModel().getData()["2L"];
               var getQ4  = [];
               for (var i = 0; i < this.getView().byId("_IDGenTable2").getItems().length; i++) { 
                var row = {
                    name_of_product_or_service : "",
                    description_of_risk_or_concern : "",
                    action_taken : ""
                };
                if(this.getView().byId("_IDGenTable2").getItems()[i].getCells()[0].getValue()  !== "") {
                 row.name_of_product_or_service = this.getView().byId("_IDGenTable2").getItems()[i].getCells()[0].getValue();
                }else {
                    row.name_of_product_or_service = "NA";
                }

                if(this.getView().byId("_IDGenTable2").getItems()[i].getCells()[1].getValue() !== ""){
                    row.description_of_risk_or_concern = this.getView().byId("_IDGenTable2").getItems()[i].getCells()[1].getValue();
                }else{
                    row.description_of_risk_or_concern = "NA";
                }

                if(this.getView().byId("_IDGenTable2").getItems()[i].getCells()[2].getValue() !== ""){
                    row.action_taken = this.getView().byId("_IDGenTable2").getItems()[i].getCells()[2].getValue()
                }else { 
                    row.action_taken = "NA";
                }
                if(row.name_of_product_or_service !== "NA" && row.description_of_risk_or_concern !== "NA" && row.action_taken !== "NA"){
                getQ4.push(row);
                }
               }
                 var getQ5 = this.getView().byId("id_answ5").getValue();
                 var getQ6 = this.getView().byId("id_answ6").getValue();
                 var getQ7 = this.getView().byId("id_answ7").getValue();
                 var getQ8 = this.getView().byId("id_answ8").getValue();
                 var getQ9 = this.getView().byId("id_answ9").getValue();
   
                if(getQ1 == "" || getQ2 == "" || getQ5 == "" ){
                   MessageBox.alert("Mandatory feilds should not be empty");
                   return;
                }
   
                var  qualityAssuranceArr = [];
               if(getQ1 == ""){
                   getQ1 = "NA";
               }
                var q1  = {
                    "principle": "2", 				
                    "indicator": "Essential", 		
                    "questionID": "3E", 			
                    "answer": getQ1
                };
                qualityAssuranceArr.push(q1);
   
                if(getQ2 == ""){
                   getQ2 = "NA";
               }
                var q2  = {
                    "principle": "2", 			
                    "indicator": "Essential", 		
                    "questionID": "4E", 			
                    "answer": getQ2
                };
                qualityAssuranceArr.push(q2);
   
                
                if(getQ3 == ""){
                   getQ3 = "NA";
               
               }
                var q3  = {
                    "principle": "2", 				
                    "indicator": "Leadership", 		
                    "questionID": "1L", 			
                    "principle2_leadership_1" : getQ3
                };
                qualityAssuranceArr.push(q3);
                
                if(getQ4 == ""){
                   getQ4 = "NA";
               }
                var q4  = {
                   "principle": "2", 				
                   "indicator": "Leadership", 		
                   "questionID": "2L", 			
                   "principle2_leadership_2": getQ4
               };
               qualityAssuranceArr.push(q4);
              
               if(getQ5 == ""){
                   getQ5 = "NA";
               }
               var q5 = {
                   "principle": "9", 				
                   "indicator": "Essential", 		
                   "questionID": "1E", 			
                   "answer": getQ5
               };
               qualityAssuranceArr.push(q5);
               
               if(getQ6 == ""){
                   getQ6 = "NA";
               }
               var q6 = {
                   "principle": "9", 				
                   "indicator": "Leadership", 		
                   "questionID": "1L", 			
                   "answer": getQ6
               };
               qualityAssuranceArr.push(q6);
               
               if(getQ7 == ""){
                   getQ7 = "NA";
               }
               var q7 = {
                   "principle": "9", 				
                   "indicator": "Leadership", 		
                   "questionID": "2L", 			
                   "answer": getQ7
               };
               qualityAssuranceArr.push(q7);
               
               if(getQ8 == ""){
                   getQ8 = "NA";
               }
               var q8 = {
                   "principle": "9", 				
                   "indicator": "Leadership", 		
                   "questionID": "3L", 			
                   "answer": getQ8
               };
               qualityAssuranceArr.push(q8);
   
               if(getQ9 == ""){
                   getQ9 = "NA";
               }
               var q9 = {
                   "principle": "9", 				
                   "indicator": "Leadership", 		
                   "questionID": "4L", 			
                   "answer": getQ9
               };
               qualityAssuranceArr.push(q9);
   
                 let obj =  {
                     "fiscalYear": fiscalyear,
                     "businessFunction": "Quality_Assurance",
                     "creator_email": UserEmail,
                     "creator_name": Name,
                     "status" : "Draft",
                     "quality_assurance" : qualityAssuranceArr
                        
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
           
               var getQ3 = [];
                      for (var i = 0; i < this.getView().byId("_IDGenTable1").getItems().length; i++) {
                       var row = {
                           nic_code : "",
                           name_of_product_or_service : "",
                           total_turnover_contributed : "",
                           boundry_of_life_cycle_assessment : "",
                           conducted_by_independent_external_agency : "",
                           results_communicated_in_public_domain : ""
                       };
                       if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[0].getValue() !== ""){
                           row.nic_code = this.getView().byId("_IDGenTable1").getItems()[i].getCells()[0].getValue();
                       }else{
                           row.nic_code = "NA";
                       }
   
                       if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[1].getValue() !== ""){
                           row.name_of_product_or_service = this.getView().byId("_IDGenTable1").getItems()[i].getCells()[1].getValue();
                       }else{
                           row.name_of_product_or_service = "NA"; 
                       }
   
                       if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[2].getValue() !== ""){
                           row.total_turnover_contributed = this.getView().byId("_IDGenTable1").getItems()[i].getCells()[2].getValue()
                       }else{
                           row.total_turnover_contributed = "NA";
                       }
   
                       if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[3].getValue() !== ""){
                           row.boundry_of_life_cycle_assessment  =  this.getView().byId("_IDGenTable1").getItems()[i].getCells()[3].getValue();
                       }else{
                           row.boundry_of_life_cycle_assessment = "NA";
                       }
   
                       if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[4].getValue() !== ""){
                           row.conducted_by_independent_external_agency = this.getView().byId("_IDGenTable1").getItems()[i].getCells()[4].getValue();
                       }else{
                           row.conducted_by_independent_external_agency = "NA";
                       }
   
                       if(this.getView().byId("_IDGenTable1").getItems()[i].getCells()[5].getValue() !== ""){
                           row.results_communicated_in_public_domain = this.getView().byId("_IDGenTable1").getItems()[i].getCells()[5].getValue();
                       }else{
                           row.results_communicated_in_public_domain = "NA";
                       }
   
                       if(row.nic_code !== "NA" &&  row.name_of_product_or_service !== "NA" &&  row.total_turnover_contributed !== "NA" && 
                       row.boundry_of_life_cycle_assessment !== "NA" && 
                       row.conducted_by_independent_external_agency !==  "NA" &&
                       row.results_communicated_in_public_domain !== "NA"){
                           getQ3.push(row);
                           }
                       }
              
           
               //   var getQ4 = this.getView().byId("_IDGenTable2").getBinding("items").getModel().getData()["2L"];
               var getQ4  = [];
               for (var i = 0; i < this.getView().byId("_IDGenTable2").getItems().length; i++) { 
                   var row = {
                       name_of_product_or_service : "",
                       description_of_risk_or_concern : "",
                       action_taken : ""
                   };
                   if(this.getView().byId("_IDGenTable2").getItems()[i].getCells()[0].getValue()  !== "") {
                    row.name_of_product_or_service = this.getView().byId("_IDGenTable2").getItems()[i].getCells()[0].getValue();
                   }else {
                       row.name_of_product_or_service = "NA";
                   }
   
                   if(this.getView().byId("_IDGenTable2").getItems()[i].getCells()[1].getValue() !== ""){
                       row.description_of_risk_or_concern = this.getView().byId("_IDGenTable2").getItems()[i].getCells()[1].getValue();
                   }else{
                       row.description_of_risk_or_concern = "NA";
                   }
   
                   if(this.getView().byId("_IDGenTable2").getItems()[i].getCells()[2].getValue() !== ""){
                       row.action_taken = this.getView().byId("_IDGenTable2").getItems()[i].getCells()[2].getValue()
                   }else { 
                       row.action_taken = "NA";
                   }
                   if(row.name_of_product_or_service !== "NA" && row.description_of_risk_or_concern !== "NA" && row.action_taken !== "NA"){
                   getQ4.push(row);
                   }
                  }
                 var getQ5 = this.getView().byId("id_answ5").getValue();
                 var getQ6 = this.getView().byId("id_answ6").getValue();
                 var getQ7 = this.getView().byId("id_answ7").getValue();
                 var getQ8 = this.getView().byId("id_answ8").getValue();
                 var getQ9 = this.getView().byId("id_answ9").getValue();
   
                if(getQ1 == "" || getQ2 == "" || getQ5 == "" ){
                   MessageBox.alert("Mandatory feilds should not be empty");
                   return;
                }
   
                var  qualityAssuranceArr = [];
               if(getQ1 == ""){
                   getQ1 = "NA";
               }
                var q1  = {
                    "principle": "2", 				
                    "indicator": "Essential", 		
                    "questionID": "3E", 			
                    "answer": getQ1
                };
                qualityAssuranceArr.push(q1);
   
                if(getQ2 == ""){
                   getQ2 = "NA";
               }
                var q2  = {
                    "principle": "2", 				
                    "indicator": "Essential", 		
                    "questionID": "4E", 			
                    "answer": getQ2
                };
                qualityAssuranceArr.push(q2);
   
                
                if(getQ3 == ""){
                   getQ3 = "NA";
               
               }
                var q3  = {
                    "principle": "2", 				
                    "indicator": "Leadership", 		
                    "questionID": "1L", 			
                    "principle2_leadership_1": getQ3
                };
                qualityAssuranceArr.push(q3);
                
                if(getQ4 == ""){
                   getQ4 = "NA";
               }
                var q4  = {
                   "principle": "2", 				
                   "indicator": "Leadership", 		
                   "questionID": "2L", 			
                   "principle2_leadership_2": getQ4
               };
               qualityAssuranceArr.push(q4);
              
               if(getQ5 == ""){
                   getQ5 = "NA";
               }
               var q5 = {
                   "principle": "9", 				
                   "indicator": "Essential", 		
                   "questionID": "1E", 			
                   "answer": getQ5
               };
               qualityAssuranceArr.push(q5);
               
               if(getQ6 == ""){
                   getQ6 = "NA";
               }
               var q6 = {
                   "principle": "9", 				
                   "indicator": "Leadership", 		
                   "questionID": "1L", 			
                   "answer": getQ6
               };
               qualityAssuranceArr.push(q6);
               
               if(getQ7 == ""){
                   getQ7 = "NA";
               }
               var q7 = {
                   "principle": "9", 				
                   "indicator": "Leadership", 		
                   "questionID": "2L", 			
                   "answer": getQ7
               };
               qualityAssuranceArr.push(q7);
               
               if(getQ8 == ""){
                   getQ8 = "NA";
               }
               var q8 = {
                   "principle": "9", 				
                   "indicator": "Leadership", 		
                   "questionID": "3L", 			
                   "answer": getQ8
               };
               qualityAssuranceArr.push(q8);
   
               if(getQ9 == ""){
                   getQ9 = "NA";
               }
               var q9 = {
                   "principle": "9", 				
                   "indicator": "Leadership", 		
                   "questionID": "4L", 			
                   "answer": getQ9
               };
               qualityAssuranceArr.push(q9);
   
                 let obj =  {
                     "fiscalYear": fiscalyear,
                     "businessFunction": "Quality_Assurance",
                     "creator_email": UserEmail,
                     "creator_name": Name,
                     "status" : "Submitted",
                     "quality_assurance" : qualityAssuranceArr
                        
                 };
                 sap.m.MessageBox.confirm("Do you want to submit",{
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
                       //    that.getView().byId("_IDGenObjectPageSection2").setVisible(tr);
                           that.getView().byId("_IDGenButton1").setVisible(false);
                           that.getView().byId("_IDGenButton0").setVisible(false);
                           that._onClear();
                      },
                      error : function(error){
                          oBusy.close();
                          console.log(error);
                      }
                  });
   
                var paOBJ =  {
   
                   "definitionId": "eu10.sap-process-automation-q40kapza.zbrsrqualityassurance.zapproval_process_for_quality_assurance",
               
                   "context": {
               
                       "zfiscal_year": fiscalyear,      
                       "zbusiness_function": "Quality_Assurance",         
                       "zquality_assurance_creator_email": UserEmail,          
                       "zquality_assurance_creator_name": Name,          
                       "zquality_assurance_principle2_essential_3": getQ1,      
                       "zquality_assurance_principle2_essential_4": getQ2,          
                       "zquality_assurance_principle2_leadership_1": getQ3,
                       "zquality_assurance_principle2_leadership_2": getQ4, 
                       "zquality_assurance_principle9_essential_1": getQ5,
                       "zquality_assurance_principle9_leadership_1": getQ6,      
                       "zquality_assurance_principle9_leadership_2": getQ7,
                       "zquality_assurance_principle9_leadership_3": getQ8,   
                       "zquality_assurance_principle9_leadership_4": getQ9         
                   }           
               }
   
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
    
                
            if(that.getView().byId("id_answ1").getValue() === ""){

                validData.push({
                    "PRODUCTCODE": "Q1",
                    "type": "Warning",
                    "desc": "Field is Mandatory"
                });
                counter++;

            }
    
            if(that.getView().byId("id_answ2").getValue() === ""){

                validData.push({
                    "PRODUCTCODE": "Q2",
                    "type": "Warning",
                    "desc": "Field is Mandatory"
                });
                counter++;

            }
                
                // if(that.getView().byId("id_answ3").getValue() === ""){
    
                //    validData.push({
                //        "PRODUCTCODE": "Q3",
                //        "type": "Warning",
                //        "desc": "Field is Mandatory"
                //    });
                //    counter++;
    
                // }
                // if(that.getView().byId("id_answ4").getValue() === ""){
    
                //    validData.push({
                //        "PRODUCTCODE": "Q4",
                //        "type": "Warning",
                //        "desc": "Field is Mandatory"
                //    });
                //    counter++;
    
                // }
                if(that.getView().byId("id_answ5").getValue() === ""){
    
                    validData.push({
                        "PRODUCTCODE": "Q5",
                        "type": "Warning",
                        "desc": "Field is Mandatory"
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
