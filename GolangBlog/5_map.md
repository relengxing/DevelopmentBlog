# Golang学习：map
会java的人应该知道map，java中学集合的时候学过,list,set,map这些
在其他语言中使用map要先引入库，在Golang中不需要引入任何库
map简单的说就是键值对，也叫字典，索引不能重复

下面的代码基本上说明了map的用法
```go
// 先声明map
var m1 map[string]string
// 再使用make函数创建一个非nil的map，nil map不能赋值
m1 = make(map[string]string)
// 最后给已声明的map赋值
m1["a"] = "aa"
m1["b"] = "bb"

// 直接创建
m2 := make(map[string]string)
// 然后赋值
m2["a"] = "aa"
m2["b"] = "bb"
// 删除元素
delete(m2, "a")
// 初始化 + 赋值一体化
m3 := map[string]string{
	"a": "aa",
	"b": "bb",
}

// ==========================================
// 查找键值是否存在
if v, ok := m1["a"]; ok {
	fmt.Println(v)
} else {
	fmt.Println("Key Not Found")
}

// 遍历map
for k, v := range m1 {
	fmt.Println(k, v)
}
```

### 元素删除
Go语言提供了一个内置函数delete()，用于删除容器内的元素。下面我们简单介绍一下如
何用delete()函数删除map内的元素：
`delete(myMap, "1234")`
上面的代码将从myMap中删除键为“ 1234”的键值对。如果“ 1234”这个键不存在，那么这个调
用将什么都不发生，也不会有什么副作用。但是如果传入的map变量的值是nil，该调用将导致
程序抛出异常（panic）。
