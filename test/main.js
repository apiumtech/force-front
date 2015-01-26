/**
 * Created by kevin on 10/23/14.
 */
var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/TestSpec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    'baseUrl': '/base/app',
    'paths': {
        'lodash': '/base/node_modules/postal/node_modules/lodash/dist/lodash.min',
        'conduitjs': '/base/node_modules/postal/node_modules/conduitjs/lib/conduit.min',
        'angular-route': '/base/node_modules/angular-route/angular-route.min',
        'angular-draganddrop': '/base/node_modules/angular-draganddrop/angular-draganddrop.min',
        'angular': '/base/node_modules/angular/angular.min',
        'jquery': '/base/node_modules/jquery/dist/jquery.min',
        'postal': '/base/node_modules/postal/lib/postal.min',
        'q': '/base/node_modules/q/q',
        'functional-option': '/base/framework/Option',
        'framework': '/base/framework/ApplicationFactory',
        'meld': '/base/node_modules/meld/meld',
        'infinite-scroll': '/base/node_modules/ng-infinite-scroll/build/ng-infinite-scroll.min',
        'AppsAdapter': '/base/assets/js/AppsAdapter',
        'i18next': '/base/node_modules/i18next/lib/dep/i18next.min',
        'ng-i18next': '/base/assets/js/vendor/ng-i18next',
        'signals': '/base/assets/js/vendor/js-signals',
        'ng-sortable': '/base/assets/js/vendor/ng-sortable',
        'underscore': '/base/node_modules/underscore/underscore-min'
    },

    'shim': {
        'angular': {
            exports: 'angular'
        },
        'i18next': {
            exports: 'i18next'
        },

        'angular-route': {
            deps: ['angular'],
            exports: 'angular-route'
        },

        'angular-draganddrop': {
            deps: ['angular'],
            exports: 'angular-draganddrop'
        },

        'ng-i18next': {
            deps: ['angular', 'i18next'],
            exports: 'ng-i18next'
        },

        'ng-sortable': {
            deps: ['angular', 'jquery', 'signals'],
            exports: 'ng-sortable'
        },

        'infinite-scroll': {
            deps: ['angular'],
            exports: 'infinite-scroll'
        },

        'jquery': {
            exports: '$'
        },

        'flot': {
            exports: 'flot'
        },

        'functional-option': {
            exports: 'Option'
        },

        'framework': {
            deps: ['angular', 'functional-option'],
            exports: 'ApplicationFactory'
        }
    },

    'deps': [
        'angular', 'infinite-scroll', 'angular-route', 'jquery', 'q', 'postal', 'meld', 'framework', 'functional-option',
        'underscore', 'angular-draganddrop',
        'i18next', 'ng-i18next', 'signals', 'ng-sortable',
        'main'
    ],

    callback: test_main
});

function test_main() {
    // initialize the base application
    main();
    // run tests
    require(app.manifest.src, function () {
        require(tests, window.__karma__.start);
    });
}

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
        }
    };
}

function exerciseFakeKoPromise() {
    return {
        then: function (a, b) {
            b();
            return exerciseFakeKoPromise();
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