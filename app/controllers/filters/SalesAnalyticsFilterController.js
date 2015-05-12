/**
 * Created by justin on 2/3/15.
 */

app.registerController(function (container) {
    var SalesAnalyticsFilterView = container.getView("views/filters/SalesAnalyticsFilterView");

    function SalesAnalyticsFilterController($scope, $filter) {
        SalesAnalyticsFilterController.configureView($scope, $filter);
    }

    SalesAnalyticsFilterController.configureView = function ($scope, $filter) {
        this.view = SalesAnalyticsFilterView.newInstance($scope, $filter);
        this.view.show();
    };

    return SalesAnalyticsFilterController;
});
