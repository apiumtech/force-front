/**
 * Created by kevin on 10/22/14.
 */

/** Option is a monad that safeguards access to null values providing
 * simple binding checks and conditional logic.
 **/

(function (jsScope) {
    function isFunction(func) {
        return Object.prototype.toString.call(func) == '[object Function]';
    }

    jsScope.None = function () {
        return {
            isOption: true,
            getOrElse: function (elseFn) {
                if (elseFn === null) {
                    throw new Error("Don't use null values if you are using the Option monad!");
                }

                if (isFunction(elseFn)) {
                    return elseFn();
                } else {
                    return elseFn;
                }
            },
            map: function () {
                return jsScope.None;
            },

            isEmpty: true
        };
    };

    jsScope.Some = function (x) {
        if (x === null) {
            throw new Error("called Some with a null value!");
        }

        return {
            isOption: true,
            getOrElse: function () {
                return x;
            },
            map: function (fx) {
                if (isFunction(fx)) {
                    return jsScope.Some(fx(x));
                } else {
                    return jsScope.Some(fx);
                }
            },
            isEmpty: false
        };
    };

    jsScope.isEmptyObject = function (obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) return false;
        }

        return true;
    };

    jsScope.isArray = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    };

    jsScope.isFunction = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Function]";
    };

    jsScope.Option = function (x) {
        return (x ? jsScope.Some(x) : jsScope.None());
    };

    jsScope.throwException = function (instance) {
        return function () {
            throw instance;
        };
    };

    jsScope.throwInstantiateException = function (classObj) {
        if (!isFunction(classObj)) return;
        var className = classObj.name;
        return throwException(i18n.t("Errors.CannotInstantiateClass", {class: className}));
    };

    jsScope.assertNotNull = function (paramName, paramValue) {
        if (paramValue === null || paramValue === undefined) {
            throw new Error(paramName + " cannot be null");
        }
    };

})(window);