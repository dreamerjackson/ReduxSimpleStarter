<!-- # ReduxSimpleStarter

Interested in learning [Redux](https://www.udemy.com/react-redux/)?

### Getting Started

There are two methods for getting started with this repo.

#### Familiar with Git?
Checkout this repo, install dependencies, then start the gulp process with the following:

```
> git clone https://github.com/StephenGrider/ReduxSimpleStarter.git
> cd ReduxSimpleStarter
> npm install
> npm start
```

#### Not Familiar with Git?
Click [here](https://github.com/StephenGrider/ReactStarter/releases) then download the .zip file.  Extract the contents of the zip file, then open your terminal, change to the project directory, and:

```
> npm install
> npm start
``` -->

# React学习笔记

<!--
```
> git clone https://github.com/dreamerjackson/ReduxSimpleStarter
> cd ReduxSimpleStarter
> npm install
> npm start
```

删除src文件，新建一个src文件，新建index.js

//const 和var相同，声明一个变量，但是不能更改，例如，不能够再写上App = 5；
```
const App = function(){
  return <div>Hi!</div>;
}
```
上面的jsx语法实际上是简化代码的书写，webpack+babel将jsx代码转换为浏览器能够识别的普通js代码。
本质上通过[babel](https://babeljs.io/repl)可以看到jsx代码转换后的js代码 -->

### react本身就是由各种component组成的，所以做一个项目的第一步就是将不同的部分分割为不同的component

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part2-react-component/image/component.png)

### 新建src/component文件夹，新建search_bar.js、video_detail.js、video_list_item.js、video_list.js

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part2-react-component/image/component-structure.png)

### 注册google-cloud-youtube-key

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part2-react-component/image/google-cloud.png)

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part2-react-component/image/youtube-key.png)

### src/index.js中，加入youtube-key const key = 'XXX';,并且安装package，可以通过key搜索youtube

```
>npm install --save youtube-api-search
```
