<%--
  Created by IntelliJ IDEA.
  User: HEYUANFLY
  Date: 2021-01-08
  Time: 0:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" pageEncoding="utf-8" %>
<%@ page import="java.util.*,model.*,dao.*,util.*" %>
<%@ page import="java.io.Console" %>
<%
    //1-获取js传来的注册信息
    String account = request.getParameter("account");
    String username = request.getParameter("username");
    String password = request.getParameter("password");

    CollegeInfo c = new CollegeInfo(account, username, password);
    CollegeDao dao = new CollegeDao();
    boolean registerResult = dao.insertAccount(c);
    System.out.println("register.jsp返回注册结果" + registerResult);
    String jsonStr = JsonUtils.objectToJson(registerResult);
    out.write(jsonStr);
%>
