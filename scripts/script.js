/*  global $ axios */

var source1 = "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast"
var source2 = "https://api.data.gov.sg/v1/environment/4-day-weather-forecast"
var forecastData =[]
var tempData =[]
var option =[]
var status


//AXIO TO GET DATA FROM JSON FILE (local)
function getForecast(callback) {
  axios.get(source1)
    .then(function(response) {
      let result = response.data;
      console.log(result)
      callback(result)
    })
}
function getTemp(callback) {
  axios.get(source2)
    .then(function(response) {
      let result = response.data.items[0].forecasts;
      console.log(result)
      callback(result)
    })
}

getTemp(function(data){
  tempData = data;
  
  document.getElementById("forecast").innerHTML=tempData[0].forecast
  document.getElementById("humidity-high").innerHTML=tempData[0].relative_humidity.high
  document.getElementById("humidity-low").innerHTML=tempData[0].relative_humidity.low
  document.getElementById("temperature-high").innerHTML=tempData[0].temperature.high
  document.getElementById("temperature-low").innerHTML=tempData[0].temperature.low
  document.getElementById("wind-direction").innerHTML=tempData[0].wind.direction
  document.getElementById("wind-speed-high").innerHTML=tempData[0].wind.speed.high
  document.getElementById("wind-speed-low").innerHTML=tempData[0].wind.speed.low
  
})

getForecast( function(data) {
    forecastData = data
    status = forecastData.api_info.status
    document.getElementById("status").innerHTML = status;

    let forecastsArea = forecastData.items[0].forecasts

    var select = document.getElementById("select"); 
    for (let item in forecastsArea) {
      var el = document.createElement("option");
      el.textContent = forecastsArea[item].area;
      el.value = forecastsArea[item].area;
      select.appendChild(el);
    }
})

$ (function () {
  var d = new Date();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
      
  var strDate = weekday[d.getDay()] + " : " + d.getDate() + " Day " + (d.getMonth()+1) + " Month " + d.getFullYear() + " Year " ;
  $('#dateToday').text(strDate)
  
  $('#select').change(function(){
    // displayWeather()
    let forecastsArea = forecastData.items[0].forecasts
    for (let item in forecastsArea) {
      var select = $('#select').val()
      if (select == forecastsArea[item].area)
      $('#weather').text("The weather at "+ forecastsArea[item].area +" is expected to be "+forecastsArea[item].forecast)
    }
  })
  
})