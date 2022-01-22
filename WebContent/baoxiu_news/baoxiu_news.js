/**
 * 报修新闻
 */
var request = new XMLHttpRequest();

function load_baoxiu_news_info() {
    console.log("request is " + request);
    request.open("get", "baoxiu_news.jsp", true);
    request.onreadystatechange = fillBaoxiu;
    request.send();
}

function fillBaoxiu() {
    console.log("enter fillbaoxiu");
    console.log("readystate" + request.readyState + "status" + request.status);
    if (request.readyState == 4 && request.status == 200) {
        console.log("报修结果返回成功");
        var baoxiuinfo = JSON.parse(request.responseText);
        showBaoXiu(baoxiuinfo);
    }
}

function loadNewsSearch() {
    console.log("发送搜索请求");
    request.open("get", "baoxiu_news.jsp", true);
    request.onreadystatechange = fillSearchTable;
    request.send();
}

function fillSearchTable() {
    console.log("enter fillSearchTable()");
    console.log("readystate" + request.readyState + "status" + request.status);
    if (request.readyState == 4 && request.status == 200) {
        var result = [];
        var baoxiuinfo = JSON.parse(request.responseText);
        var searchInput = document.getElementById("searchInput").value;
        for (var index in baoxiuinfo) {
            if (baoxiuinfo[index].message.indexOf(searchInput) != -1) {
                result.push(baoxiuinfo[index]);
                // console.log(searchInput);
            }
        }
        console.log("news查询结果返回成功");
        showBaoXiu(result);
    }
}

function checkKeyPress(event) {
    console.log("检测到回车");
    if (event.KeyCode == 13)
        loadNewsSearch();
}

$(document).ready(function () {
    document.onkeydown = function (event) {
        if (event.keyCode == 13) //回车键的键值为13
            loadNewsSearch();//回车需执行的方法
    };
});

//
function showBaoXiu(baoxiuinfo) {
    var str = "";
    var num = baoxiuinfo.length;
    $("#news-num").html(num);
    for (var index in baoxiuinfo)
        str = str + "<div class='Card TopstoryItem TopstoryItem--old TopstoryItem-isRecommend'> " +
            "<div class='Feed' >" +
            "<div class='ContentItem ZVideoItem'>" +
            "<h2 class='ContentItem-title'><a>报修信息</a> </h2>" +
            " <div class='RichContent is-collapsed'> " + baoxiuinfo[index].message + "<div class='ContentItem-actions'> " +
            "<button type='button'  class='Button ContentItem-action Button--plain'> " +
            " <span style='display: inline-flex; align-items: center;'>" +
            "<svg class='icon'  viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='16' height='16'>" +
            "<path d='M512 128a384 384 0 1 1 0 768 384 384 0 0 1 0-768z m0 59.093333a324.906667 324.906667 0 1 0 0 " +
            "649.813334 324.906667 324.906667 0 0 0 0-649.813334z m0 129.962667c16.298667 0 29.525333 13.226667 29.525333" +
            " 29.568v192.512l95.957334 95.957333a29.525333 29.525333 0 0 1-41.813334 41.770667l-104.533333-104.576a29.525333" +
            " 29.525333 0 0 1-8.661333-20.906667v-204.8c0-16.298667 13.226667-29.525333 29.525333-29.525333z' fill='#000000' >" +
            "</path></svg></span>" + baoxiuinfo[index].news_time + "</button></div> </div> </div> </div></div>";
    document.getElementById("display_baoxiu_news").innerHTML = str;
}
