<%--
  Created by IntelliJ IDEA.
  User: HEYUANFLY
  Date: 2021-01-05
  Time: 20:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" pageEncoding="utf-8" %>
<%@ page import="model.*,dao.*,util.*,java.util.Date" %>
<%
    //1-通过DAO层获得数据
    String sno = request.getParameter("sno");
    StudentDao dao = new StudentDao();
    int exist = dao.isExistSno(sno);
    System.out.println("student.jsp返回学号验证结果：" + exist);
    //2-java对象(数组) 转换 json字符串
    String jsonStr = JsonUtils.objectToJson(exist);
    out.write(jsonStr);
%>
