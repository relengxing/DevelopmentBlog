# Hibernate学习：关联使用
这里是简单的对关联进行使用，主要是使用方法，没有对一对多，多对一，和多对多进行分析。

举一个例子：班级和学生

新建一个数据库 hibernate
新建两张表：student和grade
![学生](img\descstudent.jpg)
![年级](img\descgrade.jpg)

student的s_classid外键关联于grade的g_id

可以先在里面随便插入几个数据。
年级数据:
![年级数据](img\年级数据.jpg)
学生数据:
![学生数据](img\学生数据.jpg)

先生成类
![生成类](img\生成.jpg)
![生成选项](img\生成选项.jpg)
有些地方如果不一样自己研究一下

完成后bean目录下如下
![BEAN目录](img\bean目录.jpg)
代码都是自动生成的，理论上应该是一样的，所以这里就不贴了。
hibernate.cfg.xml里面记得修改
```xml
<property name="connection.url">jdbc:mysql://localhost:3306/hibernate</property>
<property name="connection.driver_class">com.mysql.jdbc.Driver</property>
<property name="connection.username">root</property>
<property name="connection.password">1234</property>
<mapping resource="bean/GradeEntity.hbm.xml"/>
<mapping resource="bean/StudentEntity.hbm.xml"/>
```
大致内容就是查询所有一年级学生
```java
import bean.GradeEntity;
import bean.StudentEntity;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import java.util.Set;

/**
 * Created by relengxing on 2016/11/29.
 */
public class Main {
    private static final SessionFactory ourSessionFactory;

    static {
        try {
            Configuration configuration = new Configuration();
            configuration.configure();
            ourSessionFactory = configuration.buildSessionFactory();
        } catch (Throwable ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static Session getSession() throws HibernateException {
        return ourSessionFactory.openSession();
    }

    public static void main(final String[] args) throws Exception {
        final Session session = getSession();
        try {
            GradeEntity grade = (GradeEntity) session.get(GradeEntity.class, 1);
            System.out.println(grade.getgName() + ", " + grade.getgId());
            Set<StudentEntity> students = grade.getStudentsByGId();
            for(StudentEntity stu : students) {
                System.out.println(stu.getsName() + ", " + stu.getGradeBySClassid().getgName());
            }
        } finally {
            session.close();
        }
    }
}
```
结果：
```
一年级, 1
rere, 一年级
lengxing, 一年级
```
这里是使用的main函数直接调用，下次试试单元测试的方法。
