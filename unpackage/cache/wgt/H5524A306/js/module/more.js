var ws = null,
	embed = null;
// 扩展API加载完毕，现在可以正常调用扩展API

// 创建子Webview
function createEmbed(type) {
	//var url = url || 'http://app.fqxwhy.cn/';
	var url;
	if (type == 1) {
		url = "http://baapp.kpszkj.cn";
	} else if (type == 2) {
		url = "http://app.baxwhy.cn";
	}
	//alert(url);
	var topoffset = '44px';
	plus.nativeUI.showWaiting('', {
		style: 'black',
		modal: false,
		background: 'rgba(0,0,0,0)'
	});
	embed = plus.webview.create(url, 'embed', {
		top: topoffset,
		bottom: '0px',
		position: 'dock',
		dock: 'bottom',
		bounce: 'vertical'
	});
	ws.append(embed);
	embed.addEventListener('loaded', function() {
		plus.nativeUI.closeWaiting();
	}, false);
	embed.addEventListener('loading', function() {
		plus.nativeUI.showWaiting('', {
			style: 'black',
			modal: false,
			background: 'rgba(0,0,0,0)'
		});
	}, false);
}
// 打开网址
function openUrl() {
	var url = document.getElementById('url');
	embed ? embed.loadURL(url.value) : createEmbed(url.value);
	url.blur();
}
// 页面加载后自动打开
document.addEventListener('DOMContentLoaded', function() {
	if (embed) {
		openUrl();
	} else {
		auto = true;
	}
}, false);
// 页面跳转完成事件
/* function onBrowserLoading() {
	document.getElementById('url').value = embed.getURL();
} */
function back() {
	//alert(1)
	//alert(history.length);
	plus.nativeUI.closeWaiting();
	ws.close('pop-out', 500, null);
}
