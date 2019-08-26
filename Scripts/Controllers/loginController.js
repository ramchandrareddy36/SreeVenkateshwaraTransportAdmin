app.registerCtrl("loginController", ["$scope", '$location', "AuthData", "$rootScope", '$http', "$sessionStorage", "loginService", "SvTransportService", function ($scope, $location, AuthData, $rootScope, $http, $sessionStorage, loginService, SvTransportService) {
    $scope.Signinbutton = true;
    $scope.remembershow = true;
    $sessionStorage.CheckAdminLogin = false;
    AuthData.authenticationData.IsAuthenticated = false;
    $scope.authentication = AuthData.authenticationData;
    $scope.userName = "";
    $scope.password = "";
    $rootScope.ScreenName = "Login";
    $scope.ErrorMsg = false;
    //----------------------------------------Function For Admin_SignIn
    $scope.Admin_SignIn = function (form) {
        $scope.remembershow = false;
        if ($scope[form].$valid) {
            var promise = loginService.GetLoginDetails($scope.userName, $scope.password);
            promise.then(function (response) {
                $scope.Signinbutton = false;
                $rootScope.rolename = response.data.role;
                $scope.res = response;
                $scope.OTP = response.data.OTP;
                if (response.data.OTP !== '') {
                    $scope.OTPFormShow = true;
                }
                else {
                    $sessionStorage.token = response.data.access_token;
                    $rootScope.userName = response.data.userName;
                    $sessionStorage.FirstName = response.data.userName;
                    $sessionStorage.StoreID = response.data.StoreId;
                    $sessionStorage.CheckAdminLogin = true;
                    $sessionStorage.userid = response.data.userid;
                    $rootScope.rolename = response.data.role;
                    $sessionStorage.Role = response.data.role;
                    $sessionStorage.Unit_ID = $scope.Unit_ID = response.data.unitid;
                    $scope.DynamicMenuItems = [];
                    $rootScope.$emit('leftmenu', {});
                    $scope.getWHID($scope.Unit_ID);
                }
            },
           function (loginerror) {
               $scope.loginerror = "The user name or password is incorrect.";
               $scope.ErrorMsg = true;
           });
        } else {
            $scope.showMsgs = true;
        }
    }
    //---------------------------------------Function For OTP_Form_Submit
    $scope.Submit = function () {
        if ($scope.AdminOTP == $scope.OTP) {
            $sessionStorage.token = $scope.res.data.access_token;
            $rootScope.userName = $scope.res.data.userName;
            $sessionStorage.FirstName = $scope.res.data.userName;
            $sessionStorage.StoreID = $scope.res.data.storeid;
            $sessionStorage.CheckAdminLogin = true;
            $sessionStorage.userid = $scope.res.data.userid;
            $rootScope.issued = $scope.res.data[".issued"]
            $rootScope.rolename = $scope.res.data.role;
            $sessionStorage.Role = $scope.res.data.role;
            $scope.DynamicMenuItems = [];
            $rootScope.$emit('leftmenu', {});
        }
        else {
            $scope.OTPerror = 'Please enter valid OTP';
            $scope.IncorrectOTP = true;
        }
    }

    $scope.getWHID = function (UnitID) {
        var dclist = AdminService.GetWHIDService(UnitID);
        dclist.then(function (response) {
            if (response.data != null) {
                $sessionStorage.WareHouseID = response.data;
            }
        }, function (reason) {

        });
    }
}]);