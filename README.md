# Redux 学习笔记
###  构建searchbar
src/containers/search_bar.js:

```js
import React,{Component} from 'react';
export default class SearchBar extends Component{

render(){
  return (
    <form className="input-group">
        <input />
        <span className="input-group-btn">
          <button type= "submit" className="btn btn-secondary">Submit</button>
        </span>
     </form>
  );
}
}
```

component/app.js:

```js
import React, { Component } from 'react';
import SearchBar from '../containers/search_bar';
export default class App extends Component {
  render() {
    return (
    <SearchBar />
    );
  }
}
```

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part11-weatherReducer/images/searchbar.png)


### 修改search_bar


>添加样式，bootstrap 添加状态，即input按钮中的值，会存储到state中。

src/containers/search_bar.js:

```js
import React,{Component} from 'react';

export default class SearchBar extends Component{


constructor(props){
  super(props);
  this.state = {term:''};


}

onInputChange(event){
  console.log(event.target.value);
  this.setState({term:event.target.value});
}

render(){
  //bootstrap
  return (
    //onSubmit，处理提交后的时间。
    <form  className="input-group">
        <input
            placeholder="Get a five-day forecast in your favirate citeies"
              /*值和term state一样*/
            className="form-control"
              /*值和term state一样*/
            value={this.state.term}
    /*onChange={this.onInputChange} 这种方式会报错，因为在函数onInputChange中找不到this这个东西*/
  /*方法一：arrow函数。方法二：this.onInputChange = this.onInputChange.bind(this);*/
            onChange={(event)=>this.onInputChange(event)}
        />
        <span className="input-group-btn">
          <button type= "submit" className="btn btn-secondary">Submit</button>
        </span>
     </form>
  );
}
}
```

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part11-weatherReducer/images/event.png)


>处理按钮点击事件，阻止默认提交


```js
import React,{Component} from 'react';
export default class SearchBar extends Component{

constructor(props){
  super(props);
  this.state = {term:''};
}

onInputChange(event){
  console.log(event.target.value);
  this.setState({term:event.target.value});
}

onFormSubmit(event){
  //阻止默认提交，因为浏览器的默认提交会跳转到一个新的页面，但是我只希望在此页面中进行操作。
  event.preventDefault();

}

render(){
  //bootstrap

  return (
    //onSubmit，处理提交后的时间。
    <form  onSubmit={this.onFormSubmit} className="input-group">
        <input
            placeholder="Get a five-day forecast in your favirate citeies"
              /*值和term state一样*/
            className="form-control"
              /*值和term state一样*/
            value={this.state.term}
    /*onChange={this.onInputChange} 这种方式会报错，因为在函数onInputChange中找不到this这个东西*/
  /*方法一：arrow函数。方法二：this.onInputChange = this.onInputChange.bind(this);*/
            onChange={(event)=>this.onInputChange(event)}
        />
        <span className="input-group-btn">
          <button type= "submit" className="btn btn-secondary">Submit</button>
        </span>
     </form>
  );
}
}
```
