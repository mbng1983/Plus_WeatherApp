let apiKey = "ba0fetb7543250d46c1o5b9aee3092a1";

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  searchCity(searchInputElement.value);
}

function searchCity(city) {
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#tempValue");
  let temperature = Math.round(response.data.temperature.current);
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let cityElement = document.querySelector("#current-city");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = response.data.condition.description;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  return days[date.getDay()]
}

function getForecast (city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
  axios(apiUrl).then(displayForecast)

}
function displayForecast(response) {
  
  let forecastHTML = "";

  response.data.daily.forEach(function(day, index) {
    if (index < 5) {
    forecastHTML = forecastHTML + `
      <div class="forecast-item">
        <div class="forecast-date">${formatDay(day.time)}</div>
        <div>
        <img src="${day.condition.icon_url}" class="forecast-icon"/></div>
        <div class="forecast-temps">
          <div class="forecast-temp"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
          <div class="forecast-temp">${Math.round(day.temperature.minimum)}°</div>
        </div>
      </div>
    `;
  }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

searchCity("Guarulhos");


