/**
 * Created by Justin on 6/24/2015.
 */
define([
    'di4js'
], function (di) {
    'use strict';
    var appDependencyInjection = di.create();
    appDependencyInjection.autowired(true);

    var isFunction = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Function]";
    };

    requirejs.onResourceLoad = function (context, map) {
        var loadedObject = context.defined[map.name];

        if (loadedObject && isFunction(loadedObject)) {
            configureClassWithDi(appDependencyInjection, loadedObject);
        }
    };

    function configureClassWithDi(diConfig, value) {
        var contractName = value.contractName;

        if (!contractName) {
            var s = value.toString();
            var functionName = /^function\s+([\w\$]+)\s*\(/.exec(s);
            if (!functionName) return;
            contractName = toCamelCase(functionName[1]);
        }

        if (!diConfig.contains(contractName)) {
            var registration = diConfig.register(contractName).as(value);

            if (value.diConfig && value.diConfig.singleton) {
                registration.asSingleton();
            }

            registration.withConstructor();
        }

        function resolve(contractName) {
            var resolvedInstance = diConfig.resolve(contractName);
            return resolvedInstance;
        }

        value._diResolve = resolve.bind(null, contractName);
    }

    function toCamelCase(str) {
        return str
            .replace(/\s(.)/g, function ($1) {
                return $1.toUpperCase();
            })
            .replace(/\s/g, '')
            .replace(/^(.)/, function ($1) {
                return $1.toLowerCase();
            });
    }

    return appDependencyInjection;
});