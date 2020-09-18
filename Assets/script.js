$(document).ready(function () {
  $(window).on("load", function () {
    $(".background1").addClass("fadein");
  });
  console.log("Hello World!");
  console.log(window);

  
  
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
    console.log("Your coordinates are Latitude: " + lat + " Longitude " + lon);

    sunriseSunset();
    // this function launches the sky-map window of the stars relevant to users current location.

    function sunriseSunset() {
      var sunriseURL =
        "https://api.sunrise-sunset.org/json?lat=" +
        lat +
        "&lng=" +
        lon +
        "&formatted=0";
      console.log(sunriseURL);
      $.ajax({
        url: sunriseURL,
        method: "GET",
      }).then(function (response) {
        var sunRise = response.results.sunrise;
        var sunSet = response.results.sunset;
        console.log(response);
      });
    }

    function skyMap() {
      var skyMapURL =
        "http://server1.sky-map.org/skywindow.jsp?img_source=SDSS&zoom=10&ra=" +
        lon +
        "&de=" +
        lat;

      var skyIframe = $("<iframe>").attr("src", skyMapURL);
      skyIframe.attr("width", 400);
      skyIframe.attr("height", 300);
      $(".container").append(skyIframe);
    }
    // skyMap();
  }

  // grab and connect html elements
  var dayTimeHeader = $("#date-time-header");
  var startBtn = $("#start-btn");
  $("#start-btn").click(function () {
    // console.log("You clicked me!");
  });

  // api link to the top list of satellites from uphere.space
  function upHereSpace() {
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
      // console.log(response);
      // grab the satellites name
      var satName = response[0].name;
      // console.log(satName);
      // grab the related satellites number
      var satNumber = response[0].number;
      // console.log(satNumber);
    });
  }

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
        var jplURL = response.near_earth_objects["2020-09-17"][0].nasa_jpl_url;

        // Potential data to grab: name, potential size, observable date range, distance from the earth at closest point, speed of travel, nasa_jpl_url
      });
  }
  // asteroidNeoWs();

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
});
$(document).ready(function () {
  //   console.log("Hello World!");

  // grab and connect html elements
  var dayTimeHeader = $("#date-time-header");
  var startBtn = $("#start-btn");
  $("#start-btn").click(function () {
    console.log("You clicked me!");
  });

  // api link to the top list of satellites from uphere.space
  function upHereSpace() {
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
      // console.log(response);
      // grab the satellites name
      var satName = response[0].name;
      // console.log(satName);
      // grab the related satellites number
      var satNumber = response[0].number;
      // console.log(satNumber);
    });
  }

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
        console.log(response);
        var jplURL = response.near_earth_objects["2020-09-18"][0].nasa_jpl_url;
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
      .then(function (response) {
        // console.log(response);
        var imageOfTheDay = response.hdurl;
        // console.log(imageOfTheDay);
      });
  }
  nasaPicOfDay();
});
