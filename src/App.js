import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import FiveDayForecast from './components/FiveDayForecast';
import Search from './components/Search';
import './styles.css';

const App = () => {
  const [city, setCity] = useState('New York');
  const [unit, setUnit] = useState('C');
  const [weatherCondition,setWeatherCondition]=useState('clear');

  const toggleUnit =() =>{
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  return (
    <Router>
      <div className={`weather-container ${weatherCondition}`}>
        <nav>
          <Link to="/">Home</Link>
          <a href="/search" target="_blank" rel="noopener noreferrer">Search By City</a>
          {/* <Link to="/search"> 🔍 Search by city</Link> */}
        </nav>
        <Routes>
        <Route path="/" element={
            <>
              <button  onClick={toggleUnit}>
                Toggle to {unit==='C' ? 'Fahrenheit' : 'Celsius'}
              </button>
              <CurrentWeather city={city} unit={unit} setWeatherCondition={setWeatherCondition}/>
              <HourlyForecast city={city} unit={unit}/>
              <FiveDayForecast city={city} unit={unit} />
            </>
          } />
          
          
          
          <Route path="/search" element={<Search setCity={setCity} />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;