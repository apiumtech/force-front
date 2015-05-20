/**
 * Created by justin on 3/13/15.
 */
define([
    'app',
    'modules/account/widgets/opportunity/OpportunityWidgetView'
], function (app, OpportunityWidgetView) {

    function OpportunityWidgetController($scope, $element) {
        OpportunityWidgetController.configureView($scope, $element);
    }

    OpportunityWidgetController.configureView = function ($scope, $element) {
        this.view = OpportunityWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    app.register.controller('OpportunityWidgetController', ['$scope', '$element', OpportunityWidgetController]);

    return OpportunityWidgetController;
});