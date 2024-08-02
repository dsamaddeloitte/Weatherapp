import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FiveDayForecast = ({ city , unit }) => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=50dddfd3647c47e4a16133923243107&q=${city}&days=5`);
      setForecast(response.data.forecast.forecastday);
    };

    fetchForecast();
  }, [city]);

  if (!forecast) return <div>Loading...</div>;

  return (
    <div className="five-day-forecast weather-details">
      <h2>5-Day Forecast</h2>
      <ul>
        {forecast.map(day => (
          <li key={day.date}>
            <p>{new Date(day.date).toDateString()}</p>
            <p>High: {unit ==='C' ? day.day.maxtemp_c : day.day.maxtemp_f}°{unit} , Low: {unit ==='C' ? day.day.mintemp_c : day.day.mintemp_f}°{unit}  <img src={day.day.condition.icon} alt="weather icon" width="30" height="30" className="weather-icon" /></p>
            
            
            {/* <p>High: {day.day.maxtemp_c}°C / {day.day.maxtemp_f}°F</p> */}
            {/* <p>Low: {day.day.mintemp_c}°C / {day.day.mintemp_f}°F</p> */}
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FiveDayForecast;