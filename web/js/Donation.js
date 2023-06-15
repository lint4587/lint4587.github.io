$(document).ready(function () {
    var a, b, c,d,e;
    a = $(window).height();  //瀏覽器窗口高度
    var dona1 = $('#dona_1');
    var dona2 = $('#dona_2');
    var dona3 = $('#dona_3');
    $(window).scroll(function () {
        b = $(this).scrollTop()+$(window).height()-200;
        c=dona1.offset().top;
        d=dona2.offset().top;
        e=dona3.offset().top;
        if(b>c){
            dona1.addClass('scroll_animation');
        }
        if(b>d){
            dona2.addClass('scroll_animation');
        }
        if(b>e){
            dona3.addClass('scroll_animation');
        }

    });
});