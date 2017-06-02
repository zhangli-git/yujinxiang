/**
 * Created by zhangli on 2017/5/22.
 */
<!--导航下拉动态效果-->
$(function(){
    $(".nav").find(".drop-down").hover(function(){
        $(this).find(".drop-down-list").stop().slideDown(600,"elasticOut")
    },function(){
        $(this).find(".drop-down-list").stop().slideUp(100);
    })
});
//回到顶部
$(function(){
    //鼠标滚轮滑动悬浮窗隐藏显示效果
    $(window).scroll(function(){
        if($(this).scrollTop() > 500){
            $(".floating").fadeIn();
        }else{
            $(".floating").fadeOut(0);
        }
    });
    //点击回到顶部效果
    $(".back-top").click(function(){
        $(this).parent().animate({
            "bottom":1000,"opacity":0
        },400,function(){
            $(".floating").css("opacity",1).fadeOut(0).css("bottom",200)
        });
        $("body,html").animate({
            scrollTop:0
        },400)
    })
});
/*hover效果*/
$(function(){
    $("#floating").find(".contact-us").hover(function(){
        $(this).addClass("animated tada");
        console.log($(this)[0].className)
    },function(){
        $(this).removeClass("animated tada");
        console.log($(this)[0].className)
    })
});