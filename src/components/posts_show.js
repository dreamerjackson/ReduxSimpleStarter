import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost,deletePost} from '../actions';
import {Link} from 'react-router-dom';

class PostShow extends Component{
  //posts[this.props.match.params.id];
  //the post we want to show. this.props.match.params.id是我们获取的url中的id，他是我们react-router自动为我们添加到props中的。
  //  <Route path="/posts/:id" component={PostShow}/> 例如访问posts/123的时候，那么this.props.match.params.id就是123。
componentDidMount(){
  const {id} = this.props.match.params;
  this.props.fetchPost(id);
}

onDeleteClick(){
  //通过url获取id
  const {id} = this.props.match.params;
  //调用action，传递回调函数
  this.props.deletePost(id,()=>{
      this.props.history.push('/');
  });
}
  render(){
      const {post} = this.props;
      if(!post){
        return <div>Loading.....</div>
      }
      return(
          <div>
              <Link  to="/">Back To Index!</Link>
              <button
                className="btn btn-danger pull-xs-right"
                onClick={this.onDeleteClick.bind(this)}
              >
              DELETE POST
              </button>
              <h3>{post.title}</h3>
              <h6>Categories:{post.categories}</h6>
              <p>{post.content}</p>
          </div>
      );
  };
}

// 传统的方式：返回的是一个数组对象到props中，有时候我们只是希望返回我们需要的那个特定的post。

// function mapStateToProps({posts}){
//
// return {posts};
//
// }

function mapStateToProps({posts},ownProps){

return {post:posts[ownProps.match.params.id]};

}


export default connect(mapStateToProps,{fetchPost,deletePost})(PostShow);
