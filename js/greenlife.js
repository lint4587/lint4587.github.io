$(document).ready(function () {
    //滑動至頂
    $('#gotop').click(function () {
        $('html,body').animate({ scrollTop: 0 }, 100);
    });
    // 至頂按鈕淡出淡入\
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {

            $('#gotop').stop().fadeIn('fast');
        } else {
            $('#gotop').stop().fadeOut('fast');
        }
    })
    // 滑動載入
    $('.smoove').smoove();
});