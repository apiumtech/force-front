define([
    'q',
    'underscore'
], function (Q, _) {
  'use strict';

    function WidgetDecoratedPageModel(widgetService, storageService) {
      this.widgetService = widgetService;
      this.storageService = storageService;
      this.pageName = null;
    }

    WidgetDecoratedPageModel.inherits(Object, {
        modelData: {
            get: function () {
                return this._modelData || (this._modelData = {});
            },
            set: function (value) {
                this._modelData = value;
            }
        },
        widgetsList: {
            get: function () {
                if (this.modelData && this.modelData.body) {
                  return this.modelData.body;
                }
                return [];
            },
            set: function (value) {
                this.modelData.body = value;
            }
        }
    });

    WidgetDecoratedPageModel.prototype._getWidgets = function () {
        var self = this;
        if (this.pageName === null) {
          throw new Error("Page Name is not defined");
        }

        var deferred = self.defer();
        var pageLayoutStorageKey = "pageLayout_" + self.pageName;
        var pageLayoutData = self.storageService.retrieve(pageLayoutStorageKey, true);
        if (pageLayoutData) {
            self.modelData = pageLayoutData;
            deferred.resolve(pageLayoutData);
        }
        else {
            self.widgetService.getWidgetsForPage(self.pageName)
                .then(function (data) {
                    self.storageService.store(pageLayoutStorageKey, data.data, true);
                    self.modelData = data.data;
                    deferred.resolve(data.data);
                },
                function (error) {
                    deferred.reject(error);
                });
        }
        return deferred.promise;
    };

    WidgetDecoratedPageModel.prototype._updateWidgets = function () {
        var self = this;

        //var deferred = self.defer();
        var pageLayoutStorageKey = "pageLayout_" + self.pageName;
        var oldPageLayoutData = self.storageService.retrieve(pageLayoutStorageKey, true);

        self.storageService.store(pageLayoutStorageKey, self.modelData, true);

        var oldWidget;
        var newWidget;
        var promises = [];
        var position;

        // widget order sync
        for(position = 0; position < oldPageLayoutData.body.length; position++ ) {
          oldWidget = oldPageLayoutData.body[position];
          newWidget = self.modelData.body[position];
          if( oldWidget.widgetId !== newWidget.widgetId ) {
            promises.push(
              self.widgetService.updateWidgetPosition( newWidget.widgetId, position )
            );
          }
        }

        // widget visibility sync
        for( position = 0; position < oldPageLayoutData.body.length; position++ ) {
          oldWidget = oldPageLayoutData.body[position];
          newWidget = _.findWhere(self.modelData.body, {widgetId: oldWidget.widgetId});
          if( oldWidget.isActive !== newWidget.isActive ) {
            promises.push(
              self.widgetService.updateWidgetVisibility( newWidget.widgetId, newWidget.isActive )
            );
          }
        }

        return Q.all(promises);
    };

    WidgetDecoratedPageModel.prototype.moveWidget = function (widget, newIndex) {
        var self = this;
        var widgetToMove = _.find(self.widgetsList, function (item) {
            return widget.widgetId === item.widgetId;
        });

        if (widgetToMove === null){
          throw new Error("Requesting widget doesn't exist in widgets list");
        }

        widgetToMove.position.size = widget.position.size;
        var oldIndex = _.indexOf(self.widgetsList, widgetToMove);
        self.widgetsList.splice(newIndex, 0, self.widgetsList.splice(oldIndex, 1)[0]);
    };

    WidgetDecoratedPageModel.prototype.changeWidgetVisibility = function (widget, isActive) {
        var self = this;
        var currentWidget = _.findWhere(self.widgetsList, {widgetId: widget.widgetId});
        if(currentWidget){
            currentWidget.isActive = isActive;
        }
    };

    WidgetDecoratedPageModel.prototype.updateWidgets = function () {
        return Q.fcall(this._updateWidgets.bind(this));
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
