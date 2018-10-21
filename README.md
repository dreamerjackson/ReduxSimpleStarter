# Redux构建一个博客系统 构建博客的增删查改，路由。

#### Familiar with Git?
Checkout this repo, install dependencies, then start the gulp process with the following:

```
> git clone https://github.com/StephenGrider/ReduxSimpleStarter.git
> cd ReduxSimpleStarter
> npm install
> npm start
```

### 将要构建的博客系统。其实是假设了我们已经构建了一个数据库，并且已经有了API。所以我们这个案例的重点任然是redux，而不是全栈，研究后端服务器和构建API。

博客API：https://reduxblog.herokuapp.com/


### 安装react-Route
```
> npm install --save react-router-dom@4.2.2
```

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part17-reactRouter/images/post.png)

### react-Route工作原理

传统的方式：发送url到服务器，服务器传回html。
![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part17-reactRouter/images/oldserver.png)

react通过js，根据不同的url修改component，render，从而在同一个页面显示不同的内容。
![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part17-reactRouter/images/reactRoute.png)
