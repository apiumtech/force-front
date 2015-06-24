/**
 * Created by Justin on 6/24/2015.
 */
define([], function () {
    'use strict';

    var isFunction = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Function]";
    };

    function load(name, req, onLoaded, config) {
        function asyncLoad(name, req, onLoaded) {
            require(['diConfig'], function (diConfig) {
                req([name], function (value) {
                    if (isFunction(value)) {
                        configureClassWithDi(diConfig, value);
                    }
                    onLoaded(value);
                });
            });
        }

        if (config.isBuild) {
            onLoaded(null);
        } else {
            asyncLoad(name, req, onLoaded);
        }
    }

    function configureClassWithDi(diConfig, value) {
        var contractName = value.contractName;

        if (!contractName) {
            var functionName = /^function\s+([\w\$]+)\s*\(/.exec(value.toString())[1];
            contractName = toCamelCase(functionName);
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

    return {
        load: load
    };
});