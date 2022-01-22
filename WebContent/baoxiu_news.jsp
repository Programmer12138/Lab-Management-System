<%@ page language="java" pageEncoding="utf-8" %>
<%@ page import="model.*,dao.*,util.*,java.util.Date" %>
<%
    //获取报修信息传给js
    NewsInfoDao dao = new NewsInfoDao();
    baoxiu_newsinfo bxi[] = dao.findall_baoxiu_news();
    System.out.println("baoxiu_news.jsp返回报修消息列表");
    String jsonStr = JsonUtils.objectToJson(bxi);
    out.write(jsonStr);
%>
