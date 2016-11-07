
# Golang学习：TemPlate
这一段暂存此处，有待填写完善
```go
t ,_ := template.ParseFiles("back.gtpl")
p := Person{UserName: "relengxing"}
t.Execute(os.Stdout, p)
```
