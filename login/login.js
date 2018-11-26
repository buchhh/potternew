var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

app.factory('query', ['$http', '$rootScope', function ($http, $rootScope) {
    return {
        sql: function (data) {
            try {
                sql = []
                sql.push(data);
                return $http({
                    headers: { 'Content-Type': 'application/angular' },
                    url: '../database/sql.php',
                    method: "POST",
                    data: sql,
                }).then(function (response) {
                    dataSql = [];
                    if (response.data && response.data.length > 0) {
                        response.data.forEach(element => {
                            dataSql.push(element)
                            console.log(element.sql);
                        });
                    } else {
                        dataSql = null
                    }
                    data = dataSql[0];
                    return data;
                })
            } catch (error) {
                return error;
            }
        },
        sqll: function (sql) {
            return $http({
                headers: { 'Content-Type': 'application/angular' },
                url: '../database/sql.php',
                method: "POST",
                data: sql,
            }).then(function (response) {
                dataSql = [];
                if (response.data && response.data.length > 0) {
                    response.data.forEach(element => {
                        dataSql.push(element)
                        console.log(element.sql);
                    });
                } else {
                    dataSql = null
                }
                return dataSql;
            })

        }
    };
}]);

app.controller('loginController', function ($scope, $http, $location, $route, $routeParams, query, modal, $window, $document) {
    $scope.user;
    $scope.pwd;
    $scope.messageError;
    $scope.statusLogin = '';
    $scope.statusL == 'unset';
    $scope.host = $location.$$absUrl;
    // var res = $location.$$absUrl.split("/");
    // $scope.host = $location.$$protocol + '://' + $location.$$host;
    // $scope.host = res[0] + '/' + res[1] + '/' + res[2] + '/' + res[3] + '/';
    $scope.submit = function () {
        var user = $scope.user;
        var pwd = $scope.pwd;
        if (user && pwd) { 
            sql = "SELECT * FROM`member` WHERE`member_user` = '" + user + "' and`member_pwd` = '" + pwd + "' limit 1";
            query.sql(sql).then(function (response) {
                if (response.data && response.status == 200) {
                    $scope.statusLogin = 'true';
                    localStorage.removeItem('user');
                    var json = response.data[0];
                    $window.sessionStorage.setItem("user", JSON.stringify(json));
                    sessionUser = JSON.parse($window.sessionStorage.getItem("user"));
                    $scope.username = sessionUser && sessionUser.member_user ? sessionUser.member_user : '';
                    $scope.MsgName = "เข้าสู่ระบบเรียบร้อย";
                    $http.get('../config/config.json').then(function (res) {
                        var host = $location.$$protocol + '://' + $location.$$host + '/' + res.data.project_name;
                        window.location.href = host;
                        console.log(host);
                    });
                } else {
                    $scope.statusLogin = 'false';
                    $scope.messageError = 'คุณใส่ ชื่อผู้ใช้ หรือ รหัสผ่าน ไม่ถูกต้อง';
                }

            });
        } else {
            $scope.statusLogin = 'req';
            $scope.messageError = 'กรุณาใส่ข้อมูลให้ครบ';
        }

    }

    $scope.checkKey = function (event) {
        // debugger
        if (event.keyCode == '13') {
            $scope.submit();
        }
    }

    $scope.checkSession = function () {
        sessionUser = JSON.parse($window.sessionStorage.getItem("user"));
        if (sessionUser) {
            $scope.statusL = 'set';
            $scope.username = sessionUser && sessionUser.member_user ? sessionUser.member_user : '';
        } else {
            $scope.statusL = 'unset';
        }
    }

    $scope.checkSession();
});