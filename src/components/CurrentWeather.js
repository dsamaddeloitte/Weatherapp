import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FaCloud} from '@fortawesome/free-solid-svg-icons';
import {format} from 'date-fns';
import humidityIcon from '../Images/humidity.png';
import CloudIcon from '../Images/cloud.png';
import WindIcon from '../Images/wind.png';

const CurrentWeather = ({ city, unit , setWeatherCondition}) => {
  const [weather, setWeather] = useState(null);
  const [currentTime,setCurrentTime]=useState(new Date());
  //const [unit, setUnit] = useState('C');

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=50dddfd3647c47e4a16133923243107&q=${city}&days=1`);
      setWeather(response.data);
      const condition = response.data.current.condition.text.toLowerCase();
      if (condition.includes('clear')) {
        setWeatherCondition('clear');
      } else if (condition.includes('cloud')) {
        setWeatherCondition('cloudy');
      } else if (condition.includes('rain')) {
        setWeatherCondition('rainy');
      } else if (condition.includes('snow')) {
        setWeatherCondition('snowy');
      } else {
        setWeatherCondition('clear'); 
      }
    };

    fetchWeather();
  }, [city, setWeatherCondition]);

  useEffect(()=>{
    const timer=setInterval(()=>setCurrentTime(new Date()),6000);
    return ()=>clearInterval(timer);
  },[]);

  if (!weather) return <div>Loading...</div>;

  return (
    <div className="current-weather">
      <h2>Current Weather Details</h2>
      <div className="weather-details">
        {/* <p>{weather.current.condition.text}</p> */}
        <p>
          Temp max: {unit === 'C' ? weather.forecast.forecastday[0].day.maxtemp_c : weather.forecast.forecastday[0].day.maxtemp_f }°{unit} <img src={weather.current.condition.icon} alt="icon" width="30" height="30" className="weather-icon"/>
          
        </p>
        <p>
          Temp min: {unit === 'C' ? weather.forecast.forecastday[0].day.mintemp_c : weather.forecast.forecastday[0].day.mintemp_f}°{unit} <img src={weather.current.condition.icon} alt="icon" width="30" height="30" className="weather-icon" />
        </p>
        <p>
          Humidity: {weather.current.humidity}%
          {/* <FontAwesomeIcon icon="fas fa-humidity" /> */}
          <img src={humidityIcon} alt="icon" width="30" height="30" className="weather-icon" />
        </p>
        <p>
          Cloudy: {weather.current.cloud}%
          {/* <FontAwesomeIcon icon="faCloud" /> */}
          <img src={CloudIcon} alt="icon" width="30" height="30" className="weather-icon" />
        </p>
        <p>
          Wind: {weather.current.wind_kph} km/h
          <img src={WindIcon} alt="icon" width="30" height="30" className="weather-icon" />
        </p>
      </div>
      <div className="weather-summary">
        <div className="temperature">{unit==='C'?weather.current.temp_c:weather.current.temp_f}°{unit}</div>
        <div className="city">{city}</div>
        <div className="icon"><img src={weather.current.condition.icon} alt="weather icon"/></div>
        <div className="datetime">{format(currentTime,"HH:mm EEEE dd MMM yyyy")}</div>

      </div>
    </div>
  );
};

export default CurrentWeather;