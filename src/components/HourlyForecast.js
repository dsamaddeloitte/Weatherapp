import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HourlyForecast = ({ city, unit }) => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=50dddfd3647c47e4a16133923243107&q=${city}&hours=24`);
      setForecast(response.data.forecast.forecastday[0].hour);
    };

    fetchForecast();
  }, [city]);

  if (!forecast) return <div>Loading...</div>;

  return (
    <div className="hourly-forecast weather-details">
      <h2>Hourly Forecast</h2>
      <ul>
        {forecast.map(hour => (
          <li key={hour.time}>
            <p>{new Date(hour.time).toLocaleTimeString()}: {unit ==='C' ? hour.temp_c : hour.temp_f}°{unit}, <img src={hour.condition.icon} alt="weather icon" width="30" height="30" className="weather-icon"/>  </p>
            <p>{hour.condition.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HourlyForecast;