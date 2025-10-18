import React, { useState, useEffect } from "react";
import useWeather from "./hooks/useWeather";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import AnimatedBackground from "./components/AnimatedBackground";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const {
    weatherData,
    forecastData,
    error,
    loading,
    unit,
    fetchWeather,
    toggleUnit,
  } = useWeather();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=f93009ff37c51d36d4105e4d0589fa44`
          );
          const data = await response.json();
          setCity(data.name);
          fetchWeather(data.name);
        } catch {}
      });
    }
  }, []);

  const getBackground = () => {
    if (!weatherData) return "linear-gradient(to right, #6dd5ed, #2193b0)";
    const weather = weatherData.weather[0].main.toLowerCase();
    switch (weather) {
      case "clear":
        return "linear-gradient(to right, #fceabb, #f8b500)";
      case "clouds":
        return "linear-gradient(to right, #bdc3c7, #2c3e50)";
      case "rain":
      case "drizzle":
        return "linear-gradient(to right, #4e54c8, #8f94fb)";
      case "thunderstorm":
        return "linear-gradient(to right, #434343, #000000)";
      case "snow":
        return "linear-gradient(to right, #e0eafc, #cfdef3)";
      case "mist":
      case "fog":
      case "haze":
        return "linear-gradient(to right, #757f9a, #d7dde8)";
      default:
        return "linear-gradient(to right, #6dd5ed, #2193b0)";
    }
  };

  return (
    <div className="container" style={{ background: getBackground() }}>
      <h1>Weather App</h1>

      <div className="weather-input">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather(city)}
        />
        <button onClick={() => fetchWeather(city)}>Search</button>
      </div>

      <button className="unit-btn" onClick={() => toggleUnit(city)}>
        Switch to {unit === "metric" ? "°F" : "°C"}
      </button>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {weatherData && <WeatherCard data={weatherData} unit={unit} />}
      {forecastData.length > 0 && (
        <div className="forecast">
          <h3>Next 3 Days Forecast</h3>
          <div className="forecast-cards">
            {forecastData.map((day, i) => (
              <ForecastCard key={i} day={day} unit={unit} />
            ))}
          </div>
        </div>
      )}

      <AnimatedBackground weather={weatherData?.weather[0].main} />
    </div>
  );
}

export default App;
