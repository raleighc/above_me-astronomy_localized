$(document).ready(function () {
  var currentTime = moment().format("YYYY-MM-DDThh:mm:ss" + "+00:00");
  var dateTime = moment().format("dddd, MMMM Do");
  var currentDay = moment().utc().format("YYYY-MM-DD");
  var coords = JSON.parse(localStorage.getItem("latLon"));

  $("#currentDay").text(dateTime);
  // console.log(currentTime);

  $(window).on("load", function () {
    $(".background1").addClass("fadein");
    $(".background2").addClass("fadein");
  });
  var starMainEl = $("#starMain");
  var jumboStar = $("<div>").addClass("jumbotron jumbotron-fluid");
  
  $("#starBtn").on("click", function () {
    $("#starInfo").html("");
    starMainEl.html("")
    // console.log("starBtn was clicked");
    skyMap(coords.lat, coords.lon);
    
    
    var starContainer = $("<div>").addClass("container");
    var starTitle = $("<h3>").addClass("display-4").text("Today's Star");
    

    starContainer.append(starTitle);
    jumboStar.append(starContainer);
    starMainEl.append(jumboStar)
  });

  function skyMap(lat, lon) {
    lon = parseFloat(lon);
    if (lon < 0){
      lon = lon + 360;
      lon = lon / 15;
    } else {
      lon = lon / 15;
    }
    var ra = lon.toString();
    
    var skyMapURL =
      "http://server1.sky-map.org/skywindow.jsp?img_source=SDSS&zoom=6&ra=" +
      ra +
      "&de=" +
      lat;

    var skyIframe = $("<iframe>").attr("src", skyMapURL);
    skyIframe.attr("width", 400);
    skyIframe.attr("height", 300);
    starMainEl.prepend(skyIframe);
  }
  function skyMapInfo(lat, lon) {
    lon = parseFloat(lon);
    if (lon < 0){
      lon = lon + 360;
      lon = lon / 15;
    } else {
      lon = lon / 15;
    }
    var ra = lon.toString();
    var skyMapInfoURL = "https://cors-anywhere.herokuapp.com/http://server2.sky-map.org/getstars.jsp?ra=" + ra + "&de=" + lat + "&angle=5&max_stars=10&max_vmag=8"
    
    
    $.ajax({
      type: "GET",
      url: skyMapInfoURL,
      dataType: "xml",

      error: function (e) {
          alert("An error occurred while processing XML file");
          console.log("XML reading Failed: ", e);
      },

      success: function (response) {
        // console.log(response);
        
  }
})
  }

  skyMapInfo(coords.lat, coords.lon);

  // grab and connect html elements
  var startingPage = $("#starting-page");
  var resultPage = $("#result-page");
  var dayTimeHeader = $("#date-time-header");
  var startBtn = $("#start-btn");
  //create an onclick function for the start-button
  $("#start-btn").on("submit", function () {
    // console.log("You clicked me!");
    // show the result page and hide the starting page
    // startingPage.attr("style", "display: none");
    // resultPage.attr("style", "display: inline");
  });
  // this function retrieves the users location from their browser window.
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      // console.log(showPosition);
    } else {
      alert("This site requires geolocation to be shared.");
    }
  }
  getLocation();
  function showPosition(position) {
    // Grab coordinates from the given object
    var lat = position.coords.latitude.toFixed(4);
    var lon = position.coords.longitude.toFixed(4);
    // console.log("Your coordinates are Latitude: " + lat + " Longitude " + lon);
    var latLon = { lat: lat, lon: lon };
    localStorage.setItem("latLon", JSON.stringify(latLon));
    // this function launches the sky-map window of the stars relevant to users current location.
    sunriseSunset();
    function sunriseSunset() {
      var sunriseURL =
        "https://api.sunrise-sunset.org/json?lat=" +
        lat +
        "&lng=" +
        lon +
        "&formatted=0";

      $.ajax({
        url: sunriseURL,
        method: "GET",
      }).then(function (response) {
        var sunRise = response.results.sunrise;
        var currentSunRise = new Date(sunRise);
        var sunSet = response.results.sunset;
        var currentSunSet = new Date(sunSet);
        var now = new Date();
        // console.log(now);
        // console.log(currentSunRise);
        if (now > currentSunRise && now < currentSunSet) {
          $("#start-btn").attr("href", "./sunrise.html");
        } else {
          $("#start-btn").attr("href", "./sunset.html");
        }
      });
    }
  }

  // api link to the top list of satellites from uphere.space
  function upHereSpace() {
    // grab the users current longitude and latitude coordinates
    navigator.geolocation.getCurrentPosition(function (position) {
      //   console.log("latitude coordinate: " + position.coords.latitude);
      //   console.log("longitude coordinate: " + position.coords.longitude);
      var userLat = position.coords.latitude;
      var userLng = position.coords.longitude;

      var settings = {
        async: true,
        crossDomain: true,
        url:
          "https://uphere-space1.p.rapidapi.com/user/visible?lat=" +
          userLat +
          "&lng=" +
          userLng,
        method: "GET",
        headers: {
          "x-rapidapi-host": "uphere-space1.p.rapidapi.com",
          "x-rapidapi-key":
            "4b53b200a5msh2b293e52ffd17d9p106b4bjsn85a2dc5edf19",
        },
      };

      $.ajax(settings).done(function (response) {
        // console.log(response);
        var satName = response[0].name;
        // console.log("Satellite name: " + satName);
        var satNumber = response[0].number;
        // console.log("Satellite number: " + satNumber);

        // dynamically populate the sunrise html page with response information
        $(".cardOne-title").text("Satellite: " + satName);
        $("#satellite").addClass("d-none");
        $(".cardOne-text").text("Number: " + satNumber);
      });

      $(".switch-btn-one").on("click", function () {
        $("#satellite-option").attr("style", "display: inline-block");
        $(".switch-btn-one").attr("style", "display: none");
      });
    });
  }
  upHereSpace();

 var targetPractice = $("#external-script").innerHTML;
//  console.log(targetPractice);
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
      .then(function (response) {
        // console.log(response);
        var jplURL = response.near_earth_objects[currentDay][0].nasa_jpl_url;
        // asteroid size in diameter
        var asteroidSize = Math.round(
          response.near_earth_objects[currentDay][0].estimated_diameter.feet
            .estimated_diameter_max
        );
        // closest approach dat and time
        var asteroidNear =
          response.near_earth_objects[currentDay][0].close_approach_data[0]
            .close_approach_date_full;
        // asteroid hazard check
        var hazardCheck =
          response.near_earth_objects[currentDay][0]
            .is_potentially_hazardous_asteroid;
        // asteroid speed in MPH
        var relativeVel = Math.round(
          response.near_earth_objects[currentDay][0].close_approach_data[0]
            .relative_velocity.miles_per_hour
        );
        // console.log(response);
      
        // Potential data to grab: name, potential size, observable date range, distance from the earth at closest point, speed of travel, nasa_jpl_url
        var asteroidObjName = response.near_earth_objects[currentDay][0].name;
        var asteroidIdNumber = response.near_earth_objects[currentDay][0].id;
        // dynamically populate the second button option
        $(".cardTwo-title").text("Asteroid name: " + asteroidObjName);
        $(".cardTwo-text").text("ID number: " + asteroidIdNumber);
        var astLink = $("<a>");
        astLink.attr("href", jplURL);
        astLink.attr("target", "_blank");
        astLink.text("NASA Link");
        $("#asteroid-link").append(astLink);
        $("#asteroid-speed").append("Asteroid velocity: " + relativeVel + "MPH");
        $("#asteroid-size").append(
          "Max estimated diameter in feet: " + asteroidSize
        );
        $("#asteroid-close").append("Closest approach: " + asteroidNear);
        $("#asteroid-hazard").append("Is asteroid hazardous: " + hazardCheck);
      });
    $(".switch-btn-two").on("click", function () {
      $("#asteroid-option").attr("style", "display: inline-block");
      $(".switch-btn-two").attr("style", "display: none");
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
      .then(function (response) {
        // console.log(response);
        var imageOfTheDay = response.hdurl;
        // console.log(imageOfTheDay);
      });
  }
  nasaPicOfDay();

  function wikiAPI() {
    var wikiURL =
        "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&revids=347819%7C5487%7C548945&formatversion=2";
    $.ajax({
            url: wikiURL,
            method: "GET",
        })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
            console.log(response);
            
        });
}
wikiAPI();

});
