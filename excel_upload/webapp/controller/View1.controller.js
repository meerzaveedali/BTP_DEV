sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/export/Spreadsheet",
    "sap/ui/export/library",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,Spreadsheet,MessageBox) {
        "use strict";
        var that
        return Controller.extend("excelupload.controller.View1", {
        onInit: function () {
            that = this;
            var oData = {
                "ProductCollection": [
                    {
                        "ProductId1": "EHS",
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
            // this.onRefreshTable();

            // set explored app's demo model on this sample
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "model1");
            
            that.oDataModel = this.getOwnerComponent().getModel("model1");
            // that._getUserId();
        },
        // onRefreshTable : function(){
        //     that = this
        // //     var oTable = this.getView().byId("_IDGenTable1");
        // //     oTable.bindItems({
        // //         path: "/", 
        // //         template: new sap.m.ColumnListItem({
                    
        // //                 cells: [new sap.m.TextArea({ maxLength: 1500 , wrapping: "Hard", value:"{/quantitative_data}"})]
        // //         })
        // // });

        //     var oModel = this.getOwnerComponent().getModel();
        //     var oBusy = new sap.m.BusyDialog();
        //     oBusy.open();
        //     oModel.read("/quantitative_data",{
        //         success:  function(data){ 
        //             var oJson = new sap.ui.model.json.JSONModel({'items':data.results});
        //             that.getView().setModel(oJson,"tabModel")
        //             that.getView().byId("_IDGenTable1").invalidate();
        //             // oTable.rerender();;
        //             oBusy.close();
        //         },
        //         error : function(error){
        //             console.log(error)
        //         }
        //     })

        // },
        onChangeFile : function(oEvent){
            // debugger;
            this._import(oEvent.getParameter("files") && oEvent.getParameter("files")[0]);
        },
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
        createColumnConfig: function() {
            return [
                {
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
                    label: 'ID Waste Type',
                    property: 'id_waste_type',
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
                }
                ];
        },
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
