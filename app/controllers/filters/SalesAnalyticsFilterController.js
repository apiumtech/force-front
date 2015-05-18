/**
 * Created by justin on 2/3/15.
 */

app.registerController(function (container) {
    var SalesAnalyticsFilterView = container.getView("views/filters/SalesAnalyticsFilterView");

    function SalesAnalyticsFilterController($scope, $filter, $compile) {
        SalesAnalyticsFilterController.configureView($scope, $filter, $compile);
    }

    SalesAnalyticsFilterController.configureView = function ($scope, $filter, $compile) {
        $scope.$compile = $compile;
        this.view = SalesAnalyticsFilterView.newInstance($scope, $filter);
        this.view.show();
    };

    return ['$scope', '$filter', '$compile', SalesAnalyticsFilterController];
});
