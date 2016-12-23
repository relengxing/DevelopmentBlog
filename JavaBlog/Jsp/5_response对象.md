# JSP学习:response对象

服务器可以使用response 对象向用户发送数据。 response 是对应 request 的一个对象。


## response 对象主要方法
response 的方法也很多，但是常用的也就其中的几个，下面介绍比较常用的几个方法。
1． addCookie（ Cookie cookie）
这个方法可以添加一个 Cookie 对象，用来保存客户端的用户信息。
2． containsHeader（ String name）
这个方法判断指定的头信息是否存在。
3． encodeRedirectURL（ String url）
这个方法可以对 URL 进行进行编码。
4． encodeURL（ String url）
这个方法可以对 URL 进行进行编码。
5． flushBuffer（）
这个方法可以清空缓存的内容。
6． sendError（ int error）
这个放发可以向客户端浏览器发送错误代码。如 500 为服务器内部错误。
7． sendRedirect（ String location）
这个方法可以把当前页面转发到其他的页面，实现页面的跳转。
