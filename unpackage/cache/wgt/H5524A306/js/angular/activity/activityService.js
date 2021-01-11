//服务层
app.service('activityService', function ($http) {

    //读取列表数据绑定到表单中
    this.findCaList = function () {
        return $http.get('activity/findCaList.do');
    }

    //搜索
    this.search = function (page, rows, searchEntity) {
        return $http.post('activity/search.do?page=' + page + "&rows=" + rows, searchEntity);
    }

    //查询详情
    this.findDetail = function (id) {
        return $http.get('activity/findDetail.do?id=' + id);
    }

    //报名申请
    this.apply = function (id) {
        return $http.get('activity/apply.do?id=' + id);
    }

});