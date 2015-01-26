/**
 * Created by justin on 12/30/14.
 */

var _ = require("underscore");

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
        column: 1
    },
    {
        page: "intensity",
        widgetType: "donut",
        widgetName: "Distribucion por segmento",
        widgetId: 1029,
        order: 3,
        column: 1,
        data: [{
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
    },
    {
        page: "intensity",
        widgetType: "table",
        widgetName: "Ranking",
        widgetId: 2,
        order: 1,
        column: 1,
        data: {
            columns: [
                "Vendedor", "I. Act", "Visitas", "Gestiones"
            ],
            data: [
                ["Pedro Lorem ipsum", 10.0, 54, 245],
                ["Pedro Lorem ipsum", 10.0, 54, 245],
                ["Pedro Lorem ipsum", 10.0, 54, 245],
                ["Pedro Lorem ipsum", 10.0, 54, 245],
                ["Pedro Lorem ipsum", 10.0, 54, 245],
                ["Pedro Lorem ipsum", 10.0, 54, 245],
                ["Pedro Lorem ipsum", 10.0, 54, 245],
                ["Pedro Lorem ipsum", 10.0, 54, 245],
                ["Pedro Lorem ipsum", 10.0, 54, 245],
                ["Pedro Lorem ipsum", 10.0, 54, 245]
            ]
        }
    },
    {
        page: "distribution",
        widgetType: "table",
        widgetName: "GEOGRAPHICAL DISTRIBUTION",
        imgUrl: 'chart-3.jpg',
        row: 1,
        widgetId: 3,
        order: 1,
        column: 1
    },
    {
        page: "distribution",
        widgetType: "table",
        widgetName: "Widget D",
        imgUrl: 'chart-4.jpg',
        row: 2,
        widgetId: 4,
        order: 3,
        column: 1
    },
    {
        page: "distribution",
        widgetType: "table",
        widgetName: "Widget D",
        imgUrl: 'chart-5.jpg',
        row: 2,
        widgetId: 5,
        order: 2,
        column: 2
    },
    {
        page: "conversion",
        widgetType: "table",
        widgetName: "Widget D",
        imgUrl: 'chart-4.jpg',
        row: 1,
        widgetId: 9,
        order: 1,
        column: 1
    },
    {
        page: "conversion",
        widgetType: "table",
        widgetName: "Widget D",
        imgUrl: 'chart-5.jpg',
        row: 1,
        widgetId: 10,
        order: 1,
        column: 2
    },
    {
        page: "conversion",
        widgetType: "table",
        widgetName: "Widget D",
        imgUrl: 'chart-2.jpg',
        row: 2,
        widgetId: 15,
        order: 1,
        column: 1
    }
];

widgetService.getWidgetFromPage = function (page) {
    var pageWidgets = _.clone(_.filter(widgetList, function (widget) {
        return widget.page === page;
    }));

    var list = [];
    _.each(pageWidgets, function (widget) {
        var w = {
            widgetType: widget.widgetType,
            widgetName: widget.widgetName,
            widgetId: widget.widgetId,
            order: widget.order,
            column: widget.column,
            row: widget.row
        };
        list.push(w);
    });
    return list;
};

widgetService.moveWidget = function (widgetId, oldIndex, newIndex, request, response) {
    var widget = widgetService.getWidget(widgetId);
    if (widget == null) {
        response.status(404);
        response.json({
            success: false,
            error: "Could not find requested widget"
        });
        return;
    }

    widget.row = newIndex.row;
    widget.column = newIndex.column;

    var samePageWidget = _.filter(widgetList, function (wg) {
        return wg.page === widget.page && wg.row === widget.row && wg.column === widget.column;
    });
    samePageWidget = _.sortBy(samePageWidget, function (wg) {
        return wg.order;
    });

    if (newIndex.order >= samePageWidget.length) {
        var k = newIndex.order - samePageWidget.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    samePageWidget.splice(newIndex.order, 0, samePageWidget.splice(oldIndex.order, 1)[0]);
    var i = 0;
    _.each(samePageWidget, function (wg) {
        if (undefined === wg) return;
        wg.order = i;
        i++;
    });

    return true;
};

widgetService.getWidget = function (widgetId) {
    var widget = _.first(_.filter(widgetList, function (widget) {
        return widget.widgetId === widgetId
    }));

    return widget;
};

module.exports = _.extend(module.exports, widgetService);