<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="model.*,dao.*,util.*" %>
<%@ page import="dao.BuyDao" %>
<%
    //1-获取js传来的要订单ID
    String buyId = request.getParameter("buyId");
    System.out.println("delete buy_id is " + buyId);
    BuyDao dao = new BuyDao();
    String deleteResult = dao.deleteBuy(buyId);
    System.out.println("订单信息删除结果：" + deleteResult);
    String jsonStr = JsonUtils.objectToJson(deleteResult);
    out.write(jsonStr);

%>