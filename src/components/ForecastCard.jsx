import React from "react";

export default function ForecastCard({ day, unit }) {
  const date = new Date(day.dt * 1000);
  return (
    <div className="forecast-card">
      <p>{date.toLocaleDateString(undefined, { weekday: "long" })}</p>
      <img
        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
        alt={day.weather[0].description}
      />
      <p>
        {unit === "metric"
          ? Math.round(day.main.temp) + "°C"
          : Math.round((day.main.temp * 9) / 5 + 32) + "°F"}
      </p>
      <p>{day.weather[0].description}</p>
    </div>
  );
}
