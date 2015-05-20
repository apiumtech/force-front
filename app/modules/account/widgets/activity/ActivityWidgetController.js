/**
 * Created by justin on 3/13/15.
 */
define([
    'app',
    'modules/account/widgets/activity/ActivityWidgetView'
], function (app, ActivityWidgetView) {

    function ActivityWidgetController($scope, $element) {
        ActivityWidgetController.configureView($scope, $element);
    }

    ActivityWidgetController.configureView = function ($scope, $element) {
        this.view = ActivityWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    app.register.controller('ActivityWidgetController', ['$scope', '$element', ActivityWidgetController]);

    return ActivityWidgetController;
});