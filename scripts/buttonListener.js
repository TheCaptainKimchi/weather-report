let apiKey = "d1627571f67549d698f203617231506";
// Query cardElement
let cardElement = document.querySelector(".content__card");

// Query form
let form = document.querySelector(".content__form");

// Query geolocation button
let geoElement = document.querySelector(".content__button-geolocation");

// Form submit listener
form.addEventListener("submit", function (e) {
  e.preventDefault();

  //  Capture form value
  let location = e.target.location.value;

  //   Insert new cardElement details
  currentWeather(location);
});

// Geolocation submit
function geoFindMe() {
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    currentWeather(`${latitude},${longitude}`);
  }

  function error() {
    // Check if any alert already displayed
    let alertElement = document.querySelector(".content__alert");
    if (alertElement === null) {
      // Create alert text
      let alertCreate = document.createElement("p");
      alertCreate.className = "content__alert";
      alertCreate.innerText = "Unable to get geolocation";

      form.appendChild(alertCreate);
    }
  }

  if (!navigator.geolocation) {
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

document
  .querySelector(".content__geolocation")
  .addEventListener("click", geoFindMe);

// =================================
// ========== GET WEATHER ==========
// =================================

// .GET to https://www.weatherapi.com/ api
function currentWeather(location) {
  let response = axios
    .get(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`
    )
    .then((response) => {
      // Remove cardElement details
      cardElement.innerHTML = "";

      // Change cardElement class
      cardElement.className = "content__weather";
      let tempCelcius = response.data.current.temp_c;
      let tempFarenheit = response.data.current.temp_f;
      let localTime = response.data.location.localtime;
      let cityName = response.data.location.name;
      let regionName = response.data.location.region;
      let condition = response.data.current.condition.text;
      let precipMM = response.data.current.precip_mm;
      let precipIN = response.data.current.precip_in;
      let feelsLikeC = response.data.current.feelslike_c;
      let feelsLikeF = response.data.current.feelslike_f;
      let isDay = response.data.current.is_day;

      // Determine which icon to show
      let tempIcon = response.data.current.condition.icon;

      let airQuality = response.data.current.air_quality["us-epa-index"];
      let uv = response.data.current.uv;

      //    ==========================
      //   ===== Create card__top =====
      //    ==========================

      //   ===== Create card__top element =====
      let topCreate = document.createElement("div");
      topCreate.classList.add("card__top");

      // +++++ Create card__temp and append to card__top +++++
      let tempCreate = document.createElement("div");
      tempCreate.classList.add("card__temp");

      //   Create card__temp elements
      let celsiusCreate = document.createElement("h2");
      celsiusCreate.classList.add("card__celsius");
      celsiusCreate.innerText = `${tempCelcius} °C`;
      tempCreate.appendChild(celsiusCreate);

      let farenheitCreate = document.createElement("h3");
      farenheitCreate.classList.add("card__farenheit");
      farenheitCreate.innerText = `${tempFarenheit} °F`;
      tempCreate.appendChild(farenheitCreate);

      //  Append tempCreate to topCreate
      topCreate.appendChild(tempCreate);

      // +++++ Create card__icon and append to card__top +++++
      let iconCreate = document.createElement("div");
      iconCreate.classList.add("card__icon");

      //   Create card__icon elements
      let imageCreate = document.createElement("img");
      imageCreate.src = `${tempIcon}`;
      iconCreate.appendChild(imageCreate);

      topCreate.appendChild(iconCreate);

      //   Append card__top div to card
      cardElement.appendChild(topCreate);

      //    ==========================
      //   ===== Create card__bot =====
      //    ==========================

      //   ===== Create card__bottom element =====
      let botCreate = document.createElement("div");
      botCreate.classList.add("card__bottom");

      // +++++ Create card__bottom elements (excluding indexes div) +++++

      //   Create location element and append to bot element
      let locationCreate = document.createElement("h3");
      locationCreate.innerText = `${cityName}, ${regionName}`;
      botCreate.appendChild(locationCreate);

      let timeCreate = document.createElement("p");
      timeCreate.innerText = localTime;
      botCreate.appendChild(timeCreate);

      let conditionCreate = document.createElement("p");
      conditionCreate.innerText = condition;
      botCreate.appendChild(conditionCreate);

      cardElement.appendChild(botCreate);

      let precipMilli = document.createElement("p");
      precipMilli.innerText = `${precipMM} mm of precipitation`;
      botCreate.appendChild(precipMilli);

      let precipInch = document.createElement("p");
      precipInch.innerText = `${precipIN} inches of precipitation`;
      botCreate.appendChild(precipInch);

      //   +++++ Create indexs div +++++
      let indexesCreate = document.createElement("div");
      indexesCreate.classList.add("card__indexes");

      // Create indexes elements
      let aqCreate = document.createElement("p");
      aqCreate.innerText = `Air Quality: ${airQuality}`;
      indexesCreate.appendChild(aqCreate);

      let uvCreate = document.createElement("p");
      uvCreate.innerText = `UV: ${uv}`;
      indexesCreate.appendChild(uvCreate);

      botCreate.appendChild(indexesCreate);
    })
    .catch((error) => {
      // Check if any alert already displayed
      let alertElement = document.querySelector(".content__alert");
      if (alertElement === null) {
        // Create alert text
        let alertCreate = document.createElement("p");
        alertCreate.className = "content__alert";
        alertCreate.innerText = "Please enter valid location";

        form.appendChild(alertCreate);
      }
    });
}
