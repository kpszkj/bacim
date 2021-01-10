$(function() {

	//打开窗口
	$('#popup').on('click', function(event) {
		event.preventDefault();
		$('.popup').addClass('visible');
		//$(".dialog-addquxiao").hide()
	});
	
	/* popup = function(){
		$('.popup').addClass('visible');
	} */
	
	//关闭窗口
	$('.popup').on('click', function(event) {
		if ($(event.target).is('.popup-close') || $(event.target).is('.popup')) {
			event.preventDefault();
			$(this).removeClass('visible');
		}
	});

})
