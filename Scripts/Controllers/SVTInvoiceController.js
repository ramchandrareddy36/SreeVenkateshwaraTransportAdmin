app.registerCtrl('SVTInvoiceController', function ($scope, $rootScope, $location, $timeout, $sessionStorage, $http, $route, SvTransportService, AuthData, $filter) {
    $rootScope.ScreenName = "SVT Invoice";
    $scope.Dashboard = true;
    AuthData.authenticationData.IsAuthenticated = true;
    $scope.CompanyID = "";
    $scope.GridShow = false;
    //$("#EditFormModal").modal('show');
    $scope.RandomNumber = Math.floor(100000 + Math.random() * 900000);
    $scope.GetComapnyDeatils = function () {
        var sections = SvTransportService.Get_All_Companies();
        sections.then(function (response) {
            $scope.CompanyList = [];
            if (response.data != null) {
                for (var s = 0; s < response.data.length; s++) {
                    $scope.CompanyList.push({
                        'Company_ID': response.data[s].CompanyID,
                        'Company_Name': response.data[s].CompanyName,
                    });
                }
                $scope.CompanyList = $filter('orderBy')($scope.CompanyList, 'Item_Name');
            }
        }, function (reason) {
        });
    }
    $scope.GetComapnyDeatils();

    $scope.SelectCompany = function (CompanyID) {
        $scope.CompanyID = CompanyID;
    }

    $scope.CalculateTotal = function () {
        $scope.Totalvalue = (parseFloat($scope.Quantity) * parseFloat($scope.Price));
    }

    $scope.TotalQuantity = 0;
    $scope.TotalIncoiceAmount = 0;
    $scope.GenerateInvoice = function (form) {
        //  if ($scope[form].$valid) {
        $scope.ShowMsgs = false;
        $scope.Invoice_Date = $filter('date')(new Date($scope.Invoice_Date), "yyyy-MM-dd");
        var sections = SvTransportService.Save_Update_Invoice($scope.Invoice_Date, $scope.TotalQuantity, $scope.TotalIncoiceAmount, $scope.CompanyID, $scope.So_num, $scope.Mine, $scope.Material_Desc, $scope.HsnCode, $scope.RandomNumber);
        sections.then(function (response) {
            if (response.data != null) {
                localStorage.setItem("SVTInvoiceID", parseInt(response.data));
                $location.path('/SVTInvoiceConfirm');
            }
        }, function (reason) {
        });
        //}
        //else {
        //    $scope.ShowMsgs = true;
        //}
    }
    $scope.InvoiceDetailsList = [];
    $scope.Add = function () {
        $scope.DcDate = $filter('date')(new Date($scope.DcDate), "dd-MM-yyyy");
        $scope.TotalQuantity = $scope.TotalQuantity + $scope.Quantity;
        $scope.TotalIncoiceAmount = $scope.TotalIncoiceAmount + parseFloat($scope.Price * $scope.Quantity);
        var sections = SvTransportService.Save_Update_Invoice_Details($scope.DcDate, $scope.Vehicle_num, $scope.DcNum, $scope.Quantity, $scope.Price, $scope.RandomNumber, "SVT");
        sections.then(function (response) {
            if (response.data != null) {
                var invoicedata = SvTransportService.getInvoiceDetailsByIDService(parseInt(response.data), "SVT");
                invoicedata.then(function (result) {
                    if (result.data != null) {
                        $scope.InvoiceDetailsList.push({
                            "DcDate": result.data[0].DCDate,
                            "DCNum": result.data[0].DCNum,
                            "Quantity": result.data[0].Quantity,
                            "TotalAmount": result.data[0].TotalAmount,
                            "UnitPrice": result.data[0].UnitPrice,
                            "VehicleNumber": result.data[0].VehicleNumber,
                        })
                        $scope.GridShow = true;
                        $scope.DcDate = $scope.Vehicle_num = $scope.DcNum = $scope.Quantity = $scope.Price = $scope.Totalvalue = "";
                    }
                }, function (error) {
                })
            }
        }, function (reason) {
        });
    }
    $scope.Cancel = function () {
        $scope.Invoice_Date = "";
        $scope.Vehicle_num = "";
        $scope.DcNum = "";
        $scope.Quantity = "";
        $scope.Totalvalue = "";
        $scope.Price = "";
        $scope.CompanyID = "";
        $scope.So_num = "";
        $scope.Mine = "";
        $scope.Material_Desc = "";
        $scope.HsnCode = "";
        $scope.ShowMsgs = false;
        $scope.InvoiceForm.$setPristine();
        $location.path('/Dashboard');
    }
});