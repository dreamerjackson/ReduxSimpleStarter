//必须要导入React，记住即便是最简单的jsx语法  return <input />;，也是调用了React.createElement
//{Component}等价于导入了React.Component
import React,{Component} from 'react';

//替换function component
// const SearchBar = ()=>{
//
//   return <input />;
// };

/*


//替换function component为更强大的class component，function component要更加的简单一些，但是class component里面不仅有state，可以与其他的component进行交互
//class SearchBar 声明一个类，extends Component继承了React.Component，从而可以使用它的众多功能
class SearchBar extends Component{
  //必须要有render代表提交内部的jsx语句。
  render(){
    //onChange为input的属性，代表监听一个事件，即当input框的文字改变后会促发onInputChange方法
    return <input onChange = {this.onInputChange} />;
  }

//onInputChange是当事件触发后调用的自定义方法，event是一个事件参数，名字可以随意，它是传递过来的事件的对象
  onInputChange(event){
    console.log(event.target.value);
  }

}


*/

//上面的替换为匿名函数：
class SearchBar extends Component{
  //必须要有render代表提交内部的jsx语句。
  render(){
    //onChange为input的属性，代表监听一个事件，即当input框的文字改变后会促发匿名函数
    return <input onChange = {event => console.log(event.target.value)} />;
  }
}




//文件之间是相互独立的，我们必须要使用导出功能，这样其他文件才能够导入我们的模块。
export default SearchBar;
