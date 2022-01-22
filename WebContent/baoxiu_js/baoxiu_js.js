var request = new XMLHttpRequest();

/***************************** 新增报修记录 *************************************/
//发送新增报修请求
function addBaoXiu() {
    var b = getAddBaoXiuInfo();
    var str = "status=" + b.status + "&equipId=" + b.equipId + "&sno=" + b.sno +
        "&baoXiuDate=" + b.baoXiuDate;
    var url = "addBaoXiu.jsp?" + str;
    request.open("get", url, true);
    request.onreadystatechange = handleAddResult;
    request.send();
}

//处理新增结果，重新加载表格
function handleAddResult() {
    if (request.readyState == 4 && request.status == 200) {
        var result = JSON.parse(request.responseText);
        if (result == true) {
            resultAlert2("报修成功！");
            window.setTimeout("window.location.href=\"homepage.html\"", 1500);
        }
    } else resultAlert2("报修失败！");
}

//从界面获取新增报修信息
function getAddBaoXiuInfo() {
    if ($('#lblWarnEquipId').html().toString() == "编号有效" && $('#lblWarnSNO').html().toString() == "验证通过") {
        // 数据检验通过后，接收页面数据
        var status = document.getElementById("status").value;
        var equipId = document.getElementById("equipId").value;
        var sno = document.getElementById("SNO").value;
        var baoXiuDate = document.getElementById("baoXiuDate").value;

        var BaoXiu = {
            "status": status,
            "equipId": equipId,
            "sno": sno,
            "baoXiuDate": baoXiuDate
        };
        return BaoXiu;
    } else resultAlert2("读取页面数据失败");
}

function resultAlert2(result) {
    $('.alert').html(result).addClass('alert-success').show().delay(2000).fadeOut();
}