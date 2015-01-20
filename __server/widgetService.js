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
                x: "Month",
                y: "Views"
            },
            fields: [
                {
                    name: "Page Views",
                    data:  [[1, 53], [2,66], [3, 60], [4, 68], [5, 66], [6,71],[7, 75], [8, 69], [9,70], [10, 68], [11, 72], [12, 78]]
                },
                {
                    name: "Visitors",
                    data:  [[1, 26], [2,13], [3, 18], [4, 35], [5, 23], [6, 18],[7, 35], [8, 24], [9,14], [10, 14], [11, 29], [12, 30]]
                }
            ]
        },
        widgetId: 1,
        order: 0,
        column: 1
    },
    {
        page: "intensity",
        widgetType: "table",
        widgetName: "Widget B",
        imgUrl: 'chart-2.jpg',
        widgetId: 2,
        order: 1,
        column: 1
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