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
        // angular & stuffs
        'angular': '/base/bower_components/angular/angular.min',
        'angular-route': '/base/bower_components/angular-route/angular-route.min',
        'angular-validation': '/base/bower_components/angular-validation/dist/angular-validation.min',
        'angular-validation-rule': '/base/bower_components/angular-validation/dist/angular-validation-rule.min',
        'angular-bootstrap': '/base/bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'angularRecursion': "../bower_components/angular-recursion/angular-recursion.min",

        'ngSanitize': '/base/bower_components/angular-sanitize/angular-sanitize.min',
        'angular-moment': '/base/bower_components/angular-moment/angular-moment.min',
        'ng-i18next': '/base/bower_components/ng-i18next/dist/ng-i18next',

        'infinite-scroll': '/base/node_modules/ng-infinite-scroll/build/ng-infinite-scroll.min',
        'ngFileUpload': '/base/node_modules/angular-file-upload/dist/angular-file-upload.min',

        // jquery & stuffs
        'jquery': '/base/bower_components/jquery/dist/jquery.min',
        'jquery_migrate': '/base/bower_components/jquery-migrate/jquery-migrate',
        'jquery_ui': '/base/bower_components/jqueryui/jquery-ui.min',
        'bootstrap': '/base/bower_components/bootstrap/dist/js/bootstrap.min',
        'slimscroll': '/base/bower_components/jquery-slimscroll/jquery.slimscroll.min',

        'datatables': '/base/node_modules/datatables/media/js/jquery.dataTables',

        // flot & stuffs
        'flot': '/base/node_modules/flot/jquery.flot',
        'flot-resize': '/base/node_modules/flot/jquery.flot.resize',
        'flot-stack': '/base/node_modules/flot/jquery.flot.stack',
        'flot-pie': '/base/node_modules/flot/jquery.flot.pie',
        'flot-categories': '/base/node_modules/flot/jquery.flot.categories',
        'flot-crosshair': '/base/node_modules/flot/jquery.flot.crosshair',

        // 3rd party
        'postal': '/base/node_modules/postal/lib/postal.min',
        'q': '/base/node_modules/q/q',
        'meld': '/base/node_modules/meld/meld',
        'i18next': '/base/bower_components/i18next/i18next.min',

        'signals': '/base/node_modules/signals/dist/signals.min',
        'underscore': '/base/node_modules/underscore/underscore-min',
        'moment': '/base/node_modules/moment/min/moment.min',
        'crypto': "../node_modules/cryptojs/lib/Crypto",
        'crypto.SHA1': "../node_modules/cryptojs/lib/SHA1",

        // TODO: delete or not
        'functional-option': '/base/framework/Option',
        'framework': '/base/framework/ApplicationFactory',
        'AppsAdapter': '/base/assets/js/AppsAdapter',
        'lodash': '/base/node_modules/postal/node_modules/lodash/dist/lodash.min',
        'conduitjs': '/base/node_modules/postal/node_modules/conduitjs/lib/conduit.min'
    },

    'shim': {
        //region Angular & Stuffs
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'ngSanitize': {
            deps: ['angular'],
            exports: 'ngSanitize'
        },

        'angular-validation': {
            deps: ['angular'],
            exports: 'angular_validation'
        },

        'angular-validation-rule': {
            deps: ['angular', 'angular-validation'],
            exports: 'angular_validation_rule'
        },

        'angular-route': {
            deps: ['angular'],
            exports: 'angular_route'
        },

        'ngFileUpload': {
            deps: ['angular'],
            exports: 'ngFileUpload'
        },

        'angular-moment': {
            deps: ['angular', 'moment'],
            exports: 'angular_moment'
        },

        'angular-bootstrap': {
            deps: ['angular'],
            exports: 'angular_bootstrap'
        },

        'angularRecursion': {
            deps: ['angular'],
            exports: 'angularRecursion'
        },

        'ng-i18next': {
            deps: ['angular', 'i18next'],
            exports: 'ng_i18next'
        },

        'infinite-scroll': {
            deps: ['angular'],
            exports: 'infinite_scroll'
        },

        //endregion

        //region Jquery & stuffs
        'jquery': {
            exports: 'jquery'
        },

        'jquery_migrate': {
            deps: ['jquery']
        },

        'jquery_ui': {
            deps: ['jquery', 'jquery_migrate']
        },

        'slimscroll': {
            deps: ['jquery', 'jquery_migrate']
        },

        'bootstrap': {
            deps: ['jquery', 'jquery_migrate', 'jquery_ui']
        },

        'datatables': {
            deps: ['jquery']
        },

        //endregion

        //region TODO: delete or not ??
        'functional-option': {
            exports: 'Option'
        },

        'framework': {
            deps: ['angular', 'functional-option'],
            exports: 'ApplicationFactory'
        },
        //endregion

        //region Flot & stuffs
        'flot': {
            deps: ['jquery'],
            exports: 'flot'
        },

        'flot-resize': {
            deps: ['jquery', 'flot'],
            exports: 'flot_resize'
        },

        'flot-stack': {
            deps: ['jquery', 'flot'],
            exports: 'flot_stack'
        },

        'flot-pie': {
            deps: ['jquery', 'flot'],
            exports: 'flot_pie'
        },

        'flot-categories': {
            exports: 'flotCategories',
            deps: ['flot']
        },

        'flot-crosshair': {
            exports: 'flotCrosshair',
            deps: ['flot']
        },
//endregion flot

        //region 3rd party libs
        'crypto.SHA1': {
            deps: ['crypto'],
            exports: 'cryptoSha1'
        },
        'crypto': {
            exports: 'crypto'
        },
        'signals': {
            exports: 'signals'
        },
        'moment': {
            exports: 'moment'
        },
        'i18next': {
            exports: 'i18next'
        },
        'q': {
            exports: 'q'
        },
        'postal': {
            exports: 'postal'
        },
        'underscore': {
            exports: 'underscore'
        }
        //endregion
    },

    'deps': [

        /* jquery & its plugins */
        'jquery', 'jquery_migrate', 'jquery_ui', 'bootstrap', 'slimscroll',
        'datatables',

        /* Angular & Its plugins */
        'angular', 'ngSanitize', 'ngFileUpload', 'angular-route', 'angular-validation', 'angular-validation-rule',

        'angular-bootstrap',
        'angular-moment', 'ng-i18next', 'infinite-scroll',

        'angularRecursion',

        /*3rd party libs */
        'i18next',
        // 'framework',

        'functional-option',
        'moment',

        'q', 'postal', 'meld',

        'underscore', 'signals',

        /* Flot & stuffs */
        'flot', 'flot-categories', 'flot-crosshair', 'flot-resize', 'flot-pie', 'flot-stack', 'crypto',
        'crypto.SHA1',
        'main'
    ],

    callback: test_main
});

function test_main() {
    require(tests, window.__karma__.start);
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
function jasmineMock (constr, name) {
    console.log("mocking: ", name);
    var keys = [];
    for (var key in constr.prototype) {
        keys.push(key);
    }
    return keys.length > 0 ? jasmine.createSpyObj(name || "mock", keys) : {};
};

var isFunction = function (obj) {
    return Object.prototype.toString.call(obj) === "[object Function]";
};

function testDeclareMethod(sut, method) {
    expect(sut[method]).not.toBeNull();
    expect(isFunction(sut[method])).toEqual(true);
}

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

function exerciseFakeOkPromiseWithArg(arg) {
    return {
        then: function (a, b) {
            a(arg);
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

function exerciseFakeKoPromiseWithArg(arg) {
    return {
        then: function (a, b) {
            b(arg);
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