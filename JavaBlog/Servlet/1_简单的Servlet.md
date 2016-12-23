# Servlet学习:简单的Servlet

一个示例，简单的使用Servlet
大致内容就是jsp页面的表单提交信息给Servlet类，Servlet类给显示出来


1. 新建Web工程，具体参考JSP那块的新建工程

2. 右键--NEW--Servlet
新建一个Servlet类

```jsp
//index.jsp 部分代码
<form action="Servlet" method="post">
        姓名:<input type="text" name="name"/><br>
        年龄:<input type="text" name="age"/><br>
        <input type="submit" value="提交">
</form>
```
在web.xml中添加Servlet信息,在wen-app内部
```xml
<servlet>
    <servlet-name>Servlet</servlet-name>
    <servlet-class>Servlet.Servlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>Servlet</servlet-name>
    <url-pattern>/Servlet</url-pattern>
</servlet-mapping>
```

```java
//servlet.java部分
@WebServlet(name = "Servlet")
public class Servlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8;pageEncoding=UTF-8");
        PrintWriter out = response.getWriter();
        String name = request.getParameter("name");
        String age = request.getParameter("age");
        out.print("提交的表单内容为:<br>");
        out.print("姓名:" + name + "<br>");
        out.print("年龄:" + age + "<br>");
    }
}
```
