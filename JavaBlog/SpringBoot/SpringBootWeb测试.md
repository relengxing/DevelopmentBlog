# SpringBoot学习：SpringBoot web的测试

大致这几种情况
1. 访问普通页面
2. Get请求
3. Post请求
4. Put请求
5. Delete请求
6. 普通表单提交
7. ajax表单提交
8. 隐藏的put和delete
java代码如下：
```java
@RequestMapping(value = "/test",method = RequestMethod.GET)
    public String getTest(){
        System.out.println("接收到Get请求");
        return "GET";
    }

    @RequestMapping(value = "/test",method = RequestMethod.POST)
    public String getPost(){
        System.out.println("接收到POST请求");
        return "POST";
    }

    @RequestMapping(value = "/test",method = RequestMethod.PUT)
    public String getPut(){
        System.out.println("接收到Put请求");
        return "PUT";
    }

    @RequestMapping(value = "/test",method = RequestMethod.DELETE)
    public String getDelete(){
        System.out.println("接收到delete请求");
        return "DELETE";
    }
```

### 测试一：使用RESTClient访问
测试结果全部通过，都可以正常访问


### 测试二：使用表单访问
页面是这样的
```html
<form action="/test" method="get">
    <p>访问get请求</p>
    <input type="submit" value="提交"/>
</form>

<form action="/test" method="post">
    <p>访问post请求</p>
    <input type="submit" value="提交"/>
</form>

<form action="/test" method="put">
    <p>访问put请求</p>
    <input type="submit" value="提交"/>
</form>

<form action="/test" method="delete">
    <p>访问delete请求</p>
    <input type="submit" value="提交"/>
</form>
```
依次点击结果这样的
```
接收到Get请求
接收到POST请求
接收到Get请求
接收到Get请求
```
GET和POST可以正常使用
PUT和Delete是通过GET访问的，也就是说无效
资料是说表单只支持GET和POST
### 测试三：使用ajax访问
页面是这样的
内容也很简单
测试结果是通过
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>主页</title>
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css" />
    <script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
</head>
<body>
<button id="button1">GET</button><br/>
<button id="button2">POST</button><br/>
<button id="button3">PUT</button><br/>
<button id="button4">DELETE</button><br/>
<script>
    $(document).ready(function () {
        $("#button1").click(function () {
            $.ajax({
                type: "get",
                dataType: "html",
                url: '/test',
                data: 'abc',
                success: function (data) {
                    alert(data);
                }
            });
        });
        $("#button2").click(function () {
            $.ajax({
                type: "post",
                dataType: "html",
                url: '/test',
                data: 'abc',
                success: function (data) {
                    alert(data);
                }
            });
        });
        $("#button3").click(function () {
            $.ajax({
                type: "put",
                dataType: "html",
                url: '/test',
                data: 'abc',
                success: function (data) {
                    alert(data);
                }
            });
        });
        $("#button4").click(function () {
            $.ajax({
                type: "delete",
                dataType: "html",
                url: '/test',
                data: 'abc',
                success: function (data) {
                    alert(data);
                }
            });
        });

    });
</script>
</body>
</html>
```
### AJAX提交Form表单
代码如下
全部都能正常访问
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>主页</title>
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css" />
    <script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
</head>
<body>
<form id="form1" action="/test" method="get">
    <p>访问get请求</p>
    <input type="text" name="test" value="提交"/>
    <input type="submit" value="提交"/>

</form>

<form id="form2" action="/test" method="post">
    <p>访问post请求</p>
    <input type="text" name="test" value="提交"/>
    <input type="submit" value="提交"/>

</form>

<form id="form3" action="/test" method="put">
    <p>访问put请求</p>
    <input type="text" name="test" value="提交"/>
    <input type="submit" value="提交"/>

</form>

<form id="form4" action="/test" method="delete">
    <p>访问delete请求</p>
    <input type="text" name="test" value="提交"/>
    <input type="submit" value="提交"/>

</form>
<button id="button1">GET</button><br/>
<button id="button2">POST</button><br/>
<button id="button3">PUT</button><br/>
<button id="button4">DELETE</button><br/>
<script>
    $(document).ready(function () {
        $("#button1").click(function () {
            $.ajax({
                type: "get",
                dataType: "html",
                url: '/test',
                data: $('#form1').serialize(),
                success: function (data) {
                    alert(data);
                }
            });
        });
        $("#button2").click(function () {
            $.ajax({
                type: "post",
                dataType: "html",
                url: '/test',
                data: $('#form2').serialize(),
                success: function (data) {
                    alert(data);
                }
            });
        });
        $("#button3").click(function () {
            $.ajax({
                type: "put",
                dataType: "html",
                url: '/test',
                data: $('#form3').serialize(),
                success: function (data) {
                    alert(data);
                }
            });
        });
        $("#button4").click(function () {
            $.ajax({
                type: "delete",
                dataType: "html",
                url: '/test',
                data: $('#form4').serialize(),
                success: function (data) {
                    alert(data);
                }
            });
        });

    });
</script>
</body>
</html>
```
