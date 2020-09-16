$(document).ready(function () {
  console.log("Hello World!");

  // api link to the top list of satellites from uphere.space 
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

});
