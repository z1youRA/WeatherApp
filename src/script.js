const APIKey = "8c0d3e0fe3192dd6674a3ed5b0898dd1";
const content = document.querySelector(".content");
const searchBar = document.querySelector(".header .city");
const searchBtn = document.querySelector(".header button");
const tempFlag = 1; // Celsius: 1, Fahrenheit: 0;

async function getWeatherByLoc(loc) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${loc.lat}&lon=${loc.lon}&exclude={minutely}&appid=${APIKey}`,
      {
        mode: "cors",
      }
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

async function getCord(cityName) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIKey}`,
      {
        mode: "cors",
      }
    );
    const data = await response.json();
    return {
      lon: data[0].lon,
      lat: data[0].lat,
    };
  } catch (e) {
    console.log(e);
  }
}

function displayWeather(cityName) {
  getCord(cityName)
    .then((cord) => getWeatherByLoc(cord))
    .then(displayData);
}

function kelvinConverter(kelvin) {
  return tempFlag
    ? Math.round(kelvin - 273.15)
    : Math.round(((kelvin - 273.15) * 9) / 5 + 32);
}

function displayCurrentWeather(data) {
  const currentTempBlock = content.querySelector("#current-temperature");
  const currentWeatherBlock = content.querySelector("#current-weather");
  const currentTemp = kelvinConverter(data.current.temp);
  const currentWeather = data.current.weather[0].main;
  const currentSign = content.querySelector("#current-temperature-sign");

  currentTempBlock.textContent = currentTemp;
  currentWeatherBlock.textContent = currentWeather;
  currentSign.textContent = tempFlag ? "°C" : "°F";
}

function displayDailyForecasts(data) {
  console.log(data);
  const dailyBlocks = document.querySelectorAll(".daily-forecast");
  dailyBlocks.forEach((dailyBlock, index) => {
    const icon = dailyBlock.querySelector(".weather-icon");
    const date = new Date(data.daily[index].dt * 1000);
    const dateBlock = dailyBlock.querySelector(".date");
    const weatherBlock = dailyBlock.querySelector(".daily-weather");
    const tempBlock = dailyBlock.querySelector(".daily-temp");
    if(index >= 2)
      dateBlock.textContent = (date.getMonth()+1) + "-" +date.getDate();
    icon.src = `http://openweathermap.org/img/wn/${data.daily[index].weather[0].icon}@2x.png`
    weatherBlock.textContent = data.daily[index].weather[0].main;
    tempBlock.textContent = kelvinConverter(data.daily[index].temp.day);
  });
}

function displayData(data) {
  displayCurrentWeather(data);
  displayDailyForecasts(data);
}

searchBtn.addEventListener("click", () => {
  displayWeather(searchBar.value);
});

displayWeather("Wuhan");
