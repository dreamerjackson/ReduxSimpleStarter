import React,{Component} from 'react';

//导入react-redux的连接函数，这是为了将react与redux 的状态连接在一起。
import {connect} from 'react-redux';

import {selectBook} from '../actions/index';
import {bindActionCreators} from 'redux';

class BookList extends Component{

//map遍历返回书的列表
  renderList(){
      return this.props.books.map((book)=>{

            return (
                <li
                onClick={()=>this.props.selectBook(book)}
                key={book.title}
                className="list-group-item">{book.title}</li>
            );

      });
  }

  render(){
      return (
          <ul className="list-group col-sm-4">
            {this.renderList()}
          </ul>
      )
  }
}

//mapStateToProps传递的参数state就是redux中的state ， 其return的值会作为react component中的props。
function mapStateToProps(state){
  return {
    books:state.books
  };
}

//mapDispatchToProps传递的参数state就是redux中的state ， 其return的值会作为react component中的props。
function mapDispatchToProps(dispatch){
  //bindActionCreators将此action 与 redux 绑定在一起，并且selectBook会传递给container中的props。
  return bindActionCreators({selectBook:selectBook},dispatch);
}


//使用connect函数，将react与redux连接在一起，逻辑是，redux中的state传递到mapStateToProps的参数中，而mapStateToProps的返回值作为BookList component中的props属性，可以被使用。
export default connect(mapStateToProps,mapDispatchToProps)(BookList);
