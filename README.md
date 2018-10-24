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

### 使用router demo

index.js:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

//导入router
import {BrowserRouter,Route} from 'react-router-dom';
import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);


class Hello extends React.Component{
  render(){return <div>Hello!</div>}
}

class goodbye extends React.Component{
  render(){return <div>goodbye!</div>}
}

  //<BrowserRouter>下包含了<Route>,不同的url会显示出不同的react component

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    <div>
        header!
        <Route path="/hello" component={Hello}/>
        <Route path="/goodbye" component={goodbye}/>
    </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));

```
![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part18-routerDemo/images/route.png)

### action Middleware

```
> npm install --save axios redux-promise
```


index.js:
```js
Middleware:将action中的promise转换到redux中为对象。
import promise from 'redux-promise';
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
```


actions/index.js:
```js
import axios from 'axios';
export const FETCH_POSTS = 'fetch_posts';
const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=PAPERCLIP1234';
export function fetchPosts(){
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  return {
    type:FETCH_POSTS,
    payload:request
  };
}
```

### reducers
reducers/index.js:
```js
import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  posts:PostsReducer
});

export default rootReducer;
```



reducers/reducer_posts.js:
```js
//mapKey函数构建了一个map映射，  id:对象
import _ from 'lodash';

import {FETCH_POSTS} from '../actions';

export default function(state={},action){
switch(action.type){
  case FETCH_POSTS:
    return _.mapKeys(action.payload.data,'id');
  default:
    return state;
  }
}
```

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part18-routerDemo/images/mapkey.png)
