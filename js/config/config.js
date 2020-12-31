/* app基本配置 */

// 配置数据访问基本路径
var baseUrl = "http://cim.kpszkj.cn";
// 配置当前文化馆标识
var cid = 2;
//配置

/* app基本配置结束 */

/* 配置webview */

var wv;

function initWebView() {
	wv = plus.webview;
}

//打开新页面
function openView(url, vid) {
	createWithoutTitle(url, vid, {
		backButtonAutoControl: 'true',
	}).show('pop-in');
}

//返回上一级页面
function back() {
	ws = plus.webview.currentWebview();
	ws.close('pop-out', 500, null);
}

// 扩展API加载完毕，现在可以正常调用扩展API 
function plusReady() {
	initWebView();
	ws = plus.webview.currentWebview();
	setTimeout(ws.show(), 500); //延迟创建子窗口避免影响窗口动画
	//监听返回键
	plus.key.addEventListener('backbutton', function() {
		back();
	}, false);
}

// 判断扩展API是否准备，否则监听plusready事件
function initPlus() {
	//取消浏览器的所有事件，使得active的样式在手机上正常生效
	document.addEventListener('touchstart', function() {
		return false;
	}, true);
	// 禁止选择
	document.oncontextmenu = function() {
		return false;
	};
	if (window.plus) {
		plusReady();
	} else {
		document.addEventListener('plusready', plusReady, false);
	}
}


/* 配置webview结束 */
