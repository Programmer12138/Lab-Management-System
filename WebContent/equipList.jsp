<%@ page language="java" pageEncoding="utf-8" %>
<%@ page import="model.*,dao.*,util.*,java.util.Date" %>
<%
    //1-通过DAO层获得数据
    EquipInfoDao dao = new EquipInfoDao();
    EquipInfo[] equips = dao.findAllEquipInfo2();
    //2-java对象(数组) 转换 json字符串
    System.out.println("EquipList.jsp返回器材列表");
    String jsonStr = JsonUtils.objectToJson(equips);
    out.write(jsonStr);
%>
