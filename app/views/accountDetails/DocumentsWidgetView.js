/**
 * Created by justin on 4/14/15.
 */
app.registerView(function (container) {
    var BaseView = container.getView('views/BaseView');

    function DocumentsWidgetView($scope) {
        BaseView.call(this, $scope);
    }

    DocumentsWidgetView.prototype = Object.create(BaseView.prototype);

    DocumentsWidgetView.newInstance = function ($scope, viewRepaintAspect, logErrorAspect) {

        var view = new DocumentsWidgetView($scope);
        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return DocumentsWidgetView;
});