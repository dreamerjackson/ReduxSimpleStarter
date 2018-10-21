import React,{Component} from 'react';

import {connect} from 'react-redux';

import Chat from '../components/chart';
import GoogleMap from '../components/google_map';
class WeatherList extends Component{



//拿到每个城市的数据
renderWeather(cityData){

  const name = cityData.city.name;
  //构建天气数组、传递到  <Sparklines>中
  const temps = cityData.list.map(weather =>weather.main.temp);
  const pressures = cityData.list.map(weather => weather.main.pressure);
  const humidities = cityData.list.map(weather => weather.main.humidity);
  const lon = cityData.city.coord.lon;
  const lat = cityData.city.coord.lat;

  //打印 console.log(temps);

  //构建图表
  return(
    <tr key={name}>
      <td><GoogleMap  lon={lon} lat={lat} /></td>

      <td><Chat data={temps} color="orange" uint="K"/></td>
        <td><Chat data={pressures} color="green" uint="pha"/></td>
          <td><Chat data={humidities} color="black" uint="%"/></td>
    </tr>
  );
}


  render(){
    return(
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (K)</th>
            <th>pressure (pha)</th>
            <th>Humidity (%)</th>
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
