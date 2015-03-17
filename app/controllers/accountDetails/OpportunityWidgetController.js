/**
 * Created by justin on 3/13/15.
 */
app.registerController(function (container) {
    var OpportunityWidgetView = container.getView("views/accountDetails/OpportunityWidgetView");

    function OpportunityWidgetController($scope, $element) {
        OpportunityWidgetController.configureView($scope, $element);
    }

    OpportunityWidgetController.configureView = function ($scope, $element) {
        this.view = OpportunityWidgetView.newInstance($scope, $element).getOrElse(throwInstantiateException(OpportunityWidgetView));
        this.view.show();
    };

    return OpportunityWidgetController;
});