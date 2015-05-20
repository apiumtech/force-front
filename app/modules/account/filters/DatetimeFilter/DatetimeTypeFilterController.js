/**
 * Created by justin on 4/2/15.
 */
define([
    'app',
    'modules/account/filters/DatetimeFilter/DatetimeTypeFilterView'
], function (app, DatetimeTypeFilterView) {

    function DatetimeTypeFilterController($scope, $element) {
        DatetimeTypeFilterController.configureView($scope, $element);
    }

    DatetimeTypeFilterController.configureView = function ($scope, $element) {
        this.view = DatetimeTypeFilterView.newInstance($scope, $element);
        this.view.show();
    };

    app.register.controller('DatetimeTypeFilterController', ['$scope', '$element', DatetimeTypeFilterController]);

    return DatetimeTypeFilterController;
});