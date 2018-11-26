app.controller('showController', function ($scope, $http, $location, $route, $routeParams, $window, query, modal) {
    // $scope.id = $routeParams.id;
    $scope.dataSet = {};
    $scope.dataSet.name = '';
    $scope.dataSet.test = '';
    $scope.limit = '10';
    $scope.offset = '0';
    $scope.row = '1';
    $scope.rowCount = [];
    $scope.count = '0';
    $scope.orderBy = 'job_id';
    $scope.orderbyType = true;
    // $scope.page = [10,30,50,100];
    var checkSessionLogin = function () {
        sessionUser = JSON.parse($window.sessionStorage.getItem("user"));
        if (sessionUser) {
            $scope.username = sessionUser && sessionUser.member_user ? sessionUser.member_user : '';
            $scope.usernameType = sessionUser && sessionUser.member_type ? sessionUser.member_type : '';

        } else {
            window.location.href = '/' + $scope.config.project_name + '/login';
        }
    };

    $scope.getData = function (orderby, offset, search) {
        $scope.row = offset ? offset : $scope.row;
        orderby ? $scope.orderBy = orderby : $scope.orderBy;
        $scope.orderbyType = orderby && orderby == $scope.orderBy ? !$scope.orderbyType : $scope.orderbyType;
        $scope.offset = ((parseInt($scope.row) - 1) * $scope.limit)
        sql = `
        FROM potter_job S 
        LEFT JOIN staff_name N ON N.pch_id = S.reqname
        LEFT JOIN status_job J ON S.status = J.status_id 
        `;
        WHERE = 'WHERE S.status <> 4 ';
        if (search) {
            var num = parseInt(search);
            WHERE += "AND (S.job_id LIKE '%" + search + "%' ";
            num ? WHERE += "OR S.docdate LIKE '%" + search + "%' " : '';
            WHERE += "OR S.ward LIKE '%" + search + "%' ";
            WHERE += "OR S.job LIKE '%" + search + "%' ";
            WHERE += "OR N.name_ps LIKE '%" + search + "%' ";
            WHERE += "OR S.recname LIKE '%" + search + "%' ";
            WHERE += "OR S.jobname LIKE '%" + search + "%' ";
            WHERE += "OR J.status_name LIKE '%" + search + "%' ";
            WHERE += "OR S.status LIKE '%" + search + "%' )";
        }
        sqlQuery = [];
        sqlQuery.push('SELECT * ' + sql + WHERE + 'ORDER BY ' + $scope.orderBy + ' ' + ($scope.orderbyType ? 'ASC' : 'DESC') + ' limit ' + $scope.limit + ' OFFSET ' + $scope.offset);
        sqlQuery.push('SELECT count(*) AS rowCount ' + sql + WHERE);
        sqlQuery.push("SELECT * FROM `staff_name`");
        query.sqll(sqlQuery).then(function (response) {
            response[0].status == 200 ? $scope.data = response[0].data : $scope.data = [];
            response[1].status == 200 ? $scope.count = response[1].data[0].rowCount : rowCount = 0;
            response[2].status == 200 ? $scope.dataName = response[2].data : $scope.data = [];
            var count
            parseInt($scope.count) > parseInt($scope.limit) ? count = parseInt($scope.count) / parseInt($scope.limit) : count = 1;
            $scope.rowCount = [];
            for (let i = 0; i < count; i++) {
                $scope.rowCount.push(i + 1);
            }
        })
    }

    $scope.nameSearch = function (name) {
        var data = '';
        if (name && name != '') {
            for (let i = 0; i < $scope.dataName.length; i++) {
                if (name == $scope.dataName[i].pch_id) {
                    data = $scope.dataName[i].name_ps; break;
                }
            }
        }
        return data;
    }

    $scope.subStatus = function (sid) {
        $scope.showId = sid
        $scope.showSub = '';
        modal.subData($scope).then(function (response) {
            if (response == '200') {
                $scope.getData();
            }
        });
    }

    // $scope.newStatus = function (status) {
    //     $scope.showId = status
    //     $scope.showSub = '';
    //     modal.newStatus($scope).then(function (response) {
    //         if ($scope.status == '1') {
    //             debugger
    //             $scope.getData();
    //         }
    //     });
    // }

    $scope.finStatus = function (sid) {
        $scope.showId = sid
        $scope.showSub = '';
        modal.finData($scope).then(function (response) {
            if (response == '200') {
                $scope.getData();
            }
        });
    }

    $scope.toShow = function () {
        $location.url('/show/19');
    }

    $scope.addPerson = function () {
        data = []
        data.push(
            "INSERT INTO `job`.`job` (`id`, `name`, `test`, `test2`) VALUES ('"
            + ($scope.data.length + 1) + "', '"
            + $scope.dataSet.name + "', '"
            + $scope.dataSet.test + "', '"
            + $scope.dataSet.test + "');"
        );
        query.sqll(data).then(function (response) {
            if (response[0].status == 200) {
                $scope.getData();
            }
        })
    };

    $scope.success = function (id) {
        sql = "UPDATE `potter_job` SET `status` = '4' WHERE `potter_job`.`job_id` = '" + id + "'";
        query.sql(sql).then(function (response) {
            $scope.getData();
        })
    }

    $scope.getData();
    checkSessionLogin();
});

