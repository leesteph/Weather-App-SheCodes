function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let dayIndex = date.getDay();
  let day = days[dayIndex];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hour}:${minutes}`;
}

let currentTime = new Date();
let dateElement = document.querySelector("#current-time");
dateElement.innerHTML = formatDate(currentTime);

let temperatureElement = document.querySelectorAll(".temp");
let celsiusTemperature = temperatureElement.innerHTML;
console.log(temperatureElement);

function convertToF(event) {
  event.preventDefault();
  let allTemp = document.querySelectorAll(".temp");
  for (i = 0; i < allTemp.length; i++) {
    let temperature = allTemp[i].innerHTML;
    temperature = Number(temperature);
    allTemp[i].innerHTML = Math.round((temperature * 9) / 5 + 32);
  }
}

function convertToC(event) {
  event.preventDefault();
  let allTemp = document.querySelectorAll(".temp");
  for (i = 0; i < allTemp.length; i++) {
    let temperature = allTemp[i].innerHTML;
    temperature = Number(temperature);
    allTemp[i].innerHTML = Math.round(((temperature - 32) * 5) / 9);
  }
}

let clickF = document.querySelector("#fahrenheit-selector");
clickF.addEventListener("click", convertToF);

let clickC = document.querySelector("#celsius-selector");
clickC.addEventListener("click", convertToC);

//Actual Weather Data
///Search engine function
let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "7448d3c8732ee1634135d51cc20714d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=`;
  axios.get(`${apiUrl}${apiKey}`).then(displayWeather);
}

//Using Current Location

let searchCurrentLocation = document.querySelector("#current-location");
searchCurrentLocation.addEventListener("click", getCurrentLocation);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(position) {
  let apiKey = "7448d3c8732ee1634135d51cc20714d3";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrlCurrentLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrlCurrentLocation).then(displayWeather);
}

//Display Weather

function displayWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  let temperatureElement = document.querySelector("h2");
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}`;
  let temperatureElementMin = document.querySelector("h3");
  temperatureElementMin.innerHTML = `${Math.round(
    response.data.main.temp_min
  )}`;
}

//Display Default Location on load
searchCity("New York");
