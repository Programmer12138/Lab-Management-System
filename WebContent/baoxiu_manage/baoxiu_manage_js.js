/**
 * 管理界面的js文件，用于发出报修器材信息数据请求，baoXiuList.jsp将会响应并返回数据
 *
 * by heyuanfly 2020-12-24
 */


var request = new XMLHttpRequest();

//加载报修信息表
function loadBaoXiuInfos() {
    request.open("get", "baoXiuList.jsp", true);
    request.onreadystatechange = fillBaoXiuTable;
    request.send();
}

//填充报修信息表
function fillBaoXiuTable() {
    if (request.readyState == 4 && request.status == 200) {
        var tableId = "baoXiuTable";
        var equips = JSON.parse(request.responseText);

        showBaoXiu(equips, tableId);
    }
}

//加载查询结果表
function loadSearchResult() {
    request.open("get", "baoXiuList.jsp", true);
    request.onreadystatechange = fillSearchResult;
    request.send();
}

//判断是否符合条件，填充查询结果表
function fillSearchResult() {
    if (request.readyState == 4 && request.status == 200) {
        var table = "baoXiuTable";
        var equips = JSON.parse(request.responseText);
        var result = [];
        var equipId = document.getElementById("searchEquipId").value;
        var equipName = document.getElementById("searchEquipName").value;

        if (checkSearchEquipName() && checkSearchEquipId()) {
            //alert("0");
            for (var i = 0; i < equips.length; i++) {
                if (equips[i].equipId == equipId && equips[i].equipName == equipName) {
                    result.push(equips[i]);
                }
            }
            showBaoXiu(result, table);
        } else if (checkSearchEquipName() && !checkSearchEquipId()) {
            //alert("1");
            for (var i = 0; i < equips.length; i++) {
                if (equips[i].equipName == equipName) {
                    result.push(equips[i]);

                }
            }
            showBaoXiu(result, table);
        } else if (!checkSearchEquipName() && checkSearchEquipId()) {
            //alert("2");
            for (var i = 0; i < equips.length; i++) {
                if (equips[i].equipId == equipId) {
                    //alert("1");
                    result.push(equips[i]);
                }
            }
            showBaoXiu(result, table);
        } else {
            showBaoXiu(equips, table);
            //alert("3");
        }
    }
}

//加载查询结果表
function loadSearchBaoXiuById(baoXiuId) {
    request.open("get", "baoXiuList.jsp", true);
    request.onreadystatechange = function () {
        SearchBaoXiuById(baoXiuId);
    }
    request.send();
}

//通过id搜索报修记录
function SearchBaoXiuById(baoXiuId) {
    if (request.readyState == 4 && request.status == 200) {
        var baoxiu = JSON.parse(request.responseText);
        for (var i = 0; i < baoxiu.length; i++) {
            if (baoxiu[i].equipId == baoXiuId) {
                ShowDiv2(baoxiu[i]);
                return;
            }
        }
        return "未找到！"
    }
}

//显示报修信息
function showBaoXiu(baoxiu, tableId) {
    $("#" + tableId + " tr:gt(0)").empty();
    $("#" + tableId + " tr").not(':eq(0)').empty();
    var table = document.getElementById(tableId);
    for (var index in baoxiu) {
        var newRow = table.insertRow(table.rows.length);
        var col1 = newRow.insertCell(0);
        var col2 = newRow.insertCell(1);
        var col3 = newRow.insertCell(2);
        var col4 = newRow.insertCell(3);
        var col5 = newRow.insertCell(4);
        var col6 = newRow.insertCell(5);
        var col7 = newRow.insertCell(6);
        var col8 = newRow.insertCell(7);

        col1.innerHTML = baoxiu[index].equipName;
        col2.innerHTML = baoxiu[index].equipId;
        col3.innerHTML = baoxiu[index].location;
        col4.innerHTML = baoxiu[index].sno;
        col5.innerHTML = baoxiu[index].sname;
        col6.innerHTML = baoxiu[index].status;
        col7.innerHTML = baoxiu[index].baoXiuDate;
        col8.innerHTML = "<button type='button' style='color: darkblue' onclick='loadSearchBaoXiuById("
            + baoxiu[index].baoXiuId + ");'>更新</button>||<button type='button' style='color: red' onclick='deleteBaoXiu("
            + baoxiu[index].baoXiuId + ");'>删除</button>";
    }
}


//发送删除报修记录请求
function deleteBaoXiu(baoXiuId) {
    // 温馨提示
    var con = window.confirm("确定要删除这条数据么?");
    // 判断一下
    if (con == true) {
        var url = "deleteBaoXiu.jsp?baoXiuId=" + baoXiuId;
        request.open("get", url, true);
        request.onreadystatechange = handleDeleteResult;
        request.send();
    }
}

//处理删除结果，重新加载表格
function handleDeleteResult() {
    if (request.readyState == 4 && request.status == 200) {
        var result = JSON.parse(request.responseText);
        if (result == "true") {
            resultAlert2("删除成功！");
            loadBaoXiuInfos();
        } else resultAlert2("删除失败！");
    }
}

//发送更新报修信息请求
function updateBaoXiu() {
    var b = getUpdateBaoXiuInfo();
    var url = "updateBaoXiu.jsp?baoXiuId=" + b.baoXiuId + "&status=" + b.status;
    request.open("get", url, true);
    request.onreadystatechange = handleUpdateResult;
    request.send();
}

//处理更新结果，重新加载表格
function handleUpdateResult() {
    if (request.readyState == 4 && request.status == 200) {
        var result = JSON.parse(request.responseText);
        if (result == "true") {
            resultAlert2("状态更新成功！");
            CloseDiv('MyDiv2', 'fade2');
            loadBaoXiuInfos();
        } else resultAlert2("状态更新失败！");
    }
}

//从界面获取更新后的报修信息
function getUpdateBaoXiuInfo() {
    // 数据检验通过后，接收页面数据
    var status = document.getElementById("status").value;
    var baoXiuId = document.getElementById("baoXiuId").value;
    //把更新的数据存储在baoxiu对象中
    var baoxiu = {
        "baoXiuId": baoXiuId,
        "status": status
    };
    return baoxiu;
}

//弹出修改隐藏层
function ShowDiv2(baoxiu) {
    // 将获取到的数据显示到div中的元素
    $("#baoXiuId").val(baoxiu.baoXiuId);
    $("#equipId2").val(baoxiu.equipId);
    $("#equipName2").val(baoxiu.equipName);
    $("#sno").val(baoxiu.sno);
    $("#sname").val(baoxiu.sname);
    $("#location").val(baoxiu.location);
    $("#baoXiuDate").val(baoxiu.baoXiuDate);
    $("#status").val(baoxiu.status);

    // 显示div
    document.getElementById('MyDiv2').style.display = 'block';
    document.getElementById('fade2').style.display = 'block';
    var fade2 = $("#" + "fade2")
    fade2.width($(document).scrollWidth);
    fade2.height($(document).height());
}

//关闭弹出层
function CloseDiv(show_div, bg_div) {
    document.getElementById(show_div).style.display = 'none';
    document.getElementById(bg_div).style.display = 'none';
}


//操作结果提示
function resultAlert(result) {
    if (result == 1) {
        $('.alert').html("操作成功").addClass('alert-success').show().delay(2000).fadeOut();
    } else {
        $('.alert').html("操作失败").addClass('alert-success').show().delay(2000).fadeOut();
    }
}

function resultAlert2(result) {
    $('.alert').html(result).addClass('alert-success').show().delay(2000).fadeOut();
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
function checkSearchEquipId() {
    return simpleCheck('searchEquipId', 'lblWarnSearchId');
}



