import _ from 'lodash';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/index';
import {Link} from 'react-router-dom';

class PostsIndex extends Component{
//生命周期函数，render后调用
  componentDidMount(){
    this.props.fetchPosts();
  }


  renderPost(){
    return _.map(this.props.posts,post=>{
      if(post.title ==null){
        return;
      }
      return (
          <li className="list-group-item" key={post.id}>
              <Link to={`/posts/${post.id}`}>
              {post.title}
              </Link>
          </li>
      );
    });
  }

  // booststrap css 库
  render(){
      return(
  <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
              Add a Post
          </Link>

        </div>
        <h3>Posts</h3>
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
