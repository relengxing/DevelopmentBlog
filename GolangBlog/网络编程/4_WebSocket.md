# Golang网络编程之：WebSocket
WebSocket是HTML5的重要特性
简单的讲就是现在可以全双工了，可以从服务器推数据到客户端了
>在 WebSocket 出现之前，为了实现即时通信，采用的技术都是“轮询”，即在特定的时间间
隔内，由浏览器对服务器发出 HTTP Request，服务器在收到请求后，返回最新的数据给
浏览器刷新，“轮询”使得浏览器需要对服务器不断发出请求，这样会占用大量带宽。
WebSocket 采用了一些特殊的报头，使得浏览器和服务器只需要做一个握手的动作，就可
以在浏览器和服务器之间建立一条连接通道。且此连接会保持在活动状态，你可以使用
JavaScript 来向连接写入或从中接收数据，就像在使用一个常规的 TCP Socket 一样。它解
决了 Web 实时化的问题，相比传统 HTTP 有如下好处：
• 一个 Web 客户端只建立一个 TCP 连接
• Websocket 服务端可以推送(push)数据到 web 客户端.
• 有更加轻量级的头，减少数据传送量

首先要引入webocket,这个在系统中没有，需要在google官方维护的一个net包里面下载。
网上有几个方法我试了，最后失败了，我最后好像是把下载下来的net包放在了`D:\WorkSpace\GoLangWorkSpace\src\golang.org\x\net`
下载地址:https://github.com/golang/net
然后在需要调用的地方import "golang.org/x/net/websocket"

## 服务端
直接上代码
```go
package main

import (
    "net/http"
    "golang.org/x/net/websocket"
    "fmt"
)

func main() {
    http.Handle("/",websocket.Handler(Echo))
    err:=http.ListenAndServe(":9090",nil)
    if err!=nil {
        fmt.Print("监听端口出错",err)
    }
}

func Echo(ws *websocket.Conn)  {
    var err error
    for {
        var replay string
        err = websocket.Message.Receive(ws,&replay)
        if err != nil {
            fmt.Println("接收出错",err)
            break
        }
        fmt.Print("读取数据",replay)
        msg:="你好 "+replay
        fmt.Print("发送数据:"+msg)
        err = websocket.Message.Send(ws,msg)
        if err != nil {
            fmt.Print("发送出错")
            break
        }
    }
}

```
源码暂时不分析了，说下思路
路由"/"给Echo，中间进过了websocket的操作，然后监听9090端口，客户端访问的时候就会交给Echo处理，并且已经使用了Websocket。这是就可以在实时通信了
Echo中是一个无限循环，出错了就会break退出
在读的时候会阻塞线程，我们这里读到数据后就打印出来，并且给客户端发送一个"你好"+客户端发送过来的数据。
## 客户端(HTML5)
```HTML
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
		<script type="text/javascript">   
		var sock = null;   
		var wsuri = "ws://127.0.0.1:9090";   
		window.onload = function(){   
			console.log("onload");   
			sock = new WebSocket(wsuri);   
			sock.onopen = function(){   
				console.log("connected to " + wsuri);   
			}   
			sock.onclose = function(e) {   
				console.log("connection closed (" + e.code + ")");   
			}   
			sock.onmessage = function(e){   
				console.log("message received:" + e.data);   
			}   
		};   

		function send(){   
    		console.log("send")   
    		var msg = document.getElementById('message').value;   
    		console.log(msg)   
    		sock.send(msg);   
		};   
	</script>   
	</head>  
<body>   
	<h1> Websocket Echo Test</h1>   
	<form>   
	<p>   
	Message: <input id = "message" type = "text" value ="hello relengxing">   
	</p>   
	</form>   
	<button onclick="send();">Send Msg</button>   
</body>    
</html>
```
这里的话可以就用这个测试一下，我js学的还不怎么样，
界面就是一个标题，一个显示，一个按键。
JS的代码也不多
## 客户端(Golang)
WebSocket URL 的起始输入是 ws://或是 wss://（在 SSL 上）
```go
package main

import (
    "golang.org/x/net/websocket"
    "fmt"
)

var orgin = "http://127.0.0.1:9090/"
var url = "ws://127.0.0.1:9090/"
func main() {
    ws ,err := websocket.Dial(url,"",orgin)
    if err != nil {
        fmt.Print("连接出错",err)
    }

    message := []byte("relengxing")
    _,err = ws.Write(message)
    if err != nil {
        fmt.Print("发送出错",err)
    }
    fmt.Println("发送数据：",string(message))
    var msg = make([]byte,512)
    m,err := ws.Read(msg)
    if err != nil {
        fmt.Print("读取出错",err)
    }
    fmt.Printf("读取到: %s\n", msg[:m])
    ws.Close()//关闭连接
}

```
