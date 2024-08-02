import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {format} from 'date-fns';

const WeatherSummary = ({ city, unit }) => {
  const [weather, setWeather] = useState(null);
  const [currentTime,setCurrentTime]=useState(new Date());
  const [error,setError]=useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=50dddfd3647c47e4a16133923243107&q=${city}&days=5`
        );
        setWeather(response.data);
        setError('');
      } catch (error) {
        setWeather(null);
        setError('Location Not Found');
        console.error('Error fetching weather data:', error);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  if(error){
    return <div className="weather-summary"><p>{error}</p></div>;
  }

  if (!weather) {
    return <div>Loading...</div>;
  }

  const currentWeather = weather.current;
  const forecast = weather.forecast.forecastday[0];

  return (
    <div className="weather-summary">
      <h2>Weather in {city}</h2>
      <div >
        <div className="temperature">{unit==='C'?weather.current.temp_c:weather.current.temp_f}°{unit}</div>
        <div className="city">{city}</div>
        <div className="icon"><img src={weather.current.condition.icon} alt="weather icon"/></div>
        <div className="datetime">{format(currentTime,"HH:mm EEEE dd MMM yyyy")}</div>

      </div>
    </div>
  );
};

export default WeatherSummary;