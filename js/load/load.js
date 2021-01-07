var ws = null;
//返回事件
function back(type) {
	ws.close(type, 500, null);
}
// 扩展API加载完毕，现在可以正常调用扩展API
function plusReady() {
	//监听返回键
	plus.key.addEventListener('backbutton', function() {
		back();
	}, false);
	ws = plus.webview.currentWebview();
}
// 判断扩展API是否准备，否则监听plusready事件
if (window.plus) {
	plusReady();
} else {
	document.addEventListener('plusready', plusReady, false);
}
