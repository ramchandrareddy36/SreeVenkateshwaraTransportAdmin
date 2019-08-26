app.registerCtrl('DashBoardController', function ($scope, $rootScope, $location, $timeout, $sessionStorage, $http, $route, SvTransportService, AuthData) {
    $rootScope.ScreenName = "Dashboard";
    $scope.Dashboard = true;
    AuthData.authenticationData.IsAuthenticated = true;
    // =================================function For get Datsboard Details
    $scope.Get_Dasboard_Details = function () {
        $rootScope.isLoading = true;
        var orders = SvTransportService.Get_Data_For_Dashboard();
        orders.then(function (response) {
            $rootScope.isLoading = false;
            if (response.data != null) {
                $scope.DashboardDetails = (response.data[0]);
            }
        }, function (reason) {
            $rootScope.isLoading = false;
        })
    }
    $scope.Get_Dasboard_Details();

    //==============================Redirect to Price Requests 
    $scope.TodayInvoice = function () {
        $sessionStorage.AdminDashboard = $rootScope.ScreenName;
        $location.path('/TodayInvoice');
        $route.reload();
    }

    $scope.TotalInvoice = function () {
        $sessionStorage.AdminDashboard = $rootScope.ScreenName;
        $location.path('/AllInvoice');
        $route.reload();
    }

    $scope.CreateGAInvoice = function () {
        $sessionStorage.AdminDashboard = $rootScope.ScreenName;
        $location.path('/GAInvoice');
        $route.reload();
    }

    $scope.CreateSVTInvoice = function () {
        $sessionStorage.AdminDashboard = $rootScope.ScreenName;
        $location.path('/SVTInvoice');
        $route.reload();
    }

    $scope.SalesOutStanding = function () {
        $sessionStorage.AdminDashboard = $rootScope.ScreenName;
        $location.path('/SalesOutStanding');
        $route.reload();
    }

    $scope.PurchaseOutStanding = function () {
        $sessionStorage.AdminDashboard = $rootScope.ScreenName;
        $location.path('/PurchaseOutStanding');
        $route.reload();
    }

    $scope.DailyVechileList = function () {
        $sessionStorage.AdminDashboard = $rootScope.ScreenName;
        $location.path('/DailyVehicleList');
        $route.reload();
    }

    $scope.Adjustments = function () {
        $sessionStorage.AdminDashboard = $rootScope.ScreenName;
        $location.path('/Adjustments');
        $route.reload();
    }

    $scope.GaDetails = function () {
        $("#EditFormModal").modal('show');
    }
});