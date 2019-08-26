app.service('SvTransportService', ['$http', '$sessionStorage', 'config',
function ($http, $sessionStorage, config, $scope, $rootScope, $location, $timeout, $route) {

    //Service For to get  Dashboard Details
    this.Get_Data_For_Dashboard = function () {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var dtls = $http({
            method: 'get',
            url: config.apiUrl + "api/Invoice/GetDashboardData",
            headers: authHeaders,
        });
        return dtls;
    }

    this.Get_All_Companies = function () {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/Invoice/GetCompanyDetails",
            headers: authHeaders
        })
        return request;
    }

    this.Save_Update_Invoice = function (InvDate, Qty, Unit_Price, CompID, Sonum, MineName, Material_desc, HsnCode, randomnum) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "InvoiceDate": InvDate,
            "Quantity": Qty,
            "UnitPrice": Unit_Price,
            "CompanyID": CompID,
            "SONum": Sonum,
            "Mine": MineName,
            "MaterialDesc": Material_desc,
            "HSNCode": HsnCode,
            "RandomNumber": randomnum
        }
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/Invoice/Add_Edit_Invoice",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }

    this.Save_Update_Invoice_Details = function (DcDate, Vehiclenum, DcNum, Qty, Unit_Price, randomnum, Type) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "DCDate": DcDate,
            "VehicleNumber": Vehiclenum,
            "DCNumber": DcNum,
            "Quantity": Qty,
            "UnitPrice": Unit_Price,
            "RandomNumber": randomnum
        }
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/Invoice/Add_Edit_InvoiceDetails?Type=" + Type,
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }

    this.Save_Update_GAInvoice_Service = function (InvDate, Qty, Unit_Price, CompID, Ponum, PoDate, Material_desc, HsnCode, gst, CessAmt, randomnum) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var model = {
            "InvoiceDate": InvDate,
            "Quantity": Qty,
            "UnitPrice": Unit_Price,
            "CompanyID": CompID,
            "PONum": Ponum,
            "PODate": PoDate,
            "MaterialDesc": Material_desc,
            "HSNCode": HsnCode,
            "Gst": gst,
            "Cess": CessAmt,
            "RandomNumber": randomnum
        }
        var request = $http({
            method: "Post",
            url: config.apiUrl + "api/Invoice/GA_Add_Edit_Invoice",
            data: JSON.stringify(model),
            headers: authHeaders,
        })
        return request;
    }

    this.getInvoiceDetailsByIDService = function (Invoiceid, Type) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/Invoice/GetInvoiceDetailsByID?InvoiceID=" + Invoiceid + "&Type=" + Type,
            headers: authHeaders
        })
        return request;
    }

    this.getInvoiceDataByIDService = function (Invoiceid, Type) {
        var authHeaders = {};
        authHeaders.Authorization = 'Bearer ' + $sessionStorage.token;
        var request = $http({
            method: "GET",
            url: config.apiUrl + "api/Invoice/getInvoiceDataByID?InvoiceID=" + Invoiceid + "&Type=" + Type,
            headers: authHeaders
        })
        return request;
    }
}]);