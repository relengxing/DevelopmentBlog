# JDBC编程步骤

1. 加载数据库驱动。
加载MySQL驱动：
`Class.forName("com.mysql.jdbc.Driver");`
2. 通过DriverManager获取数据库连接。
```java
public static Connection getConnection(String url,String user, String password)
```
```java

Connection conn = DriverManager.getConnection(
                   "jdbc:mysql://127.0.0.1:3306/user",
                   "root",
                   "root"
```
3. 通过Connection对象创建State对象。
`Statement statement = conn.createStatement();`
4. 使用Statement执行SQL语句
` ResultSet rs = statement.executeQuery("SELECT * FROM USER ;");`
5. 操作结果集。
```java
while (rs.next()){
   System.out.println(rs.getInt(1)+"\t"
       +rs.getString(2)
       +rs.getString(3)
   );
}
```
6. 回收数据库资源。
关闭各种资源



一个简单的实例
```java
import java.sql.*;

/**
 * Created by relengxing on 2016/11/25.
 */
public class main {
    public static void main(String[] args) throws ClassNotFoundException {
            Class.forName("com.mysql.jdbc.Driver");
        try (
            Connection conn = DriverManager.getConnection(
                    "jdbc:mysql://127.0.0.1:3306/user",
                    "root",
                    "1234"
            );
            Statement statement = conn.createStatement();
            ResultSet rs = statement.executeQuery("SELECT * FROM USER ;");
            ){
                while (rs.next()){
                    System.out.println(rs.getInt(1)+"\t"
                            +rs.getString(2)+"\t"
                            +rs.getString(3)
                    );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

```
