import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/index';


class PostsIndex extends Component{
//生命周期函数，render后调用
  componentDidMount(){
    this.props.fetchPosts();
  }
  render(){
      return(
        <div>
              Posts Index!
        </div>
      );　
  }
}
//ES6语法，fetchPosts是个action，绑定了redux，并且作为了props的参数
export default connect(null,{fetchPosts:fetchPosts})(PostsIndex);
