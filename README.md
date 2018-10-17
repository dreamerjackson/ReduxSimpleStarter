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



### weather list redux

```js
import {FETCH_WEATHER} from '../actions/index';

//null修改为数组
export default function(state=[],action){

switch (action.type) {
  case FETCH_WEATHER:
    // 等价于state.concat([action.payload.data]),state是一个数组，将新的用户搜索的city存储到该数组中。
  return [action.payload.data,...state];
}
  return state;
}
```




### weather list  container
构建一个表格:
src/containers/WeatherList.js:
```js
import React,{Component} from 'react';

import {connect} from 'react-redux';

// container/book-detail.js：
//
// 简单的container，将redux中的activeBook state  与 react component连接在一起。一旦点击事件，促发action createor 。action 提交给每一个reduxer，自定义ActiveBook redudxer带来state改变,state改变带来container改变。


class WeatherList extends Component{

  render(){
    return(
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>pressure</th>
            <th>Humidity</th>
          </tr>

        </thead>

        <tbody>
        </tbody>

      </table>
    );
  }
}

function mapStateToProps(state){
  return {
    weather:state.weather
  };
}

export default connect(mapStateToProps)(WeatherList);
```
![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part14-weatherList/images/table.png)





### 搜索，遍历城市
搜索城市，触发action，promise由于middleware变为对象，在redux中，添加到 redux state weather当中。在container中获取到redux的state，并且显示出来
src/containers/WeatherList.js:
```js
import React,{Component} from 'react';

import {connect} from 'react-redux';

// container/book-detail.js：
//
// 简单的container，将redux中的activeBook state  与 react component连接在一起。一旦点击事件，促发action createor 。action 提交给每一个reduxer，自定义ActiveBook redudxer带来state改变,state改变带来container改变。


class WeatherList extends Component{
//拿到每个城市的数据
renderWeather(cityData){
  return(
    <tr key={cityData.city.name}>
      <td>{cityData.city.name}</td>
    </tr>
  );
}


  render(){
    return(
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>pressure</th>
            <th>Humidity</th>
          </tr>

        </thead>

        <tbody>
          {/*遍历每一个城市，通过函数renderWeather处理每个函数的数据*/}
          {this.props.weather.map(this.renderWeather)}
        </tbody>

      </table>
    );
  }
}

function mapStateToProps(state){
  return {
    weather:state.weather
  };
}

export default connect(mapStateToProps)(WeatherList);


```




### 构建图表
https://github.com/borisyankov/react-sparklines

```
>npm install --save react-sparklines
```

src/containers/WeatherList.js:

```js
import React,{Component} from 'react';

import {connect} from 'react-redux';

import {Sparklines,SparklinesLine} from 'react-sparklines';
// container/book-detail.js：
//
// 简单的container，将redux中的activeBook state  与 react component连接在一起。一旦点击事件，促发action createor 。action 提交给每一个reduxer，自定义ActiveBook redudxer带来state改变,state改变带来container改变。
class WeatherList extends Component{

//拿到每个城市的数据
renderWeather(cityData){

  const name = cityData.city.name;

  //构建天气数组、传递到  <Sparklines>中
  const temps = cityData.list.map(weather=>weather.main.temp);

  //打印 console.log(temps);
  //构建图表
  return(
    <tr key={name}>
      <td>{name}</td>

      <td>
      {/* 图表 */}
          <Sparklines height={120} width={180} data={temps}>
            <SparklinesLine color="red"/>
          </Sparklines>

      </td>
    </tr>
  );
}


  render(){
    return(
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>pressure</th>
            <th>Humidity</th>
          </tr>

        </thead>

        <tbody>
          {/*遍历每一个城市，通过函数renderWeather处理每个函数的数据*/}
          {this.props.weather.map(this.renderWeather)}
        </tbody>

      </table>
    );
  }
}

function mapStateToProps(state){
  return {
    weather:state.weather
  };
}

export default connect(mapStateToProps)(WeatherList);
```

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part14-weatherList/images/redchat.png)
