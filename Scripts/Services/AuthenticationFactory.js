app.factory('AuthData', [function () {
    var authDataFactory = {};

    var _authentication = {
        IsAuthenticated: false,
    };
    authDataFactory.authenticationData = _authentication;
    return authDataFactory;
}]);