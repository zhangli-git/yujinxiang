/**
 * Created by zhangli on 2017/5/16.
 */
/*上方大banner轮播图*/
/*左右键弹动效果*/
$(function(){
    $(".banner-switch").find(".prev,.next").hover(function () { //通过dom.find("选择器") 去获取dom子级的dom
        $(this).find("img").slideDown(600, "elasticOut")
    }, function () {
        $(this).find("img").hide()
    });
});

/*轮播切换*/
$(function(){
    //获取dom
    var banner = $(".banner");
    var prevBtn = banner.find(".prev");
    var nextBtn = banner.find(".next");
    var Img = banner.find(".banner-img");
    var dots = banner.find("span");

    //点击左右键
    var arr = 0;
    prevBtn.click(function(){
        arr--;
        if(arr < 0){
            arr = dots.length-1;
        }
        doMove();
    });

    nextBtn.click(function(){
        arr++;
        if(arr >=dots.length){
            arr = 0;
        }
        doMove();
    });
    //点击点切换
    dots.click(function(){
        arr = $(this).index();
        doMove();
    });

    var timer = null;
    function move(){
        clearInterval(timer);
        timer = setInterval(function(){
            arr++;
            if(arr>=dots.length){
                arr=0;
            }
            doMove();
        },3000);
    }
    move();

    //鼠标移入移出事件
    banner.hover(function(){
        clearInterval(timer);
    },function(){
        move();
    });

    function doMove(){
        //css(json格式的样式修改)   eq(需要获取的下标值)
        Img.fadeOut(600).eq(arr).fadeIn(600);
        dots.css({"background":"#E1E2E8"}).eq(arr).css({"background":"#006FD6"})
    }
});


/*中间主要产品轮播*/
/*左右键弹动效果*/
$(function(){
    $(".product").find(".prev,.next").hover(function () {
        $(this).find("img").slideDown(600, "elasticOut")
    }, function () {
        $(this).find("img").hide()
    });
});

/*左边线条及内容切换*/
$(function(){
    //获取dom
    var birdsDiv = $(".birds-learn");
    var prevBtn = birdsDiv.find(".prev");
    var nextBtn = birdsDiv.find(".next");
    var content = birdsDiv.find(".content");
    var span = birdsDiv.find(".left-line span");
    var dots =$(".left-lineBtn");
    var arr = 0;

    //点击左右键
    prevBtn.click(function(){
        arr--;
        if(arr < 0){
            arr = dots.length-1;
        }
        doMove();
    });

    nextBtn.click(function(){
        arr++;
        if(arr >=dots.length){
            arr = 0;
        }
        console.log(dots.length);
        doMove();
    });
    //点击点切换
    dots.click(function(){
        arr = $(this).index();
        doMove();
    });

    function doMove(){
        dots.removeClass("now").eq(arr).addClass("now");
        content.fadeOut(600).eq(arr).fadeIn(600);
    }
});


/*业务范围动态效果*/
$(function(){
    var business = $(".business");
    var logoImg = business.find(".logo-icon");
    var contentText = business.find(".business-content-bottom");
    var packUp = business.find(".pack-up");
    var iNow = 0;
    /*hover弹动效果*/
    logoImg.add(packUp).hover(function(){
        $(this).addClass("animated tada")
    },function(){
        $(this).removeClass("animated tada")
    });
    //点击伸缩按钮
    packUp.click(function(){
        iNow = packUp.index($(this));
        doMove();
    });
    //点击中间的图片
    logoImg.click(function(){
        iNow = logoImg.index($(this));
        doMove();
    });

    function doMove(){
        if(packUp.eq(iNow).hasClass("zhankai")){
            contentText.stop().slideUp(400);
            packUp.removeClass("zhankai");
        }else{
            contentText.stop().slideUp(200).delay(200).eq(iNow).slideDown(400);
            packUp.removeClass("zhankai").eq(iNow).addClass("zhankai");
        }
    }
});

/*团队介绍动态效果*/
//左右键弹动效果
$(function(){
    $(".team").find(".prev,.next").hover(function () {
        $(this).find("img").slideDown(600, "elasticOut")
    }, function () {
        $(this).find("img").hide()
    });
});

$(function(){
    var oDiv = $(".team-content");
    var oPrev = oDiv.find(".prev");
    var oNext = oDiv.find(".next");
    var moveDiv = oDiv.find(".content-wrap");
    var timer = null;
    var nextTimer = null;
    var prevTimer = null;
    var nowIndex = 0;

    oPrev.click(function(){
        clearTimeout( prevTimer );
        prevTimer = setTimeout(function(){
            doPrev();
        },200)

    });
    oNext.click(function(){
        clearTimeout( nextTimer );
        nextTimer = setTimeout(function(){
            doNext();
        },200)

    });
    oDiv.hover(function(){
        clearInterval( timer );
    }, autoMove);

    function autoMove(){
        clearInterval( timer );
        timer = setInterval(function(){
            doNext();
        },4000)

    }
    autoMove();

    function doPrev(){

        moveDiv.find(".team-wrap:last").insertBefore(moveDiv.find(".team-wrap:first"));
        moveDiv.animate({"left": "-1100px"},0);
        moveDiv.animate({"left": "0px"},1000,'backOut');

        nowIndex--;
        if(nowIndex < 0){
            nowIndex = oDiv.find(".points").find("span").length -1;
        }
        oDiv.find(".points").find("span").removeClass("now").eq(nowIndex).addClass("now");

    }

    function doNext(){

        moveDiv.animate({"left": "-1100px"},1000,'backIn',function(){
            moveDiv.find(".team-wrap:first").appendTo(moveDiv);
            moveDiv.animate({"left": "0px"},0);
        });

        nowIndex++;
        if(nowIndex >= oDiv.find(".points").find("span").length){
            nowIndex = 0;
        }
        oDiv.find(".points").find("span").removeClass("now").eq(nowIndex).addClass("now");

    }
});


//团队介绍头像鼠标移入效果
$(".team-content .left-img").hover(function(){
    $(this).find("a").stop().fadeIn(400);
},function(){
    $(this).find("a").stop().fadeOut(400);
});

/*联系我们的输入框获取效果*/
$(".contact-from input, .contact-from textarea").focus(function(){
    $(this).closest(".input-box").addClass("focus-input-box");
}).blur(function(){
    $(this).closest(".input-box").removeClass("focus-input-box");
});


/*floor*/
$(function(){
    var musicIndex = 0;
    //音乐播放
    $(".floor-music").find("span").mouseenter(function(){
        //让	musicIndex自增1
        musicIndex++;
        //获取当前点击的span的index，以设置需要加载的music的地址。
        var index = $(this).index();

        if(navigator.appName=="Microsoft Internet Explorer"){ //如果是ie
            $("body").append('<bgsound class="myaudio'+ musicIndex +'" src="music/sound0'+ index +'.mp3" autostart=true loop=false>');
        }else{ //其他
            $("body").append('<audio class="myaudio'+ musicIndex +'" src="music/sound0'+ index +'.mp3" autoplay></audio>');
        }
        var removeIndex = musicIndex;
        setTimeout(function(){
            $(".myaudio"+removeIndex).remove();
        },3000);

    });
    //备案声明点击打开查询网站
   /* $("#beiaishenmin").click(function(){
        window.open("http://www.miitbeian.gov.cn");
    })*/
});
/*hover span按钮*/
$(function(){
    $(".floor").find("span").hover(function(){
        $(this).addClass("animated tada");
    },function(){
        $(this).removeClass("animated tada");
    })
});