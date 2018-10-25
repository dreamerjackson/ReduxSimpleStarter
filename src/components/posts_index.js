import _ from 'lodash';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/index';


class PostsIndex extends Component{
//生命周期函数，render后调用
  componentDidMount(){
    this.props.fetchPosts();
  }


  renderPost(){
    return _.map(this.props.posts,post=>{
      return (
          <li className="list-group-item" key={post.id}>
              {post.title}
          </li>
      );
    });
  }


  render(){
      return(
        <div>
              <ul className="list-group">
                  {this.renderPost()}
              </ul>
        </div>
      );　
  }
}

function mapStateToProps(state){

return {posts:state.posts};

}
//ES6语法，fetchPosts是个action，绑定了redux，并且作为了props的参数
export default connect(mapStateToProps,{fetchPosts:fetchPosts})(PostsIndex);
