/*  global $ axios */

var dataSource = "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast"
var data =[]
var option =[]
var status


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
    status = data.api_info.status
    document.getElementById("status").innerHTML = status;

    let forecasts = data.items[0].forecasts
    document.getElementById("area").innerHTML = forecasts[0].area;

    var select = document.getElementById("select"); 
    for (let item in forecasts) {
      var el = document.createElement("option");
      el.textContent = forecasts[item].area;
      el.value = forecasts[item].area;
      select.appendChild(el);
    }
    
    console.log(forecasts)
})



// $ (function() {
  
  
//   $('#select').empty();
//   $.each(option, function(i, p) {
//       $('#select').append($('<option></option>').val(p).html(p));
//   });
  
// })