var form = $('#searchForm');
var submitButton = $('.btn');

form.on("submit", function(event) {
    event.preventDefault(); 
    console.log(event);
    var city = event.target[0].value;
    getApi(city);
})

var apiKey = "43c04c5c5205b5bc0cbf1dfb25c37cf3";

// a weather dashboard with form inputs
// search for a city

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

function getCurrent(lat,lon) {
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
  fetch(queryUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  
})
}

/*
presented with current and future conditions for that city and that city is added to the search history
view current weather conditions for that city

presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
view future weather conditions for that city

presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
click on a city in the search history

presented with current and future conditions for that city
*/