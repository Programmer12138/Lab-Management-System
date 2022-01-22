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
<%
    //1-获取js传来的新增器材信息
    String equipId = request.getParameter("equipId");
    String equipName = request.getParameter("equipName");
    String producerName = request.getParameter("producerName");
    String price = request.getParameter("price");
    String location = request.getParameter("location");
    String charger = request.getParameter("charger");
    String addDate = request.getParameter("addDate");
//    String avatar = request.getParameter("avatar");

    EquipInfo e = new EquipInfo(equipId, equipName, producerName, Float.parseFloat(price), location, charger, addDate);
    EquipInfoDao dao = new EquipInfoDao();
    String addResult = dao.addEquip(e);
    System.out.println("addEquip.jsp返回器材信息新增结果" + addResult);
    String jsonStr = JsonUtils.objectToJson(addResult);
    out.write(jsonStr);
%>
