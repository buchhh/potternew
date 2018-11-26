app.factory('modal', ['$http', '$rootScope', '$uibModal', '$window', function ($http, $rootScope, $uibModal, $window) {
    return {
        success: function ($scope) {
            try {
                var modalInstance = $uibModal.open({
                    templateUrl: 'modal/success.html',
                    controller: 'ModalController',
                    scope: $scope
                });
                modalInstance.result.then(function (res) {
                });
            } catch (error) {
                return error;
            }
        },
        error: function ($scope) {
            try {
                var modalInstance = $uibModal.open({
                    templateUrl: 'modal/error.html',
                    controller: 'ModalController',
                    scope: $scope
                });
                // modalInstance.result.then(function (res) {
                // });
            } catch (error) {
                return error;
            }
        },
        subData: function ($scope) {
            try {
                // $scope = angular.copy($scope)

                $window.sessionStorage.setItem("showId", JSON.stringify($scope.showId));
                var modalInstance = $uibModal.open({
                    templateUrl: 'modal/subData.html',
                    controller: 'ModalController',
                    scope: $scope
                });
                return modalInstance.result.then(function (res) {
                    return res;
                });
            } catch (error) {
                return error;
            }
        },
        finData: function ($scope) {
            try {
                // $scope = angular.copy($scope)

                $window.sessionStorage.setItem("showId", JSON.stringify($scope.showId));
                var modalInstance = $uibModal.open({
                    templateUrl: 'modal/finData.html',
                    controller: 'ModalController',
                    scope: $scope
                });
                return modalInstance.result.then(function (res) {
                    return res;
                });
            } catch (error) {
                return error;
            }
        },
        newData: function ($scope) {
            try {
                var modalInstance = $uibModal.open({
                    templateUrl: 'modal/newData.html',
                    controller: 'ModalController',
                    scope: $scope
                });
                return modalInstance.result.then(function (res) {
                    return res;
                });
            } catch (error) {
                return error;
            }
        }
    };
}]);

app.controller('ModalController', function ($scope, $uibModalInstance, $interval, $uibModal, query, $window) {
    // $scope.modalUserGroup = angular.copy(scope.showId);

    var interval = 1000; //in milliseconds
    var intervalPromise = $interval(polling, 1000); // SET TIME
    function polling() {
        $scope.sumE = JSON.parse($window.sessionStorage.getItem("countMax"));
    }

    $scope.modal = true;
    $scope.showId = JSON.parse($window.sessionStorage.getItem("showId"));
    $scope.cancel = function () {
        // $uibModalInstance.dismiss();
        $uibModalInstance.close('test');
    };

    $scope.search = function () {
        sql = "SELECT * FROM `staff_name`";
        query.sql(sql).then(function (response) {
            $scope.nameE = []
            response.data.forEach(element => {
                $scope.nameE.push(element.name_ps);
            });

        })
    }
    $scope.search();
    $scope.searchName = function () {
        name = $scope.name ? $scope.name : '';
        // มันคือ query ที่จะเอา id ไปค้นหาชื่อมาโชว์
        sql = "SELECT * FROM `staff_name` WHERE pch_id='" + name + "'";
        query.sql(sql).then(function (response) {
            if (response.status == 200) {
                $scope.showName = response.data[0].name_ps;
                //     
            } else {
                $scope.showName = ''
            }
        })
    }


    $scope.checkKey = function (event) {
        // debugger
        if (event.keyCode == '13') {
            $scope.searchName();
        }
    }

    $scope.save = function () {
        var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        sql = "UPDATE `potter_job` SET `recname` = '" + $scope.name + "',`status` = '2',`recdate` = '" + date + "' WHERE `potter_job`.`job_id` = '" + $scope.showId + "';"
        query.sql(sql).then(function (response) {

            if (response.status == 200) {
                $uibModalInstance.close('200');
            } else {
                $uibModalInstance.close('500');
            }
        })
    }

    $scope.finSave = function () {
        var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        sql = "UPDATE `potter_job` SET `jobname` = '" + $scope.name + "',`status` = '3',`finishdate` = '" + date + "' WHERE `potter_job`.`job_id` = '" + $scope.showId + "';"
        query.sql(sql).then(function (response) {
            if (response.status == 200) {
                $uibModalInstance.close('200');
            } else {
                $uibModalInstance.close('500');
            }
        })
    }

    $scope.clearData = function (id, count) {
        $scope.modal = false;
        sql = "UPDATE `member` SET `member_count` = '" + count + "' WHERE `member`.`member_id` = '" + id + "';"
        query.sql(sql).then(function (response) {
            if (response.status == 200) {
                $uibModalInstance.close('200');
            } else {
                $uibModalInstance.close('500');
            }
        });
        $window.sessionStorage.removeItem("newData");

    }

});