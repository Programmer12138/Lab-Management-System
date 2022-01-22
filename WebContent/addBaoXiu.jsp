<%--
  Created by IntelliJ IDEA.
  User: HEYUANFLY
  Date: 2021-01-05
  Time: 21:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" pageEncoding="utf-8" %>
<%@ page import="java.util.*,model.*,dao.*,util.*" %>
<%@ page import="java.io.Console" %>
<%
    //1-获取js传来的新增报修信息
    String status = request.getParameter("status");
    String equipId = request.getParameter("equipId");
    String sno = request.getParameter("sno");
    String baoXiuDate = request.getParameter("baoXiuDate");

    BaoXiuInfo b = new BaoXiuInfo(sno, equipId, status, baoXiuDate);
    BaoXiuInfoDao dao = new BaoXiuInfoDao();
    boolean addResult = dao.addBaoXiu(b);
    System.out.println("添加报修结果:" + addResult);
    String jsonStr = JsonUtils.objectToJson(addResult);
    out.write(jsonStr);
%>