$(document).ready(function() {
    console.log("Hello World!");

var apiNeoWsURL = "https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=Bgi1uiAMfef2QgydlF1ezKjCgeb3OdGfrj7B87wv";

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
    
});