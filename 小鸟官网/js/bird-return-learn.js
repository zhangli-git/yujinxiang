/**
 * Created by zhangli on 2017/5/24.
 */
//小鸟掌学

//载入动画
$(function () {
    goWelcomeAnimate();

    function goWelcomeAnimate() {
        WelcomeAnimateTime = setTimeout(function () {
            $(".welcome-box").animate({"top": "40%"}, 600);
            $(".welcome-box .welcome-animate").each(function (index, element) {
                var $this = $(this);
                setTimeout(function () {
                    $this.show().addClass("animated fadeInUp")
                }, 200 * (index + 1));
            });
            setTimeout(function () {
                $(".welcome-warp").slideUp(600, "easeOutStrong", function () {

                })
            }, 2500)
        }, 3000)
    }

    $(".welcome-warp .gif").attr("src", "images/aboutxiaoniao/xiaoniao_welcome_icon2.gif?" + Math.random());

    //当点击欢迎页两次后，自动收起。
    var welcomeDBclick = false;
    $(".welcome-warp").click(function () {
        if (welcomeDBclick) {
            $(".welcome-warp").slideUp(600, "easeOutStrong", function () {

            });
        } else {
            welcomeDBclick = true;
        }
    });


    $(".welcome-warp-block, .summarize-block, .roll-warp").css("height", ($(window).height() - 50) + "px");
    $(".summarize-block").width($(window).width());

    var rollWarp = $(".roll-warp");
    var welcomeWarpBlock = $(".welcome-warp-block");
    var content = $(".roll-box");
    var iNow = 0;
    var dots = $(".header-warp").find("li");
    var rollScrollGo = false;
    var iNowScroll = 0;

    //调整页面大小 ，让内容居中
    var resizeTimer = null;
    $(window).resize(function () {
        $(".welcome-warp-block, .summarize-block, .roll-warp").css("height", ($(window).height() - 50) + "px");
        $(".summarize-block").width($(window).width());
        //处理重复触发的事件，我们可以使用timeOut来解决
        if (iNow) {
            if (resizeTimer) {
                clearInterval(resizeTimer);
            }
            resizeTimer = setTimeout(function () {
                rollScrollGo = true;
                rollScroll();
                summarizeFn();
            }, 200)
        }
    });
    //设置内容的高度为屏幕大小 / -50为减去的导航栏高度
    setHeight();
    function setHeight() {
        //add方法可以在已经获取的dom合集里添加新的dom
        rollWarp.add(welcomeWarpBlock).css({"height": $(window).height() - 50 + "px"});
        content.css({"height": $(window).height() * welcomeWarpBlock.length});
        rollScroll();
    }

    //向上滚动
    var scrollTimer = null;

    function goUp() {
        if (iNowScroll < 1) { //用于判断鼠标滚动2次，在执行滚动
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function () {
                iNowScroll++;
            }, 100)
        } else if (!rollScrollGo) {
            rollScrollGo = true;
            iNow--;
            if (iNow < 0) {
                iNow = 0;
            }
            rollScroll();
        }
    }

    //向下滚动
    function goDown() {
        if (iNowScroll < 1) { //用于判断鼠标滚动2次，在执行滚动
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function () {
                iNowScroll++;
            }, 100)
        } else if (!rollScrollGo) {
            rollScrollGo = true;
            iNow++;
            if (iNow > welcomeWarpBlock.length - 2) {
                iNow = welcomeWarpBlock.length - 2;
            }
            rollScroll();
        }
    }

    //滚动效果
    function rollScroll() {
        $(".roll-box").animate({"top": "-" + $(".welcome-warp-block").height() * iNow + "px"}, 600, "easeBothStrong", function () {
            rollScrollGo = false;
            iNowScroll = 0;
            if (iNow == 0) {

            } else if (iNow == 4) {
                dots.removeClass("now").eq(iNow - 1).addClass("now");
                dots.eq(iNow).addClass("now");
            } else {
                dots.removeClass("now").eq(iNow - 1).addClass("now");
            }
        })
    }

    //点击导航
    dots.find("h1").click(function () {
        var dotsIndex = $(this).parent().index("li");
        if (dotsIndex == 4) {
            dotsIndex = 3;
        }
        if (dotsIndex != 5) {
            iNow = dotsIndex + 1;
            rollScroll();
        }
    });
    //点击第一页下方箭头
    $(".welcome-warp2").find(".next-bottom-btn").click(function () {
        iNow = 1;
        rollScroll();
    });
    //进入页面，跳转对应模块
    var hashRoll = window.location.hash.substring(1);
    if (hashRoll) {
        if (hashRoll == 0 || hashRoll == 1 || hashRoll == 2 || hashRoll == 3 || hashRoll == 4) {
            $(".welcome-warp").slideUp(0, function () {

            });
            iNow = hashRoll;
            rollScroll();
            summarizeFn();
            window.location.hash = "";
        }
    }
    //触发滚动
    function goScroll(e) {
        e = e || window.event;

        if (e.wheelDelta) {    //这就是 ie 或者 chrome
            if (e.wheelDelta > 0) {
                //console.log("ie 或者 chrome向上滚动了")
                goUp();
            } else if (e.wheelDelta < 0) {
                //console.log("ie 或者 chrome向下滚动了")
                goDown();
            }
        } else if (e.detail) {  //火狐
            if (e.detail > 0) {
                //console.log("火狐向下滚动了")
                goDown();
            } else if (e.detail < 0) {
                //console.log("火狐向上滚动了")
                goUp();
            }
        }
    }

    //触发事件
    if (document.addEventListener) { //火狐
        document.addEventListener("DOMMouseScroll", goScroll, false)
    }
    window.onmousewheel = document.onmousewheel = goScroll; //针对ie及谷歌


    /*概述轮播*/
    var summarizePrev = $(".summarize-prev");
    var summarizeNext = $(".summarize-next");

    var summarizeINow = 0;
    summarizePrev.css("opacity", 0.3);

    //上一页
    summarizePrev.click(function () {
        summarizeINow--;
        if (summarizeINow < 0) {
            summarizeINow = 0;
            summarizePrev.css("opacity", 0.3);
        } else {
            summarizeFn();
        }
    });
    //下一页
    summarizeNext.click(function () {
        summarizeINow++;
        if (summarizeINow > 2) {
            summarizeINow = 2;
            summarizeNext.css("opacity", 0.3);
        } else {
            summarizeFn();
        }
    });
    //运动函数
    function summarizeFn() {
        $(".summarize-prev, .summarize-next").css("opacity", 0.3);
        $(".summarize-box").animate({"left": "-" + $(".summarize-block").width() * summarizeINow + "px"}, 600, function () {
            $(".summarize-prev, .summarize-next").css("opacity", 1);
        });
    }

    //对企业的价值 (呼吸灯效果)
    setInterval(function () {
        $(".bright").fadeIn(1200, function () {
            $(".bright").delay(100).fadeOut(400);
        })
    }, 1900);

//小鸟掌云
    //点击右边
    $(".cloud-btn-right").click(function () {
        var $this = $(this);
        $(".cloud-btn.now").animate({"left": "78px"}, 100, function () {
            $(".cloud-btn.now").removeClass("now");
            $this.find(".cloud-btn").animate({"left": "0"}, 400).addClass("now");
        });
        $(".cloud-box").animate({"left": "-910px"}, 600);
    });
    //点击左边
    $(".cloud-btn-left").click(function () {
        var $this = $(this);
        $(".cloud-btn.now").animate({"left": "-78px"}, 100, function () {
            $(".cloud-btn.now").removeClass("now");
            $this.find(".cloud-btn").animate({"left": "0"}, 400).addClass("now");
        });
        $(".cloud-box").animate({"left": "0"}, 600);
    })
});


