import React from "react";

export default function WeatherCard({ data, unit }) {
  return (
    <div className="weather-display">
      <h2>
        {data.name}, {data.sys.country}
      </h2>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
        alt={data.weather[0].description}
      />
      <p className="temp">
        {unit === "metric"
          ? Math.round(data.main.temp) + "°C"
          : Math.round((data.main.temp * 9) / 5 + 32) + "°F"}
      </p>
      <p className="desc">{data.weather[0].description}</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>
        Wind: {data.wind.speed} {unit === "metric" ? "m/s" : "mph"}
      </p>
    </div>
  );
}
