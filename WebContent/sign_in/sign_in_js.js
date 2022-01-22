var request = new XMLHttpRequest();

function CheckPasswordRequest(sign) {
    var url = "checkPassword.jsp?account=" + sign.account + "&password=" + sign.password;
    request.open("get", url, true);
    request.onreadystatechange = handleCheckResult;
    request.send();
}

//填充实验器材信息表
function handleCheckResult() {
    if (request.readyState == 4 && request.status == 200) {
        var result = JSON.parse(request.responseText);
        if (result == "true") {
            resultAlert2("登录成功！");
            setTimeout("window.location.href = \"equipManage.html\"; ", 1000);
        } else resultAlert2("帐户或密码输入错误！");
    }
}

function resultAlert2(result) {
    $('.alert').html(result).addClass('alert-success').show().delay(2000).fadeOut();
}

function isNull(id, warnId) {
    return simpleCheck(id, warnId);
}

function checkPassword(accountId, passId, accountWarnId, passwordWarnId) {
    var sign = getAccountInput(accountId, passId, accountWarnId, passwordWarnId);
    CheckPasswordRequest(sign);

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

function getAccountInput(accountId, passId, accountWarnId, passwordWarnId) {
    if (isNull(accountId, accountWarnId) && isNull(passId, passwordWarnId)) {
        // 数据检验通过后，接收页面数据
        var account = document.getElementById(accountId).value;
        var passId = document.getElementById(passId).value;

        //把获得的账号密码放在sign对象中
        var sign = {
            "account": account,
            "password": passId
        };
        return sign;
    }
}