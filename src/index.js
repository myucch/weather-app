// Weekday and time

let now = new Date();

let weatherDate = document.querySelector("#weather-date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

weatherDate.innerHTML = `${day} ${hours}:${minutes}`;

function showTemperature(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature-main").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

// API integration search city in box
function searchCity(city) {
  let apiKey = "8c83aaa11682fdeb36d3e77599574e7c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

// Submit city event *trigger*
function submitCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  searchCity(cityInput);
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", submitCity);

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentPosition);
