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
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  minutes = minutes <= 9 ? "0" + minutes : minutes;
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

let currentTime = document.querySelector("#current-time");
let now = new Date();
currentTime.innerHTML = formatDate(now);

function showTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temperature");
  temp.innerHTML = currentTemperature;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
}
function searchCity(city) {
  let apiKey = "f454de7ad255eb19e11038486bc33498";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-city-input").value;
  searchCity(inputCity);
}

let searchingForm = document.querySelector("#searching-form");
searchingForm.addEventListener("submit", handleSubmit);

searchCity("London");

function searchPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f454de7ad255eb19e11038486bc33498";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let currentButton = document.querySelector("#current-place");
currentButton.addEventListener("click", getCurrentPosition);
