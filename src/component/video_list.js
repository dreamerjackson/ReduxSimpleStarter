import React from 'react';
import VideoListItem from './video_list_item';
//如何实现component之间相互传递信息，在这里有一个参数peops
const VideoList = (props) =>{


//props.videos为所有的视频信息，使用map遍历每一个视频信息，并传递到VideoListItem这个component中单独的处理。返回的videoItems变量其实是一个component的数组
//video.etag是youtube信息中的属性，唯一标示了不同的视频。用作key键是为了区分不同的component，从而能够去调用
const videoItems = props.videos.map((video)=>{
  return <VideoListItem  key={video.etag} video = {video} />
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
//导出
export default VideoList;
