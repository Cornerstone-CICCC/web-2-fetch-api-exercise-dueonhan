// YOUR JS CODE HERE

async function getData(url) {
  try {
    const res = await fetch(url, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const weatherData = await getData(
    "https://api.open-meteo.com/v1/forecast?latitude=49.2497&longitude=-123.1193&current=temperature_2m,is_day,rain,showers,wind_speed_10m&timezone=auto&forecast_days=1"
  );
  console.log(weatherData);

  // Fetch weather data on load

  console.log(buildWeather(weatherData));
  buildWeather(weatherData);
});

function buildWeather(data) {
  let time = new Date(data.current.time);
  const formtted = time.toLocaleTimeString();

  document.querySelector(
    ".temperature"
  ).textContent = `${data.current.temperature_2m}${data.current_units.temperature_2m}  `;
  document.querySelector(
    ".wind-spped"
  ).textContent = `Wind speed : ${data.current.wind_speed_10m} km/h `;
  document.querySelector(".location").textContent = `${data.timezone}  `;
  document.querySelector(
    ".time"
  ).textContent = `Last Updated: ${data.current.time.slice(
    0,
    10
  )} ${formtted},  `;
}
