//控制层
app.controller('activityController', function ($scope, $controller, $location, $filter, indexService, activityService) {

    $controller('baseController', {$scope: $scope});//继承


    $scope.activeUser = {}
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


    $scope.apply = function (id) {
        var index = layer.load(2);

        indexService.getLoginInfo().success(function (rs) {
            $scope.activeUser = rs;
            if (null != $scope.activeUser && 0 < $scope.activeUser.id) {
                activityService.apply(id).success(function (rs) {
                    layer.close(index);
                    if (rs.success) {
                        layer.msg(rs.message, {icon: 6});
                    } else {
                        layer.msg(rs.message, {icon: 5});
                    }
                })
                /*alert(1)
                alert(JSON.stringify($scope.activeUser))
                alert($scope.activeUser.id)
                layer.msg("预约失败，请先登录！");*/
            } else {
                layer.close(index);
                //alert(1)
                //alert(JSON.stringify($scope.activeUser))
                //alert($scope.activeUser.id)
                layer.msg("预约失败，请先登录！");
                setTimeout(function () {
                    location.href = "login.html";
                }, 1500);
            }
        })
    }

    //查询所有分类
    $scope.caList = [];
    $scope.findCaList = function () {
        //alert(1)
        //$("#body").fadeIn();
        activityService.findCaList().success(
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
    //设置状态
    $scope.setKey1 = function (key1) {
        $(".myPagination").hide();
        $("#showPage").hide();
        $("#hidePage").show();
        var index = layer.load(2);
        $scope.searchEntity.key1 = key1;
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
        scrollTo(0, 0);
        /*document.body.animate({'scrollTop':0},500);*/
        activityService.search(page, $scope.pagination.pageSize, $scope.searchEntity).success(function (rs) {
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

        $scope.findCaList();
        $scope.findActivityList();
        var id = $location.search()['id'];
        if (isEmpty(id)) {
        } else {
            activityService.findDetail(id).success(
                function (rs) {
                    $scope.entity = rs;
                    $("#contents").html($scope.entity.contents);
                    $scope.entity.hotTime = $filter('date')($scope.entity.hotTime.replace(' ', 'T'), "yyyy-MM-dd");
                    //替换caFk
                    for (var j = 0; j < $scope.caList.length; j++) {
                        if ($scope.entity.caFk == $scope.caList[j].id) {
                            //alert(1)
                            $scope.entity.caFk = $scope.caList[j].name;
                        }
                        //$scope.list[i].caFk=$scope.list[i].caFk.replace($scope.caList[j].id,$scope.caList[j].name);
                    }
                    //页面显示
                    layer.close(index);
                    $(".clearfix").show();
                    $("#hidePage").hide();
                    $("html").show();
                }
            );
        }
    }

    //获取活动状态
    $scope.getType = function () {
        if ($scope.entity != null) {
            var now = new Date().format("yyyy-MM-dd hh:mm:ss");
            /*console.log(now)
            console.log("现在"+$scope.entity.applyTime)
            console.log($scope.entity.applyTime > now)*/
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

    //查询n条最新活动
    $scope.activityList = [];
    $scope.findActivityList = function () {
        indexService.findActivityList().success(
            function (rs) {
                $scope.allActivityList = rs;
                for (var i = 0; i < $scope.allActivityList.length; i++) {
                    if (i < 3) {
                        $scope.activityList.push($scope.allActivityList[i]);
                    }
                }
            }
        );
    }


    //重新加载页面
    $scope.reload = function (id) {
        window.location.href = "activityDetail.html#?id=" + id;
        window.location.reload();
    }

});	