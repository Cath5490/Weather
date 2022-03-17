function search(cityName) {
  let apiKey = "c26cb2147528c68477d823cc1d5509f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function city(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-input").value;
  search(cityName);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()]; // 0 and 6

  let hour = date.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  } else {
    hour = hour;
  }

  let minute = date.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  } else {
    minute = minute;
  }
  return `${day} ${hour}:${minute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "c26cb2147528c68477d823cc1d5509f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let weatherForecast = response.data.daily;

  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row list">`;

  weatherForecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `<div class="col-4">${formatDay(forecastDay.dt)}</div>
          <div class="col-4"><img id="icon" src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"/></div>
          <div class="col-2">${forecastDay.temp.min}</div>
          <div class="col-2"${forecastDay.temp.max}</div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function showWeather(response) {
  celsiusTemp = response.data.main.temp;
  console.log(response.data);

  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#conditions").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

let cityForm = document.querySelector("#city-input");
cityForm.addEventListener("submit", city);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "c26cb2147528c68477d823cc1d5509f4";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
  navigator.geolocation.getCurrentPosition(nameCity);
}

function nameCity(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c26cb2147528c68477d823cc1d5509f4";
  let apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCity);
}

function showCity(response) {
  console.log(response);
  let city = response.data[0].name;
  console.log(city);
  let h2 = document.querySelector("h2");
  h2.innerHTML = city;
}

let button = document.querySelector("button");
button.addEventListener("click", getPosition);

function showFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  document.querySelector("#temp").innerHTML = Math.round(fahrenheitTemp);
}

function showCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");

  document.querySelector("#temp").innerHTML = Math.round(celsiusTemp);
}
celsiusTemp = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

search("London");
