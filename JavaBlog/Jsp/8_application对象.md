# JSP学习：application 对象

application 中保存的信息可以在整个应用的任何地方访问，这个 session 对象类似，但和 session 对象还是有所区别的。只要 Web 应用还在正常运行， application 对象就可以访问，而 session 对象在用户离开系统就被注销。

application 对象主要方法
下面介绍 application 对象的最常用的主要方法。
1． getAttribute（ String name）
这个方法可以获取指定属性的值。
2． getServerInfo（）
这个方法可以取得服务器的信息。取出的值是类似 Apache Tomcat/5.0.28 这样的形式。
3． removeAttribute（ String name）
这个方法可以移除指定的属性。
4． setAttribute（ String name， Object o）
这个方法可以给一个指定名称的属性赋值。
