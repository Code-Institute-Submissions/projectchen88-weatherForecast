/*  global $ axios */

var source1 = "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast"
var source2 = "https://api.data.gov.sg/v1/environment/4-day-weather-forecast"
var forecastData, tempData =[]
var option =[]
var status


//AXIO TO GET DATA FROM JSON FILE (local)
function getForecast(callback) {
  axios.get(source1)
    .then(function(response) {
      let result = response.data;
      // console.log(result)
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

getForecast( function(forecastData) {
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
    getTemp(function (tempData) {
    })
})

