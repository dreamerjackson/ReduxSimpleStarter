# Redux 学习笔记

Interested in learning [Redux](https://www.udemy.com/react-redux/)?

### Getting Started

There are two methods for getting started with this repo.
```
> git clone https://github.com/StephenGrider/ReduxSimpleStarter.git
> cd ReduxSimpleStarter
> npm install
> npm start
```

### redux本质是一个application state，其在应用程序级别维持所有的数据。

例如在维持book的案例中：
books：是key，[{title:'javascript'},{title:'Harry Potter'}]是value，reducer产生的。
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
