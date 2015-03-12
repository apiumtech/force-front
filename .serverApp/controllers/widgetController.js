/**
 * Created by justin on 3/9/15.
 */

var widgetPageLists = {};
var WidgetService = require("../services/widgetService");

exports.getWidgetsByPage = function (request, response) {
    var page = request.params.page;
    if (widgetPageLists[page] == null) {
        var widgets = WidgetService.getWidgetFromPage(page);
        widgetPageLists[page] = {
            id: page,
            layout: "linear",
            body: widgets
        };
    }
    response.json({
        success: true,
        data: widgetPageLists[page]
    });
};

exports.getWidget = function (request, response) {
    var id = parseInt(request.params.id);
    var widget = WidgetService.getWidget(id, request, response);

    if (!widget) {
        response.status(404);
        response.json({
            success: false,
            error: "Could not find the requested widget"
        });
        return;
    }

    response.json({
        success: true,
        data: {
            widgetId: widget.widgetId,
            params: widget.data
        }
    });
};

exports.updateWidgets = function (request, response) {
    var pageId = request.body.id;
    widgetPageLists[pageId] = request.body;

    response.json({
        success: true,
        data: widgetPageLists[pageId]
    });
};