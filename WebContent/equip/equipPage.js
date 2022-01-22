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
function ShowDiv2(equip) {
    var array = [];
    array = equip.location.split("-");
    // 将获取到的数据显示到div中的元素
    $("#equipId2").val(equip.equipId);
    $("#equipName2").val(equip.equipName);
    $("#producer2").val(equip.producerName);
    $("#price2").val(equip.price);
    $("#building2").val(array[0]);
    $("#room2").val(array[1]);
    $("#rname2").val(array[2]);
    $("#charger2").val(equip.charger);
    $("#addDate2").val(equip.addDate);
    // 显示div
    document.getElementById('MyDiv2').style.display = 'block';
    document.getElementById('fade2').style.display = 'block';
    // showAvatar(equip.avatar);
    // var bgdiv = document.getElementById('fade2');
    // bgdiv.style.width = document.body.scrollWidth;
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

//上传图片
function readFile() {
    //获取上传按钮
    var input1 = document.getElementById("upload");
    if (typeof FileReader === 'undefined') {
        //result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
        input1.setAttribute('disabled', 'disabled');
    } else {
        input1.addEventListener('change', readFile, false);

    }
    var file = this.files[0]; //获取上传文件列表中第一个文件
    if (!/image\/\w+/.test(file.type)) {
        //图片文件的type值为image/png或image/jpg
        alert("文件必须为图片！");
        return false;
    }
    // console.log(file);
    var reader = new FileReader(); //实例一个文件对象
    reader.readAsDataURL(file); //把上传的文件转换成url
    //当文件读取成功便可以调取上传的接口
    reader.onload = function (e) {

        var image = new Image();
        image.setAttribute("crossOrigin", 'Anonymous')
        // 设置src属性
        var id = document.getElementById("workerId2").value;
        image.src = e.target.result;
        for (var i = 0; i < equips.length; i++) {
            if (equips[i].workerId == id) {
                equips[i].avatar = image.src;
            }
        }
        var max = 200;
        // 绑定load事件处理器，加载完成后执行，避免同步问题
        image.onload = function () {
            // 获取 canvas DOM 对象
            var canvas = document.getElementById("cvs");
            // 获取 canvas的 2d 环境对象,
            var ctx = canvas.getContext("2d");
            // canvas清屏
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            document.getElementById("cvs").style.display = 'block';
            ctx.drawImage(image, 0, 0, 200, 200);

        };
    }
}

function readFile2() {
    //获取上传按钮
    var input1 = document.getElementById("upload2");
    if (typeof FileReader === 'undefined') {
        //result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
        input1.setAttribute('disabled', 'disabled');
    } else {
        input1.addEventListener('change', readFile2, false);

    }
    var file = this.files[0]; //获取上传文件列表中第一个文件
    if (!/image\/\w+/.test(file.type)) {
        //图片文件的type值为image/png或image/jpg
        alert("文件必须为图片！");
        return false;
    }
    // console.log(file);
    var reader = new FileReader(); //实例一个文件对象
    reader.readAsDataURL(file); //把上传的文件转换成url
    //当文件读取成功便可以调取上传的接口
    reader.onload = function (e) {

        var image = new Image();
        image.setAttribute("crossOrigin", 'Anonymous')
        // 设置src属性
        image.src = e.target.result;


        // 绑定load事件处理器，加载完成后执行，避免同步问题
        image.onload = function () {
            // 获取 canvas DOM 对象
            var canvas = document.getElementById("cvs2");
            // 获取 canvas的 2d 环境对象,
            var ctx = canvas.getContext("2d");
            // canvas清屏
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            document.getElementById("cvs2").style.display = 'block';
            ctx.drawImage(image, 0, 0, 200, 200);

        };
    }
}

function showAvatar(avatar) {
    var image = new Image();
    image.src = avatar;
    var max = 200;
    // 绑定load事件处理器，加载完成后执行，避免同步问题
    image.onload = function () {
        // 获取 canvas DOM 对象
        var canvas = document.getElementById("cvs2");
        // 获取 canvas的 2d 环境对象,
        var ctx = canvas.getContext("2d");
        // canvas清屏
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById("cvs2").style.display = 'block';
        ctx.drawImage(image, 0, 0, 200, 200);

    };
}


