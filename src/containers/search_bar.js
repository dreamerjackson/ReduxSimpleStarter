import React,{Component} from 'react';



//导入react与redux的绑定
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchWeather}  from '../actions/index';

class SearchBar extends Component{


constructor(props){
  super(props);
  this.state = {term:''};


}

onInputChange(event){
  //console.log(event.target.value);
  this.setState({term:event.target.value});
}


onFormSubmit(event){
  //阻止默认提交，因为浏览器的默认提交会跳转到一个新的页面，但是我只希望在此页面中进行操作。
  event.preventDefault();

//触发action
this.props.fetchWeather(this.state.term);
//清空搜索框
this.setState({term:''});
}

render(){
  //bootstrap

  return (
    //onSubmit，处理提交后的时间。
    <form  onSubmit={(event)=>this.onFormSubmit(event)} className="input-group">
        <input
            placeholder="Get a five-day forecast in your favirate citeies"
              /*值和term state一样*/
            className="form-control"
              /*值和term state一样*/
            value={this.state.term}
    /*onChange={this.onInputChange} 这种方式会报错，因为在函数onInputChange中找不到this这个东西*/
  /*方法一：arrow函数。方法二：this.onInputChange = this.onInputChange.bind(this);*/
            onChange={(event)=>this.onInputChange(event)}
        />
        <span className="input-group-btn">
          <button type= "submit" className="btn btn-secondary">Submit</button>
        </span>
     </form>
  );
}
}


//将action与redux绑定，并且fetchWeather这个action 作为了props的参数。
function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchWeather},dispatch);

}

export default connect(null,mapDispatchToProps)(SearchBar)
