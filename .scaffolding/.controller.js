define([
    '$$ViewPath$$'
], function ($$View$$) {
    'use strict';

    function $$ClassName$$($scope) {
        $$ClassName$$.configureView($scope);
    }

    $$ClassName$$.configureView = function ($scope) {
        this.view = $$View$$.newInstance($scope);
        this.view.show();
    };

    return $$ClassName$$;
});