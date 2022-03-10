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

function showWeather(response) {
  console.log(response.data.main);
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#conditions").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
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

search("London");
