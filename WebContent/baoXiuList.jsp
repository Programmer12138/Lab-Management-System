<%--
  Created by IntelliJ IDEA.
  User: HEYUANFLY
  Date: 2020-12-28
  Time: 11:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" pageEncoding="utf-8" %>
<%@ page import="model.*,dao.*,util.*,java.util.*" %>
<%
    //1-通过DAO层获得数据
    BaoXiuInfoDao dao = new BaoXiuInfoDao();
    BaoXiuInfo[] equips = dao.findAllBaoXiuInfos();

//    for (int i = 0; i < equips.length; i++)
    System.out.println("baoXuList.jsp返回了报修列表！");
    //2-java对象(数组) 转换 json字符串
    String jsonStr = JsonUtils.objectToJson(equips);
    out.write(jsonStr);
%>
