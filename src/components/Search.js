import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WeatherSummary from './WeatherSummary';

const Search = ({ setCity, unit }) => {
  const [query, setQuery] = useState('');
  const [searchedCity, setSearchedCity] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchedCity(query);
      setCity(query);
    }
  };

  return (
    <div className="search-page">
      <h2>Search for a City</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
      {searchedCity && <WeatherSummary city={searchedCity} unit={unit} />}
    </div>
  );
};

export default Search;