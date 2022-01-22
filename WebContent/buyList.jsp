<%@ page language="java" pageEncoding="utf-8" %>
<%@ page import="model.*,dao.*,util.*,java.util.Date" %>
<%@ page import="dao.BuyDao" %>

<%
    //1-通过DAO层获得数据
    BuyDao dao = new BuyDao();
    BuyInfo[] buyinfo = dao.findAllBuyInfo();
    System.out.println("buyList.jsp返回了订单列表！");
    String jsonStr = JsonUtils.objectToJson(buyinfo);
    out.write(jsonStr);
%>
