function getLocation() {
  if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
       var lat = Math.floor(position.coords.latitude);
       var long = Math.floor(position.coords.longitude);
       getWeather(lat, long);
        //console.log(getWeather(lat, long));
       //console.log(position.coords.latitude, position.coords.longitude);
    });
  } else {
    alert('Geolocation not supported. Please enable it');
  }
}

function getWeather(lat, long) {
  $.ajax({
    url: 'https://fcc-weather-api.glitch.me/api/current?', 
    data: {
      lat: lat,
      lon: long
    },
    type: 'GET',
    dataType: 'json',
    success: function(weatherData) { 
      //create setWeather function that contains all this
      var $temp = $('#temperature');
      var $icon = $('#icon');
      var $desc = $('#description');
      var weatherUnit = '';
      
      // United States, Libera, and Myanmar use the Imperial Unit system
      if (weatherData.sys.country === 'US' ||
         weatherData.sys.country === 'MM' ||
         weatherData.sys.country === 'LR') {
              weatherUnit = 'F'; 
             $temp.text('').append(celToFah(weatherData.main.temp) +  ' &deg;' + weatherUnit); 
      } else {
        weatherUnit = 'C';
        $temp.text('').append(fahToCel(weatherData.main.temp) +  ' &deg;' + weatherUnit);
      }
      
      $icon.append('<img src=' + weatherData.weather[0].icon + '>');
      $desc.append(weatherData.weather.description);
      getReading(weatherData.main.temp, weatherUnit);
        }
  });
}

function celToFah(cel) {
  return Math.floor((cel * 9 / 5) + 32);
}

function fahToCel(fah) {
  return Math.floor((fah - 32) * (5 / 9));
}

function getReading(temp, wunit) {

  let $conBtn = $('button'); 
  let $conBtnTxt = $('button').text();
  let $temp = $('#temperature');

  $conBtn.on('click', function() {
    if (wunit === 'F') {
        $temp.text('').append(celToFah(temp) + ' &deg;' + wunit);
        wunit = 'C';
        $conBtn.text('').text('Convert to Celsius');
    } else {
        $temp.text('').append(fahToCel(temp) + ' &deg;' + wunit);
        wunit = 'F';
        $conBtn.text('').text('Convert to Fahrenheit');
    }
  });
}

//Main Program
$(document).ready(function() {
  getLocation();
});