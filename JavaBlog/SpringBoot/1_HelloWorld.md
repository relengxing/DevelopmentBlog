# SpringBoot学习：HelloWorld



这一篇会写建工程，HelloWorld的例子还有单元测试

SpringBoot的版本是1.4.2.RELEASE
1.4以后的和1.4以前的单元测试不一样，之前的资料是1.3的，单元测试的注解过时了。


## 新建工程
新建工程第一步就是用Maven建一个新的空工程。
项目结构如下图
![项目结构](img\项目结构.jpg)

然后修改pom.xml文件
pom部分内容如下
```xml
<parent>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-parent</artifactId>
   <version>1.4.2.RELEASE</version>
</parent>

<dependencies>
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter</artifactId>
       <version>1.4.2.RELEASE</version>
   </dependency>
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-web</artifactId>
       <version>1.4.2.RELEASE</version>
   </dependency>

</dependencies>

<build>
   <plugins>
       <plugin>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-maven-plugin</artifactId>
           <version>1.4.2.RELEASE</version>
       </plugin>
   </plugins>
</build>
```


## 编程
#### HelloControll.java
这个部分和SpringMvc学习的时候一样的
```java
@RestController
public class HelloController {

    @RequestMapping("/hello")
    public String index() {
        return "Hello World";
    }
}
```


#### Application.java
这个是程序的入口
```java
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class,args);
    }
}

```

一个配置文件都没有，而且依赖也就两个。简直就是5分钟完成。。
运行后控制台会输出下面的代码
```
.   ____          _            __ _ _
/\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
\\/  ___)| |_)| | | | | || (_| |  ) ) ) )
'  |____| .__|_| |_|_| |_\__, | / / / /
=========|_|==============|___/=/_/_/_/
:: Spring Boot ::        (v1.4.2.RELEASE)

2016-12-25 00:01:01.989  INFO 13912 --- [           main] com.relengxing.Application               : Starting Application on MAGI-XX with PID 13912 (D:\WorkSpace\JavaWorkSpace\SpringBootTest1\target\classes started by relengxing in D:\WorkSpace\JavaWorkSpace\SpringBootTest1)
2016-12-25 00:01:01.993  INFO 13912 --- [           main]
......
省略
......
```
运行成功后访问 http://localhost:8080/hello
就可以看到效果了，输出
```
Hello World
```
##　单元测试
使用单元测试还需要引入单元测试的包

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <version>1.4.2.RELEASE</version>
</dependency>
```

在1.3中单元测试这样子的类似代码：
```java
// SpringJUnit支持，由此引入Spring-Test框架支持！
@RunWith(SpringJUnit4ClassRunner.class)
//// 指定我们SpringBoot工程的Application启动类
@SpringApplicationConfiguration(classes = App.class)
///由于是Web项目，Junit需要模拟ServletContext，因此我们需要给我们的测试类加上@WebAppConfiguration。
@WebAppConfiguration
public class HelloServiceTest {

}
```

1.4以后
```java
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MyTest {

}
```
其中@RunWith(SpringRunner.class): 告诉Junit运行使用Spring 的单元测试支持；
SpringRunner是SpringJunit4ClassRunner新的名称，只是视觉上看起来更简单了。
其中@SpringBootTest表示该注解可以在一个测试类指定运行Spring Boot为基础的测试。
#### MyTest.java
```java
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = MockServletContext.class)
public class MyTest {

    private MockMvc mvc;

    @Before
    public void setUp() throws Exception {
        mvc = MockMvcBuilders.standaloneSetup(
                new HelloController()).build();
    }

    @Test
    public void getHello() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/hello").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(equalTo("Hello World")));
    }
}
```
单元测试通过

单元测试以后还得具体研究，这个地方就是一个格式。主要注意1.4版本和1.3版本之前的东西有不同。
