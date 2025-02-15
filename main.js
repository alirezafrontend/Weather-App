const container_weather = document.querySelector(".container_weather");

// form
const city_value = document.querySelector(".city_value");
const form = document.querySelector("form");

// icon
const icon_weather = document.querySelector(".icon_weather");

// city
const city_name = document.querySelector(".city_name");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");

// detail
const feels_like_value = document.querySelector(".feels_like_value");
const humidity_value = document.querySelector(".humidity_value");
const wind_speed_value = document.querySelector(".wind_speed_value");

//

const loading = document.querySelector("#loading");

//

async function checkCity(cityValue) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=70ed2ac2ef453fa5c940168ba0045b42&units=metric`;
  city_value.focus();

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

//

async function loadData(cityValue) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=70ed2ac2ef453fa5c940168ba0045b42&units=metric`;

  loading.classList.remove("invisible");

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const load = await response.json();
    console.log(load);

    city_name.textContent = `${load.name}`;
    temperature.textContent = `Temperature: ${Math.round(load.main.temp)}°C`;
    description.textContent = `${load.weather[0].description}`;
    feels_like_value.textContent = `${Math.round(load.main.feels_like)}°C`;
    humidity_value.textContent = `${Math.round(load.main.humidity)}%`;
    wind_speed_value.textContent = `${Math.round(load.wind.speed)}m/s`;

    const icon = `${load.weather[0].icon}`;
    console.log(icon);

    switch (icon) {
      case "01n":
      case "01d":
        icon_weather.innerHTML = `
          <img
            class="w-[100px] md:w-[150px]"
            src="img/sunset-svgrepo-com.svg"
            alt=""
          />
        `;
        break;
      case "02n":
      case "02d":
        icon_weather.innerHTML = `
          <img
            class="w-[100px]  md:w-[150px] "
            src="img/weather-few-clouds-svgrepo-com.svg"
            alt=""
          />
        `;
        break;
      case "03n":
      case "03d":
        icon_weather.innerHTML = `
          <img
            class="w-[100px]  md:w-[150px] "
            src="img/scattered clouds.svg"
            alt=""
          />
        `;
        break;
      case "04n":
      case "04d":
        icon_weather.innerHTML = `
          <img
            class="w-[100px] md:w-[150px] "
            src="img/broken clouds.svg"
            alt=""
          />
        `;
        break;
      case "09n":
      case "09d":
        icon_weather.innerHTML = `
          <img
            class="w-[100px]  md:w-[150px] "
            src="img/shower rain.svg"
            alt=""
          />
        `;
        break;
      case "10n":
      case "10d":
        icon_weather.innerHTML = `
          <img
            class="w-[100px]  md:w-[150px] "
            src="img/rain.svg"
            alt=""
          />
        `;
        break;
      case "11n":
      case "11d":
        icon_weather.innerHTML = `
          <img
            class="w-[100px]  md:w-[150px] "
            src="img/thunderstorm.svg"
            alt=""
          />
        `;
        break;
      case "13n":
      case "13d":
        icon_weather.innerHTML = `
          <img
            class="w-[100px]  md:w-[150px] "
            src="img/snow.svg"
            alt=""
          />
        `;
        break;
      case "50n":
      case "50d":
        icon_weather.innerHTML = `
          <img
            class="w-[100px]  md:w-[150px] "
            src="img/mist.svg"
            alt=""
          />
        `;
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    loading.classList.add("invisible");
  }
}

//

window.onload = () => loadData("tehran");
city_value.focus();

//

form.addEventListener("submit", getData);

async function getData(e) {
  e.preventDefault();

  const cityValue = city_value.value.trim();

  if (cityValue) {
    city_value.style.border = "none";
    const isValidCity = await checkCity(cityValue);

    if (isValidCity) {
      city_value.style.border = "none";
      city_value.setAttribute("placeholder", "Enter a city");
      await loadData(cityValue);
      city_value.value = "";
    } else {
      city_value.style.border = "2px solid red";
      city_value.setAttribute(
        "placeholder",
        "The city name you entered is incorrect. Try again."
      );
      city_value.value = "";
    }
  } else {
    city_value.focus();
    city_value.style.border = "2px solid red";
    city_value.setAttribute("placeholder", "Enter a city");
  }
}
