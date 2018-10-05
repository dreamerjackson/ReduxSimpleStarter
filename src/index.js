//导入react模块
import React from 'react';

//导入react-dom，目的是将component提交到页面上
import ReactDom from 'react-dom';
//导入自己的文件必须要有相对路径，这区别于npm install安装的包，直接就可以在node_modules当中查找
import SearchBar from './component/search_bar'

//导入查询youtube的包
import YTSearch from 'youtube-api-search';
//youtube-key
const API_KEY = 'AIzaSyAHfD6VFhwFM6MWJdpatWAmT5ijRonmc2k';

//查询youtube数据，传递API_KEY，以及搜索的关键词。同时，后面有一个回调函数来处理查询到的值。
YTSearch({key:API_KEY,term:'surfboards'},function(data){
  console.log(data);
});

//create a new component .this component should produce some html
//const 和var相同，声明一个变量，但是不能更改，例如，不能够再写上App = 5；

// const App = function(){
//   return <div>Hi!</div>;
// }
//替换为es6，匿名函数
// const App = ()=>{
//   return <div>Hi!</div>;
// }

//替换为使用导入的component
const App = ()=>{
  return(
    <div>
    <SearchBar />
    </div>
  );
}


//Take this component's generateed HTML and put it on the page(in the DOM)
//当我们创建一个component的时候，我们仅仅是创建了一个class，一个type，但是我们需要在ReactDom.render中传递instance
//<App /> 创建一个instance，本质上是创建了一个React.createElement(App, null);但是我不用理会
//document.querySelector('.container')，找到class为container的标签，将isntance插入其中。
ReactDom.render(<App />, document.querySelector('.container'));
