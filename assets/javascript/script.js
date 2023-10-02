// go from city to lat, long OK
// api call for lat, long OK
// display city data results OK
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

// end of data output, now connect data to html elements:

document.getElementById("main-header").innerHTML = cityName + " " + dateString.toDateString() + iconurl;
document.getElementById("temp").innerHTML = "Temp: " + temp + " ° F";
document.getElementById("wind").innerHTML = "Wind: " + wind + " Miles per Hour";
document.getElementById("humidity").innerHTML = "Humidity: " + humidity + " %";

// create vars for next function, taking lat and long from this data:
var nlat = data.coord["lat"];
var nlong = data.coord["lon"];

// call the next function for five day forecast:
fiveDayCall(nlat, nlong);  
// allow the five day forecast button to appear:
document.getElementById("futurecast").classList.remove("hide");
// call the history function:
history(cityName);


});

// search history code:
function history (cityName) {
var searches = [];
searches.push(cityName);
console.log(searches);

localStorage.setItem("index", JSON.stringify(searches));   
}; 

// end of this function 
};



function fiveDayCall (nlat, nlong) {

var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + nlat + "&lon=" + nlong + "&appid=" + apiKey + "&units=imperial";

    fetch(fiveDayURL)
    .then (function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

// day one data:
var dayOneDate = data.list[0].dt_txt;
var dayOneTemp = data.list[0].main["temp"];
var dayOneHumidity = data.list[0].main["humidity"];
var dayOneWind = data.list[0].wind["speed"];
var dayOneIcon = data.list[0].weather[0].icon;
// displaying data:
document.getElementById("oneDate").innerHTML = dayOneDate;
document.getElementById("oneIcon").innerHTML = dayOneIcon;
document.getElementById("oneTemp").innerHTML = "Temperature: " + dayOneTemp + " °F";
document.getElementById("oneWind").innerHTML = "Wind: " + dayOneWind + " Miles per Hour";
document.getElementById("oneHumd").innerHTML = "Humidity: " + dayOneHumidity + " %";

// describing the future weather button:
var fiveBtn = document.getElementById("futurecast");

fiveBtn.addEventListener("click", function() {
    document.getElementById("future").classList.remove("hide");
});

// day two data:
var dayTwoDate = data.list[8].dt_txt;
var dayTwoTemp = data.list[8].main["temp"];
var dayTwoHumidity = data.list[8].main["humidity"];
var dayTwoWind = data.list[8].wind["speed"];
var dayTwoIcon = data.list[8].weather[0].icon;
// display data:
document.getElementById("twoDate").innerHTML = dayTwoDate;
document.getElementById("twoIcon").innerHTML = dayTwoIcon;
document.getElementById("twoTemp").innerHTML = dayTwoTemp;
document.getElementById("twoWind").innerHTML = dayTwoWind;
document.getElementById("twoHumd").innerHTML = dayTwoHumidity;

// day three data:
var dayThree = data.list[16]
// day four data:
var dayFour = data.list[24]
// day five data:
var dayFive = data.list[32]







// console.log(dayOneDate, dayOneTemp, dayOneHumidity, dayOneWind, dayOneIcon)




});
};

