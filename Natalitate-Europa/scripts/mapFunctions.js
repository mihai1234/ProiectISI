var map;

var graphicArray = [];
var plotJsonNatality = {};
var yearsArray = [];

var averageNatality = 
    [
        {
            "x": 1965,
            "y": 2.52490909090909
        },
        {
            "x": 1966,
            "y": 2.480636363636363
        },
        {
            "x": 1967,
            "y": 2.485636363636364
        },
        {
            "x": 1968,
            "y": 2.433575757575758
        },
        {
            "x": 1969,
            "y": 2.3887575757575763
        },
        {
            "x": 1970,
            "y": 2.3473636363636365
        },
        {
            "x": 1971,
            "y": 2.3267878787878784
        },
        {
            "x": 1972,
            "y": 2.2636363636363632
        },
        {
            "x": 1973,
            "y": 2.195515151515151
        },
        {
            "x": 1974,
            "y": 2.2002121212121217
        },
        {
            "x": 1975,
            "y": 2.171636363636363
        },
        {
            "x": 1976,
            "y": 2.1341212121212116
        },
        {
            "x": 1977,
            "y": 2.0834848484848485
        },
        {
            "x": 1978,
            "y": 2.0466060606060603
        },
        {
            "x": 1979,
            "y": 2.026181818181818
        },
        {
            "x": 1980,
            "y": 1.9890303030303031
        },
        {
            "x": 1981,
            "y": 1.9453030303030305
        },
        {
            "x": 1982,
            "y": 1.927242424242424
        },
        {
            "x": 1983,
            "y": 1.9063636363636365
        },
        {
            "x": 1984,
            "y": 1.88930303030303
        },
        {
            "x": 1985,
            "y": 1.8685454545454545
        },
        {
            "x": 1986,
            "y": 1.8633030303030305
        },
        {
            "x": 1987,
            "y": 1.8435454545454544
        },
        {
            "x": 1988,
            "y": 1.846727272727273
        },
        {
            "x": 1989,
            "y": 1.8088787878787875
        },
        {
            "x": 1990,
            "y": 1.7906969696969701
        },
        {
            "x": 1991,
            "y": 1.7379696969696974
        },
        {
            "x": 1992,
            "y": 1.6905757575757576
        },
        {
            "x": 1993,
            "y": 1.6236666666666666
        },
        {
            "x": 1994,
            "y": 1.5687272727272727
        },
        {
            "x": 1995,
            "y": 1.5149090909090908
        },
        {
            "x": 1996,
            "y": 1.4992424242424243
        },
        {
            "x": 1997,
            "y": 1.4743636363636365
        },
        {
            "x": 1998,
            "y": 1.4476969696969697
        },
        {
            "x": 1999,
            "y": 1.4408484848484848
        },
        {
            "x": 2000,
            "y": 1.454787878787879
        },
        {
            "x": 2001,
            "y": 1.4232424242424244
        },
        {
            "x": 2002,
            "y": 1.4198484848484845
        },
        {
            "x": 2003,
            "y": 1.4333333333333336
        },
        {
            "x": 2004,
            "y": 1.4508181818181818
        },
        {
            "x": 2005,
            "y": 1.4620000000000002
        },
        {
            "x": 2006,
            "y": 1.493121212121212
        },
        {
            "x": 2007,
            "y": 1.520969696969697
        },
        {
            "x": 2008,
            "y": 1.5730606060606063
        },
        {
            "x": 2009,
            "y": 1.5736969696969694
        },
        {
            "x": 2010,
            "y": 1.5711212121212121
        },
        {
            "x": 2011,
            "y": 1.5385454545454549
        },
        {
            "x": 2012,
            "y": 1.5459090909090913
        },
        {
            "x": 2013,
            "y": 1.542787878787879
        }
    ];

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
        "dojo/fx/easing",
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
        easing,
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
                return (el.x % 3) == 0;
            });

            averageData = averageNatality.filter(function (el) {
                return (el.x % 3) == 0;
            });

            secondChart.addPlot("default",
                    {type: "ClusteredColumns", markers: true, gap: 3,
                        animate: {
                            duration: 500,
                            easing: easing.bounceIn
                        }});
            secondChart.addAxis("x", {title: "Ani", titleOrientation: "away"});
            secondChart.addAxis("y", {vertical: true, fixLower: "major", fixUpper: "major", title:"Indice Natalitate"});

            secondChart.addSeries("Indice natalitate", plotData);
            secondChart.addSeries("Natalitate medie", averageData);

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

            // add labels for every other time stop
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
