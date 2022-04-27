const APIKey = "8c0d3e0fe3192dd6674a3ed5b0898dd1";

async function getWeather(loc) {
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

getCord("chongqing")
  .then((cord) => getWeather(cord))
  .then((data) => console.log(data));
