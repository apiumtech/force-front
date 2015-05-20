/**
 * Created by justin on 3/13/15.
 */
define([
    'app',
    'modules/widgets/WidgetWrapperView'
], function (app, WidgetWrapperView) {
    'use strict';

    function WidgetWrapperController($scope, $element) {
        WidgetWrapperController.configureView($scope, $element);
    }

    WidgetWrapperController.configureView = function ($scope, $element) {
        this.view = WidgetWrapperView.newInstance($scope, $element);
        this.view.show();
    };

    app.register.controller('WidgetWrapperController', ['$scope', '$element', WidgetWrapperController]);

    return WidgetWrapperController;
});