app.registerCtrl('GAInvoiceController', function ($scope, $rootScope, $location, $timeout, $sessionStorage, $http, $route, SvTransportService, AuthData, $filter) {
    $rootScope.ScreenName = "GA Invoice";
    $scope.Dashboard = true;
    AuthData.authenticationData.IsAuthenticated = true;
    $scope.CompanyID = "";
    $scope.GridShow = false;
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
        $scope.Invoice_Date = $filter('date')(new Date($scope.Invoice_Date), "dd-MM-yyyy");
        if ($scope.Po_Date != null) {
            $scope.Po_Date = $filter('date')(new Date($scope.Po_Date), "dd-MM-yyyy");
        }
        $scope.TotalIncoiceAmount = $scope.TotalIncoiceAmount + parseFloat((($scope.TotalIncoiceAmount * $scope.GST) / 100)) + parseFloat(($scope.CessAmount * $scope.TotalQuantity));
        // $scope.TotalIncoiceAmount = $scope.TotalIncoiceAmount + parseFloat(($scope.CessAmount * $scope.TotalQuantity));
        var sections = SvTransportService.Save_Update_GAInvoice_Service($scope.Invoice_Date, $scope.TotalQuantity, $scope.TotalIncoiceAmount, $scope.CompanyID, $scope.Po_num, $scope.Po_Date, $scope.Material_Desc, $scope.HsnCode, $scope.GST, $scope.CessAmount, $scope.RandomNumber);
        sections.then(function (response) {
            if (response.data != null) {
                localStorage.setItem("GAInvoiceID", parseInt(response.data));
                $location.path('/GAInvoiceConfirm');
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
        $scope.TotalQuantity = parseFloat(parseFloat($scope.TotalQuantity) + parseFloat($scope.Quantity));
        $scope.TotalIncoiceAmount = parseFloat(parseFloat($scope.TotalIncoiceAmount) + parseFloat($scope.Price * $scope.Quantity));
        var sections = SvTransportService.Save_Update_Invoice_Details($scope.DcDate, $scope.Vehicle_num, $scope.DcNum, $scope.Quantity, $scope.Price, $scope.RandomNumber, "GA");
        sections.then(function (response) {
            if (response.data != null) {
                var invoicedata = SvTransportService.getInvoiceDetailsByIDService(parseInt(response.data), "GA");
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
        $scope.Po_num = "";
        $scope.Po_Date = "";
        $scope.Material_Desc = "";
        $scope.HsnCode = "";
        $scope.ShowMsgs = false;
        $scope.InvoiceForm.$setPristine();
        $location.path('/Dashboard');
    }
});