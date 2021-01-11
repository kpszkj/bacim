//服务层
app.service('ichService',function($http){

	//搜索
	this.search=function(page,rows,searchEntity){
		return $http.post(baseUrl+'ich/search.do?page='+page+"&rows="+rows, searchEntity);
	}

	//查询详情
	this.findDetail=function(id){
		return $http.get(baseUrl+'ich/findDetail.do?id='+id);
	}

});