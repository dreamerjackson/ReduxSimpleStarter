<!-- # ReduxSimpleStarter

Interested in learning [Redux](https://www.udemy.com/react-redux/)?

### Getting Started

There are two methods for getting started with this repo.

#### Familiar with Git?
Checkout this repo, install dependencies, then start the gulp process with the following:

```
> git clone https://github.com/StephenGrider/ReduxSimpleStarter.git
> cd ReduxSimpleStarter
> npm install
> npm start
```

#### Not Familiar with Git?
Click [here](https://github.com/StephenGrider/ReactStarter/releases) then download the .zip file.  Extract the contents of the zip file, then open your terminal, change to the project directory, and:

```
> npm install
> npm start
``` -->

# React学习笔记

<!--
```
> git clone https://github.com/dreamerjackson/ReduxSimpleStarter
> cd ReduxSimpleStarter
> npm install
> npm start
```

删除src文件，新建一个src文件，新建index.js

//const 和var相同，声明一个变量，但是不能更改，例如，不能够再写上App = 5；
```
const App = function(){
  return <div>Hi!</div>;
}
```
上面的jsx语法实际上是简化代码的书写，webpack+babel将jsx代码转换为浏览器能够识别的普通js代码。
本质上通过[babel](https://babeljs.io/repl)可以看到jsx代码转换后的js代码 -->

<!-- ### react本身就是由各种component组成的，所以做一个项目的第一步就是将不同的部分分割为不同的component

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part2-react-component/image/component.png)

### 新建src/component文件夹，新建search_bar.js、video_detail.js、video_list_item.js、video_list.js

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part2-react-component/image/component-structure.png)

### 注册google-cloud-youtube-key

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part2-react-component/image/google-cloud.png)

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part2-react-component/image/youtube-key.png)

### src/index.js中，加入youtube-key const key = 'XXX';,并且安装package，可以通过key搜索youtube

```
//save代表本地安装，相对于-g全局安装。
>npm install --save youtube-api-search
```

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part2-react-component/image/youtube-package.png)


## 介绍component展现在页面中的逻辑
1、search_bar.js中写入了component，并导出
```
//必须要导入React，记住即便是最简单的jsx语法  return <input />;，也是调用了React.createElement
import React from 'react';

const SearchBar = ()=>{

  return <input />;
};

//文件之间是相互独立的，我们必须要使用导出功能，这样其他文件才能够导入我们的模块。
export default SearchBar;

```

2、src/index.js,中，导入SearchBar的component，并整合提交到页面中。
```
//导入自己的文件必须要有相对路径，这区别于npm install安装的包，直接就可以在node_modules当中查找
import SearchBar from './component/search_bar'

const App = ()=>{
  return(
    <div>
    <SearchBar />
    </div>
  );
}
```

 此步骤完成，在页面中显示一个input框。 -->



<!-- ###   1、替换function Component为 class Component
src/search_bar.js:

```js
//替换function component为更强大的class component，function component要更加的简单一些，但是class component里面不仅有state，可以与其他的component进行交互<br>
//class SearchBar 声明一个类，extends Component继承了React.Component，从而可以使用它的众多功能
import React,{Component} from 'react';

//function component
 const SearchBar = ()=>{

   return <input />;
 };
```
 替换为：
```js
//{Component}等价于导入了React.Component
import React,{Component} from 'react';

class SearchBar extends Component{
  //必须要有render代表提交内部的jsx语句。
  render(){
    return <input />;
  }
}
```
###   2、事件处理

  事件监听  ->  事件处理
  ```js
  class SearchBar extends Component{
    //必须要有render代表提交内部的jsx语句。
    render(){
      //onChange为input的属性，代表监听一个事件，即当input框的文字改变后会促发onInputChange方法
      return <input onChange = {this.onInputChange} />;
    }

  //onInputChange是当事件触发后调用的自定义方法，event是一个事件参数，名字可以随意，它是传递过来的事件的对象
    onInputChange(event){
      //事件触发后打印出文字
      console.log(event.target.value);
    }

  }
  ```
![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part3-classComponent/image/log-event.png)

###   3、事件处理更先进写法：匿名函数

```js
class SearchBar extends Component{
  //必须要有render代表提交内部的jsx语句。
  render(){
    //onChange为input的属性，代表监听一个事件，即当input框的文字改变后会促发匿名函数
    return <input onChange = {event => console.log(event.target.value)} />;
  }
}
```
-->

<!-- ###   1、state
state是一个普通的js对象，只存在于任何的class component中 State状态的改变会带来component以及子component的重新render<br>
state其实是一个对象，初始化一个state中变量term，并赋值为空。可以用来记录搜索框中文字的改变。<br>

所以下面的代码的逻辑是：<br>
1 初始化了this.state ={term :''};<br>
2 当input改变时，匿名事件处理，改变了state中term的状态，而state的状态的变化会重新提交render，并显示出term的值input of value:{this.state.term}<br>

```js
class SearchBar extends Component{


  constructor(props){
    //调用父类的构造函数。也就是React.Component的构造函数
      super(props);
//只有在构造函数中，我们才能够用下面的方式来初始化state
      this.state ={term :''};

  }

  //必须要有render代表提交内部的jsx语句。
  render(){
    //onChange为input的属性，代表监听一个事件，即当input框的文字改变后会促发匿名函数
    //this.setState改变state的状态
    return (
      <div>
          <input onChange = {event => this.setState({term:event.target.value})} />;
          //打印出this.state.term的值
          input of value:{this.state.term}
      </div>
    );

  }
}

```
![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part4-state/image/inputofvalue.png)


###   2、深入state

注意这中间的逻辑

```js

class SearchBar extends Component{
  constructor(props){
      super(props);
      this.state ={term :''};

  }


  render(){
    return (
      <div>
          <input
          //2.状态term的改变后，重新提交render，就会在input框显示出最新的this.state.term
          value = {this.state.term}
          //1.事件改变带来state变量的改变。
          onChange = {event => this.setState({term:event.target.value})}
           />
      </div>
    );

  }
}

```


###   3、查询youtube并打印出查到的数据



```js

//导入查询youtube的包
import YTSearch from 'youtube-api-search';
//youtube-key
const API_KEY = 'AIzaSyAHfD6VFhwFM6MWJdpatWAmT5ijRonmc2k';

//查询youtube数据，传递API_KEY，以及搜索的关键词。同时，后面有一个回调函数来处理查询到的值。
YTSearch({key:API_KEY,term:'surfboards'},function(data){
  console.log(data);
});

```

![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part4-state/image/youtube-data.png) -->

<!-- ###   1、主component替换为class component
```js

src/index.js
//替换为class component
class App extends Component{

constructor(props){
  super(props);
  this.state = { videos : [] };

  //查询youtube数据，传递API_KEY，以及搜索的关键词。同时，后面有一个回调函数来处理查询到的值。
  YTSearch({key:API_KEY,term:'surfboards'},(data)=>{ //注意这个地方必须为匿名函数，不然this就会标示不了
    this.setState({videos:data});   //注意，如果data修改为videos，由于同名，es6中，可以直接写为：this.setState({videos});
  });
}


  render(){
    return(
      <div>
      <SearchBar />
      </div>
    );
  }
}
```

### 2、主component与子component信息的传递
src/component/video_list.js:

```js
import React from 'react';
//如何实现component之间相互传递信息，在这里有一个参数peops
const VideoList = (props) =>{

//className是一个列名，和传统html中的class相同。这里使用了bootstrap库中的类名。
//注意VideoList是一个function component，如果其是一个class，那么可以使用this.props的方式得到参数
  return(
      <ul className="col-md-4 list-group">
         {props.videos.length}
      </ul>
  );
};
//导出
export default VideoList;
```


src/index.js:

```js
import VideoList from './component/video_list'；

render(){
  return(
    <div>
    <SearchBar />
    <VideoList videos={this.state.videos} /> //参数的传递，将查到的YouTube信息传递给VideoList component，
    </div>
  );
}
}
``` -->
<!-- ## 得到youtube中5个视频信息后，使用map遍历处理每个视频信息

### 1、 在js中的map
![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part6-map/image/map.png)

### 2、 react中使用map遍历信息，并返回component数组
src/component/video_list.js
```js
import VideoListItem from './video_list_item';
//如何实现component之间相互传递信息，在这里有一个参数peops
const VideoList = (props) =>{


//props.videos为所有的视频信息，使用map遍历每一个视频信息，并传递到VideoListItem这个component中单独的处理。返回的videoItems变量其实是一个component的数组
const videoItems = props.videos.map((video)=>{
  return <VideoListItem video = {video} />
});


//className是一个列名，和传统html中的class相同。这里使用了bootstrap库中的类名。
//注意VideoList是一个function component，如果其是一个class，那么可以使用this.props的方式得到参数

// {videoItems}是一个component的数组，react能够识别到并提交。
  return(
      <ul className="col-md-4 list-group">
         {videoItems}
      </ul>
  );
};

```




### 3、 使用了booststrap库。实现视频的框架
src/component/video_list_item.js

```js
const VideoListItem = ({video}) =>{
//获取youtube信息中的图片url
  const imageUrl = video.snippet.thumbnails.default.url;


  //下面深度使用了booststrap库。实现视频的框架，{video.snippet.title}获取视频的标题
  return (
    <li className = "list-group-item">
      <div className ="video-list media">
          <div className="media-left">
          <img className="media-object" src={imageUrl} />
          </div>
          <div className="media-body">
            <div className="media-heading">{video.snippet.title}</div>
          </div>
      </div>
    </li>
  );
};


```
![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part6-map/image/video-booststrap.png)




### 4、  添加视频框，细节表述
src/component/video_detail.js：
```js
import React from 'react';

const VideoDetail =({video})=>{
  const videoId = video.id.videoId;  //获取id
  const url = `https://www.youtube.com/embed/${videoId}`;//等价于“https://www.youtube.com/embed/” + videoId

  return (
      <div className="video-detail col-md-8">
        <div className="embed-responsive embed-responsive-16by9">
          <iframe  src={url} className="embed-responsive-item">
        </div>

        <div className ="details">
          <div>{video.snippet.title}</div>
          <div>{video.snippet.description}</div>
        </div>
      </div>

  );



};


export default VideoDetail;
```

### 5、  videodetail添加到src/index.js  处理null错误

src/index.js:
```js
import VideoDetail from './component/video_detail';
render(){
  return(
    <div>
    <SearchBar />
    /*修改 <VideoDetail video={this.state.videos[0]}/>  为   */
    <VideoDetail video={this.state.selectCideos[0]}/>
    <VideoList videos={this.state.videos} />
    </div>
  );
}
}
```

src/component/video_detail.js：
```js
//处理错误，因为刚开始等待youtube网络异步请求需要时间，这时候没有视频
  if(!video){
    return <div>正在处理中......</div>;
  }

  ```
![image](https://github.com/dreamerjackson/ReduxSimpleStarter/blob/part6-map/image/video-iframe.png) -->

### 1、主component中，添加state：selectVideo是我要保存的选中的视频的信息对象

每一次selectVideo中信息的改变，state变化会重新提交，带来videoDetail中信息的改变。问题在于，当处理点击事件时候，如何修改selectVideo的状态？

src/index.js
```js
//替换为class component
class App extends Component{
//selectVideo是我要保存的选中的视频的信息对象
constructor(props){
  super(props);
  this.state = { videos : [],selectVideo:null};

  //查询youtube数据，传递API_KEY，以及搜索的关键词。同时，后面有一个回调函数来处理查询到的值。
  YTSearch({key:API_KEY,term:'surfboards'},(data)=>{ //注意这个地方必须为匿名函数，不然this就会标示不了
    this.setState({videos:data,selectVideo:data[0]});   //注意，如果data修改为videos，由于同名，es6中，可以直接写为：this.setState({videos});

  });
}

//videos={this.state.videos} 参数的传递，将查到的YouTube信息传递给VideoList component，
//    <VideoDetail video={this.state.videos[0]}/>由于一开始的时候，网络还没有接收到videos，那么获取videos[0]就会报错，所以必须要处理错误在VideoDetail中
  render(){
    return(
      <div>
      <SearchBar />
      {/* 修改 <VideoDetail video={this.state.videos[0]}/>  为 */}
      <VideoDetail video={this.state.selectVideo}/>
      <VideoList videos={this.state.videos} />
      </div>
    );
  }
}

```

### 2、callback处理点击事件

src/index.js:

```js
render(){
  return(
    <div>
    <SearchBar />

    <VideoDetail video={this.state.selectVideo}/>

      {/*  传递的onVideoSelect是一个回调函数，传递给 VideoList*/}
    <VideoList videos={this.state.videos}  onVideoSelect={selectedVideo =>{this.setState({selectVideo:selectedVideo})}}  />
    </div>
  );
}
}

```
=======================================<br>


src/component/video_list.js：

```js
const VideoList = (props) =>{

const videoItems = props.videos.map((video)=>{
  //onVideoSelect 回调函数，传递给videoItems
  return <VideoListItem onVideoSelect={props.onVideoSelect} key={video.etag} video = {video} />
});
  return(
      <ul className="col-md-4 list-group">
         {videoItems}
      </ul>
  );
};

```

=======================================<br>



src/component/video_list_item.js：
```js
import React from 'react';

const VideoListItem = ({video,onVideoSelect}) =>{
  const imageUrl = video.snippet.thumbnails.default.url;

  return (

      {/*  当触发视频的点击事件之后，就会调用onVideoSelect回调函数，参数为当前视频的video对象，实现了修改主component中state状态selectVideo的功能，而state状态selectVideo的功能的变化，就会带来从新提交reander，将新的state状态selectVideo的功能传递给videoDetail component，实现了点击就切换视频的功能*/}
    <li  onClick={()=>onVideoSelect(video)} className = "list-group-item">
      <div className ="video-list media">
          <div className="media-left">
          <img className="media-object" src={imageUrl} />
          </div>
          <div className="media-body">
            <div className="media-heading">{video.snippet.title}</div>
          </div>
      </div>
    </li>
  );
};

```
