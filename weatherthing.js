// /* Does your browser support geolocation? */
// if ("geolocation" in navigator) {
//   $('.js-geolocation').show(); 
// } else {
//   $('.js-geolocation').hide();
// }
// /* Where in the world are you? */
// $('.js-geolocation').on('click', function() {
//   navigator.geolocation.getCurrentPosition(function(position) {
//     loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
//   });
// });
/* 
 * Test Locations
 * Denver lat/long: 39.740002, -104.991997
 * Denver WOEID: 2391279
 */

 $(document).ready(function() {
    loadWeather('Denver', '2391279'); //@params location, woeid
    setInterval(loadWeather, 600000); //Update the weather every 10 minutes.
  });

 function loadWeather(location, woeid) {
  $.simpleWeather({
    woeid: woeid,
    location: location,
    unit: 'f',
    success: function(weather) {
            // html =  '<div class="location"><span class="city">'+weather.city+'</span><span class="state">'+weather.region+'</span> </div><ul>';
            // html += '<li></li><li><div id="weathercode">'+weather.code+'</div></li><li>'+weather.temp+'&deg;</li>';
            // for(var i=0;i<5;i++) {
            //   html += '<li>'+weather.forecast[i].high+'&deg;</li>';
            // }

             //Current weather
            html2 = '<div class="location"><div id="weathercode">' + weather.code + '</div> <div id ="temp">' + weather.temp + '&deg;</div>';
            //Left sidebar city, state
            html2 += '<span class="city">' + weather.city + '</span><span class="state">' + weather.region + '</span></div>';
           
            //lows
            html2 += '<div class="row">';
            for (var i = 0; i < 3; i++) {
              html2 += '<div class="col b"><div id="b' + i + '">' + weather.forecast[i].low + '&deg;</div></div>';
            }
            html2 += '</div>';
            //highs
            html2 += '<div class="row">';
            for (var i = 0; i < 3; i++) {
              html2 += '<div class="col a"><div id="a' + i + '">' + weather.forecast[i].high + '&deg;</div></div>';
            }
            html2 += '</div>';
            //weekdays
            html2 += '<div class="row">';
            html2 += '<div class="col day"><div id="c0">Today</div></div>';
            for (var i = 1; i < 3; i++) {
              html2 += '<div class="col day"><div id="c' + i + '">' + weather.forecast[i].day + '</div></div>';
            }
            html2 += '</div>';




            
            $("article").attr("class", "forecast");
            //$("#weather").html(html);
            $("#weather2").html(html2);



            //change .location bg color
            var sunset = new Date();
            sunset = moment(weather.sunset, "h:mm A");

            var sunrise = new Date();
            sunrise = moment(weather.sunrise, "h:mm A");

            var currTime = moment();

            if (moment(currTime).isAfter(sunrise) && moment(currTime).isBefore(sunset)) {
              //daytime
              $(".location").attr("id", "day");
              $("article").attr("id", "day");

            } 
            else if (moment(currTime).isSame(sunset)) {
                //sunset
                $(".location").attr("id", "sunset");
                $("article").attr("id", "sunset");
              }
              else if (moment(currTime).isAfter(sunset) ) {
                //after sunset, night time
                $(".location").attr("id", "night");
                $("article").attr("id", "night");
              }
              else if (moment(currTime).isSame(sunrise) ){
                //dawn
                $(".location").attr("id", "sunrise");
                $("article").attr("id", "sunrise");
              }




            },
            error: function(error) {
              $("#weather2").html('<p>' + error + '</p>');
            }
          });
}