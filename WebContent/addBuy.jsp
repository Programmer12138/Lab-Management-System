<%--
  Created by IntelliJ IDEA.
  User: HEYUANFLY
  Date: 2020-12-27
  Time: 1:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" pageEncoding="utf-8" %>
<%@ page import="java.util.*,model.*,dao.*,util.*" %>
<%@ page import="java.io.Console" %>
<%@ page import="dao.BuyDao" %>
<%
    //1-获取js传来的新增器材信息
    String equipName = request.getParameter("equipName");
    String buyer = request.getParameter("buyer");
    String seller = request.getParameter("seller");
    int num = Integer.parseInt(request.getParameter("num"));
    String buyDate = request.getParameter("buyDate");
    float money = Float.parseFloat(request.getParameter("money"));
    System.out.println("updateBuy.jsp接收订单更新信息:器材名称:" + equipName + ",买家:" + buyer + ",卖家:" + seller + ",数量:" + num);
    String buyid = null;
    BuyInfo b = new BuyInfo(buyid, num, equipName, seller, buyer, buyDate, money);
    BuyDao dao = new BuyDao();
    String addResult = dao.addBuy(b);
    System.out.println("订单信息修改结果:" + addResult);
    String jsonStr = JsonUtils.objectToJson(addResult);
    out.write(jsonStr);
%>
