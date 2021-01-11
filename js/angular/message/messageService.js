//服务层
app.service('messageService', function ($http) {
    //搜索
    this.leaveMessage = function (info) {
        return $http.post(baseUrl + 'message/leaveMessage.do?info=' + info);
    }

    //搜索
    this.search = function (page, rows, searchEntity) {
        return $http.post(baseUrl + 'message/search.do?page=' + page + "&rows=" + rows, searchEntity);
    }
});