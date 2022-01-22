var request = new XMLHttpRequest();

function checkAccountRepeat(id, warnId) {
    var url = "checkAccount.jsp?account=" + $('#' + id).val();
    request.open("get", url, true);
    request.onreadystatechange = function (ev) {
        handleCheckResult(warnId);
    };
    request.send();
    return handleCheckResult(warnId);
}

//处理检测注册账号是否重复的结果
function handleCheckResult(warnId) {
    var w = $('#' + warnId);

    if (request.readyState == 4 && request.status == 200) {
        var result = JSON.parse(request.responseText);
        if (result == true) {
            w.html("账号已占用！");
            return false;
        } else {
            w.html("账号有效");
            return true;
        }
    }
}

function resultAlert2(result) {
    $('.alert').html(result).addClass('alert-success').show().delay(2000).fadeOut();
}


function checkInput(id, warnId, warnInfo, reg) {
    var str = $('#' + id).val();
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

function checkAccount(id, warnId) {
    var reg = /^([0-9]){1,10}$/i;
    var warnInfo = "<10位的数字";
    return (checkInput(id, warnId, warnInfo, reg) && checkAccountRepeat(id, warnId));
}

function checkUserName(id, warnId) {
    var reg = /^([a-zA-Z\u4e00-\u9fa5]){1,10}$/;//只能是中文字母，长度<10位
    var warnInfo = "应为<10个汉字或字母!";
    return checkInput(id, warnId, warnInfo, reg);
}

function checkPassword(id, warnId) {
    var reg = /^([a-zA-Z0-9]){1,10}$/i;
    var warnInfo = "<10位的字母数字";
    return checkInput(id, warnId, warnInfo, reg);
}

function checkPassword2(id1, id2, warnId) {
    var p1 = $('#' + id1).val();
    var p2 = $('#' + id2).val();
    var w = $('#' + warnId);
    if (p1 != p2) {
        w.html("密码不一致");
        return false;
    } else {
        w.html("");
        return true;
    }
}


function register(accountId, usernameId, passwordId) {
    var a = $('#' + accountId).val();
    var u = $('#' + usernameId).val();
    var p = $('#' + passwordId).val();
    var url = "register.jsp?account=" + a + "&username=" + u + "&password=" + p;
    if (($('#lblWarnAccount').html() == '账号有效') &&
        checkUserName('username', 'lblWarnUserName') &&
        checkPassword('password', 'lblWarnPassword') &&
        checkPassword2('password', 'password2', 'lblWarnPassword')) {
        request.open("get", url, true);
        request.onreadystatechange = handleRegisterResult;
        request.send();
    } else resultAlert2("数据验证未通过");
}

//处理注册结果
function handleRegisterResult() {
    if (request.readyState == 4 && request.status == 200) {
        var result = JSON.parse(request.responseText);
        if (result == true) {
            resultAlert2("注册成功！");
            setTimeout("window.location.href = \"equipManage.html\"; ", 1000);
        } else resultAlert2("注册失败！");
    }
}