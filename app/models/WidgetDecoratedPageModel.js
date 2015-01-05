app.registerModel(function (container) {
    var Q = container.getFunction('q');
    var WidgetService = container.getService("services/WidgetService");

    function WidgetDecoratedPageModel(widgetService) {
        this.widgetService = widgetService;
        this.pageName = null;
    }

    WidgetDecoratedPageModel.prototype._getWidgets = function () {
        if (this.pageName == null) throw new Error("Page Name is not defined");
        var deferred = Q.defer();

        this.widgetService.getWidgetsForPage(this.pageName)
            .then(function (data) {
                deferred.resolve(data.data);
            })
            .fail(function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    };

    WidgetDecoratedPageModel.prototype.getWidgets = function () {
        return Q.fcall(this._getWidgets.bind(this));
    };

    return WidgetDecoratedPageModel;
});