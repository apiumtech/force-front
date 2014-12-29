/**
 * Created by justin on 12/22/14.
 */
app.registerController(function (container) {
    var TableWidgetView = container.getView("views/TableWidgetView");

    function TableWidgetController($scope, $element) {
        this.view = TableWidgetView.newInstance($scope, $element).getOrElse(throwException("Cannot instantiate TableWidgetView"));
        this.view.show();
    }

    return TableWidgetController;
});