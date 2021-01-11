//控制层
app.controller('showroomController', function ($scope, $controller, $location, $filter, indexService, showroomService) {

    $controller('baseController', {$scope: $scope});//继承

    $scope.entity = {contents: []}
    //初始化加载内容
    $scope.init = function () {
        $(".myPagination").hide();
        var index = layer.load(2);
        //验证登录状态
        $scope.findActiveUser();
        $scope.findCaList();
        $scope.findLaList();
        $scope.findArtList();
        $scope.search(1, index);
    }

    //验证登录状态
    $scope.findActiveUser = function () {
        indexService.getLoginInfo().success(function (rs) {
            $scope.activeUser = rs;
        })
    };

    //退出登录
    $scope.logout = function () {
        indexService.logout().success(function (rs) {
            if (rs.success) {
                layer.msg("退出成功")
                $scope.activeUser = null;
            }
        })
    };

    //查询所有分类
    $scope.caList = [];
    $scope.findCaList = function () {
        showroomService.findCaList().success(
            function (rs) {
                $scope.caList = rs;
            }
        );
    }

    //查询所有标签
    $scope.laList = [];
    $scope.findLaList = function () {
        showroomService.findLaList().success(
            function (rs) {
                $scope.laList = rs;
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
    //设置状态
    $scope.setLaFk = function (lFk) {
        $(".myPagination").hide();
        $("#showPage").hide();
        $("#hidePage").show();
        var index = layer.load(2);
        $scope.searchEntity.lFk = lFk;
        $scope.search(1, index);
    }
    //设置排序
    $scope.setIsHot = function (isHot) {
        $(".myPagination").hide();
        $("#showPage").hide();
        $("#hidePage").show();
        var index = layer.load(2);
        $scope.searchEntity.isHot = isHot;
        $scope.search(1, index);
    }

    $scope.list = [];
    $scope.search = function (page, index) {
        /*scrollTo(0, 0);*/
        /*document.body.animate({'scrollTop':0},500);*/
        showroomService.search(page, $scope.pagination.pageSize, $scope.searchEntity).success(
            function (rs) {
                $scope.list = rs.entityList;
                $scope.setPage(page, rs.total);
                //日期转换
                for (var i = 0; i < $scope.list.length; i++) {
                    $scope.list[i].hotTime = $scope.list[i].hotTime.replace(' ', 'T');
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

        $scope.findArtList();
        var id = $location.search()['id'];
        if (isEmpty(id)) {
        } else {
            showroomService.findDetail(id).success(
                function (rs) {
                    $scope.entity = rs;
                    $scope.entity.contents = JSON.parse($scope.entity.contents);
                    /*$("#contents").html($scope.entity.contents);*/
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


    //查询6条最新艺术作品
    $scope.artList = [];
    $scope.artList1 = [];
    $scope.artList2 = [];
    $scope.findArtList = function () {
        indexService.findArtList().success(
            function (rs) {
                $scope.artList = rs;
                for (var i = 0; i < $scope.artList.length; i++) {
                    if (i < 2) {
                        $scope.artList2.push($scope.artList[i]);
                    } else {
                        $scope.artList1.push($scope.artList[i]);
                    }
                }
            }
        );
    }


    //重新加载页面
    $scope.reload = function (id) {
        window.location.href = "showroomDetail.html#?id=" + id;
        window.location.reload();
    }

});	