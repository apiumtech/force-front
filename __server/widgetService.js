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
        widgetId: 1,
        order: 0,
        column: 1
    },
    {
        page: "intensity",
        widgetType: "table",
        widgetName: "Widget B",
        widgetId: 2,
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
            column: widget.column
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
    var samePageWidget = _.filter(widgetList, function (wg) {
        return wg.page === widget.page;
    });
    samePageWidget = _.sortBy(samePageWidget, function (wg) {
        return wg.order;
    });

    if (newIndex >= samePageWidget.length) {
        var k = newIndex - samePageWidget.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    samePageWidget.splice(newIndex, 0, samePageWidget.splice(oldIndex, 1)[0]);
    var i = 0;
    _.each(samePageWidget, function (wg) {
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