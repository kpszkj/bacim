//控制层
app.controller('searchController', function ($scope, $controller, $location, $filter, searchService) {

    $controller('baseController', {$scope: $scope});//继承

    $scope.activeUser = {}

    //初始化加载内容
    $("#search").click(function () {
        var index = layer.load(2);
        $scope.search(index);
    })
    $scope.init = function () {
        $scope.searchEntity = {type: 0}
        var index = layer.load(2);
        $scope.search(index);
    }

    $scope.findActiveUser = function () {
        searchService.getLoginInfo().success(function (rs) {
            $scope.activeUser = rs;
        })
    };
    $scope.logout = function () {
        searchService.logout().success(function (rs) {
            if (rs.success) {
                $scope.activeUser = null;
                layer.msg(rs.message);
            }
        })
    };

    //设置查询类型
    $scope.setType = function (type) {
        $scope.searchEntity.type = type;
        $("#pageHide").show();
        $("#pageShow").hide();
        var index = layer.load(2);
        $scope.search(index);
    }

    $scope.pojoList = [];
    $scope.list = [];
    $scope.search = function (index) {
        $("#pageHide").show();
        $("#pageShow").hide();
        scrollTo(0, 0);
        /*document.body.animate({'scrollTop':0},500);*/
        if (isEmpty($scope.searchEntity.title)) {
            layer.msg("请在上方搜索框输入搜索内容！");
            layer.close(index);
            $("#pageShow").fadeIn();
            $("#pageHide").hide();
        } else {
            searchService.search(0, 0, $scope.searchEntity).success(
                function (rs) {
                    if (rs.total == 0 || rs.total == -1) {
                        $scope.list = [];
                        layer.msg("请输入搜索内容！");
                        $("#pageShow").fadeIn();
                        $("#pageHide").hide();
                        layer.close(index);
                    } else if (rs.total == 1) {
                        $scope.list = [];
                        $("#pageShow").fadeIn();
                        $("#pageHide").hide();
                        layer.msg("未找到相关内容！");
                        layer.close(index);
                    } else if (rs.total == 2) {
                        $scope.pojoList = rs.entityList;
                        $scope.reloadList(index);
                    }
                }
            );

        }
    }

    //重新加载页面
    $scope.reloadList = function (index) {
        $scope.list = [];
        if ($scope.searchEntity.type > 0 && $scope.pojoList.length > 0) {
            for (var i = 0; i < $scope.pojoList.length; i++) {
                if ($scope.pojoList[i].type == $scope.searchEntity.type) {
                    $scope.list.push($scope.pojoList[i]);
                }
            }
        } else {
            $scope.list = $scope.pojoList;
        }
        layer.close(index);
        $("#pageShow").fadeIn();
        $("#pageHide").hide();
    }

    //跳转到详情页
    $scope.toDetail = function (id, type) {
        var index = layer.load(2);
        if (type == 1) {
            window.open("requestprogram1.html#?id=" + id);
        } else if (type == 2) {
            window.open("activitydetail.html#?id=" + id);
            //window.location.href = "activityDetail.html#?id=" + id;
        } else if (type == 3) {
            window.open("publicpage.html#?id=" + id);
            //window.location.href = "trainDetail.html#?id=" + id;
        } else if (type == 4) {
            window.open("celebritypage.html#?id=" + id);
            //window.location.href = "celebrityDetail.html#?id=" + id;
        } else if (type == 5) {
            window.open("zfg.html#?id=" + id);
            //window.location.href = "culturalCenterDetail.html#?id=" + id;
        } else {
            setTimeout(function () {
                layer.msg("跳转失败！");
                layer.msg("请刷新页面重试。");
                layer.close(index);
            }, 200);
        }
        layer.close(index);
    }

});	