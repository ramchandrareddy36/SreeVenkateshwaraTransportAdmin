var app = angular.module('iHub', [
  'ngRoute', 'ngStorage', 'angularTreeview', 'angular-linq', 'ui.tree', 'blockUI', 'cp.ngConfirm', 'ngJsonExportExcel', "autocomplet", 'angularTreeviewSub'
]);
app.constant('config', {
    apiUrl: 'http://localhost:62143/',
});
app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}]);

app.resolveScriptDeps = function (dependencies) {
    return function ($q, $rootScope) {
        var deferred = $q.defer();
        $script(dependencies, function () {
            $rootScope.$apply(function () {
                deferred.resolve();
            });
        });
        return deferred.promise;
    }
};
app.config(['$routeProvider', '$locationProvider', '$controllerProvider', function ($routeProvider, $locationProvider, $controllerProvider) {
    $routeProvider.caseInsensitiveMatch = true;
    app.registerCtrl = $controllerProvider.register;
    $routeProvider
         .when("/", {
             templateUrl: '../Templates/DashBoard.html',
             resolve: { deps: app.resolveScriptDeps(['../Scripts/Controllers/DashBoardController.js']) },
         })
         //.when("/Login", {
         //    templateUrl: '../Templates/login.html',
         //    resolve: { deps: app.resolveScriptDeps(['../Scripts/Controllers/loginController.js']) },
         //})

          .when("/Dashboard", {
              templateUrl: '../Templates/DashBoard.html',
              resolve: { deps: app.resolveScriptDeps(['../Scripts/Controllers/DashBoardController.js']) },
          })
        .when("/SVTInvoice", {
            templateUrl: '../Templates/SVTInvoice.html',
            resolve: { deps: app.resolveScriptDeps(['../Scripts/Controllers/SVTInvoiceController.js']) },
        })
        .when("/GAInvoice", {
            templateUrl: '../Templates/GAInvoice.html',
            resolve: { deps: app.resolveScriptDeps(['../Scripts/Controllers/GAInvoiceController.js']) },
        })
        .when("/SalesOutStanding", {
            templateUrl: '../Templates/SalesOutStanding.html',
            resolve: { deps: app.resolveScriptDeps(['../Scripts/Controllers/SalesOutStandingController.js']) },
        })
        .when("/SVTInvoiceConfirm", {
            templateUrl: '../Templates/SVTInvoiceConfirm.html',
            resolve: { deps: app.resolveScriptDeps(['../Scripts/Controllers/SVTInvoiceConfirmController.js']) },
        })
         .when("/GAInvoiceConfirm", {
             templateUrl: '../Templates/GAInvoiceConfirm.html',
             resolve: { deps: app.resolveScriptDeps(['../Scripts/Controllers/GAInvoiceConfirmController.js']) },
         })
        .when("/PurchaseOutStanding", {
            templateUrl: '../Templates/PurchaseOutStanding.html',
            resolve: { deps: app.resolveScriptDeps(['../Scripts/Controllers/PurchaseOutStandingController.js']) },
        })
        .when("/DailyVehicleList", {
            templateUrl: '../Templates/DailyVehicleList.html',
            resolve: { deps: app.resolveScriptDeps(['../Scripts/Controllers/DailyVehicleListController.js']) },
        })
        .when("/Adjustments", {
            templateUrl: '../Templates/Adjustments.html',
            resolve: { deps: app.resolveScriptDeps(['../Scripts/Controllers/AdjustmentsController.js']) },
        })
        //.when("/AllInvoice", {
        //    templateUrl: '../Templates/TotalInvoice.html',
        //    resolve: { deps: app.resolveScriptDeps(['../Scripts/Controllers/TotalInvoiceController.js']) },
        //})
        .otherwise({
            redirectTo: '/'
        })
    $locationProvider.html5Mode(true);
}]);
app.filter('split', function () {
    return function (input, splitChar, splitIndex) {
        return input.split(splitChar);
    }
});
app.filter('trusted', function ($sce) {
    return function (html) {
        return $sce.trustAsHtml(html)
    }
});

app.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});
app.filter('INR', function () {
    return function (input) {
        if (!isNaN(input)) {
            input = parseFloat(input).toFixed(2)
            var currencySymbol = '₹';
            //var output = Number(input).toLocaleString('en-IN');   <-- This method is not working fine in all browsers!           
            var result = input.toString().split('.');

            var lastThree = result[0].substring(result[0].length - 3);
            var otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '')
                lastThree = ',' + lastThree;
            var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

            if (result.length > 1) {
                if (result[1].length == 1) {
                    result[1] = result[1] + '0';
                }
                output += "." + result[1];
            }
            else {
                output += ".00";
            }

            return currencySymbol + output;
        }
    }
});

app.filter('camelCase', function () {
    var camelCaseFilter = function (input) {
        var words = input.split(' ');
        for (var i = 0, len = words.length; i < len; i++)
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        return words.join(' ');
    };
    return camelCaseFilter;
})
//Filter For groupBy
app.filter('groupBy', ['$parse', function ($parse) {
    return function (list, group_by) {

        var filtered = [];
        var prev_item = null;
        var group_changed = false;
        // this is a new field which is added to each item where we append "_CHANGED"
        // to indicate a field change in the list
        //was var new_field = group_by + '_CHANGED'; - JB 12/17/2013
        var new_field = 'group_by_CHANGED';

        // loop through each item in the list
        angular.forEach(list, function (item) {

            group_changed = false;

            // if not the first item
            if (prev_item !== null) {

                // check if any of the group by field changed

                //force group_by into Array
                group_by = angular.isArray(group_by) ? group_by : [group_by];

                //check each group by parameter
                for (var i = 0, len = group_by.length; i < len; i++) {
                    if ($parse(group_by[i])(prev_item) !== $parse(group_by[i])(item)) {
                        group_changed = true;
                    }
                }
            }// otherwise we have the first item in the list which is new
            else {
                group_changed = true;
            }
            // if the group changed, then add a new field to the item
            // to indicate this
            if (group_changed) {
                item[new_field] = true;
            } else {
                item[new_field] = false;
            }
            filtered.push(item);
            prev_item = item;
        });
        return filtered;
    };
}]);

app.filter('convertToWord', function () {
    return function (amount) {
        var words = new Array();
        words[0] = '';
        words[1] = 'One';
        words[2] = 'Two';
        words[3] = 'Three';
        words[4] = 'Four';
        words[5] = 'Five';
        words[6] = 'Six';
        words[7] = 'Seven';
        words[8] = 'Eight';
        words[9] = 'Nine';
        words[10] = 'Ten';
        words[11] = 'Eleven';
        words[12] = 'Twelve';
        words[13] = 'Thirteen';
        words[14] = 'Fourteen';
        words[15] = 'Fifteen';
        words[16] = 'Sixteen';
        words[17] = 'Seventeen';
        words[18] = 'Eighteen';
        words[19] = 'Nineteen';
        words[20] = 'Twenty';
        words[30] = 'Thirty';
        words[40] = 'Forty';
        words[50] = 'Fifty';
        words[60] = 'Sixty';
        words[70] = 'Seventy';
        words[80] = 'Eighty';
        words[90] = 'Ninety';
        amount = amount.toString();
        var atemp = amount.split(".");
        var number = atemp[0].split(",").join("");
        var n_length = number.length;
        var words_string = "";
        if (n_length <= 9) {
            var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
            var received_n_array = new Array();
            for (var i = 0; i < n_length; i++) {
                received_n_array[i] = number.substr(i, 1);
            }
            for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
                n_array[i] = received_n_array[j];
            }
            for (var i = 0, j = 1; i < 9; i++, j++) {
                if (i == 0 || i == 2 || i == 4 || i == 7) {
                    if (n_array[i] == 1) {
                        n_array[j] = 10 + parseInt(n_array[j]);
                        n_array[i] = 0;
                    }
                }
            }
            value = "";
            for (var i = 0; i < 9; i++) {
                if (i == 0 || i == 2 || i == 4 || i == 7) {
                    value = n_array[i] * 10;
                } else {
                    value = n_array[i];
                }
                if (value != 0) {
                    words_string += words[value] + " ";
                }
                if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Crores ";
                }
                if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Lakhs ";
                }
                if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Thousand ";
                }
                if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                    words_string += "Hundred and ";
                } else if (i == 6 && value != 0) {
                    words_string += "Hundred ";
                }
            }
            words_string = words_string.split("  ").join(" ");
        }
        return words_string;
    };
});