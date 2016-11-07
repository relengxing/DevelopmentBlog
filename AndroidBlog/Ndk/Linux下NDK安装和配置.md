下载NDK，我这里下载的是最新版本的NDK：https://developer.android.com/ndk/downloads/index.html

下载linux版本，先下载到自己电脑上，然后再传到linux的服务器或者虚拟机上


![NDK.zip](http://upload-images.jianshu.io/upload_images/2188564-8481638cac392cb6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


先解压文件。
指令是：

    unzip android-ndk-r12b-linux-x86_64.zip

如果解压失败，可能是权限问题，在上级目录给ndk文件夹权限

    chamod 777 -R ndk

配置环境变量，打开.bashrc这个文件

    vim ~/.bashrc

在文件末尾添加如图两行代码
![.bashrc](http://upload-images.jianshu.io/upload_images/2188564-5a9cdae12ae65723.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

写下来方便复制
    export NDKROOT=/usr/ndk/android-ndk-r12b
    export PATH=$NDKROOT:$PATH

保存退出，更新一下环境变量

    source ~/.bashrc


到这LINUX环境下NDK的安装和配置就完成了
