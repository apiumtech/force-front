/**
 * Created by justin on 4/2/15.
 */
define([
    'app',
    'modules/account/filters/booleanTypeFilter/BooleanTypeFilterView'
], function (app, BooleanTypeFilterView) {

    function BooleanTypeFilterController($scope, $element) {
        BooleanTypeFilterController.configureView($scope, $element);
    }

    BooleanTypeFilterController.configureView = function ($scope, $element) {
        this.view = BooleanTypeFilterView.newInstance($scope, $element);
        this.view.show();
    };

    app.register.controller('BooleanTypeFilterController', ['$scope', '$element', BooleanTypeFilterController]);

    return BooleanTypeFilterController;
});