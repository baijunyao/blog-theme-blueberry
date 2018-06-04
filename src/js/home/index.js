$(function(){
    // 调整导航条hover的样式
    if($('.b-nav-mobile').css('display')=='block'){
        var widthLeft=getWidthLeft($('.b-nav-active'),false);
        $('.b-nav-mobile').css({
            'width': widthLeft['width'],
            'left': widthLeft['left']
        });
    }

    // 鼠标移入导航条的hover状态
    $('.b-nav-parent li').hover(function() {
        getWidthLeft($(this),true);
    }, function() {
        getWidthLeft($('.b-nav-active'),true);
    });

    // 设置文章页iframe宽度
    $('.b-article iframe').width('95%');
    // 返回顶部
    $(window).scroll(function(e) {
        //若滚动条离顶部大于200元素
        if($(window).scrollTop()>200){
            $('.go-top').show();
            $(".go-top").removeClass('animated rotateOut');
            $(".go-top").addClass('animated rotateIn');
        }else{
            $(".go-top").removeClass('animated rotateIn');
            $(".go-top").addClass('animated rotateOut');
        }
    });

    // 改变导航栏高度
    if(window.innerWidth>=768){
        $(window).scroll(function(e) {
            //若滚动条离顶部大于100元素
            if($(window).scrollTop()>100){
                $('#b-public-nav').stop().animate({'padding-top':'0px','padding-bottom':'0px'},100);
            }else{
                $('#b-public-nav').stop().animate({'padding-top':'5px','padding-bottom':'5px'},100);
            }
        });
    }
    // 为分页类增加响应式class
    $('.b-page .first,.num,.end').addClass('hidden-xs');
    $('.b-page .rows').addClass('hidden-xs');

    // 随言碎语js调整时间轴的高度
    $('.b-chat-middle').height($('.b-chat').height());
    // 随言碎语js调整气泡三角的top
    $('.b-arrows-right1,.b-arrows-right2').each(function(index, el) {
        $(el).css('top', $(el).parent('.b-chat-one').height()/2.5);
    });

    $.each($('.js-head-img'), function(index, val) {
        var img=$(val).attr('_src');
        $(val).attr('src', img);
    });

    // 点击返回顶部
    $('.go-top').click(function () {
        $('body,html').animate({scrollTop:0},500);
    })

    // 登录
    $('.js-login-btn').click(function () {
        $('#b-modal-login').modal('show');
    })

    // 开启进度条
    Pace.start()
})

/**
 * 传递对象；获取left值和width
 * @param  {subject}  obj   html对象
 * @param  {Boolean} change  true获取left和宽；false改变left和宽；
 * @return {subject}         获取到的left和宽
 */
function getWidthLeft(obj,change){
    var mobileLeft=obj.position().left;
    var mobileWidth=obj.width();
    var widthLeft={
        'left':mobileLeft,
        'width':mobileWidth
    }
    if(!change){
        return widthLeft;
    }
    $('.b-nav-mobile').stop().animate({'left':mobileLeft,'width':mobileWidth}, 300);
}
