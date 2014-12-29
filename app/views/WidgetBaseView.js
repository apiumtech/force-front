/**
 * Created by justin on 12/22/14.
 */
app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");

    function WidgetBaseView(scope, element, model, presenter) {
        BaseView.call(this, scope, model, presenter);
        this.element = element || {};
    }

    WidgetBaseView.prototype = Object.create(BaseView.prototype, {});

    WidgetBaseView.prototype.__show = BaseView.prototype.show;
    WidgetBaseView.prototype.show = function () {
        this.__show.call(this);
    };

    WidgetBaseView.prototype.onReloadWidgetError = function (error) {
        var self = this;
        var errorMessage;

        switch (error.readyState) {
            case 0:
                errorMessage = "Error while requesting data. Cannot open connection to the server. Please check internet setting";
                break;
            case 4:
                errorMessage = "Error while requesting data. Error: " + error.responseText || error.statusText;
                break;

            default:
                var err = "";
                if (error instanceof Error)
                    err = error.message;
                errorMessage = "Error while requesting data. " + err;
                break;
        }
        self.event.onReloadWidgetDone(errorMessage);
    };

    return WidgetBaseView;
});