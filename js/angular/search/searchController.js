//控制层
app.controller('searchController', function ($scope, $controller, $location, $filter, searchService, realtimeinfoService, trainService, showroomService, celebrityService, ichService) {

    $controller('baseController', {$scope: $scope});//继承

    /*$scope.activeUser = {}*/

    //初始化加载内容
    $("#search").click(function () {
        load();
        $scope.search();
    })
    $scope.init = function () {
        $scope.searchEntity = {type: 0}
        firstLoad();
        $scope.search();
    }

    /*$scope.findActiveUser = function () {
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
    };*/

    //设置查询类型
    $scope.setType = function (type) {
        $scope.searchEntity.type = type;
        load();
        $scope.search();
    }

    $scope.pojoList = [];
    $scope.list = [];
    $scope.search = function () {
        load();
        /*scrollTo(0, 0);*/
        /*document.body.animate({'scrollTop':0},500);*/
        if (isEmpty($scope.searchEntity.title)) {
            //alert("请在上方搜索框输入搜索内容！");
            $scope.info = "请在上方搜索框输入搜索内容！";
            setTimeout(function () {
                closeLoad();
            }, 200);
        } else {
            searchService.search(0, 0, $scope.searchEntity).success(
                function (rs) {
                    if (rs.total == 0 || rs.total == -1) {
                        $scope.list = [];
                        //closeLoad();
                        $scope.info = "请输入搜索内容！";
                        setTimeout(function () {
                            closeLoad();
                        }, 200);
                    } else if (rs.total == 1) {
                        $scope.list = [];
                        $scope.info = "未找到相关内容！";
                        setTimeout(function () {
                            closeLoad();
                        }, 200);
                    } else if (rs.total == 2) {
                        $scope.pojoList = rs.entityList;
                        $scope.reloadList();
                    }
                }
            );

        }
    }

    //重新加载页面
    $scope.reloadList = function () {
        load();
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
        $scope.info = "搜索“" + $scope.searchEntity.title + "”，共找到" + $scope.list.length + "条内容";
        setTimeout(function () {
            closeLoad();
        }, 200);
        //closeLoad();
    }

    //显示详情页
    $scope.findDetail = function (id, type) {
        firstLoad();
        if (type == 1) {
            realtimeinfoService.findDetail(id).success(function (rs) {
                $scope.entity = rs;
                $scope.entity.hotTime = $scope.entity.hotTime.replace(' ', 'T');
                $("#contents").html($scope.entity.contents);
                $scope.$apply();
                setTimeout(function () {
                    closeLoad();
                    popup1();
                }, 200)
            });
        } else if (type == 2) {
            trainService.findDetail(id).success(
                function (rs) {
                    $scope.entity = rs;
                    $("#contents2").html($scope.entity.contents);
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
                        popup2();
                    }, 200)

                });
        } else if (type == 3) {
            showroomService.findDetail(id).success(
                function (rs) {
                    $scope.entity = rs;
                    $scope.entity.contents = JSON.parse($scope.entity.contents);
                    /*$("#contents").html($scope.entity.contents);*/
                    $scope.entity.hotTime = $filter('date')($scope.entity.hotTime.replace(' ', 'T'), "yyyy-MM-dd");
                    //页面显示
                    setTimeout(function () {
                        closeLoad();
                        popup3();
                    }, 200);
                });
        } else if (type == 4) {
            celebrityService.findDetail(id).success(
                function (rs) {
                    $scope.entity = rs;
                    $("#contents").html($scope.entity.contents);
                    $scope.entity.hotTime = $filter('date')($scope.entity.hotTime.replace(' ', 'T'), "yyyy-MM-dd");
                    //页面显示
                    setTimeout(function () {
                        closeLoad();
                        popup4();
                    }, 200)
                });
        } else if (type == 5) {
            ichService.findDetail(id).success(
                function (rs) {
                    $scope.entity = rs;
                    /*$("#contents").html($scope.entity.contents);*/
                    $scope.entity.hotTime = $filter('date')($scope.entity.hotTime.replace(' ', 'T'), "yyyy-MM-dd");
                    $scope.entity.contents = JSON.parse($scope.entity.contents);

                    var contents = "";
                    for (var i = 0; i < $scope.entity.contents.length; i++) {
                        contents = contents + " <div class=\"swiper-slide swiper-lazy\" data-background=\"" + $scope.entity.contents[i].src + "\" data-theme=\"gray\">\n" +
                            "                                <a href=\"javascript:\"></a>\n" +
                            "                            </div>"
                    }
                    $(".swiper-wrapper").html(contents);

                    new Swiper('.swiper-container', {
                        loop: true,
                        autoplay: {
                            delay: 5000,
                            disableOnInteraction: false,
                        },
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        },
                        on: {
                            slideChangeTransitionEnd: function () {
                                var theme = $('.swiper-slide-active').data('theme')
                                $('#banner').attr('class', theme)
                            }
                        },
                        lazy: {
                            loadPrevNext: true
                        }
                    })

                    setTimeout(function () {
                        closeLoad();
                        popup5();
                    }, 200);
                });
        } else {
            /* setTimeout(function () {
                 layer.msg("跳转失败！");
                 layer.msg("请刷新页面重试。");
                 layer.close(index);
             }, 200);*/
        }
        closeLoad();
        //layer.close(index);
    }
    //跳转到详情页
    /*$scope.toDetail = function (id, type) {
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
    }*/

});	