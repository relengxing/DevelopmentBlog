# Golang学习：JSON处理

JSON（Javascript Object Notation）：Javascript对象表示法
现在主流的数据传输一般都使用json


## 解析JSON
### 解析JSON到结构体
我们有了一个JSON串，然后把它解析成一个结构体
```go
func Unmarshal(data []byte, v interface{}) error
```
首先定义与JSON数据对应的结构体，数组对应slice，字段名对应JSON里面的key,在解析的时候，如何将 json 数据与 struct 字段相匹配呢？例如
JSON 的 key 是 Foo，那么怎么找对应的字段呢？
• 首先查找 tag 含有 Foo 的可导出的 struct 字段(首字母大写)
• 其次查找字段名是 Foo 的导出字段
• 最后查找类似 FOO 或者 FoO 这样的除了首字母之外其他大小写不敏感的导出字段
能被赋值的字段一定是可导出的字段，也就是首字母大写。同时 JSON 解析的时候只会解析能找得到的字段，如果找不到的字段会被忽略，这样的一个好处是：当你接收到一个很大的 JSON 数据结构而你却只想获取其中的部分数据的时候，你只需将你想要的数据对应的字段名大写，即可轻松解决这个问题。
```go
type Result struct {
    Ret int
    Reason string
    Data interface{}
}
func main() {
    var r Result
    str := `{"Ret":1,"Reason":"无","Data":null}`
    json.Unmarshal([]byte(str),&r)
    fmt.Println(r)
}
```
输出结果：`{1 无 <nil>}`

tag这个说一下
tag就是结构体字段后面反引号包裹起来的，这个时候就可以使用ttt代替Ret,如果没那个tag的话Ret字段是没有赋值的
```go
type Result struct {
    Ret int `json:"ttt"`
    Reason string
    Data interface{}
}
func main() {
    var r Result
    str := `{"ttt":1,"reason":"无","data":null}`
    json.Unmarshal([]byte(str),&r)
    fmt.Println(r)
}
```
运行结果
```
{1 无 <nil>}
```

### 解析到interface
在不知道JSON结构的情况下，可以使用interface{}来解析。我们知道 interface{}可以用来存储任意数据类型的对象，这种数据结构正好用于存储解析的未知结构的 json 数据的结果。JSON 包中采用 map[string]interface{}和[]interface{}结构来存储任意的 JSON 对象和数组。Go 类型和 JSON 类型的对应关系如下：
• bool 代表 JSON booleans,
• float64 代表 JSON numbers,
• string 代表 JSON strings,
• nil 代表 JSON null
示例
```go
str := `{"Ret":1,"reason":"无","data":null}`
var f interface{}
json.Unmarshal([]byte(str),&f)

m:=f.(map[string]interface{})
for k, v := range m{
    switch vv := v.(type) {
    case float64:
        fmt.Println(k,"is int",vv)
    case string:
        fmt.Println(k,"is string",vv)
    default:
        fmt.Println(k, "is of a type I don't know how to handle")
    }
}
```
这里数字是float64,测试结果是这样的：
```
data is of a type I don't know how to handle
Ret is int 1
reason is string 无
```

## 生成JSON
`func Marshal(v interface{}) ([]byte, error)`
```go

type Result struct {
    Ret int `json:"ttt"`
    Reason string
    Data interface{}
}
func main() {
    out := &Result{1, "啊啊啊",nil}
    b, err := json.Marshal(out)
    if err != nil {
        return
    }
    fmt.Println(string(b))
}
```
针对 JSON 的输出，我们在定义 struct tag 的时候需要注意的几点是:
• 字段的 tag 是"-"，那么这个字段不会输出到 JSON
• tag 中带有自定义名称，那么这个自定义名称会出现在 JSON 的字段名中，例如上
面例子中 serverName
• tag 中如果带有"omitempty"选项，那么如果该字段值为空，就不会输出到 JSON
串中
• 如果字段类型是 bool, string, int, int64 等，而 tag 中带有",string"选项，那么这个字
段在输出到 JSON 的时候会把该字段对应的值转换成 JSON 字符串
举例来说
```go
type Result struct {
    Ret int `json:"ttt"`
    QWER int `json:"-"`
    Reason string
    Data interface{}`json:"data,omitempty"`
}
func main() {
    out := &Result{1, 1,"啊啊啊",nil}
    b, err := json.Marshal(out)
    if err != nil {
        return
    }
    fmt.Println(string(b))
}
```
结果:`{"ttt":1,"Reason":"啊啊啊"}`

Marshal 函数只有在转换成功的时候才会返回数据，在转换的过程中我们需要注意几点：
• JSON 对象只支持 string 作为 key，所以要编码一个 map，那么必须是
map[string]T 这种类型(T 是 Go 语言中任意的类型)
• Channel, complex 和 function 是不能被编码成 JSON 的
• 嵌套的数据是不能编码的，不然会让 JSON 编码进入死循环
• 指针在编码的时候会输出指针指向的内容，而空指针会输出 null
