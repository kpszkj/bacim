//控制层
app.controller('moreController', function($scope, $controller, $location, $filter, moreService) {

	$controller('baseController', {
		$scope: $scope
	}); //继承

	$scope.type = 0;
	// 扩展API加载完毕，现在可以正常调用扩展API
	function plusReady() {
		//监听返回键
		plus.key.addEventListener('backbutton', function() {
			back();
		}, false);
		ws = plus.webview.currentWebview();
		setTimeout(createEmbed($scope.type), 500); //延迟创建子窗口避免影响窗口动画
	}

	$scope.init = function() {
		moreService.getAppUrl().success(function(rs) {
			$scope.type = rs;
			if (window.plus) {
				plusReady();
			} else {
				document.addEventListener('plusready', plusReady, false);
			}
		})

	}



});
