//控制层
app.controller('messageController', function ($scope, $controller, messageService) {

    $controller('baseController', {$scope: $scope});//继承

    //初始化加载内容
    $scope.init = function () {
        firstLoad();
        $scope.search(1);
    }

    //定义搜索对象
    $scope.searchEntity = {};

    $scope.list = [];
    $scope.pagination.pageSize = 3;
    $scope.search = function (page) {
        messageService.search(page, $scope.pagination.pageSize, $scope.searchEntity).success(function (rs) {
                $scope.list = rs.entityList;
                $scope.setPage(page, rs.total);
                //日期转换
                for (var i = 0; i < $scope.list.length; i++) {
                    $scope.list[i].hotTime = $scope.list[i].hotTime.replace(' ', 'T');
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

    $scope.searchMore = function () {
        load();
        $scope.pagination.pageNum++;

        messageService.search($scope.pagination.pageNum, $scope.pagination.pageSize, $scope.searchEntity).success(function (rs) {
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
    $scope.leaveMessage = function () {
        //alert(1)
        loadDetail();
        $scope.$apply();
        if (isEmpty($("#info").val())||$("#info").val()=="") {
            closeLoad();
            setTimeout(function () {
                alert(rs.message);
            }, 200)
            alert("留言不能为空！");
            return;
        }
        //页面加载
        var info = "" + $("#info").val();
        messageService.leaveMessage(info).success(function (rs) {
            /*$scope.entity = rs;
            $scope.entity.hotTime = $scope.entity.hotTime.replace(' ', 'T');
            $("#contents").html($scope.entity.contents);*/
            $scope.$apply();
            closeLoad();
            setTimeout(function () {
                alert(rs.message);
            }, 200)
        });
    }

});	