app.registerCtrl('TotalInvoiceController', function ($scope, $rootScope, $location, $timeout, $sessionStorage, $http, $route, SvTransportService, AuthData) {
    $rootScope.ScreenName = "Total Invoices";
    AuthData.authenticationData.IsAuthenticated = true;
    $scope.InvoiceGrid = true;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    //Table Paginiation function.
    $scope.figureOutTodosToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + parseInt($scope.itemsPerPage);
        if ($scope.totalData.length > 0) {
            $scope.beginitem = parseInt(begin) + 1;
            $scope.enditem = parseInt($scope.currentPage) * parseInt($scope.itemsPerPage);
            if ($scope.enditem > $scope.popupfiltereditems) {
                $scope.enditem = $scope.popupfiltereditems;
            }
        }
    };
    //To Change a Page.
    $scope.pageChanged = function (index) {

        if ($scope.itemsPerPage == 10) {
            $scope.ind = index - 1;
            $scope.rownumber = $scope.ind * 10;
        } else {
            $scope.ind = index - 1;
            $scope.rownumber = $scope.itemsPerPage * $scope.ind;
        }
        $scope.figureOutTodosToDisplay();
        $scope.tblpage();
    };
    //To Change Number of item per page.
    $scope.changeitems = function () {

        if ($scope.pageitems == "") {
            $scope.itemsPerPage = 10;
        }
        else {
            $scope.itemsPerPage = $scope.pageitems;
        }
        $scope.figureOutTodosToDisplay();

        $scope.tblpage();
    }



    //function for update
    $scope.Update = function (form) {
        if ($scope[form].$valid) {
            $ngConfirm({
                title: 'Are You Sure ?',
                content: '',
                type: 'blue',
                typeAnimated: true,
                buttons: {
                    tryAgain: {
                        text: 'Yes',
                        btnClass: 'btn-green',
                        action: function () {
                            var tablename = "iH_DefaultMessages";
                            var sections = SvTransportService.updatedefaultMessage($scope.ID, $scope.MessageDescription);
                            sections.then(function (response) {
                                $scope.savevisibility = false;
                                $scope.cancelvisibility = false;
                                $scope.updatevisibility = false;
                                $scope.form = false;
                                $scope.InvoiceGrid = true;
                                $scope.tblpage();
                                $scope.Clear();
                                $scope.successMessage = "Data Updated Successfully";
                                $scope.successMessagebool = true;
                                $timeout(function () {
                                    $scope.successMessagebool = false;
                                }, 2000);

                            }, function (reason) {
                                $scope.successTextAlert = "insertion failed";
                            });
                        }
                    },
                    No: function () {
                    }

                }
            })

        }
        else {
            $scope.showMsgs = true;
        }
    }



    // function for tblpage
    $scope.tblpage = function () {
        $scope.gridshow = true;
        $scope.cancelvisibility = false;
        $scope.savevisibility = false;
        $scope.showMsgs = false;
        $scope.showSuccessAlert = false;
        var count = $scope.index;
        var sections = SvTransportService.GetTotalInvoiceData();
        sections.then(function (response) {

            $scope.totalData = [];
            if (response.data != null) {

                for (var s = 0; s < response.data.Resultset.length; s++) {
                    $scope.totalData.push({
                        'Message': response.data.Resultset[s].Message,
                        'Name': response.data.Resultset[s].Name,
                        'id': response.data.Resultset[s].ID,
                    });
                }
                $scope.popupfiltereditems = response.data.TotalCount;
                $scope.figureOutTodosToDisplay();
            }
            else {
                $scope.popupfiltereditems = 0;
            }
        }, function (reason) {

        });
    };
    $scope.tblpage();
});