import React,{Component} from 'react';

export default class SearchBar extends Component{


constructor(props){
  super(props);
  this.state = {term:''};


}

onInputChange(event){
  console.log(event.target.value);
  this.setState({term:event.target.value});
}


onFormSubmit(event){
  //阻止默认提交，因为浏览器的默认提交会跳转到一个新的页面，但是我只希望在此页面中进行操作。
  event.preventDefault();

}

render(){
  //bootstrap

  return (
    //onSubmit，处理提交后的时间。
    <form  onSubmit={this.onFormSubmit} className="input-group">
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
