let units = "metric";
// challege 1
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let monthIndex = currentTime.getMonth();
  let dates = currentTime.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${days[dayIndex]}, ${months[monthIndex]} ${dates}, ${hours}:${minutes}`;
}

let dateElement = document.querySelector("h5");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
  <div class="col-3">
          <h4>
          ${formatHours(forecast.dt * 1000)}
          </h4>
          <img src ="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png">
          <div id="tempNum"><strong>${Math.round(
            forecast.main.temp_max
          )}</strong>º
        </div>
        `;
  }
}

function search(city) {
  let apiKey = "873778ec9745d16fa6e7696c40362dfa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// celcius or fahrenheit
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature", "#forecast");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

function sydney(event) {
  event.preventDefault();
  search("Sydney");
}
let clickSydney = document.querySelector("#sydney");
clickSydney.addEventListener("click", sydney);

function london(event) {
  event.preventDefault();
  search("London");
}
let clickLondon = document.querySelector("#london");
clickLondon.addEventListener("click", london);

function moscow(event) {
  event.preventDefault();
  search("Moscow");
}
let clickMoscow = document.querySelector("#moscow");
clickMoscow.addEventListener("click", moscow);

function newYork(event) {
  event.preventDefault();
  search("New York");
}
let clickNewYork = document.querySelector("#newYork");
clickNewYork.addEventListener("click", newYork);

function losAngeles(event) {
  event.preventDefault();
  search("Los Angeles");
}
let clickLosAngeles = document.querySelector("#losAngeles");
clickLosAngeles.addEventListener("click", losAngeles);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
search("New York");
