app.registerCtrl('SVTInvoiceConfirmController', function ($scope, $rootScope, $location, $timeout, $sessionStorage, $http, $route, AuthData, $log, $ngConfirm, $filter, $window, SvTransportService) {
    AuthData.authenticationData.IsAuthenticated = true;
    $rootScope.ScreenName = "Invoice";
    $scope.SVTInvoiceID = localStorage.getItem("SVTInvoiceID");

    $scope.getInVoiceDetails = function () {
        $scope.InvoiceDetails = [];
        $scope.TotalQuantity = 0;
        $scope.TotalIncoiceAmount = 0;
        var invoicedata = SvTransportService.getInvoiceDataByIDService(parseInt($scope.SVTInvoiceID), "SVT");
        invoicedata.then(function (result) {
            if (result.data != null) {
                $scope.SvtDetails = result.data[0];
                for (var i = 0; i < result.data.length; i++) {
                    $scope.InvoiceDetails.push({
                        "DcDate": $filter('date')(new Date(result.data[i].DCDate), "yyyy-MM-dd"),
                        "DCNum": result.data[i].DCNum,
                        "Quantity": result.data[i].Quantity,
                        "TotalAmount": (parseFloat(result.data[i].Quantity) * parseFloat(result.data[i].UnitPrice)),
                        "UnitPrice": result.data[i].UnitPrice,
                        "VehicleNumber": result.data[i].VehicleNumber,
                    })
                    $scope.TotalQuantity = $scope.TotalQuantity + result.data[i].Quantity;
                    $scope.TotalIncoiceAmount = $scope.TotalIncoiceAmount + result.data[i].UnitPrice;
                }
            }
        }, function (error) {
        })
    }
    $scope.getInVoiceDetails();
    // Function For Print Invoice
    $scope.Print = function (printSectionId) {
        var innerContents = document.getElementById(printSectionId).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        //popupWinindow.document.write('<html><head><link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css"><link href="dist/css/style.css" rel="stylesheet"></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.write('<html><head><link rel="stylesheet" href="dist/css/bootstrap.min.css"><link href="/dist/css/Invoice.css" rel="stylesheet"><link href="dist/css/InvoiceStyle.css" rel="stylesheet"></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
    }
});