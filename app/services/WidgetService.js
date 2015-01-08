/**
 * Created by Justin on 1/5/2015.
 */

app.registerService(function (container) {
    var AjaxService = container.getService("services/AjaxService");

    function WidgetService(ajaxService) {
        this.ajaxService = ajaxService;
    }

    WidgetService.prototype = Object.create(Object.prototype, {});

    WidgetService.prototype.getWidgetsForPage = function (page) {
        assertNotNull("Page name", page);

        var params = {
            url: '/api/widgets/' + page,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };
        return this.ajaxService.ajax(params);
    };

    WidgetService.prototype.getWidget = function (widgetId) {
        assertNotNull("Widget Id", widgetId);

        var params = {
            url: '/api/widget/' + widgetId,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };
        return this.ajaxService.ajax(params);
    };

    WidgetService.prototype.moveWidget = function (widgetId, oldIndex, newIndex) {
        assertNotNull("WidgetId", widgetId);
        assertNotNull("OldIndex", oldIndex);
        assertNotNull("NewIndex", newIndex);

        var params = {
            url: '/api/widget/' + widgetId + '/move',
            type: 'post',
            contentType: 'application/json',
            accept: 'application/json',
            data: JSON.stringify({
                oldIndex: oldIndex,
                newIndex: newIndex
            })
        };
        return this.ajaxService.ajax(params);
    };

    WidgetService.newInstance = function (ajaxService) {
        var _ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        var widgetService = new WidgetService(_ajaxService);
        return Some(widgetService);
    };

    return WidgetService;
});