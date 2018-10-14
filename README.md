# Redux 学习笔记
<!-- ###  构建searchbar
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

### 天气预报网站
[天气预报网站](https://openweathermap.org/forecast5)

[json格式](https://samples.openweathermap.org/data/2.5/forecast?q=London,us&appid=b6907d289e10d714a6e88b30761fae22)
[xml格式](https://samples.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid=b6907d289e10d714a6e88b30761fae22)
谷歌插件查看json格式：jsonView

登陆网址，可获取到API_KEY


### apply Middleware

Middleware像一个看门人，action 分发到 redux 之前，有Middleware来处理一些事情后，转发给redux。

添加Middleware，需要安装：

```
>npm install --save redux-promise
```

src/index.js:
 添加Middleware
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';


import ReduxPromise from 'redux-promise';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
```





###  weather action
想象一下我们需要获取最新天气数据，并且更行redux的state。这时候，就需要创建一个action createor
 注意字符串的凭借方式。
注意异步获取数据使用的不是query，而是更轻便的axios

```
>npm install --save axios
```
src/action/index.js:

```js
import axios from 'axios';
const API_KEY = "09ec05ac89602c9970393fe760db2bf5";
const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?&appid=${API_KEY}`
export const FETCH_WEATHER = 'FETCH_WEATHER';


export function fetchWeather(city){
  const url = `${ROOT_URL}&q=${city},us`;
  const request = axios.get(url);
  return {
      type:FETCH_WEATHER,
      payload:request
  };
}
```


### 点击搜索，触发action
src/container/search_bar.js:

>   将action与redux绑定在一起.提交form，会触发action。ajax异步请求。


```js
import React,{Component} from 'react';

//导入react与redux的绑定
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchWeather}  from '../actions/index';

class SearchBar extends Component{


constructor(props){
  super(props);
  this.state = {term:''};


}

onInputChange(event){
  //console.log(event.target.value);
  this.setState({term:event.target.value});
}


onFormSubmit(event){
  //阻止默认提交，因为浏览器的默认提交会跳转到一个新的页面，但是我只希望在此页面中进行操作。
  event.preventDefault();

//触发action
this.props.fetchWeather(this.state.term);
//清空搜索框
this.setState({term:''});
}

render(){
  //bootstrap

  return (
    //onSubmit，处理提交后的时间。
    <form  onSubmit={(event)=>this.onFormSubmit(event)} className="input-group">
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


//将action与redux绑定，并且fetchWeather这个action 作为了props的参数。
function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchWeather},dispatch);
}

export default connect(null,mapDispatchToProps)(SearchBar)
```


![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part11-weatherReducer/images/newyork.png) -->

### redux-promise do what?

在src/actions/index.js中,axios异步操作返回的是promis，转发到redux之后，由于redux-promise middleware对promise精心了处理，所以对转发到redux的action进行了一些处理。

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part13-middleware/images/redux-promise.png)
![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part13-middleware/images/redux-promise2.png)

src/actions/index.js：
```js
import axios from 'axios';
const API_KEY = "09ec05ac89602c9970393fe760db2bf5";
const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?&appid=${API_KEY}`
export const FETCH_WEATHER = 'FETCH_WEATHER';
export function fetchWeather(city){
  const url = `${ROOT_URL}&q=${city},us`;
  const request = axios.get(url);
//打印出promise
console.log("request:",request);
  return {
      type:FETCH_WEATHER,
      payload:request
  };
}
```

reducers/reducer_weather:
答应出action对象，不再是promise，这是因为redux-promise middleware

```js
export default function(state=null,action){
  //答应出action对象，不再是promise，这是因为redux-promise middleware
  console.log('Action recieve',action);
  return state;
}
```
