import {FETCH_WEATHER} from '../actions/index';

//null修改为数组
export default function(state=[],action){

switch (action.type) {
  case FETCH_WEATHER:
    // 等价于state.concat([action.payload.data]),state是一个数组，将新的用户搜索的city存储到该数组中。
  return [action.payload.data,...state];
}
  return state;
}
