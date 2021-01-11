//服务层
app.service('searchService', function ($http) {

    //退出登录成功
    this.logout = function () {
        return $http.get('nuser/logout.do');
    }

    //获取登录信息
    this.getLoginInfo = function () {
        return $http.get('nuser/getLoginInfo.do');
    }

    //搜索
    this.search = function (page, rows, searchEntity) {
        return $http.post('search/findSearchList.do?page=' + page + "&rows=" + rows, searchEntity);
    }

});