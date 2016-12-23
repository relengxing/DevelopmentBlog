# JSP学习:out对象

out 对象主要方法
在这里只介绍 out 对象最常用的方法。
1． clear（）
这个方法可以清除缓冲区的数据，但是仅仅是清除，并不向用户输出。
2． clearBuffer（）
这个方法可以清除缓冲区的数据，同时把这些数据向用户输出。
3． close（）
这个方法可以关闭 out 输出流。
4． flush（）
这个方法可以输出缓冲区的内容。
5． isAutoFlush（）
这个方法可以判断是否为自动刷新。
6． print（ String str）这个方法在 out 对象中是最常用的，可以向 JSP 页面输出数据，其中数据格式可以是 int、 boolean、Object 等。用法都是类似的。
