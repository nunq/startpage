const player = document.getElementById("player");
const w = document.getElementById("weather");
const c = document.getElementById("clock");

document.addEventListener('DOMContentLoaded', function() {
	getWeather();
}, false);

function reload() {
	var url = document.getElementById("selection").value;
	player.src = url;
  player.load();
  player.play();
}

function updateClock() {
	var currentTime = new Date();
	var currentHours = currentTime.getHours();
	var currentMinutes = currentTime.getMinutes();
	var currentSeconds = currentTime.getSeconds();
	currentHours = (currentHours < 10 ? "0" : "") + currentHours;
	currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
	currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
	var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds;
	c.innerHTML = currentTimeString;
}

function updateImage() { // update image names in dir: ls -v | cat -n | while read n f; do mv -n "$f" "$n.jpg"; done
	document.getElementById("image").src = "img/" +  Math.floor((Math.random() * 24)+1)  + ".jpg";
}

function getWeather() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(weatherJson);
	} else {
		console.log("geolocation is not supported.");
	}
}

function weatherJson(position) {
	fetch("https://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&APPID=e2ddfc3c180199dacc17d6692caed19e&units=metric").then(function(response) {
		return response.json();
	})
	.then(function(retjson) {
		w.innerHTML = retjson.name + ": " + retjson.weather[0].description + " " + Math.round(retjson.main.temp)+"°C";
	});
}

updateImage();
setInterval(updateClock, 1000);
setInterval(updateImage, 60000);
