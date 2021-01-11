//控制层
app.controller('icherController', function ($scope, $controller, $location, $filter, icherService) {

    $controller('baseController', {$scope: $scope});//继承

    //初始化加载内容
    $scope.init = function () {
        $scope.search(1);
    }

    //查询所有分类
    /*$scope.caList = [];
    $scope.findCaList = function () {
        //alert(1)
        //$("#body").fadeIn();
        icherService.findCaList().success(
            function (rs) {
                $scope.caList = rs;
            }
        );
    }*/


    //查询全部
    //设置分类
    /*$scope.setCaFk = function (id) {
        $scope.searchEntity.caFk = id;
        $scope.search(1);
    }*/

    //定义搜索对象
    $scope.searchEntity = {};
    $scope.list = [];
    $scope.pagination.pageSize = 6;
    $scope.search = function (page) {
        scrollTo(0, 0);
        /*document.body.animate({'scrollTop':0},500);*/
        icherService.search(page, $scope.pagination.pageSize, $scope.searchEntity).success(
            function (rs) {
                $scope.list = rs.entityList;
                $scope.setPage(page, rs.total);
                //日期转换
                for (var i = 0; i < $scope.list.length; i++) {
                    $scope.list[i].hotTime = $scope.list[i].hotTime.replace(' ', 'T');
                    //替换caFk
                    /*for (var j = 0; j < $scope.caList.length; j++) {
                        if ($scope.list[i].caFk == $scope.caList[j].id) {
                            //alert(1)
                            $scope.list[i].caFk = $scope.caList[j].name;
                        }
                        //$scope.list[i].caFk=$scope.list[i].caFk.replace($scope.caList[j].id,$scope.caList[j].name);
                    }*/
                }
                /*for (var i = 0; i < $scope.list.length; i++) {
                    $scope.list[i].hotTime = $filter('date')($scope.entity.hotTime.replace(' ', 'T'), "yyyy-MM-dd");
                    //替换caFk
                    /!*for (var j = 0; j < $scope.caList.length; j++) {
                        if ($scope.list[i].caFk == $scope.caList[j].id) {
                            //alert(1)
                            $scope.list[i].caFk = $scope.caList[j].name;
                        }
                        //$scope.list[i].caFk=$scope.list[i].caFk.replace($scope.caList[j].id,$scope.caList[j].name);
                    }*!/

                }*/
            }
        );
    }


    //资讯详情
    $scope.findDetail = function () {
        var id = $location.search()['id'];
        if (isEmpty(id)) {
        } else {
            icherService.findDetail(id).success(
                function (rs) {
                    $scope.entity = rs;
                    // $("#contents").html($scope.entity.contents);
                    $scope.entity.hotTime = $filter('date')($scope.entity.hotTime.replace(' ', 'T'), "yyyy-MM-dd");
                    $scope.entity.contents = JSON.parse($scope.entity.contents);
                }
            );
        }
    }

});	