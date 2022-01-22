<%--
  Created by IntelliJ IDEA.
  User: HEYUANFLY
  Date: 2021-01-05
  Time: 16:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="model.*,dao.*,util.*" %>
<%
    //1-获取js传来的要删除器材ID
    String baoXiuId = request.getParameter("baoXiuId");
    BaoXiuInfoDao dao = new BaoXiuInfoDao();
    String deleteResult = dao.deleteBaoXiu(baoXiuId);
    System.out.println("报修信息删除结果：" + deleteResult);
    String jsonStr = JsonUtils.objectToJson(deleteResult);
    out.write(jsonStr);
%>
