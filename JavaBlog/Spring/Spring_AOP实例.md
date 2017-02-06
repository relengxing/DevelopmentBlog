# Spring学习笔记： AOP实例

Spring两个最重要的作用就是IOC和AOP
IOC主要是依赖注入
AOP就是面向切面编程


Spring的AOP用的是AspectJ
我这里写一个例子

用intellij新建了一个工程，是SpringBoot的。勾选了AOP,WEB，thymeleaf其他的暂时都没选。


一个显示页面
```java
@Controller
public class HomeController {

    @RequestMapping("/")
    public String getindex(){
        System.out.println("运行index");
        return "index";
    }
}
```
页面里面也是控的，就是为了触发一下，当我访问这个页面时，会出发getindex这个方法，控制台会打印运行index这段话。

然后就是加切面了

新建一个切面类，如下
```java

@Component
@Aspect
public class HomeAspect {

    @Before(value = "execution(* com.relengxing.controller.HomeController.getindex(..))")
    public void beforeTest(){
        System.out.println("before 运行");
    }
    @After(value = "execution(* com.relengxing.controller.HomeController.getindex(..))")
    public void afterTest(){
        System.out.println("after 运行");
    }

    @Around(value = "execution(* com.relengxing.controller.HomeController.getindex(..))" )
    public Object aroundTest(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Object o = null;
        System.out.println("执行第一句话");
        System.out.println("执行第二句话");
        o = proceedingJoinPoint.proceed();
        System.out.println("执行第三句话");
        System.out.println("执行第四句话");
        return o;
    }
}

```
运行结果
```
执行第一句话
执行第二句话
before 运行
运行index
执行第三句话
执行第四句话
after 运行
```

一般around和before,after不会一起用
稍微分析一下顺序就可以了
