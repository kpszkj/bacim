//服务层
app.service('trainService',function($http){

	//读取列表数据绑定到表单中
	this.findCaList=function(){
		return $http.get(baseUrl+'train/findCaList.do');
	}

	//搜索
	this.search=function(page,rows,searchEntity){
		return $http.post(baseUrl+'train/search.do?page='+page+"&rows="+rows, searchEntity);
	}

	//查询详情
	this.findDetail=function(id){
		return $http.get(baseUrl+'train/findDetail.do?id='+id);
	}

});