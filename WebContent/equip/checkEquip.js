// var reg = /^([\u4e00-\u9fa5]){10}$/;
// var reg = /^([a-zA-Z0-9]){1,50}$/i;
// var reg = /^([0-9]){0,10}$/i;
// var reg=/^([\u4e00-\u9fa5]){2,10}$/;
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
function checkSearchEquipId() {
    return simpleCheck('searchEquipId', 'lblWarnSearchId');
}

//检验新增器材编号
function checkEquipId(id, warn) {
    var reg = /^([a-zA-Z0-9]){1,10}$/i;
    var warnInfo = "<10位的字母数字";
    return (checkEquip(id, warn, warnInfo, reg) && checkIdRepeat());
}

//检验新建器材名称
function checkEquipName(id, warn) {
    var reg = /^([\u4e00-\u9fa5]){1,10}$/;//只能是中文，长度<10位
    var warnInfo = "应为<10个汉字!";
    return checkEquip(id, warn, warnInfo, reg);
}

//检验生成商名称
function checkProducer(id, warn) {
    var reg = /^([\u4e00-\u9fa5]){1,20}$/;//只能是中文，长度<10位
    var warnInfo = "应为<20个汉字!";
    return checkEquip(id, warn, warnInfo, reg);
}

//检验价格
function checkPrice(id, warn) {
    var reg = /^([0-9]){1,10}$/i;//只能是数字，长度为<10位
    var warnInfo = "应为<10个数字!";
    return checkEquip(id, warn, warnInfo, reg);
}

//检验添加日期
function checkAddDate(id, warn) {
    return simpleCheck(id, warn);
}
