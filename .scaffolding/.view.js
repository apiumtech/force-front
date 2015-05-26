define([
    'shared/BaseView',
    '$$PresenterPath$$'
], function (BaseView, $$Presenter$$) {
    'use strict';

    function $$ClassName$$($scope, presenter) {
        presenter = presenter || new $$Presenter$$(this);
        BaseView.call(this, $scope, null, presenter);
    }

    $$ClassName$$.prototype = Object.create(BaseView.prototype, {});

    $$ClassName$$.newInstance = function ($scope, model, presenter, viewRepaintAspect, logErrorAspect) {
        var view = new $$ClassName$$($scope, presenter);
        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return $$ClassName$$;
});