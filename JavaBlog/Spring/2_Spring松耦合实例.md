# Spring学习笔记：Spring松耦合实例

上一篇写的是建工程，这一篇也是属于实例，感受Spring依赖注入的好处。

## 生成器实例
假设项目中有一个函数要输出内容，以Json格式输出，后期有可能要换成XML格式输出。
抽象出一个接口：
```java
public interface IOutputGenerator {
    public void generateOutput();
}
```
然后Json输出和XML输出分别实现这个接口
JSON的：
```java
public class JsonOutput implements IOutputGenerator{

    @Override
    public void generateOutput() {
        System.out.println("Json output");
    }
}
```
XML的
```java
public class XmlOutput implements IOutputGenerator {
    @Override
    public void generateOutput() {
        System.out.println("Xml output");
    }
}

```
做一个Helper类，要输出的时候，直接调用generateOutput方法
```java
public class OutputHelper {
    IOutputGenerator outputGenerator;

    public void generateOutput(){
        outputGenerator.generateOutput();
    }

    public void setOutputGenerator(IOutputGenerator outputGenerator) {
        this.outputGenerator = outputGenerator;
    }
}
```
main方法：
```java

public class App {
    public static void main(String[] args) {
        ApplicationContext context =new ClassPathXmlApplicationContext("applicationContext.xml");
        OutputHelper generator = (OutputHelper) context.getBean("output");
        generator.generateOutput();
    }
}
```

关键点就在于配置文件，需要把outputGenerator注入到代码中去，配置文件如下:
```xml
<bean id="output" class="com.relengxing.OutputHelper">
    <property name="outputGenerator" ref="xmlOutput"/>
</bean>
<bean id="jsonOutput" class="com.relengxing.JsonOutput"/>
<bean id="xmlOutput" class="com.relengxing.XmlOutput"/>
```
ref中写的是xmlOutput，那就输出xml中的内容，需要修改的时候只需要修改配置文件即可，不需要到源码中去修改。
