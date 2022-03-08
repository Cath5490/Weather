let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()]; // 0 and 6

let hour = now.getHours();
if (hour < 10) {
  hour = "0" + hour;
} else {
  hour = hour;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = "0" + minute;
} else {
  minute = minute;
}

let h1 = document.querySelector("h1");
h1.innerHTML = `${day} ${hour}:${minute}`;

function city(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-input").value;
  let apiKey = "c26cb2147528c68477d823cc1d5509f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  console.log(response.data);
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("h4").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#conditions").innerHTMl =
    response.data.weather[0].main;
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
