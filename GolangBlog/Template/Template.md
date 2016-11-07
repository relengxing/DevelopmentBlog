
# Golang学习：Template

模版在Web开发中能极大的提升效率。方便团队开发，代码和视图分离，便于重用。
下面说明了模版的机制
![模版机制图](img\模版机制图.jpg)

Web 应用反馈给客户端的信息中的大部分内容是静态的，不变的，而另外少部分是根据用
户的请求来动态生成的，例如要显示用户的访问记录列表。用户之间只有记录数据是不同的，
而列表的样式则是固定的，此时采用模板可以复用很多静态代码。
## 注释
```
{{/* a comment */}}
```
使用`{{/*`和`*/}}`来包含注释内容

## 模版变量
在模板中定义变量：变量名称用字母和数字组成，并带上`$`前缀，采用符号`:=`进行赋值。
作用于是在`{{end}}`之前
比如
```
{{with $x := "output" | printf "%q"}}{{$x}}{{end}}
{{with $x := "output"}}{{printf "%q" $x}}{{end}}
{{with $x := "output"}}{{$x | printf "%q"}}{{end}}
```
## 输出对象
{{.}}就是把这个对象输出出来{{.FieldName}}就是输出对象的属性
在Golang中有一个template包来对模版进行处理
```go
//==Golang的程序======================================
type Person struct {
    UserName string
}
t ,_ := template.ParseFiles("template.gtpl")
p := Person{UserName: "relengxing"}
t.Execute(os.Stdout, p)
//==模版文件的内容====================================
hello {{.UserName}}!
```
template.gtpl这个文件是我们自己新建在工程目录下的
template.ParseFiles加载这个文件，返回一个template对象，
新建一个一个Person这个结构，并对它赋值，然后传递到t.Execute里面

Execute的源码如下
```go
func (t *Template) Execute(wr io.Writer, data interface{}) error {
	if err := t.escape(); err != nil {
		return err
	}
	return t.text.Execute(wr, data)
}
```
第一个参数是输出位置，第二个参数是要和模版合并的数据
`t.Execute(os.Stdout, p)`的意思是把p的值赋值给t这个模版，然后输出到系统的标准输出上，这里指的是命令行，在网络编程中还可以换成浏览器
这里就学习template，就使用os.Stdout，方便调试。

Go 语言的模板通过{{}}来包含需要在渲染时被替换的字段，{{.}}表示当前的对象
如果要访问当前对象的字段通过{{.FieldName}},
但是需要注意一点：
<font color="red" size=5>这个字段必须是可导出的(字段首字母必须是大写的),否则在渲染的时候就会报错</font>

## 输出嵌套字段
{{range}} {{end}}  {{with}} {{end}}
下面是一个嵌套对象的输出
```go
package main

import (
    "os"
    "text/template"
)

type Friend struct {
    Name string
}
type Person struct {
    UserName string
    Email []string
    Friend []*Friend
}
func main() {
    f1 := Friend{"1号"}
    f2 := Friend{"2号"}
    t, _ := template.ParseFiles("template.gtpl") //解析模板文件
    p := Person{UserName: "relengxing",Email:[]string{"1@qq.com","2@qq.com"},Friend:[]*Friend{&f1,&f2}}
    t.Execute(os.Stdout, p)
}
//==模版文件======================================
{{.}}
"hello {{.UserName}}!"
```
输出结果:
```
{relengxing [1@qq.com 2@qq.com] [0xc04200a300 0xc04200a310]}
"hello relengxing!"
```
Friend对象的值就没输出出来
修改模版文件
```
//==模版文件=============================
{{.}}
"hello {{.UserName}}!"
{{range.Email}}
an email {{.}}
{{end}}
{{with .Friend}}
{{range.}}
friend {{.Name}}
{{end}}
{{end}}
```
输出：
```
{relengxing [1@qq.com 2@qq.com] [0xc042046240 0xc042046250]}
"hello relengxing!"

an email 1@qq.com

an email 2@qq.com



friend 1号

friend 2号
```

## 条件处理
用法1：
{{if pipeline}} T1 {{end}}
标签结构：{{if ...}} ... {{end}}
用法2：
{{if pipeline}} T1 {{else}} T0 {{end}}
标签结构：{{if ...}} ... {{else}} ... {{end}}
用法3：
{{if pipeline}} T1 {{else if pipeline}} T0 {{end}}
标签结构：{{if ...}} ... {{else if ...}} ... {{end}}
其中if后面可以是一个条件表达式（包括管道函数表达式。pipeline即管道），也可以是一个字符窜变量或布尔值变量。当为字符窜变量时，如为空字符串则判断为false，否则判断为true。
这是一个字符串的例子
```
//==模版文件========================
{{if ``}} 不会输出.{{end}}
{{if `anything`}}输出{{end}}
```
注意：这个点不是引号，是esc下面这个键   ``
输出结果
```

输出
```

## 管道函数 pipelines

用法1：
`{{FuncName1}}`
此标签将调用名称为“FuncName1”的模板函数（等同于执行“FuncName1()”，不传递任何参数）并输出其返回值。
用法2：
`{{FuncName1 "参数值1" "参数值2"}}`
此标签将调用“FuncName1("参数值1", "参数值2")”，并输出其返回值
用法3：
`{{.Admpub|FuncName1}}`
此标签将调用名称为“FuncName1”的模板函数（等同于执行“FuncName1(this.Admpub)”，将竖线“|”左边的“.Admpub”变量值作为函数参数传送）并输出其返回值。
比如[下面](#html)的html
```
UserName="<p>我是</p>relengxing"
//==模版==============
{{.UserName | html}}
{{.UserName }}
```
输出结果
```
&lt;p&gt;我是&lt;/p&gt;relengxing
<p>我是</p>relengxing
```

## 自定义模版函数
每一个模板函数都有一个唯一值的名字，然后与一个 Go 函数关联，通过如下的方式来关
联
`type FuncMap map[string]interface{}`
例如，如果我们想要的 email 函数的模板函数名是 emailDeal，它关联的 Go 函数名称是
EmailDealWith, 那么我们可以通过下面的方式来注册这个函数
```go
t = t.Funcs(template.FuncMap{"emailDeal": EmailDealWith})
```
EmailDealWith 这个函数的参数和返回值定义如下：
```go
func EmailDealWith(args …interface{}) string
```
内容大概是这样。
<font color="red" size=5>这里有困难没解决</font>
做这里的时候我遇到一个困难。。。
我代码是这样的
```go
t := template.New("t.gtpl")
t = t.Funcs(template.FuncMap{"emailDeal": EmailDealWith})
t, err:= template.ParseFiles("template.gtpl") //解析模板文件
t = template.Must(t, err)
p := Person{UserName: "<p>我是</p>relengxing",Email:[]string{"abcdefg@qq.com","hijklmn@qq.com"}}
t.Execute(os.Stdout, p)
```
`panic: template: template.gtpl:3: function "emailDeal，" not defined`
也就是说Golang在解析template.gtpl时解析到emailDeal，去他的map中查找，找不到对应的函数，然后就崩了。
但是我明明有给`t = t.Funcs(template.FuncMap{"emailDeal": EmailDealWith})`
为什么还是不行，其实是第一行的t和第三行的t不是同一个对象,这个地方先存疑好了，研究源码的话感觉自己要淹死
按下面这种写法是对的
```go
t := template.New("t.gtpl")
t = t.Funcs(template.FuncMap{"emailDeal": EmailDealWith})
t, _ = t.Parse(`hello {{.UserName}}!
{{range .Email}}
an emails {{.|emailDeal}}
{{end}}
`)
```
## 预定义的模版全局函数
【and】
{{and x y}}
表示：if x then y else x
如果x为真，返回y，否则返回x。等同于Golang中的：x && y

【call】
{{call .X.Y 1 2}}
表示：dot.X.Y(1, 2)
call后面的第一个参数的结果必须是一个函数（即这是一个函数类型的值），其余参数作为该函数的参数。
该函数必须返回一个或两个结果值，其中第二个结果值是error类型。
如果传递的参数与函数定义的不匹配或返回的error值不为nil，则停止执行。

【html】<span id="html"> </span>
转义文本中的html标签，如将“<”转义为“&lt;”，“>”转义为“&gt;”等

【index】
{{index x 1 2 3}}
返回index后面的第一个参数的某个索引对应的元素值，其余的参数为索引值
表示：x[1][2][3]
x必须是一个map、slice或数组

【js】
返回用JavaScript的escape处理后的文本

【len】
返回参数的长度值（int类型）

【not】
返回单一参数的布尔否定值。

【or】
{{or x y}}
表示：if x then x else y。等同于Golang中的：x || y
如果x为真返回x，否则返回y。

【print】
fmt.Sprint的别名

【printf】
fmt.Sprintf的别名

【println】
fmt.Sprintln的别名

【urlquery】
返回适合在URL查询中嵌入到形参中的文本转义值。（类似于PHP的urlencode）


=================【布尔函数】===============
布尔函数对于任何零值返回false，非零值返回true。
这里定义了一组二进制比较操作符函数：

【eq】
返回表达式“arg1 == arg2”的布尔值

【ne】
返回表达式“arg1 != arg2”的布尔值

【lt】
返回表达式“arg1 < arg2”的布尔值

【le】
返回表达式“arg1 <= arg2”的布尔值

【gt】
返回表达式“arg1 > arg2”的布尔值

【ge】
返回表达式“arg1 >= arg2”的布尔值

对于简单的多路相等测试，eq只接受两个参数进行比较，后面其它的参数将分别依次与第一个参数进行比较，
{{eq arg1 arg2 arg3 arg4}}
即只能作如下比较：
`arg1==arg2 || arg1==arg3 || arg1==arg4 ...`


## Must
模板包里面有一个函数 Must，它的作用是检测模板是否正确，例如大括号是否匹配，注释是否正确的关闭，变量是否正确的书写。接下来我们演示一个例子，用 Must 来判断模板是否正确,具体看源码

## 模版嵌套
【嵌入子模板】
用法1：
{{template "name"}}
嵌入名称为“name”的子模板。使用前，请确保已经用“{{define "name"}}子模板内容{{end}}”定义好了子模板内容。
用法2：
{{template "name" pipeline}}
将管道的值赋给子模板中的“.”（即“{{.}}”）

【子模板嵌套】
{{define "T1"}}ONE{{end}}
{{define "T2"}}TWO{{end}}
{{define "T3"}}{{template "T1"}} {{template "T2"}}{{end}}
{{template "T3"}}
输出：
ONE TWO
