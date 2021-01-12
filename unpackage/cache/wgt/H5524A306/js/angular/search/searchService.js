//服务层
app.service('searchService', function ($http) {

    //搜索
    this.search = function (page, rows, searchEntity) {
        return $http.post(baseUrl+'search/findSearchList.do?page=' + page + "&rows=" + rows, searchEntity);
    }

});