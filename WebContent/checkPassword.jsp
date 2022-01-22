<%--
  Created by IntelliJ IDEA.
  User: HEYUANFLY
  Date: 2020-12-30
  Time: 11:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="model.*,dao.*,util.*,java.util.Date" %>
<%
    //从前端获得用户输入的帐户和密码
    String account = request.getParameter("account");
    String password = request.getParameter("password");
    //1-通过DAO层获得数据
    CollegeDao dao = new CollegeDao();
    String result = dao.checkPassword(account, password);
    System.out.println("checkPassword.jsp返回密码验证结果：" + result);
    //2-java对象(数组) 转换 json字符串
    String jsonStr = JsonUtils.objectToJson(result);
    out.write(jsonStr);
%>
