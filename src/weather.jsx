// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const Weather = () => {
//   const location = useLocation();
//   const { lat, lon } = location.state || {};
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (lat && lon) {
//       setLoading(true);
//       fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d30617ad6a3024ab46f04d82411f760e&units=metric`)
//         .then((response) => response.json())
//         .then((res) => {
//           setWeatherData(res);
//           setLoading(false);
//         })
//         .catch((err) => {
//           setError(err.message);
//           setLoading(false);
//         });
//     }
//   }, [lat, lon]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!weatherData) {
//     return <div>No data available</div>;
//   }

//   const { main, weather, wind, clouds, sys, name, visibility } = weatherData;

//   return (
//     <div>
//       <h2>Weather in {name}</h2>
//       <p>Temperature: {main.temp} °C</p>
//       <p>Feels Like: {main.feels_like} °C</p>
//       <p>Minimum Temperature: {main.temp_min} °C</p>
//       <p>Maximum Temperature: {main.temp_max} °C</p>
//       <p>Pressure: {main.pressure} hPa</p>
//       <p>Humidity: {main.humidity}%</p>
//       <p>Visibility: {visibility} meters</p>
//       <p>Wind Speed: {wind.speed} m/s</p>
//       <p>Wind Direction: {wind.deg}°</p>
//       <p>Cloudiness: {clouds.all}%</p>
//       <p>Country: {sys.country}</p>
//       <p>Sunrise: {new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
//       <p>Sunset: {new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
//       <h3>Weather Conditions</h3>
//       <ul>
//         {weather.map((condition) => (
//           <li key={condition.id}>
//             <p>Main: {condition.main}</p>
//             <p>Description: {condition.description}</p>
//             <img src={`http://openweathermap.org/img/wn/${condition.icon}.png`} alt={condition.description} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Weather;
