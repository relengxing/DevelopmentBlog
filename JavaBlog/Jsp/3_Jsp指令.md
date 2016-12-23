# JSP学习:JSP指令

## page指令
1. language
设置页面所用语言
`<%@ page language="java" %>`
2. import
用来引入用到的包或者是类，这个属性的设置方法如下。
`<%@ page import="java.util.*" %>`

3. contentType
这个属性设置了 JSP 页面的 MIME 类型，对于还有中文的 JSP 页面可以按照下面这种方式设置。
`<%@ page contentType="text/html;charset=gb2312" %>`
经过这样的设置，页面显示编码方案设置为 gb2312，这种编码格式可以正确显示中文

4. session
设置在 JSP 页面中是否可以使用 session 对象，默认为 true

5. buffer
用来设置 out 对象缓冲区的大小，可以选择 none、也可以设置为指定的大小，单位为 KB。
6. autoFlash
当在 JSP 页面设置了可以使用缓冲区的时候，才可以设置这个属性，这个属性设置为 true 的时候，
缓冲区一旦满了就会自动刷新。如果设置为 false，缓冲区就满了以后就会报溢出错误。
7. isThreadSafe
设置当前 JSP 页面是否是线程安全的，默认是 true，可以同时响应多个请求。
8. info
此属性设置当前 JSP 页面的描述信息，不常用。
9. errorPage
此属性设置错误处理页面，当页面出错的时候可以跳转到这个错误处理页面。
10. isErrorPage
设置当前页面是否为错误处理页面，默认为 false。

## include指令
`<%@ include file="inc.txt"%>`
include 指令可以在当前的 JSP 页面中包含一个文件，从而和当前页面组成一个整体的文件。这中包
含仅仅是静态包含。


include 动作指令可以在 JSP 页面中动态包含一个文件，这与 include 指令不同，前者可以动态包含一个文件， 文件的内容可以是静态的文件也可以是动态的脚本， 而且当包含的动态文件被修改的时候 JSP引擎可以动态对其进行编译更新。而 include 指令仅仅是把一个文件简单的包含在一个 JSP 页面中，从而组合成一个文件，仅仅是简答的组合的作用。其功能没有 include 动作指令强大。
