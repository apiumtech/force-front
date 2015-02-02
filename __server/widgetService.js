/**
 * Created by justin on 12/30/14.
 */

var _ = require("underscore");

function generateRandom() {
    var d1 = [];
    for (var a = 0; a <= 5; a += 1) {
        d1.push([a, parseInt(Math.random() * 5 + a)]);
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
        data: {
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
                    data: [
                        [1, 40],
                        [2, 50],
                        [3, 60],
                        [4, 60],
                        [5, 60],
                        [6, 65],
                        [7, 75],
                        [8, 90],
                        [9, 100],
                        [10, 105],
                        [11, 110],
                        [12, 110]]
                },
                {
                    name: "Visitors",
                    data: [
                        [1, 10],
                        [2, 6],
                        [3, 10],
                        [4, 12],
                        [5, 18],
                        [6, 20],
                        [7, 25],
                        [8, 23],
                        [9, 24],
                        [10, 25],
                        [11, 18],
                        [12, 30]
                    ]
                }
            ]
        },
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
        data: {
            columns: [
                "Photo", "Vendedor", "I. Act", "Visitas", "Gestiones"
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
        }
    },
    {
        page: "distribution",
        widgetType: "table",
        widgetName: "GEOGRAPHICAL DISTRIBUTION",
        imgUrl: 'chart-3.jpg',
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
        data: {
            filters: ["TODA LA ACTIVIDAD", "Solo Visita"],
            params: [{
                label: "Chrome",
                data: 35
            }, {
                label: "Firefox",
                data: 30
            }, {
                label: "Safari",
                data: 15
            }, {
                label: "Opera",
                data: 10
            }, {
                label: "IE",
                data: 5
            }]
        }
    },
    {
        page: "distribution",
        widgetType: "pie",
        widgetName: "DISTRIBUCION HORARIA",
        widgetId: 5,
        order: 3,
        size: 6,
        data: {
            filters: ["TODA LA ACTIVIDAD", "Solo Visita"],
            params: [{
                label: "Chrome",
                data: 35
            }, {
                label: "Firefox",
                data: 30
            }, {
                label: "Safari",
                data: 15
            }, {
                label: "Opera",
                data: 10
            }, {
                label: "IE",
                data: 5
            }]
        }
    },
    {
        page: "distribution",
        widgetType: "table",
        widgetName: "DISTRIBUCION POR TIPO DE CLIENTE",
        imgUrl: 'chart-4.jpg',
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
        widgetType: "table",
        widgetName: "Widget D",
        imgUrl: 'chart-4.jpg',
        widgetId: 9,
        order: 0,
        size: 6
    },
    {
        page: "conversion",
        widgetType: "table",
        widgetName: "Widget D",
        imgUrl: 'chart-5.jpg',
        widgetId: 10,
        order: 1,
        size: 6
    },
    {
        page: "conversion",
        widgetType: "table",
        widgetName: "Ranking",
        widgetId: 12,
        order: 1,
        size: 12,
        data: {
            columns: [
                "Photo", "Vendedor", "I. Act", "Visitas", "Gestiones"
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
        }
    },
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

widgetService.getWidget = function (widgetId) {
    var widget = _.first(_.filter(widgetList, function (widget) {
        return widget.widgetId === widgetId
    }));

    if (widget.widgetId === 2003) {
        widget.data = {
            filters: ["Client Type", "Segment"],
            axis: {
                x: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            },
            bars: [{
                data: generateRandom(), label: "China"
            }, {
                data: generateRandom(), label: "Russia"
            }, {
                data: generateRandom(), label: "Canada"
            }, {
                data: generateRandom(), label: "Japan"
            }, {
                data: generateRandom(), label: "USA"
            }, {
                data: generateRandom(), label: "Others"
            }]
        };
    }

    return widget;
};

module.exports = _.extend(module.exports, widgetService);