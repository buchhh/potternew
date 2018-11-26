var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'src/home/home.html',
                controller: 'homeController'
            }).when('/login', {
                templateUrl: 'src/login/login.html',
                controller: 'loginController'
            }).
            when("/job", {
                templateUrl: 'src/job/job.html',
                controller: 'jobController'
            }).
            when("/show", {
                templateUrl: 'src/show/show.html',
                controller: 'showController'
            }).
            when("/showFin", {
                templateUrl: 'src/showFin/showFin.html',
                controller: 'showFinController'

            })
            .otherwise({
                redirectTo: '/'
            });
    }]).constant('FIREBASE_URL', 'something');

app.factory('query', ['$http', '$rootScope', function ($http, $rootScope) {
    return {
        sql: function (data) {
            try {
                sql = []
                sql.push(data);
                return $http({
                    headers: { 'Content-Type': 'application/angular' },
                    url: 'database/sql.php',
                    method: "POST",
                    data: sql,
                }).then(function (response) {
                    dataSql = [];
                    if (response.data && response.data.length > 0) {
                        response.data.forEach(element => {
                            dataSql.push(element)
                            console.log('[sql] : ' + element.sql);
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
                url: 'database/sql.php',
                method: "POST",
                data: sql,
            }).then(function (response) {
                dataSql = [];
                if (response.data && response.data.length > 0) {
                    response.data.forEach(element => {
                        dataSql.push(element)
                        console.log('[sql] : ' + element.sql);
                    });
                } else {
                    dataSql = null
                }
                return dataSql;
            })

        }
    };
}]);

app.controller('indexController', function ($scope, $http, $window, $interval, $document, query, $location, modal) {
    // // SET TIME TO EVENT ========================================
    // debugger
    var interval = 1000; //in milliseconds
    var intervalPromise = $interval(polling, 5000); // SET TIME
    function polling() {
        console.log($scope.api);
        sql = [];
        if (sessionUser && sessionUser.member_id) {
            sql.push("SELECT * FROM `member` WHERE member_id = '" + sessionUser.member_id + "' LIMIT 1");
        }
        sql.push("SELECT * FROM `potter_job` where status = '1'");
        // $scope.countMax = ($scope.sumE ? $scope.sumE : ( JSON.parse($window.sessionStorage.getItem("countMax")) ? JSON.parse($window.sessionStorage.getItem("countMax")) : 0 ));
        // $window.sessionStorage.setItem("countMax", $scope.countMax);
        query.sqll(sql).then(function (response) {
            var user = response[0].data[0].member_count;
            $scope.userid = response[0].data[0].member_id;
            $scope.type = response[0].data[0].member_type;
            var db = response[1].data.length;
            if (db > user) {

                $scope.sumE = (parseInt(db) - parseInt(user));
                $scope.count = parseInt(user) + parseInt($scope.sumE);
                statusNewData = JSON.parse($window.sessionStorage.getItem("newData"));
                var job = $location.$$path.split("/");
                job = job[1];
                if (!statusNewData && job != 'job' && $scope.type == 'admin') {
                    var json = { status: 'true' }
                    $window.sessionStorage.setItem("newData", JSON.stringify(json));
                    modal.newData($scope).then(function (response) {
                        // debugger
                    });
                }
            }
        })
    }
    // // SET TIME TO EVENT =========================================
    // modal.success();
    $scope.config;
    $http.get("config/config.json").then(function (res) {
        $scope.config = res.data
        checkSessionLogin();
    });
    var checkSessionLogin = function () {
        sessionUser = JSON.parse($window.sessionStorage.getItem("user"));
        if (sessionUser) {
            $scope.username = sessionUser && sessionUser.member_user ? sessionUser.member_user : '';
            $scope.usernameType = sessionUser && sessionUser.member_type ? sessionUser.member_type : '';
        } else {
            window.location.href = '/' + $scope.config.project_name + '/login';
        }
    };
    $scope.checkout = function () {
        $window.sessionStorage.removeItem("user");
        checkSessionLogin();
    }


    $(function () {
        $('.navbar-toggle').click(function () {
            $('.navbar-nav').toggleClass('slide-in');
            $('.side-body').toggleClass('body-slide-in');
            $('#search').removeClass('in').addClass('collapse').slideUp(200);
        });

        // Remove menu for searching
        $('#search-trigger').click(function () {
            $('.navbar-nav').removeClass('slide-in');
            $('.side-body').removeClass('body-slide-in');
        });
    });
});
