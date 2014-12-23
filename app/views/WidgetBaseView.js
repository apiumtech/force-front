/**
 * Created by justin on 12/22/14.
 */
app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");
    var IntensityFirstWidgetModel = container.getModel('models/IntensityFirstWidgetModel');
    var IntensityFirstWidgetPresenter = container.getPresenter('presenters/IntensityFirstWidgetPresenter');

    function WidgetBaseView(scope, element, model, presenter) {
        BaseView.call(this, scope, model, presenter);
        this.element = element || {};
    }

    WidgetBaseView.prototype = Object.create(BaseView.prototype);

    WidgetBaseView.prototype.__show = BaseView.prototype.show;
    WidgetBaseView.prototype.show = function () {
        this.__show();
        this.event.onReloadWidgetRequested();
    };

    WidgetBaseView.prototype.onReloadWidgetSuccess = function (data) {
        var self = this;
        self.data = data.data;
        self.event.onReloadWidgetDone();
    };

    WidgetBaseView.prototype.onReloadWidgetError = function (error) {
        var self = this;
        this.showError(error);
        self.event.onReloadWidgetDone();
    };

    return WidgetBaseView;
});