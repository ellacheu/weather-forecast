var form = $('#searchForm');
var submitButton = $('.btn');


// form click event to search for city
form.on("submit", function(event) {
    event.preventDefault(); 
    var city = event.target[0].value;
    getApi(city);

})

var apiKey = "43c04c5c5205b5bc0cbf1dfb25c37cf3";

// get api function to pull longitute and latitude location of searched city
function getApi(city) {
    var queryUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;
    fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      getFiveDay(lat,lon);
      getCurrent(lat,lon);
    
})
}

// function for 5 day forecast
function getFiveDay(lat,lon) {
  var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
  fetch(queryUrl)
  .then(function (response) {
    return response.json();
  })
  .then(data => {
    console.log(data);
    let forecastContainer = document.getElementById('forecast-container');
    let forecastData = data.list.slice(0,5);
    console.log(forecastData)
   
    for (let i = 0; i < forecastData.length; i++) {
      let forecast= forecastData[i];


    forecastData.forEach(forecast => { 
    let day = data.list[i].dt_txt;
    let name = data.city.name;
    let weatherIcon = data.list[i].weather[i].icon;
    let weatherIconUrl = 'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';
    let temp = data.list[i].main.temp;
    let humidity = data.list[i].main.humidity;
    let windSpeed = data.list[i].wind.speed;


    let forecastCard = document.createElement('div');
      forecastCard.classList.add('forecastCard');
    let displayCard = document.createElement('card');
    let dateEl = document.createElement('h6');
      dateEl.textContent = day;
    let nameEl = document.createElement('p');
      nameEl.textContent = name;
    let iconEl = document.createElement('img');
      iconEl.src = weatherIconUrl;
    let tempEl = document.createElement('p');
      tempEl.textContent = 'Temperature: ' + temp;
    let humidityEl = document.createElement('p');
      humidityEl.textContent = 'Humidity: ' + humidity;
    let windEl = document.createElement('p');
      windEl.textContent = 'Wind Speed: ' + windSpeed;

    forecastCard.appendChild(dateEl);
    forecastCard.appendChild(nameEl);
    forecastCard.appendChild(iconEl);
    forecastCard.appendChild(tempEl);
    forecastCard.appendChild(humidityEl);
    forecastCard.appendChild(windEl);
    
    displayCard.appendChild(forecastCard);
    forecastContainer.appendChild(displayCard);
    })
    }
  })
  }

// function for current day weather 
function getCurrent(lat,lon) {
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
  fetch(queryUrl)
  .then(function (response) {
    return response.json();
  })
  .then(data => {
  let cityName = data.name;
  let weatherIcon = data.weather['0'].icon;
  let weatherIconUrl = 'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';
  let temp = data.main.temp;
  let humidity = data.main.humidity;
  let windSpeed = data.wind.speed;  
  city.innerHTML = cityName;
  currentIcon.src = weatherIconUrl;
  temperature.innerHTML = 'Temperature: ' + temp;
  humidityEl.innerHTML = 'Humidity: ' + humidity;
  wind.innerHTML = 'Wind Speed: ' + windSpeed;
  

// save search inputs to local storage

  var weatherData = {
    city: data.name,
    temp: data.main.temp,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    
  }
  let weatherDataString = JSON.stringify(weatherData);
  localStorage.setItem('weatherData', weatherDataString);

  // display search history
  var savedSearch = JSON.parse(localStorage.getItem("weatherData"));
  const displayList = document.getElementById('search-history');
  const listItem = document.createElement('li');
  const button = document.createElement('button');
  button.textContent = data.name;
  listItem.appendChild(button);
  displayList.appendChild(listItem)

  const searchList = document.getElementById('button');
  searchList.addEventListener('click', fetchData) 
  function fetchData() {
  getApi();
  getFiveDay();
  console.log(searchList);
    }
  })
}

/*
click on a city in the search history
presented with current and future conditions for that city

local storage, searched cities persist on the page
*/

/////////

// limit for loop for 5 day / problem: only display one day
// functional search list
// convert date/time display
