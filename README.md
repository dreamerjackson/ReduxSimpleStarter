# Redux 学习笔记


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

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part11-weatherredux/images/searchbar.png)
