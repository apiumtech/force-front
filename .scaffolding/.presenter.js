define([
    '$$ModelClassPath$$'
], function ($$Model$$) {
    'use strict';

    function $$ClassName$$(view, model) {
        this.view = view;
        this.model = model || $$Model$$.newInstance();
    }

    $$ClassName$$.prototype.show = function(view) {

    };

    $$ClassName$$.newInstance = function (view, model) {
        return new $$ClassName$$(view, model);
    };

    return $$ClassName$$;
});