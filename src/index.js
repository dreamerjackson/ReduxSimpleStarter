//导入react模块


import React,{Component} from 'react';
import _ from 'lodash';
//导入react-dom，目的是将component提交到页面上
import ReactDom from 'react-dom';
//导入自己的文件必须要有相对路径，这区别于npm install安装的包，直接就可以在node_modules当中查找
import SearchBar from './component/search_bar';
import VideoList from './component/video_list';
import VideoDetail from './component/video_detail';
//导入查询youtube的包
import YTSearch from 'youtube-api-search';
//youtube-key
const API_KEY = 'AIzaSyAHfD6VFhwFM6MWJdpatWAmT5ijRonmc2k';



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
// const App = ()=>{
//   return(
//     <div>
//     <SearchBar />
//     </div>
//   );
// }


//替换为class component
class App extends Component{
//selectVideo是我要保存的选中的视频的信息对象
constructor(props){
  super(props);
  this.state = { videos : [],selectVideo:null};
    this.videoSearch('surfboards');

}

//封装youtube查询方法
videoSearch(term){
  //查询youtube数据，传递API_KEY，以及搜索的关键词。同时，后面有一个回调函数来处理查询到的值。
  YTSearch({key:API_KEY,term:term},(data)=>{ //注意这个地方必须为匿名函数，不然this就会标示不了
    this.setState({videos:data,selectVideo:data[0]});   //注意，如果data修改为videos，由于同名，es6中，可以直接写为：this.setState({videos});

  });
}

//videos={this.state.videos} 参数的传递，将查到的YouTube信息传递给VideoList component，
//    <VideoDetail video={this.state.videos[0]}/>由于一开始的时候，网络还没有接收到videos，那么获取videos[0]就会报错，所以必须要处理错误在VideoDetail中
  render(){
      {/* 延迟300毫秒才会调用一次该函数 */}
    const videoSearch = _.debounce((term) => {this.videoSearch(term)},300);

    return(
      <div>
        {/* 修改 <SearchBar onSearchTermChange = {term => this.videoSearch(term)}/> 为 */}
      <SearchBar onSearchTermChange = {videoSearch}/>
      {/* 修改 <VideoDetail video={this.state.videos[0]}/>  为 */}
      <VideoDetail video={this.state.selectVideo}/>
      <VideoList videos={this.state.videos}  onVideoSelect={selectedVideo =>{this.setState({selectVideo:selectedVideo})}}  />
      </div>
    );
  }
}




//Take this component's generateed HTML and put it on the page(in the DOM)
//当我们创建一个component的时候，我们仅仅是创建了一个class，一个type，但是我们需要在ReactDom.render中传递instance
//<App /> 创建一个instance，本质上是创建了一个React.createElement(App, null);但是我不用理会
//document.querySelector('.container')，找到class为container的标签，将isntance插入其中。
ReactDom.render(<App />, document.querySelector('.container'));
