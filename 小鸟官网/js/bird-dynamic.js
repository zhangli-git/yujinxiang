/**
 * Created by zhangli on 2017/5/22.
 */

/*点击笔的效果*/
$(function(){
    $(".title-dynamic").find(".pen").click(function(){
        $(".title-dynamic").animate({"width":"100px","background-position-x":"-1000px"},0,function(){
            $(".title-dynamic").animate({"width":"1100px","background-position-x":"0"},2000,"easeOutStrong")
        })
    })
});

/*小鸟动态*/
$(function () {
    //进入页面显示第一页
    var page = 0;
    dynamicBox();
    //点击更多，加载下一页
    $(".list-more").click(function () {
        page++;
        dynamicBox();
    });
    //获取内容
    function dynamicBox() {
        var date = listData["listData0" + page].data;
        var listBox = date.list;
        var content = "";
        for (var i = 0; i < listBox.length; i++) {
            content += '<div class="dynamic-box" onclick="openNewWindow(this)" myId="'+ listBox[i].sysId +'"> ' +
                '<img class="small-arrow" src="images/list_img_over_xiaojiantou.png" alt=""/> ' +
                '<div class="dynamic-img"> ' +
                '<img src="' + listBox[i].coverImg + '" alt=""/> ' +
                '</div> ' +
                '<div class="dynamic-text"> ' +
                '<h1 class="dynamic-title">' + listBox[i].title + '</h1> ' +
                '<p class="dynamic-time">' + listBox[i].creatAt + '</p> ' +
                '<p class="dynamic-describe">' + listBox[i].describe + '</p> ' +
                '</div> ' +
                '</div>'
        }
        //把内容放入div中
        $(".dynamic-content").append(content);

        //如果已经是最后一页，点击更多，显示没有了
        if (Math.ceil(date.count / date.pageSize) == date.pageStart + 1) {
            $(".list-more").css("opacity", "0").prev("img").attr("src", "images/list_gomore_bg_nomore.jpg");
        }
    }
});

//打开新窗口
function openNewWindow(obj){
    window.open("bird-dynamic-particulars.html?type=xiaoniaoNews"+ $(obj).attr("myId"),"_blank");
}
//获取url参数 articleName
function getUrlParams(){
    var searchstr = window.location.search.substr(1);
    var arr01 = searchstr.split("&");

    for(var i=0; i<arr01.length; i++){
        var arr02 = arr01[i].split("=");
        if(arr02[0] == "articleName"){
            return arr02[1];
        }
    }
}

