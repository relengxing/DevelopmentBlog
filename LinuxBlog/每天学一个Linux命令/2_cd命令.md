# 每天学一个linux命令：cd
Linux cd 命令可以说是Linux中最基本的命令语句，其他的命令语句要进行操作，都是建立在使用 cd 命令上的。
所以，学习Linux 常用命令，首先就要学好 cd 命令的使用方法技巧。
1. 命令格式：
cd [目录名]
2. 命令功能：
切换当前目录至dirName
3. 常用范例
例一：进入系统根目录
命令：
`cd / `
输出：
`[root@localhost ~]# cd /  `
说明：进入系统根目录,上面命令执行完后拿ls命令看一下，当前目录已经到系统根目录了
命令：
`cd ..` 或者 `cd .. //`
输出:
```
[root@localhost soft]# pwd
/opt/soft
[root@localhost soft]# cd ..
[root@localhost opt]# cd ..//
[root@localhost /]# pwd
/
```
说明：
进入系统根目录可以使用“ cd .. ”一直退，就可以到达根目录
命令：
`cd ../.. //`
输出：
```
[root@localhost soft]# pwd
/opt/soft
[root@localhost soft]# cd ../.. //
[root@localhost /]# pwd
/
[root@localhost /]#
 ```
说明：使用cd 命令实现进入当前目录的父目录的父目录。
例2：使用 cd 命令进入当前用户主目录
“当前用户主目录”和“系统根目录”是两个不同的概念。进入当前用户主目录有两个方法。
命令1：
`cd`
输出：
```
[root@localhost soft]# pwd
/opt/soft
[root@localhost soft]# cd
[root@localhost ~]# pwd
/root
```
命令2：
`cd ~`
输出：
```
[root@localhost ~]# cd /opt/soft/
[root@localhost soft]# pwd
/opt/soft
[root@localhost soft]# cd ~
[root@localhost ~]# pwd
/root   
```
例3：跳转到指定目录
命令：
`cd /opt/soft`
输出：
```
[root@localhost ~]# cd /opt/soft
[root@localhost soft]# pwd
/opt/soft
[root@localhost soft]# cd jdk1.6.0_16/
[root@localhost jdk1.6.0_16]# pwd
/opt/soft/jdk1.6.0_16
[root@localhost jdk1.6.0_16]#
```
说明：
跳转到指定目录，从根目录开始，目录名称前加 / ,当前目录内的子目录直接写名称即可
例四：返回进入此目录之前所在的目录
命令：
`cd -`
输出：
复制代码
```
[root@localhost soft]# pwd
/opt/soft
[root@localhost soft]# cd -
/root
[root@localhost ~]# pwd
/root
[root@localhost ~]# cd -
/opt/soft
[root@localhost soft]#
```
例五：把上个命令的参数作为cd参数使用。
命令：
`cd !$`
输出：
复制代码
```
[root@localhost soft]# cd !$
cd -
/root
[root@localhost ~]# cd !$
cd -
/opt/soft
[root@localhost soft]#
```
