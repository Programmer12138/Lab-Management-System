// var reg = /^([\u4e00-\u9fa5]){10}$/;
// var reg = /^([a-zA-Z0-9]){1,50}$/i;
// var reg = /^([0-9]){0,10}$/i;
// var reg=/^([\u4e00-\u9fa5]){2,10}$/;
var request1 = new XMLHttpRequest();
var request2 = new XMLHttpRequest();

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


//检验报修器材是否存在
function checkIdExist() {
    request1.open("get", "equipList.jsp", true);
    request1.onreadystatechange = isExistId;
    request1.send();
    return isExistId();
}

//把报修ID与返回的器材表比对
function isExistId() {
    var w = $("#lblWarnEquipId")
    console.log('返回' + request1.readyState);
    console.log('返回' + request1.status);
    if (request1.readyState == 4 && request1.status == 200) {
        var equips = JSON.parse(request1.responseText);
        var id = $("#equipId").val();
        for (var i = 0; i < equips.length; i++) {
            if (equips[i].equipId == id) {
                w.html("编号有效");
                return true;
            }
        }
        w.html("无效编号");
        return false;
    }
    w.html("无法验证");
    return false;
}

//检验报修器材编号
function checkBXEquipId(id, warn) {
    var reg = /^([a-zA-Z0-9]){1,10}$/i;
    var warnInfo = "<10位的字母数字";
    console.log(checkEquip(id, warn, warnInfo, reg));
    console.log(checkIdExist());
    return checkEquip(id, warn, warnInfo, reg) && checkIdExist();
}

//检验学生学号是否合法
function checkSNO(id, warn) {
    var reg = /^([a-zA-Z0-9]){1,10}$/i;
    var warnInfo = "<=10位的字母数字";
    return checkEquip(id, warn, warnInfo, reg) && checkSnoExist();
}

//检验报修器材是否存在
function checkSnoExist() {
    var sno = $("#SNO").val();
    request2.open("get", "studentExist.jsp?sno=" + sno, true);
    request2.onreadystatechange = isExistSno;
    request2.send();
    return isExistSno();
}

//把报修ID与返回的器材表比对
function isExistSno() {
    var w = $("#lblWarnSNO");
    if (request2.readyState == 4 && request2.status == 200) {
        var exist = JSON.parse(request2.responseText);
        if (exist == "0") {
            w.html("无效学号");
            return false;
        } else {
            w.html("验证通过");
            return true;
        }
    }
    w.html("无法验证");
    return false;
}




