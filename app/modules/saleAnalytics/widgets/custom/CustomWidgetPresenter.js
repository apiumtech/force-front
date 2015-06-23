define([
    'modules/saleAnalytics/widgets/custom/CustomWidgetModel'
], function (CustomWidgetModel) {
    'use strict';

    function CustomWidgetPresenter(model) {
        this.model = model || new CustomWidgetModel();
    }

    CustomWidgetPresenter.inherits(Object, {});

    CustomWidgetPresenter.prototype._executeLoadWidget = function () {
        var self = this,
            $view = self.$view,
            model = self.model;

        model.reloadWidget().then(
            $view.onReloadWidgetSuccess.bind($view),
            $view.onReloadWidgetError.bind($view)
        );
    };

    CustomWidgetPresenter.prototype.showError = function (error) {
    };

    CustomWidgetPresenter.prototype.show = function (view) {
        var self = this;
        self.$view = view;

        view.event.onReloading = function () {
            self._executeLoadWidget();
        };
    };

    return CustomWidgetPresenter;
});