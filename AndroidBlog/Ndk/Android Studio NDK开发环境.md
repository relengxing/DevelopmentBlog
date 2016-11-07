搞了几天，查了很多资料，基本上能用了。
求关注，求点赞。转载请注明出处：http://www.jianshu.com/p/c0ec29da278b
*****
Android Studio 2.2 开始NDK开发是使用CMake的方式,配置CMakeLists.txt
开发环境：
Android Studio 2.2 RC
WIN10 企业版64位
ubuntu14.04
NDK 12.1.2
CMake 3.4.2
********
NDK开发主要有以下几种情况：
* 自己写C/C++文件来生成.so动态库供JAVA调用
* JAVA直接调用编译好的.so动态库
* C/C++链接已经编译好的.so动态库
********
## 1. 自己写C/C++文件来生成.so动态库供JAVA调用

 这种情况其实很简单，如图，勾选 include C++ Support然后一路 next


![新建工程](http://upload-images.jianshu.io/upload_images/2188564-7324f8ed1514cd27.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后Finish即可
![工程选项](http://upload-images.jianshu.io/upload_images/2188564-2edb55d5aae69d79.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

下图对工程目录进行了介绍，可以在大图中看清楚这些信息。
![工程目录和JAVA文件](http://upload-images.jianshu.io/upload_images/2188564-609f8cf01cfc9b2c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这里其实就是返回了一个字符串，可以讲的地方就是函数的名字
函数的名字是java+包名+类名+方法名
这里一般都是自动生成，不会自己去写，可以把这个函数删掉，然后在JAVA本地方法处按 Alt+Enter来自动生成，也可以通过javah命令来生成，这里不细说了。
![C++文件](http://upload-images.jianshu.io/upload_images/2188564-c7ac89c51488d4bc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

CMakeLists.txt这个文件，我把注释都删掉了，方便截图，如果大家想看注释的话可以自己建一个工程看。这个文件是给CMake用的，至于怎么用，不用去管它，想研究的话可以找CMake的资料去研究，我们只要知道怎么写就行了，其实只要知道一部分语法就可以满足我们的正常需求了。

这里贡献一个CMake的资料：[Practice.pdf](http://pan.baidu.com/s/1gf5Eruj) 密码：xqvh
如果有时间的话把这篇资料看完是很好的。如果没时间就看我这篇好了。
![CMakeLists.txt文件](http://upload-images.jianshu.io/upload_images/2188564-45d9ed059dd45447.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

自己写C/C++文件来生成.so动态库供JAVA调用这里基本上就OK了。
同步一下，然后编译，运行，一般都不会出问题，什么都还没开始写，如果这个时候出了问题，找找自己机器和软件的原因。这里不截图演示了
如果需要修改名称，比如我们的C++文件叫 world.cpp 生成库的名字叫 hello（系统会自动生成libhello.so）可以修改如下图，当然，JAVA中加载的库也在改为hello，

![修改](http://upload-images.jianshu.io/upload_images/2188564-3e248d8e25c07a15.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
*******
扩展，也就是一些蛋疼的需求
### 扩展1：多文件编译

这时提出一种需求：我一个工程不可能只有一个C/C++文件，怎么办。
这时就要多文件编译。
我们写一个num.c和num.h文件里面只有一个函数,代码如下。
函数的作用就是，给传入的int型数字加10000然后返回。

    //num.c
    #include "num.h"
    int getNum(int num){
        return num + 10000;
    }

    //num.h
    #ifndef NDK1_NUM_H
    #define NDK1_NUM_H
    int getNum(int num);
    #endif //NDK1_NUM_H

该函数在jni的函数中调用，如下图。
![调用](http://upload-images.jianshu.io/upload_images/2188564-6bad78e88cf9e511.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

CMakeLists.txt文件中的add_library需要修改

![add_library](http://upload-images.jianshu.io/upload_images/2188564-43cce0d9e5397741.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
然后同步一下就可以编译了。

然后就报错了。。。
![报错](http://upload-images.jianshu.io/upload_images/2188564-e8ff5ef39c8657a2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这个错误是在执行Cmake的时候出现的，看了半天看不懂到底哪里错了，总共就那么几行代码。这个地方我真的是蛋疼了很久，最后我都不知道我自己是怎么解决的，反正就是乱尝试，一不小心就通过了。
有一次我把num.c改成num.cpp再编译就又通过了。这就尴尬了，这是歧视啊，这不是看不起我们这些纯C语言的程序员吗。不过能通过就好。这时想到是C和C++的兼容问题，于是我又把num.cpp改成了num.c在num.h中添加了extern"C"，如下代码所示。再编译也通过了，总算不痛了。
```cplusplus
    #ifndef NDK1_NUM_H
    #define NDK1_NUM_H
    #ifdef __cplusplus
    extern"C"
    #endif//__cplusplusint
    getNum(int num);
    #endif //NDK1_NUM_H
```

![运行结果](http://upload-images.jianshu.io/upload_images/2188564-95612ebe96ab4720.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
打开工程目录下
\app\.externalNativeBuild\cmake\debug\obj
可以看到该目录下是生成的.so文件
.externalNativeBuild这个文件夹下的东西也可以自己研究一下


### 扩展2：生成指定平台的.so动态库
这里默认是生成了所有平台的动态库
如果要指定动态库的平台
则在如图所示位置修改

![修改动态库平台](http://upload-images.jianshu.io/upload_images/2188564-5148045e98313fd7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
写下来方便大家复制

    abiFilters "armeabi-v7a" , "armeabi" ,"x86"
这里就不截图了，知道即可
*******************************************
## 2.JAVA直接调用编译好的.so动态库

接着上面的例子，我们的工程已经编译好了一个.so动态库，直接拿过来用好了。
把\app\.externalNativeBuild\cmake\debug\obj 这个目录和里面的东西**剪切**到\app\libs里，这个目录其实无所谓，是我们自己设置的。
把CMakeLists.txt里面所有东西注释掉，这样就不会生成新的.so动态库混淆掉
修改app目录下build.gradle
添加红色方框的这段话。

这段话我是找遍了百度，也找遍了谷歌，最后在[google官方的demo](https://github.com/googlesamples/android-ndk/tree/master-cmake)里找到的。这个github是个好东西，里面有很多新版NDK的例子，我就是在这个里面找到解决方案的。寻找的过程也颇为痛苦，也幸亏当年练就了一身找资料的本事，比如你给我几个字母和数字的组合，我就能给你找到几个G的资源。。额，扯远了。

同步一下，看到左边有了jniLibs这个文件夹
![build.gradle](http://upload-images.jianshu.io/upload_images/2188564-87c47c89630d4378.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
编译以后运行，运行正常

![运行结果](http://upload-images.jianshu.io/upload_images/2188564-828cf54ddc75688d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

从这个例子里面可以看到，JAVA调用已经第三方编译好的.so动态库，核心就是下面这段话，这里写出来，方便大家复制。

    sourceSets {    
        main {        
        // let gradle pack the shared library into apk        
        jniLibs.srcDirs = ['../app/libs']    
        }
    }

**********
## 3. C/C++链接已经编译好的.so动态库
这里写两个示例
* 在本工程内部再生成一个.so动态库，一起编译。
* 在linux的环境下通过NDK编译好.so动态库，然后把.so动态库放入工程

  ###在本工程内部再生成一个.so动态库，一起编译。
把libs目录下的.so动态库删掉
首先把CMakeLists.txt文件之前我们写的注释去掉
修改为如图所示，注意到左边的cpp文件夹下按库分了两个文件夹，真是人性化。
![CmakeLists.txt](http://upload-images.jianshu.io/upload_images/2188564-834d7fc5e6ba2033.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
同步以后编译一下，生成了libhello.so和libnum.so动态库。
![生成动态库](http://upload-images.jianshu.io/upload_images/2188564-c790d4edfaf29fe7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
运行一下没有问题，就不截图了。
### 在linux的环境下通过NDK编译好.so动态库，然后把.so动态库放入工程
我的linux是部署在阿里云上的，之前我已经测试过了，所以很多东西已经装好，装东西的过程就不演示了。要装的东西有ndk，vim。
先装好NDK：[安装和配置过程](http://www.jianshu.com/p/abdad7fd1367)
vim就直接使用，假如没有的话，系统应该会提示怎么装，指令是

      sudo apt-get install vim-gtk
关于VIM的操作这里就不介绍了，如果再一句一句的教就太啰嗦了。
我是用xshell来连接远程服务器的，这里用虚拟机也可以
如果会linux的话我写的这些指令应该能看懂，看不懂也没关系，照着输就行，意思就是在/home/relengxing/下建了个num的文件夹，并进入该文件夹，这个其实随便建，想在哪里在哪里。
![xshell](http://upload-images.jianshu.io/upload_images/2188564-219311df5082a226.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
然后在num文件夹内再新建一个jni文件夹，并进入
![新建jni文件夹](http://upload-images.jianshu.io/upload_images/2188564-c09739edf71b6cef.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

启动文件传输，把我们之前写的 num.c和num.h复制进去，当然也可以自己手码一遍，我这里就直接CTRL+C,CTRL+V了
![文件传输](http://upload-images.jianshu.io/upload_images/2188564-859f75fc092541a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

ls一下，看到已经复制进去了
![jni文件夹](http://upload-images.jianshu.io/upload_images/2188564-5a7c3c558ae1f6d1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在jni中再创建一个Android.mk文件写法如下，同样写下来，方便复制。

      LOCAL_PATH := $(call my-dir)  
      include $(CLEAR_VARS)  
      LOCAL_MODULE    := num  
      LOCAL_SRC_FILES := num.c  

      include $(BUILD_SHARED_LIBRARY)  
     #include $(BUILD_EXECUTABLE)

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/2188564-e2f1a9f482ea80e6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在jni目录或者num目录下执行:
ndk-build APP_ABI=all                  //编译所有平台
ndk-build APP_ABI=armeabi-v7a  //编译arm 
ndk-build APP_ABI=mips              //编译mips
生成的文件在num/libs下，不同平台对应不同的目录。
如图所示，生成了以下动态库
![生成动态库](http://upload-images.jianshu.io/upload_images/2188564-655e014a941c5e61.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
把libs文件夹复制到我们的windows系统上来，放到Android工程的libs目录下，如图所示

![libs目录](http://upload-images.jianshu.io/upload_images/2188564-a4d5f1ae08e62158.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
删除上一次生成的obj下的库文件，防止干扰
修改CMakeLists.txt文件，把第一个add_library删掉，也就是生成num库的那个删掉，因为我们已经在linux下生成好了，直接就行了，不用再生成一个，编译以后报错！！又是看不懂的错误，然后我又左摸索，右摸索，内事不决问百度，外事不决问谷歌，X事不决问天涯。
最后修改如下图，同步一下，编译。

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/2188564-983225cb64dc2a78.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
关键几行写一个，方便复制
CMAKE_SOURCE_DIR  和  ANDROID_ABI  是系统已经定义好的
CMAKE_SOURCE_DIR 就是CMakeLists.txt的路径，
ANDROID_ABI就是根据你的平台来选择
set就相当于C语言的#define，用lib_DIR来代替后面的内容，引用的时候要写成${lib_DIR}
IMPORTED的意思猜想一下就是导入了的
set_target_properties这个没有深入研究，大致意思是设置目标的一些属性来改变它们构建的方式。这里照着修改就行了。

    set(lib_DIR ${CMAKE_SOURCE_DIR}/libs)
    add_library(num SHARED IMPORTED )
    set_target_properties(num PROPERTIES IMPORTED_LOCATION
        ${lib_DIR}/${ANDROID_ABI}/libnum.so)


运行结果如下图。
![Paste_Image.png](http://upload-images.jianshu.io/upload_images/2188564-2d377845016774bd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 扩展
比如，我的头文件没有放在cpp目录，动态库没有放在libs。
而是放在和app文件夹同级的number文件夹下,头文件放在number/include/下，库文件放在number/libs/｛不同平台｝/下，就要这样写了
include_directories是设置头文件路径

      set(lib_DIR ${CMAKE_SOURCE_DIR}/../number)
      add_library(num SHARED IMPORTED )
      set_target_properties(num PROPERTIES IMPORTED_LOCATION
          ${lib_DIR}/libs/${ANDROID_ABI}/libnum.so)

      include_directories(${lib_DIR}/include)
********************
至此Android Studio NDK开发环境这篇告一段落。
大致的使用情况都有介绍。
如果还有问题可以拿上面那个[github](https://github.com/googlesamples/android-ndk/tree/master-cmake)研究一下
如果这篇文章有什么问题欢迎在评论指出。
求赞，求关注。欢迎转载，请注明出处：http://www.jianshu.com/p/c0ec29da278b。
