# Redux 学习笔记


### 1.Getting Started

There are two methods for getting started with this repo.
```
> git clone https://github.com/StephenGrider/ReduxSimpleStarter.git
> cd ReduxSimpleStarter
> npm install
> npm start
```

### 2.redux本质是一个application state，其在应用程序级别维持所有的数据。

例如在维持book的案例中：
books：是key，[{title:'javascript'},{title:'Harry Potter'}]是value，reducer产生的，返回的一个数组。
![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part9-reduxStart/images/bookredux.png)

src/reducers/reducer_books.js:产生一个reducer
```js
//导出的这个函数就是reducer产生的value值
export function(){
  return [
    {title:'javascript'},
    {title:'Harry Potter'}  
  ]
}

```




src/reducers/index.js:绑定

```js
import { combineReducers } from 'redux';
import BookReducer from './reducer_books';
//将key值books与reducer匹配在一起，形成了一个状态。
const rootReducer = combineReducers({
  books:BookReducer;
});

export default rootReducer;
```

### 3.container
作为一个redux的项目，该项目应该分为两部分，一部分是由redux产生的数据，一部分是由react来产生view试图。

那我们就需要将react与redux绑定在一起。使用了redux的state的react的component 就叫做container。

新建一个container/book-list文件夹,实现react与redux的交互的container
```js
import React,{Component} from 'react';


export default class BookList extends Component{

  renderList(){
      return this.props.books.map((book)=>{

            return (
                <li key={book.title} className="list-group-item">{book.title}</li>
            );

      });
  }

  render(){
      return (
          <ul className="list-group col-sm-4">
            {this.renderList()}
          </ul>
      )
  }
}
```

需要注意的是，每个container需要关注的应该是redux state中的一个很小的细节，如下面的图片中，book-list container关注的是 redux state中的 book title。
而book-detail container应该关注的redux state中的 当前的active book。

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part9-reduxStart/images/container.png)


### 4.container 连接react-redux
container/book-list：
```js
import React,{Component} from 'react';

//导入react-redux的连接函数，这是为了将react与redux 的状态连接在一起。
import {connect} from 'react-redux';

class BookList extends Component{

//map遍历返回书的列表
  renderList(){
      return this.props.books.map((book)=>{

            return (
                <li key={book.title} className="list-group-item">{book.title}</li>
            );

      });
  }

  render(){
      return (
          <ul className="list-group col-sm-4">
            {this.renderList()}
          </ul>
      )
  }
}

//mapStateToProps传递的参数state就是redux中的state ， 其return的值会作为react component中的props。
function mapStateToProps(state){
  return {
    books:state.books
  };
}


//使用connect函数，将react与redux连接在一起，逻辑是，redux中的state传递到mapStateToProps的参数中，而mapStateToProps的返回值作为BookList component中的props属性，可以被使用。
export default connect(mapStateToProps)(BookList);

```
![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part9-reduxStart/images/book-list.png)

## -------------------------------------------------------------------------------------------------

### 5.action creactor
action creactor 其实就是一个函数，其返回的对象是一个action。

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part10-action/images/action.png)


当促发一本书的点击事件的时候，促发了action creator 。 action creator返回 action，  action 转发给所有的reduxer，某一个reduxer对特定的action感兴趣，就会进行处理，更新该redux的状态。
actions/index.js:书写一个action creator,其就是一个普通的函数，我希望在此小节中，实现点击图书后触发action createor
```js
export function selectBook(book){
  console.log('A book has been selection:',book.title);
}

```

container/book-list：



```js
import React,{Component} from 'react';

//导入react-redux的连接函数，这是为了将react与redux 的状态连接在一起。
import {connect} from 'react-redux';
//导入action createor
import {selectBook} from '../actions/index';

//绑定action与redux。
import {bindActionCreators} from 'redux';

class BookList extends Component{

//map遍历返回书的列表
  renderList(){
      return this.props.books.map((book)=>{

            return (
                <li
                //点击后触发action createor
                onClick={()=>this.props.selectBook(book)}
                key={book.title}
                className="list-group-item">{book.title}</li>
            );

      });
  }

  render(){
      return (
          <ul className="list-group col-sm-4">
            {this.renderList()}
          </ul>
      )
  }
}

//mapStateToProps传递的参数state就是redux中的state ， 其return的值会作为react component中的props。
function mapStateToProps(state){
  return {
    books:state.books
  };
}

//mapDispatchToProps传递的参数state就是redux中的state ， 其return的值会作为react component中的props。
function mapDispatchToProps(dispatch){
  //bindActionCreators将此action 与 redux 绑定在一起，并且selectBook会传递给container中的props。
  return bindActionCreators({selectBook:selectBook},dispatch);
}


//使用connect函数，将react与redux连接在一起，逻辑是，redux中的state传递到mapStateToProps的参数中，而mapStateToProps的返回值作为BookList component中的props属性，可以被使用。redux中的state传递到mapDispatchToProps的参数中，而mapDispatchToProps的返回值selectBook作为BookList component中的props属性，可以被使用。并且bindActionCreators方法实现了action 与 redux 绑定在一起。
export default connect(mapStateToProps,mapDispatchToProps)(BookList);
```


![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part10-action/images/click.png)


### 6.action
action creactor返回action

```js
export function selectBook(book){
  console.log('A book has been selection:',book.title);
}

```



### 7.自定义reducer

action creactor返回action，action会转发给所有的reducer，有些reduxer会对其感兴趣，那么我们就需要自定义reducer，判断要处理那些action，哪些不处理。

reducers/reducer_active_book:
```js
//自定义的reducer，判断是否对action进行处理，reduxer参数中的两个参数

// 第一个参数代表state，这个状态不是全局的state，而是当前这个reducer的状态，如何理解？例如
//一个reduxer books：[{title:'javascript'},{title:'Harry Potter'}]，那么[{title:'javascript'},{title:'Harry Potter'}]就是这个reduxer的state，

//所以，直接返回该参数，代表不对state进行任何的修改。如果返回的是其他的值，代表的是更新该state。
export default function(state=null,action){
  switch (action.type) {
    case 'BOOK_SELECTED':
        return action.payload;
  }
    return state;
}
```
添加到redux中：
reducers/index.js:

```
import { combineReducers } from 'redux';
import BookReducer from './reducer_books';
import ActiveBook from './reducer_active_book';
const rootReducer = combineReducers({
  books:BookReducer,
`  activebook:ActiveBook `
});

export default rootReducer;

```


###  8.展示激活book
container/book-detail.js：

简单的container，将redux中的activeBook state  与 react component连接在一起。一旦点击事件，促发action createor 。action 提交给每一个reduxer，自定义ActiveBook redudxer带来state改变,state改变带来container改变。

```js

import React,{Component} from 'react';

import {connect} from 'react-redux';

class BookDetail extends Component{

  render(){

    if(!this.props.book){
      return (
        <div>select a book!</div>
      );
    }
    return(
      <div>
      <h3>Details for:</h3>
      <div>{this.props.book.title}</div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    book:state.activebook
  };
}

export default connect(mapStateToProps)(BookDetail);

```



components/app.js:
```js
import React, { Component } from 'react';

import BookList from '../containers/book-list';
import BookDetail from '../containers/book-detail';
export default class App extends Component {
  render() {
    return (
      <div>
          <BookList/>
          <BookDetail/>
      </div>
    );
  }
}
```

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part10-action/images/active-book-select.png)
