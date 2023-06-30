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
    function (Controller, JSONModel, MessageBox, Dialog, MessagePopover, MessageItem) {
        "use strict";
        var that;
        return Controller.extend("com.brsr.hr.controller.View1", {
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
                // that._getUserId();

            },
            _onClear: function () {
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
            _clearText: function () {
                this.getView().byId("id_answ1").setValue();
                this.getView().byId("id_answ2").setValue();
                this.getView().byId("id_answ5").setValue();
                this.getView().byId("id_answ6").setValue();
                this.getView().byId("id_answ7").setValue();
                this.getView().byId("id_answ8").setValue();
                this.getView().byId("id_answ9").setValue();
                this.getView().byId("id_answ10").setValue();
                this.getView().byId("id_answ11").setValue();
                this.getView().byId("id_answ12").setValue();
                this.getView().byId("id_answ13").setValue();
                this.getView().byId("id_answ16").setValue();
                // this.getView().byId("_IDGenTable1").destroyItems();
                this.getView().byId("_IDGenTable1").getItems()[0].getCells()[1].setValue();
                this.getView().byId("_IDGenTable1").getItems()[1].getCells()[1].setValue();
                this.getView().byId("_IDGenTable1").getItems()[2].getCells()[1].setValue();
                this.getView().byId("_IDGenTable1").getItems()[3].getCells()[1].setValue();
                this.getView().byId("_IDGenTable2").destroyItems();
                this.getView().byId("_IDGenTable3").destroyItems();
                this.getView().byId("_IDGenTable4").destroyItems();
                this.getView().byId("_IDGenTable5").destroyItems();
                this.getView().byId("_IDGenTable6").destroyItems();
                this.getView().byId("_IDGenTable7").destroyItems();
                this.getView().byId("_IDGenTable8").destroyItems();
                
            },
            _setEditable: function () {
                this.getView().byId("id_answ1").setEditable(true);
                this.getView().byId("id_answ2").setEditable(true);
                this.getView().byId("id_answ5").setEditable(true);
                this.getView().byId("id_answ6").setEditable(true);
                this.getView().byId("id_answ7").setEditable(true);
                this.getView().byId("id_answ8").setEditable(true);
                this.getView().byId("id_answ9").setEditable(true);
                this.getView().byId("id_answ10").setEditable(true);
                this.getView().byId("id_answ11").setEditable(true);
                this.getView().byId("id_answ12").setEditable(true);
                this.getView().byId("id_answ13").setEditable(true);
                this.getView().byId("id_answ16").setEditable(true);
                this.getView().byId("_IDGenTable1").getItems()[0].getCells()[1].setEditable(true);
                this.getView().byId("_IDGenTable1").getItems()[1].getCells()[1].setEditable(true);
                this.getView().byId("_IDGenTable1").getItems()[2].getCells()[1].setEditable(true);
                this.getView().byId("_IDGenTable1").getItems()[3].getCells()[1].setEditable(true);
            },
            onApprovalHistory: function () {
                var that = this;
                // var oDialog = new Dialog({
                //     content : [
                //         new sap.m.Text({text:"hello"})
                //     ]
                // });
                // oDialog.open();
                var filterValues = new Array();
                var fy = new sap.ui.model.Filter({
                    path: "fiscalYear",
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: this.getView().byId("id_fiscalyear").getSelectedKey(),

                });
                filterValues.push(fy)

                var bf = new sap.ui.model.Filter({
                    path: "businessFunction",
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: "HR"
                });
                filterValues.push(bf)

                this.oDataModel.read("/brsr_businessfunctions_approvalHistoryLog",
                    {
                        async: false,
                        filters: filterValues,
                        success: function (data) {
                            console.log(data);
                            var selfData = data.results;
                            var oJsonModel = new JSONModel();
                            oJsonModel.setData(selfData);
                            that.getView().setModel(oJsonModel, "approvalHistory");

                            if (!that.dialog) {
                                that.dialog = sap.ui.xmlfragment(that.getView().getId(), "com.brsr.hr.view.approvalHistory", that);
                                that.getView().addDependent(that.dialog);
                            }
                            that.dialog.open();
                        },
                        error: function (error) {
                            console.log(data);
                        }

                    });



            },
            onClose: function () {
                this.dialog.close();
            },
            onSubmitHeader: function () {
                var self = this;
                self._onClear();
                self.fiscalyear = this.getView().byId("id_fiscalyear").getSelectedKey();
                self.oModel = this.getOwnerComponent().getModel();
                self.getView().byId("_IDGenButton3").setVisible(true);
                // self.path = "/qualitative_data(fiscalYear='"+self.fiscalyear+"',businessFunction='Quality%20Assurance')";
                self.path = "/brsr_businessfunctions_status";
                var Filter1 = new sap.ui.model.Filter("fiscalYear", sap.ui.model.FilterOperator.EQ, self.fiscalyear);
                var Filter2 = new sap.ui.model.Filter("businessFunction", sap.ui.model.FilterOperator.EQ, 'HR');
                self.oBusy = new sap.m.BusyDialog();
                // self.getView().byId("_IDGenObjectPageSection2").setVisible(true);
                // self.getView().byId("_IDGenButton1").setVisible(true);
                // self.getView().byId("_IDGenButton0").setVisible(true);
                self.oBusy.open();

                self.oModel.read(self.path, {
                    filters: [Filter1, Filter2],
                    success: function (data) {
                        if (data.results.length > 0) {
                            self.status = data.results[0].status;
                            //  if(self.status == "Approved" ||  self.status == "Submitted" || self.status == "Rejected" || self.status == "Draft" ){
                            self._status(self);
                            self._getQ3Table(self);
                            self._getQ14Table(self);
                            self._getQ15Table(self);
                            self._getQ17Table(self);
                            self._getQ18Table(self);
                            self._getQ19Table(self);
                            self._getQ20Table(self);
                            self._getQ21Table(self);
                            self.oBusy.close();
                        } else {
                            self.oBusy.close();
                            var oItem = new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })
                                ]
                            });
                            var oTable2 = self.getView().byId("_IDGenTable2");
                            if (self.getView().byId("_IDGenTable2").getItems().length < 1) {
                                oTable2.addItem(oItem);
                                oTable2.setMode("Delete");
                                self.getView().byId("_IDGenButton4").setVisible(true);
                            }

                            var oItem = new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })
                                ]
                            });
                            // var oTable = this.getView().byId("_IDGenTable3");
                            // oTable.addItem(oItem);
                            var oTable3 = self.getView().byId("_IDGenTable3");
                            if (self.getView().byId("_IDGenTable3").getItems().length < 1) {
                                oTable3.addItem(oItem);
                                oTable3.setMode("Delete");
                                self.getView().byId("_IDGenButton5").setVisible(true);
                            }

                            var oItem = new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })
                                ]
                            });
                            // var oTable = this.getView().byId("_IDGenTable4");
                            // oTable.addItem(oItem);
                            var oTable4 = self.getView().byId("_IDGenTable4");
                            if (self.getView().byId("_IDGenTable4").getItems().length < 1) {
                                oTable4.addItem(oItem);
                                oTable4.setMode("Delete");
                                self.getView().byId("_IDGenButton6").setVisible(true);
                            }

                            var oItem = new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })

                                ]
                            });
                            // var oTable = this.getView().byId("_IDGenTable5");
                            // oTable.addItem(oItem);
                            var oTable5 = self.getView().byId("_IDGenTable5");
                            if (self.getView().byId("_IDGenTable5").getItems().length < 1) {
                                oTable5.addItem(oItem);
                                oTable5.setMode("Delete");
                                self.getView().byId("_IDGenButton7").setVisible(true);
                            }

                            var oItem = new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                ]
                            });
                            // var oTable = this.getView().byId("_IDGenTable6");
                            // oTable.addItem(oItem);
                            var oTable6 = self.getView().byId("_IDGenTable6");
                            if (self.getView().byId("_IDGenTable6").getItems().length < 1) {
                                oTable6.addItem(oItem);
                                oTable6.setMode("Delete");
                                self.getView().byId("_IDGenButton8").setVisible(true);
                            }

                            var oItem = new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })
                                ]
                            });
                            // var oTable = this.getView().byId("_IDGenTable7");
                            // oTable.addItem(oItem);
                            var oTable7 = self.getView().byId("_IDGenTable7");
                            if (self.getView().byId("_IDGenTable7").getItems().length < 1) {
                                oTable7.addItem(oItem);
                                oTable7.setMode("Delete");
                                self.getView().byId("_IDGenButton9").setVisible(true);
                            }

                            var oItem = new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })
                                ]
                            });
                            // var oTable = this.getView().byId("_IDGenTable8");
                            // oTable.addItem(oItem);

                            var oTable8 = self.getView().byId("_IDGenTable8");
                            if (self.getView().byId("_IDGenTable8").getItems().length < 1) {
                                oTable8.addItem(oItem);
                                oTable8.setMode("Delete");
                                self.getView().byId("_IDGenButton10").setVisible(true);
                            }


                            self.getView().byId("_IDGenObjectPageSection2").setVisible(true);
                            self.getView().byId("_IDGenButton1").setVisible(true);
                            self.getView().byId("_IDGenButton0").setVisible(true);
                        }



                    },

                    error: function (error) {
                        console.log(error);
                        self.oBusy.close();

                        var oItem = new sap.m.ColumnListItem({
                            cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })
                            ]
                        });
                        var oTable2 = self.getView().byId("_IDGenTable2");
                        if (self.getView().byId("_IDGenTable2").getItems().length < 1) {
                            oTable2.addItem(oItem);
                            oTable2.setMode("Delete");
                            self.getView().byId("_IDGenButton4").setVisible(true);
                        }

                        var oItem = new sap.m.ColumnListItem({
                            cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })
                            ]
                        });
                        // var oTable = this.getView().byId("_IDGenTable3");
                        // oTable.addItem(oItem);
                        var oTable3 = self.getView().byId("_IDGenTable3");
                        if (self.getView().byId("_IDGenTable3").getItems().length < 1) {
                            oTable3.addItem(oItem);
                            oTable3.setMode("Delete");
                            self.getView().byId("_IDGenButton5").setVisible(true);
                        }

                        var oItem = new sap.m.ColumnListItem({
                            cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })
                            ]
                        });
                        // var oTable = this.getView().byId("_IDGenTable4");
                        // oTable.addItem(oItem);
                        var oTable4 = self.getView().byId("_IDGenTable4");
                        if (self.getView().byId("_IDGenTable4").getItems().length < 1) {
                            oTable4.addItem(oItem);
                            oTable4.setMode("Delete");
                            self.getView().byId("_IDGenButton6").setVisible(true);
                        }

                        var oItem = new sap.m.ColumnListItem({
                            cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })

                            ]
                        });
                        // var oTable = this.getView().byId("_IDGenTable5");
                        // oTable.addItem(oItem);
                        var oTable5 = self.getView().byId("_IDGenTable5");
                        if (self.getView().byId("_IDGenTable5").getItems().length < 1) {
                            oTable5.addItem(oItem);
                            oTable5.setMode("Delete");
                            self.getView().byId("_IDGenButton7").setVisible(true);
                        }

                        var oItem = new sap.m.ColumnListItem({
                            cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            ]
                        });
                        // var oTable = this.getView().byId("_IDGenTable6");
                        // oTable.addItem(oItem);
                        var oTable6 = self.getView().byId("_IDGenTable6");
                        if (self.getView().byId("_IDGenTable6").getItems().length < 1) {
                            oTable6.addItem(oItem);
                            oTable6.setMode("Delete");
                            self.getView().byId("_IDGenButton8").setVisible(true);
                        }

                        var oItem = new sap.m.ColumnListItem({
                            cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })
                            ]
                        });
                        // var oTable = this.getView().byId("_IDGenTable7");
                        // oTable.addItem(oItem);
                        var oTable7 = self.getView().byId("_IDGenTable7");
                        if (self.getView().byId("_IDGenTable7").getItems().length < 1) {
                            oTable7.addItem(oItem);
                            oTable7.setMode("Delete");
                            self.getView().byId("_IDGenButton9").setVisible(true);
                        }

                        var oItem = new sap.m.ColumnListItem({
                            cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                            new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })
                            ]
                        });
                        // var oTable = this.getView().byId("_IDGenTable8");
                        // oTable.addItem(oItem);

                        var oTable8 = self.getView().byId("_IDGenTable8");
                        if (self.getView().byId("_IDGenTable8").getItems().length < 1) {
                            oTable8.addItem(oItem);
                            oTable8.setMode("Delete");
                            self.getView().byId("_IDGenButton10").setVisible(true);
                        }


                        self.getView().byId("_IDGenObjectPageSection2").setVisible(true);
                        self.getView().byId("_IDGenButton1").setVisible(true);
                        self.getView().byId("_IDGenButton0").setVisible(true);

                    }

                });


            },
            _status: function (self) {
                var that = self;
                var Filter1 = new sap.ui.model.Filter("fiscalYear", sap.ui.model.FilterOperator.EQ, self.fiscalyear);
                var Filter2 = new sap.ui.model.Filter("businessFunction", sap.ui.model.FilterOperator.EQ, 'HR');
                var pathBf = "/qualitative_data";
                self.oBusy.open();
                that.oModel.read(pathBf, {
                    urlParameters: {
                        "$expand": "HR",
                    },
                    filters: [Filter1, Filter2],
                    success: function (data) {
                        if (data.results[0].HR.results.length > 0) {
                            that.getView().byId("id_answ1").setValue(data.results[0].HR.results[0].answer);
                            that.getView().byId("id_answ2").setValue(data.results[0].HR.results[1].answer);
                            that.getView().byId("id_answ4").setValue(data.results[0].HR.results[3].answer);
                            that.getView().byId("id_answ5").setValue(data.results[0].HR.results[4].answer);
                            that.getView().byId("id_answ6").setValue(data.results[0].HR.results[5].answer);
                            that.getView().byId("id_answ7").setValue(data.results[0].HR.results[6].answer);
                            that.getView().byId("id_answ8").setValue(data.results[0].HR.results[7].answer);
                            that.getView().byId("id_answ9").setValue(data.results[0].HR.results[8].answer);
                            that.getView().byId("id_answ10").setValue(data.results[0].HR.results[9].answer);
                            that.getView().byId("id_answ11").setValue(data.results[0].HR.results[10].answer);
                            that.getView().byId("id_answ12").setValue(data.results[0].HR.results[11].answer);
                            that.getView().byId("id_answ13").setValue(data.results[0].HR.results[12].answer);
                            that.getView().byId("id_answ16").setValue(data.results[0].HR.results[15].answer);


                            if (self.status == "Approved" || self.status == "Submitted" || self.status == "Processing") {
                                // sap.m.MessageBox.confirm("Report has been submitted");
                                that.getView().byId("id_answ1").setEditable(false);
                                that.getView().byId("id_answ2").setEditable(false);
                                that.getView().byId("id_answ5").setEditable(false);
                                that.getView().byId("id_answ6").setEditable(false);
                                that.getView().byId("id_answ7").setEditable(false);
                                that.getView().byId("id_answ8").setEditable(false);
                                that.getView().byId("id_answ9").setEditable(false);
                                that.getView().byId("id_answ10").setEditable(false);
                                that.getView().byId("id_answ11").setEditable(false);
                                that.getView().byId("id_answ12").setEditable(false);
                                that.getView().byId("id_answ13").setEditable(false);
                                that.getView().byId("id_answ16").setEditable(false);
                                that.getView().byId("_IDGenObjectPageSection2").setVisible(true);
                                that.getView().byId("_IDGenButton1").setVisible(false);
                                that.getView().byId("_IDGenButton0").setVisible(false);

                            }
                            if (self.status == "Draft" || self.status == "Rejected") {
                                // if (self.status == "Draft") {
                                //     sap.m.MessageBox.confirm("Report is in draft status");
                                // }
                                // if (self.status == "Rejected") {
                                //     sap.m.MessageBox.confirm("Report Rejected");
                                // }
                                that.getView().byId("id_answ1").setEditable(true);
                                that.getView().byId("id_answ2").setEditable(true);
                                that.getView().byId("id_answ5").setEditable(true);
                                that.getView().byId("id_answ6").setEditable(true);
                                that.getView().byId("id_answ7").setEditable(true);
                                that.getView().byId("id_answ8").setEditable(true);
                                that.getView().byId("id_answ9").setEditable(true);
                                that.getView().byId("id_answ10").setEditable(true);
                                that.getView().byId("id_answ11").setEditable(true);
                                that.getView().byId("id_answ12").setEditable(true);
                                that.getView().byId("id_answ13").setEditable(true);
                                that.getView().byId("id_answ16").setEditable(true);
                                that.getView().byId("_IDGenObjectPageSection2").setVisible(true);
                                that.getView().byId("_IDGenButton1").setVisible(true);
                                that.getView().byId("_IDGenButton0").setVisible(true);

                            }

                            self.oBusy.close();
                        } else {
                            var oItem = new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })
                                ]
                            });
                            var oTable2 = self.getView().byId("_IDGenTable2");
                            if (self.getView().byId("_IDGenTable2").getItems().length < 1) {
                                oTable2.addItem(oItem);
                                oTable2.setMode("Delete");
                                self.getView().byId("_IDGenButton4").setVisible(true);
                            }

                            var oItem = new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })
                                ]
                            });
                            // var oTable = this.getView().byId("_IDGenTable3");
                            // oTable.addItem(oItem);
                            var oTable3 = self.getView().byId("_IDGenTable3");
                            if (self.getView().byId("_IDGenTable3").getItems().length < 1) {
                                oTable3.addItem(oItem);
                                oTable3.setMode("Delete");
                                self.getView().byId("_IDGenButton5").setVisible(true);
                            }

                            var oItem = new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })
                                ]
                            });
                            // var oTable = this.getView().byId("_IDGenTable4");
                            // oTable.addItem(oItem);
                            var oTable4 = self.getView().byId("_IDGenTable4");
                            if (self.getView().byId("_IDGenTable4").getItems().length < 1) {
                                oTable4.addItem(oItem);
                                oTable4.setMode("Delete");
                                self.getView().byId("_IDGenButton6").setVisible(true);
                            }

                            var oItem = new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })

                                ]
                            });
                            // var oTable = this.getView().byId("_IDGenTable5");
                            // oTable.addItem(oItem);
                            var oTable5 = self.getView().byId("_IDGenTable5");
                            if (self.getView().byId("_IDGenTable5").getItems().length < 1) {
                                oTable5.addItem(oItem);
                                oTable5.setMode("Delete");
                                self.getView().byId("_IDGenButton7").setVisible(true);
                            }

                            var oItem = new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                ]
                            });
                            // var oTable = this.getView().byId("_IDGenTable6");
                            // oTable.addItem(oItem);
                            var oTable6 = self.getView().byId("_IDGenTable6");
                            if (self.getView().byId("_IDGenTable6").getItems().length < 1) {
                                oTable6.addItem(oItem);
                                oTable6.setMode("Delete");
                                self.getView().byId("_IDGenButton8").setVisible(true);
                            }

                            var oItem = new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })
                                ]
                            });
                            // var oTable = this.getView().byId("_IDGenTable7");
                            // oTable.addItem(oItem);
                            var oTable7 = self.getView().byId("_IDGenTable7");
                            if (self.getView().byId("_IDGenTable7").getItems().length < 1) {
                                oTable7.addItem(oItem);
                                oTable7.setMode("Delete");
                                self.getView().byId("_IDGenButton9").setVisible(true);
                            }

                            var oItem = new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                                new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })
                                ]
                            });
                            // var oTable = this.getView().byId("_IDGenTable8");
                            // oTable.addItem(oItem);

                            var oTable8 = self.getView().byId("_IDGenTable8");
                            if (self.getView().byId("_IDGenTable8").getItems().length < 1) {
                                oTable8.addItem(oItem);
                                oTable8.setMode("Delete");
                                self.getView().byId("_IDGenButton10").setVisible(true);
                            }

                            self.getView().byId("_IDGenObjectPageSection2").setVisible(true);
                            self.getView().byId("_IDGenButton1").setVisible(true);
                            self.getView().byId("_IDGenButton0").setVisible(true);

                        }

                    },
                    error: function (error) {
                        console.log(error);
                    }
                });

            },
            _getQ3Table: function (self) {
                var that = self;
                // var pathBf = "/qualitative_data_quality_assurance(up__fiscalYear='" +that.fiscalyear+ "',up__businessFunction='Quality%20Assurance',principle='2',indicator='Leadership',questionID='1L')/principle2_leadership_1";
                var Filte1 = new sap.ui.model.Filter("up__fiscalYear", sap.ui.model.FilterOperator.EQ, that.fiscalyear);
                var Filte2 = new sap.ui.model.Filter("up__businessFunction", sap.ui.model.FilterOperator.EQ, 'HR');
                var Filte3 = new sap.ui.model.Filter("principle", sap.ui.model.FilterOperator.EQ, '3');
                var Filte4 = new sap.ui.model.Filter("indicator", sap.ui.model.FilterOperator.EQ, 'Essential');
                var Filte5 = new sap.ui.model.Filter("questionID", sap.ui.model.FilterOperator.EQ, '6E');
                self.oBusy.open();
                that.oModel.read("/qualitative_data_HR", {
                    urlParameters: {
                        "$expand": "principle3_essential_6",
                    },
                    filters: [Filte1, Filte2, Filte3, Filte4, Filte5],
                    success: function (data, response) {
                        console.log(data);
                        var table3 = data.results[0].principle3_essential_6.results[0];

                        that.getView().byId("_IDGenTable1").getItems()[0].getCells()[1].setValue(table3.permanent_workers);
                        that.getView().byId("_IDGenTable1").getItems()[1].getCells()[1].setValue(table3.other_than_permanent_workers);
                        that.getView().byId("_IDGenTable1").getItems()[2].getCells()[1].setValue(table3.permanent_employees);
                        that.getView().byId("_IDGenTable1").getItems()[3].getCells()[1].setValue(table3.other_than_permanent_employees);
                        if (that.status == "Approved" || that.status == "Submitted" || self.status == "Processing") {
                            that.getView().byId("_IDGenTable1").getItems()[0].getCells()[1].setEditable(false);
                            that.getView().byId("_IDGenTable1").getItems()[1].getCells()[1].setEditable(false);
                            that.getView().byId("_IDGenTable1").getItems()[2].getCells()[1].setEditable(false);
                            that.getView().byId("_IDGenTable1").getItems()[3].getCells()[1].setEditable(false);
                        } else if (that.status == "Draft" || that.status == "Rejected") {
                            that.getView().byId("_IDGenTable1").getItems()[0].getCells()[1].setEditable(true);
                            that.getView().byId("_IDGenTable1").getItems()[1].getCells()[1].setEditable(true);
                            that.getView().byId("_IDGenTable1").getItems()[2].getCells()[1].setEditable(true);
                            that.getView().byId("_IDGenTable1").getItems()[3].getCells()[1].setEditable(true);
                        }

                    },
                    error: function (error) {
                        console.log(error);

                    }
                });

            },
            _getQ14Table: function (self) {
                var that = self;
                var pathBf = "/qualitative_data_HR(up__fiscalYear='" + that.fiscalyear + "',up__businessFunction='HR',principle='8',indicator='Essential',questionID='1E')/principle8_essential_1";
                self.oBusy.open();

                that.oModel.read(pathBf, {
                    success: function (data, response) {
                        console.log(data);
                        var table4 = data.results;
                        var oView = that.getView();
                        var oJsonModel = new JSONModel();
                        oJsonModel.setData(table4);
                        oView.setModel(oJsonModel, "Model2");

                        var oItemEdit = {
                            path: "Model2>/",
                            template: new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, value: "{Model2>name_brief_details_of_project}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model2>sia_notification_no}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model2>date}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model2>conducted_by_independent_external_agency}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model2>results_communicated_in_public_domain}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model2>relevant_web_link}", wrapping: "Hard", width: "100%" })
                                ]
                            })
                        }

                        var oItemText = {
                            path: "Model2>/",
                            template: new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, value: "{Model2>name_brief_details_of_project}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model2>sia_notification_no}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model2>date}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model2>conducted_by_independent_external_agency}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model2>results_communicated_in_public_domain}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model2>relevant_web_link}", wrapping: "Hard", editable: false, width: "100%" })
                                ]
                            })
                        }
                        if (that.status == "Approved" || that.status == "Submitted" || self.status == "Processing") {
                            var oTable = that.getView().byId("_IDGenTable2");
                            oTable.bindItems(oItemText);
                            oTable.setMode("None");
                            that.getView().byId("_IDGenButton4").setVisible(false);
                        } else if (that.status == "Draft" || that.status == "Rejected") {
                            var oTable = that.getView().byId("_IDGenTable2");
                            oTable.bindItems(oItemEdit);
                            oTable.setMode("Delete");
                            that.getView().byId("_IDGenButton4").setVisible(true);
                        }

                    },
                    error: function (error) {
                        console.log(error);

                    }
                });

            },
            _getQ15Table: function (self) {
                var that = self;
                var pathBf = "/qualitative_data_HR(up__fiscalYear='" + that.fiscalyear + "',up__businessFunction='HR',principle='8',indicator='Essential',questionID='2E')/principle8_essential_2";
                self.oBusy.open();

                that.oModel.read(pathBf, {
                    success: function (data, response) {
                        console.log(data);
                        var table5 = data.results;
                        var oView = that.getView();
                        var oJsonModel = new JSONModel();
                        oJsonModel.setData(table5);
                        oView.setModel(oJsonModel, "Model3");

                        var oItemEdit = {
                            path: "Model3>/",
                            template: new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, value: "{Model3>sr_no}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model3>name_of_project}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model3>state}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model3>district}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model3>no_of_project_affected_families}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model3>percentage_of_pafs_covered_by_rnr}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model3>amounts_paid_to_pafs}", wrapping: "Hard", width: "100%" })
                                ]
                            })
                        }
                        var oItemText = {
                            path: "Model3>/",
                            template: new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, value: "{Model3>sr_no}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model3>name_of_project}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model3>state}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model3>district}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model3>no_of_project_affected_families}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model3>percentage_of_pafs_covered_by_rnr}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model3>amounts_paid_to_pafs}", wrapping: "Hard", editable: false, width: "100%" })
                                ]
                            })
                        }
                        if (that.status == "Approved" || that.status == "Submitted" || self.status == "Processing") {
                            var oTable = that.getView().byId("_IDGenTable3");
                            oTable.bindItems(oItemText);
                            oTable.setMode("None");
                            that.getView().byId("_IDGenButton5").setVisible(false);
                        } else if (that.status == "Draft" || that.status == "Rejected") {
                            var oTable = that.getView().byId("_IDGenTable3");
                            oTable.bindItems(oItemEdit);
                            oTable.setMode("Delete");
                            that.getView().byId("_IDGenButton5").setVisible(true);
                        }

                    },
                    error: function (error) {
                        console.log(error);

                    }
                });

            },
            _getQ17Table: function (self) {
                var that = self;
                var pathBf = "/qualitative_data_HR(up__fiscalYear='" + that.fiscalyear + "',up__businessFunction='HR',principle='8',indicator='Leadership',questionID='1L')/principle8_leadership_1";
                self.oBusy.open();

                that.oModel.read(pathBf, {
                    success: function (data, response) {
                        console.log(data);
                        var table6 = data.results;
                        var oView = that.getView();
                        var oJsonModel = new JSONModel();
                        oJsonModel.setData(table6);
                        oView.setModel(oJsonModel, "Model4");

                        var oItemEdit = {
                            path: "Model4>/",
                            template: new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, value: "{Model4>details_of_negative_social_impact}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model4>corrective_actions_taken}", wrapping: "Hard", width: "100%" })
                                ]
                            })
                        }

                        var oItemText = {
                            path: "Model4>/",
                            template: new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, value: "{Model4>details_of_negative_social_impact}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model4>corrective_actions_taken}", wrapping: "Hard", editable: false, width: "100%" })
                                ]
                            })
                        }
                        if (that.status == "Approved" || that.status == "Submitted" || self.status == "Processing") {
                            var oTable = that.getView().byId("_IDGenTable4");
                            oTable.bindItems(oItemText);
                            oTable.setMode("None");
                            that.getView().byId("_IDGenButton6").setVisible(false);
                        } else if (that.status == "Draft" || that.status == "Rejected") {
                            var oTable = that.getView().byId("_IDGenTable4");
                            oTable.bindItems(oItemEdit);
                            oTable.setMode("Delete");
                            that.getView().byId("_IDGenButton6").setVisible(true);
                        }

                    },
                    error: function (error) {
                        console.log(error);

                    }
                });

            },
            _getQ18Table: function (self) {
                var that = self;
                var pathBf = "/qualitative_data_HR(up__fiscalYear='" + that.fiscalyear + "',up__businessFunction='HR',principle='8',indicator='Leadership',questionID='2L')/principle8_leadership_2";
                self.oBusy.open();

                that.oModel.read(pathBf, {
                    success: function (data, response) {
                        console.log(data);
                        var table5 = data.results;
                        var oView = that.getView();
                        var oJsonModel = new JSONModel();
                        oJsonModel.setData(table5);
                        oView.setModel(oJsonModel, "Model5");

                        var oItemEdit = {
                            path: "Model5>/",
                            template: new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, value: "{Model5>sr_no}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model5>state}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model5>aspirational_district}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model5>amount_spent}", wrapping: "Hard", width: "100%" })
                                ]
                            })
                        }

                        var oItemText = {
                            path: "Model5>/",
                            template: new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, value: "{Model5>sr_no}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model5>state}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model5>aspirational_district}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model5>amount_spent}", wrapping: "Hard", editable: false, width: "100%" })
                                ]
                            })
                        }

                        if (that.status == "Approved" || that.status == "Submitted" || self.status == "Processing") {
                            var oTable = that.getView().byId("_IDGenTable5");
                            oTable.bindItems(oItemText);
                            oTable.setMode("None");
                            that.getView().byId("_IDGenButton7").setVisible(false);
                        } else if (that.status == "Draft" || that.status == "Rejected") {
                            var oTable = that.getView().byId("_IDGenTable5");
                            oTable.bindItems(oItemEdit);
                            oTable.setMode("Delete");
                            that.getView().byId("_IDGenButton7").setVisible(true);
                        }



                    },
                    error: function (error) {
                        console.log(error);

                    }
                });

            },
            _getQ19Table: function (self) {
                var that = self;
                var pathBf = "/qualitative_data_HR(up__fiscalYear='" + that.fiscalyear + "',up__businessFunction='HR',principle='8',indicator='Leadership',questionID='4L')/principle8_leadership_4";
                self.oBusy.open();

                that.oModel.read(pathBf, {
                    success: function (data, response) {
                        console.log(data);
                        var table6 = data.results;
                        var oView = that.getView();
                        var oJsonModel = new JSONModel();
                        oJsonModel.setData(table6);
                        oView.setModel(oJsonModel, "Model6");

                        var oItemEdit = {
                            path: "Model6>/",
                            template: new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, value: "{Model6>sr_no}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model6>intellectual_property_based_on_traditional_knowledge}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model6>owned_acquired}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model6>benefit_shared}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model6>basis_of_calculationg_benefits_shared}", wrapping: "Hard", width: "100%" })
                                ]
                            })
                        }

                        var oItemText = {
                            path: "Model6>/",
                            template: new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, value: "{Model6>sr_no}", editable: false, wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model6>intellectual_property_based_on_traditional_knowledge}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model6>owned_acquired}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model6>benefit_shared}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model6>basis_of_calculationg_benefits_shared}", wrapping: "Hard", editable: false, width: "100%" })
                                ]
                            })
                        }

                        if (that.status == "Approved" || that.status == "Submitted" || self.status == "Processing") {
                            var oTable = that.getView().byId("_IDGenTable6");
                            oTable.bindItems(oItemText);
                            oTable.setMode("None");
                            that.getView().byId("_IDGenButton8").setVisible(false);
                        } else if (that.status == "Draft" || that.status == "Rejected") {
                            var oTable = that.getView().byId("_IDGenTable6");
                            oTable.bindItems(oItemEdit);
                            oTable.setMode("Delete");
                            that.getView().byId("_IDGenButton8").setVisible(true);
                        }

                    },
                    error: function (error) {
                        console.log(error);

                    }
                });

            },
            _getQ20Table: function (self) {
                var that = self;
                var pathBf = "/qualitative_data_HR(up__fiscalYear='" + that.fiscalyear + "',up__businessFunction='HR',principle='8',indicator='Leadership',questionID='5L')/principle8_leadership_5";
                self.oBusy.open();

                that.oModel.read(pathBf, {
                    success: function (data, response) {
                        console.log(data);
                        var table7 = data.results;
                        var oView = that.getView();
                        var oJsonModel = new JSONModel();
                        oJsonModel.setData(table7);
                        oView.setModel(oJsonModel, "Model7");

                        var oItemEdit = {
                            path: "Model7>/",
                            template: new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, value: "{Model7>name_of_authority}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model7>brief_of_case}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model7>corrective_actions_taken}", wrapping: "Hard", width: "100%" })
                                ]
                            })
                        }

                        var oItemText = {
                            path: "Model7>/",
                            template: new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, value: "{Model7>name_of_authority}", editable: false, wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model7>brief_of_case}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model7>corrective_actions_taken}", wrapping: "Hard", editable: false, width: "100%" })
                                ]
                            })
                        }

                        if (that.status == "Approved" || that.status == "Submitted" || self.status == "Processing") {
                            var oTable = that.getView().byId("_IDGenTable7");
                            oTable.bindItems(oItemText);
                            oTable.setMode("None");
                            that.getView().byId("_IDGenButton9").setVisible(false);
                        } else if (that.status == "Draft" || that.status == "Rejected") {
                            var oTable = that.getView().byId("_IDGenTable7");
                            oTable.bindItems(oItemEdit);
                            oTable.setMode("Delete");
                            that.getView().byId("_IDGenButton9").setVisible(true);
                        }

                    },
                    error: function (error) {
                        console.log(error);

                    }
                });

            },
            _getQ21Table: function (self) {
                var that = self;
                var pathBf = "/qualitative_data_HR(up__fiscalYear='" + that.fiscalyear + "',up__businessFunction='HR',principle='8',indicator='Leadership',questionID='6L')/principle8_leadership_6";
                self.oBusy.open();

                that.oModel.read(pathBf, {
                    success: function (data, response) {
                        console.log(data);
                        var table8 = data.results;
                        var oView = that.getView();
                        var oJsonModel = new JSONModel();
                        oJsonModel.setData(table8);
                        oView.setModel(oJsonModel, "Model8");

                        var oItemEdit = {
                            path: "Model8>/",
                            template: new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, value: "{Model8>sr_no}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model8>csr_project}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model8>no_of_persons_benefitted}", wrapping: "Hard", width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model8>percentage_of_beneficiaries}", wrapping: "Hard", width: "100%" })
                                ]
                            })
                        }

                        var oItemText = {
                            path: "Model8>/",
                            template: new sap.m.ColumnListItem({
                                cells: [new sap.m.TextArea({ maxLength: 1500, value: "{Model8>sr_no}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model8>csr_project}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model8>no_of_persons_benefitted}", wrapping: "Hard", editable: false, width: "100%" }),
                                new sap.m.TextArea({ maxLength: 1500, value: "{Model8>percentage_of_beneficiaries}", wrapping: "Hard", editable: false, width: "100%" })
                                ]
                            })
                        }

                        if (that.status == "Approved" || that.status == "Submitted" || self.status == "Processing") {
                            var oTable = that.getView().byId("_IDGenTable8");
                            oTable.bindItems(oItemText);
                            oTable.setMode("None");
                            that.getView().byId("_IDGenButton10").setVisible(false);
                        } else if (that.status == "Draft" || that.status == "Rejected") {
                            var oTable = that.getView().byId("_IDGenTable8");
                            oTable.bindItems(oItemEdit);
                            oTable.setMode("Delete");
                            that.getView().byId("_IDGenButton10").setVisible(true);
                        }



                    },
                    error: function (error) {
                        console.log(error);

                    }
                });

            },
            onAddRowQ14: function () {
                var oItem = new sap.m.ColumnListItem({
                    cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })
                    ]
                });
                var oTable = this.getView().byId("_IDGenTable2");
                oTable.addItem(oItem);
            },
            onAddRowQ15: function () {
                var oItem = new sap.m.ColumnListItem({
                    cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })
                    ]
                });
                var oTable = this.getView().byId("_IDGenTable3");
                oTable.addItem(oItem);

            },
            onAddRowQ17: function () {
                var oItem = new sap.m.ColumnListItem({
                    cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })
                    ]
                });
                var oTable = this.getView().byId("_IDGenTable4");
                oTable.addItem(oItem);

            },
            onAddRowQ18: function () {
                var oItem = new sap.m.ColumnListItem({
                    cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })

                    ]
                });
                var oTable = this.getView().byId("_IDGenTable5");
                oTable.addItem(oItem);
            },
            onAddRowQ19: function () {
                var oItem = new sap.m.ColumnListItem({
                    cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    ]
                });
                var oTable = this.getView().byId("_IDGenTable6");
                oTable.addItem(oItem);

            },
            onAddRowQ20: function () {
                var oItem = new sap.m.ColumnListItem({
                    cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })
                    ]
                });
                var oTable = this.getView().byId("_IDGenTable7");
                oTable.addItem(oItem);

            },
            onAddRowQ21: function () {
                var oItem = new sap.m.ColumnListItem({
                    cells: [new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" }),
                    new sap.m.TextArea({ maxLength: 1500, wrapping: "Hard" })
                    ]
                });
                var oTable = this.getView().byId("_IDGenTable8");
                oTable.addItem(oItem);

            },
            deleteRowTab: function (oEvent) {
                var getID = oEvent.getSource();
                // var oTable = this.getView().byId("_IDGenTable1");
                getID.removeItem(oEvent.getParameter("listItem").destroy());
            },
            onSave: function () {
                var that = this;
                let fiscalyear = this.getView().byId("id_fiscalyear").getSelectedKey();
                var Name = this.Name;
                var UserEmail = this.UserEmail;
                var getQ1 = this.getView().byId("id_answ1").getValue();
                var getQ2 = this.getView().byId("id_answ2").getValue();
                var getQ4 = this.getView().byId("id_answ4").getValue();
                var getQ5 = this.getView().byId("id_answ5").getValue();
                var getQ6 = this.getView().byId("id_answ6").getValue();
                var getQ7 = this.getView().byId("id_answ7").getValue();
                var getQ8 = this.getView().byId("id_answ8").getValue();
                var getQ9 = this.getView().byId("id_answ9").getValue();
                var getQ10 = this.getView().byId("id_answ10").getValue();
                var getQ11 = this.getView().byId("id_answ11").getValue();
                var getQ12 = this.getView().byId("id_answ12").getValue();
                var getQ13 = this.getView().byId("id_answ13").getValue();
                var getQ16 = this.getView().byId("id_answ16").getValue();

                var getQ3 = [];

                var row = {
                    permanent_workers: "",
                    other_than_permanent_workers: "",
                    permanent_employees: "",
                    other_than_permanent_employees: ""
                };

                if (this.getView().byId("_IDGenTable1").getItems()[0].getCells()[1].getValue() !== "") {
                    row.permanent_workers = this.getView().byId("_IDGenTable1").getItems()[0].getCells()[1].getValue();
                } else {
                    row.permanent_workers = "NA";
                }

                if (this.getView().byId("_IDGenTable1").getItems()[1].getCells()[1].getValue() !== "") {
                    row.other_than_permanent_workers = this.getView().byId("_IDGenTable1").getItems()[1].getCells()[1].getValue();
                } else {
                    row.other_than_permanent_workers = "NA";
                }

                if (this.getView().byId("_IDGenTable1").getItems()[2].getCells()[1].getValue() !== "") {
                    row.permanent_employees = this.getView().byId("_IDGenTable1").getItems()[2].getCells()[1].getValue();
                } else {
                    row.permanent_employees = "NA";
                }

                if (this.getView().byId("_IDGenTable1").getItems()[3].getCells()[1].getValue() !== "") {
                    row.other_than_permanent_employees = this.getView().byId("_IDGenTable1").getItems()[3].getCells()[1].getValue();
                } else {
                    row.other_than_permanent_employees = "NA";
                }

                if (row.permanent_workers !== "NA" && row.other_than_permanent_workers !== "NA" && row.permanent_employees !== "NA"
                    && row.other_than_permanent_employees !== "NA") {
                    getQ3.push(row);
                }
                var getQ14 = [];
                for (var i = 0; i < this.getView().byId("_IDGenTable2").getItems().length; i++) {
                    var row = {
                        name_brief_details_of_project: "",
                        sia_notification_no: "",
                        date: "",
                        conducted_by_independent_external_agency: "",
                        results_communicated_in_public_domain: "",
                        relevant_web_link: ""
                    }

                    if (this.getView().byId("_IDGenTable2").getItems()[i].getCells()[0].getValue() !== "") {
                        row.name_brief_details_of_project = this.getView().byId("_IDGenTable2").getItems()[i].getCells()[0].getValue();
                    } else {
                        row.name_brief_details_of_project = "NA";
                    }

                    if (this.getView().byId("_IDGenTable2").getItems()[i].getCells()[1].getValue() !== "") {
                        row.sia_notification_no = this.getView().byId("_IDGenTable2").getItems()[i].getCells()[1].getValue();
                    } else {
                        row.sia_notification_no = "NA";
                    }

                    if (this.getView().byId("_IDGenTable2").getItems()[i].getCells()[2].getValue() !== "") {
                        row.date = this.getView().byId("_IDGenTable2").getItems()[i].getCells()[2].getValue();
                    } else {
                        row.date = "NA";
                    }

                    if (this.getView().byId("_IDGenTable2").getItems()[i].getCells()[3].getValue() !== "") {
                        row.conducted_by_independent_external_agency = this.getView().byId("_IDGenTable2").getItems()[i].getCells()[3].getValue();
                    } else {
                        row.conducted_by_independent_external_agency = "NA";
                    }

                    if (this.getView().byId("_IDGenTable2").getItems()[i].getCells()[4].getValue() !== "") {
                        row.results_communicated_in_public_domain = this.getView().byId("_IDGenTable2").getItems()[i].getCells()[4].getValue();
                    } else {
                        row.results_communicated_in_public_domain = "NA";
                    }

                    if (this.getView().byId("_IDGenTable2").getItems()[i].getCells()[5].getValue() !== "") {
                        row.relevant_web_link = this.getView().byId("_IDGenTable2").getItems()[i].getCells()[5].getValue();
                    } else {
                        row.relevant_web_link = "NA";
                    }

                    if (row.name_brief_details_of_project !== "NA" && row.sia_notification_no !== "NA" && row.date !== "NA" && row.conducted_by_independent_external_agency !== "NA"
                        && row.conducted_by_independent_external_agency !== "NA" && row.results_communicated_in_public_domain !== "NA" && row.relevant_web_link !== "NA") {
                        getQ14.push(row);
                    }

                }

                var getQ15 = [];

                for (var i = 0; i < this.getView().byId("_IDGenTable3").getItems().length; i++) {
                    var row = {
                        sr_no: "",
                        name_of_project: "",
                        state: "",
                        district: "",
                        no_of_project_affected_families: "",
                        percentage_of_pafs_covered_by_rnr: "",
                        amounts_paid_to_pafs: ""
                    }

                    if (this.getView().byId("_IDGenTable3").getItems()[i].getCells()[0].getValue() !== "") {
                        row.sr_no = this.getView().byId("_IDGenTable3").getItems()[i].getCells()[0].getValue();
                    } else {
                        row.sr_no = "NA";
                    }

                    if (this.getView().byId("_IDGenTable3").getItems()[i].getCells()[1].getValue() !== "") {
                        row.name_of_project = this.getView().byId("_IDGenTable2").getItems()[i].getCells()[1].getValue();
                    } else {
                        row.name_of_project = "NA";
                    }

                    if (this.getView().byId("_IDGenTable3").getItems()[i].getCells()[2].getValue() !== "") {
                        row.state = this.getView().byId("_IDGenTable3").getItems()[i].getCells()[2].getValue();
                    } else {
                        row.state = "NA";
                    }

                    if (this.getView().byId("_IDGenTable3").getItems()[i].getCells()[3].getValue() !== "") {
                        row.district = this.getView().byId("_IDGenTable3").getItems()[i].getCells()[3].getValue();
                    } else {
                        row.district = "NA";
                    }

                    if (this.getView().byId("_IDGenTable3").getItems()[i].getCells()[4].getValue() !== "") {
                        row.no_of_project_affected_families = this.getView().byId("_IDGenTable3").getItems()[i].getCells()[4].getValue();
                    } else {
                        row.no_of_project_affected_families = "NA";
                    }

                    if (this.getView().byId("_IDGenTable3").getItems()[i].getCells()[5].getValue() !== "") {
                        row.percentage_of_pafs_covered_by_rnr = this.getView().byId("_IDGenTable3").getItems()[i].getCells()[5].getValue();
                    } else {
                        row.percentage_of_pafs_covered_by_rnr = "NA";
                    }

                    if (this.getView().byId("_IDGenTable3").getItems()[i].getCells()[6].getValue() !== "") {
                        row.amounts_paid_to_pafs = this.getView().byId("_IDGenTable3").getItems()[i].getCells()[6].getValue();
                    } else {
                        row.amounts_paid_to_pafs = "NA";
                    }

                    if (row.sr_no !== "NA" && row.name_of_project !== "NA" && row.state !== "NA" && row.district !== "NA"
                        && row.no_of_project_affected_families !== "NA" && row.percentage_of_pafs_covered_by_rnr !== "NA" && row.amounts_paid_to_pafs !== "NA") {
                        getQ15.push(row);
                    }

                }

                var getQ17 = [];
                for (var i = 0; i < this.getView().byId("_IDGenTable4").getItems().length; i++) {
                    var row = {
                        details_of_negative_social_impact: "",
                        corrective_actions_taken: ""
                    }

                    if (this.getView().byId("_IDGenTable4").getItems()[i].getCells()[0].getValue() !== "") {
                        row.details_of_negative_social_impact = this.getView().byId("_IDGenTable4").getItems()[i].getCells()[0].getValue();
                    } else {
                        row.details_of_negative_social_impact = "NA";
                    }

                    if (this.getView().byId("_IDGenTable4").getItems()[i].getCells()[1].getValue() !== "") {
                        row.corrective_actions_taken = this.getView().byId("_IDGenTable4").getItems()[i].getCells()[1].getValue();
                    } else {
                        row.corrective_actions_taken = "NA";
                    }



                    if (row.details_of_negative_social_impact !== "NA" && row.corrective_actions_taken !== "NA") {
                        getQ17.push(row);
                    }

                }

                var getQ18 = [];

                for (var i = 0; i < this.getView().byId("_IDGenTable5").getItems().length; i++) {
                    var row = {
                        sr_no: "",
                        state: "",
                        aspirational_district: "",
                        amount_spent: ""
                    }

                    if (this.getView().byId("_IDGenTable5").getItems()[i].getCells()[0].getValue() !== "") {
                        row.sr_no = this.getView().byId("_IDGenTable5").getItems()[i].getCells()[0].getValue();
                    } else {
                        row.sr_no = "NA";
                    }

                    if (this.getView().byId("_IDGenTable5").getItems()[i].getCells()[1].getValue() !== "") {
                        row.state = this.getView().byId("_IDGenTable5").getItems()[i].getCells()[1].getValue();
                    } else {
                        row.state = "NA";
                    }

                    if (this.getView().byId("_IDGenTable5").getItems()[i].getCells()[2].getValue() !== "") {
                        row.aspirational_district = this.getView().byId("_IDGenTable5").getItems()[i].getCells()[2].getValue();
                    } else {
                        row.aspirational_district = "NA";
                    }

                    if (this.getView().byId("_IDGenTable5").getItems()[i].getCells()[3].getValue() !== "") {
                        row.amount_spent = this.getView().byId("_IDGenTable5").getItems()[i].getCells()[3].getValue();
                    } else {
                        row.amount_spent = "NA";
                    }

                    if (row.sr_no !== "NA" && row.state !== "NA" && row.aspirational_district !== "NA" && row.amount_spent !== "NA") {
                        getQ18.push(row);
                    }

                }

                var getQ19 = [];

                for (var i = 0; i < this.getView().byId("_IDGenTable6").getItems().length; i++) {
                    var row = {
                        sr_no: "",
                        intellectual_property_based_on_traditional_knowledge: "",
                        owned_acquired: "",
                        benefit_shared: "",
                        basis_of_calculationg_benefits_shared: ""
                    }

                    if (this.getView().byId("_IDGenTable6").getItems()[i].getCells()[0].getValue() !== "") {
                        row.sr_no = this.getView().byId("_IDGenTable6").getItems()[i].getCells()[0].getValue();
                    } else {
                        row.sr_no = "NA";
                    }

                    if (this.getView().byId("_IDGenTable6").getItems()[i].getCells()[1].getValue() !== "") {
                        row.intellectual_property_based_on_traditional_knowledge = this.getView().byId("_IDGenTable6").getItems()[i].getCells()[1].getValue();
                    } else {
                        row.intellectual_property_based_on_traditional_knowledge = "NA";
                    }

                    if (this.getView().byId("_IDGenTable6").getItems()[i].getCells()[2].getValue() !== "") {
                        row.owned_acquired = this.getView().byId("_IDGenTable6").getItems()[i].getCells()[2].getValue();
                    } else {
                        row.owned_acquired = "NA";
                    }

                    if (this.getView().byId("_IDGenTable6").getItems()[i].getCells()[3].getValue() !== "") {
                        row.benefit_shared = this.getView().byId("_IDGenTable6").getItems()[i].getCells()[3].getValue();
                    } else {
                        row.benefit_shared = "NA";
                    }

                    if (this.getView().byId("_IDGenTable6").getItems()[i].getCells()[4].getValue() !== "") {
                        row.basis_of_calculationg_benefits_shared = this.getView().byId("_IDGenTable6").getItems()[i].getCells()[4].getValue();
                    } else {
                        row.basis_of_calculationg_benefits_shared = "NA";
                    }

                    if (row.sr_no !== "NA" && row.intellectual_property_based_on_traditional_knowledge !== "NA" && row.owned_acquired !== "NA" && row.benefit_shared !== "NA"
                        && row.basis_of_calculationg_benefits_shared !== "NA") {
                        getQ19.push(row);
                    }

                }

                var getQ20 = [];

                for (var i = 0; i < this.getView().byId("_IDGenTable7").getItems().length; i++) {
                    var row = {
                        name_of_authority: "",
                        brief_of_case: "",
                        corrective_actions_taken: ""
                    }

                    if (this.getView().byId("_IDGenTable7").getItems()[i].getCells()[0].getValue() !== "") {
                        row.name_of_authority = this.getView().byId("_IDGenTable7").getItems()[i].getCells()[0].getValue();
                    } else {
                        row.name_of_authority = "NA";
                    }

                    if (this.getView().byId("_IDGenTable7").getItems()[i].getCells()[1].getValue() !== "") {
                        row.brief_of_case = this.getView().byId("_IDGenTable7").getItems()[i].getCells()[1].getValue();
                    } else {
                        row.brief_of_case = "NA";
                    }

                    if (this.getView().byId("_IDGenTable7").getItems()[i].getCells()[2].getValue() !== "") {
                        row.corrective_actions_taken = this.getView().byId("_IDGenTable7").getItems()[i].getCells()[2].getValue();
                    } else {
                        row.corrective_actions_taken = "NA";
                    }

                    if (row.name_of_authority !== "NA" && row.brief_of_case !== "NA" && row.corrective_actions_taken !== "NA") {
                        getQ20.push(row);
                    }

                }

                var getQ21 = [];

                for (var i = 0; i < this.getView().byId("_IDGenTable8").getItems().length; i++) {
                    var row = {
                        sr_no: "",
                        csr_project: "",
                        no_of_persons_benefitted: "",
                        percentage_of_beneficiaries: ""
                    }

                    if (this.getView().byId("_IDGenTable8").getItems()[i].getCells()[0].getValue() !== "") {
                        row.sr_no = this.getView().byId("_IDGenTable8").getItems()[i].getCells()[0].getValue();
                    } else {
                        row.sr_no = "NA";
                    }

                    if (this.getView().byId("_IDGenTable8").getItems()[i].getCells()[1].getValue() !== "") {
                        row.csr_project = this.getView().byId("_IDGenTable8").getItems()[i].getCells()[1].getValue();
                    } else {
                        row.csr_project = "NA";
                    }

                    if (this.getView().byId("_IDGenTable8").getItems()[i].getCells()[2].getValue() !== "") {
                        row.no_of_persons_benefitted = this.getView().byId("_IDGenTable8").getItems()[i].getCells()[2].getValue();
                    } else {
                        row.no_of_persons_benefitted = "NA";
                    }

                    if (this.getView().byId("_IDGenTable8").getItems()[i].getCells()[3].getValue() !== "") {
                        row.percentage_of_beneficiaries = this.getView().byId("_IDGenTable8").getItems()[i].getCells()[3].getValue();
                    } else {
                        row.percentage_of_beneficiaries = "NA";
                    }

                    if (row.sr_no !== "NA" && row.csr_project !== "NA" && row.no_of_persons_benefitted !== "NA" && row.percentage_of_beneficiaries !== "NA") {
                        getQ21.push(row);
                    }

                }



                var HR_Arr = [];
                if (getQ1 == "") {
                    getQ1 = "NA";
                }
                var q1 = {
                    "principle": "3",
                    "indicator": "Essential",
                    "questionID": "3E",
                    "answer": getQ1
                };
                HR_Arr.push(q1);

                if (getQ2 == "") {
                    getQ2 = "NA";
                }
                var q2 = {
                    "principle": "3",
                    "indicator": "Essential",
                    "questionID": "4E",
                    "answer": getQ2
                };
                HR_Arr.push(q2);


                if (getQ3 == "") {
                    getQ3 = "NA";

                }
                var q3 = {
                    "principle": "3",
                    "indicator": "Essential",
                    "questionID": "6E",
                    "principle3_essential_6": getQ3
                };
                HR_Arr.push(q3);

                if (getQ4 == "") {
                    getQ4 = "NA";
                }
                var q4 = {
                    "principle": "3",
                    "indicator": "Leadership",
                    "questionID": "1L",
                    "answer": getQ4
                };
                HR_Arr.push(q4);

                if (getQ5 == "") {
                    getQ5 = "NA";
                }
                var q5 = {
                    "principle": "3",
                    "indicator": "Leadership",
                    "questionID": "4L",
                    "answer": getQ5
                };
                HR_Arr.push(q5);

                if (getQ6 == "") {
                    getQ6 = "NA";
                }
                var q6 = {
                    "principle": "5",
                    "indicator": "Essential",
                    "questionID": "4E",
                    "answer": getQ6
                };
                HR_Arr.push(q6);

                if (getQ7 == "") {
                    getQ7 = "NA";
                }
                var q7 = {
                    "principle": "5",
                    "indicator": "Essential",
                    "questionID": "5E",
                    "answer": getQ7
                };
                HR_Arr.push(q7);

                if (getQ8 == "") {
                    getQ8 = "NA";
                }
                var q8 = {
                    "principle": "5",
                    "indicator": "Essential",
                    "questionID": "7E",
                    "answer": getQ8
                };
                HR_Arr.push(q8);

                if (getQ9 == "") {
                    getQ9 = "NA";
                }
                var q9 = {
                    "principle": "5",
                    "indicator": "Essential",
                    "questionID": "8E",
                    "answer": getQ9
                };
                HR_Arr.push(q9);

                if (getQ10 == "") {
                    getQ10 = "NA";
                }
                var q10 = {
                    "principle": "5",
                    "indicator": "Essential",
                    "questionID": "10E",
                    "answer": getQ10
                }
                HR_Arr.push(q10);

                if (getQ11 == "") {
                    getQ11 = "NA";
                }
                var q11 = {
                    "principle": "5",
                    "indicator": "Leadership",
                    "questionID": "1L",
                    "answer": getQ11
                }
                HR_Arr.push(q11);

                if (getQ12 == "") {
                    getQ12 = "NA";
                }
                var q12 = {
                    "principle": "5",
                    "indicator": "Leadership",
                    "questionID": "2L",
                    "answer": getQ12
                }
                HR_Arr.push(q12);

                if (getQ13 == "") {
                    getQ13 = "NA";
                }
                var q13 = {
                    "principle": "5",
                    "indicator": "Leadership",
                    "questionID": "3L",
                    "answer": getQ13
                }
                HR_Arr.push(q13);

                if (getQ14 == "") {
                    getQ14 = "NA";
                }
                var q14 = {
                    "principle": "8",
                    "indicator": "Essential",
                    "questionID": "1E",
                    "principle8_essential_1": getQ14
                }
                HR_Arr.push(q14);

                if (getQ15 == "") {
                    getQ15 = "NA";
                }
                var q15 = {
                    "principle": "8",
                    "indicator": "Essential",
                    "questionID": "2E",
                    "principle8_essential_2": getQ15
                }
                HR_Arr.push(q15);

                if (getQ16 == "") {
                    getQ16 = "NA";
                }
                var q16 = {
                    "principle": "8",
                    "indicator": "Essential",
                    "questionID": "3E",
                    "answer": getQ16
                }
                HR_Arr.push(q16);

                if (getQ17 == "") {
                    getQ17 = "NA";
                }
                var q17 = {
                    "principle": "8",
                    "indicator": "Leadership",
                    "questionID": "1L",
                    "principle8_leadership_1": getQ17
                }
                HR_Arr.push(q17);

                if (getQ18 == "") {
                    getQ18 = "NA";
                }
                var q18 = {
                    "principle": "8",
                    "indicator": "Leadership",
                    "questionID": "2L",
                    "principle8_leadership_2": getQ18
                }
                HR_Arr.push(q18);

                if (getQ19 == "") {
                    getQ19 = "NA";
                }
                var q19 = {
                    "principle": "8",
                    "indicator": "Leadership",
                    "questionID": "4L",
                    "principle8_leadership_4": getQ19
                }
                HR_Arr.push(q19);

                if (getQ19 == "") {
                    getQ19 = "NA";
                }
                var q20 = {
                    "principle": "8",
                    "indicator": "Leadership",
                    "questionID": "5L",
                    "principle8_leadership_5": getQ20
                }
                HR_Arr.push(q20);

                var q21 = {
                    "principle": "8",
                    "indicator": "Leadership",
                    "questionID": "6L",
                    "principle8_leadership_6": getQ21
                }
                HR_Arr.push(q21);


                let obj = {
                    "fiscalYear": fiscalyear,
                    "businessFunction": "HR",
                    "status": "Draft",
                    "creator_email": UserEmail,
                    "creator_name": Name,
                    "HR": HR_Arr

                };
                sap.m.MessageBox.confirm("Do you want to save", {
                    actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    emphasizedAction: sap.m.MessageBox.Action.OK,
                    onClose: function (sAction) {
                        if (sAction == "OK") {
                            var oBusy = new sap.m.BusyDialog();

                            oBusy.open();
                            var oModel = that.getOwnerComponent().getModel()
                            oModel.create("/qualitative_data", obj, {
                                success: function (odata) {
                                    oBusy.close();
                                    that.getView().byId("_IDGenObjectPageSection2").setVisible(true);
                                    that.getView().byId("_IDGenButton1").setVisible(true);
                                    that.getView().byId("_IDGenButton0").setVisible(true);
                                    sap.m.MessageBox.success("Draft Saved", {
                                        icon: MessageBox.Icon.SUCCESS,
                                        title: "SUCCESS",
                                        actions: [MessageBox.Action.OK],
                                        initialFocus: MessageBox.Action.OK,
                                        onClose: function (Action) {
                                            // that.clearForm();
                                            
                                        }
                                    });

                                },
                                error: function (error) {
                                    oBusy.close();
                                    console.log(error);
                                }
                            });
                        }
                    }

                });

            },
            onConfirmBtnPress: function () {
                var that = this;
                let fiscalyear = this.getView().byId("id_fiscalyear").getSelectedKey();
                var Name = this.Name;
                var UserEmail = this.UserEmail;
                var getQ1 = this.getView().byId("id_answ1").getValue();
                var getQ2 = this.getView().byId("id_answ2").getValue();
                var getQ4 = this.getView().byId("id_answ4").getValue();
                var getQ5 = this.getView().byId("id_answ5").getValue();
                var getQ6 = this.getView().byId("id_answ6").getValue();
                var getQ7 = this.getView().byId("id_answ7").getValue();
                var getQ8 = this.getView().byId("id_answ8").getValue();
                var getQ9 = this.getView().byId("id_answ9").getValue();
                var getQ10 = this.getView().byId("id_answ10").getValue();
                var getQ11 = this.getView().byId("id_answ11").getValue();
                var getQ12 = this.getView().byId("id_answ12").getValue();
                var getQ13 = this.getView().byId("id_answ13").getValue();
                var getQ16 = this.getView().byId("id_answ16").getValue();

                var getQ3 = [];

                var row = {
                    permanent_workers: "",
                    other_than_permanent_workers: "",
                    permanent_employees: "",
                    other_than_permanent_employees: ""
                };

                if (this.getView().byId("_IDGenTable1").getItems()[0].getCells()[1].getValue() !== "") {
                    row.permanent_workers = this.getView().byId("_IDGenTable1").getItems()[0].getCells()[1].getValue();
                } else {
                    row.permanent_workers = "NA";
                }

                if (this.getView().byId("_IDGenTable1").getItems()[1].getCells()[1].getValue() !== "") {
                    row.other_than_permanent_workers = this.getView().byId("_IDGenTable1").getItems()[1].getCells()[1].getValue();
                } else {
                    row.other_than_permanent_workers = "NA";
                }

                if (this.getView().byId("_IDGenTable1").getItems()[2].getCells()[1].getValue() !== "") {
                    row.permanent_employees = this.getView().byId("_IDGenTable1").getItems()[2].getCells()[1].getValue();
                } else {
                    row.permanent_employees = "NA";
                }

                if (this.getView().byId("_IDGenTable1").getItems()[3].getCells()[1].getValue() !== "") {
                    row.other_than_permanent_employees = this.getView().byId("_IDGenTable1").getItems()[3].getCells()[1].getValue();
                } else {
                    row.other_than_permanent_employees = "NA";
                }

                if (row.permanent_workers !== "NA" && row.other_than_permanent_workers !== "NA" && row.permanent_employees !== "NA"
                    && row.other_than_permanent_employees !== "NA") {
                    getQ3.push(row);
                }

                var getQ14 = [];
                for (var i = 0; i < this.getView().byId("_IDGenTable2").getItems().length; i++) {
                    var row = {
                        name_brief_details_of_project: "",
                        sia_notification_no: "",
                        date: "",
                        conducted_by_independent_external_agency: "",
                        results_communicated_in_public_domain: "",
                        relevant_web_link: ""
                    }

                    if (this.getView().byId("_IDGenTable2").getItems()[i].getCells()[0].getValue() !== "") {
                        row.name_brief_details_of_project = this.getView().byId("_IDGenTable2").getItems()[i].getCells()[0].getValue();
                    } else {
                        row.name_brief_details_of_project = "NA";
                    }

                    if (this.getView().byId("_IDGenTable2").getItems()[i].getCells()[1].getValue() !== "") {
                        row.sia_notification_no = this.getView().byId("_IDGenTable2").getItems()[i].getCells()[1].getValue();
                    } else {
                        row.sia_notification_no = "NA";
                    }

                    if (this.getView().byId("_IDGenTable2").getItems()[i].getCells()[2].getValue() !== "") {
                        row.date = this.getView().byId("_IDGenTable2").getItems()[i].getCells()[2].getValue();
                    } else {
                        row.date = "NA";
                    }

                    if (this.getView().byId("_IDGenTable2").getItems()[i].getCells()[3].getValue() !== "") {
                        row.conducted_by_independent_external_agency = this.getView().byId("_IDGenTable2").getItems()[i].getCells()[3].getValue();
                    } else {
                        row.conducted_by_independent_external_agency = "NA";
                    }

                    if (this.getView().byId("_IDGenTable2").getItems()[i].getCells()[4].getValue() !== "") {
                        row.results_communicated_in_public_domain = this.getView().byId("_IDGenTable2").getItems()[i].getCells()[4].getValue();
                    } else {
                        row.results_communicated_in_public_domain = "NA";
                    }

                    if (this.getView().byId("_IDGenTable2").getItems()[i].getCells()[5].getValue() !== "") {
                        row.relevant_web_link = this.getView().byId("_IDGenTable2").getItems()[i].getCells()[5].getValue();
                    } else {
                        row.relevant_web_link = "NA";
                    }

                    if (row.name_brief_details_of_project !== "NA" && row.sia_notification_no !== "NA" && row.date !== "NA" && row.conducted_by_independent_external_agency !== "NA"
                        && row.conducted_by_independent_external_agency !== "NA" && row.results_communicated_in_public_domain !== "NA" && row.relevant_web_link !== "NA") {
                        getQ14.push(row);
                    }

                }

                var getQ15 = [];

                for (var i = 0; i < this.getView().byId("_IDGenTable3").getItems().length; i++) {
                    var row = {
                        sr_no: "",
                        name_of_project: "",
                        state: "",
                        district: "",
                        no_of_project_affected_families: "",
                        percentage_of_pafs_covered_by_rnr: "",
                        amounts_paid_to_pafs: ""
                    }

                    if (this.getView().byId("_IDGenTable3").getItems()[i].getCells()[0].getValue() !== "") {
                        row.sr_no = this.getView().byId("_IDGenTable3").getItems()[i].getCells()[0].getValue();
                    } else {
                        row.sr_no = "NA";
                    }

                    if (this.getView().byId("_IDGenTable3").getItems()[i].getCells()[1].getValue() !== "") {
                        row.name_of_project = this.getView().byId("_IDGenTable2").getItems()[i].getCells()[1].getValue();
                    } else {
                        row.name_of_project = "NA";
                    }

                    if (this.getView().byId("_IDGenTable3").getItems()[i].getCells()[2].getValue() !== "") {
                        row.state = this.getView().byId("_IDGenTable3").getItems()[i].getCells()[2].getValue();
                    } else {
                        row.state = "NA";
                    }

                    if (this.getView().byId("_IDGenTable3").getItems()[i].getCells()[3].getValue() !== "") {
                        row.district = this.getView().byId("_IDGenTable3").getItems()[i].getCells()[3].getValue();
                    } else {
                        row.district = "NA";
                    }

                    if (this.getView().byId("_IDGenTable3").getItems()[i].getCells()[4].getValue() !== "") {
                        row.no_of_project_affected_families = this.getView().byId("_IDGenTable3").getItems()[i].getCells()[4].getValue();
                    } else {
                        row.no_of_project_affected_families = "NA";
                    }

                    if (this.getView().byId("_IDGenTable3").getItems()[i].getCells()[5].getValue() !== "") {
                        row.percentage_of_pafs_covered_by_rnr = this.getView().byId("_IDGenTable3").getItems()[i].getCells()[5].getValue();
                    } else {
                        row.percentage_of_pafs_covered_by_rnr = "NA";
                    }

                    if (this.getView().byId("_IDGenTable3").getItems()[i].getCells()[6].getValue() !== "") {
                        row.amounts_paid_to_pafs = this.getView().byId("_IDGenTable3").getItems()[i].getCells()[6].getValue();
                    } else {
                        row.amounts_paid_to_pafs = "NA";
                    }

                    if (row.sr_no !== "NA" && row.name_of_project !== "NA" && row.state !== "NA" && row.district !== "NA"
                        && row.no_of_project_affected_families !== "NA" && row.percentage_of_pafs_covered_by_rnr !== "NA" && row.amounts_paid_to_pafs !== "NA") {
                        getQ15.push(row);
                    }

                }

                var getQ17 = [];
                for (var i = 0; i < this.getView().byId("_IDGenTable4").getItems().length; i++) {
                    var row = {
                        details_of_negative_social_impact: "",
                        corrective_actions_taken: ""
                    }

                    if (this.getView().byId("_IDGenTable4").getItems()[i].getCells()[0].getValue() !== "") {
                        row.details_of_negative_social_impact = this.getView().byId("_IDGenTable4").getItems()[i].getCells()[0].getValue();
                    } else {
                        row.details_of_negative_social_impact = "NA";
                    }

                    if (this.getView().byId("_IDGenTable4").getItems()[i].getCells()[1].getValue() !== "") {
                        row.corrective_actions_taken = this.getView().byId("_IDGenTable4").getItems()[i].getCells()[1].getValue();
                    } else {
                        row.corrective_actions_taken = "NA";
                    }



                    if (row.details_of_negative_social_impact !== "NA" && row.corrective_actions_taken !== "NA") {
                        getQ17.push(row);
                    }

                }

                var getQ18 = [];

                for (var i = 0; i < this.getView().byId("_IDGenTable5").getItems().length; i++) {
                    var row = {
                        sr_no: "",
                        state: "",
                        aspirational_district: "",
                        amount_spent: ""
                    }

                    if (this.getView().byId("_IDGenTable5").getItems()[i].getCells()[0].getValue() !== "") {
                        row.sr_no = this.getView().byId("_IDGenTable5").getItems()[i].getCells()[0].getValue();
                    } else {
                        row.sr_no = "NA";
                    }

                    if (this.getView().byId("_IDGenTable5").getItems()[i].getCells()[1].getValue() !== "") {
                        row.state = this.getView().byId("_IDGenTable5").getItems()[i].getCells()[1].getValue();
                    } else {
                        row.state = "NA";
                    }

                    if (this.getView().byId("_IDGenTable5").getItems()[i].getCells()[2].getValue() !== "") {
                        row.aspirational_district = this.getView().byId("_IDGenTable5").getItems()[i].getCells()[2].getValue();
                    } else {
                        row.aspirational_district = "NA";
                    }

                    if (this.getView().byId("_IDGenTable5").getItems()[i].getCells()[3].getValue() !== "") {
                        row.amount_spent = this.getView().byId("_IDGenTable5").getItems()[i].getCells()[3].getValue();
                    } else {
                        row.amount_spent = "NA";
                    }

                    if (row.sr_no !== "NA" && row.state !== "NA" && row.aspirational_district !== "NA" && row.amount_spent !== "NA") {
                        getQ18.push(row);
                    }

                }

                var getQ19 = [];

                for (var i = 0; i < this.getView().byId("_IDGenTable6").getItems().length; i++) {
                    var row = {
                        sr_no: "",
                        intellectual_property_based_on_traditional_knowledge: "",
                        owned_acquired: "",
                        benefit_shared: "",
                        basis_of_calculationg_benefits_shared: ""
                    }

                    if (this.getView().byId("_IDGenTable6").getItems()[i].getCells()[0].getValue() !== "") {
                        row.sr_no = this.getView().byId("_IDGenTable6").getItems()[i].getCells()[0].getValue();
                    } else {
                        row.sr_no = "NA";
                    }

                    if (this.getView().byId("_IDGenTable6").getItems()[i].getCells()[1].getValue() !== "") {
                        row.intellectual_property_based_on_traditional_knowledge = this.getView().byId("_IDGenTable6").getItems()[i].getCells()[1].getValue();
                    } else {
                        row.intellectual_property_based_on_traditional_knowledge = "NA";
                    }

                    if (this.getView().byId("_IDGenTable6").getItems()[i].getCells()[2].getValue() !== "") {
                        row.owned_acquired = this.getView().byId("_IDGenTable6").getItems()[i].getCells()[2].getValue();
                    } else {
                        row.owned_acquired = "NA";
                    }

                    if (this.getView().byId("_IDGenTable6").getItems()[i].getCells()[3].getValue() !== "") {
                        row.benefit_shared = this.getView().byId("_IDGenTable6").getItems()[i].getCells()[3].getValue();
                    } else {
                        row.benefit_shared = "NA";
                    }

                    if (this.getView().byId("_IDGenTable6").getItems()[i].getCells()[4].getValue() !== "") {
                        row.basis_of_calculationg_benefits_shared = this.getView().byId("_IDGenTable6").getItems()[i].getCells()[4].getValue();
                    } else {
                        row.basis_of_calculationg_benefits_shared = "NA";
                    }

                    if (row.sr_no !== "NA" && row.intellectual_property_based_on_traditional_knowledge !== "NA" && row.owned_acquired !== "NA" && row.benefit_shared !== "NA"
                        && row.basis_of_calculationg_benefits_shared !== "NA") {
                        getQ19.push(row);
                    }

                }

                var getQ20 = [];

                for (var i = 0; i < this.getView().byId("_IDGenTable7").getItems().length; i++) {
                    var row = {
                        name_of_authority: "",
                        brief_of_case: "",
                        corrective_actions_taken: ""
                    }

                    if (this.getView().byId("_IDGenTable7").getItems()[i].getCells()[0].getValue() !== "") {
                        row.name_of_authority = this.getView().byId("_IDGenTable7").getItems()[i].getCells()[0].getValue();
                    } else {
                        row.name_of_authority = "NA";
                    }

                    if (this.getView().byId("_IDGenTable7").getItems()[i].getCells()[1].getValue() !== "") {
                        row.brief_of_case = this.getView().byId("_IDGenTable7").getItems()[i].getCells()[1].getValue();
                    } else {
                        row.brief_of_case = "NA";
                    }

                    if (this.getView().byId("_IDGenTable7").getItems()[i].getCells()[2].getValue() !== "") {
                        row.corrective_actions_taken = this.getView().byId("_IDGenTable7").getItems()[i].getCells()[2].getValue();
                    } else {
                        row.corrective_actions_taken = "NA";
                    }

                    if (row.name_of_authority !== "NA" && row.brief_of_case !== "NA" && row.corrective_actions_taken !== "NA") {
                        getQ20.push(row);
                    }

                }

                var getQ21 = [];

                for (var i = 0; i < this.getView().byId("_IDGenTable8").getItems().length; i++) {
                    var row = {
                        sr_no: "",
                        csr_project: "",
                        no_of_persons_benefitted: "",
                        percentage_of_beneficiaries: ""
                    }

                    if (this.getView().byId("_IDGenTable8").getItems()[i].getCells()[0].getValue() !== "") {
                        row.sr_no = this.getView().byId("_IDGenTable8").getItems()[i].getCells()[0].getValue();
                    } else {
                        row.sr_no = "NA";
                    }

                    if (this.getView().byId("_IDGenTable8").getItems()[i].getCells()[1].getValue() !== "") {
                        row.csr_project = this.getView().byId("_IDGenTable8").getItems()[i].getCells()[1].getValue();
                    } else {
                        row.csr_project = "NA";
                    }

                    if (this.getView().byId("_IDGenTable8").getItems()[i].getCells()[2].getValue() !== "") {
                        row.no_of_persons_benefitted = this.getView().byId("_IDGenTable8").getItems()[i].getCells()[2].getValue();
                    } else {
                        row.no_of_persons_benefitted = "NA";
                    }

                    if (this.getView().byId("_IDGenTable8").getItems()[i].getCells()[3].getValue() !== "") {
                        row.percentage_of_beneficiaries = this.getView().byId("_IDGenTable8").getItems()[i].getCells()[3].getValue();
                    } else {
                        row.percentage_of_beneficiaries = "NA";
                    }

                    if (row.sr_no !== "NA" && row.csr_project !== "NA" && row.no_of_persons_benefitted !== "NA" && row.percentage_of_beneficiaries !== "NA") {
                        getQ21.push(row);
                    }

                }



                var HR_Arr = [];
                if (getQ1 == "") {
                    getQ1 = "NA";
                }
                var q1 = {
                    "principle": "3",
                    "indicator": "Essential",
                    "questionID": "3E",
                    "answer": getQ1
                };
                HR_Arr.push(q1);

                if (getQ2 == "") {
                    getQ2 = "NA";
                }
                var q2 = {
                    "principle": "3",
                    "indicator": "Essential",
                    "questionID": "4E",
                    "answer": getQ2
                };
                HR_Arr.push(q2);


                if (getQ3 == "") {
                    getQ3 = "NA";

                }
                var q3 = {
                    "principle": "3",
                    "indicator": "Essential",
                    "questionID": "6E",
                    "principle3_essential_6": getQ3
                };
                HR_Arr.push(q3);

                if (getQ4 == "") {
                    getQ4 = "NA";
                }
                var q4 = {
                    "principle": "3",
                    "indicator": "Leadership",
                    "questionID": "1L",
                    "answer": getQ4
                };
                HR_Arr.push(q4);

                if (getQ5 == "") {
                    getQ5 = "NA";
                }
                var q5 = {
                    "principle": "3",
                    "indicator": "Leadership",
                    "questionID": "4L",
                    "answer": getQ5
                };
                HR_Arr.push(q5);

                if (getQ6 == "") {
                    getQ6 = "NA";
                }
                var q6 = {
                    "principle": "5",
                    "indicator": "Essential",
                    "questionID": "4E",
                    "answer": getQ6
                };
                HR_Arr.push(q6);

                if (getQ7 == "") {
                    getQ7 = "NA";
                }
                var q7 = {
                    "principle": "5",
                    "indicator": "Essential",
                    "questionID": "5E",
                    "answer": getQ7
                };
                HR_Arr.push(q7);

                if (getQ8 == "") {
                    getQ8 = "NA";
                }
                var q8 = {
                    "principle": "5",
                    "indicator": "Essential",
                    "questionID": "7E",
                    "answer": getQ8
                };
                HR_Arr.push(q8);

                if (getQ9 == "") {
                    getQ9 = "NA";
                }
                var q9 = {
                    "principle": "5",
                    "indicator": "Essential",
                    "questionID": "8E",
                    "answer": getQ9
                };
                HR_Arr.push(q9);

                if (getQ10 == "") {
                    getQ10 = "NA";
                }
                var q10 = {
                    "principle": "5",
                    "indicator": "Essential",
                    "questionID": "10E",
                    "answer": getQ10
                }
                HR_Arr.push(q10);

                if (getQ11 == "") {
                    getQ11 = "NA";
                }
                var q11 = {
                    "principle": "5",
                    "indicator": "Leadership",
                    "questionID": "1L",
                    "answer": getQ11
                }
                HR_Arr.push(q11);

                if (getQ12 == "") {
                    getQ12 = "NA";
                }
                var q12 = {
                    "principle": "5",
                    "indicator": "Leadership",
                    "questionID": "2L",
                    "answer": getQ12
                }
                HR_Arr.push(q12);

                if (getQ13 == "") {
                    getQ13 = "NA";
                }
                var q13 = {
                    "principle": "5",
                    "indicator": "Leadership",
                    "questionID": "3L",
                    "answer": getQ13
                }
                HR_Arr.push(q13);

                if (getQ14 == "") {
                    getQ14 = "NA";
                }
                var q14 = {
                    "principle": "8",
                    "indicator": "Essential",
                    "questionID": "1E",
                    "principle8_essential_1": getQ14
                }
                HR_Arr.push(q14);

                if (getQ15 == "") {
                    getQ15 = "NA";
                }
                var q15 = {
                    "principle": "8",
                    "indicator": "Essential",
                    "questionID": "2E",
                    "principle8_essential_2": getQ15
                }
                HR_Arr.push(q15);

                if (getQ16 == "") {
                    getQ16 = "NA";
                }
                var q16 = {
                    "principle": "8",
                    "indicator": "Essential",
                    "questionID": "3E",
                    "answer": getQ16
                }
                HR_Arr.push(q16);

                if (getQ17 == "") {
                    getQ17 = "NA";
                }
                var q17 = {
                    "principle": "8",
                    "indicator": "Leadership",
                    "questionID": "1L",
                    "principle8_leadership_1": getQ17
                }
                HR_Arr.push(q17);

                if (getQ18 == "") {
                    getQ18 = "NA";
                }
                var q18 = {
                    "principle": "8",
                    "indicator": "Leadership",
                    "questionID": "2L",
                    "principle8_leadership_2": getQ18
                }
                HR_Arr.push(q18);

                if (getQ19 == "") {
                    getQ19 = "NA";
                }
                var q19 = {
                    "principle": "8",
                    "indicator": "Leadership",
                    "questionID": "4L",
                    "principle8_leadership_4": getQ19
                }
                HR_Arr.push(q19);

                if (getQ19 == "") {
                    getQ19 = "NA";
                }
                var q20 = {
                    "principle": "8",
                    "indicator": "Leadership",
                    "questionID": "5L",
                    "principle8_leadership_5": getQ20
                }
                HR_Arr.push(q20);

                var q21 = {
                    "principle": "8",
                    "indicator": "Leadership",
                    "questionID": "6L",
                    "principle8_leadership_6": getQ21
                }
                HR_Arr.push(q21);


                let obj = {
                    "fiscalYear": fiscalyear,
                    "businessFunction": "HR",
                    "creator_email": UserEmail,
                    "creator_name": Name,
                    "status": "Submitted",
                    "HR": HR_Arr

                };
                sap.m.MessageBox.confirm("Do you want to Submit", {
                    actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    emphasizedAction: sap.m.MessageBox.Action.OK,
                    onClose: function (sAction) {
                        if (sAction == "OK") {
                            var oBusy = new sap.m.BusyDialog();

                            oBusy.open();
                            var oModel = that.getOwnerComponent().getModel()
                            oModel.create("/qualitative_data", obj, {
                                success: function (odata) {
                                    oBusy.close();
                                    that.getView().byId("_IDGenObjectPageSection2").setVisible(true);
                                    that.getView().byId("_IDGenButton1").setVisible(true);
                                    that.getView().byId("_IDGenButton0").setVisible(true);
                                    that._onClear();
                                },
                                error: function (error) {
                                    oBusy.close();
                                    console.log(error);
                                }
                            });
                            var paOBJ = {

                                "definitionId": "eu10.sap-process-automation-q40kapza.zbrsrhr.zapproval_process_for_hr",

                                "context": {
                                    "zbusiness_function": "HR",
                                    "zfiscal_year": "2011",
                                    "zhr_creator_email": UserEmail,
                                    "zhr_creator_name": Name,
                                    "zhr_principle3_essential_3": getQ1,
                                    "zhr_principle3_essential_4": getQ2,
                                    "zhr_principle3_essential_6": getQ3,                                 
                                    "zhr_principle3_leadership_1": getQ4,
                                    "zhr_principle3_leadership_4": getQ5,
                                    "zhr_principle5_essential_4":  getQ6,
                                    "zhr_principle5_essential_5":  getQ7,
                                    "zhr_principle5_essential_7":  getQ8,
                                    "zhr_principle5_essential_8":  getQ9,
                                    "zhr_principle5_essential_10": getQ10,
                                    "zhr_principle5_leadership_1": getQ11,
                                    "zhr_principle5_leadership_2": getQ12,
                                    "zhr_principle5_leadership_3": getQ13,
                                    "zhr_principle8_essential_1":  getQ14,
                                    "zhr_principle8_essential_2":  getQ15,
                                    "zhr_principle8_essential_3":  getQ16,
                                    "zhr_principle8_leadership_1": getQ17,
                                    "zhr_principle8_leadership_2": getQ18,
                                    "zhr_principle8_leadership_4": getQ19,
                                    "zhr_principle8_leadership_5": getQ20,
                                    "zhr_principle8_leadership_6": getQ21
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
            FormValidate: function () {
                var that = this;
                var counter = 0;
                var validData = [];


                if (that.getView().byId("id_answ1").getValue() === "") {

                    validData.push({
                        "PRODUCTCODE": "Q1",
                        "type": "Warning",
                        "desc": "Field is Mandatory"
                    });
                    counter++;

                }

                if (that.getView().byId("id_answ2").getValue() === "") {

                    validData.push({
                        "PRODUCTCODE": "Q2",
                        "type": "Warning",
                        "desc": "Field is Mandatory"
                    });
                    counter++;

                }

                if (that.getView().byId("id_answ2").getValue() === "") {

                    validData.push({
                        "PRODUCTCODE": "Q2",
                        "type": "Warning",
                        "desc": "Field is Mandatory"
                    });
                    counter++;

                }

                if (that.getView().byId("id_answ6").getValue() === "") {

                    validData.push({
                        "PRODUCTCODE": "Q6",
                        "type": "Warning",
                        "desc": "Field is Mandatory"
                    });
                    counter++;

                }
                if (that.getView().byId("id_answ7").getValue() === "") {

                    validData.push({
                        "PRODUCTCODE": "Q7",
                        "type": "Warning",
                        "desc": "Field is Mandatory"
                    });
                    counter++;

                }
                if (that.getView().byId("id_answ8").getValue() === "") {

                    validData.push({
                        "PRODUCTCODE": "Q8",
                        "type": "Warning",
                        "desc": "Field is Mandatory"
                    });
                    counter++;

                }

                if (that.getView().byId("id_answ9").getValue() === "") {

                    validData.push({
                        "PRODUCTCODE": "Q9",
                        "type": "Warning",
                        "desc": "Field is Mandatory"
                    });
                    counter++;

                }

                if (that.getView().byId("id_answ10").getValue() === "") {

                    validData.push({
                        "PRODUCTCODE": "Q10",
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
                 if(this.getView().byId("_IDGenTable2").getItems().length === 0){

                validData.push({
                    "PRODUCTCODE": "Q14",
                    "type": "Warning",
                    "desc": "Enter atleast 1 row of Data"
                });
                counter++;

                }
                if(this.getView().byId("_IDGenTable3").getItems().length === 0){

                    validData.push({
                        "PRODUCTCODE": "Q15",
                        "type": "Warning",
                        "desc": "Enter atleast 1 row of Data"
                    });
                    counter++;
    
                    }


                if (counter !== 0) {
                    var validpayload = new JSONModel(validData);
                    that.getView().setModel(validpayload, "message");
                    var oButton = that.getView().byId("messagePopoverBtn");
                    oButton.setVisible(true);
                    setTimeout(function () {
                        that.oMP.openBy(oButton);
                    }.bind(that), 100);
                    that.createMessagePopover();

                }
                else {
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
