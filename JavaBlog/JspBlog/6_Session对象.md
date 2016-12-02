# JSP学习：Session对象

用于保存一些用户信息

## session 对象主要方法
session 所提供的方法并没有前面几个内置对象那么多，但是基本都是非常常用的。
1． getAttribute（ String name）
这个方法可以获取指定属性的值。
2． getCreationTime（）
这个方法可以获取 session 对象创建的时间。
3． getLastAccessedTime（）
这个方法可以获取 session 对象上次被访问的时间。
4． invalidate（）
这个方法可以失 session 对象失效。
5． removeAttribute（ String name）
这个方法可以移除指定的属性。
6． setAttribute（ String name， Object value）
这个方法可以给指定名称的属性赋值。
