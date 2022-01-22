var request = new XMLHttpRequest();

//加载信息表
function loadInfos(url, tableId) {
    request.open("get", url, true);
    request.onreadystatechange = function () {
        fillTable(tableId);
    };
    request.send();
}

//加载查询结果表
function loadSearchResult(url, equips, id1, id2, warnId1, warnId2, tableId) {
    request.open("get", url, true);
    request.onreadystatechange = function () {
        fillSearchResultTable(tableId);
    };
    request.send();
}

//
//填充信息表
function fillTable(tableId) {
    if (request.readyState == 4 && request.status == 200) {
        var equips = JSON.parse(request.responseText);
        showEquips(equips, tableId);
    }
}


function fillSearchResultTable(tableId) {
    if (request.readyState == 4 && request.status == 200) {
        var equips = JSON.parse(request.responseText);
        showEquips(getSearchResult(equips, id1, id2, warnId1, warnId2), tableId);
    }
}

//向表中插入数据
function showEquips(equips, tableId) {
    $("#" + tableId + " tr:gt(0)").empty();//先清空表格
    $("#" + tableId + " tr").not(':eq(0)').empty();
    var table = $("#" + tableId);
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
        col8.innerHTML = "<button type='button' style='color: darkblue' onclick='updateEquip(\'"
            + equips[index].equipId + "\');'>更新</button>||<button type='button' style='color: red' onclick='deleteEquip(\'"
            + equips[index].equipId + "\');'>删除</button>";
    }
}

//判断是否符合条件
function getSearchResult(equips, id1, id2, warnId1, warnId2) {
    var result = [];
    var equipId = $("#" + id1);
    var equipName = $("#" + id2);
    if (checkSearchEquipId(id1, warnId1) && checkSearchEquipName(id2, warnId2)) {
        for (var i = 0; i < equips.length; i++) {
            if (equips[i].equipId == equipId && equips[i].equipName == equipName) {
                result.push(equips[i]);
            }
        }
        return result;
    } else if (checkSearchEquipName(id2, warnId2) && !checkSearchEquipId(id1, warnId1)) {
        for (var i = 0; i < equips.length; i++) {
            if (equips[i].equipName == equipName) {
                result.push(equips[i]);
            }
        }
        return result;
    } else if (!checkSearchEquipName(id2, warnId2) && checkSearchEquipId(id1, warnId1)) {
        for (var i = 0; i < equips.length; i++) {
            if (equips[i].equipId == equipId) {
                result.push(equips[i]);
            }
        }
        return result;
    }
    return equips;
}



