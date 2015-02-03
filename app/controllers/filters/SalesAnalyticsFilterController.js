/**
 * Created by justin on 2/3/15.
 */

app.registerController(function (container) {
    var SalesAnalyticsFilterView = container.getView("views/filters/SalesAnalyticsFilterView");

    function SalesAnalyticsFilterController($scope) {
        SalesAnalyticsFilterController.configureView($scope);
    }

    SalesAnalyticsFilterController.configureView = function ($scope) {
        this.view = SalesAnalyticsFilterView.newInstance($scope).getOrElse(throwInstantiateException(SalesAnalyticsFilterView));
        this.view.show();
    };

    return SalesAnalyticsFilterController;
});
