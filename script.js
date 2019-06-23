"use strict";

const c = document.getElementById("clock");
const d = document.getElementById("date");
const p = document.getElementById("player");
const s = document.getElementById("search");
const w = document.getElementById("weather");
const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const weekdays = ["sunday", "tuesday", "wednesday", "thursday", "friday", "saturday", "monday"];
var isSearch = true;
var d8 = new Date();
p.controls = false;

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

function setDate() {
	let cDay = weekdays[d8.getDay()];
	let cNumDay = d8.getDate();
	let cMonth = months[d8.getMonth()];
	let cYear = d8.getFullYear();
	d.innerHTML = cDay + ", " + cMonth + " " + cNumDay + " " + cYear;
}

function updateImage() { // update image names in dir: ls -v | cat -n | while read n f; do mv -n "$f" "$n.jpg"; done
	document.getElementById("image").src = "img/" + Math.floor((Math.random() * 24)+1) + ".jpg";
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
		w.innerHTML = retjson.weather[0].description + " " + Math.round(retjson.main.temp)+"°C";
	});
}

setDate();
updateClock();
updateImage();
setInterval(updateClock, 1000);
setInterval(updateImage, 60000);
setInterval(getWeather, 600000);
