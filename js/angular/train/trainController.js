//控制层
app.controller('trainController', function ($scope, $controller, $location, $filter, trainService) {

    $controller('baseController', {$scope: $scope});//继承

    //初始化加载内容
    $scope.init = function () {
        firstLoad();
        $scope.findCaList();
        $scope.search(1);
    }

    //查询所有分类
    $scope.caList = [];
    $scope.findCaList = function () {
        //alert(1)
        //$("#body").fadeIn();
        trainService.findCaList().success(
            function (rs) {
                $scope.caList = rs;
            }
        );
    }


    /*$scope.apply = function () {
        $scope.findActiveUser();
        if ($scope.activeUser.id > 0) {
            layer.msg("预约成功，耐心等待审核！");
        } else {
            layer.msg("预约失败，请先登录！");
            location.href = "login.html";
        }
    }*/


    //查询全部
    //定义搜索对象
    $scope.searchEntity = {};
    //设置分类
    $scope.setCaFk = function (id) {
        load();
        $scope.searchEntity.caFk = id;
        $scope.search(1);
    }
    //设置状态
    /* $scope.setKey1 = function (key1) {
         $(".myPagination").hide();
         $("#showPage").hide();
         $("#hidePage").show();
         var index = layer.load(2);
         $scope.searchEntity.key1 = key1;
         $scope.search(1, index);
     }*/

    $scope.list = [];
    $scope.pagination.pageSize = 9;
    $scope.search = function (page) {
        /*scrollTo(0, 0);*/
        /*document.body.animate({'scrollTop':0},500);*/
        trainService.search(page, $scope.pagination.pageSize, $scope.searchEntity).success(function (rs) {
                $scope.list = rs.entityList;
                $scope.setPage(page, rs.total);
                //日期转换
                for (var i = 0; i < $scope.list.length; i++) {
                    $scope.list[i].hotTime = $scope.list[i].hotTime.replace(' ', 'T');
                    $scope.list[i].startTime = $scope.list[i].startTime.replace(' ', 'T');
                    $scope.list[i].endTime = $scope.list[i].endTime.replace(' ', 'T');
                }
                /*for (var i = 0; i < $scope.list.length; i++) {
                    $scope.list[i].hotTime = $filter('date')($scope.entity.hotTime.replace(' ', 'T'), "yyyy-MM-dd");
                    //替换caFk
                    for (var j = 0; j < $scope.caList.length; j++) {
                        if ($scope.list[i].caFk == $scope.caList[j].id) {
                            //alert(1)
                            $scope.list[i].caFk = $scope.caList[j].name;
                        }
                        //$scope.list[i].caFk=$scope.list[i].caFk.replace($scope.caList[j].id,$scope.caList[j].name);
                    }
                }*/
                $scope.$apply();
                closeLoad();
            }
        );
    }


    //培训详情
    $scope.findDetail = function (id) {
        //页面加载
        loadDetail();

        trainService.findDetail(id).success(
            function (rs) {
                $scope.entity = rs;
                $("#contents").html($scope.entity.contents);
                $scope.entity.hotTime = $filter('date')($scope.entity.hotTime.replace(' ', 'T'), "yyyy-MM-dd");
                $scope.entity.startTime = $scope.entity.startTime.replace(' ', 'T');
                $scope.entity.endTime = $scope.entity.endTime.replace(' ', 'T');

                //替换caFk
                /*for (var j = 0; j < $scope.caList.length; j++) {
                    if ($scope.entity.caFk == $scope.caList[j].id) {
                        //alert(1)
                        $scope.entity.caFk = $scope.caList[j].name;
                    }
                    //$scope.list[i].caFk=$scope.list[i].caFk.replace($scope.caList[j].id,$scope.caList[j].name);
                }*/
                //页面显示
                $scope.$apply();
                setTimeout(function () {
                    closeLoad();
                    popup();
                }, 200)

            });

    }

    //获取培训状态
    $scope.getType = function () {
        if ($scope.entity != null) {
            var now = new Date().format("yyyy-MM-dd hh:mm:ss");
            if ($scope.entity.applyTime > now) {
                return 0;
            } else if ($scope.entity.endTime < now) {
                return 2;
            } else {
                return 1;
            }
        }
        return 2;
    }

});