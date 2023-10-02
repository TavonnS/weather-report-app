// go from city to lat, long OK
// api call for lat, long OK
// display city data results 
// expand data into 5 day forecast
// store previous searches as local storage

var apiKey = "1c16efd32bbea70206dd01cfd77bb832";

var locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + "&appid=" + apiKey;
console.log(locationURL);

function fetchLocation() {
    fetch("locationURL")

    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
};



var searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", fetchCity);

function fetchCity() {

var searchInput = document.querySelector("#search").value;
var city = searchInput;
var cityURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;   

fetch (cityURL)
.then (function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);

var lat = data[0].lat;
var long = data[0].lon;

weatherLook(lat, long);


})

}


function weatherLook(lat, long) {




var weatherCall = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + apiKey + "&units=imperial";


    fetch (weatherCall) 
    .then (function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);


var iconcode = data.weather[0].icon;        
var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

var cityName = data.name;
var date = data.dt_txt;
var temp = data.main.temp;
var humidity = data.main.humidity;
var wind = data.main.wind;

console.log(iconcode, iconurl, cityName, date, temp, humidity, wind);
// grab element by id, use textContent = humidity;

    })
    

};



// city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed


