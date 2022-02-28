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
  let searchInput = document.querySelector("#search-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = searchInput.value;
  let cityName = searchInput.value;
  let apiKey = "c26cb2147528c68477d823cc1d5509f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let conditions = response.data.weather[0].description;
  console.log(temperature);
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${temperature}°C`;
  let condition = document.querySelector("#conditions");
  condition.innerHTML = `${conditions}`;
}

let cityForm = document.querySelector("#city-input");
cityForm.addEventListener("submit", city);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "c26cb2147528c68477d823cc1d5509f4";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
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
