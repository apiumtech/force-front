/**
 * Created by Justin on 4/6/2015.
 */
define([], function () {
    'use strict';

    function AwaitHelper() {

    }

    AwaitHelper.prototype.await = function (callback, delay) {
        if (callback.___delay === undefined)
            callback.___delay = 0;

        if (callback.___delay)
            clearTimeout(callback.___delay);

        callback.___delay = setTimeout(callback, delay || 200);
    };

    AwaitHelper.newInstance = function () {
        return new AwaitHelper();
    };

    return AwaitHelper;
});