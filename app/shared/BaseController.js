/**
 * Created by Justin on 6/10/2015.
 */
define([
    'shared/aspects/ViewRepaintAspect',
    'shared/aspects/LogErrorAspect'
], function (ViewRepaintAspect, LogErrorAspect) {
    'use strict';

    function BaseController() {

    }

    BaseController.prototype.triggerView = function (view, $scope) {
        if (!view.$scope && !$scope)
            throw new Error("InvalidArgumentsException");

        view.$scope = $scope;
        ViewRepaintAspect.weave(view);
        LogErrorAspect.weave(view);
        view.show();
    };

    return BaseController;
});