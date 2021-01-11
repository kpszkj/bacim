//服务层
app.service('ichService',function($http){

	//退出登录成功
	this.logout = function () {
		return $http.get('../../nuser/logout.do');
	}

	//获取登录信息
	this.getLoginInfo = function () {
		return $http.get('../../nuser/getLoginInfo.do');
	}

	//读取列表数据绑定到表单中
	/*this.findCaList=function(){
		return $http.get('../../ich/findCaList.do');
	}*/

	//搜索
	this.search=function(page,rows,searchEntity){
		return $http.post('../../ich/search.do?page='+page+"&rows="+rows, searchEntity);
	}

	//查询详情
	this.findDetail=function(id){
		return $http.get('../../ich/findDetail.do?id='+id);
	}

});