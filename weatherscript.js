var APPID = "b3f15555f7e25985e095c86fbbe6ad0d";
var temp;
var loc;
var icon;
var humidity;
var wind;
var description;
var advice;
var locURL = 'http://ip-api.com/json';
var lat;
var long;

function update(weather) {
    icon.src = "http://openweathermap.org/img/w/" + weather.code + ".png";
    humidity.innerHTML = weather.humidity;
    wind.innerHTML = weather.wind;
    loc.innerHTML = weather.location;
    temp.innerHTML = weather.temp;
    description.innerHTML = weather.description;
}

window.onload = function () {
    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    icon = document.getElementById("icon");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("wind");
    description = document.getElementById("description");
    
    $.getJSON(locURL, function(data){
        long = data.lon;
        lat = data.lat;
        updateByGeo(lat,long);
    });
    
    

}



function updateByGeo(lat, lon){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"lat=" + lat +
	"&lon=" + lon +
	"&APPID=" + APPID;
    sendRequest(url);    
}




function sendRequest(url){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
	    var weather = {};
	    weather.code = data.weather[0].icon;
	    weather.humidity = data.main.humidity;
	    weather.wind = data.wind.speed;
	    /* NEW */
	    weather.description = data.weather[0].description;
	    weather.location = data.name;
	    /* NEW */
	    weather.temp = K2C(data.main.temp);		
	    update(weather);
	}
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();    
}


function giveAdvice(){
    
    switch(description.innerHTML){
        
        case "clear sky":
                 document.getElementById("advice").innerHTML = "The sky is clear. No need to bring anything extra!";
                break;
        case "few clouds":
                 document.getElementById("advice").innerHTML = "Seems like there are a few clouds here and there, but the sky is clear for the most part.";
                break;
        case "scattered clouds":
                 document.getElementById("advice").innerHTML = "Seems like there are a few clouds here and there, but the sky is clear for the most part.";
                break;
        case "broken clouds":
                 document.getElementById("advice").innerHTML = "Seems like there are a few clouds here and there, but the sky is clear for the most part.";
                break;
        case "shower rain":
                 document.getElementById("advice").innerHTML = "Looks like there will be quick bursts of rain, be prerared and make sure to have an umbrella handy!";
                break;
        case "rain":
                 document.getElementById("advice").innerHTML = "It's raining. Don't forget your umbrella if you plan on heading out!";
                break;
        case "thunderstorm":
                 document.getElementById("advice").innerHTML = "Pretty nasty weather out there. If you must go out, make sure to bring your umbrella and if your driving be careful!";
                break;
        case "snow":
                 document.getElementById("advice").innerHTML = "It's snowing out! Good time to bring out your favorite tuque ;)";
                break;
         case "light snow":
                 document.getElementById("advice").innerHTML = "It's snowing out! Good time to bring out your favorite tuque ;)";
                break;
        case "mist":
                 document.getElementById("advice").innerHTML = "Misty out. If your driving be careful of your surroundings!";
                break;
        default:
                document.getElementById("advice").innerHTML = "hmmm, seems like no relevant advice could be given :(";
    }
}
    
function giveAdvice2(){
    
     switch(true){
        
        case (temp.innerHTML >= 20):
                 document.getElementById("advice2").innerHTML = "The temperature is quite high. Dress accordingly and don't forget to put on some sunscreen if the sun is out!";
                break;
        case (temp.innerHTML > 0 && temp.innerHTML < 20 ):
                 document.getElementById("advice2").innerHTML = "The temperature is quite pleasant";
                break;
        case (temp.innerHTML < 0 && temp.innerHTML >= -5 ):
                 document.getElementById("advice2").innerHTML = "It's quite chilly out, make sure to layer up!";
                break;
        case (temp.innerHTML < -5 && temp.innerHTML >= -15 ):
                 document.getElementById("advice2").innerHTML = "WINTER IS COMING (or is already here) Dress warm!";
                break;
        case (temp.innerHTML < -15):
                 document.getElementById("advice2").innerHTML = "Ouhh, it's real cold out. If I were you, i would stay in, but if you must, wear your heaviest jacket and brace yourself :)";
                break;
             
    
        default:
                document.getElementById("advice").innerHTML = "hmmm, seems like no relevant advice could be given :(";
    }
    
}

function K2C(k){
    return Math.round(k - 273.15);
}

