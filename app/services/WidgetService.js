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

    WidgetService.prototype.updatePageWidgets = function (data) {

        var params = {
            url: '/api/widgets',
            type: 'PUT',
            contentType: 'application/json',
            accept: 'application/json',
            data: data
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