function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let state=document.querySelector("#current-state");
  let emoji=document.querySelector(".icon");

 
  
  let iconElement=response.data.condition.icon_url;
  emoji.setAttribute("src",iconElement);


  state.innerHTML=response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;

}

function displayForecast(response){
 
  
    let forecastData = response.data.daily;
    let dayIcons = document.querySelectorAll(".dayicons");

    forecastData.forEach((day, index) => {
      let iconURL= condition.icon_URL;
      let iconElement=dayIcons[index];

      if (iconURL && iconElement) {
        iconElement.setAttribute("src",iconURL);
      }
    });
  



}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let apiURL=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayTemperature);
  axios.get(apiURL)
    .then(displayForecast)
    .catch(error => console.error("Error fetching forecast:", error));
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
    "Saturday"
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
