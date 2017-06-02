/**
 * Created by zhangli on 2017/5/23.
 */


/*点击笔的效果*/
$(function(){
    $(".title-dynamic").find(".pen").click(function(){
        $(".title-dynamic").animate({"width":"100px","background-position-x":"-680px"},0,function(){
            $(".title-dynamic").animate({"width":"780px","background-position-x":"-320px"},1500,"easeOutStrong")
        })
    })
});

/*hover喜欢按钮*/
$(function(){
    $(".like-btn-box").find(".like-btn").hover(function(){
        $(this).addClass("animated tada");
    },function(){
        $(this).removeClass("animated tada");
    })
});
/*点击喜欢按钮*/
$(function(){
    var likeReminder = ["彭涛俊装纯没","黄朝阳真的是个蛇精病","你们漂移了吗","有本事再点一次","皇上万岁","娘娘棒棒哒","二师兄非人类","杨富洪又在吹牛了"];
    var likeClickBtn = false;
    $(".like-btn").click(function(){
        if(!likeClickBtn){
            //likeClickBtn = true;
            $(".like-reminder").text(likeReminder[Math.floor(Math.random()*likeReminder.length)]);
            goMove();
        }else if(likeClickBtn && $(".like-reminder").text() == "有本事再点一次"){
            $(".like-reminder").text("好，算你有本事");
            goMove()
        }
        //提示框运动方法
        function goMove(){
            $(".like-reminder").animate({"top":"0","opacity":"1"},600,"elasticOut",function(){
                $(".like-reminder").delay(600).animate({"left":"-500","opacity":"0"},600,"backIn",function(){
                    $(".like-reminder").animate({"top":"379","left":"258","opacity":"0"},0);
                    $(".like-btn").addClass("like-btn-onclick");
                })
            })
        }
    });
});

/*内容详情*/
$(function(){

    var articleName = getUrlParams();
    var data =  articleData[articleName].data;

    $(".title").html( data.title );
    $(".content-particulars").html( data.content );
    $(".dynamic-content-img").attr("src", data.coverImg );
    $(".whenTime").html(data.creatAt);
    $(".person").html(data.updateByFullName);


    //获取url参数 articleName
    function getUrlParams(){
        var searchstr = window.location.search.substr(1);
        var arr01 = searchstr.split("&");
        if(window.location.search==""){ //如果从文件打开，就打开。。。
            return "companyCulture"
        }
        for(var i=0; i<arr01.length; i++){
            var arr02 = arr01[i].split("=");
            if(arr02[0] == "type"){
                return arr02[1];
            }
        }
    }
});



