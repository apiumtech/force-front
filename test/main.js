/**
 * Created by justin on 5/27/15.
 */
var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/TestSpec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

require(['/base/requireConf.js'], function (requireConf) {
    var requireConfig = JSON.parse(JSON.stringify(requireConf));

    // change context of the test runner to /base/
    requireConfig.baseUrl = '/base/app';

    // including Jasmine-Sinon Matcher
    requireConfig.paths.jasminesinon = '../node_modules/jasmine-sinon/lib/jasmine-sinon';
    requireConfig.deps.push('jasminesinon');

    // include Angular Mocks
    requireConfig.paths.angularMock = '../node_modules/angular-mocks/angular-mocks';
    requireConfig.shim.angularMock = {
        deps: ['angular'],
        exports: 'angularMock'
    };
    requireConfig.deps.push('angularMock');

    // define the callback
    requireConfig.callback = test_main;

    requirejs.config(requireConfig);
    function test_main() {
        require(['app'], function (app) {
            beforeEach(function () {
                app._di = app.di;
                app.di = {
                    register: app._di.register,
                    resolve: function () {
                    },
                    contains: app._di.contains
                };
            });

            afterEach(function () {
                app.di = app._di;
            });

            require(tests, window.__karma__.start);
        });
    }
});


/**
 * Function.prototype.bind polyfill
 */
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {
            },
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}
/*************************************/

function mockAngularScope() {
    var mock = {
        $on: function () {
        },
        $watch: function () {
        },
        $apply: function () {
        }
    };

    sinon.stub(mock, '$on');
    sinon.stub(mock, '$watch');
    sinon.stub(mock, '$apply');

    return mock;
}

function mock(constr) {
    var mockObj = {};
    var component = Object.create(constr.prototype);
    var proto = component.__proto__;

    while (proto) {
        var prototypeMethods = Object.keys(proto);

        prototypeMethods.forEach(function (method) {
            mockObj[method] = function () {
            };
            sinon.stub(mockObj, method);
        });

        proto = proto.__proto__;
    }

    return mockObj;
}

var isFunction = function (obj) {
    return Object.prototype.toString.call(obj) === "[object Function]";
};

function exerciseFakePromise() {
    return {
        then: function () {
            return exerciseFakePromise();
        }
    };
}

function exerciseFakeOkPromise() {
    return {
        then: function (a, b) {
            a();
            return exerciseFakeOkPromise();
        },
        catch: function (errorHandler) {
            errorHandler();
            return exerciseFakeOkPromise();
        }
    };
}

function exerciseFakeOkPromiseWithArg(arg) {
    return {
        then: function (a, b) {
            a(arg);
            return exerciseFakeOkPromise();
        },
        catch: function (errorHandler) {
            if (errorHandler) errorHandler();
            return exerciseFakeOkPromise()
        }
    };
}

function exerciseFakeKoPromise() {
    return {
        then: function (a, b) {
            if (b)
                b();
            return exerciseFakeKoPromise();
        },
        catch: function (errorHandler) {
            errorHandler();
            return exerciseFakeKoPromise();
        }
    };
}

function exerciseFakeKoPromiseWithArg(arg) {
    return {
        then: function (a, b) {
            b(arg);
            return exerciseFakeKoPromise();
        },
        catch: function (errorHandler) {
            if (errorHandler) errorHandler();
            return exerciseFakeKoPromise()
        }
    };
}

function exerciseFakeChannel() {
    return {
        listen: function () {
        }, send: function () {
        }
    };
}

function exerciseFakeEventBusCallback(eventBus, signalName) {
    spyOn(eventBus, "on" + signalName).and.callFake(function (callbackMethod) {
        eventBus["fire" + signalName] = function () {
            callbackMethod.apply(null, arguments);
        };
    });
}