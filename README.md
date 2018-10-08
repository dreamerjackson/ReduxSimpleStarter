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
