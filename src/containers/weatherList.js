import React,{Component} from 'react';

import {connect} from 'react-redux';

// container/book-detail.js：
//
// 简单的container，将redux中的activeBook state  与 react component连接在一起。一旦点击事件，促发action createor 。action 提交给每一个reduxer，自定义ActiveBook redudxer带来state改变,state改变带来container改变。


class WeatherList extends Component{

  render(){
    return(
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>pressure</th>
            <th>Humidity</th>
          </tr>

        </thead>

        <tbody>
        </tbody>

      </table>
    );
  }
}

function mapStateToProps(state){
  return {
    weather:state.weather
  };
}

export default connect(mapStateToProps)(WeatherList);
