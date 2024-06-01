import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

const Coordinates = () => {
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCoords = () => {
    setError(null);

    fetch(`https://nominatim.openstreetmap.org/search?q=${location}&format=json`)
      .then((response) => response.json())
      .then((res) => {
        if (res.length === 0) {
          throw new Error('Location not found');
        }
        const { lat, lon } = res[0];
        if (!lat || !lon) {
          throw new Error('Invalid location data');
        }
        navigate('/weather', { state: { lat, lon } });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (location.trim() === '') {
      setError('Location cannot be empty');
      return;
    }
    fetchCoords();
  };

  return (
    <div className='coordinates-container'>
      <form onSubmit={handleSubmit}>
        <label className='form-label'>
          <h1>LOCATION:</h1>
          <input
            type="text"
            value={location}
            className='form-control'
            onChange={(e) => {
              setLocation(e.target.value);
              setError(null); // Clear error when the user starts typing
            }}
          />
        </label>
        <button className='btn btn-primary' type="submit">Get Weather</button>
      </form>

      {error && <div className='error'>Error: {error}</div>}
    </div>
  );
};

const Weather = () => {
  const location = useLocation();
  const { lat, lon } = location.state || {};
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (lat && lon) {
      setLoading(true);
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d30617ad6a3024ab46f04d82411f760e&units=metric`)
        .then((response) => response.json())
        .then((res) => {
          if (res.cod && res.cod !== 200) {
            throw new Error(res.message);
          }
          setWeatherData(res);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [lat, lon]);

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div className='error'>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>No data available</div>;
  }

  const { main, weather, wind, clouds, sys, name, visibility } = weatherData;

  return (
    <div className='weather-container'>
      <h2>Weather in {name}</h2>
      <div className='current-weather'>
        <div className='flex gap-2'>
          <p>Temperature: {main.temp} °C</p>
          <p>Feels Like: {main.feels_like} °C</p>
          <p>Pressure: {main.pressure} hPa</p>
        </div>
        <div className='flex gap-2'>
          <p>Humidity: {main.humidity}%</p>
          <p>Visibility: {visibility} meters</p>
          <p>Wind Speed: {wind.speed} m/s</p>
        </div>
        <div className='flex gap-2'>
          <p>Wind Direction: {wind.deg}°</p>
          <p>Cloudiness: {clouds.all}%</p>
          <p>Country: {sys.country}</p>
        </div>
        <div className='flex gap-2'>
          <p>Sunrise: {new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset: {new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
        <h3>Weather Conditions</h3>
        <ul className='weather-conditions'>
          {weather.map((condition) => (
            <li key={condition.id}>
              <p>Main: {condition.main}</p>
              <p>Description: {condition.description}</p>
              <img src={`http://openweathermap.org/img/wn/${condition.icon}.png`} alt={condition.description} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Coordinates />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>
  );
};

export default App;
