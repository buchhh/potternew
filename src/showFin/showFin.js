app.controller('showFinController', function ($scope, $http, $location, $route, $routeParams, query, modal,date) {
    // $scope.id = $routeParams.id;
    $scope.api = 'showFin';
    $scope.dataSet = {};
    $scope.dataSet.name = '';
    $scope.dataSet.test = '';
    $scope.dateS = new Date();
    $scope.dateE = new Date();
    console.log($scope.dateS);
    console.log($scope.dateE);
    // debugger
    $scope.getData = function (date) {
        var dateS = moment($scope.dateS, 'DD-MM-YYYY').format('YYYY-MM-DD') + ' 00:00:00';
        var dateE = moment($scope.dateE, 'DD-MM-YYYY').format('YYYY-MM-DD') + ' 23:59:59';
        sql = []
        sql.push(`
        SELECT * 
        FROM potter_job S 
        LEFT JOIN staff_name N ON N.pch_id = S.reqname
        LEFT JOIN status_job J ON S.status = J.status_id 
        WHERE S.status = 4 
        AND S.docdate BETWEEN '`+ dateS + `' AND '` + dateE + `' 
        ORDER BY S.job_id `);
        sql.push("SELECT * FROM `staff_name` ORDER BY id");
        query.sqll(sql).then(function (response) {

            response[0].status == 200 ? $scope.dataT = response[0].data : $scope.dataT = [];
            response[1].status == 200 ? $scope.dataName = response[1].data : $scope.dataName = [];
        })
    };

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

    $scope.dateDiff = function (START,END) {
        var data
        data = date.diff(START,END);
        return data
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

    $scope.delete = function (id) {
        data = []
        data.push(
            "DELETE FROM job WHERE id = '" + id + "'"
        );
        query.sqll(data).then(function (response) {
            if (response[0].status == 200) {
                $scope.getData();
            }
        });
    }
});

