$(document).ready(function() {
    console.log("Hello World!");

// grab and connect html elements
var dayTimeHeader = $("#date-time-header");
var startBtn = $("#start-btn");
$("#start-btn").click(function(){
    console.log("You clicked me!");
})



// Variable for NeoWs URL with API key.
var apiNeoWsURL = "https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=Bgi1uiAMfef2QgydlF1ezKjCgeb3OdGfrj7B87wv";
// this function calls the AJAX pull for NeoWs object.
function asteroidNeoWs(){
$.ajax({
    url: apiNeoWsURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
        console.log(response);
        var jplURL = response.near_earth_objects["2020-09-16"][0].nasa_jpl_url;
        console.log(jplURL)
        // Potential data to grab: name, potential size, observable date range, distance from the earth at closest point, speed of travel, nasa_jpl_url
    });
}
asteroidNeoWs();

  console.log("Hello World!");

  // api link to the top list of satellites from uphere.space
  // create the upHereSpace function 
  function upHereSpace (){
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://uphere-space1.p.rapidapi.com/satellite/top?days=1",
    method: "GET",
    headers: {
      "x-rapidapi-host": "uphere-space1.p.rapidapi.com",
      "x-rapidapi-key": "4b53b200a5msh2b293e52ffd17d9p106b4bjsn85a2dc5edf19",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    // grab the satellites name
    var satName = response[0].name;
    console.log(satName);
    // grab the related satellites number 
    var satNumber = response[0].number;
    console.log(satNumber);
  });
}


});
