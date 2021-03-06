# re冷星技术博客通用篇:MarkDown语法

兼容HTML语法，直接写HTML即可
请注意，在 HTML 区块标签间的 Markdown 格式语法将不会被处理。比如，你在 HTML 区块内使用 Markdown 样式的*强调*会没有效果。

1. 标题<span id="t1"></span>

写法1：
```
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```
当然也可以写HTML对应的h1-h6
写法2
```
我是一级标题
==========
我是二级标题
----------
```

2. 引用<span id="t2"></span>
```
>引用的内容
```
效果
>引用的内容

二级引用
```
>引用的内容
>>嵌套
```
效果
>引用的内容
>>嵌套

3.  列表<span id="t3"></span>
无序列表：无序列表使用星号、加号或是减号作为列表标记：
```
* 第一项
* 第二项
* 第三项
```
效果
* 第一项
* 第二项
* 第三项

4. 有序列表则使用数字接着一个英文句点：
```
1.  第一项
2.  第二项
3.  第三项
```
效果
    1.  第一项
    2.  第二项
    3.  第三项
    <br>
5.  代码块
写法1
反引号
2个点，(Esc下面的那个),中间的内容不转义
```
``
```
写法2
上面三个点 这个地方还能加入语言
内容
下面三个点
比如
```
```go
package main

import "fmt"// 我们需要使用fmt包中的Println()函数

func main() {

    fmt.Println("Hello, world. 你好，世界！ ")

}
    ```//这个地方顶前面去
```
效果
```go
package main

import "fmt"// 我们需要使用fmt包中的Println()函数

func main() {

    fmt.Println("Hello, world. 你好，世界！ ")

}
```
写法三
缩进
效果：

    package main

    import "fmt"// 我们需要使用fmt包中的Println()函数

    func main() {

        fmt.Println("Hello, world. 你好，世界！ ")

    }
6.  分割线
你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：
```
* * *

***

*****

- - -

---------------------------------------
```
7.  链接
链接主机资源可以使用相对路径
```
[文字](链接)
```
效果
[百度](www.baidu.com)

8.  图片
同样可以使用相对路径
```
![文字](链接)
```
效果
![日出](img/201512081035330998.jpg)
9.  强调
```
*强调1*
**强调2**
_强调3_
__强调4__
```
效果
*强调1*
**强调2**
_强调3_
__强调4__
