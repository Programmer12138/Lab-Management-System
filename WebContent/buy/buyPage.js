// var reg = /^([\u4e00-\u9fa5]){10}$/;
// var reg = /^([a-zA-Z0-9]){1,50}$/i;
// var reg = /^([0-9]){0,10}$/i;
//弹出新建隐藏层
function ShowDiv(show_div, bg_div) {
    $("#equipId").value = '';
    $("#equipName").value = '';
    $("#producer").value = '';
    $("#price").value = '';
    $("#building").value = '';
    $("#room").value = '';
    $("#rname").value = '';
    $("#charger").value = '';
    $("#addDate").value = '';
    $("#cvs ").value = null;

    document.getElementById(show_div).style.display = 'block';
    document.getElementById(bg_div).style.display = 'block';

    // var bgdiv = document.getElementById(bg_div);
    // bgdiv.style.width = document.body.scrollWidth;
    // bgdiv.style.height = $(document).height();
    $("#" + bg_div).height($(document).height());
}

//弹出修改隐藏层
function ShowDiv2(buy) {
    console.log("start to show div2");
    $("#buyId").val(buy.buyId);
    $("#equipName2").val(buy.equipName);
    $("#seller2").val(buy.seller);
    $("#buyer2").val(buy.buyer);
    $("#num2").val(buy.buyNum);
    $("#money2").val(buy.money);
    $("#buyDate2").val(buy.buyDate);
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
    if (result.includes("成功")) {
        $('.alert').html(result).addClass('alert-success').show().delay(2000).fadeOut();
    } else
        $('.alert').html(result).addClass('alert-warning').show().delay(2000).fadeOut();
}

function resultAlert2(result) {
    $('.alert').html(result).addClass('alert-success').show().delay(2000).fadeOut();
}


// 定时器函数
function showSuccessMsg() {
    $('.popup_con').fadeIn('fast', function () {
        setTimeout(function () {
            $('.popup_con').fadeOut('fast', function () {
            });
        }, 2000)
    });
    window.setTimeout("CloseDiv('MyDiv', 'fade');window.location.href=\"homepage.html\";");
}


