$(document).ready(function () {
  var currentTime = moment().format("YYYY-MM-DDThh:mm:ss" + "+00:00");
  var dateTime = moment().format("dddd, MMMM Do");
  var raTime = parseInt(moment().utc().format("HH"));
  var currentDay = moment().utc().format("YYYY-MM-DD");
  var coords = JSON.parse(localStorage.getItem("latLon"));
  $("#currentDay").text(dateTime);
console.log(coords)
  if (coords === null){
    getLocation();
  }
  $("#start-btn").attr("href", "./sunrise.html");

  $(window).on("load", function () {
    $(".background1").addClass("fadein");
    $(".background2").addClass("fadein");
  });

  $("#starBtn").on("click", function () {
    $(".frame").html("");
    $(".starInfo").html("");
    // console.log("starBtn was clicked");
    skyMap(coords.lat, coords.lon);
    nasaPicOfDay();
  });

  function skyMap(lat, lon) {
    lon = parseFloat(lon);
    if (lon < 0) {
      lon = lon + 360;
      lon = lon / 15;
    } else {
      lon = lon / 15;
    }
    var fixedRA = lon;
    if (fixedRA + raTime > 24){
      fixedRA = fixedRA + raTime -24;
    } else{
      fixedRA = fixedRA + raTime
    }

    var ra = fixedRA.toString();
    
    var skyMapURL =
      "http://server1.sky-map.org/skywindow.jsp?img_source=SDSS&zoom=6&ra=" +
      ra +
      "&de=" +
      lat;
    var exploreText = $("<h3>").text("Explore the Stars Above You");
    var skyIframe = $("<iframe>").attr("src", skyMapURL);
    skyIframe.attr("width", "100%");
    skyIframe.attr("height", 400);
    $(".frame").append(exploreText, skyIframe);
    
  }
  function nasaPicOfDay() {
    var astroPicURL =
      "https://api.nasa.gov/planetary/apod?api_key=Bgi1uiAMfef2QgydlF1ezKjCgeb3OdGfrj7B87wv&date=" + currentDay;
    $.ajax({
      url: astroPicURL,
      method: "GET",
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function (response) {
        var imageOfTheDay = response.hdurl;
        var imageEx = response.explanation;
        console.log(response);

        var iotdEl = $("<img>").attr("src", imageOfTheDay).addClass("iotdSize");
        var iotdExEl = $("<p>").text(imageEx);
        var iotdTitle = $("<h5>").text("NASA Image of the Day:")

        $(".starInfo").append(iotdTitle, iotdEl, iotdExEl);
      });
    }
 

//   function skyMapInfo(lat, lon) {
//     lon = parseFloat(lon);
//     if (lon < 0){
//       lon = lon + 360;
//       lon = lon / 15;
//     } else {
//       lon = lon / 15;
//     }
//     var fixedRA = lon;
//     if (fixedRA + raTime > 24){
//       fixedRA = fixedRA + raTime -24;
//     } else{
//       fixedRA = fixedRA + raTime
//     }
//     var ra = fixedRA.toString();
//     var skyMapInfoURL = "https://cors-anywhere.herokuapp.com/http://server2.sky-map.org/getstars.jsp?ra=" + ra + "&de=" + lat + "&angle=5&max_stars=10&max_vmag=8"   
//     $.ajax({
//       type: "GET",
//       url: skyMapInfoURL,
//       dataType: "xml",
//       error: function (e) {
//           alert("An error occurred while processing XML file");
//       },
//       success: function (response) {   
//   }
// })
//   }
  // skyMapInfo(coords.lat, coords.lon);

  // grab and connect html elements
  // $(document).mouseup(function(e){
  //     var satCard = $("#satellite-option");
  
  //     // if the target of the click isn't the container nor a descendant of the container
  //     if (!satCard.is(e.target) && satCard.has(e.target).length === 0) 
  //     {
  //       satCard.hide();
  //     }
  // });
  // $(document).mouseup(function(e){
  //     var astCard = $("#asteroid-option");
  
  //     // if the target of the click isn't the container nor a descendant of the container
  //     if (!astCard.is(e.target) && astCard.has(e.target).length === 0) 
  //     {
  //       astCard.hide();
  //     }
  // });

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
  
  function showPosition(position) {
    // Grab coordinates from the given object
    var lat = position.coords.latitude.toFixed(4);
    var lon = position.coords.longitude.toFixed(4);
    // console.log("Your coordinates are Latitude: " + lat + " Longitude " + lon);
    var latLon = { lat: lat, lon: lon };
    localStorage.setItem("latLon", JSON.stringify(latLon));
    document.location.reload()
    // this function launches the sky-map window of the stars relevant to users current location.
  }
  
  function sunriseSunset(lat, lon) {
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
  sunriseSunset(coords.lat, coords.lon);
  // api link to the top list of satellites from uphere.space
  function upHereSpace(lat, lon) {
    
      var settings = {
        async: true,
        crossDomain: true,
        url:
          "https://uphere-space1.p.rapidapi.com/user/visible?lat=" +
          lat +
          "&lng=" +
          lon,
        method: "GET",
        headers: {
          "x-rapidapi-host": "uphere-space1.p.rapidapi.com",
          "x-rapidapi-key":
            "4b53b200a5msh2b293e52ffd17d9p106b4bjsn85a2dc5edf19",
        },
      };

      $.ajax(settings).done(function (response) {
        console.log(response);
        // satellite longitude
        var satLon = response[0].coordinates[0];
        console.log(satLon);
        // satellite latitude
        var satLat = response[0].coordinates[1];
        console.log(satLat);
        // sat name
        var satName = response[0].name;
        // console.log("Satellite name: " + satName);
        var satNumber = response[0].number;
        console.log("Satellite number: " + satNumber);

        // dynamically populate the sunrise html page with response information
        $(".cardOne-title").text("Satellite: " + satName);
        $("#satellite").addClass("d-none");
        $(".cardOne-text").text("Number: " + satNumber);

        // add a mini map to identify the satellite above
        var myMap = L.map("map", {
          center: [satLat, satLon],
          zoom: 2,
        });
        
        // generate a custom icon to show as the satellite 
        var satIconFloat = L.icon({
          iconUrl: "./assets/images/satellite-icon.png",
          iconSize: [50, 40],
          iconAnchor: [25, 16],
      });

        var marker = L.marker([0, 0]).addTo(myMap);
        L.tileLayer(
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
          {
            attribution:
              "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: "mapbox/streets-v11",
            accessToken:
              "pk.eyJ1Ijoid2FybXNvZGFwb3AiLCJhIjoiY2tmYml4dnk0MDJ2ejJ6bnM1aXdxdDhxcCJ9.5MIm6wAYHJDqLd4jTvhW0g",
          }
        ).addTo(myMap);

        marker.setLatLng([satLat,satLon], {icon: satIconFloat});

      });
      // display functionality of the satellite option
      $(".switch-btn-one").on("click", function () {
        $("#satellite-option").attr("style", "display: inline-block");
        $(".switch-btn-one").attr("style", "display: none");
      });
  
  }
  upHereSpace(coords.lat, coords.lon);

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
        var randomNum = Math.floor(Math.random() * 5);
    console.log(randomNum)
        var jplURL = response.near_earth_objects[currentDay][randomNum].nasa_jpl_url + ";old=0;orb=1;cov=0;log=0;cad=0#orb";
        // asteroid size in diameter
        var asteroidSize = Math.round(
          response.near_earth_objects[currentDay][randomNum].estimated_diameter.feet
            .estimated_diameter_max
        );
        // closest approach dat and time
        var asteroidNear =
          response.near_earth_objects[currentDay][randomNum].close_approach_data[0]
            .close_approach_date_full;
        // asteroid hazard check
        var hazardCheck =
          response.near_earth_objects[currentDay][randomNum]
            .is_potentially_hazardous_asteroid;
        // asteroid speed in MPH
        var relativeVel = Math.round(
          response.near_earth_objects[currentDay][randomNum].close_approach_data[0]
            .relative_velocity.miles_per_hour
        );
        // console.log(response);

        // Potential data to grab: name, potential size, observable date range, distance from the earth at closest point, speed of travel, nasa_jpl_url
        var asteroidObjName = response.near_earth_objects[currentDay][randomNum].name;
        var asteroidIdNumber = response.near_earth_objects[currentDay][randomNum].id;
        // dynamically populate the second button option
        $(".cardTwo-title").text("Asteroid name: " + asteroidObjName);
        $(".cardTwo-text").text("ID number: " + asteroidIdNumber);
        var astLink = $("<a>");
        astLink.attr("href", jplURL);
        astLink.attr("target", "_blank");
        astLink.text("NASA Link");
        $("#asteroid-link").append(astLink);
        $("#asteroid-speed").append(
          "Asteroid velocity: " + relativeVel + "MPH"
        );
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

  
//   function wikiAPI() {
//     var wikiURL =  "https://cors-anywhere.herokuapp.com/http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=breaking%20distant%20light"
//         // "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&prop=images&prop=revisions&rvprop=content&rvsection=0&titles=Kenny%20Chesney";
//     $.ajax({
//             url: wikiURL,
//             method: "GET",
//         })
//         // We store all of the retrieved data inside of an object called "response"
//         .then(function(response) {
//             console.log(response);
            
//         });
// }
// wikiAPI();

});
