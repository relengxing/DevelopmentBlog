# JSP学习:request对象
request 对象代表这从用户发送过来的请求， 从这个对象中间可以取出客户端用户提交的数据或者是
参数。这个对象只有接受用户请求的页面才可以访问。

## request 对象主要方法
request 对象的方法非常多，在这里我们只介绍其中最常用的几种方法，其他方法可以参考相关类库
的介绍。
1. getAttribute(String name)
这个方法可以取出指定名称的这个属性的值，这个属性可以用 setAttribute（ String name,Object o）
这个方法进行赋值，如果没有对这个属性赋值的话取值的操作返回 null。
2. getContexntPath（）
这个方法可以获取的服务器上下文路径。
3. getCookies（）
这个方法可以取出客户端的 Cookies。
4. getHeader（ String name）
这个方法可以取得指定名称的 HTTP 报头的属性值。
5. getParameter（ String name）
这个方法可以取出客户端提交到服务器的参数。
6. getServerName（）
这个方法可以取得服务器的名称
7. getServerPort（）
这个方法可以取得服务器的访问端口。
8. setAttribute（ String name,Object o）这个方法对指定名称的属性进行赋值。
9. removeAttribute（ String name）
这个方法可以移除指定名称的一个属性。
10. getRemoteAddr（）
这个方法返回客户端机器的 IP 地址


代码示例：使用 request 对象取得表单数据
```JSP
//--------文件名： Form.jsp--------------------
<%@ page language="java" import="java.util.*" contentType="text/html;charset=gb2312"%>
<html>
<head>
<title>request 获取表单数据示例</title>
</head>
<body>
<font size="2">
下面是表单内容：
<form action="Form.jsp" method="post">
用户名： <input type="text" name="userName" size="10"/>
密 码： <input type="password" name="password" size="10"/>
<input type="submit" value="提交">
</form>
下面是表单提交以后用 request 取到的表单数据： <br>
<%
out.println("表单输入 userName 的值:"+request.getParameter("userName")+"<br>");
out.println("表单输入 password 的值:"+request.getParameter("password")+"<br>");
%>
</font>
</body>
</html>
```
代码示例：使用 request 对象取得页面传递的参数
```jsp
//--------文件名： URL.jsp--------------------
<%@ page language="java" import="java.util.*" contentType="text/html;charset=gb2312"%>
<html>
<head>
<title>request 对象取得页面传递参数示例</title>
</head>
<%
String param = request.getParameter("param");
%>
<body>
<font size=”2”>
<a href="URL.jsp?param=Hello">请单击这个链接</a><br>
你提交的参数为： <%=param%>
</font>
</body>
</html>
```
