/**
 * 管理界面的js文件，用于发出器材信息数据请求，manage_jsp.jsp将会响应并返回数据
 *
 * by heyuanfly 2020-12-24
 */

/*****************************显示器材*************************************/
var request = new XMLHttpRequest();

//加载器材信息表
function loadEquipInfos() {
    request.open("get", "equipList.jsp", true);
    request.onreadystatechange = fillEquipTable;
    request.send();
}

//填充实验器材信息表
function fillEquipTable() {
    if (request.readyState == 4 && request.status == 200) {
        var equips = JSON.parse(request.responseText);
        showEquips(equips, "equipTable");
    }
}

//显示器材信息
function showEquips(equips, tableId) {
    $("#" + tableId + " tr:gt(0)").empty();
    $("#" + tableId + " tr").not(':eq(0)').empty();
    var table = document.getElementById(tableId);
    for (var index in equips) {
        var newRow = table.insertRow(table.rows.length);
        var col1 = newRow.insertCell(0);
        var col2 = newRow.insertCell(1);
        var col3 = newRow.insertCell(2);
        var col4 = newRow.insertCell(3);
        var col5 = newRow.insertCell(4);
        var col6 = newRow.insertCell(5);
        var col7 = newRow.insertCell(6);
        var col8 = newRow.insertCell(7);

        col1.innerHTML = equips[index].equipName;
        col2.innerHTML = equips[index].equipId;
        col3.innerHTML = equips[index].producerName;
        col4.innerHTML = equips[index].price;
        col5.innerHTML = equips[index].location;
        col6.innerHTML = equips[index].charger;
        col7.innerHTML = equips[index].addDate;
        col8.innerHTML = "<button type='button' style='color: darkblue' onclick='loadSearchEquipById("
            + equips[index].equipId + ");'>更新</button>||<button type='button' style='color: red' onclick='deleteEquip("
            + equips[index].equipId + ");'>删除</button>";
    }
}

/*****************************查询器材*************************************/

//加载查询结果表
function loadSearchResult() {
    request.open("get", "equipList.jsp", true);
    request.onreadystatechange = fillSearchResult;
    request.send();
}

//判断是否符合条件，填充查询结果表
function fillSearchResult() {
    if (request.readyState == 4 && request.status == 200) {
        var table = "equipTable";
        var equips = JSON.parse(request.responseText);
        var result = [];
        var equipId = document.getElementById("searchEquipId").value;
        var equipName = document.getElementById("searchEquipName").value;

        if (checkSearchEquipName() && checkSearchEquipId()) {
            // resultAlert2("1");
            for (var i = 0; i < equips.length; i++) {
                if (equips[i].equipId == equipId && equips[i].equipName == equipName) {
                    result.push(equips[i]);
                }
            }
            showEquips(result, table);
        } else if (checkSearchEquipName() && !checkSearchEquipId()) {
            // resultAlert2("2");
            for (var i = 0; i < equips.length; i++) {
                if (equips[i].equipName == equipName) {
                    result.push(equips[i]);
                }
            }
            showEquips(result, table);
        } else if (!checkSearchEquipName() && checkSearchEquipId()) {
            // resultAlert2("3");
            for (var i = 0; i < equips.length; i++) {
                if (equips[i].equipId == equipId) {
                    result.push(equips[i]);
                    showEquips(result, table);
                    return;
                }
            }

        } else {
            showEquips(equips, table);
            resultAlert2("未找到！");
        }
    }
}

//加载根据ID查询的结果表，用于更新
function loadSearchEquipById(equipId) {
    request.open("get", "equipList.jsp", true);
    request.onreadystatechange = function () {
        SearchEquipById(equipId);
    }
    request.send();
}

//通过id搜索器材
function SearchEquipById(equipId) {
    if (request.readyState == 4 && request.status == 200) {
        var equips = JSON.parse(request.responseText);
        for (var i = 0; i < equips.length; i++) {
            if (equips[i].equipId == equipId) {
                ShowDiv2(equips[i]);
                return;
            }
        }
        return "未找到！"
    }
}

//判断新建ID是否重复
function checkIdRepeat() {
    request.open("get", "equipList.jsp", true);
    request.onreadystatechange = isRepeatId;
    request.send();
    return isRepeatId();
}

//把新建ID与返回的器材表比对
function isRepeatId() {
    var w = $("#lblWarnEquipId");
    if (request.readyState == 4 && request.status == 200) {
        var equips = JSON.parse(request.responseText);
        var newId = $("#equipId").val();
        for (var i = 0; i < equips.length; i++) {
            if (equips[i].equipId == newId) {
                w.html("编号重复！");
                return false;
            }
        }
        w.html("编号有效");
        return true;
    }
    w.html("无法验证编号是否重复");
    return false;
}

/*****************************新增器材*************************************/
//发送新增器材请求
function addEquip() {
    var e = getAddEquipInfo();
    var str = "equipId=" + e.equipId + "&equipName=" + e.equipName + "&producerName=" + e.producerName +
        "&price=" + e.price + "&location=" + e.location + "&charger=" + e.charger +
        "&addDate=" + e.addDate;// + "&avatar=" + e.avatar;
    var url = "addEquip.jsp?" + str;
    request.open("get", url, true);
    request.onreadystatechange = handleAddResult;
    request.send();
}

//处理新增结果，重新加载表格
function handleAddResult() {
    if (request.readyState == 4 && request.status == 200) {
        var result = JSON.parse(request.responseText);
        loadEquipInfos();
        resultAlert2(result);
        CloseDiv('MyDiv', 'fade');
    } else resultAlert(0);
}

//获取新增实验器材
function getAddEquipInfo() {
    if ($('#lblWarnEquipId').html().toString() == "编号有效" && checkEquipName('equipName', 'lblWarnEquipName') && checkPrice('price', 'lblWarnPrice') && checkAddDate('addDate', 'lblWarnAddDate')) {
        // 数据检验通过后，接收页面数据
        var equipName = document.getElementById("equipName");
        var equipId = document.getElementById("equipId");
        var producerName = document.getElementById("producer");
        var price = document.getElementById("price");
        var building = document.getElementById("building");
        var room = document.getElementById("room");
        var rname = document.getElementById("rname");
        var charger = document.getElementById("charger");
        var addDate = document.getElementById("addDate");
        // var avatar = document.getElementById("cvs").toDataURL();
        var location = building.value + "-" + room.value + "-" + rname.value;
        //把数据数据存储在equip对象中
        var equip = {
            "equipName": equipName.value,
            "equipId": equipId.value,
            "producerName": producerName.value,
            "price": price.value,
            "location": location,
            "charger": charger.value,
            "addDate": addDate.value,
            // "avatar": avatar
        };
        return equip;
    } else resultAlert2("数据检验未通过");
}

/*****************************删除器材*************************************/
//发送删除器材请求
function deleteEquip(equipId) {
    // 温馨提示
    var con = window.confirm("确定要删除这条数据么?");
    // 判断一下
    if (con == true) {
        var url = "deleteEquip.jsp?equipId=" + equipId;
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
            loadEquipInfos();
            resultAlert(1);
        } else resultAlert(0);
    } else resultAlert2("获取删除结果失败");
}

/*****************************更新器材*************************************/
//发送更新器材请求
function updateEquip(equipId) {
    var e = getUpdateEquipInfo();
    var str = "equipId=" + e.equipId + "&equipName=" + e.equipName + "&producerName=" + e.producerName +
        "&price=" + e.price + "&location=" + e.location + "&charger=" + e.charger +
        "&addDate=" + e.addDate;// + "&avatar=" + e.avatar;
    var url = "updateEquip.jsp?" + str;
    request.open("get", url, true);
    request.onreadystatechange = handleUpdateResult;
    request.send();
}

//处理更新结果，重新加载表格
function handleUpdateResult() {
    if (request.readyState == 4 && request.status == 200) {
        var result = JSON.parse(request.responseText);
        loadEquipInfos();
        resultAlert2(result);
        CloseDiv('MyDiv2', 'fade2');

        // } else resultAlert(0);
    }
}

//从界面获取更新后的实验器材信息
function getUpdateEquipInfo() {
    if (checkEquipName('equipName2', 'lblWarnEquipName2') && checkPrice('price2', 'lblWarnPrice2') && checkAddDate('addDate2', 'lblWarnAddDate2')) {
        // 数据检验通过后，接收页面数据
        var equipId = document.getElementById("equipId2");
        var equipName = document.getElementById("equipName2");
        var producerName = document.getElementById("producer2");
        var price = document.getElementById("price2");
        var building = document.getElementById("building2");
        var room = document.getElementById("room2");
        var rname = document.getElementById("rname2");
        var charger = document.getElementById("charger2");
        var addDate = document.getElementById("addDate2");
        // var avatar = document.getElementById("cvs2").toDataURL();
        var location = building.value + "-" + room.value + "-" + rname.value;
        //把更新的数据存储在equip对象中
        var equip = {
            "equipId": equipId.value,
            "equipName": equipName.value,
            "producerName": producerName.value,
            "price": price.value,
            "location": location,
            "charger": charger.value,
            "addDate": addDate.value,
            // "avatar": avatar
        };
        return equip;
    }
}

