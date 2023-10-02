// go from city to lat, long OK
// api call for lat, long OK
// display city data results 
// expand data into 5 day forecast
// store previous searches as local storage

var apiKey = "1c16efd32bbea70206dd01cfd77bb832";
var locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + "&appid=" + apiKey;


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

// variables to power this function

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

// calls the next function

weatherLook(lat, long);
});
};


function weatherLook(lat, long) {

var weatherCallURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + apiKey + "&units=imperial";

    fetch (weatherCallURL) 
    .then (function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);


var iconcode = data.weather[0].icon;        
var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";


var cityName = data.name;
var dateReturned = data.dt;
var temp = data.main["temp"];
var humidity = data.main["humidity"];
var wind = data.wind["speed"];
var dateString = new Date(dateReturned*1000);

console.log(dateString.toDateString(), iconurl);
console.log(cityName, "Temp: " + temp + " degrees Faranheit", "Humidity: " + humidity + "%", "Wind: " + wind + " Miles per Hour");

// end of data output, connect data to html elements:

document.getElementById("main-header").innerHTML = cityName + " " + dateString.toDateString() + iconurl;
document.getElementById("temp").innerHTML = "Temp: " + temp + " ° F";
document.getElementById("wind").innerHTML = "Wind: " + wind + " Miles per Hour";
document.getElementById("humidity").innerHTML = "Humidity: " + humidity + "%";

// create vars for next function, taking lat and long from this data:
var nlat = data.coord["lat"];
var nlong = data.coord["lon"];

// call the next function for five day forecast:
fiveDayCall(nlat, nlong);  
    
});

// end of this function 
};

function fiveDayCall (nlat, nlong) {

var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + nlat + "&lon=" + nlong + "&appid=" + apiKey; 

    fetch(fiveDayURL)
    .then (function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);





});
};




// grab element by id, use textContent = humidity;
// city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed


