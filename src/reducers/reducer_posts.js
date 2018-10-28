import _ from 'lodash';

import {FETCH_POSTS,FETCH_POST,DELETE_POST} from '../actions';
//mapKey函数构建了一个map映射，  id:对象
export default function(state={},action){
switch(action.type){
  //删除 ，参考_.reject函数。
  case DELETE_POST:
    return _.omit(state,action.payload);

  case FETCH_POST:
  //等价于：
  // const post = action.payload.data;
  //将state副本给了newState
  // const newState = {...state};
  // newState[post.id]=post;
  // return newState;
  //如果直接的访问posts/id，则只会get这个id下的内容，并添加到 redux state当中。
    return {...state,[action.payload.data.id]:action.payload.data};
  case FETCH_POSTS:
    return _.mapKeys(action.payload.data,'id');
  default:
    return state;
  }
}
