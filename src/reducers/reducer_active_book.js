


//自定义的reducer，判断是否对action进行处理，reduxer参数中的两个参数

// 第一个参数代表state，这个状态不是全局的state，而是当前这个reducer的状态，如何理解？例如
//一个reduxer books：[{title:'javascript'},{title:'Harry Potter'}]，那么[{title:'javascript'},{title:'Harry Potter'}]就是这个reduxer的state，

//所以，直接返回该参数，代表不对state进行任何的修改。如果返回的是其他的值，代表的是更新该state。

//state=null是处理一初始化该reduxer的时候，没有点击事件，返回一个null。
//最后注意将此reduxer添加到redux中去。
export default function(state=null,action){
  switch (action.type) {
    case 'BOOK_SELECTED':
        return action.payload;
  }
    return state;
}
