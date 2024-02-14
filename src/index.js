function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  windSpeedElement.innerHTML = `${response.data.wind.speed}mph`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "8bc8b03b375bt4da35a05of0462b8403";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

function citySubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function getForecast (city) {
  let apiKey = "8bc8b03b375bt4da35a05of0462b8403";
  let apiUrl =
    `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
    axios(apiUrl).then(weeklyForecast);
}

function weeklyForecast(response) {
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="forecast-day">
        <div class="forecast-date">${day}</div>
        <div class="-forecast-icon">🌤️</div>
        <div class="forecast-temperatures">
          <div class="forecast-temperature">
            <strong>20º</strong>
          </div>
          <div class="forecast-temperature">6º</div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySubmit);

searchCity("Anchorage");

