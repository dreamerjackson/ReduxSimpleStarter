import _ from 'lodash';

import {FETCH_POSTS} from '../actions';
//mapKey函数构建了一个map映射，  id:对象
export default function(state={},action){
switch(action.type){
  case FETCH_POSTS:
    return _.mapKeys(action.payload.data,'id');
  default:
    return state;
  }
}
