<%@ page language="java" pageEncoding="utf-8" %>
<%@ page import="model.*,dao.*,util.*,java.util.Date" %>
<%
    //获取采购信息传给js
    NewsInfoDao dao = new NewsInfoDao();
    caigou_newsinfo cg[] = dao.findall_caigou_news();
    System.out.println("buy_news.jsp返回采购消息列表");
    String jsonStr = JsonUtils.objectToJson(cg);
    out.write(jsonStr);
%>
