

这一篇写的是单元测试如何测试Controller层
这个是要测试的Controller类
```java
@RestController
public class UserController {

    @Autowired
    UserMapper userMapper;

    @RequestMapping(value = "/user/{id}",method = RequestMethod.GET)
    public String getUserByid(@PathVariable("id") int id){
        System.out.println(id);
        User user = userMapper.getUserById(id);
        System.out.println(user);
        return user.toString();
    }
}
```
这是用于测试的类,这里有个地方偷懒了，数据库中的user.id=1是手动建的，到时候可以优化下。
```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTest {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    UserController userController;

    private MockMvc mockMvc;

    @Before
    public void setupMockMvc(){
        MockitoAnnotations.initMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
public void userTest() throws Exception {
    String usrl = "http://localhost:9001/user/1";
    ResultActions ra = mockMvc.perform(MockMvcRequestBuilders.get(usrl).accept(MediaType.ALL));
    MvcResult mr = ra.andReturn();
    System.out.println(mr.getResponse().getContentAsString());
}
}
```
