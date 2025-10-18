const apiKey = "f93009ff37c51d36d4105e4d0589fa44";

export async function getCurrentWeather(city, unit = "metric") {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
  );
  if (!response.ok) throw new Error("City not found");
  return await response.json();
}

export async function getForecast(city, unit = "metric") {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`
  );
  if (!response.ok) throw new Error("Forecast data not available");

  const data = await response.json();
  const daily = [];
  const seen = new Set();

  data.list.forEach(item => {
    const day = new Date(item.dt * 1000).getDate();
    if (!seen.has(day)) {
      daily.push(item);
      seen.add(day);
    }
  });

  return { daily: daily.slice(0, 3) };
}
