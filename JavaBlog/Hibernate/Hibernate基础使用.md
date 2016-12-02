# Hibernate基础代码

Hibernate版本5.0.10
代码都是自动生成的，然后稍微修改了下。
一开始一直报错，原因是配置文件中数据库的帐号密码和数据库名没加。添加以后就能使用了。
```java
public class Main {
    private static final SessionFactory ourSessionFactory;

    static {
        try {
            ourSessionFactory = new Configuration().
                    configure("hibernate.cfg.xml").
                    buildSessionFactory();
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
            System.out.println("querying all the managed entities...");
            session.beginTransaction();
            GoodsEntity goodsEntity = new GoodsEntity(14,"玩具",25,12);
            session.delete(goodsEntity);
            session.getTransaction().commit();
        } finally {
            session.close();
        }
    }
}

```
hibernate.cfg.xml配置部分
```xml
<session-factory>
       <property name="connection.url">jdbc:mysql://localhost:3306/shop</property>
       <property name="connection.driver_class">com.mysql.jdbc.Driver</property>
       <property name="connection.username">root</property>
       <property name="connection.password">1234</property>
       <mapping resource="entity/GoodsEntity.hbm.xml"/>
       <mapping resource="entity/TransactionEntity.hbm.xml"/>
       <!-- DB schema will be updated if needed -->
       <!-- <property name="hbm2ddl.auto">update</property> -->
</session-factory>

```
