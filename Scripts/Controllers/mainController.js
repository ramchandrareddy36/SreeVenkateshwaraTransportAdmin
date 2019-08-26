app.controller('mainController', function ($scope, $rootScope, $location, $timeout, $sessionStorage, $http, $route, AuthData, SvTransportService, blockUI) {
    $rootScope.activeMenu = "Dashboard";
    $scope.authentication = AuthData.authenticationData;

    if ($sessionStorage.CheckAdminLogin == true) {
        if (String($rootScope.rolename).toLowerCase() == 'superadmin') {
            $location.path('/Dashboard');
        }
        else if (String($rootScope.rolename).toLowerCase() == 'dc_admin') {
            $location.path('/Dashboard');
        }
        else {
            AuthData.authenticationData.IsAuthenticated = false;
            $location.path('/Dashboard');
        }
    }
    else {
        AuthData.authenticationData.IsAuthenticated = false;
        $sessionStorage.CheckAdminLogin = false;
        $location.path('/Dashboard');
        //$location.path('/GAInvoiceConfirm');
    }

    $scope.HomePage = function () {
        $location.path('/Dashboard');
    }
});