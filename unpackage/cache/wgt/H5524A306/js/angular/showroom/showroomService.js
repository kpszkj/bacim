//服务层
app.service('showroomService', function ($http) {

    //读取列表数据绑定到表单中
    this.findCaList = function () {
        return $http.get('showroom/findCaList.do');
    }

    //读取列表数据绑定到表单中
    this.findLaList = function () {
        return $http.get('showroom/findLaList.do');
    }

    //搜索
    this.search = function (page, rows, searchEntity) {
        return $http.post('showroom/search.do?page=' + page + "&rows=" + rows, searchEntity);
    }

    //查询详情
    this.findDetail = function (id) {
        return $http.get('showroom/findDetail.do?id=' + id);
    }

});