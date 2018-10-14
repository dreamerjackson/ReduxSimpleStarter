


//axios为轻量级的异步操作库，替代重量级的jqury
import axios from 'axios';


const API_KEY = "09ec05ac89602c9970393fe760db2bf5";
//凭借网址，使用API_KEY
const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?&appid=${API_KEY}`


//type　导出它，在redux中使用相同的常量
export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city){
//网址
  const url = `${ROOT_URL}&q=${city},us`;
//异步操作
  const request = axios.get(url);

  return {
      type:FETCH_WEATHER,
      payload:request
  };
}
