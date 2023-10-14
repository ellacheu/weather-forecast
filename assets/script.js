var form = $('#searchForm');
var submitButton = $('.btn');
// form click event to search for city
form.on("submit", function(event) {
    event.preventDefault(); 
    console.log(event);
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
  .then(function (data) {
    console.log(data);
  
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
  city.innerHTML = 'Current Weather in ' + cityName;
  icon.src = weatherIconUrl;
  temperature.innerHTML = 'Temperature: ' + temp;
  humidityEl.innerHTML = 'Humidity: ' + humidity;
  wind.innerHTML = 'Wind Speed: ' + windSpeed;
  console.log(data);
 })
}




/*
date
icon of weather condition
temp
humidity
windspeed

click on a city in the search history
presented with current and future conditions for that city

local storage, searched cities persist on the page
*/