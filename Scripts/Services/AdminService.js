app.service('AdminService', ['$http', '$sessionStorage', 'config',
function ($http, $sessionStorage, config, $scope, $rootScope, $location, $timeout, $route) {

    //----------------------------------------------------Service For To Get Side_Menu
    this.GetDynamicMenu = function () {
        
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "get",
            url: config.apiUrl + "api/MasterDataAndUnits/GetDynamicMenu",
            headers: authHeaders,
        });
        return request;
    }
    //---------------------------------------------------Service For Get Masters_data_Table_Grid
    this.Masters_data_Table_Grid = function (ParentId, searchtext) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "ParentId": ParentId,
            "searchtext": searchtext,
        }
        var Masters_data_Grid = $http({
            method: "GET",
            url: config.apiUrl + "api/MasterDataAndUnits/GetMasterDataList?ParentId=" + ParentId + "&searchtext=" + searchtext,
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return Masters_data_Grid;
    }
    //------------------------------------------------ Service for Save_Data_Into_Table
    this.Insert_Non_Json_Data = function (myJson, tablename, id) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var Masters_Data = $http({
            method: 'post',
            url: config.apiUrl + "api/MasterDataAndUnits/Insert_Non_Json_Data",
            headers: authHeaders,
            data: {
                "ID": id,
                "TableName": tablename,
                "JsonData": myJson
            }
        });
        return Masters_Data;
    }

    //Service For GET Product Details,
    this.Save_Update_Categories = function (ID, Name, Description, ParentID, Status, Priority, AliasNames) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "Category_Id": ID,
            "Category_Name": Name,
            "Category_Description": Description,
            "Category_Parent_Id": ParentID,
            "Category_Status": Status,
            "Category_Priority": Priority,
            "Category_AliasNames": AliasNames,
        }
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/Category/Add_Edit_Category",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }

    //Service For GET Product Details,
    this.SaveRecordsToTable = function (ID, Name, Description, Status, Createdby, Updatedby, ParentID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "ID": ID,
            "Name": Name,
            "Description": Description,
            "Status": Status,
            "Createdby": Createdby,
            "Updatedby": Updatedby,
            "ParentID": ParentID,
        }
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/MasterDataAndUnits/Add_Edit_Masters_Data",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }

    // -------------------------------------------------Service for Change_Status
    this.Change_Status = function (myJson, tablename, id) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/MasterDataAndUnits/UpdateRecordsToTable",
            headers: authHeaders,
            data: {
                "ID": id,
                "TableName": tablename,
                "JsonData": myJson
            }
        });
        return dtls;
    }


    // Service for Update Table Record which donot have  jsonData column
    this.UpdateMastersData = function (myJson, tablename, id) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/MasterDataAndUnits/UpdateRecordsToMastersTable",
            headers: authHeaders,
            data: {
                "ID": id,
                "TableName": tablename,
                "JsonData": myJson
            }
        });
        return dtls;
    }

    // -------------------------------------------------Service for Change_Status
    this.Change_Masters_Status = function (myJson, tablename, id) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/MasterDataAndUnits/UpdateRecordsToMastersTable",
            headers: authHeaders,
            data: {
                "ID": id,
                "TableName": tablename,
                "JsonData": myJson
            }
        });
        return dtls;
    }
    // -------------------------------------------------Service for Get_All_Categories_For_Tree_View
    this.Get_All_Categories = function (tablename, id, itemsPerPage) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "TableName": tablename,
            "PageIndex": id,
            "PageSize": itemsPerPage,
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/Category/GetAllCategories",
            data: JSON.stringify(model),
            headers: authHeaders
        })
        return request;
    }

    // ----------------------------------------------------Service for Get Category Path
    this.Get_Category_Path = function (id) {
        var authHeaders = {};
        var dtls = $http({
            method: 'get',
            url: config.apiUrl + "api/Category/GetCategoryPath?ID=" + id,
            headers: authHeaders,
        });
        return dtls;
    }

    //-------------------------------------------------------Service For GET Products,
    this.Get_Products_With_Paging = function (FilterJson, id, pageSize, pageIndex, pname) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var products = {
            "FilterJson": FilterJson,
            "CategoryID": id,
            "ProductName": pname,
            "PageSize": parseInt(pageSize),
            "PageIndex": parseInt(pageIndex),
        }
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/ProductAndPrice/GetProductList",
            headers: authHeaders,
            data: JSON.stringify(products),
        })
        return request;
    }
    this.Get_Pricing_Products_With_Paging = function (FilterJson, id, pageSize, pageIndex, pname) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var products = {
            "FilterJson": FilterJson,
            "CategoryID": id,
            "ProductName": pname,
            "PageSize": parseInt(pageSize),
            "PageIndex": parseInt(pageIndex),
        }
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/ProductAndPrice/GetPricingProductList",
            headers: authHeaders,
            data: JSON.stringify(products),
        })
        return request;
    }
    //-------------------------------------------------------Service For GET Products,
    this.Get_Products_With_Paging_And_Excel = function (FilterJson, id, pageSize, pageIndex, pname, SKU) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var products = {
            "FilterJson": FilterJson,
            "CategoryID": id,
            "ProductName": pname,
            "SKU": SKU,
            "PageSize": parseInt(pageSize),
            "PageIndex": parseInt(pageIndex),
        }
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/ProductAndPrice/GetProductListWithExcel",
            headers: authHeaders,
            data: JSON.stringify(products),
        })
        return request;
    }


    //-------------------------------------------------------Service For View_Products_Details,
    this.View_Products_Details = function (id) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/ProductAndPrice/GetProductDetailsByID?ProductID=" + id,
            headers: authHeaders,
        })
        return request;
    }

    //-------------------------------------------------------Service For Upload_Products_By_Excel,
    this.Upload_Products_By_Excel = function (CategoryID, ifiles) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        dat = {
            ID: CategoryID,
            TableName: "",
            JsonData: ""
        };
        var sav = $http({
            method: 'POST',
            url: config.apiUrl + "api/ProductAndPrice/UploadNewProducts",
            headers: {
                'Content-Type': undefined
            },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("model", angular.toJson(data.model));
                for (var i = 0; i < fileInput.files.length; i++) {
                    formData.append("file" + i, fileInput.files[i]);
                }
                return formData;
            },
            data: { model: dat, files: ifiles },

        });
        return sav
    }


    //------------------------------------------------Service For Get_Category_Details
    this.Get_Category_Details = function (id) {
        var dtls = $http({
            method: 'get',
            url: config.apiUrl + "api/Category/GetCategoryList?ParentID=" + id,
        });
        return dtls;
    }

    //---------------------------------------------------Service for Update_Table_Record 
    this.Update_Non_Json_Table = function (myJson, tablename, id) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/MasterDataAndUnits/UpdateRecordsToTable",
            headers: authHeaders,
            data: {
                "ID": id,
                "TableName": tablename,
                "JsonData": myJson
            }
        });
        return dtls;
    }

    //---------------------------------------------------Service For Get_Category_Attributes 
    this.Get_Category_Attributes = function (id) {
        var dtls = $http({
            method: 'get',
            url: config.apiUrl + "api/Category/Get_Category_Attributes?CategoryID=" + id,
        });
        return dtls;
    }

    //---------------------------------------------------Service For SaveCategoryAttributes
    this.SaveCategoryAttributes = function (myJson, tablename, id) {
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/Category/AddCategoryAttribute",
            headers: {
                'Content-Type': 'application/Json',
            },
            data: {
                "ID": id,
                "TableName": tablename,
                "JsonData": myJson
            }
        });
        return dtls;
    }


    //Service For Get Results with paging
    this.getResults = function (tablename, id, itemsPerPage) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "TableName": tablename,
            "PageIndex": id,
            "PageSize": itemsPerPage,
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/MasterDataAndUnits/GetResultswithPaging",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }



    //Service For Get Master Locations
    this.Get_Master_Locations = function (tablename, id, itemsPerPage) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "TableName": tablename,
            "PageIndex": id,
            "PageSize": itemsPerPage,
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/MasterDataAndUnits/Get_Master_Locations",
            data: JSON.stringify(model),
            headers: authHeaders
        })
        return request;
    }
    // service for Get category Path
    this.getLocationPath = function (id) {
        var authHeaders = {};
        var dtls = $http({
            method: 'get',
            url: config.apiUrl + "api/MasterDataAndUnits/GetLocationPath?ID=" + id,
            headers: authHeaders,

        });
        return dtls;
    }
    
    //Service For Save Location Details
    this.saveLocationDetails = function (LocationID, LocationParentID, LocationName, HierarchyLevel, PinCode) {
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/MasterDataAndUnits/AddLocationDetails",
            headers: {
                'Content-Type': 'application/Json',
            },
            data: {
                "ID": LocationID,
                "StoreID": LocationParentID,
                "Name": LocationName,
                "PageIndex": HierarchyLevel,
                "Message": PinCode
            }
        });
        return dtls;
    }
    //Service For Update Location Details
    this.updateLocationDetails = function (LocationID, LocationParentID, LocationName, HierarchyLevel, PinCode) {
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/MasterDataAndUnits/UpdateLocationDetails",
            headers: {
                'Content-Type': 'application/Json',
            },
            data: {
                "ID": LocationID,
                "StoreID": LocationParentID,
                "Name": LocationName,
                "PageIndex": HierarchyLevel,
                "Message": PinCode
            }
        });
        return dtls;
    }


    //Service For Manual Product Adding
    this.AddMultipleProducts = function (products, HtmlContent) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/ProductAndPrice/AddMultipleProducts",
            headers: authHeaders,
            data: {
                "JsonData": products,
                "ProductName": HtmlContent
            }
        });
        return request;
    }

    //------------------------------------------------Update Individual Product Data
    this.UpdateProducts = function (productid, products, HtmlContent) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/ProductAndPrice/UpdateProductsByManual",
            headers: authHeaders,
            data: {
                "ID": productid,
                "JsonData": products,
                "ProductName":HtmlContent
            }
        });
        return request;
    }


    this.Save_Default_Messages = function (Namess, Messages) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/MasterDataAndUnits/Save_Default_Messages",
            headers: authHeaders,
            data: {
                "Name": Namess,
                "Message": Messages
            }
        });
        return dtls;
    }

    this.updatedefaultMessage = function (ids, Messages) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/MasterDataAndUnits/updatedefaultMessage",
            headers: authHeaders,
            data: {
                "ID": ids,
                "Message": Messages
            }
        });
        return dtls;
    }


    this.ChangeRepurchasableStatus = function (ID, Repurchasable) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/ChangeRepurchasableStatus?ID=" + ID + "&Repurchasable=" + Repurchasable,
            headers: authHeaders,
        })
        return request;
    }
    this.AllowSalesInDirectService = function (ID, Status) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/ProductAndPrice/AllowSalesInDirect?ID=" + ID + "&DirectStatus=" + Status,
            headers: authHeaders,
        })
        return request;
    }
    //----------------------------------------------Service For Get Results with paging in HSN_Code
    this.GetTableRecords_HSN_Code = function (tablename, name) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/MasterDataAndUnits/GetTableRecords_HSN_Code?tablename=" + tablename + "&searchtext=" + name,
            headers: authHeaders,
        })
        return request;
    }
    this.GetTableRecords = function (tablename) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/MasterDataAndUnits/GetTableRecords?tablename=" + tablename,
            headers: authHeaders,
        })
        return request;
    }
    //----------------------------------------------Service For ADD_HSN_Code
    this.Add_Hsn_Code = function (HSNCODE, Gstpercentage) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/ProductAndPrice/Add_HSNCode?HSN_Code_Id=" + HSNCODE + "&Gst_Percentage=" + Gstpercentage,
            headers: authHeaders,
        })
        return request;
    }

    //Service For Save Pincode Details
    this.SavePincodeDetails = function (masterpincodeid, locationname, masterpincode) {
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/MasterDataAndUnits/AddMasterPincodesDetails",
            headers: {
                'Content-Type': 'application/Json',
            },
            data: {
                "masterpincodeid": masterpincodeid,
                "masterpincode": masterpincode,
                "locationname": locationname,

            }
        });
        return dtls;
    }
    //Service For Update Pincode Details
    this.UpdatePincodeDetails = function (Pincodes_ID, Location_Name, Master_Pincode) {
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/MasterDataAndUnits/UpdateMasterPincodesDetails",
            headers: {
                'Content-Type': 'application/Json',
            },
            data: {
                "masterpincodeid": Pincodes_ID,
                "masterpincode": Master_Pincode,
                "locationname": Location_Name,

            }
        });
        return dtls;
    }

    //Service For Get Master Pincodes
    this.getmasterpincodes = function (PKID, AreaName, PageSize, PageIndex,Searchtext, PincodesData) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "PKID": PKID,
            "AreaName": AreaName,
            "PageSize": PageSize,
            "PageIndex": PageIndex,
            "Searchtext": Searchtext,
            "PincodesData": PincodesData,

        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/MasterDataAndUnits/GetMasterPincodes",
            data: JSON.stringify(model),
            headers: authHeaders
        })
        return request;
    }

    this.ProductStatusChange = function (ID, Status) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/ProductStatusChange?ID=" + ID + "&Status=" + Status,
            headers: authHeaders,
        })
        return request;
    }
 //----------------------------------------------Service For Saveproduct HSNCODE bulk

    this.Update_Product_HSN_Code_InBulk = function (productids, HSNCODE) {

        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/ProductAndPrice/Update_HSN_Codes_InBulk",
            headers: authHeaders,
            data: {
                "productids": productids,
                "HSN_Code":HSNCODE,
                "TableName": "iHub_Products",
            }
        });
        return dtls;
    }

    this.ChangeProductsBulkStatusService = function (ids, status, type) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/ProductAndPrice/ChangebBulkStatusService",
            headers: authHeaders,

            data: {
                "Status": status,
                "JsonData": ids,
                "Status2": type
            }
        });
        return dtls;
    }

    this.GetProdutsByIDs = function (productids) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/ProductAndPrice/Get_Produts_By_IDs?ProductID=" + productids,
            headers: authHeaders,
        })
        return request;
    }

    this.AssignAccessoriesToProducts = function (productids, accessoryids) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/Assign_Accessories_Products?ProductID=" + productids + "&AccessoriesID=" + accessoryids,
            headers: authHeaders,

        })
        return request;
    }

    this.Removeaccessories = function (Productid, aid) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/ProductAndPrice/Remove_Accessories",
            headers: authHeaders,
            data: {
                "Productid": Productid,
                "aid": aid
            }
        })
        return request;


    }
 //----------------------------------------------Service For DC List
    this.Get_DC_List_Service = function () {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/InventoryAndStock/GetDCList",
            headers: authHeaders,
        })
        return request;
    }

    //----------------------------------------------Service For Ware House List By DC ID
    this.Get_WH_List_By_DCID_Service = function (DistributionID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/InventoryAndStock/GetWHListByDCID?DistributionID=" + DistributionID,
            headers: authHeaders,
        })
        return request;
    }

    //----------------------------------------------Service For Assigned Stock Store/WareHouse List
    this.Get_Unit_List_With_Stock_Service = function (SrcUnitID, DestUnitID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/InventoryAndStock/GetAssignedStockUnitsList?Src_UnitID=" + SrcUnitID + "&Dest_UnitID=" + DestUnitID,
            headers: authHeaders,
        })
        return request;
    }

    //----------------------------------------------Service For Assigned Stock Products List
    this.GetAssignedProductsListService = function (UnitID, DC_UnitID, Sku) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/InventoryAndStock/GetAssignedProductsList?UnitID=" + UnitID + "&DC_UnitID=" + DC_UnitID + "&Sku=" + Sku,
            headers: authHeaders,
        })
        return request;
    }

    //Service For Save Location Pincode Details
    this.saveLocationPincodeDetails = function (Pincode, LocationIDs) {
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/MasterDataAndUnits/AddLocationPincodesDetails",
            headers: {
                'Content-Type': 'application/Json',
            },
            data: {
                "Pincode": Pincode,
                "LocationIDs": LocationIDs,


            }
        });
        return dtls;
    }
    
    
    //service for Update menu
    this.updatemenu = function (list) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: 'POST',
            url: config.apiUrl + "api/MasterDataAndUnits/updatemenu",
            data: JSON.stringify(list),
            headers: authHeaders,
        });
        return request;
    }
    //----------------------------------------------Service To Get Repurchasable Products by Category ID
    this.Get_Products_BySKU = function (FilterJson, unitID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var products = {
            "FilterJson": FilterJson,
            "Unit_ID": unitID
        }
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/InventoryAndStock/Get_Products_BySKU",
            headers: authHeaders,
            data: JSON.stringify(products),
        })
        return request;
    }

    //----------------------------------------------Service To Get Units data by Heirarchy
    this.Get_Units = function (unittype, parentid) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var products = {
            "Unit_Type": unittype,
            "ParentID": parentid,
        }
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/InventoryAndStock/Get_Units_Data_ByHierarchy",
            headers: authHeaders,
            data: JSON.stringify(products),
        })
        return request;
    }

    //----------------------------------------------Service To Assisgn Inbound Stock
    this.Assign_Stock = function (json, unitid) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var products = {
            Unit_ID: unitid,
            FilterJson: json
        }
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/InventoryAndStock/Assign_Inbound_Stock",
            headers: authHeaders,
            data: JSON.stringify(products),
        })
        return request;
    }

    //----------------------------------------------Service To InBound Products by Reference No.
    this.Get_Inbound_Products = function (referenceNum, unitId) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/InventoryAndStock/Get_Inbound_Products_ByRefNo?referenceNo=" + referenceNum + "&unitID=" + unitId,
            headers: authHeaders,
        })
        return request;
    }

    //----------------------------------------------Service For Add & Update Consignments
    this.AddUpdateConsignmentsService = function (ID, Con_Products, DC_UnitID, Dest_UnitID, NumOfBoxes) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            Consignment_ID: ID,
            Consignment_products: Con_Products,
            Source_UnitID: DC_UnitID,
            Dest_UnitID: Dest_UnitID,
            NoOfBoxes: NumOfBoxes
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/InventoryAndStock/Add_Update_Consignments",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }

    //----------------------------------------------Service For Get Consignments List
    this.Get_Consignments_ListService = function (Name, Date, Source, Status, Destination, sourceUnitid, destunitid) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;

        var model = {
            Cons_Name: Name,
            Cons_Status: Status,
            Source: Source,
            Destination: Destination,
            CreateDate: Date,
            Source_UnitID: sourceUnitid,
            Dest_UnitID: destunitid,
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/InventoryAndStock/Get_Consignments_List",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }
    //----------------------------------------------Service For View Products With in Consignments
    this.ViewProductsInConsignmentService = function (Con_ID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/InventoryAndStock/ViewProductsInConsignment?ConsignmentID=" + Con_ID,
            headers: authHeaders,
        })
        return request;
    }

    //-------------------------------------------------------Service For Upload_Products_By_Excel,
    this.Upload_EditDetails_Products_By_Excel = function (CategoryID, ifiles) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        dat = {
            ID: CategoryID,
            TableName: "",
            JsonData: ""
        };
        var sav = $http({
            method: 'POST',
            url: config.apiUrl + "api/ProductAndPrice/UploadNewProductsForEditDetails",
            headers: {
                'Content-Type': undefined
            },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("model", angular.toJson(data.model));
                for (var i = 0; i < fileInput.files.length; i++) {
                    formData.append("file" + i, fileInput.files[i]);
                }
                return formData;
            },
            data: { model: dat, files: ifiles },

        });
        return sav
    }

    //----------------------------------------------Service To Change Consignment Status
    this.ChangeConsignmentStatusService = function (Con_ID,Status) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/InventoryAndStock/ChangeConsignmentStatus?ConsignmentID=" + Con_ID + "&Status=" + Status,
            headers: authHeaders,
        })
        return request;
    }

    //----------------------------------------------Service To Change Consignment Bulk Status Update
    this.ChangeBulkStatusService = function (Con_IDs, Status) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/InventoryAndStock/ChangeBulkConsignmentStatus?ConsignmentIDs=" + Con_IDs + "&Status=" + Status,
            headers: authHeaders,
        })
        return request;
    }

    //----------------------------------------------Service For Stores List By Ware House ID
    this.Get_Store_List_By_WHID_Service = function (WhID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/InventoryAndStock/GetStoresListByWHID?WareHouseID=" + WhID,
            headers: authHeaders,
        })
        return request;
    }
    this.getallbrands = function () {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/ProductAndPrice/Get_Brands_List",
            headers: authHeaders,
            // data: JSON.stringify(obj),
        })
        return request;
    }
    this.getallbrandsincategory = function (Brandname) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/ProductAndPrice/Get_Catgory_Brands_List?Brandname=" + Brandname,
            headers: authHeaders,
            // data: JSON.stringify(obj),
        })
        return request;
    }
    this.getallbrandsinsubcategory = function (Brandname, Categoryid) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/ProductAndPrice/Get_Sub_Catgory_Brands_List?Brandname=" + Brandname + "&Catid=" + Categoryid,
            headers: authHeaders,
            // data: JSON.stringify(obj),
        })
        return request;
    }
    this.Get_Sub_category_Products_list = function (Brandname, Catid, Page_Index, Page_Size) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/ProductAndPrice/Get_Sub_Catgory_Products_List?Brandname=" + Brandname + "&Catid=" + Catid + "&Page_Index=" + Page_Index + "&Page_Size=" + Page_Size,
            headers: authHeaders,
            // data: JSON.stringify(obj),
        })
        return request;
    }

    this.Save_Products_Percentage = function (productids, CategoryID, BrandName, PercentageType, Pecentage) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "productids": productids,
            "CategoryID": CategoryID,
            "BrandName": BrandName,
            "PercentageType": PercentageType,
            "Pecentage": Pecentage,
        }
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/ProductAndPrice/Update_Products_Percentage",
            data: JSON.stringify(model),
            headers: authHeaders,
            // data: JSON.stringify(obj),
        })
        return request;
    }
    //------------------------
    this.Create_New_Unit = function (Sub_Unit_ID,  Unit_Name, EmailID, Phone_Number,
                                       ContactName, AddressLine_One, AddressLine_Two, VillageLocation_ID
                                , Suggested_UserName, Unit_Additional_Data, Password, WareHouseCumStore) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;

        var newunit = {
            "Sub_Unit_ID": Sub_Unit_ID,
           
            "Unit_Name": Unit_Name,
            "Email": EmailID,
            "Phone_Number": Phone_Number,
            "ContactName": ContactName,
            "AddressLine_One": AddressLine_One,
            "AddressLine_Two": AddressLine_Two,
            "VillageLocation_ID": VillageLocation_ID,
            "Suggested_UserName": Suggested_UserName,
            "Unit_Additional_Data": JSON.stringify(Unit_Additional_Data),
            "Password": Password,
            "isWHcumStore": WareHouseCumStore
        }
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/MasterDataAndUnits/AddNewUnit",
            headers: authHeaders,
            data: JSON.stringify(newunit),
        })
        return request;
    }

    //Service For Get Results with paging
    this.Get_Units_Details = function (iHubUnitID, Unit_Hierarchy_Level_ID, Order_By, Page_Index, Page_Size) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "iHubUnitID": iHubUnitID,
            "Unit_Hierarchy_Level_ID": Unit_Hierarchy_Level_ID,
            "Order_By": Order_By,
            "Page_Index": Page_Index,
            "Page_Size": Page_Size
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/MasterDataAndUnits/Get_Units_Details",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }

    //------------------------------------ Service To get suggestion for Pincodes
    this.Get_Pincodes_List = function (search_pincode) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var user = $http({
            method: "GET",
            url: config.apiUrl + "api/MasterDataAndUnits/Search_Suggestion_Pincodes?search_Value=" + search_pincode,
            headers: 'application/json',
        })
        return user;
    }



    //------------------------------------ Service To get Get_Villages
    this.Get_Villages = function (pincodeID) {
        var user = $http({
            method: "GET",
            url: config.apiUrl + "api/MasterDataAndUnits/Get_Locations_ByPincode?pincodeID=" + pincodeID,
            headers: 'application/json',
        })
        return user;
    }

  //------------------------------------ Service To get Get_Villages
    this.Get_Villages_Based_Pincode = function (pincodeID) {
        var user = $http({
            method: "GET",
            url: config.apiUrl + "api/MasterDataAndUnits/Get_Locations_Based_On_Pincode?pincode=" + pincodeID,
            headers: 'application/json',
        })
        return user;
    }
  
    //------------------------------------ Get Areas
    this.Get_Areas = function (villageID) {

        var user = $http({
            method: "GET",
            url: config.apiUrl + "api/MasterDataAndUnits/Get_Locations_ByVillageID?VillageID=" + parseInt(villageID),
            headers: 'application/json',
        })
        return user;
    }


    //----------------------------------------------Service For Stock Assigned Stores List By WH ID
    this.GetStockAssignedStoresListByWHIDService = function (WHID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/InventoryAndStock/GetAssignedStockWHToStore?WHID=" + WHID,
            headers: authHeaders,
        })
        return request;
    }

    //----------------------------------------------Service For Stock Assigned Stores List By WH ID
    this.Get_Stock_Assigned_Store_List_Service = function (WHID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/InventoryAndStock/GetAssignedStockStoresUnits?WareHouseID=" + WHID,
            headers: authHeaders,
        })
        return request;
    }

    //----------------------------------------------Service For Stock Assigned Stores List By WH ID With Store Filter
    this.GetAssignedStockToStoreService = function (WHID, StoreID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/InventoryAndStock/GetAssignedStockToStore?WHID=" + WHID + "&StoreID=" + StoreID,
            headers: authHeaders,
        })
        return request;
    }

    //----------------------------------------------Service For Assigned Stock Products List
    this.GetAssignedProductsToStoreService = function (ST_UnitID, WH_ID, Sku) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/InventoryAndStock/GetAssignedProductsToStore?ST_UnitID=" + ST_UnitID + "&WH_ID=" + WH_ID + "&Sku=" + Sku,
            headers: authHeaders,
        })
        return request;
    }

    //----------------------------------------------Service For DC List BY Warehouse ID
    this.GetDCListByWHIDService = function (LevelID, WHID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/InventoryAndStock/GetSourcceListByWHID?LevelID=" + LevelID + "&WH_ID=" + WHID,
            headers: authHeaders,
        })
        return request;
    }

    this.GetAllCategories_GetOnlyUnprice = function () {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/ProductAndPrice/GetOnlyUnPriceCategoriesListOnly",
            headers: authHeaders,
        })
        return request;
    }


    //Service For GET Products_Only_pricing,
    this.GetFilterProductsWithPageingAndOnlyPricingProducts = function (FilterJson, id, pageSize, pageIndex, pname) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;

        var products = {
            "FilterJson": FilterJson,
            "CategoryID": id,
            "ProductName": pname,
            "PageSize": parseInt(pageSize),
            "PageIndex": parseInt(pageIndex),

        }
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/ProductAndPrice/GetProductListOnlyPricing",
            headers: authHeaders,
            data: JSON.stringify(products),
        })
        return request;
    }

    //Bulk Price Updating with Buyer Percentage
    this.SaveBulkProductPrice = function (productids) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/ProductAndPrice/UpdateProductPricebulk",
            headers: authHeaders,
            data: {
                "productids": productids,
            }
        });
        return dtls;
    }


    //----------------------------------------------Service To Get Product Stock
    this.Get_Products_Stock = function (heirarchyID, unitid) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/InventoryAndStock/Get_Stock_By_UnitID?heirarchyID=" + heirarchyID + '&unitID=' + unitid,
            headers: authHeaders,
        })
        return request;
    }


    //----------------------------------------------Service To Get Product Stock by Unitid & Category ID
    this.Get_Products_Stock_ByCategory = function (unitID, catrgoryID, pagesize, pageindex, productname, sku) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var products = {
            Unit_ID: unitID,
            CategoryID: catrgoryID,
            Pagesize: pagesize,
            PageIndex: pageindex,
            SKU: sku,
            ProductName: productname
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/InventoryAndStock/Get_Products_Stock_By_UnitID",
            data: JSON.stringify(products),
            headers: authHeaders,
        })
        return request;
    }

    //----------------------------------------------Service To Get Product Stock by Unitid & Category ID
    this.Get_Available_Products_Stock = function (unitID, catrgoryID, pagesize, pageindex, productname, sku, brandname) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var products = {
            Unit_ID: unitID,
            CategoryID: catrgoryID,
            Pagesize: pagesize,
            PageIndex: pageindex,
            ProductName: productname,
            SKU: sku,
            BrandName: brandname
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/InventoryAndStock/Get_Available_Products_By_UnitID",
            data: JSON.stringify(products),
            headers: authHeaders,
        })
        return request;
    }
    //----------------------------------------------Service To Get Product Stock by Unitid & Category ID
    this.Get_Offers_Products_Stock = function (unitID, catrgoryID, pagesize, pageindex, productname, sku, brandname) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var products = {
            Unit_ID: unitID,
            CategoryID: catrgoryID,
            Pagesize: pagesize,
            PageIndex: pageindex,
            ProductName: productname,
            SKU: sku,
            BrandName: brandname
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/InventoryAndStock/Get_Offers_Products_By_UnitID",
            data: JSON.stringify(products),
            headers: authHeaders,
        })
        return request;
    }
    //----------------------------------------------Service To Get Product Stock by Unitid & Category ID
    this.Assign_Stock_ToUnit = function (productdetails, dcID, unitID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var products = {
            FilterJson: productdetails,
            Dc_Unit_ID: dcID,
            Unit_ID: unitID
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/InventoryAndStock/Assign_Stock_ToUnit",
            data: JSON.stringify(products),
            headers: authHeaders,
        })
        return request;
    }
    //----------------------------------------------Service To Get Category Attributes
    this.getCategoryAttributes = function (id) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: 'get',
            url: config.apiUrl + "api/InventoryAndStock/GetCategoryAttributes?CategoryID=" + id,
            headers: authHeaders,
        });
        return request;
    }

    //---------------------------------------------------Service For Get Price Request Data
    this.Get_Price_Requests = function (CustomerName, MobileNumber, Status, CategoryName, SKUCode, StoreName, RequestsFrom, RequestsTo, PageIndex, PageSize) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "Name": CustomerName,
            "MobileNumber": MobileNumber,
            "Status": Status,
            "CategoryName": CategoryName,
            "ProductID": SKUCode,
            "StoreName": StoreName,
            "orderdatefrom": RequestsFrom,
            "orderdateto": RequestsTo,
            "Pagesize": PageSize,
            "PageIndex": PageIndex
        }
        var Get_Price_Grid = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/Get_Buyer_Price_Requests",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return Get_Price_Grid;
    }
    //==========================service for Change Customer Status Price Request
    this.Change_Request_Status = function (ID, Status, MobileNumber, Productname) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "MobileNumber": MobileNumber,
            "CustomerID": ID,
            "Status": Status,
            "ProductName":Productname

        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/Change_Customer_Request_Status",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }
    // service for Get Price Request Categories
    this.Get_All_Categories_For_Price_Request = function () {
        var dtls = $http({
            method: 'get',
            url: config.apiUrl + "api/ProductAndPrice/Get_All_Price_Request_Categories",
        });
        return dtls;

    }



    // service for Get Location Pincode Details
    this.getLocationPincodeDetails = function (ParentID, PageIndex, PageSize, VillagesList) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "ParentID": ParentID,
            "PageIndex": PageIndex,
            "PageSize": PageSize,
            "VillagesList": VillagesList,

        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/MasterDataAndUnits/getLocationPincodeDetails",
            data: JSON.stringify(model),
            headers: authHeaders
        })
        return request;
    }


 
    //Service For Get Master Locations
    this.getLocationDetails = function (ParentID, PageIndex, PageSize, Searchtext, MasterLocationsList) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "ParentID": ParentID,
            "PageIndex": PageIndex,
            "PageSize": PageSize,
            "Searchtext": Searchtext,
            "MasterLocationsList": MasterLocationsList,

        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/MasterDataAndUnits/GetLocationDetails",
            data: JSON.stringify(model),
            headers: authHeaders
        })
        return request;
    }

    //service for Getting Banners
    this.Get_Banners = function () {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/MasterDataAndUnits/Get_Banners",
            headers: authHeaders,
        })
        return request;
    }
    //Service for updating home page 
    this.updateHomeBanner = function (FromDate, ToDate, CategoryName, CategoryId, Status, iHub_Product_ID, Image_Code, DisplayOrder, SectionId, Selling_Price, MRP) {

        var model = {
            "ProductID": iHub_Product_ID,
            "CategoryName": CategoryName,
            "CategoryID": CategoryId,
            "Status": Status,
            "Imagecode": Image_Code,
            "FromDate": FromDate,
            "ToDate": ToDate,
            "DisplayOrder": DisplayOrder,
            "SectionId": SectionId,
            "Price": Selling_Price,
            "Product_Mrp": MRP
        }
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/MasterDataAndUnits/update_Home_Main_Banner",
            headers: {
                'Content-Type': 'application/Json',
            },
            data: JSON.stringify(model),
        })
        return request;
    }

    //service for removing banner
    this.removebanner = function (ID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/MasterDataAndUnits/delete_Home_Main_Banner?ID=" + ID,
            headers: authHeaders,
        })
        return request;
    }
    //service for brandscategory
    this.brandscategory = function (tablename, id, itemsPerPage, searchbrand) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "TableName": tablename,
            "PageIndex": id,
            "PageSize": itemsPerPage,
            "BrandName": searchbrand,
        }
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/MasterDataAndUnits/getbrandscategory",
            headers: authHeaders,
            data: JSON.stringify(model)
        });

        return request;
    }



    //Service For Get getMastersValuesDetails 
    this.getMastersValuesDetailsbynameindroupdown = function (MasterName) {
        var model = {
            "MasterName": MasterName,
        }
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/MasterDataAndUnits/GetMasterDataValuesListByMasterNameinDropDown?MasterName=" + MasterName,
            data: JSON.stringify(model),
            headers: {
                'Content-Type': 'application/Json',
            },
        })
        return request;
    }
    //Service For Get Bottom Links Data
    this.getDescriptionDataService = function (Id) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GEt",
            url: config.apiUrl + "api/MasterDataAndUnits/getBottomLinksData?ID=" + Id,
            headers: authHeaders,
        })
        return request;
    }

    //Service For Save Bottom Links Data
    this.saveLinkDescriptionDataService = function (pkey, Id, MasterName, Content) {
        var authHeaders = {};
        var model = {
            "PrimaryKey": pkey,
            "ID": Id,
            "Name": MasterName,
            "Description": Content,
        }
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/MasterDataAndUnits/SaveBottomLinksData",
            headers: authHeaders,
            data: JSON.stringify(model)
        })
        return request;
    }
    //----------------------------------------------Service To Get Inventory Stock 
 this.Get_Inventory_Stock = function (ProductName, SKU, Quantitiy, ID, Pagesize, PageIndex) {
     var authHeaders = {};
     authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
     var products = {
         ProductName: ProductName,
         SKU: SKU,
         Quantitiy: Quantitiy,
         ID: ID,
         Pagesize: Pagesize,
         PageIndex: PageIndex
     }
     var request = $http({
         method: "POST",
         url: config.apiUrl + "api/InventoryAndStock/Get_Inventory_Stock",
         data: JSON.stringify(products),
         headers: authHeaders,
     })
     return request;
 }
    //Multi Stock Assignment
    //-------------------------------------------------------Service For GET Inventory available Products,
    this.Get_Avaibale_Products = function (FilterJson, id, pageSize, pageIndex, pname, unitid) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var products = {
            "FilterJson": FilterJson,
            "CategoryID": id,
            "Unit_ID": unitid,
            "ProductName": pname,
            "PageSize": parseInt(pageSize),
            "PageIndex": parseInt(pageIndex),
        }
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/InventoryAndStock/GetAvailable_products_By_UnitID",
            headers: authHeaders,
            data: JSON.stringify(products),
        })
        return request;
    }

    //-------------------------------------------------------Service To Assign product to multiple units
    this.iH_Assign_Stock_To_Multiple_Locations = function (str, unitid) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/InventoryAndStock/iH_Assign_Stock_To_Multiple_Locations?value=" + str + "&unitid=" + unitid,
            headers: authHeaders,
        });
        return dtls;
    }

//----------------------------------------------Service For Warehouse ID FROM Unit ID
    this.GetWHIDService = function (UnitID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var SubProductsList = $http({
            method: 'GET',
            url: config.apiUrl + "api/InventoryAndStock/Get_WHID_From_UnitId?UnitID=" + UnitID,
            headers: authHeaders,
        });
        return SubProductsList;
    }

    //----------------------------------------------Service For To Accept Products With in Consignments
    this.AcceptConsignmentStockService = function (Con_ID, ProductsList, AcceptedStock, Remarks) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/InventoryAndStock/AcceptConsignmentStock?ConsignmentID=" + Con_ID + "&Products_List=" + ProductsList + "&Accepted_Stock=" + AcceptedStock + "&Remarks=" + Remarks,
            headers: authHeaders,
        })
        return request;
    }

    this.getStoresFromUnits = function (id) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var bdtls = $http({
            method: 'GET',
            url: config.apiUrl + "api/ProductAndPrice/Get_iHub_Units_Data_By_Level?Hierarchy_Level_ID=" + id,
            headers: authHeaders,
        });
        return bdtls;
    }
    this.bulkOrdersProductsbysku = function (obj, paymentdetails) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;

        var products = {
            "JsonData": JSON.stringify(obj),
            "PaymentJson": JSON.stringify(paymentdetails),

        }
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/InventoryManagement/Bulk_Order",
            headers: authHeaders,
            data: JSON.stringify(products),
        })
        return request;
    }


    this.GET_Prds_List_BY_SKU_For_BulkOrders = function (productids) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/ProductAndPrice/GET_Prds_List_BY_SKU_For_BulkOrders",
            headers: authHeaders,
            data: {
                "productids": productids,
            }
        });
        return dtls;
    }
//----------------------------------------------Service For To Get Stores List For Coupons
    this.GetStoresListService = function () {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/Coupons/GetStoresList",
            headers: authHeaders,
        })
        return request;
    }

    //-------------------------------------------------Service To Save Store Coupans
    this.SaveCoupans = function (name, CouponBasedOn, CouponDependentOn, CoupanCode, Type, MaxDiscountAmount, Intervalamount, MinOrderOf, MaxOrderOf, Value, ValidFrom, ValidTo, Numberoftimes, ItemIDs, storeid, CustomerMobileNumber, IHubCouponType) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'POST',
            url: config.apiUrl + "api/Coupons/CreateCoupon",
            headers: authHeaders,
            data: {
                "Name": name,
                "Code": CoupanCode,
                "Type": Type,
                "MaxDiscountAmount": MaxDiscountAmount,
                "IntervalAmount": Intervalamount,
                "MinOf": MinOrderOf,
                "MaxOf": MaxOrderOf,
                "Value": Value,
                "ValidFrom": ValidFrom,
                "ValidTo": ValidTo,
                "NumberOfTimes": Numberoftimes,
                "CouponBasedOn": CouponBasedOn,
                "CouponDependentOn": CouponDependentOn,
                "ItemIDs": ItemIDs,
                "StoreID": storeid,
                "CustomerMobileNumber": CustomerMobileNumber,
                "IhubCouponType": IHubCouponType
            }
        });
        return dtls;
    }

    //-------------------------------------------------Service To Check Duplicate Coupon Codes
    this.CheckCouponCode = function (Couponcode) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/Coupons/CheckCouponCode?Couponcode=" + Couponcode,
            headers: authHeaders,
        })
        return request;
    }

    //-------------------------------------------------Service To change Coupon Status
    this.ChangeCouponStatusService = function (ID, Status) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/Coupons/ChangeCouponStatus?CouponID=" + ID + "&Status=" + Status,
            headers: authHeaders,
        })
        return request;
    }

    //-------------------------------------------------Service to Get Buyers Detailas by paasing query
    this.GetBuyersListByQureyService = function (Query) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/Coupons/GetBuyersListByQurey?Query=" + Query,
            headers: authHeaders,
        })
        return request;
    }

    //--------------------------------------------------------------Service to Create store coupans
    this.SaveCoupansService = function (name, CoupanCode, Type, Value, MinOrderOf, Intervalamount, Numberoftimes,
                                        ValidFrom, ValidTo, CouponBasedOn, CouponDependentOn,
                                        MaxDiscountAmount, MaxOrderOf, IhubCouponType, SelectedItems, StoreIDs) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'POST',
            url: config.apiUrl + "api/Coupons/CreateCoupon",
            headers: authHeaders,
            data: {
                "Name": name,
                "Code": CoupanCode,
                "Type": Type,
                "MaxDiscountAmount": MaxDiscountAmount,
                "MinOf": MinOrderOf,
                "MaxOf": MaxOrderOf,
                "Value": Value,
                "ValidFrom": ValidFrom,
                "ValidTo": ValidTo,
                "NumberOfTimes": Numberoftimes,
                "CouponBasedOn": CouponBasedOn,
                "CouponDependentOn": "0",
                "ItemIDs": SelectedItems,
                "IntervalAmount": Intervalamount,
                "IhubCouponType": IhubCouponType,
                "StoreID": StoreIDs
            }
        });
        return dtls;
    }
    this.Get_Home_Page_Products_Controller = function (flag) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'Post',
            url: config.apiUrl + "api/MasterDataAndUnits/Get_Home_Page_Products_Controller?flag=" + flag,
            headers: authHeaders,
        });
        return dtls;
    }


    this.Add_Upd_HomeProducts = function (Productsids, flag, status) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/MasterDataAndUnits/Add_Upd_HomeProducts",
            headers: authHeaders,
            data: {
                "Productids": Productsids,
                "RelevanceType": flag,
                "Status": status
            }
        });
        return dtls;
    }
    this.Top_Brands_List = function () {

        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;

        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/ProductAndPrice/Top_Brands_List",
            headers: authHeaders,
        });
        return request;
    }
    this.Add_Top_Brands = function (id, flag, status) {

        var model = {
            "ID": id,
            "flag": flag,
            "Status": status,
        }
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;

        var request = $http({
            method: "post",
            url: config.apiUrl + "api/ProductAndPrice/Add_Top_Brands",
            headers: authHeaders,
            data: JSON.stringify(model)
        });

        return request;
    }

	//-------------------------------------------------Service to Get ware house products
    this.GetWarehouseProductsService = function (ProductName, Sku, WH_Unit_ID) {
        var authHeaders = {};
        var Model = {
            "ProductName": ProductName,
            "SKU": Sku,
            "Unit_ID": WH_Unit_ID,
        }
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/InventoryAndStock/GetWarehouseProducts",
            headers: authHeaders,
            data: Model
        })
        return request;
    }

    //Service For Get Results with paging
    this.getordersresults = function (OrderType, OrderNumber, OrderDateFrom, OrderDateTo, MobileNumber, UnitID, Status, PageIndex, PageSize) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "OrderType": OrderType,
            "OrderNumber": OrderNumber,
            "OrderDateFrom": OrderDateFrom,
            "OrderDateTo": OrderDateTo,
            "MobileNumber": MobileNumber,
            "UnitID": UnitID,
            "StatusTwo": Status,
            "PageIndex": PageIndex,
            "PageSize": PageSize,
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/iH_Get_All_Store_Orders_For_Admin",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }

    //Service For Get Ordered Product(s) by OrderID

    this.Get_Ordered_Products = function (OrderID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "get",
            url: config.apiUrl + "api/ProductAndPrice/GetOrderedProducts?orderid=" + OrderID,
            headers: authHeaders,
        })
        return request;
    }

//Service For Get Ordered Product(s) by OrderID

    this.Get_Ordered_Products_Direct = function (OrderID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "get",
            url: config.apiUrl + "api/ProductAndPrice/GetOrderedProducts_Direct?orderid=" + OrderID,
            headers: authHeaders,
        })
        return request;
    }
    //Service For Get Ordered Product(s) by OrderID

    this.Get_Ordered_Products_Loc = function (orderid, fromdate, todate, villageid, pageindex, pagesize) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            ParentID: villageid,
            UnitID: $sessionStorage.Unit_ID,
            PageSize: pagesize,
            PageIndex: pageindex,
            OrderDateFrom: fromdate,
            OrderDateTo: todate,
            OrderNumber: orderid
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/GetOrderedProducts_Loc",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }
    //Service For change order status Product(s) by OrderID

    this.changeorderstatusNew = function (orderid, productid, otp, otpId) {

        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {


            "OrderID": orderid,
            "Productid": productid,
            "Otp": otp,
            "Notification_ID": otpId
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/Update_Ordered_Products_Status",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }

    //Service For Get Results with paging
    this.get_orders_Cancelled = function (OrderType, OrderNumber, OrderDateFrom, OrderDateTo, MobileNumber, UnitID, PageIndex, PageSize) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "OrderType": OrderType,
            "OrderNumber": OrderNumber,
            "OrderDateFrom": OrderDateFrom,
            "OrderDateTo": OrderDateTo,
            "MobileNumber": MobileNumber,
            "UnitID": UnitID,
            "PageIndex": PageIndex,
            "PageSize": PageSize,
        }
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/ProductAndPrice/Get_Store_Cancelled_Orders",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }
    //Service For Get Results with paging
    this.get_vendor_orders = function (OrderType, OrderNumber, OrderDateFrom, OrderDateTo, MobileNumber, UnitID, PageIndex, PageSize,Admin) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "OrderType": OrderType,
            "OrderNumber": OrderNumber,
            "OrderDateFrom": OrderDateFrom,
            "OrderDateTo": OrderDateTo,
            "MobileNumber": MobileNumber,
            "UnitID": UnitID,
            "PageIndex": PageIndex,
            "PageSize": PageSize,
            "IsAdmin": Admin,
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/Get_Store_Vendor_Orders",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }
    //Service For Get Results with paging
    this.get_WareHouse_orders = function (OrderType,Status, OrderNumber, OrderDateFrom, OrderDateTo, MobileNumber, UnitID, PageIndex, PageSize) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "OrderType": OrderType,
            "Status":Status,
            "OrderNumber": OrderNumber,
            "OrderDateFrom": OrderDateFrom,
            "OrderDateTo": OrderDateTo,
            "MobileNumber": MobileNumber,
            "UnitID": UnitID,
            "PageIndex": PageIndex,
            "PageSize": PageSize,
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/Get_Store_WareHouse_Orders",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }

	//-------------------------------------------------Service to Get Stock moving source List
    this.GetStockMovingSourceListService = function (Hierarchy_Level, Type, Role_Name, SourceID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/Category/GetStockMovingSourceList?HierarchyLevel=" + Hierarchy_Level + "&Type=" + Type + "&RoleName=" + Role_Name + "&SourceUnitID=" + SourceID,
            headers: authHeaders,
        })
        return request;
    }

    //-------------------------------------------------Service to Get Stock moving Products List
    this.GetStockMovingProductsListService = function (UnitID, CategoryId, ProductName, Sku, Pagesize, PageIndex) {
        var authHeaders = {};
        var Model = {
            "ProductName": ProductName,
            "ProductID": Sku,
            "Unit_ID": UnitID,
            "CategoryID": CategoryId,
            "Pagesize": Pagesize,
            "PageIndex": PageIndex
        };
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/InventoryAndStock/GetStockMovingProductsList",
            headers: authHeaders,
            data: Model
        })
        return request;
    }

    //-------------------------------------------------Service to Get Stock moving source List
    this.StockMovingService = function (Source_ID, Destination_ID, ProductsWith_Qty) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/InventoryAndStock/StockMoving?SourceID=" + Source_ID + "&DestinationID=" + Destination_ID + "&ProductsWithQty=" + ProductsWith_Qty,
            headers: authHeaders,
        })
        return request;
    }
    
    //Service For change order status Product(s) by OrderID

    this.Update_Product_order_status_change_direct = function (model) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/Update_Ordered_Products_Status_Change_Direct",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }

    //Service For change order status Product(s) by OrderID

    this.Update_Product_order_status_change = function (pid,orderid, status) {

        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {

            "productid":pid,
            "OrderID": orderid,
            "Status": status,

        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/Update_Ordered_Products_Status_Change",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }
	//-------------------------------------------------Service to Get Stock Assigned source List
    this.GetStockAssignedSourceListService = function (Hierarchy_Level, PreviousUnitID, Type) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/InventoryAndStock/GetStockAssignedSourceList?HierarchyLevel=" + Hierarchy_Level + "&Previous_UnitID=" + PreviousUnitID + "&Type=" + Type,
            headers: authHeaders,
        })
        return request;
    }
    // Service For GET Cash CounterFile
    this.GetCashCounterFilesService = function (Name, Type, OrderID, Status, fromdate, todate, PageIndex, Pagesize) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "Name": Name,
            "Type": Type,
            "OrderID": OrderID,
            "Status": Status,
            "orderdatefrom": fromdate,
            "orderdateto": todate,
            "PageIndex": PageIndex,
            "Pagesize": Pagesize,
        }
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/CounterFiles/GetCashCounterFiles",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }

    //Service For Change Counter File Status
    this.ChangeCounterFileStatusService = function (ID, Status) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/CounterFiles/ChangeCounterFileStatus?ID=" + ID + "&Status=" + Status,
            headers: authHeaders,
        })
        return request;
    }
//---------------------------------------------------Service For Get_Group_Filter_Types
    this.Get_Group_Filter_Types_Service = function (id) {
        var dtls = $http({
            method: 'get',
            url: config.apiUrl + "api/ProductAndPrice/Get_Group_Filter_Types?CategoryID=" + id,
        });
        return dtls;
    }


    //-------------------------------------------------------Service For GET UnGrouped Products,
    this.Get_UnGrouped_Products_Servive = function (CategoryID, group_types_str, ProductName, PageSize, PageIndex) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var products = {
            "FilterJson": group_types_str,
            "CategoryID": CategoryID,
            "ProductName": ProductName,
            "PageSize": parseInt(PageSize),
            "PageIndex": parseInt(PageIndex),
        }
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/ProductAndPrice/Get_UnGrouped_Product_List",
            headers: authHeaders,
            data: JSON.stringify(products),
        })
        return request;
    }

    //---------------------------------------------------Service For Create Remove Product Grouping
    this.Create_Product_Grouping = function (GroupId, products_str, group_types_str) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var products = {
            "CategoryID": GroupId,
            "ProductName": products_str,
            "FilterJson": group_types_str
        }
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/ProductAndPrice/Create_Update_Product_Grouping",
            headers: authHeaders,
            data: JSON.stringify(products),
        })
        return request;
    }

    //-------------------------------------------------------Service For GET UnGrouped Products,
    this.Get_Product_Groups_Servive = function (CategoryID, FilterJson, GroupID, ProductName, PageSize, PageIndex) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var products = {
            "ID": GroupID,
            "FilterJson": FilterJson,
            "CategoryID": CategoryID,
            "ProductName": ProductName,
            "PageSize": parseInt(PageSize),
            "PageIndex": parseInt(PageIndex),
        }
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/ProductAndPrice/Get_Product_Groups_List",
            headers: authHeaders,
            data: JSON.stringify(products),
        })
        return request;
    }


    //----------------------------------------------Service For Get Products By GroupID
    this.Get_Products_By_Grooup_ID_Servive = function (ID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var SubProductsList = $http({
            method: 'POST',
            url: config.apiUrl + "api/ProductAndPrice/Get_Products_By_Grooup_ID?ID=" + ID,
            headers: authHeaders,
        });
        return SubProductsList;
    }

    //----------------------------------------------Service For WareHoes List BY Distribution Channel ID
    this.Get_WareHouse_List_Service = function (DCID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/ProductAndPrice/Get_WareHouse_List_By_DCID?DCID=" + DCID,
            headers: authHeaders,
        })
        return request;
    }

    //----------------------------------------------Service For Store List BY Warehouse ID
    this.Get_Store_List_Servie = function (WHID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/ProductAndPrice/Get_Store_List_By_WHID?WHID=" + WHID,
            headers: authHeaders,
        })
        return request;
    }

    //----------------------------------------------Service For Get Buyer Details By Buyer Id
    this.Get_Buyer_Details_By_Mobile_Number_Service = function (MobileNumber) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/Get_Buyer_Details_By_Mobile_Number?MobileNumber=" + MobileNumber,
            headers: authHeaders,
        })
        return request;
    }


    //------------------------------------ Get Buyer Address
    this.Get_BuyerAddress = function (BuyerID, UnitID) {

        var user = $http({
            method: "GET",
            url: config.apiUrl + "api/ProductAndPrice/Get_BuyerAddress_By_ID?Userid=" + parseInt(BuyerID) + "&UnitID=" + parseInt(UnitID),
            headers: 'application/json',
        })
        return user;
    }
    //------------------------------------ Save Buyer Address
    this.Save_Update_Address = function (buyermodel) {
        var user = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/Add_Update_Buyer_Address",
            data: JSON.stringify(buyermodel),
            headers: 'application/json',
        })
        return user;
    }
    //---------------------------- Create Bulk Order
    this.Create_Bulk_Order_Service = function (Buyer_Name, Buyer_ID, Unit_ID, ProductIds_Qty, Payment_Mode_Type, CashBackAmount, Wallet_Amount, Coupon_Amount, Address_ID, paymentdetails) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;

        var products = {
            "Buyer_Name": Buyer_Name,
            "BUYER_ID": Buyer_ID,
            "UnitID": Unit_ID,
            "Payment_Mode_Type": Payment_Mode_Type,
            "ProductIds_Qty": ProductIds_Qty,
            "Use_CashBack_Amount": CashBackAmount,
            "Use_Wallet_Amount": Wallet_Amount,
            "Coupon_Amount": Coupon_Amount,
            "Buyer_Address_Id": Address_ID,
            "PaymentJson": paymentdetails,
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/Create_Bulk_Order",
            headers: authHeaders,
            data: JSON.stringify(products),
        })
        return request;



    }
    // ------------------Unit Temp service

    this.Get_Units_Tree = function () {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/MasterDataAndUnits/Get_Units_Tree",
            headers: authHeaders,
        })
        return request;
    }
    this.Get_Units_Table_Tree = function (parentid) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/MasterDataAndUnits/Get_Units_Table_Tree?parentid=" + parentid,
            headers: authHeaders,
        })
        return request;
    }
 this.GetImagesCount = function (productcode) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/ProductAndPrice/GetFilesCount?productcode=" + productcode,
            headers: authHeaders,
            // data: JSON.stringify(obj),
        })
        return request;
    }

	//----------------------------------------------Service To Get_Destination_Units for In-Out-Flow
    this.Get_Consignments_Units = function (unitid) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.ltoken;
        var request = $http({
            method: "get",
            url: config.apiUrl + "api/InventoryAndStock/Get_Consignments_Units_List?unitid=" + unitid,
            headers: authHeaders,
        })
        return request;
    }
 //==========================service for Change Customer Status Price Request
    this.Change_Special_Request_Status = function (ID, Status, MobileNumber, Message) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "MobileNumber": MobileNumber,
            "CustomerID": ID,
            "Status": Status,
            "Message": Message,

        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/Change_Special_Request_Status",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }
  

     //---------------------------------------------------Service For Get Price Request Data
    this.Get_Special_Requests = function (CustomerName, MobileNumber, Status, ProductName, StoreName, RequestsFrom, PageIndex, PageSize) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "Name": CustomerName,
            "MobileNumber": MobileNumber,
            "Status": Status,
            "ProductName": ProductName,
            "StoreName": StoreName,
            "orderdatefrom": RequestsFrom,
            "PageIndex": PageIndex,
            "Pagesize": PageSize
            
        }
        var Get_Price_Grid = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/Get_Special_Request_Data",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return Get_Price_Grid;
    }

    //-------------------------------------------------------Service For Upload_Products_By_Excel,
    this.Upload_Locations_With_Pincodes = function (ifiles) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        dat = {
            TableName: "",
            JsonData: ""
        };
        var sav = $http({
            method: 'POST',
            url: config.apiUrl + "api/ProductAndPrice/UploadLocationsWithPincodes",
            headers: {
                'Content-Type': undefined
            },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("model", angular.toJson(data.model));
                for (var i = 0; i < fileInput.files.length; i++) {
                    formData.append("file" + i, fileInput.files[i]);
                }
                return formData;
            },
            data: { model: dat, files: ifiles },

        });
        return sav
    }
 // Service For Get Store Expenses
    this.Get_Store_Expenses = function (Name, Status, expensedate, expensestype, pagesize, pageindex) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "Name": Name,
            "Status": Status,
            "expensedate": expensedate,
            "expensestype": expensestype,
            "pagesize": pagesize,
            "pageindex": pageindex,
        }
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/Category/GetAllStoreExpenses",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }

    //==========================service for Change Customer Status Price Request
    this.Change_StoreExpenses_Status = function (ID, Status) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/Category/Change_Store_Expenses_Status?ID=" + ID + "&Status=" + Status,
            headers: authHeaders,
        })
        return request;
    }

    this.Get_Master_Date_For_Expenes = function (LinkType) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: 'GET',
            url: config.apiUrl + "api/Category/Get_Master_Date_For_Expenes?LinkType=" + LinkType,
            headers: authHeaders,
        });
        return request;
    }
    // Get Products for given Category
    this.GetProductsForCategory = function (CategoryId, PageIndex, PageSize) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "CategoryID": CategoryId,
            "Page_Index": PageIndex,
            "Page_Size": PageSize,
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/Category/GetProductsForCategory",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }

    /// Save data - Shuffled Category and Products  
    this.Update_Shuffled_CategoryAndProducts = function (Product_Ids, Current_CategoryID, Target_CategoryID, Shuffle_Type) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "ProductIds": Product_Ids,
            "CategoryID": Current_CategoryID,
            "TargetCategoryID": Target_CategoryID,
            "ShuffleType": Shuffle_Type,
        }
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/Category/Update_Shuffled_CategoryAndProducts",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }
    this.GetInflowOutflowproducts = function (SKU, ProductName, OrderID, OrderDate, Source_UnitID, Dest_UnitID, Status, PageIndex, Pagesize, Unit_ID, Heirarachy_Level) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {

            "SKU": SKU,
            "ProductName": ProductName,
            "OrderID": OrderID,
            "OrderDate": OrderDate,
            "Source_UnitID": Source_UnitID,
            "Dest_UnitID": Dest_UnitID,
            "Status": Status,
            "PageIndex": PageIndex,
            "Pagesize": Pagesize,
            "Unit_ID": Unit_ID,
            "Heirarachy_Level": Heirarachy_Level,
        }
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/InventoryAndStock/Get_Inflow_Outflow_Stock",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }
    //----------------------------------------------Service For Store List By DC ID
    //this.Get_Store_List_By_DCID_Service = function (DistributionID) {
    //    var authHeaders = {};
    //    authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
    //    var request = $http({
    //        method: "GET",
    //        url: config.apiUrl + "api/InventoryAndStock/GetStoresListByDCID?DistributionID=" + DistributionID,
    //        headers: authHeaders,
    //    })
    //    return request;
    //}

    //----------------------------------------------Service To Get Vendor Order Product Details
    this.GetVendorOrderProductDetailsService = function (OrderMainID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.ltoken;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/InventoryAndStock/GetVendorOrderProductDetails?OrderMainID=" + OrderMainID,
            headers: authHeaders,
        })
        return request;
    }

    //----------------------------------------------Service To Assisgn Inbound Stock for Vendor Orders
    this.Assign_Stock_For_Vendor_Orders_Service = function (StockDetails, UnitID, OrderMainID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var products = {
            Unit_ID: UnitID,
            FilterJson: StockDetails,
            ParentID: OrderMainID
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/InventoryAndStock/Assign_Inbound_Stock_For_Vendor_Orders",
            headers: authHeaders,
            data: JSON.stringify(products),
        })
        return request;
    }


    this.Get_Prds_Not_Avil_MD = function (sku, FilterJson, id, pageSize, pageIndex, pname) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var products = {
            "ID": sku,
            "FilterJson": FilterJson,
            "CategoryID": id,
            "ProductName": pname,
            "PageSize": parseInt(pageSize),
            "PageIndex": parseInt(pageIndex),

        }
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/InventoryAndStock/Get_Prds_Not_Avil_MD",
            headers: authHeaders,
            data: JSON.stringify(products),
        })
        return request;
    }

    //// For Discounts Zone ////

    this.InsertProductsIntoMegaDealsService = function (ProductIDS, OrderDateFrom, OrderDateTo, Status) {

        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/InventoryAndStock/InsertProductsIntoMegaDeals",
            headers: authHeaders,
            data: {
                "productids": ProductIDS,
                "orderdatefrom": OrderDateFrom,
                "orderdateto": OrderDateTo,
                "TableName": "iH_Discountszone",
                "Status": Status
            }
        });
        return dtls;
    }
    this.InsertProductsIntoSchemesService = function (ProductIDS, Status, Schemes, Amount, bouns_Amount) {

        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/InventoryAndStock/InsertProductsIntoSchemes",
            headers: authHeaders,
            data: {
                "Productids": ProductIDS,
                "Type": Schemes,
                "Status": Status,
                "Amount": Amount,
                "Bonus_Amount": bouns_Amount
            }
        });
        return dtls;
    }
    this.Get_MD_Products = function (sku, Pagesize, PageIndex, CategoryID, JsonData, ProductName, orderdatefrom, orderdateto, Status, catpaentid) {

        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/InventoryAndStock/Get_MD_Products",
            headers: authHeaders,
            data: {
                "ID": catpaentid,
                "CategoryName": sku,
                "Pagesize": Pagesize,
                "PageIndex": PageIndex,
                "CategoryID": CategoryID,
                "ProductName": ProductName,
                "JsonData": JsonData,
                "orderdatefrom": orderdatefrom,
                "orderdateto": orderdateto,
                "Status": Status
            }
        })
        return request;
    }

    this.GET_Prds_List_BY_IDS = function (productids) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/InventoryAndStock/GET_Prds_List_BY_IDS",
            headers: authHeaders,
            data: {
                "productids": productids,
            }
        });
        return dtls;
    }

    this.removecolom = function (productids) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/InventoryAndStock/RemoveDiscountedProducts?ItemID=" + productids,
            headers: authHeaders,

        });
        return dtls;
    }

    this.MD_Parent_Catids = function (productids) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/InventoryAndStock/MD_Parent_Catids",
            headers: authHeaders,
            data: {
                "productids": productids,
            }
        });
        return dtls;
    }


    //----------------------------------------------Service For Store List By DC ID
    this.Get_Store_List_By_DCID_Service = function (DistributionID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/InventoryAndStock/GetStoresListByDCID?DistributionID=" + DistributionID,
            headers: authHeaders,
        })
        return request;
    }

    this.GetIntraStoredestStores = function (Source_Unit_ID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.ltoken;
        var request = $http({
            method: "get",
            url: config.apiUrl + "api/InventoryAndStock/Get_IntraStore_destStores?Source_Unit_ID=" + Source_Unit_ID,
            headers: authHeaders,
        })
        return request;
    }

    this.GetIntraStoreSourceStores = function (DC_ID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.ltoken;
        var request = $http({
            method: "get",
            url: config.apiUrl + "api/InventoryAndStock/Get_IntraStore_SourceStores?DC_ID=" + DC_ID,
            headers: authHeaders,
        })
        return request;
    }

    this.GetIntraStoreStock = function (SKU, ProductName, OrderID, OrderDate, Source_UnitID, Dest_UnitID, Status, PageIndex, Pagesize) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "SKU": SKU,
            "ProductName": ProductName,
            "OrderID": OrderID,
            "OrderDate": OrderDate,
            "Source_UnitID": Source_UnitID,
            "Dest_UnitID": Dest_UnitID,
            "Status": Status,
            "PageIndex": PageIndex,
            "Pagesize": Pagesize,
        }
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/InventoryAndStock/Get_IntraStore_Stock",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }
    this.Get_Destination_Units = function (unitid, inoutflow) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.ltoken;
        var request = $http({
            method: "get",
            url: config.apiUrl + "api/InventoryAndStock/Get_InOutflow_DestinationStores?inoutFlow=" + inoutflow + "&sourceid=" + unitid,
            headers: authHeaders,
        })
        return request;
    }


    //------------------------
    this.Create_New_Store_Keeper = function (Sub_Unit_ID, ContactName, EmailID, Phone_Number,
                                     AddressLine_One, AddressLine_Two, VillageLocation_ID
                              , Suggested_UserName, Password, Gender, DOB, Qualification, AddreesProofID, AddreesProofNumber) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;

        var newunit = {
            "Sub_Unit_ID": Sub_Unit_ID,
            "ContactName": ContactName,
            "Email": EmailID,
            "Phone_Number": Phone_Number,
            "AddressLine_One": AddressLine_One,
            "AddressLine_Two": AddressLine_Two,
            "VillageLocation_ID": VillageLocation_ID,
            "Suggested_UserName": Suggested_UserName,
            "Password": Password,
            "Gender": Gender,
            "Date_Of_Birth": DOB,
            "Qualification": Qualification,
            "Address_Proof_ID": AddreesProofID,
            "Address_Proof_Id_Number": AddreesProofNumber
        }
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/MasterDataAndUnits/Add_New_Store_Keeper",
            headers: authHeaders,
            data: JSON.stringify(newunit),
        })
        return request;
    }


    this.Get_Store_Keeper_List = function (UnitID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/MasterDataAndUnits/Get_Store_Keeper_List?UnitID=" + UnitID,
            headers: authHeaders,
        })
        return request;
    }



    this.changeorderstatususigcheque = function (id, status) {
        var authHeaders = {
        };
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "OrderID": id,
            "Status": status,
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/InventoryAndStock/Cheque_Order_Status_Change",
            data: JSON.stringify(model),
            headers: authHeaders,

        })
        return request;
    }

    //-------------------------------------------------------Service For Upload_Products_By_Excel,
    this.UploadHSNCode = function (ifiles) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        dat = {
            ID: "",
            TableName: "",
            JsonData: ""
        };
        var sav = $http({
            method: 'POST',
            url: config.apiUrl + "api/MasterDataAndUnits/UploadBulkHSNcode",
            headers: {
                'Content-Type': undefined
            },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("model", angular.toJson(data.model));
                for (var i = 0; i < fileInput.files.length; i++) {
                    formData.append("file" + i, fileInput.files[i]);
                }
                return formData;
            },
            data: { model: dat, files: ifiles },

        });
        return sav
    }

    //Service For to get  Dashboard Details
    this.Get_Data_For_Dashboard = function () {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'get',
            url: config.apiUrl + "api/InventoryAndStock/iH_Get_Data_For_Admin_Dashboard",
            headers: authHeaders,
        });
        return dtls;
    }
    this.Get_WH_Details = function (unitid) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "get",
            url: config.apiUrl + "api/Warehouse/Get_WH_Details?unitid=" + unitid,
            headers: authHeaders,
        })
        return request;
    }
    //------------------------
    this.Create_Empolyee_regitation = function (Unit_Name, EmailID, Phone_Number,
                                        AddressLine_One, AddressLine_Two, VillageLocation_ID
                                , Suggested_UserName, Password, roleid, Qualification, addressproofid, AddressProofIdNumber, Sub_Unit_ID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;

        var newunit = {
            "Unit_Name": Unit_Name,
            "Email": EmailID,
            "RoleId": roleid,
            "Qualification": Qualification,
            "Address_Proof_ID_employee": addressproofid,
            "Address_Proof_Id_Number":AddressProofIdNumber,
            "Phone_Number": Phone_Number,
            "AddressLine_One": AddressLine_One,
            "AddressLine_Two": AddressLine_Two,
            "VillageLocation_ID": VillageLocation_ID,
            "Suggested_UserName": Suggested_UserName,
            "Password": Password,
            "Sub_Unit_ID": Sub_Unit_ID
            
        }
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/MasterDataAndUnits/AddNewEmpolyeeregistation",
            headers: authHeaders,
            data: JSON.stringify(newunit),
        })
        return request;
    }
    //Service For Get Results with paging
    this.Empolyeeresult = function (roleid, MobileNumber,employeeName, PageIndex, PageSize) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "RoleId": roleid,
            "Phone_Number": MobileNumber,
            "ContactName": employeeName,
            "Page_Index": PageIndex,
            "Page_Size": PageSize
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/MasterDataAndUnits/iH_Get_Empolyee_registation_For_Admin",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }

    this.Removeempolyee = function (id) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "get",
            url: config.apiUrl + "api/MasterDataAndUnits/Removeempolyee?ID=" + id,
            headers: authHeaders,
        })
        return request;
    }

    this.Get_ASP_Net_Roles_Service = function () {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "get",
            url: config.apiUrl + "api/MasterDataAndUnits/Get_ASP_Net_Roles",
            headers: authHeaders,
        })
        return request;
    }
    this.Change_Employee_Status = function (ID, Status, IS_Reset) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/MasterDataAndUnits/Change_Employee_Status?ID=" + ID + "&Status=" + Status + "&IS_Reset=" + IS_Reset,
            headers: authHeaders,
        })
        return request;
    }
    this.StockAudit = function (ifiles) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        dat = {
            ID: "",
            TableName: "",
            JsonData: ""
        };
        var sav = $http({
            method: 'POST',
            url: config.apiUrl + "api/ProductAndPrice/StockAudit",
            headers: {
                'Content-Type': undefined
            },

            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("model", angular.toJson(data.model));
                for (var i = 0; i < fileInput.files.length; i++) {
                    formData.append("file" + i, fileInput.files[i]);
                }
                return formData;
            },
            data: { model: dat, files: ifiles },

        });
        return sav
         
    }

    //get clusters with their adrress
    this.Get_Cluters = function (heirarchylevel, distId) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/MasterDataAndUnits/Get_Address_By_UnitID?heirarchylevel=" + heirarchylevel + "&UnitID=" + distId,
            headers: authHeaders,
        })
        return request;
    }
    // -------------------------------------------------Service for Get_All_Locations_For_Tree_View
    this.Get_All_Locations = function () {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/MasterDataAndUnits/GetAllLocations",
            headers: authHeaders
        })
        return request;
    }

    this.Assign_Mandals = function (mandals) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/MasterDataAndUnits/Assign_Pincodes_ToMandal",
            data: JSON.stringify(mandals),
            headers: authHeaders
        })
        return request;
    }

    this.GetCluster_By_MandalID = function (mandalid) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/MasterDataAndUnits/GetClusterByMandalID?mandalID=" + mandalid,
            headers: authHeaders
        })
        return request;
    }
    //Service For Get Direct Orders
    this.getDirectrordersresults = function (OrderType, OrderNumber, OrderDateFrom, OrderDateTo, MobileNumber, UnitID, Status, PageIndex, PageSize) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "OrderType": OrderType,
            "OrderNumber": OrderNumber,
            "OrderDateFrom": OrderDateFrom,
            "OrderDateTo": OrderDateTo,
            "MobileNumber": MobileNumber,
            "UnitID": UnitID,
            "StatusTwo": Status,
            "PageIndex": PageIndex,
            "PageSize": PageSize,
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/iH_Get_All_Store_Orders_For_Logistics",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }

    //------------------------------------ Service For GET Order Details with OrderId
    this.GetOrderDetails = function (orderid) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var user = $http({
            method: "GET",
            url: config.apiUrl + "api/ProductAndPrice/GetOrderDetails_ByOrderId_Inv?OrderID=" + orderid,
            headers: authHeaders,
        })
        return user;
    }

    //Service For Get Ordered Product(s) by OrderID
    this.Get_Ordered_Products_Inventory = function (OrderID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "get",
            url: config.apiUrl + "api/ProductAndPrice/GetOrderedProducts_Inventory?orderid=" + OrderID +'&unitid='+$sessionStorage.Unit_ID,
            headers: authHeaders,
        })
        return request;
    }

   ////Service For Get thirdparty master data
   // this.Get_Ordered_Products_Inventory = function () {
   //     var authHeaders = {};
   //     authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
   //     var request = $http({
   //         method: "get",
   //         url: config.apiUrl + "api/ProductAndPrice/GetOrderedProducts_Inventory?orderid=" + OrderID,
   //         headers: authHeaders,
   //     })
   //     return request;
   // }

    //Service For assign orders to logistics
    this.Assign_Logistics = function (orders, masterid, isthirdparty, trackingid,products) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            IsThirdParty: isthirdparty,
            MasterID: masterid,
            Order_productID: orders,
            TrackingID: trackingid,
            Products:products
        }
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/ProductAndPrice/Assign_Orders_To_Logistics",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }

    //Service For assign orders to logistics
    this.Get_Assign_LogisticOrders = function (orderid, fromdate, todate, villageid, logisticstype, pageindex, pagesize) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            ParentID: villageid,
            UnitID: $sessionStorage.Unit_ID,
            PageSize: pagesize,
            PageIndex: pageindex,
            OrderDateFrom: fromdate,
            OrderDateTo: todate,
            OrderNumber: orderid,
            Status: logisticstype
        }
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/ProductAndPrice/GetAssigned_Logistic_Orders",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }
    //----------------------------------------------Service For Assigned Stock Products List

    /* Consignment New services   */
    this.GetAssignedProductsListServiceNew = function (UnitID, DC_UnitID, Sku, OrderNumber, ProductName, MobileNumber, OrderType, OrderBy) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "Unit_ID": UnitID,
            "DC_Unit_ID": DC_UnitID,
            "Sku":Sku,
            "OrderNumber": OrderNumber,
            "ProductName": ProductName,
            "MobileNumber": MobileNumber,
            "OrderType": OrderType,
            "OrderBy": OrderBy
        }
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/Consignments/GetAssignedProductsList",
            headers: authHeaders,
            data: JSON.stringify(model),
        })
        return request;
    }

    this.Get_Assigned_Inventory_Product_Ids_Service = function (Source_UnitID, Dest_UnitID, Product_Id, OrderID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/Consignments/Get_Assigned_Inventory_Product_Ids?Source_UnitID=" + Source_UnitID + "&Dest_UnitID=" + Dest_UnitID + "&Product_Id=" + Product_Id + "&OrderID=" + OrderID,
            headers: authHeaders,
        })
        return request;
    }

    this.Create_New_Consignment_Service = function (Con_ID, Productids, Source_UnitID, Dest_UnitID, No_Boxes) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "ID": Con_ID,
            "Productids": Productids,
            "Source_UnitID": Source_UnitID,
            "Dest_UnitID": Dest_UnitID,
            "Status": No_Boxes,

        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/Consignments/Create_New_Consignment",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }

    //----------------------------------------------Service For Get Consignments List
    this.Get_Consignments_ListService_New = function (Name, Status, Source_UnitID, Dest_UnitID, Date, PageSize, PageIndex) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;

        var model = {
            Cons_Name: Name,
            Cons_Status: Status,
            Source_UnitID: Source_UnitID,
            Dest_UnitID: Dest_UnitID,
            CreateDate: Date,
            PageSize: PageSize,
            PageIndex: PageIndex
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/Consignments/Get_Consignments_List",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }

    this.ViewProductsInConsignmentService_New = function (Con_ID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/Consignments/ViewProductsInConsignment?ConsignmentID=" + Con_ID,
            headers: authHeaders,
        })
        return request;
    }

    //----------------------------------------------Service To Change Consignment Status
    this.ChangeConsignmentStatusServiceNew = function (Con_ID, Status) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/Consignments/ChangeConsignmentStatus?ConsignmentID=" + Con_ID + "&Status=" + Status,
            headers: authHeaders,
        })
        return request;
    }


    //----------------------------------------------Service To Change Consignment Bulk Status Update
    this.ChangeBulkStatusServiceNew = function (Con_IDs, Status) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/Consignments/ChangeBulkConsignmentStatus?ConsignmentIDs=" + Con_IDs + "&Status=" + Status,
            headers: authHeaders,
        })
        return request;
    }

    this.Get_Vendor_Products = function (Unit_id, SKU, OrderNumber, ProductName, OrderDate, Parent_CategoryID, BrandName, VendorID, Pagesize, PageIndex) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {

            "Unit_ID": Unit_id,
            "SKU": SKU,
            "OrderNumber": OrderNumber,
            "ProductName": ProductName,
            "OrderDate": OrderDate,
            "CategoryID": Parent_CategoryID,
            "BrandName": BrandName,
            "VendorID": VendorID,
            "Pagesize": Pagesize,
            "PageIndex": PageIndex,
        }
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/VendorandProcurement/Procurement_Products_List",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }
    this.Add_Vendor_Products = function (Unit_Id, skucode) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {

            "Unit_ID": Unit_Id,
            "SKU": skucode,

        }
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/VendorandProcurement/Add_Products",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }
    //Service For GET OTP
    this.GetOTP = function () {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var otp = $http({
            method: 'post',
            url: config.apiUrl + "api/ProductAndPrice/GetVerificationOTP",
            headers: authHeaders
        });
        return otp;
    }
    //Service For Get Results with paging
    this.getordersForCancel = function (OrderType, OrderNumber, OrderDateFrom, OrderDateTo, MobileNumber, UnitID, Status, PageIndex, PageSize) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "OrderType": OrderType,
            "OrderNumber": OrderNumber,
            "OrderDateFrom": OrderDateFrom,
            "OrderDateTo": OrderDateTo,
            "MobileNumber": MobileNumber,
            "UnitID": UnitID,
            "StatusTwo": Status,
            "PageIndex": PageIndex,
            "PageSize": PageSize,
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/iH_Get_Orders_For_Admin_ForCancel",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }
    //=====================================================Save offer based on Quantity and Amount
    this.SaveOffers = function (OfferId, ProductwithDiscountPrice, OfferMode, OfferValue, Startdate, Enddate, Minvalue, MaxValue, Status) {
        
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "ID": OfferId,
            "FilterJson": ProductwithDiscountPrice,
            "Type": OfferMode,
            "OfferValue": OfferValue,
            "FromDate": Startdate,
            "ToDate": Enddate,
            "Min_Value": Minvalue,
            "Max_value": MaxValue,
            "Status": Status
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/Save_Amount_Quantity_Offers",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }
    //Service For Get Results with paging
    this.getOffersForView = function (OfferMode, Startdate, Enddate, Status, PageIndex, PageSize) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "Type": OfferMode,
            "FromDate": Startdate,
            "ToDate": Enddate,
            "Status": Status,
            "PageIndex": PageIndex,
            "Pagesize": PageSize,
        }
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/iH_Get_Offers_Amount_Quantity_View",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }
    //Service For Get Ordered Product(s) by OrderID

    this.Get_Offer_Products = function (OfferID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "get",
            url: config.apiUrl + "api/ProductAndPrice/GetOfferProducts?OfferId=" + OfferID,
            headers: authHeaders,
        })
        return request;
    }
      //Service For Get Ordered Product(s) by OrderID

    this.RemoveOffer = function (OfferID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "get",
            url: config.apiUrl + "api/ProductAndPrice/RemoveOffer_ByOfferID?OfferID=" + OfferID,
            headers: authHeaders,
        })
        return request;
    }
this.AllowSalesInDirectService = function (ID, Status) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/ProductAndPrice/AllowSalesInDirect?ID=" + ID + "&DirectStatus=" + Status,
            headers: authHeaders,
        })
        return request;
    }
//Service For Get Results with paging
    this.Get_WareHouse_DashBoard_Service = function () {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
      
        var request = $http({
            method: "POST",
            url: config.apiUrl + "api/ProductAndPrice/Get_WareHouse_DashBoard_Service",
            headers: authHeaders,
        })
        return request;
    }
    //---------------- Accept Consignment --------------------------


    this.Accept_Consignment_Service = function (Cons_ID, Dammaged_Inv_Ids, Not_Recived_Inv_Ids, Remarks) {
        var products = {
            "Consignment_ID": Cons_ID,
            "Dammaged_Inv_Ids": Dammaged_Inv_Ids,
            "Not_Recived_Inv_Ids": Not_Recived_Inv_Ids,
            "RemarksDeatils": Remarks
        }
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        authHeaders.RequestKey = $sessionStorage.hashkey;
        var dtls = $http({
            method: 'post',
            url: config.apiUrl + "api/Consignments/Accept_Consignment",
            headers: authHeaders,
            data: JSON.stringify(products),
        });
        return dtls;
    }

    this.Get_Dammaged_Invetory_Product_Service = function (SourceUnitID, DestUnitID, Productid, Consingment_ID, Consingment_Name) {
        var products = {
            "Source_UnitID": SourceUnitID,
            "Dest_UnitID": DestUnitID,
            "productid": Productid,
            "Consignment_ID": Consingment_ID,
            "Cons_Name": Consingment_Name
        }
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        authHeaders.RequestKey = $sessionStorage.hashkey;
        var dtls = $http({
            method: 'Post',
            url: config.apiUrl + "api/Consignments/Get_Dammaged_Invetory_Product_Consignments_List",
            headers: authHeaders,
            data: JSON.stringify(products),
        });
        return dtls;
    }
    this.View_Inventory_List_ProductsInConsignmentService_New = function (Con_ID, Source_Unit_ID, Dest_Unit_ID, ProductID) {
        var products = {
            "Consignment_ID":Con_ID,
            "Source_UnitID": Source_Unit_ID,
            "Dest_UnitID": Dest_Unit_ID,
            "productid": ProductID
           
        }
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/Consignments/Get_Dammaged_Invetory_Product_List_Consignments_List",
            headers: authHeaders,
            data: JSON.stringify(products),
        })
        return request;
    }
    this.View_Inventory_List_Damaged_and_not_recived = function (Con_ID, ProductID, Status) {
        var products = {
            "Consignment_ID": Con_ID,
            "productid": ProductID,
            "Cons_Status": Status,

        }
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/Consignments/Get_Dammaged_Invetory_Product",
            headers: authHeaders,
            data: JSON.stringify(products),
        })
        return request;
    }
    this.Update_Dammaged_Product_to_Store_Stock_Service = function (Con_ID) {
        var products = {
            "Inv_Ids": Con_ID,
        }
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/Consignments/Update_Dammaged_Product_to_Store_Stock",
            headers: authHeaders,
            data: JSON.stringify(products),
        })
        return request;
    }
    this.Get_Assigned_Inventory_Product_Ids_Accepeted_Service = function (Source_UnitID, Dest_UnitID, Product_Id, OrderID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/Consignments/Get_Assigned_Inventory_Product_Ids_Accepeted?Source_UnitID=" + Source_UnitID + "&Dest_UnitID=" + Dest_UnitID + "&Product_Id=" + Product_Id + "&OrderID=" + OrderID,
            headers: authHeaders,
        })
        return request;
    }
    //----------------------------------------------Service For Assigned Stock Store/WareHouse List
    this.Get_Unit_List_With_Stock_Consignment_Service = function (SrcUnitID, DestUnitID, HierarchyLevelId) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/Consignments/GetAssignedStockUnitsList_New?Src_UnitID=" + SrcUnitID + "&Dest_UnitID=" + DestUnitID + "&Hierarchy_Level_Id=" + HierarchyLevelId,
            headers: authHeaders,
        })
        return request;
    }
    //----------------------------------------------Service To Get Repurchasable Products by Category ID
    this.Get_OffersPrd_BySKU = function (FilterJson, unitID) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var products = {
            "FilterJson": FilterJson,
            "Unit_ID": unitID
        }
        var request = $http({
            method: "post",
            url: config.apiUrl + "api/InventoryAndStock/Get_Offers_Products_BySKU",
            headers: authHeaders,
            data: JSON.stringify(products),
        })
        return request;
    }
}]);