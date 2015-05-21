/**
 * Created by kevin on 11/5/14.
 */
define([
    'app',
    'modules/account/filters/filter/FilterView'
], function (app, FilterView) {

    function FilterController($scope) {
        FilterController.configureView($scope);
    }

    FilterController.configureView = function ($scope) {
        this.view = FilterView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('FilterController', ['$scope', FilterController]);

    return FilterController;
});
