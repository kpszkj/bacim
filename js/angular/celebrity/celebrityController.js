//控制层
app.controller('celebrityController', function ($scope, $controller, $location, $filter, indexService, celebrityService) {

    $controller('baseController', {$scope: $scope});//继承

    //初始化加载内容
    $scope.init = function () {
        $(".myPagination").hide();
        var index = layer.load(2);
        //验证登录状态
        $scope.findActiveUser();
        $scope.findCaList();
        $scope.search(1, index);
    }

    //验证登录状态
    $scope.findActiveUser = function () {
        indexService.getLoginInfo().success(function (rs) {
            $scope.activeUser = rs;
        })
    };

    $scope.logout = function () {
        indexService.logout().success(function (rs) {
            if (rs.success) {
                $scope.activeUser = null;
                layer.msg(rs.message);
            }
        })
    };

    //查询所有分类
    $scope.caList = [];
    $scope.findCaList = function () {
        //alert(1)
        //$("#body").fadeIn();
        celebrityService.findCaList().success(
            function (rs) {
                $scope.caList = rs;
            }
        );
    }


    //查询全部
    //定义搜索对象
    $scope.searchEntity = {isHot: true};
    //设置分类
    $scope.setCaFk = function (id) {
        $(".myPagination").hide();
        $("#showPage").hide();
        $("#hidePage").show();
        var index = layer.load(2);
        $scope.searchEntity.caFk = id;
        $scope.search(1, index);
    }

    $scope.list = [];
    $scope.pagination.pageSize = 8;
    $scope.search = function (page, index) {
        scrollTo(0, 0);
        /*document.body.animate({'scrollTop':0},500);*/
        celebrityService.search(page, $scope.pagination.pageSize, $scope.searchEntity).success(
            function (rs) {
                $scope.list = rs.entityList;
                $scope.setPage(page, rs.total);
                //日期转换
                for (var i = 0; i < $scope.list.length; i++) {
                    $scope.list[i].hotTime = $scope.list[i].hotTime.replace(' ', 'T');
                    //替换caFk
                    for (var j = 0; j < $scope.caList.length; j++) {
                        if ($scope.list[i].caFk == $scope.caList[j].id) {
                            //alert(1)
                            $scope.list[i].caFk = $scope.caList[j].name;
                        }
                        //$scope.list[i].caFk=$scope.list[i].caFk.replace($scope.caList[j].id,$scope.caList[j].name);
                    }
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
                $scope.$apply();
                layer.close(index);
                $("#showPage").show();
                $("#hidePage").hide();
                $(".myPagination").show();
            }
        );
    }


    //资讯详情
    $scope.findDetail = function () {
        //页面加载
        var index = layer.load(2);
        $("html").hide();
        $(".clearfix").hide();
        $("#hidePage").show();

        var id = $location.search()['id'];
        if (isEmpty(id)) {
        } else {
            celebrityService.findDetail(id).success(
                function (rs) {
                    $scope.entity = rs;
                    $("#contents").html($scope.entity.contents);
                    $scope.entity.hotTime = $filter('date')($scope.entity.hotTime.replace(' ', 'T'), "yyyy-MM-dd");
                    //页面显示
                    layer.close(index);
                    $(".clearfix").show();
                    $("#hidePage").hide();
                    $("html").show();
                }
            );
        }
    }

});	