function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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

  return `${day} ${hours}:${minutes}`;
}

let city = `Kyiv`;

function getForecast(coordinates) {
  let apiKey = "215576bab28022db35e6e64f040e1b56";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data.weather);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-5">
        <div class="card monday">
        <div class="card-body">
            <h5>${day}</h5>
            <div>🌦</div>
            <p>+20°</p>
        </div>
        </div>
     </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

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
    let city = response.data.name;
    let temperatureNow = Math.round(response.data.main.temp);
    let message = `${temperatureNow}`;
    let newCity = document.querySelector("#current-temperature");
    newCity.innerHTML = message;

    celsiusTemperature = response.data.main.temp;

    let currentWind = document.querySelector("#current-wind");
    currentWind.innerHTML = Math.round(response.data.wind.speed);

    let currentHumidity = document.querySelector("#current-humidity");
    currentHumidity.innerHTML = response.data.main.humidity;

    let currentDate = document.querySelector("#current-day");
    currentDate.innerHTML = formatDate(response.data.dt * 1000);

    let currentIcon = document.querySelector("#weather-icon");
    currentIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }
  axios.get(apiURL).then(showTemperature);
}
changeCity("Kyiv");

//convertor C to F
let celsiusTemperature = null;
function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

//convertor from F to C

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

//current button

function currentPositionWeather() {
  function showWeather(response) {
    let currentGeoCityTemp = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.main.temp);
    currentGeoCityTemp.innerHTML = `${temperature}`;

    let currentGeoCityName = document.querySelector("#current-city");
    currentGeoCityName.innerHTML = response.data.name;

    let currentHumidity = document.querySelector("#current-humidity");
    currentHumidity.innerHTML = response.data.main.humidity;

    let currentWind = document.querySelector("#current-wind");
    currentWind.innerHTML = Math.round(response.data.wind.speed);
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
