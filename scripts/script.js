var dataSource = "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast"
var data =[]

//AXIO TO GET DATA FROM JSON FILE (local)
function getData(callback) {
  axios.get(dataSource)
    .then(function(response) {
      let result = response.data;
      console.log(result)
      callback(result)
    })
}

getData( function(data) {
    let status = data.api_info.status
    let forecasts = data.items[0].forecasts

    console.log(status)
    console.log(forecasts)
})

$(function() { 
  alert('jquery set up')
})
