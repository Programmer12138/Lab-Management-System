/**
 * 采购新闻
 */
var request = new XMLHttpRequest();

function load_buy_news_info() {
    console.log("request is " + request);
    //从jsp里面获取信息
    request.open("get", "buy_news.jsp", true);
    request.onreadystatechange = fillBuy;
    request.send();
}

function fillBuy() {
    console.log("enter fillbuy");
    console.log("readystate" + request.readyState + "status" + request.status);
    if (request.readyState == 4 && request.status == 200) {
        //把jsp传过来的信息转化成js里面的数组
        console.log("enter if");
        var buyinfo = JSON.parse(request.responseText);
        showBuy(buyinfo);
    }
}

function loadNewsSearch() {
    console.log("request is " + request);
    request.open("get", "buy_news.jsp", true);
    request.onreadystatechange = fillSearchTable;
    request.send();
}

function fillSearchTable() {
    console.log("enter fillSearchTable()");
    console.log("readystate" + request.readyState + "status" + request.status);
    if (request.readyState == 4 && request.status == 200) {
        var result = [];
        var buyinfo = JSON.parse(request.responseText);
        var searchInput = document.getElementById("searchInput").value;
        for (var index in buyinfo) {
            if (buyinfo[index].message.indexOf(searchInput) != -1) {
                result.push(buyinfo[index]);
            }
        }
        console.log("news查询结果返回成功");
        showBuy(result);
    }
}

function showBuy(buyinfo) {
    var str = "";
    var num = buyinfo.length;
    $("#news-num").html(num);
    for (var index in buyinfo)
//生成要显示的字符串
        str = str + "<div class='Card TopstoryItem TopstoryItem--old TopstoryItem-isRecommend' > " +
            "<div class='Feed' >" +
            "<div class='ContentItem ZVideoItem'>" +
            "<h2 class='ContentItem-title'><a >采购新闻</a>  </h2>" +
            " <div class='RichContent is-collapsed'> " + buyinfo[index].message + "<div class='ContentItem-actions'> " +
            "<button type='button'  class='Button ContentItem-action Button--plain'> " +
            " <span style='display: inline-flex; align-items: center;'>" +
            "<svg   class='icon'  viewBox='0 0 1024 1024'   xmlns='http://www.w3.org/2000/svg'" +
            "   width='16' height='16'>" +
            "<path d='M512 128a384 384 0 1 1 0 768 384 384 0 0 1 0-768z m0 59.093333a324.906667 324.906667 0 1 0 0 " +
            "649.813334 324.906667 324.906667 0 0 0 0-649.813334z m0 129.962667c16.298667 0 29.525333 13.226667 29.525333" +
            " 29.568v192.512l95.957334 95.957333a29.525333 29.525333 0 0 1-41.813334 41.770667l-104.533333-104.576a29.525333" +
            " 29.525333 0 0 1-8.661333-20.906667v-204.8c0-16.298667 13.226667-29.525333 29.525333-29.525333z' fill='#000000'  >" +
            "</path></svg></span>" + buyinfo[index].news_time + "</button></div> </div> </div> </div></div>";
    //在指定位置显示字符串
    document.getElementById("display_baoxiu_news").innerHTML = str;
}