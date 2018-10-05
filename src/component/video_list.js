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
