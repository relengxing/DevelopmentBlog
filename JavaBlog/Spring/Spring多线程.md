# Spring学习：多线程的一个问题


今天遇到一个问题，就是一个多线程存储的问题。新开一个线程，然后把数据通过Mybatis存储到数据库会出现空指针异常。一开始以为是Mybatis的问题，查了资料以后发现是新开的线程是自己New出来的，所以里面mybatis的mapper没有注入成功，所以是空指针。

解决方案是使用Spring的异步方法。


首先是一个配置类
```java
package com.example;

import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Component;

import java.util.concurrent.Executor;

/**
 * Created by relengxing on 2017/2/3.
 */
@Configuration
@Component
@EnableAsync
public class TaskExecutorConfig implements AsyncConfigurer {
    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();
        taskExecutor.setCorePoolSize(5);
        taskExecutor.setMaxPoolSize(10);
        taskExecutor.setQueueCapacity(25);
        taskExecutor.initialize();
        return taskExecutor;
    }

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return null;
    }
}

```
这里设置了一个线程池，设置了线程池的线程数量和一些东西。

然后这样使用
```java
package com.example;

import com.example.entity.Date1C20;
import com.example.mapper.Date1c20Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * Created by relengxing on 2017/2/3.
 */
@Service
public class AsyncTaskService {

    @Autowired
    Date1c20Mapper date1C20Mapper;
    @Async
    public void executeAsyncTask(Integer i){
        Date1C20 date1C20 = date1C20Mapper.findByid(1);
        System.out.println(date1C20);

        Date1C20 date1C201 = new Date1C20();
        date1C201.setAddress("101010010101");
        date1C201.setTime(new Date());
        date1C201.setTemerature(365);
        date1C201.setHumidity(700);
        date1C201.setElectricity(457);
        date1C20Mapper.insertData(date1C201);
    }
}


```
