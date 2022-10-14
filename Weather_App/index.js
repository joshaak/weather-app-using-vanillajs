// window.addEventListener("load", () => {
//   let long;
//   let lat;
//   let temperatureDescription = document.querySelector(
//     ".temperature-description"
//   );
//   let temperatureDegree = document.querySelector(".temperature-degree");
//   let locationTimezone = document.querySelector(".location-timezone");
//   let pIcon = document.querySelector(".icon");

//   let API_KEY = "3d5d4c41d614a45bdfa9e1be469c140a";

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       long = position.coords.longitude;
//       lat = position.coords.latitude;
//       //   const proxy = "https://cors-anywhere.herokuapp.com/";
//       const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`;

//       fetch(api)
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           console.log(data);
//           const { name } = data;
//           const { temp, humidity } = data.main;
//           const { icon, description } = data.weather[0];

//           //set DOM elements from the API
//           temperatureDegree.textContent = temp;
//           temperatureDescription.textContent = description;
//           locationTimezone.textContent = `Weather in ${name}`;

//           //   pIcon.textContent = icon;
//           pIcon.src = "http://openweathermap.org/img/wn/" + icon + ".png";
//         });
//     });
//   } else {
//     h1.textContext = "Please allow location to display the weather";
//   }
// });
let weather = {
  apiKey: "3d5d4c41d614a45bdfa9e1be469c140a",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".temperature-description").innerText = description;
    document.querySelector(".temperature-degree").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Bengaluru");
