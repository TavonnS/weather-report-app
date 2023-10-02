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
// this function also stores searches
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

// local storage code:
// storing searches:
localStorage.setItem(city, JSON.stringify(city));

// displaying searches:
document.getElementById("search-history").textContent = JSON.stringify(localStorage)
  
   
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

document.getElementById("main-header").innerHTML = cityName + " " + "(" + dateString.toDateString() + ")";
document.getElementById("temp").innerHTML = "Temp: " + temp + " ° F";
document.getElementById("wind").innerHTML = "Wind: " + wind + " Miles per Hour";
document.getElementById("humidity").innerHTML = "Humidity: " + humidity + " %";
document.getElementById("mainIcon").src = iconurl;

// create vars for next function, taking lat and long from this data:
var nlat = data.coord["lat"];
var nlong = data.coord["lon"];

// call the next function for five day forecast:
fiveDayCall(nlat, nlong);  
// allow the five day forecast button to appear:

document.getElementById("futurecast").classList.remove("hide");



// make border appear:
var resultsBox = document.getElementById("resultsBox");
resultsBox.style.border = "5px solid blue";

});

// end of this function 
};


// forecast function:
function fiveDayCall (nlat, nlong) {

// api call code:
var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + nlat + "&lon=" + nlong + "&appid=" + apiKey + "&units=imperial";
 
    fetch(fiveDayURL)
    .then (function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);


// describing the future weather button:
var fiveBtn = document.getElementById("futurecast");

fiveBtn.addEventListener("click", function() {
    document.getElementById("future").classList.remove("hide");
});



// day one data:
var dayOneDate = new Date(data.list[0].dt_txt);
var dayOneTemp = data.list[0].main["temp"];
var dayOneHumidity = data.list[0].main["humidity"];
var dayOneWind = data.list[0].wind["speed"];
var dayOneIconCode = data.list[0].weather[0].icon;
var day1Icon = "http://openweathermap.org/img/w/" + dayOneIconCode + ".png";
// displaying data:
document.getElementById("oneDate").innerHTML = dayOneDate.toDateString();
document.getElementById("one-icon").src = day1Icon;
document.getElementById("oneTemp").innerHTML = "Temperature: " + dayOneTemp + " °F";
document.getElementById("oneWind").innerHTML = "Wind: " + dayOneWind + " Miles per Hour";
document.getElementById("oneHumd").innerHTML = "Humidity: " + dayOneHumidity + " %";

// day two data:
var dayTwoDate = new Date(data.list[8].dt_txt);
var dayTwoTemp = data.list[8].main["temp"];
var dayTwoHumidity = data.list[8].main["humidity"];
var dayTwoWind = data.list[8].wind["speed"];
var dayTwoIconCode = data.list[8].weather[0].icon;
var day2Icon = "http://openweathermap.org/img/w/" + dayTwoIconCode + ".png";
// display data:
document.getElementById("twoDate").innerHTML = dayTwoDate.toDateString();
document.getElementById("two-icon").src = day2Icon;
document.getElementById("twoTemp").innerHTML = "Temperature: " + dayTwoTemp + " °F";
document.getElementById("twoWind").innerHTML = "Wind: " + dayTwoWind + " Miles per Hour";
document.getElementById("twoHumd").innerHTML = "Humidity: " + dayTwoHumidity + " %";

// day three data:
var dayThreeDate = new Date(data.list[16].dt_txt);
var dayThreeTemp = data.list[16].main["temp"];
var dayThreeHumidity = data.list[16].main["humidity"];
var dayThreeWind = data.list[16].wind["speed"];
var dayThreeIconCode = data.list[16].weather[0].icon;
var day3Icon = "http://openweathermap.org/img/w/" + dayThreeIconCode + ".png";
// display:
document.getElementById("threeDate").innerHTML = dayThreeDate.toDateString();
document.getElementById("three-icon").src = day3Icon;
document.getElementById("threeTemp").innerHTML = "Temperature: " + dayThreeTemp + " °F"; 
document.getElementById("threeWind").innerHTML = "Wind: " + dayThreeWind + " Miles per Hour";
document.getElementById("threeHumd").innerHTML = "Humidity: " + dayThreeHumidity + " %";

// day four data:
var dayFourDate = new Date(data.list[24].dt_txt);
var dayFourTemp = data.list[24].main["temp"];
var dayFourHumidity = data.list[24].main["humidity"];
var dayFourWind = data.list[24].wind["speed"];
var dayFourIconCode = data.list[24].weather[0].icon;
var day4Icon = "http://openweathermap.org/img/w/" + dayFourIconCode + ".png";
// display:
document.getElementById("fourDate").innerHTML = dayFourDate.toDateString();
document.getElementById("four-icon").src = day4Icon;
document.getElementById("fourTemp").innerHTML = "Temperature: " + dayFourTemp + " °F";
document.getElementById("fourWind").innerHTML = "Wind: " + dayFourWind + " Miles per Hour";
document.getElementById("fourHumd").innerHTML = "Humidity: " + dayFourHumidity + " %";

// day five data:
var dayFiveDate = new Date(data.list[32].dt_txt);
var dayFiveTemp = data.list[32].main["temp"];
var dayFiveHumidity = data.list[32].main["humidity"];
var dayFiveWind = data.list[32].wind["speed"];
var dayFiveIconCode = data.list[32].weather[0].icon;
var day5Icon = "http://openweathermap.org/img/w/" + dayFiveIconCode + ".png";
// display:
document.getElementById("fiveDate").innerHTML = dayFiveDate.toDateString();
document.getElementById("five-icon").src = day5Icon;
document.getElementById("fiveTemp").innerHTML = "Temperature: " + dayFiveTemp + " °F";
document.getElementById("fiveWind").innerHTML = "Wind: " + dayFiveWind + " Miles per Hour";
document.getElementById("fiveHumd").innerHTML = "Humidity: " + dayFiveHumidity + " %";

});
};

 