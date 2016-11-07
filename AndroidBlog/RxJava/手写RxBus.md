我这篇本来是写在简书上的，现在转到GitHub上来写了，所以把这篇复制过来。

参考：用RxJava实现事件总线(Event Bus)
http://www.jianshu.com/p/ca090f6e2fe2

我这篇基本上就是按照上面那篇写的，对Sticky那一块进行了一些修改。
写下来让自己记得更深刻。这篇文章面向有RxJava基础的人，要是HelloWorld都没写过建议先看基础部分。


Git地址：
https://github.com/relengxing/RxBus
# 步骤
1. 新建工程
2. 添加rxjava和rxandroid依赖
3. 完成以下界面

![界面](http://upload-images.jianshu.io/upload_images/2188564-7ecf70697afbb76e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
4. 编写RxBus文件
5. 编写其他代码
***
RxBus是一个全局使用的总线，应该使用单例模式。
单例模式的具体写法可以自己研究下。
参考代码：
http://www.race604.com/java-double-checked-singleton/
```java
    /**
    * Created by relengxing on 2016/8/12.
    */
    public class RxBus {    
        private RxBus() {    

        }    
        public static RxBus getDefault() {        
            return HelperHolder.instance;    
        }    
        private static class HelperHolder {        
            public static final RxBus instance = new RxBus();    
        }
    }
```
### 事件总线
那么需要一根总线来传输数据。
这根总线就是RxJava中的Subject。

>Subject可以看成是一个桥梁或者代理，在某些ReactiveX实现中（ 如RxJava） ，**它同时充当了Observer和Observable的角色**。因为它是一个Observer，它可以订阅一个或多个Observable；又因为它是一个Observable，它可以转发它收到(Observe)的数据，也可以发射新的数据。

在RxJava中
针对不同的场景一共有四种类型的Subject。
* AsyncSubject
* BehaviorSubject
* PublishSubject
* ReplaySubject
关于这四种类型的具体说明参考：[RxJava：Subject介绍](http://www.jianshu.com/p/d382c3f862d5)

这里使用的是PublishSubject
PublishSubject：只会把在订阅发生的时间点之后来自原始Observable的数据发射给观察者；
又因为线程安全的问题，需要把PublishSubject转化为一个线程安全的Subject，这部分内容也在[RxJava：Subject介绍](http://www.jianshu.com/p/d382c3f862d5)最后一部分串行化中有介绍。
最后代码写成如下：

    private final Subject<Object,Object> bus;
    private RxBus() {    
        bus = new SerializedSubject<>(PublishSubject.create());
    }

总线有了，还差事件发布者（被观察者）和事件接受者（观察者）。

### 发送事件
将事件post至Subject，此时Subject作为Observer接收到事件（onNext），然后会发射给所有订阅该Subject的订阅者。
因为使用的是PublishSubject，所以必须先订阅事件再发送事件才能介绍到，否则这些发送的事件会遗失。
```java
    public void post(Object object){    
        bus.onNext(object);
    }
```
### 接收事件
```java
    public <T> Observable<T> toObservable(Class<T> eventType){
       return bus.ofType(eventType);
    }
```
>ofType 是 filter 操作符的一个特殊形式。它过滤一个Observable只返回指定类型的数据。ofType 默认不在任何特定的调度器上指定 。

有一点需要注意的是，在接收事件的地方不需要接收事件或者生命周期结束的时候一定要取消订阅，防止内存泄漏。
```java
    if (!rxSubscription2.isUnsubscribed()) {    
        rxSubscription2.unsubscribe();
    }
```
# 支持Sticky事件
>在Android开发中，Sticky事件只指事件消费者在事件发布之后才注册的也能接收到该事件的特殊类型。Android中就有这样的实例，也就是Sticky Broadcast，即粘性广播。正常情况下如果发送者发送了某个广播，而接收者在这个广播发送后才注册自己的Receiver，这时接收者便无法接收到刚才的广播，为此Android引入了StickyBroadcast，在广播发送结束后会保存刚刚发送的广播（Intent），这样当接收者注册完Receiver后就可以接收到刚才已经发布的广播。这就使得我们可以预先处理一些事件，让有消费者时再把这些事件投递给消费者。

参考：[深入RxBus：［支持Sticky事件］](http://www.jianshu.com/p/71ab00a2677b)

关于方案选择不再详述了，参考上面的链接。
同样使用的是ConcurrentHashMap
参考资料中使用的是
```java
    private final Map<Class<?>, Object> mStickyEventMap;
```
那么同一个类只会有一个对象保留，后面发送的对象会把前面的对象覆盖掉。
而我希望一个新的对象不会覆盖老的对象，需要自己手动来删除。
所以这个地方改成
```java
    private final ConcurrentHashMap<Class<?>,List<Object>> map;
```
Sticky事件和普通事件使用的是同一个Bus,所以接收者接收的是同一个对象时，当他们都订阅了事件时是没有区别的。

### 发送Sticky事件
 这个其实就是在发送普通时间之前把这个事件写入到刚刚的map中去。
```java
    public void postSticky(Object object){    
        synchronized (mStickyEventMap){       
            List list = mStickyEventMap.get(object.getClass());        
            if (list == null) {            
                list = new ArrayList();       
           }        
            list.add(object);        
            mStickyEventMap.put(object.getClass(),list);    
        }    
        post(object);
    }
```
### 接收Sticky事件
这个就是先查看map中是否有这个事件，有的话使用.merginWith一起发出来。
```java
    public <T> Observable<T> toObservableSticky(final Class<T> eventType){    
        synchronized (mStickyEventMap){        
            Observable<T> observable = bus.ofType(eventType);            
            final List list =  mStickyEventMap.get(eventType);        
            if (list != null && !list.isEmpty()) {            
                return observable.mergeWith(Observable.create(new Observable.OnSubscribe<T>(){                
                @Override                
                public void call(Subscriber<? super T> subscriber) {                    
                      for (Object obj :list) {                        
                          subscriber.onNext(eventType.cast(obj));
                    }
                }
            }));
            }else {
                return observable;
            }
        }
    }
```
还写了一些常用方法，例如post一个事件的时候覆盖同类事件，接收事件时消耗掉事件，代码在简书上写起来还是有点麻烦，详情看GitHub，地址：https://github.com/relengxing/RxBus
要使用的时候把RxBus文件直接复制到工程即可。
如果有BUG可以在评论区告诉我。

![动画图](http://upload-images.jianshu.io/upload_images/2188564-c8fdc8129972449b.gif?imageMogr2/auto-orient/strip)
