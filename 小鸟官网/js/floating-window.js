/**
 * Created by zhangli on 2017/5/22.
 */
<!--����������̬Ч��-->
$(function(){
    $(".nav").find(".drop-down").hover(function(){
        $(this).find(".drop-down-list").stop().slideDown(600,"elasticOut")
    },function(){
        $(this).find(".drop-down-list").stop().slideUp(100);
    })
});
//�ص�����
$(function(){
    //�����ֻ���������������ʾЧ��
    $(window).scroll(function(){
        if($(this).scrollTop() > 500){
            $(".floating").fadeIn();
        }else{
            $(".floating").fadeOut(0);
        }
    });
    //����ص�����Ч��
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
/*hoverЧ��*/
$(function(){
    $("#floating").find(".contact-us").hover(function(){
        $(this).addClass("animated tada");
        console.log($(this)[0].className)
    },function(){
        $(this).removeClass("animated tada");
        console.log($(this)[0].className)
    })
});