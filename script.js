"use strict";

const c = document.getElementById("clock");
const d = document.getElementById("date");
const p = document.getElementById("player");
const s = document.getElementById("search");
const w = document.getElementById("weather");
const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
p.controls = false;

document.addEventListener("DOMContentLoaded", function() {
	getWeather();
	s.value = "";
}, false);

function reload() {
	p.src = document.getElementById("selection").value;
	p.load();
	p.play();
}

if(s.addEventListener) {
	s.addEventListener("keydown", this.keyHandler, false);
}

function keyHandler(e) {
	if(e.keyCode === 13) {
		if(this.value.indexOf("://") != -1) {
			window.location.href = this.value;
		} else {
			if(this.value.search(/^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gi) != -1) {
				window.location.href = "https://" + this.value;
			} else if(this.value != "") {
				window.location.href = "https://duckduckgo.com/?q=" + this.value;
			}
		}
	}
}

function updateClock() {
  let d8 = new Date(); //setInterval() somehow can't access global vars
	let cHours = (d8.getHours() < 10 ? "0" : "") + d8.getHours();
	let cMinutes = (d8.getMinutes() < 10 ? "0" : "") + d8.getMinutes();
	let cSeconds = (d8.getSeconds() < 10 ? "0" : "") + d8.getSeconds();
	c.innerHTML = cHours + ":" + cMinutes + ":" + cSeconds;
}

function setDate() {
  let d8 = new Date();
	let cDay = weekdays[d8.getDay()];
	let cNumDay = d8.getDate();
	let cMonth = months[d8.getMonth()];
	let cYear = d8.getFullYear();
	d.innerHTML = cDay + ", " + cMonth + " " + cNumDay + " " + cYear;
}

function updateImage() { // update image names in dir: ls -v | cat -n | while read n f; do mv -n "$f" "$n.webp"; done
	document.getElementById("image").src = "img/" + Math.floor((Math.random() * 41)+1) + ".webp";
}

function getWeather() {
	if(navigator.geolocation) {
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
