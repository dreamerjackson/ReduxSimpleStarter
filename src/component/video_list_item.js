/*
import React from 'react';

const VideoListItem = (props) =>{
  return <li>Video</li>
};

export default VideoListItem;
*/

//更新
import React from 'react';
//和上面对比，要想直接获取到上面props.video，可以直接({video}),等价于video = props.video
const VideoListItem = ({video,onVideoSelect}) =>{
//获取youtube信息中的图片url
  const imageUrl = video.snippet.thumbnails.default.url;


  //下面深度使用了booststrap库。俩实现视频的框架  media 与 media-body boststrap库使用：https://www.w3schools.com/bootstrap4 
  return (
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


//boststrap库使用：https://www.w3schools.com/bootstrap4

//   return (
//     <li className = "list-group-item">
//       <div className="media border p-3">
//         <img src={imageUrl} alt="John Doe" className="mr-3 mt-3 rounded-circle" style={{width:'60px'}} />
//         <div className="media-body">
//           <h4>John Doe <small><i>Posted on February 19, 2016</i></small></h4>
//           <p>Lorem ipsum...</p>
//         </div>
//       </div>
//     </li>
//   );
//

export default VideoListItem;
