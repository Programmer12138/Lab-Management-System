<%--
  Created by IntelliJ IDEA.
  User: HEYUANFLY
  Date: 2020-12-27
  Time: 12:09
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="model.*,dao.*,util.*" %>
<%@ page import="java.nio.charset.StandardCharsets" %>
<%
    //1-获取js传来的要删除器材ID
    String equipId = request.getParameter("equipId");
    EquipInfoDao dao = new EquipInfoDao();
    String deleteResult = dao.deleteEquip(equipId);
    System.out.println("deleteEquip.jsp返回删除结果" + deleteResult);
    String jsonStr = JsonUtils.objectToJson(deleteResult);
    out.write(jsonStr);

%>