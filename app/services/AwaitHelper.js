/**
 * Created by Justin on 4/6/2015.
 */
app.registerService(function (container) {
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
        return Some(new AwaitHelper());
    };

    return AwaitHelper;
});