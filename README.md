# Lab-Management-System
一个JavaWeb信息管理系统项目，名称：实验室管理系统
<br>
<br>话不多说，先给出软件运行效果图。以下图片均为前端HTML效果的截图。<br>
主界面：<br>
![主页](https://user-images.githubusercontent.com/72424079/150635211-ac7122b7-a810-4395-b32b-4a86310df8e3.jpg)
报修器材的界面：<br>
![image](https://user-images.githubusercontent.com/72424079/154387010-679c049e-e3b2-4468-95e1-8010b3831736.png)
器材管理的界面：<br>
![image](https://user-images.githubusercontent.com/72424079/154387483-38ed54d9-ba9f-428a-b158-330dc5e6d369.png)
报表信息的界面：<br>
![image](https://user-images.githubusercontent.com/72424079/154387888-3a7c8eb0-9915-4914-aa7e-e1641bebfcdf.png)
<br>


<br>系统功能列表<br>
1、实验器材报修功能:用户可以通过本系统的报修页面，对损坏的实验仪器进行上报，并且对于实验器材的损毁情况进行统计<br>
2、器材信息管理功能:实验器材管理者可以通过系统的管理模块对实验器材信息进行增、删、改、查以及统计筛选操作<br>
3、器材采购模块:器材采购人员可以通过系统获取器材的购买相关信息，如销售商、价格等，还可以通过此系统对采购订单进行管理<br>
4、信息推送模块:不同类型用户可以通过此系统获取有关实验器材报修、购买、使用等的最新信息<br>
简而言之，基于Web页面的增删改查，CRUD<br>
<br>
系统数据库设计E-R图<br>
![image](https://user-images.githubusercontent.com/72424079/154386881-7f133473-59fb-4319-b34b-d49b04701484.png)
<br>
实现细节与技术摘要：<br>
如何实现报修功能呢？报修功能就是“点击保存按钮即可把用户填写的保修信息存放在数据库里”。首先，当用户点击“保存”按钮的时候，会执行baoxiu_js.js里面的addBaoXiu()函数，baoxiu_js.js文件必须在HTML文档里被引用，且“保存”按钮的onclick函数的必须是addBaoXiu()函数，否则点击“保存”按钮不会有用。<br>
![image](https://user-images.githubusercontent.com/72424079/154390953-4d42309b-98e8-46a8-9b07-6af344ff288e.png)
<br>在getAddBaoXiuInfo()函数里，会通过document.getElementById.value的方式，获取用户填写的字符串。就比如说用户填写了被报修的器材的编号，那就是通过document.getElementById("equipId").value的方式，返回一个编号字符串，其中函数括号里的参数填写的应该是“编号”文本框在HTML里的Id。其他的用户填写信息也是以此类推。<br>
![image](https://user-images.githubusercontent.com/72424079/154391604-f34b1105-ab20-4a33-bd85-527f55dfe1a7.png)
然后，在addBaoXiu()函数里，会调用getAddBaoXiuInfo()函数来获取用户填写的信息，并且，把用户填写的信息添加在url字符串的后面，作为HTTP请求的参数，这样，就形成了图中所示的url。同时，url里面应该指定发送的目的地址是某个jsp文件，这样，addBaoXiu.jsp文件就能接收到请求里的参数，即用户填写的信息<br>
![image](https://user-images.githubusercontent.com/72424079/154392616-978dda12-306c-4635-8316-5b159bee7bd6.png)<br>
在addBaoXiu.jsp文件里，需要调用request.getParameter方法来获得HTTP请求的参数。获得了参数（也就是报修器材的信息）之后，需要调用BaoXiuInfo构造方法来创建一个报修信息的对象，该对象记录了报修的信息。然后调用addBaoXiu方法，参数就是报修信息对象，该方法能把报修信息存入数据库。<br>
![image](https://user-images.githubusercontent.com/72424079/154393678-63441c10-9edd-4f54-836d-d019198cceba.png)<br>
addBaoXiu方法，是通过如下措施实现把Java里的对象里的信息，存入数据库的：首先，调用dbcp包里的getConnection()方法获取一个链接，该链接能远程连接到一个数据库。然后定义一个值为"insert into baoxiu values(?,?,?,?)"的字符串，起名为sql。这是一个SQL查询语句的雏形，功能是往数据库里插入一条报修信息，但是还不完整。需要通过setString方法来添加参数，比如，被报修的器材的编号是什么。参数全部添加完毕之后，需要执行executeUpdate()方法来远程执行SQL查询语句，在这里，也就是执行“添加报修信息”的语句。<br>
![image](https://user-images.githubusercontent.com/72424079/154394702-1a0cc2ae-cbd3-47bd-83e7-aefae42d0d1c.png)
<br>这就是“点击保存按钮即可把用户填写的保修信息存放在数据库里”功能的大致实现细节。总结一下，大致思路是：点击按钮-执行JavaScript里的函数-获取用户填写的信息-构成请求的url-向jsp文件发送请求-解析请求参数-执行SQL语句。其他的功能，例如“器材采购”等等，实现的方法也大致如此。
<br>
<br>注意，这是一个软件，不仅仅是一个程序，所以，下载源码后不一定能运行成功，要配置tomcat，还要安装配置数据库。如果遇到任何问题，欢迎留言提问。
