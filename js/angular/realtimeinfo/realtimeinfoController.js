//控制层
app.controller('realtimeinfoController', function ($scope, $controller, realtimeinfoService) {

    $controller('baseController', {$scope: $scope});//继承

    //初始化加载内容
    $scope.init = function () {
        load();
        $scope.findCaList();
        $scope.search(1);
    }

    //查询所有分类
    $scope.findCaList = function () {
        $scope.caList = [];
        realtimeinfoService.findCaList().success(
            function (rs) {
                $scope.caList = rs;
            }
        );
    }

    //查询全部
    //定义搜索对象
    $scope.searchEntity = {};

    //设置分类
    $scope.setCaFk = function (id) {
        load();
        $scope.searchEntity.caFk = id;
        $scope.search(1);
    }

    $scope.list = [];
    $scope.pagination.pageSize = 5;
    $scope.search = function (page) {
        realtimeinfoService.search(page, $scope.pagination.pageSize, $scope.searchEntity).success(function (rs) {
                $scope.list = rs.entityList;
                $scope.setPage(page, rs.total);
                //日期转换
                for (var i = 0; i < $scope.list.length; i++) {
                    $scope.list[i].hotTime = $scope.list[i].hotTime.replace(' ', 'T');
                }
                for (var i = 0; i < $scope.list.length; i++) {
                    //替换caFk
                    for (var j = 0; j < $scope.caList.length; j++) {
                        if ($scope.list[i].caFk == $scope.caList[j].id) {
                            //alert(1)
                            $scope.list[i].caFk = $scope.caList[j].name;
                        }
                        //$scope.list[i].caFk=$scope.list[i].caFk.replace($scope.caList[j].id,$scope.caList[j].name);
                    }
                }
                $scope.$apply();
                closeLoad();
            }
        );
    }


    $scope.searchMore = function () {
        load();
        $scope.pagination.pageNum++;

        realtimeinfoService.search($scope.pagination.pageNum, $scope.pagination.pageSize, $scope.searchEntity).success(function (rs) {
                $scope.moreList = rs.entityList;
                //日期转换
                for (var i = 0; i < $scope.moreList.length; i++) {
                    $scope.moreList[i].hotTime = $scope.moreList[i].hotTime.replace(' ', 'T');
                    $scope.list.push($scope.moreList[i]);
                }
                /*for (var i = 0; i < $scope.list.length; i++) {
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

    //资讯详情
    $scope.findDetail = function (id) {
        //页面加载
        realtimeinfoService.findDetail(id).success(function (rs) {
            $scope.entity = rs;
            $scope.entity.hotTime = $scope.entity.hotTime.replace(' ', 'T');
            $("#contents").html($scope.entity.contents);
            $scope.$apply();
            popup();
        });
    }

});	