<%--
  Created by IntelliJ IDEA.
  User: HEYUANFLY
  Date: 2021-01-05
  Time: 16:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" pageEncoding="utf-8" %>
<%@ page import="model.*,dao.*,util.*" %>
<%
    //1-获取js传来的更新器材信息
    String baoXiuId = request.getParameter("baoXiuId");
    String status = request.getParameter("status");
    BaoXiuInfo b = new BaoXiuInfo(baoXiuId, status);
    BaoXiuInfoDao dao = new BaoXiuInfoDao();
    String updateResult = dao.updateBaoXiu(b);
    System.out.println("updateBaoXiu返回报修信息更新结果" + updateResult);
    String jsonStr = JsonUtils.objectToJson(updateResult);
    out.write(jsonStr);
%>