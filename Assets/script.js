$(document).ready(function() {
    //   console.log("Hello World!");

  // grab and connect html elements
  var startingPage = $("#starting-page");
  var resultPage = $("#result-page");
  var dayTimeHeader = $("#date-time-header");
  var startBtn = $("#start-btn");
  //create an onclick function for the start-button
  $("#start-btn").click(function () {
    console.log("You clicked me!");
    // show the result page and hide the starting page 
    startingPage.attr("style", "display: none");
    resultPage.attr("style", "display: inline");
  });

  // api link to the top list of satellites from uphere.space
  function upHereSpace(){

// grab the users current longitude and latitude coordinates 
 navigator.geolocation.getCurrentPosition(function(position){
     console.log("latitude coordinate: " + position.coords.latitude);
     console.log("longitude coordinate: " + position.coords.longitude);
     var userLat = position.coords.latitude
     var userLng = position.coords.longitude

  var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://uphere-space1.p.rapidapi.com/user/visible?lat=" + userLat + "&lng=" + userLng, 
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "uphere-space1.p.rapidapi.com",
		"x-rapidapi-key": "4b53b200a5msh2b293e52ffd17d9p106b4bjsn85a2dc5edf19"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
    var satName = response[0].name
    console.log("Satellite name: " + satName);
    var satNumber = response[0].number
    console.log("Satellite number: " + satNumber);
    });
    
});
}
  upHereSpace();

  // Variable for NeoWs URL with API key.

    // this function calls the AJAX pull for NeoWs object.
    function asteroidNeoWs() {
        var apiNeoWsURL =
            "https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=Bgi1uiAMfef2QgydlF1ezKjCgeb3OdGfrj7B87wv";
        $.ajax({
                url: apiNeoWsURL,
                method: "GET",
            })
            // We store all of the retrieved data inside of an object called "response"
            .then(function(response) {
                console.log(response);
                var jplURL = response.near_earth_objects["2020-09-17"][0].nasa_jpl_url;
                console.log(jplURL);
                // Potential data to grab: name, potential size, observable date range, distance from the earth at closest point, speed of travel, nasa_jpl_url
            });
    }
    asteroidNeoWs();

    function nasaPicOfDay() {
        var astroPicURL =
            "https://api.nasa.gov/planetary/apod?api_key=Bgi1uiAMfef2QgydlF1ezKjCgeb3OdGfrj7B87wv&date=2020-08-14";
        $.ajax({
                url: astroPicURL,
                method: "GET",
            })
            // We store all of the retrieved data inside of an object called "response"
            .then(function(response) {
                // console.log(response);
                var imageOfTheDay = response.hdurl;
                // console.log(imageOfTheDay);
            });
    }
    nasaPicOfDay();

    var sunriseURL = "https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&callback=mycallback";
    console.log(sunriseURL);

    function sunriseSunset() {
        $.ajax({
            url: sunriseURL,
            method: "GET"
        })

        .then(function(response) {
            console.log(response.mycallback);

        })

    }
});