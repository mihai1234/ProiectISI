var countriesJSON;
var coordinatesJSON;

function makeHttpRequest(url, type,  callback) {
    var xmlhttp;
    // code for IE7+, Firefox, Chrome, Opera, Safari
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
    // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (type == "country") {
                countriesJSON = JSON.parse(xmlhttp.responseText)
            } else {
                coordinatesJSON = JSON.parse(xmlhttp.responseText)
            }
            callback();
        }

    }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

function initData() {
    var url = "data/countryData.json";
    makeHttpRequest(url, "country", initCoord);
}

function initCoord() {
    var url = "data/centroids.json";
    makeHttpRequest(url, "coord", finishedLoading);
}

function finishedLoading() {
    initMap();
}

function getCountriesNames(countriesJSON) {
    var i;
    var res = new Array();
    for (i = 0; i < countriesJSON.length; i++) {
        res[i] = countriesJSON[i].country;
    }

    console.log(res);
    return res;
}

function getCountryCoordinates(nameEn) {
    var i;
    for (i = 0; i < coordinatesJSON.length; i++) {
        if (coordinatesJSON[i].country.toUpperCase() === nameEn.toUpperCase()) {
            return [coordinatesJSON[i].lat, coordinatesJSON[i].long];
        }
    }
}

function getCountryColor() {
    return [0, 0, 255, 0.3];
}

function getBulletSize(natality) {
    var size = 14;
    var limit;
    for (limit = 1.4; limit < 10.0; limit += 0.1) {
        if (natality < limit) {
            return size;
        }
        size += 2;
    }
}

initData();
