let now = new Date();

let today = document.querySelector("#current-day");
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
let minutes = now.getMinutes();

today.innerHTML = `${day} ${hours}:${minutes}`;

let city = `Kyiv`;

function showCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  city = inputCity.value;
  let changeCurrentCity = document.querySelector("#current-city");
  changeCurrentCity.innerHTML = inputCity.value;
  changeCity();
}

let cityForm = document.querySelector("#input-city-form");
cityForm.addEventListener("submit", showCity);

function changeCity() {
  let apiKey = "215576bab28022db35e6e64f040e1b56";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  function showTemperature(response) {
    let temperatureNow = Math.round(response.data.main.temp);
    let city = response.data.name;
    let message = `${temperatureNow}`;
    let newCity = document.querySelector("#current-temperature");
    newCity.innerHTML = message;
  }
  axios.get(apiURL).then(showTemperature);
}

//current button

function currentPositionWeather() {
  function showWeather(response) {
    let currentGeoCityTemp = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.main.temp);
    currentGeoCityTemp.innerHTML = `${temperature}`;

    let currentGeoCityName = document.querySelector("#current-city");
    currentGeoCityName.innerHTML = response.data.name;
  }

  function currentPosition(position) {
    let apiKey = "215576bab28022db35e6e64f040e1b56";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }

  navigator.geolocation.getCurrentPosition(currentPosition);
}

let button = document.querySelector(".current-city-button");
button.addEventListener("click", currentPositionWeather);
