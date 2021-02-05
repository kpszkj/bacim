//控制层
app.controller('ichController', function ($scope, $controller, $location, $filter, ichService) {

    $controller('baseController', {$scope: $scope});//继承

    $scope.entity = {contents: []}
    //初始化加载内容
    $scope.init = function () {
        firstLoad();
        /*$scope.findCaList();*/
        $scope.search(1);
    }

    //查询所有分类
    /*$scope.caList = [];
    $scope.findCaList = function () {
        //alert(1)
        //$("#body").fadeIn();
        ichService.findCaList().success(
            function (rs) {
                $scope.caList = rs;
            }
        );
    }*/


    //查询全部
    //定义搜索对象
    /*$scope.searchEntity = {isHot: true};*/
    //设置分类
    /*$scope.setCaFk = function (id) {
        $scope.searchEntity.caFk = id;
        $scope.search(1);
    }*/

    $scope.list = [];
    $scope.searchEntity = {};
    $scope.pagination.pageSize = 6;
    $scope.search = function (page) {
        //scrollTo(0, 0);
        /*document.body.animate({'scrollTop':0},500);*/
        ichService.search(page, $scope.pagination.pageSize, $scope.searchEntity).success(
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

                $scope.$apply();
                closeLoad();
            }
        );
    }


    //资讯详情
    $scope.findDetail = function (id) {
        loadDetail();

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
                    /*autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                    },*/
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
                    popup();
                }, 200);
            });

    }


});	