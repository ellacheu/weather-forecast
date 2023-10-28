var form = $('#searchForm');
var submitButton = $('.btn');

// form click event to search for city
form.on("submit", function(event) {
    event.preventDefault(); 
    var city = event.target[0].value;
    getApi(city);

    handleSearch();
 })

// save to local storage and create functional displayed search list

 var searchHistory = JSON.parse(localStorage.getItem('savedCity')) || [];

 function handleSearch() {
  var city = document.getElementById('searchInput').value;

  if (!searchHistory.includes(city)) {
    searchHistory.push(city);

    localStorage.setItem('savedInput', JSON.stringify(city));

    updateSearchHistoryUI();
    console.log(city)
  }
}  

console.log(searchHistory)
 function updateSearchHistoryUI() {
  var searchHistoryList = document.getElementById('search-history');
  searchHistoryList.innerHTML = "";

  for (var i = 0; i < searchHistory.length; i++) {
    var cityButton = document.createElement('button');
    cityButton.textContent = searchHistory[i];
    cityButton.addEventListener('click', function() {
      var city = this.textContent;
      getApi(city);
      
    });
    searchHistoryList.appendChild(cityButton);
  }
 }

 updateSearchHistoryUI();


// get api function to pull longitute and latitude location of searched city
var apiKey = "43c04c5c5205b5bc0cbf1dfb25c37cf3";

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
   
    for (let i = 0; i < data.list.length; i+=8) {
    console.log(data.list[i])
   
    let day = data.list[i].dt_txt;
    let name = data.city.name;
    let weatherIcon = data.list[i].weather[0].icon;
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
  
      }
    })
  };


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
  

  })
};
  
// not pushing into array in local storage
// clear previous search 
// data persist