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


### 绑定action
src/components/posts_index.js:
```js
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/index';


class PostsIndex extends Component{
//生命周期函数，render后调用
  componentDidMount(){
    this.props.fetchPosts();
  }
  render(){
      return(
        <div>
              Posts Index!
        </div>
      );　
  }
}
//ES6语法，fetchPosts是个action，绑定了redux，并且作为了props的参数
export default connect(null,{fetchPosts:fetchPosts})(PostsIndex);
```

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part19-postIndex/images/post.png)

### 列出post  
src/components/posts_index.js:
初始化调用  this.props.fetchPosts();这个action，此action异步获取promise数据，通过middleware传递到redux中后变为对象。redux中state更新为post数组，通过container，将redux与component连接在一起。

```js
import _ from 'lodash';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/index';


class PostsIndex extends Component{
//生命周期函数，render后调用
  componentDidMount(){
    this.props.fetchPosts();
  }


  renderPost(){
    return _.map(this.props.posts,post=>{
      return (
          <li className="list-group-item" key={post.id}>
              {post.title}
          </li>
      );
    });
  }


  render(){
      return(
        <div>
              <ul className="list-group">
                  {this.renderPost()}
              </ul>
        </div>
      );　
  }
}

function mapStateToProps(state){

return {posts:state.posts};

}
//ES6语法，fetchPosts是个action，绑定了redux，并且作为了props的参数
export default connect(mapStateToProps,{fetchPosts:fetchPosts})(PostsIndex);
```

### 新建component用于新建一个post
src/components/posts_new.js:

```js
import React,{Component} from 'react';
class PostsNew extends Component{
  render(){

    return (
        <div>
            PostsNew!
        </div>
    );
  }
}
export default PostsNew;
```
### 解除router bug
index.js:使用了Switch标签，二选一，否则的话就可能会出现两个同时匹配的情况。

```html
import {BrowserRouter,Route,Switch} from 'react-router-dom';
<BrowserRouter>
<div>
<Switch>

    <Route path="/new" component={PostsNew}/>
      <Route path="/" component={PostsIndex}/>
</Switch>
</div>
</BrowserRouter>

```


### router  跳转

```html
<Switch>
    <Route path="/posts/new" component={PostsNew}/>
      <Route path="/" component={PostsIndex}/>
</Switch>
```

使用了link标签，使用了booststrap库
src/components/posts_index.js:

```js
import _ from 'lodash';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/index';
import {Link} from 'react-router-dom';

class PostsIndex extends Component{
//生命周期函数，render后调用
  componentDidMount(){
    this.props.fetchPosts();
  }


  renderPost(){
    return _.map(this.props.posts,post=>{
      if(post.title ==null){
        return;
      }
      return (
          <li className="list-group-item" key={post.id}>
              {post.title}
          </li>
      );
    });
  }

  // booststrap css 库
  render(){
      return(
  <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/post/new">
              Add a Post
          </Link>

        </div>
        <h3>Posts</h3>

              <ul className="list-group">
                  {this.renderPost()}
              </ul>
        </div>
      );　
  }
}

function mapStateToProps(state){

return {posts:state.posts};

}
//ES6语法，fetchPosts是个action，绑定了redux，并且作为了props的参数
export default connect(mapStateToProps,{fetchPosts:fetchPosts})(PostsIndex);
```

### redux form

```
> npm install --save redux-form@6.6.3
```


reducers/index.js:
reduxForm绑定redux：
```js
import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import {reducer as formReducer} from 'redux-form';
const rootReducer = combineReducers({
  posts:PostsReducer,
  form:formReducer
});

export default rootReducer;

```




> 使用redux form

src/components/posts_new.js:
```js
import React,{Component} from 'react';
import {Field,reduxForm} from 'redux-form';
class PostsNew extends Component{


//  {...field.input} 相当于是 将onChange={field.input.onChange} onFocus={field.input.onFocus} 等都添加到其中
//传递的field参数用于交互<field>标签 与component jsx标签
//{field.label}获取label属性
renderTitleField(field){
    return(
        <div className="form-group">
        <label>{field.label}</label>
          <input
            className="form-control"
            title="text"
            {...field.input}
          />

        </div>
    );
}

  render(){
    //component明确了要展示怎样的内容。
    return (
        <form>
            <Field
              label="title"
              name="title"
              component={this.renderTitleField}
            />
            <Field
            label="categories"
              name="categories"
              component={this.renderTitleField}
            />
            <Field
              label="content"
              name="content"
              component={this.renderTitleField}
            />
        </form>
    );
  }
}

//保证'PostNewForm'特殊，类似于
export default reduxForm({
  form:'PostNewForm'
})(PostsNew);


```

访问：http://localhost:8080/posts/new

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part21-reduxForm/images/reduxform.png)


### valid redux form
提交表单后自动进行验证。进行某种自定义处理。
  <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
src/components/posts_new.js:

```js
import React,{Component} from 'react';
import {Field,reduxForm} from 'redux-form';
class PostsNew extends Component{
//  {...field.input} 相当于是 将onChange={field.input.onChange} onFocus={field.input.onFocus} 等都添加到其中
//传递的field参数用于交互<field>标签 与component jsx标签
//{field.label}获取label属性
renderTitleField(field){
    return(
        <div className="form-group">
        <label>{field.label}</label>
          <input
            className="form-control"
            title="text"
            {...field.input}
          />
          {field.meta.error}
        </div>
    );
}

onSubmit(values){
  console.log(values);
}
  render(){
        //handleSubmit这个函数是redux-form自带的
    const {handleSubmit} = this.props;
    //component明确了要展示怎样的内容。
    //当验证ok，就会回调this.onSubmit自定义函数，执行某些功能。
    return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="title"
              name="title"
              component={this.renderTitleField}
            />
            <Field
            label="categories"
              name="categories"
              component={this.renderTitleField}
            />
            <Field
              label="content"
              name="content"
              component={this.renderTitleField}
            />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
  }
}

function validate(values){
//console.log(values) -> {title:"asdf",}
const errors = {};
//errors.title,errors.categories,  errors.content 必须和  <Field>当中的name属性一致。
if(!values.title){
  errors.title = "Enter a title";
}

if(!values.categories){
  errors.categories = "Enter some categories";
}
if(!values.content){
  errors.content = "Enter some content please";
}
// 如果errors不为空的话，说明输入无效。
return errors;
}

//保证'PostNewForm'特殊，类似于
//validate，进行验证。
export default reduxForm({
  validate:validate,
  form:'PostNewForm'
})(PostsNew);

```
![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part22-validReduxForm/images/submit.png)

### redux form state
在之前，我们什么都没做也会显示错误信息，但是我们希望当用户输入并离开输入框后再显示错误信息。
redux form 有三种状态
pristine  /第一次展现的时候，没有任何的输入
touched   //聚焦输入框后，又失去焦点后的状态
invalid  //如果输入错误最后会是这个状态


只有在touched状态下，才判断是否显示错误信息。
src/components/posts_new.js:
```
  {field.meta.touched?field.meta.error:''}
```



### 更好看的redux form 添加css
当错误时候，会显示红色方框和红色文字

src/components/posts_new.js:

```js
import React,{Component} from 'react';
import {Field,reduxForm} from 'redux-form';
class PostsNew extends Component{


//  {...field.input} 相当于是 将onChange={field.input.onChange} onFocus={field.input.onFocus} 等都添加到其中
//传递的field参数用于交互<field>标签 与component jsx标签
//{field.label}获取label属性
renderTitleField(field){
  // 只有当是touched状态并且为错误的时候，才会有'has-danger'这个booststrap css
  const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;
    return(
        <div className={className}>
        <label>{field.label}</label>
          <input
            className="form-control"
            title="text"
            {...field.input}
          />
            <div className="text-help">
              {field.meta.touched?field.meta.error:''}
            </div>
        </div>
    );
}

onSubmit(values){
  console.log(values);
}




  render(){
        //handleSubmit这个函数是redux-form自带的
    const {handleSubmit} = this.props;


    //component明确了要展示怎样的内容。
    //当验证ok，就会回调this.onSubmit自定义函数，执行某些功能。
    return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="title"
              name="title"
              component={this.renderTitleField}
            />
            <Field
            label="categories"
              name="categories"
              component={this.renderTitleField}
            />
            <Field
              label="content"
              name="content"
              component={this.renderTitleField}
            />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
  }
}



function validate(values){
//console.log(values) -> {title:"asdf",}
const errors = {};
//errors.title,errors.categories,  errors.content 必须和  <Field>当中的name属性一致。
if(!values.title){
  errors.title = "Enter a title";
}

if(!values.categories){
  errors.categories = "Enter some categories";
}
if(!values.content){
  errors.content = "Enter some content please";
}
// 如果errors不为空的话，说明输入无效。
return errors;
}


//保证'PostNewForm'特殊，类似于
export default reduxForm({
  validate:validate,
  form:'PostNewForm'
})(PostsNew);
```


### src/components/posts_new.js:添加跳转按钮到首页

<Link to="/" className="btn btn-danger">Cancel</Link>

link本质就是一个a标签。添加css：

style/style.css:
```css
form a {
  margin-left: 5px;
}

```

### 提交表单
前面提到过，redux-form提交表单后，传递的values对象。  通过<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>的onSubmit函数进行处理
> 新建一个action，进行处理：

actions/index.js:

```js
export function createPost(values){
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`,values);

  return{
      type:CREATE_POST,
      payload:request
  };
}
```
 > 绑定action：将redux-from的绑定与connect的绑定结合在了一起：
```
export default reduxForm({
  validate:validate,
  form:'PostNewForm'
})(
  connect(null,{createPost})(PostsNew)
);
```

>  处理提交事件

```

onSubmit(values){
  //console.log(values);
  this.props.createPost(values);
}

```

src/components/posts_new.js:
```js

import React,{Component} from 'react';
import {Field,reduxForm} from 'redux-form';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component{
//  {...field.input} 相当于是 将onChange={field.input.onChange} onFocus={field.input.onFocus} 等都添加到其中
//传递的field参数用于交互<field>标签 与component jsx标签
//{field.label}获取label属性
renderTitleField(field){

  const {meta:{touched,error}} = field;
  // 只有当是touched状态并且为错误的时候，才会有'has-danger'这个booststrap css
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return(
        <div className={className}>
        <label>{field.label}</label>
          <input
            className="form-control"
            title="text"
            {...field.input}
          />
            <div className="text-help">
              {touched?error:''}
            </div>
        </div>
    );
}

onSubmit(values){
  //console.log(values);
  this.props.createPost(values);
}




  render(){
        //handleSubmit这个函数是redux-form自带的
    const {handleSubmit} = this.props;


    //component明确了要展示怎样的内容。
    //当验证ok，就会回调this.onSubmit自定义函数，执行某些功能。
    return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="title"
              name="title"
              component={this.renderTitleField}
            />
            <Field
            label="categories"
              name="categories"
              component={this.renderTitleField}
            />
            <Field
              label="content"
              name="content"
              component={this.renderTitleField}
            />
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
    );
  }
}



function validate(values){
//console.log(values) -> {title:"asdf",}
const errors = {};
//errors.title,errors.categories,  errors.content 必须和  <Field>当中的name属性一致。
if(!values.title){
  errors.title = "Enter a title";
}

if(!values.categories){
  errors.categories = "Enter some categories";
}
if(!values.content){
  errors.content = "Enter some content please";
}
// 如果errors不为空的话，说明输入无效。
return errors;
}


//保证'PostNewForm'特殊，类似于
export default reduxForm({
  validate:validate,
  form:'PostNewForm'
})(
  connect(null,{createPost})(PostsNew)
);
```

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part24-submitToPost/images/submitToPost.gif)


### posts/new 提交表单后，等到post完成 自动提交到 /，这就需要callback回调。
src/components/posts_new.js:

```js
//第二个参数传递了一个函数。
onSubmit(values){
  //console.log(values);-->{title:"123",categories:"123",content:"123"}
  this.props.createPost(values,()=>{
    this.props.history.push('/');
  });
}

```

actions/index.js:

```js

//callback回调，then函数同步处理
export function createPost(values,callback){
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`,values).then(()=>callback());

  return{
      type:CREATE_POST,
      payload:request
  };
}

```


### 那就是显示博客详细的信息。

components/posts_show.js:

```js
import React,{Component} from 'react';
class PostShow extends Component{

  render(){
      return(
          <div>
              Post Show!
          </div>

      );
  };
}

export default PostShow;
```

index.js:

注意这个Route的顺序是很有讲究的。/posts/:id代表的是url会匹配后面任何的东西，如/posts/1，/posts/123....。如果顺序错了，例如
<Route path="/posts/:id" component={PostShow}/>
<Route path="/posts/new" component={PostsNew}/>
那么/posts/new会匹配第一个，不会匹配第二个。


```js
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    <div>
    <Switch>
        <Route path="/posts/new" component={PostsNew}/>
        <Route path="/posts/:id" component={PostShow}/>
        <Route path="/" component={PostsIndex}/>
    </Switch>
    </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
```

### 访问某个博客文章的细节页面，获取单个post。
action:

src/actions/index.js:
```js
export function fetchPost(id){
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return{
      type:FETCH_POST,
      payload:request
  };
}
```
redux 处理：添加单个post对象到state中

reducers/reducer_posts.js:

```js
import _ from 'lodash';

import {FETCH_POSTS,FETCH_POST} from '../actions';
//mapKey函数构建了一个map映射，  id:对象
export default function(state={},action){
switch(action.type){

  case FETCH_POST:
  //等价于：
  // const post = action.payload.data;
  //将state副本给了newState
  // const newState = {...state};
  // newState[post.id]=post;
  // return newState;
  //如果直接的访问posts/id，则只会get这个id下的内容，并添加到 redux state当中。
    return {...state,[action.payload.data.id]:action.payload.data};
  case FETCH_POSTS:
    return _.mapKeys(action.payload.data,'id');
  default:
    return state;
  }
}
```
绑定 action redux component：

```js
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost} from '../actions';

class PostShow extends Component{
  //posts[this.props.match.params.id];
  //the post we want to show. this.props.match.params.id是我们获取的url中的id，他是我们react-router自动为我们添加到props中的。
  //  <Route path="/posts/:id" component={PostShow}/> 例如访问posts/123的时候，那么this.props.match.params.id就是123。
componentDidMount(){
  const {id} = this.props.match.params;
  this.props.fetchPost(id);
}
  render(){

      return(
          <div>
              Post Show!
          </div>

      );
  };
}

// 传统的方式：返回的是一个数组对象到props中，有时候我们只是希望返回props我们需要的那个特定的post。

// function mapStateToProps({posts}){
//
// return {posts};
//
// }


//ownProps等价于this.props 在这里比较特俗的用法
function mapStateToProps({posts},ownProps){
return {post:posts[ownProps.match.params.id]};
}
export default connect(mapStateToProps,{fetchPost})(PostShow);
```





###  显示细节 错误处理


```js

import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost} from '../actions';

class PostShow extends Component{
  //posts[this.props.match.params.id];
  //the post we want to show. this.props.match.params.id是我们获取的url中的id，他是我们react-router自动为我们添加到props中的。
  //  <Route path="/posts/:id" component={PostShow}/> 例如访问posts/123的时候，那么this.props.match.params.id就是123。
componentDidMount(){
  const {id} = this.props.match.params;
  this.props.fetchPost(id);
}
  render(){

      const {post} = this.props;

      if(!post){
        return <div>Loading.....</div>
      }
      return(
          <div>
              <h3>{post.title}</h3>
              <h6>Categories:{post.categories}</h6>
              <p>{post.content}</p>
          </div>
      );
  };
}

// 传统的方式：返回的是一个数组对象到props中，有时候我们只是希望返回我们需要的那个特定的post。

// function mapStateToProps({posts}){
//
// return {posts};
//
// }

function mapStateToProps({posts},ownProps){

return {post:posts[ownProps.match.params.id]};

}
export default connect(mapStateToProps,{fetchPost})(PostShow);


```

### 细节页面添加返回首页的按钮
components/posts_show.js:
细节页面按钮，可以退出：
<Link className="btn btn-primary" to="/">Back To Index!</Link>

components/posts_index.js:
在首页点击某个标题后会显示细节页面
```
renderPost(){
  return _.map(this.props.posts,post=>{
    if(post.title ==null){
      return;
    }
    return (
        <li className="list-group-item" key={post.id}>
          ` <Link to={`/posts/${post.id}`}> `
            {post.title}
            </Link>
        </li>
    );
  });
}

```
![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part27-postDetailShow/images/postDetail.gif)

### delete posts
components/posts_show.js:
按钮
点击事件调用action
```js
onDeleteClick(){
  const {id} = this.props.match.params;
  this.props.deletePost(id,()=>{
      this.props.history.push('/');
  });

}
<button
  className="btn btn-danger pull-xs-right"
  onClick={this.onDeleteClick.bind(this)}
>
DELETE POST
</button>
```

action
actions/index.js:

```js
export function deletePost(id,callback){
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then(()=>callback());
  return{
      type:DELETE_POST,
      payload:id
  };
}
```

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part27-postDetailShow/images/delete.gif)
