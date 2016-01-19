var map;

var graphicArray = [];
var plotJsonNatality = {};
var yearsArray = [];

var yearStart = 1965;

function initMap() {
    require([
        "esri/map",
        "esri/request",
        "esri/layers/FeatureLayer",
        "esri/geometry/Point",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/graphic",
        "dojo/_base/array",
        "esri/InfoTemplate",
        "esri/TimeExtent",
        "esri/dijit/TimeSlider",
        "dojo/dom",
        "esri/dijit/InfoWindow",
        "dijit/layout/TabContainer",
        "dojo/dom-construct",
        "dijit/layout/ContentPane",
        "dojo/dom-class",
        "dojox/charting/Chart2D",
        "dojox/charting/plot2d/Pie",
        "dojox/charting/plot2d/Lines",
        "dojox/charting/axis2d/Default",
        "dojox/charting/action2d/Highlight",
        "dojox/charting/action2d/MoveSlice",
        "dojox/charting/action2d/Tooltip",
        "dojo/number",
        "dojox/charting/themes/Harmony",
        "dojox/charting/widget/Legend",
        "dojo/domReady!"
    ], function(
        Map,
        Request,
        FeatureLayer,
        Point,
        SimpleMarkerSymbol,
        Graphic,
        arrayUtils,
        InfoTemplate,
        TimeExtent,
        TimeSlider,
        dom,
        InfoWindow,
        TabContainer,
        domConstruct,
        ContentPane,
        domClass,
        Chart2D,
        Pie,
        Lines,
        Default,
        Highlight, MoveSlice, Tooltip,
        number,
        dojoxTheme,
        Legend
        ) {

        // Use the info window instead of the popup.
        var infoWindow = new InfoWindow(null, domConstruct.create("div"));
        infoWindow.startup();

        //create map
        map = new Map("map",{
            basemap: "topo",
            center: [25, 46],
            infoWindow: infoWindow,
            zoom: 5
        });

        map.infoWindow.resize(275, 275);

        dojo.connect(map.infoWindow._hide, "onclick", function(){
            map.infoWindow.resize(275, 275);
        });

        map.on("load", function(){
            for(var i = yearStart; i <= 2014; i++){
                yearsArray.push({"x": i, "y": 0});
            }
        });

        map.on("layers-add-result", requestData);

        function createSymbol(color, size){
            var markerSymbol = new esri.symbol.SimpleMarkerSymbol();
            markerSymbol.setColor(new dojo.Color(color));
            markerSymbol.setSize(size);
            markerSymbol.setOutline(null);
            return markerSymbol;
        }

        function getWindowContent(graphic) {
            // Make a tab container.
            var tc = new TabContainer({
                style: "width:100%;height:100%;"
            }, domConstruct.create("div"));

            // Display attribute information.
            var cp1 = new ContentPane({
                title: "Detalii",
                content: "<b>An: </b>" + graphic.attributes.an +  "<br>" +
                    "<b>Natalitate:</b>" + graphic.attributes.natalitate + "%<br>" +
                    "<b>Mortalitate:</b>" + graphic.attributes.mortalitate + "<br>"
            });

            tc.watch("selectedChildWidget", function(name, oldVal, newVal){
                if (newVal.title === "Detalii" ) {
                    infoWindow.resize(275, 275);
                    tc.resize();
                    chart.resize(180,180);
                }
            });

            var cp3 = new ContentPane({
                title: "Situatia pe ani"
            });

            tc.addChild(cp1);
            tc.addChild(cp3);

            //create the chart that will display in the third tab
            var columnChart = domConstruct.create("div", {
                id: "columnChart"
            }, domConstruct.create("div"));

            var secondChart = new Chart2D(columnChart);
            domClass.add(secondChart, "secondChart");

            // Apply a color theme to the chart.
            secondChart.setTheme(dojoxTheme);

            tc.watch("selectedChildWidget", function(name, oldVal, newVal){
                if ( newVal.title === "Situatia pe ani" ) {
                    infoWindow.resize(700, 365);
                    tc.resize();
                    secondChart.resize(650, 250);
                }
            });

            plotData = plotJsonNatality[graphic.attributes.tara].filter(function (el) {
                return (el.x % 2) == 0;
            });

            secondChart.addPlot("default", {type: "Columns", markers: true, gap: 3});
            secondChart.addAxis("x", {title: "Ani", titleOrientation: "away"});
            secondChart.addAxis("y", {vertical: true, fixLower: "major", fixUpper: "major", title:"Indice Natalitate"});

            secondChart.addSeries("Indice natalitate", plotData);

            cp3.set("content", secondChart.node);

            var legend = new Legend({ chart: secondChart }, "legend");

            return tc.domNode;
        }

        //create empty feature collection
        var featureCollection = {
            "layerDefinition": null,
            "featureSet": {
                "features": [],
                "geometryType": "esriGeometryPoint"
            }
        };

        //create layer definition
        featureCollection.layerDefinition = {
            "geometryType": "esriGeometryPoint",
            "objectIdField": "ObjectID",
            "fields": [{
                "name": "ObjectID",
                "alias": "ObjectID",
                "type": "esriFieldTypeOID"
            }, {
                "name": "sliderYear",
                "alias": "sliderYear",
                "type": "esriFieldTypeString"
            }
            ]
        };

        //create feature layer from feature collection
        featureLayer = new FeatureLayer(featureCollection, {
            id: 'myFeatureLayer',
            mode: FeatureLayer.MODE_ONDEMAND
        });
        map.addLayers([featureLayer]);

        function requestData() {
            var requestHandle = Request({
                url: "data/geoData.json",
                callbackParamName: "jsoncallback"
            });
            requestHandle.then(requestSucceeded, requestFailed);
        }

        function requestSucceeded(response, io) {
            //loop through the items and add to the feature layer

            var features = [];
            arrayUtils.forEach(response.features, function(item) {

                var point = new Point(item.geometry.coordinates[1], item.geometry.coordinates[0]);
                var country = item.properties.country;
                var year = item.properties.year;
                var mortality = item.properties.mortality;
                var natality = item.properties.natality;

                var attributes = {
                    tara: country,
                    an: year,
                    mortalitate: mortality,
                    natalitate: natality
                };

                var json = {
                    title:"${tara}",
                    content:"<b>An: </b>${an} <br>" +
                            "<b>Mortalitate:</b> ${mortalitate}% <br>" +
                            "<b>Natalitate:</b> ${natalitate}% <br>" +
                            "<button>Vezi situatia pe ani</button>"
                }

                var template = new InfoTemplate();
                template.setTitle("<b>${tara}</b>");
                template.setContent(getWindowContent);
                var color = getCountryColor();
                var bulletSize = getBulletSize(natality);
                var graphic = new Graphic(new Point(point), createSymbol(color, bulletSize), attributes, template);
                graphic.id = year + country;
                map.graphics.add(graphic);
                graphicArray.push(graphic);

                var currentYear = parseInt(year);
                var tempYears = [];

                if(plotJsonNatality[country] == undefined){
                    tempYears = yearsArray.slice();
                    tempYears[currentYear - yearStart] = {"x": currentYear, "y": natality};
                    plotJsonNatality[country] = tempYears;
                }
                else{
                    tempYears = plotJsonNatality[country].slice();
                    tempYears[currentYear - yearStart] = {"x": currentYear, "y": natality};
                    plotJsonNatality[country] = tempYears;
                }

            });

            initSlider();
        }

        function requestFailed(error) {
            console.log('failed');
        }

        function initSlider(){

            map.graphics.clear();
            var startYear = new Date("1965");
            var endYear = new Date("1965");
            for(i = 0; i < graphicArray.length; i++){
                var graphicYear = new Date(graphicArray[i].id.substr(0, 4));
                if(graphicYear <= endYear && graphicYear >= startYear){
                    map.graphics.add(graphicArray[i]);
                }
            }

            var timeSlider = new TimeSlider({
                style: "width: 78%; float:right;"
            }, dom.byId("timeSliderDiv"));
            map.setTimeSlider(timeSlider);

            var timeExtent = new TimeExtent();
            timeExtent.startTime = new Date("1/1/1965 UTC");
            timeExtent.endTime = new Date("1/1/2013 UTC");
            timeSlider.setThumbCount(1);

            timeSlider.createTimeStopsByTimeInterval(timeExtent, 3, "esriTimeUnitsYears");
            timeSlider.setThumbIndexes([0]);
            timeSlider.setThumbMovingRate(2000);
            timeSlider.startup();

//            add labels for every other time stop
            var labels = arrayUtils.map(timeSlider.timeStops, function(timeStop, i) {
                    return timeStop.getUTCFullYear();
            });

            timeSlider.setLabels(labels);

            timeSlider.on("time-extent-change", function(evt) {
                var startValString = evt.endTime;
                var endValString = evt.endTime;
                map.graphics.clear();
                for(var i = 0; i < graphicArray.length; i++){
                    var graphicYear = new Date(graphicArray[i].id.substr(0, 4));
                    if(graphicYear <= endValString && graphicYear >= startValString){
                        map.graphics.add(graphicArray[i]);
                    }
                }
            });
        }
    }
    )};
