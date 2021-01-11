//服务层
app.service('celebrityService',function($http){

	//读取列表数据绑定到表单中
	this.findCaList=function(){
		return $http.get('celebrity/findCaList.do');
	}

	//搜索
	this.search=function(page,rows,searchEntity){
		return $http.post('celebrity/search.do?page='+page+"&rows="+rows, searchEntity);
	}

	//查询详情
	this.findDetail=function(id){
		return $http.get('celebrity/findDetail.do?id='+id);
	}

});