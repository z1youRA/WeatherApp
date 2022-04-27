const APIKey = "8c0d3e0fe3192dd6674a3ed5b0898dd1";
const content = document.querySelector(".content");
const searchBar = document.querySelector(".header .city");
const searchBtn = document.querySelector(".header button");

async function getWeatherByLoc(loc) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&appid=${APIKey}`,
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
    .then((data) => (content.textContent = data.weather[0].id));
}

searchBtn.addEventListener("click", () => {
  displayWeather(searchBar.value);
});
