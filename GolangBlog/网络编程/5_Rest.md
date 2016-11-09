# Golang网络编程之：REST
REST(REpresentational State Transfer)
REST 指的是一组架构约束条件和原则。满足这些约束条件和原则的应用程序或设计就是 RESTful。
一句话形容就是:URL定位资源，用HTTP动词（GET,POST,DELETE,DETC）描述操作。
更多的东西不做详述了
可以参考:[Web服务器实现方案](../../CommonBlog\Web服务实现方案.md)
也可以自己百度查一下

这里需要引入一个包 `github.com/drone/routes`
可以在命令行输入 `go get github.com/drone/routes`

这里有一个简单的例子，只实现了GET和POST，其他的可以照葫芦画瓢
服务端：
```go
package main

import (
    "github.com/drone/routes"
    "fmt"
    "net/http"
    "net/url"
    "strconv"
)

var ulist map[string] int=map[string] int {
    "relengxing" :24,
    "li":23,
    "aaa":21,
}

func getuser(w http.ResponseWriter,r *http.Request)  {
    var param url.Values = r.URL.Query()
    uid := param.Get(":uid")
    if v, ok := ulist[uid]; ok {
        fmt.Fprintln(w, "get a user ",uid, " success!","Age:",v)
    }else {
        fmt.Fprint(w,"没有查找到该用户")
    }
}

func edituser(w http.ResponseWriter,r *http.Request)  {
    fmt.Println("接收到POST请求")
    r.ParseForm()
    var param url.Values = r.URL.Query()
    uid := param.Get(":uid")
    age := r.Form["age"]
    age1 := age[0]
    fmt.Println("修改年龄",age1)
    if _, ok := ulist[uid]; ok {
        ulist[uid],_ = strconv.Atoi(age1)
        v,_ := ulist[uid]
        fmt.Fprintln(w, "get a user ",uid, " success!","Age:",v)
    }else {
        fmt.Fprint(w,"没有查找到该用户")
    }
}
func main() {
    fmt.Println("正在启动Web程序...")
    var mux *routes.RouteMux = routes.New()
    mux.Get("/user/:uid",getuser)
    mux.Post("/user/:uid",edituser)
    http.Handle("/",mux)
    http.ListenAndServe(":9090", nil)
    fmt.Println("服务已停止")
}
```
客户端：
就随便写了个html的，这个是用来做post的，get就直接浏览器输入：127.0.0.1:9090/user/relengxing就可以了
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
	</head>
	<body>
		<form action="http://127.0.0.1:9090/user/relengxing" method="post">
			年龄：
			<input type="text" name="age" value="" />
			<br />
			<input type="submit" value="修改"/>
		</form>
	</body>
</html>
```
>可有时，HTTP 客户端只能发出 GET 和 POST 请求：
• HTML 标准只能通过链接和表单支持 GET 和 POST。在没有 Ajax 支持的网页浏览器
中不能发出 PUT 或 DELETE 命令
• 有些防火墙会挡住 HTTP PUT 和 DELETE 请求要绕过这个限制，客户端需要把实际的 PUT 和 DELETE 请求通过 POST 请求穿透过来。RESTful 服务则要负责在收到的 POST请求中找到原始的 HTTP 方法并还原。我们现在可以通过 POST 里面增加隐藏字段_method 这种方式可以来模拟 PUT、 DELETE 等方式，但是服务器端需要做转换

对Restful的理解还不是很透彻，等做过大东西以后再回过头来看一看，这个小例子有助入门
