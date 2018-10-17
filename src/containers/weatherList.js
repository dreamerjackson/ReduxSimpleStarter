import React,{Component} from 'react';

import {connect} from 'react-redux';

import {Sparklines,SparklinesLine} from 'react-sparklines';
// container/book-detail.js：
//
// 简单的container，将redux中的activeBook state  与 react component连接在一起。一旦点击事件，促发action createor 。action 提交给每一个reduxer，自定义ActiveBook redudxer带来state改变,state改变带来container改变。


class WeatherList extends Component{



//拿到每个城市的数据
renderWeather(cityData){

  const name = cityData.city.name;

  //构建天气数组、传递到  <Sparklines>中
  const temps = cityData.list.map(weather =>weather.main.temp);

  //打印 console.log(temps);

  //构建图表
  return(
    <tr key={name}>
      <td>{name}</td>

      <td>
          <Sparklines height={120} width={180} data={temps}>
            <SparklinesLine color="red"/>
          </Sparklines>

      </td>
    </tr>
  );
}


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
          {/*遍历每一个城市，通过函数renderWeather处理每个函数的数据*/}
          {this.props.weather.map(this.renderWeather)}
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
