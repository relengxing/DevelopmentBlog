<%@ taglib prefix="s" uri="/struts-tags" %>
<%--
  Created by IntelliJ IDEA.
  User: relengxing
  Date: 2016/11/30
  Time: 21:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    我是登录页面
    <s:form action="welcome">
        <s:textfield name="username" label="Username" />
        <s:submit />
    </s:form>
</body>
</html>
