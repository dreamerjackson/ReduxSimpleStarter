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

<!-- ### react本身就是由各种component组成的，所以做一个项目的第一步就是将不同的部分分割为不同的component

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part2-react-component/image/component.png)

### 新建src/component文件夹，新建search_bar.js、video_detail.js、video_list_item.js、video_list.js

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part2-react-component/image/component-structure.png)

### 注册google-cloud-youtube-key

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part2-react-component/image/google-cloud.png)

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part2-react-component/image/youtube-key.png)

### src/index.js中，加入youtube-key const key = 'XXX';,并且安装package，可以通过key搜索youtube

```
//save代表本地安装，相对于-g全局安装。
>npm install --save youtube-api-search
```

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part2-react-component/image/youtube-package.png)


## 介绍component展现在页面中的逻辑
1、search_bar.js中写入了component，并导出
```
//必须要导入React，记住即便是最简单的jsx语法  return <input />;，也是调用了React.createElement
import React from 'react';

const SearchBar = ()=>{

  return <input />;
};

//文件之间是相互独立的，我们必须要使用导出功能，这样其他文件才能够导入我们的模块。
export default SearchBar;

```

2、src/index.js,中，导入SearchBar的component，并整合提交到页面中。
```
//导入自己的文件必须要有相对路径，这区别于npm install安装的包，直接就可以在node_modules当中查找
import SearchBar from './component/search_bar'

const App = ()=>{
  return(
    <div>
    <SearchBar />
    </div>
  );
}
```

 此步骤完成，在页面中显示一个input框。 -->



<!-- ###   1、替换function Component为 class Component
src/search_bar.js:

```js
//替换function component为更强大的class component，function component要更加的简单一些，但是class component里面不仅有state，可以与其他的component进行交互<br>
//class SearchBar 声明一个类，extends Component继承了React.Component，从而可以使用它的众多功能
import React,{Component} from 'react';

//function component
 const SearchBar = ()=>{

   return <input />;
 };
```
 替换为：
```js
//{Component}等价于导入了React.Component
import React,{Component} from 'react';

class SearchBar extends Component{
  //必须要有render代表提交内部的jsx语句。
  render(){
    return <input />;
  }
}
```
###   2、事件处理

  事件监听  ->  事件处理
  ```js
  class SearchBar extends Component{
    //必须要有render代表提交内部的jsx语句。
    render(){
      //onChange为input的属性，代表监听一个事件，即当input框的文字改变后会促发onInputChange方法
      return <input onChange = {this.onInputChange} />;
    }

  //onInputChange是当事件触发后调用的自定义方法，event是一个事件参数，名字可以随意，它是传递过来的事件的对象
    onInputChange(event){
      //事件触发后打印出文字
      console.log(event.target.value);
    }

  }
  ```
![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part3-classComponent/image/log-event.png)

###   3、事件处理更先进写法：匿名函数

```js
class SearchBar extends Component{
  //必须要有render代表提交内部的jsx语句。
  render(){
    //onChange为input的属性，代表监听一个事件，即当input框的文字改变后会促发匿名函数
    return <input onChange = {event => console.log(event.target.value)} />;
  }
}
```
-->

###   1、state
state是一个普通的js对象，只存在于任何的class component中 State状态的改变会带来component以及子component的重新render<br>
state其实是一个对象，初始化一个state中变量term，并赋值为空。可以用来记录搜索框中文字的改变。<br>

所以下面的代码的逻辑是：<br>
1 初始化了this.state ={term :''};<br>
2 当input改变时，匿名事件处理，改变了state中term的状态，而state的状态的变化会重新提交render，并显示出term的值input of value:{this.state.term}<br>

```js
class SearchBar extends Component{


  constructor(props){
    //调用父类的构造函数。也就是React.Component的构造函数
      super(props);
//只有在构造函数中，我们才能够用下面的方式来初始化state
      this.state ={term :''};

  }

  //必须要有render代表提交内部的jsx语句。
  render(){
    //onChange为input的属性，代表监听一个事件，即当input框的文字改变后会促发匿名函数
    //this.setState改变state的状态
    return (
      <div>
          <input onChange = {event => this.setState({term:event.target.value})} />;
          //打印出this.state.term的值
          input of value:{this.state.term}
      </div>
    );

  }
}

```
![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part4-state/image/inputofvalue.png)


###   2、深入state

注意这中间的逻辑

```js

class SearchBar extends Component{
  constructor(props){
      super(props);
      this.state ={term :''};

  }


  render(){
    return (
      <div>
          <input
          //2.状态term的改变后，重新提交render，就会在input框显示出最新的this.state.term
          value = {this.state.term}
          //1.事件改变带来state变量的改变。
          onChange = {event => this.setState({term:event.target.value})}
           />
      </div>
    );

  }
}

```
