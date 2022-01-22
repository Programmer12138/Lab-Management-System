/**
 * 采购管理界面的js文件，用于发出采购信息数据请求
 *
 * by heyuanfly 2020-12-24
 */

/*****************************显示购买信息*************************************/
var request = new XMLHttpRequest();

//加载购买信息表
function loadBuyInfos() {
    console.log("成功加载一次页面");
    request.open("get", "buyList.jsp", true);
    request.onreadystatechange = fillBuyTable;
    request.send();
}

//填充购买信息表
function fillBuyTable() {
    console.log("enter fill_buy_table");
    if (request.readyState == 4 && request.status == 200) {
        var buy_info = JSON.parse(request.responseText);
        showBuy(buy_info, "buyTable");
    }
}

//显示购买信息
function showBuy(buy_info, tableId) {
    $("#" + tableId + " tr:gt(0)").empty();
    $("#" + tableId + " tr").not(':eq(0)').empty();
    var table = document.getElementById(tableId);
//往表格里插入数据
    for (var index in buy_info) {
        var newRow = table.insertRow(table.rows.length);
//新建单元格
        var col1 = newRow.insertCell(0);
        var col2 = newRow.insertCell(1);
        var col3 = newRow.insertCell(2);
        var col4 = newRow.insertCell(3);
        var col5 = newRow.insertCell(4);
        var col6 = newRow.insertCell(5);
        var col7 = newRow.insertCell(6);
        var col8 = newRow.insertCell(7);
//插入数据
        col1.innerHTML = buy_info[index].buyId;
        col2.innerHTML = buy_info[index].equipName;
        col3.innerHTML = buy_info[index].buyer;
        col4.innerHTML = buy_info[index].seller;
        col5.innerHTML = buy_info[index].buyNum;
        col6.innerHTML = buy_info[index].money;
        col7.innerHTML = buy_info[index].buyDate;
        col8.innerHTML = "<button type='button' style='color: darkblue' onclick='loadSearchBuyById("
            + buy_info[index].buyId + ");'>更新</button>||<button type='button' style='color: red' onclick='deleteBuy("
            + buy_info[index].buyId + ");'>删除</button>";
    }
}

/*****************************查询采购信息*************************************/

//加载查询结果表
function loadSearchResult() {
    request.open("get", "buyList.jsp", true);
    request.onreadystatechange = fillSearchResult;
    request.send();
}

//判断是否符合条件，填充查询结果表
function fillSearchResult() {
    if (request.readyState == 4 && request.status == 200) {
        var table = "buyTable";
        var buy_info = JSON.parse(request.responseText);
        var result = [];
        var buyId = document.getElementById("searchBuyId").value;
        var equipName = document.getElementById("searchEquipName").value;
        // resultAlert2("请稍后。。。");
//判断是以哪种方式查询
//器材名和购买编号都输入的情况
        if (checkSearchEquipName() && checkSearchBuyId()) {
            for (var i = 0; i < buy_info.length; i++) {
                if (buy_info[i].buyId == buyId && buy_info[i].equipName == equipName) {
                    result.push(buy_info[i]);
                }
            }
            showBuy(result, table);
        }
//	只输入器材名的情况
        else if (checkSearchEquipName() && !checkSearchBuyId()) {
            for (var i = 0; i < buy_info.length; i++) {
                if (buy_info[i].equipName == equipName) {
                    result.push(buy_info[i]);
                }
            }
            showBuy(result, table);
        }
//只输入订单编号的情况
        else if (!checkSearchEquipName() && checkSearchBuyId()) {
            for (var i = 0; i < buy_info.length; i++) {
                if (buy_info[i].buyId == buyId) {
                    result.push(buy_info[i]);
                }
            }
            showBuy(result, table);
        } else showBuy(buy_info, table);
    }
}

//加载根据ID查询的结果表
function loadSearchBuyById(buyId) {
    request.open("get", "buyList.jsp", true);
    request.onreadystatechange = function () {
        SearchBuyById(buyId);
    }
    request.send();
}

//通过id搜索器材
function SearchBuyById(buyId) {
    var buy_info = JSON.parse(request.responseText);
    for (var i = 0; i < buy_info.length; i++) {
        if (buy_info[i].buyId == buyId) {
            return buy_info[i];
        }
    }
    return "未找到！"
}

/*****************************新增采购*************************************/
//发送新增采购请求
function addBuy() {
    var b = getAddBuyInfo();
    var str = "equipName=" + b.equipName + "&buyer=" + b.buyer +
        "&seller=" + b.seller + "&num=" + b.num + "&buyDate=" + b.buyDate + "&money=" + b.money;
    console.log("str sent" + str);
    var url = "addBuy.jsp?" + str;
    request.open("get", url, true);
    request.onreadystatechange = handleAddResult;
    request.send();
}

//处理新增结果，重新加载表格
function handleAddResult() {
    console.log("enter handleAddResult");
    if (request.readyState == 4 && request.status == 200) {
        console.log("enter 1st if");
        var result = JSON.parse(request.responseText);
        if (result == "true") {
            resultAlert2("新增成功！");
            CloseDiv('MyDiv', 'fade');
            loadBuyInfos();
            return;
        } else
            resultAlert2("新增失败！");
    }

}

//获取新增采购器材
function getAddBuyInfo() {
//这边有问题，要改，先不检验，直接插入
    if (checkEquipName('equipName', 'lblWarnEquipName') && checkBuyNum('num', 'lblWarnNum') && checkMoney('money', 'lblWarnMoney')) {
        // 数据检验通过后，接收页面数据
        var equipName = document.getElementById("equipName");
        var buyer = document.getElementById("buyer");
        var seller = document.getElementById("seller");
        var num = document.getElementById("num");
        var buyDate = document.getElementById("buyDate");
        var money = document.getElementById("money");
        //把数据数据存储在buy对象中
        var buy = {
            "equipName": equipName.value,
            "buyer": buyer.value,
            "seller": seller.value,
            "num": num.value,
            "buyDate": buyDate.value,
            "money": money.value,
        };
        return buy;
    }
}

/*****************************删除采购*************************************/
//发送删除采购请求
function deleteBuy(buyId) {
    // 温馨提示
    var con = window.confirm("确定要删除这条数据么?");
    // 判断一下
    if (con == true) {
        console.log("start to delete");
        var url = "deleteBuy.jsp?buyId=" + buyId;
        request.open("get", url, true);
        request.onreadystatechange = handleDeleteResult;
        request.send();
    }
}

//处理删除结果，重新加载表格
function handleDeleteResult() {
    console.log("enter handle delete result");
    if (request.readyState == 4 && request.status == 200) {
        console.log("enter first if");
        console.log(request.responseText);
        var result = JSON.parse(request.responseText);
        if (result == "true") {
            resultAlert("删除成功！");
            loadBuyInfos();
        } else resultAlert("删除失败！");
    }
}

/*****************************更新采购*************************************/
//发送更新采购请求
function updateBuy(buyId) {
    console.log("enter update_buy");
    var b = getUpdateBuyInfo();
    var str = "buyId=" + b.buyId + "&equipName2=" + b.equipName2 + "&buyer2=" + b.buyer2 +
        "&seller2=" + b.seller2 + "&num2=" + b.num2 + "&buyDate2=" + b.buyDate2 +
        "&money2=" + b.money2;
    var url = "updateBuy.jsp?" + str;
    request.open("get", url, true);
    request.onreadystatechange = handleUpdateResult;
    request.send();
}

//处理更新结果，重新加载表格
function handleUpdateResult() {
    if (request.readyState == 4 && request.status == 200) {
        var result = JSON.parse(request.responseText);
        if (result == "true") {
            resultAlert("修改成功！");
            CloseDiv('MyDiv2', 'fade2');
            loadBuyInfos();
        } else resultAlert("修改失败！");
    }
}

//从界面获取更新后的实验器材信息
function getUpdateBuyInfo() {
//这边有问题，假设所有的数据都通过检测
    if (true) {
        // 数据检验通过后，接收页面数据
        var buyId = document.getElementById("buyId");
        var equipName2 = document.getElementById("equipName2");
        var buyer2 = document.getElementById("buyer2");
        var seller2 = document.getElementById("seller2");
        var num2 = document.getElementById("num2");
        var buyDate2 = document.getElementById("buyDate2");
        var money2 = document.getElementById("money2");
        //把更新的数据存储在buy对象中
        var buy = {
            "buyId": buyId.value,
            "equipName2": equipName2.value,
            "buyer2": buyer2.value,
            "seller2": seller2.value,
            "buyDate2": buyDate2.value,
            "num2": num2.value,
            "money2": money2.value,
        };
        return buy;
    }
}

//加载根据ID查询的结果表，用于更新
function loadSearchBuyById(buyId) {
    console.log("enter loadSearchBuyById");
    request.open("get", "buyList.jsp", true);
    request.onreadystatechange = function () {
        SearchBuyById(buyId);
    }
    request.send();
}

//通过id搜索器材
function SearchBuyById(buyId) {
    console.log("enter SearchBuyById");
    if (request.readyState == 4 && request.status == 200) {
        var buy = JSON.parse(request.responseText);
        for (var i = 0; i < buy.length; i++) {
            if (buy[i].buyId == buyId) {
                ShowDiv2(buy[i]);
                return;
            }
        }
        return "未找到！"
    }
}

//检验函数
function checkEquip(id, warnId, warnInfo, reg) {
    var str = document.getElementById(id).value;
    var w = $("#" + warnId);
    if (str == null || str == "") {
        w.html("不能为空！");
        return false;
    } else if (!reg.test(str)) {
        w.html(warnInfo);
        return false;
    } else {
        w.html("");
        return true;
    }
}

//简单检验函数
function simpleCheck(id, warnId) {
    var str = document.getElementById(id).value;
    var w = $("#" + warnId);
    if (str == null || str == "") {
        // w.html("不能为空！");
        return false;
    } else {
        w.html("");
        return true;
    }
}

//检验查询时输入的器材名称
function checkSearchEquipName() {
    return simpleCheck('searchEquipName', 'lblWarnSearchName');
}

//检验查询时输入的id
function checkSearchBuyId() {
    return simpleCheck('searchBuyId', 'lblWarnSearchId');
}

//检验新建采购器材名称
function checkEquipName(id, warn) {
    var reg = /^([\u4e00-\u9fa5]){1,10}$/;//只能是中文，长度<10位
    var warnInfo = "应为<10个汉字!";
    return checkEquip(id, warn, warnInfo, reg);
}


//检验购买数量
function checkBuyNum(id, warn) {
    var reg = /^([0-9]){1,10}$/i;//只能是数字，长度为<10位
    var warnInfo = "应为<10个数字!";
    return checkEquip(id, warn, warnInfo, reg);
}

//检验价格
function checkMoney(id, warn) {
    var reg = /^([0-9.]){1,10}$/i;//只能是数字，长度为<10位
    var warnInfo = "应为<10个数字!";
    return checkEquip(id, warn, warnInfo, reg);
}