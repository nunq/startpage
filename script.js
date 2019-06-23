"use strict";

const p = document.getElementById("player");
const s = document.getElementById("search");
const c = document.getElementById("clock");
const w = document.getElementById("weather");
var isSearch = true;

document.addEventListener("DOMContentLoaded", function() {
	getWeather();
  s.value = "";
}, false);

function reload() {
	var url = document.getElementById("selection").value;
	p.src = url;
  p.load();
  p.play();
}

if(s.addEventListener ) {
  s.addEventListener("keydown", this.keyHandler, false);
}

function keyHandler(e) {
  if(e.keyCode === 9) {
    if(isSearch) {
      isSearch = false;
      this.placeholder = "type a url...";
    } else if (!isSearch) {
      isSearch = true;
      this.placeholder = "search the web...";
    }
    if(e.preventDefault) {
      e.preventDefault();
    }
  }
  if(e.keyCode === 13) {
    if(isSearch) {
      window.location.href = "https://duckduckgo.com/?q=" + this.value;
    } else {
      window.location.href = "https://" + this.value;
    }
  }
}


function updateClock() {
	let currentTime = new Date();
	let currentHours = currentTime.getHours();
	let currentMinutes = currentTime.getMinutes();
	let currentSeconds = currentTime.getSeconds();
	currentHours = (currentHours < 10 ? "0" : "") + currentHours;
	currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
	currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
	let currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds;
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
