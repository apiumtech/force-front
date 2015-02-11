/**
 * Created by justin on 12/30/14.
 */

var _ = require("underscore");

function generateRandom(from, to) {
    var d1 = [];
    for (var a = 0; a <= 5; a++) {
        d1.push([a, Math.floor(Math.random() * (to - from)) + from]);
    }
    return d1;
}


var widgetService = {};
var widgetList = [
    {
        page: "intensity",
        widgetType: "graph",
        widgetName: "Widget A",
        imgUrl: 'chart-1.jpg',
        data: {},
        widgetId: 1,
        order: 0,
        size: 12
    },
    {
        page: "intensity",
        widgetType: "table",
        widgetName: "Ranking",
        widgetId: 2,
        order: 1,
        size: 12,
        data: {}
    },
    {
        page: "distribution",
        widgetType: "map",
        widgetName: "GEOGRAPHICAL DISTRIBUTION",
        widgetId: 3,
        order: 1,
        size: 12
    },
    {
        page: "distribution",
        widgetType: "pie",
        widgetName: "Distribucion por segmento",
        widgetId: 1029,
        order: 3,
        size: 6,
        data: {}
    },
    {
        page: "distribution",
        widgetType: "pie",
        widgetName: "DISTRIBUCION HORARIA",
        widgetId: 5,
        order: 3,
        size: 6,
        data: {}
    },
    {
        page: "distribution",
        widgetType: "singleline",
        widgetName: "DISTRIBUCION HORARIA",
        data: {},
        widgetId: 2002,
        order: 4,
        size: 6
    },
    {
        page: "distribution",
        widgetType: "bar",
        widgetName: "ANALISIS DE COBERTURA",
        widgetId: 2003,
        order: 5,
        size: 6,
        data: {}
    },
    {
        page: "conversion",
        widgetType: "pie",
        widgetName: "IAGRAMA ACTIVIDAD / VENTAS",
        widgetId: 9,
        order: 0,
        size: 6,
        data: {}
    },
    {
        page: "conversion",
        widgetType: "pie",
        widgetName: "Efectividad visitas/venta",
        widgetId: 10,
        order: 1,
        size: 6,
        data: {}
    },
    {
        page: "conversion",
        widgetType: "table",
        widgetName: "Ranking",
        widgetId: 12,
        order: 1,
        size: 12,
        data: {}
    }
];

widgetService.getWidgetFromPage = function (page) {
    var pageWidgets = _.clone(_.filter(widgetList, function (widget) {
        return widget.page === page;
    }));

    pageWidgets = _.sortBy(pageWidgets, function (widget) {
        return widget.order;
    });

    var list = [];
    _.each(pageWidgets, function (widget) {
        var w = {
            type: widget.widgetType,
            widgetName: widget.widgetName,
            widgetId: widget.widgetId,
            position: {
                size: widget.size
            },
            dataEndpoint: "/api/widget/" + widget.widgetId
        };
        list.push(w);
    });
    return list;
};

widgetService.getWidget = function (widgetId, request) {
    var widget = _.first(_.filter(widgetList, function (widget) {
        return widget.widgetId === widgetId
    }));

    widget.data = {};
    switch (widget.widgetType) {
        case "bar":
            widget.data = {
                filters: ["Client Type", "Segment"],
                axis: {
                    x: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                },
                bars: [{
                    data: generateRandom(150, 175), label: "China"
                }, {
                    data: generateRandom(120, 150), label: "Russia"
                }, {
                    data: generateRandom(95, 120), label: "Canada"
                }, {
                    data: generateRandom(70, 95), label: "Japan"
                }, {
                    data: generateRandom(50, 70), label: "USA"
                }, {
                    data: generateRandom(20, 50), label: "Others"
                }]
            };
            break;
        case "singleline":
            widget.data = {
                filters: [
                    "Checkins",
                    "Toda la actividad",
                    "Llamadas",
                    "Emails"
                ],
                fields: [
                    {
                        name: "Page Views",
                        data: generateRandomData(0, 13)
                    }
                ]
            };
            break;
        case 'graph':
            widget.data = {
                axis: {
                    x: [
                        '', '', 'Mar 14',
                        '', '', 'Jun 14',
                        '', '', 'Sep 14',
                        '', '', 'Dec 14'
                    ],
                    y: "Views"
                },
                filters: [
                    "Visitas",
                    "Tiempo al telefono",
                    "Emails",
                    "Gestiones",
                    "Activity score",
                    "Usuarios activos",
                    "Ofertas",
                    "Pedidos"
                ],
                fields: [
                    {
                        name: "Page Views",
                        data: generateRandomData(1, 12)
                    },
                    {
                        name: "Visitors",
                        data: generateRandomData(1, 12)
                    }
                ]
            };
            break;
        case 'pie':
            widget.data = {
                filters: ["TODA LA ACTIVIDAD", "Solo Visita"],
                params: generateRandomPieData(["Chrome", "FireFox", "Safari", "Opera", "IE"], 100)
            };
            break;
        case 'table':
            widget.data = {
                columns: [
                    "Foto", "Vendedor", "I. Act", "Visitas", "Gestiones"
                ],
                data: [
                    ["/assets/img/user-2.jpg", "Pedro Lorem ipsum", 10.0, 54, 245],
                    ["/assets/img/user-2.jpg", "Pedro Lorem ipsum", 10.0, 54, 245],
                    ["/assets/img/user-2.jpg", "Pedro Lorem ipsum", 10.0, 54, 245],
                    ["/assets/img/user-2.jpg", "Pedro Lorem ipsum", 10.0, 54, 245],
                    ["/assets/img/user-2.jpg", "Pedro Lorem ipsum", 10.0, 54, 245],
                    ["/assets/img/user-2.jpg", "Pedro Lorem ipsum", 10.0, 54, 245],
                    ["/assets/img/user-2.jpg", "Pedro Lorem ipsum", 10.0, 54, 245],
                    ["/assets/img/user-2.jpg", "Pedro Lorem ipsum", 10.0, 54, 245],
                    ["/assets/img/user-2.jpg", "Pedro Lorem ipsum", 10.0, 54, 245],
                    ["/assets/img/user-2.jpg", "Pedro Lorem ipsum", 10.0, 54, 245]
                ]
            };
            break;
        case 'map':
            switch (request.query.selectedFilter) {
                case 'checkins':
                    //region checkins data
                    widget.data = [{
                        "Activity": "109,0831182",
                        "CompanyName": "Électricité Solaire SLU",
                        "IdCompany": "595",
                        "IdTipoCheckIn": null,
                        "Latitude": "43.5949952",
                        "Longitude": "1.4331071"
                    }, {
                        "Activity": "101,39225643",
                        "CompanyName": "Investment 73 SL",
                        "IdCompany": "600",
                        "IdTipoCheckIn": null,
                        "Latitude": "41.39561606",
                        "Longitude": "2.17638772"
                    }, {
                        "Activity": "100,45394005",
                        "CompanyName": "Éditions Monaco",
                        "IdCompany": "598",
                        "IdTipoCheckIn": null,
                        "Latitude": "41.456643640995",
                        "Longitude": "1.17831604555249"
                    }, {
                        "Activity": "100,31730033",
                        "CompanyName": "IT Supplies SLU",
                        "IdCompany": "601",
                        "IdTipoCheckIn": null,
                        "Latitude": "41.3930483",
                        "Longitude": "2.1779193"
                    }, {
                        "Activity": "99,53147414",
                        "CompanyName": "Crédit Industriale SRUL",
                        "IdCompany": "594",
                        "IdTipoCheckIn": null,
                        "Latitude": "42.699131",
                        "Longitude": "2.89951580000002"
                    }, {
                        "Activity": "97,60396385",
                        "CompanyName": "Mail Industries LTD",
                        "IdCompany": "603",
                        "IdTipoCheckIn": null,
                        "Latitude": "41.7459108",
                        "Longitude": "1.805693"
                    }, {
                        "Activity": "86,17149598",
                        "CompanyName": "Jorge Risk Capitals SL",
                        "IdCompany": "599",
                        "IdTipoCheckIn": null,
                        "Latitude": "41.3028274",
                        "Longitude": "2.0019345"
                    }, {
                        "Activity": "83,6190197899999",
                        "CompanyName": "Tritium software",
                        "IdCompany": "602",
                        "IdTipoCheckIn": null,
                        "Latitude": "41.3908386230469",
                        "Longitude": "2.12610983848572"
                    }, {
                        "Activity": "64,23986184",
                        "CompanyName": "Société Saint-Germain",
                        "IdCompany": "596",
                        "IdTipoCheckIn": null,
                        "Latitude": "45.7659404",
                        "Longitude": "4.85426860000007"
                    }, {
                        "Activity": "62,5416297",
                        "CompanyName": "Thermodynamics Industries Inc",
                        "IdCompany": "590",
                        "IdTipoCheckIn": null,
                        "Latitude": "40.0150745",
                        "Longitude": "-105.2937502"
                    }, {
                        "Activity": "61,17411117",
                        "CompanyName": "Montajes e instalaciones TCC",
                        "IdCompany": "319",
                        "IdTipoCheckIn": null,
                        "Latitude": "41.398594",
                        "Longitude": "2.119631"
                    }, {
                        "Activity": "57,70655904",
                        "CompanyName": "Parfums chat",
                        "IdCompany": "597",
                        "IdTipoCheckIn": null,
                        "Latitude": "48.8462774",
                        "Longitude": "2.3285394"
                    }, {
                        "Activity": "56,71410981",
                        "CompanyName": "Prodina SL",
                        "IdCompany": "334",
                        "IdTipoCheckIn": null,
                        "Latitude": "43.366186",
                        "Longitude": "-8.4113454"
                    }, {
                        "Activity": "56,63577759",
                        "CompanyName": "Torrance Software Inc",
                        "IdCompany": "579",
                        "IdTipoCheckIn": null,
                        "Latitude": "42.3720634",
                        "Longitude": "-71.1183225"
                    }, {
                        "Activity": "56,49912147",
                        "CompanyName": "Knoxville CPA",
                        "IdCompany": "589",
                        "IdTipoCheckIn": null,
                        "Latitude": "34.052296",
                        "Longitude": "-118.300407"
                    }, {
                        "Activity": "55,55496018",
                        "CompanyName": "Peer to Peer Thomson",
                        "IdCompany": "593",
                        "IdTipoCheckIn": null,
                        "Latitude": "51.4880867",
                        "Longitude": "-0.0893934"
                    }, {
                        "Activity": "55,26162562",
                        "CompanyName": "MicroGames",
                        "IdCompany": "350",
                        "IdTipoCheckIn": null,
                        "Latitude": "45.592905",
                        "Longitude": "12.1739429"
                    }, {
                        "Activity": "54,99914387",
                        "CompanyName": "Symphony Systems SL",
                        "IdCompany": "580",
                        "IdTipoCheckIn": null,
                        "Latitude": "41.2356113",
                        "Longitude": "1.8080863"
                    }, {
                        "Activity": "51,97327344",
                        "CompanyName": "Terranova Construcciones SA",
                        "IdCompany": "585",
                        "IdTipoCheckIn": null,
                        "Latitude": "42.8178724",
                        "Longitude": "-1.642439"
                    }, {
                        "Activity": "50,35077673",
                        "CompanyName": "GestionTransfer SL",
                        "IdCompany": "581",
                        "IdTipoCheckIn": null,
                        "Latitude": "40.4123827887379",
                        "Longitude": "-3.71362935751677"
                    }, {
                        "Activity": "50,16409041",
                        "CompanyName": "United Bridge Inc",
                        "IdCompany": "558",
                        "IdTipoCheckIn": null,
                        "Latitude": "48.589172",
                        "Longitude": "2.246237"
                    }, {
                        "Activity": "49,65743937",
                        "CompanyName": "Rainbow Slashes Furniture Inc",
                        "IdCompany": "584",
                        "IdTipoCheckIn": null,
                        "Latitude": "40.7641226746516",
                        "Longitude": "-73.9730809510651"
                    }, {
                        "Activity": "48,32411297",
                        "CompanyName": "Renewal Hospitallity LLC",
                        "IdCompany": "592",
                        "IdTipoCheckIn": null,
                        "Latitude": "53.3457883",
                        "Longitude": "-6.2599019"
                    }, {
                        "Activity": "47,02328724",
                        "CompanyName": "Starsystems Inc",
                        "IdCompany": "591",
                        "IdTipoCheckIn": null,
                        "Latitude": "57.2086622",
                        "Longitude": "-2.1791929"
                    }, {
                        "Activity": "44,76496014",
                        "CompanyName": "Atecnic Sales Force Consulting",
                        "IdCompany": "320",
                        "IdTipoCheckIn": null,
                        "Latitude": "41.400228",
                        "Longitude": "2.130643"
                    }, {
                        "Activity": "43,95911803",
                        "CompanyName": "Chocolat Usin",
                        "IdCompany": "582",
                        "IdTipoCheckIn": null,
                        "Latitude": "48.8618667",
                        "Longitude": "2.33831"
                    }, {
                        "Activity": "43,39078577",
                        "CompanyName": "Supermercados Elgorriaga SA",
                        "IdCompany": "587",
                        "IdTipoCheckIn": null,
                        "Latitude": "41.2371851",
                        "Longitude": "1.805886"
                    }, {
                        "Activity": "41,91995272",
                        "CompanyName": "Transistores electrón SLU",
                        "IdCompany": "586",
                        "IdTipoCheckIn": null,
                        "Latitude": "41.3901264",
                        "Longitude": "2.1687876"
                    }, {
                        "Activity": "39",
                        "CompanyName": "Anasac",
                        "IdCompany": "607",
                        "IdTipoCheckIn": null,
                        "Latitude": "-33.4263236",
                        "Longitude": "-70.6214833"
                    }, {
                        "Activity": "33",
                        "CompanyName": "PhoneCash",
                        "IdCompany": "605",
                        "IdTipoCheckIn": null,
                        "Latitude": "-33.3914916",
                        "Longitude": "-70.4940231"
                    }, {
                        "Activity": "31,73997024",
                        "CompanyName": "Peble Technology LLC",
                        "IdCompany": "583",
                        "IdTipoCheckIn": null,
                        "Latitude": "51.5109926",
                        "Longitude": "-0.138541700000019"
                    }, {
                        "Activity": "31",
                        "CompanyName": "Mandriladora Alpesa, S.L.",
                        "IdCompany": "604",
                        "IdTipoCheckIn": null,
                        "Latitude": "39.07105",
                        "Longitude": "-0.23572"
                    }, {
                        "Activity": "30",
                        "CompanyName": "Diagonal Partners",
                        "IdCompany": "609",
                        "IdTipoCheckIn": null,
                        "Latitude": "41.5710626",
                        "Longitude": "2.0048631"
                    }, {
                        "Activity": "28",
                        "CompanyName": "GRUP SOMNIS",
                        "IdCompany": "608",
                        "IdTipoCheckIn": null,
                        "Latitude": "41.4092530518424",
                        "Longitude": "2.19949387013912"
                    }, {
                        "Activity": "27,79412149",
                        "CompanyName": "Servicios Don Juan",
                        "IdCompany": "588",
                        "IdTipoCheckIn": null,
                        "Latitude": "41.3958764",
                        "Longitude": "2.1603104"
                    }, {
                        "Activity": "27",
                        "CompanyName": "Mobitech S.L.",
                        "IdCompany": "610",
                        "IdTipoCheckIn": null,
                        "Latitude": "39.587467",
                        "Longitude": "2.642519"
                    }, {
                        "Activity": "27",
                        "CompanyName": "AMS Tecno",
                        "IdCompany": "606",
                        "IdTipoCheckIn": null,
                        "Latitude": "41.391338",
                        "Longitude": "2.129273"
                    }];
//endregion
                    break;
                case 'users':
                    //region users data
                    widget.data = [{
                        "Email": "demouser_es@forcemanager.net",
                        "FullName": "Carlos Gomez ES 1",
                        "ImageB64": "",
                        "LastPositionElapsedTime": "59",
                        "Latitude": "28.4795056",
                        "Longitude": "-16.3090457"
                    }, {
                        "Email": "demouser_es@forcemanager.net",
                        "FullName": "Carlos Gomez ES 2",
                        "ImageB64": "",
                        "LastPositionElapsedTime": "59",
                        Latitude: "41.408419",
                        Longitude: "2.129993"
                    }, {
                        "Email": "demouser_es@forcemanager.net",
                        "FullName": "Carlos Gomez ES 3",
                        "ImageB64": "",
                        "LastPositionElapsedTime": "59",
                        Latitude: "45.733566",
                        Longitude: "9.262387"
                    }, {
                        "Email": "demouser_es@forcemanager.net",
                        "FullName": "Carlos Gomez ES 4",
                        "ImageB64": "",
                        "LastPositionElapsedTime": "59",
                        Latitude: "38.736327",
                        Longitude: "-9.12907"
                    }, {
                        "Email": "demouser_es@forcemanager.net",
                        "FullName": "Carlos Gomez ES 5",
                        "ImageB64": "",
                        "LastPositionElapsedTime": "59",
                        Latitude: "33.4711029",
                        Longitude: "-7.6079128"
                    }, {
                        "Email": "demouser_es@forcemanager.net",
                        "FullName": "Carlos Gomez ES 6",
                        "ImageB64": "",
                        "LastPositionElapsedTime": "59",
                        Latitude: "42.77504461",
                        Longitude: "-0.3604515"
                    }];
                    //endregion
                    break;
                case 'activity':
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }

    return widget;
};

function generateRandomData(start, end) {
    var data = [];
    for (var x = start; x <= end; x++) {
        data.push([x, parseInt(Math.random() * 100) + x]);
    }

    return data;
}

function generateRandomPieData(fields) {
    var params = [];
    var lastSum = 0;
    var max = 100;
    for (var i = 0; i < fields.length; i++) {
        var random = Math.floor(Math.random() * (max - lastSum)) + lastSum;
        params.push({
            label: fields[i],
            data: random
        });
        lastSum += random;
    }

    return params;
}

module.exports = _.extend(module.exports, widgetService);