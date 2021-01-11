$(function () {

    //打开窗口
    /* $('#popup').on('click', function (event) {
         event.preventDefault();
         $('.popup').addClass('visible');
         //$(".dialog-addquxiao").hide()
     });*/

    popup = function () {
        $('.popup').addClass('visible');
    }
    popup1 = function () {
        $('#popup1').addClass('visible');
    }
    popup2 = function () {
        $('#popup2').addClass('visible');
    }
    popup3 = function () {
        $('#popup3').addClass('visible');
    }
    popup4 = function () {
        $('#popup4').addClass('visible');
    }
    popup5 = function () {
        $('#popup5').addClass('visible');
    }

    //关闭窗口
    $('.popup').on('click', function (event) {
        if ($(event.target).is('.popup-close') || $(event.target).is('.popup')) {
            event.preventDefault();
            $(this).removeClass('visible');
        }
    });


    firstLoad = function () {
        $('.loading').show();
        $('#all').hide();
    }

    load = function () {
        $('.loading').show();
        $('#main').hide();
    }
    loadDetail = function () {
        $('.loading').show();
    }

    closeLoad = function () {
        $('.loading').hide();
        $('#all').show();
        $('#main').show();
    }

})
