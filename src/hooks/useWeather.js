import { useState } from "react";
import { getCurrentWeather, getForecast } from "../api/weatherApi";

export default function useWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("metric");

  const fetchWeather = async (city) => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    setWeatherData(null);
    setForecastData([]);

    try {
      const weather = await getCurrentWeather(city, unit);
      const forecast = await getForecast(city, unit);
      setWeatherData(weather);
      setForecastData(forecast.daily);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = (city) => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    if (city) fetchWeather(city);
  };

  return {
    weatherData,
    forecastData,
    error,
    loading,
    unit,
    fetchWeather,
    toggleUnit,
  };
}
