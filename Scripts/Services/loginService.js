app.service('loginService', ['$http', 'AuthData', 'config', '$sessionStorage',
function ($http, AuthData, config, $sessionStorage) {
    //------------------------------------------Service For Admin_Login
    this.GetLoginDetails = function (loginMailID, loginPassword) {
        var login = $http({
            method: 'post',
            url: config.apiUrl + "token",
            data: 'grant_type=password&username=' + encodeURIComponent(loginMailID) + '&password=' + encodeURIComponent(loginPassword),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*'
            }
        });
        return login;
    }
}]);