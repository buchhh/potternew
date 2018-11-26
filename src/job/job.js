app.controller('jobController', function ($scope, $uibModal, $http, $location, query, modal) {
    $scope.chkRadio = 'id';
    $scope.api = 'job';
    $scope.reset = function () {
        $scope.job = "./img/line1.png";
        $scope.img1 = "./img/ptd.png"; $scope.img1ST = false;
        $scope.img2 = "./img/chk.png"; $scope.img2ST = false;
        $scope.img3 = "./img/ped.png"; $scope.img3ST = false;
        $scope.img4 = "./img/w4.png"; $scope.img4ST = false;
        $scope.img5 = "./img/w3m.png"; $scope.img5ST = false;
        $scope.img6 = "./img/w3f.png"; $scope.img6ST = false;
        $scope.img7 = "./img/pp.png"; $scope.img7ST = false;
        $scope.img8 = "./img/lr.png"; $scope.img8ST = false;
        $scope.img9 = "./img/icu.png"; $scope.img9ST = false;
        $scope.img10 = "./img/or.png"; $scope.img10ST = false;
        $scope.img11 = "./img/ncd.png"; $scope.img11ST = false;
        $scope.img12 = "./img/dnt.png"; $scope.img12ST = false;
        $scope.img13 = "./img/opd.png"; $scope.img13ST = false;
        $scope.img14 = "./img/er.png"; $scope.img14ST = false;
        // -----------------------------------------job------------------------------------------------------        
        $scope.img15 = "./img/wellchair.png"; $scope.img15ST = false;
        $scope.img16 = "./img/stretcher.png"; $scope.img16ST = false;
        $scope.img17 = "./img/well+o2.png"; $scope.img17ST = false;
        $scope.img18 = "./img/stret+o2.png"; $scope.img18ST = false;
        $scope.img19 = "./img/potter.png"; $scope.img19ST = false;
        // -----------------------------------------job------------------------------------------------------ 
        $scope.dataDepartment = "";
        $scope.dataJob = "";
        $scope.user = "";
        $scope.id = "";
        $scope.showName = "";
    }

    $scope.setImg = function (data) {
        $scope.dataDepartment = data;
        data == 'แผนกกายภาพบำบัด' && $scope.img1ST ? $scope.img1 = "./img/ptd1.png" : $scope.img1 = "./img/ptd.png";
        data == 'ตรวจสุขภาพ' && $scope.img2ST ? $scope.img2 = "./img/chk1.png" : $scope.img2 = "./img/chk.png";
        data == 'แผนกกุมารเวชกรรม' && $scope.img3ST ? $scope.img3 = "./img/ped1.png" : $scope.img3 = "./img/ped.png";
        data == 'หอผู้ป่วยในชั้น 4' && $scope.img4ST ? $scope.img4 = "./img/w41.png" : $scope.img4 = "./img/w4.png";
        data == 'หอผู้ป่วยสามัญชาย' && $scope.img5ST ? $scope.img5 = "./img/w3m1.png" : $scope.img5 = "./img/w3m.png";
        data == 'หอผู้ป่วยสามัญหญิง' && $scope.img6ST ? $scope.img6 = "./img/w3f1.png" : $scope.img6 = "./img/w3f.png";
        data == 'หอผู้ป่วยแม่หลังคลอด' && $scope.img7ST ? $scope.img7 = "./img/pp1.png" : $scope.img7 = "./img/pp.png";
        data == 'แผนกห้องคลอด' && $scope.img8ST ? $scope.img8 = "./img/lr1.png" : $scope.img8 = "./img/lr.png";
        data == 'แผนกผู้ป่วยวิกฤติ' && $scope.img9ST ? $scope.img9 = "./img/icu1.png" : $scope.img9 = "./img/icu.png";
        data == 'แผนกห้องผ่าตัด' && $scope.img10ST ? $scope.img10 = "./img/or1.png" : $scope.img10 = "./img/or.png";
        data == 'คลินิก NCD' && $scope.img11ST ? $scope.img11 = "./img/ncd1.png" : $scope.img11 = "./img/ncd.png";
        data == 'แผนกทันตกรรม' && $scope.img12ST ? $scope.img12 = "./img/dnt1.png" : $scope.img12 = "./img/dnt.png";
        data == 'แผนกผู้ป่วยนอก' && $scope.img13ST ? $scope.img13 = "./img/opd1.png" : $scope.img13 = "./img/opd.png";
        data == 'แผนกห้องฉุกเฉิน' && $scope.img14ST ? $scope.img14 = "./img/er1.png" : $scope.img14 = "./img/er.png";
        // ----------------------------------------------job-------------------------------------------------------------------
        // ----------------------------------------------job-------------------------------------------------------------------       
    }

    $scope.setImg1 = function (data1) {
        $scope.dataJob = data1;
        data1 == 'รถนั่ง' && $scope.img15ST ? $scope.img15 = "./img/wellchair-1.png" : $scope.img15 = "./img/wellchair.png";
        data1 == 'รถนอน' && $scope.img16ST ? $scope.img16 = "./img/stretcher-1.png" : $scope.img16 = "./img/stretcher.png";
        data1 == 'รถนั่ง+อ๊อกซิเจน' && $scope.img17ST ? $scope.img17 = "./img/well+o2-1.png" : $scope.img17 = "./img/well+o2.png";
        data1 == 'รถนอน+อ๊อกซิเจน' && $scope.img18ST ? $scope.img18 = "./img/stret+o2-1.png" : $scope.img18 = "./img/stret+o2.png";
        data1 == 'เจ้าหน้าที่' && $scope.img19ST ? $scope.img19 = "./img/potter-1.png" : $scope.img19 = "./img/potter.png";
    }

    $scope.checkKeyId = function (event) {
        // debugger
        if (event.keyCode == '13') {
            $scope.searchName();
        }
    }

    $scope.checkKeyName = function (event) {
        // debugger
        if (event.keyCode == '13') {
            $scope.chkSearchName($scope.ngModelOptionsSelected);
        }
    }

    $scope.bntcheck = function(){
        // debugger
        if ($scope.chkRadio == 'id') {
            $scope.searchName();
        } else {
            $scope.chkSearchName($scope.ngModelOptionsSelected);
        }
    }

    $scope.searchName = function () {
        // debugger
        name = $scope.id ? $scope.id : '';
        $scope.Msg = $scope.id ? null : 'ไม่มีข้อมูล';
        // มันคือ query ที่จะเอา id ไปค้นหาชื่อมาโชว์
        if (name) {
            sql = "SELECT * FROM `staff_name` WHERE pch_id='" + name + "'";
            query.sql(sql).then(function (response) {
                if (response.status == 200) {
                    if (response.data == '') {
                        $scope.Msg = 'ไม่มีข้อมูล'
                    } else {
                        $scope.Msg = null
                    } 
                    $scope.showName = response.data[0].name_ps;
                    $scope.name = response.data[0].pch_id;
                } else {
                    $scope.Msg = 'ไม่มีข้อมูล'
                    $scope.showName = ''
                }
            })
        } else {
            $scope.Msg = 'ไม่มีข้อมูล'
        }
    }

    $scope.save = function () {
        // debugger
        sql = "SELECT job_id FROM `potter_job`order by job_id desc limit 1";
        if ($scope.dataDepartment && $scope.dataJob && $scope.showName) {
            Promise.all([query.sql(sql)]).then(function (res) {
                // debugger
                max = res[0].data && res[0].data[0].job_id ? res[0].data[0].job_id : null;
                if (max) {
                    // ==================================================
                    var str = max;// ดาต้าที่จะเอามา run ใหม่
                    var len = max.length; // จำนวนข้อมูล id
                    var res = str.substr(1)// ค่าที่มากที่สุด id
                    var char = str.substr(0, 1)// ตัวอักษรตัวแรก id
                    res = parseInt(res) + 1
                    var len2 = res.toString()
                    len1 = char.length
                    len2 = len2.length
                    sumLen = len1 + len2;
                    sumMax = len - sumLen;
                    var maxID = char;
                    for (let i = 0; i < sumMax; i++) {
                        maxID += '0';
                    }
                    maxID += res;
                    // ==================================================
                } else {
                    maxID = 'J000000001';
                }
                $scope.status = '1';
                var now = $scope.urgent == true ? '1' : '0';
                date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                sql = "INSERT INTO potter_job(job_id, docdate, ward, job,reqname,status,potter_now) VALUES ('"
                    + maxID + "', '"
                    + date + "', '"
                    + $scope.dataDepartment + "', '"
                    + $scope.dataJob + "', '"
                    + $scope.name + "', '"
                    + $scope.status + "', '"
                    + now + "');"

                query.sql(sql).then(function (response) {

                    if (response.status == 200) {
                        //debugger
                        $scope.statusInsert = true;
                        $scope.MsgName = "เรียบร้อย";
                        modal.success($scope);
                        $scope.reset();
                    } else {
                        $scope.MsgName = "error";
                        modal.error($scope);
                    }
                })
            })
        } else {
            $scope.MsgName = "กรุณาใส่ข้อมูลให้ครบถ้วน";
            modal.error($scope);
        }

    }

    $scope.radio = function (type) {
        $scope.Msg = '';
        $scope.showName = '';
        $scope.chkRadio = type;
        // debugger
        if (type == 'id') {
            $scope.ngModelOptionsSelected = '';
        } else {
            $scope.id = '';
        }
    }

    $scope.chkSearchName = function (name) {
        // debugger
        var data = '';
        if (name && name != '') {
            for (let i = 0; i < $scope.dataName.length; i++) {
                if (name == $scope.dataName[i].name_ps) {
                    data = $scope.dataName[i].pch_id;
                    $scope.showName = $scope.dataName[i].name_ps;
                    break;
                }
            }
        }
        $scope.name = data;
    }

    $scope.search = function () {
        sql = "SELECT * FROM `staff_name`";
        query.sql(sql).then(function (response) {
            $scope.dataName = response.data;
            $scope.nameE = []
            response.data.forEach(element => {
                $scope.nameE.push(element.name_ps);
            });

        })
    }

    $scope.search();
    $scope.reset();
});