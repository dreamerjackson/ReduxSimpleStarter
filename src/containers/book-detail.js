import React,{Component} from 'react';

import {connect} from 'react-redux';

// container/book-detail.js：
//
// 简单的container，将redux中的activeBook state  与 react component连接在一起。一旦点击事件，促发action createor 。action 提交给每一个reduxer，自定义ActiveBook redudxer带来state改变,state改变带来container改变。


class BookDetail extends Component{

  render(){

    if(!this.props.book){
      return (
        <div>select a book!</div>
      );
    }
    return(
      <div>
      <h3>Details for:</h3>
      <div>{this.props.book.title}</div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    book:state.activebook
  };
}

export default connect(mapStateToProps)(BookDetail);
