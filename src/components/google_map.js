import React,{Component} from 'react';


class GoogleMap extends Component{

  //生命周期函数，render后提交，注意this.refs.map引用的是<div ref="map" />
  componentDidMount(){

    new google.maps.Map(this.refs.map,{
        zoom:12,
        center:{
          lat:this.props.lat,
          lng:this.props.lon
        }
    });
  }

render(){

  return <div ref="map" />;
}

}

export default GoogleMap;
