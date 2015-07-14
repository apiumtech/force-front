define([
    'modules/saleAnalytics/widgets/custom/CustomWidgetModel'
], function (CustomWidgetModel) {
    'use strict';

    function CustomWidgetPresenter(model) {
        this.model = model || CustomWidgetModel.newInstance();
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

        $view.event.customDataAccess = model.customDataAccess.bind(model);
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