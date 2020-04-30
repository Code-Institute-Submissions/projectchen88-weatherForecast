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
function displayDailyForecast( day ) {
  document.getElementById("forecast-title").innerHTML=tempData[day].date
  document.getElementById("forecast").innerHTML=tempData[day].forecast
  document.getElementById("humidity-high").innerHTML=tempData[day].relative_humidity.high
  document.getElementById("humidity-low").innerHTML=tempData[day].relative_humidity.low
  document.getElementById("temperature-high").innerHTML=tempData[day].temperature.high
  document.getElementById("temperature-low").innerHTML=tempData[day].temperature.low
  document.getElementById("wind-direction").innerHTML=tempData[day].wind.direction
  document.getElementById("wind-speed-high").innerHTML=tempData[day].wind.speed.high
  document.getElementById("wind-speed-low").innerHTML=tempData[day].wind.speed.low

}
getTemp(function(data){
  tempData = data;
  tempData.count = 0 // tracker for the day result that is displayed
  displayDailyForecast (tempData.count)
  document.getElementById("forecast").innerHTML=tempData[0].forecast
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
  $('#prev-day').hide();
  
  // Set the date of today to be displayed
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
  
  // Detect for change in option change in selection of area and display the weather
  $('#select').change(function(){
    // displayWeather()
    let forecastsArea = forecastData.items[0].forecasts
    for (let item in forecastsArea) {
      var select = $('#select').val()
      if (select == forecastsArea[item].area)
      $('#weather').text("The weather at "+ forecastsArea[item].area +" is expected to be "+forecastsArea[item].forecast)
    }
  })
  
  // Detect for change to view. forecast for next day
  $('#next-day').click( function () {
    if (tempData.count < 3) {
      tempData.count ++ ;
      displayDailyForecast(tempData.count)
      if (tempData.count >= 3) {
        $('#next-day').hide()
      } 
      $('#prev-day').show()
    }
  })
  
  $('#prev-day').on('click', function () {
   if (tempData.count >= 0) {
      tempData.count -- ;
      displayDailyForecast(tempData.count)
      if (tempData.count <= 0 ) {
        $('#prev-day').hide()
      } 
      $('#next-day').show()
    }
  })
})