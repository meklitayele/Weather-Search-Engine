

let parisUrl = `https://api.shecodes.io/weather/v1/current?query=Paris&key=ab7f110fa3a450a34fdfo5836t845ac5&units=metric`;
let parisForecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=Paris&key=ab7f110fa3a450a34fdfo5836t845ac5`

axios.get(parisUrl).then(callFirst);


function callFirst(response) {
    let parisIconUrl = response.data.condition.icon_url;
    let parisIconElement = document.querySelector(".icon");
    parisIconElement.setAttribute("src", parisIconUrl);

    let parisTemp = document.querySelector(".current-temperature-value");
    let parisHum = document.querySelector(".humidity-value");
    let parisWin = document.querySelector(".wind-value")


    parisTemp.innerHTML = `${Math.round(response.data.temperature.current)} <sup style="font-size:30px;">°C</sup>`
    parisHum.innerHTML = response.data.temperature.humidity + "%";
    parisWin.innerHTML = response.data.wind.speed + "km/h";

    let parisDesc = document.querySelector(".condition-description");
    parisDesc.innerHTML = response.data.condition.description;

    axios.get(parisForecastUrl).then((event) => {


        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        let forecastHTML = "";

      
        event.data.daily.forEach((item, index) => {

           
            let currentFullDate = new Date(item.time * 1000);
            let currentDay = days[currentFullDate.getDay()];

            let icon_url = item.condition.icon_url;


            let minOfDay = Math.round(item.temperature.minimum)
            let maxOfDay = Math.round(item.temperature.maximum)

           
            if (index > 0 && index <= 5) {

                forecastHTML += ` 
        
       <div class="forecast-day">
          <div class="day-row">${currentDay}</div>
        <br>
          <div class="icon-row" ><img src="${icon_url}"/></div>
       <br>
          <div class="min-max"><span class="min">${minOfDay}°</span> <span class="max">${maxOfDay}°</span> </div>
          </div>
         `
            }

        })

        let forecastSection = document.querySelector(".forecast-container");
        forecastSection.innerHTML = forecastHTML;


    });



}



//For actions we want to occur when a city is searched
function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = searchInputElement.value;


    //Get API of current weather for the searched city
    let city = searchInputElement.value;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=ab7f110fa3a450a34fdfo5836t845ac5&units=metric`;

    
    axios.get(apiUrl).then(changeTemprature);

    axios.get(apiUrl).then(changeDescription);

    axios.get(apiUrl).then(changeIcon)


    
    let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=ab7f110fa3a450a34fdfo5836t845ac5`

    axios.get(forecastUrl).then(getDailyForecast);





}


function changeTemprature(response) {

    console.log(response.data);

    let temp = document.querySelector(".current-temperature-value");
    let hum = document.querySelector(".humidity-value");
    let win = document.querySelector(".wind-value")

    if (response.data.temperature) {
        temp.innerHTML = ` ${Math.round(response.data.temperature.current)}<sup style="font-size:30px;">°C</sup>`

        hum.innerHTML = response.data.temperature.humidity + "%";
        win.innerHTML = response.data.wind.speed + "km/h";


    } else {
        temp.innerHTML = "N/A";
        hum.innerHTML = "N/A";
        win.innerHTML = "N/A";

    }

}

function changeDate(date) {
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


function changeDescription(response) {
    let desc = document.querySelector(".condition-description");
    desc.innerHTML = response.data.condition.description;
}

function changeIcon(response) {
    let iconUrl = response.data.condition.icon_url;
    let iconElement = document.querySelector(".icon");
    iconElement.setAttribute("src", iconUrl);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);


let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateELement.innerHTML = changeDate(currentDate);





function getDailyForecast(response) {

    console.log(response.data)
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let forecastHTML = "";

    response.data.daily.forEach((item, index) => {

        
        let currentFullDate = new Date(item.time * 1000);
        let currentDay = days[currentFullDate.getDay()];

        let icon_url = item.condition.icon_url;


        let minOfDay = Math.round(item.temperature.minimum)
        let maxOfDay = Math.round(item.temperature.maximum)

        
        if (index > 0 && index <= 5) {

            forecastHTML += ` 
        
       <div class="forecast-day">
          <div class="day-row">${currentDay}</div>
        <br>
          <div class="icon-row" ><img src="${icon_url}"/></div>
       <br>
          <div class="min-max"><span class="min">${minOfDay}°</span> <span class="max">${maxOfDay}°</span> </div>
          </div>
         `
        }

    })

    let forecastSection = document.querySelector(".forecast-container");
    forecastSection.innerHTML = forecastHTML;
}





