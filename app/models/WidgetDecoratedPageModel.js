app.registerModel(function (container) {
    var Q = container.getFunction('q');

    function WidgetDecoratedPageModel(widgetService, storageService) {
        this.widgetService = widgetService;
        this.storageService = storageService;
        this.pageName = null;
    }

    WidgetDecoratedPageModel.prototype._getWidgets = function () {
        var self = this;
        if (this.pageName == null)
            throw new Error("Page Name is not defined");

        var deferred = self.defer();
        var pageLayoutStorageKey = "pageLayout_" + self.pageName;
        var pageLayoutData = self.storageService.retrieve(pageLayoutStorageKey);
        if (pageLayoutData) {
            deferred.resolve(pageLayoutData);
        }
        else {
            self.widgetService.getWidgetsForPage(self.pageName)
                .then(function (data) {
                    self.storageService.store(pageLayoutStorageKey, data.data);
                    deferred.resolve(data.data);
                },
                function (error) {
                    deferred.reject(error);
                });
        }
        return deferred.promise;
    };

    WidgetDecoratedPageModel.prototype.getWidgets = function () {
        return Q.fcall(this._getWidgets.bind(this));
    };

    WidgetDecoratedPageModel.prototype.defer = function () {
        var deferred = Q.defer();
        return deferred;
    };

    return WidgetDecoratedPageModel;
});