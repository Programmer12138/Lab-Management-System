<%@ page language="java" pageEncoding="utf-8" %>
<%@ page import="model.*,dao.*,util.*" %>
<%
    //1-获取js传来的更新器材信息
    String buyId = request.getParameter("buyId");
    String equipName2 = request.getParameter("equipName2");
    String buyer2 = request.getParameter("buyer2");
    String seller2 = request.getParameter("seller2");
    String buyDate2 = request.getParameter("buyDate2");
    String num2 = request.getParameter("num2");
    float money2 = Float.parseFloat(request.getParameter("money2"));
    BuyInfo b = new BuyInfo(buyId, Integer.parseInt(num2), equipName2, seller2, buyer2, buyDate2, money2);
    BuyDao dao = new BuyDao();
    String updateResult = dao.updateBuy(b);
    System.out.println("updateBuy.jsp返回订单信息更新结果：" + updateResult);
    System.out.println(updateResult);
    String jsonStr = JsonUtils.objectToJson(updateResult);
    out.write(jsonStr);
%>
