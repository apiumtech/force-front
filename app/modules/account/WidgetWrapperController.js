/**
 * Created by justin on 12/18/14.
 */
define([
    'modules/account/WidgetWrapperView'
], function (WidgetWrapperView) {

    function WidgetWrapperController($scope, $element) {
        WidgetWrapperController.configureView($scope, $element);
    }

    WidgetWrapperController.configureView = function ($scope, $element) {
        this.view = WidgetWrapperView.newInstance($scope, $element);
        this.view.show();
    };

    return WidgetWrapperController;
});