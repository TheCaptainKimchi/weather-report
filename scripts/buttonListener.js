let apiKey = "d1627571f67549d698f203617231506";
// Query cardElement
let cardElement = document.querySelector(".content__card");

let form = document.querySelector(".content__form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Remove cardElement details
  cardElement.innerHTML = "";

  // Change cardElement class
  cardElement.className = "content__weather";

  //  Capture form value
  let location = e.target.location.value;

  //   Insert new cardElement details
  currentWeather(location);
});

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
      let tempCelcius = response.data.current.temp_c;
      let tempFarenheit = response.data.current.temp_f;
      let localTime = response.data.location.localtime;
      let cityName = response.data.location.name;
      let regionName = response.data.location.region;
      let countryName = response.data.location.country;
      let condition = response.data.current.condition.text;
      let precipMM = response.data.current.precip_mm;
      let precipIN = response.data.current.precip_in;
      let feelsLikeC = response.data.current.feelslike_c;
      let feelsLikeF = response.data.current.feelslike_f;
      let isDay = response.data.current.is_day;

      let tempIcon = "../assets/images/star-logo.png";

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

      let farenheitCreate = document.createElement("h2");
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
    });
}
