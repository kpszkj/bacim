//服务层
app.service('moreService', function ($http) {

    //搜索
    this.getAppUrl = function () {
        return $http.get(baseUrl + 'info/getAppUrl.do');
    }

});