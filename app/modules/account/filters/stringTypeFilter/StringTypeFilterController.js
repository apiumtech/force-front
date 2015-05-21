/**
 * Created by justin on 4/2/15.
 */
define([
    'app',
    'modules/account/filters/stringTypeFilter/StringTypeFilterView'
], function (app, StringTypeFilterView) {

    function StringTypeFilterController($scope, $element) {
        StringTypeFilterController.configureView($scope, $element);
    }

    StringTypeFilterController.configureView = function ($scope, $element) {
        this.view = StringTypeFilterView.newInstance($scope, $element);
        this.view.show();
    };

    app.register.controller('StringTypeFilterController', ['$scope', '$element', StringTypeFilterController]);

    return StringTypeFilterController;
});