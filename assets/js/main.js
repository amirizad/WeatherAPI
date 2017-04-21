$(document).ready(function(){
	var appID = "f6e6d10e595498f943f0b7887520c9aa";

	$('.query_btn').click(function(event){
		var query_param = $(this).prev().val();
		var searchBy = $(this).prev().attr('placeholder');
		var apiURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&";
		$('#alert').css('display','none');

		if(query_param.length > 0){
			if( searchBy == 'City'){
				var weather = apiURL + "q=" + query_param + "&APPID=" + appID;
				$('#zip-input').val('');
			}else if(searchBy == 'Zip Code'){
				var weather = apiURL + "zip=" + query_param + "&APPID=" + appID;;
				$('#city-input').val('');
			};

			$.getJSON(weather, function() {
			  console.log( "success" );
			})
			  .done(function(json) {
					var imgURL = "http://openweathermap.org/img/w/";
					$('#city-input').val(json.name);
					$('#city').html(json.name);
					$('#main_weather').html(json.weather[0].main);
					$('#description_weather').html(json.weather[0].description);
					$('#weather_image').attr("src", imgURL + json.weather[0].icon + ".png");
					$('#temperature').html(json.main.temp);
					$('#unit').html('&deg;F');
					fahrenheit = true;
					$('#pressure').html(json.main.pressure + ' hPa');
					$('#humidity').html(json.main.humidity + '%');
					$('#windspeed').html(json.wind.speed + ' MPH');
					$('#winddir').html(degToDir(json.wind.deg));
			  })
			  .fail(function() {
					$('#alert').css('display','block')
							.text('Please enter accurate data, either City Name or Zip Code.');
			  })
		}else{
			$('#alert').css('display','block')
								 .text('Please enter accurate data, either City Name or Zip Code.');
			event.preventDefault();
		};
	});

	var fahrenheit  = true;
	
	// kelvin to celsius is easy: Just subtract 273.15

	$('#convertToCelsius').click(function() {
		var tempTXT = $('#temperature').text();
		if(tempTXT.length > 0){
			if(fahrenheit){
				$('#temperature').text((((tempTXT - 32) * 5) / 9).toFixed(2));
				$('#unit').text(String.fromCharCode(176) + 'C');
			};
			fahrenheit = false;
		};
	});

	$('#convertToFahrenheit').click(function() {
		var tempTXT = $('#temperature').text();
		if(tempTXT.length > 0){
			if(!fahrenheit){
				$('#temperature').text(((tempTXT * (9 / 5)) + 32).toFixed(2));
				$('#unit').text(String.fromCharCode(176) + 'F');
			};
			fahrenheit = true;
		};
	});
});

function degToDir(deg){
	var windDir = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW','N'];
	var dirIndex = Math.round(parseInt(deg) / 22.5);
	return windDir[dirIndex];
}
