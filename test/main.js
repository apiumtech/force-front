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
        'angular': '/base/node_modules/angular/angular.min',
        'angular-route': '/base/node_modules/angular-route/angular-route.min',
        'angular-draganddrop': '/base/node_modules/angular-draganddrop/angular-draganddrop.min',
        'angular-validation': '/base/node_modules/angular-validation/dist/angular-validation.min',
        'angular-validation-rule': '/base/node_modules/angular-validation/dist/angular-validation-rule.min',
        'angular-bootstrap': '/base/node_modules/angular-bootstrap/dist/ui-bootstrap-tpls.min',
        'angularRecursion': "/base/node_modules/angular-recursion/angular-recursion.min",
        'ngSanitize': '/base/node_modules/angular-sanitize/angular-sanitize.min',
        'infinite-scroll': '/base/node_modules/ng-infinite-scroll/build/ng-infinite-scroll.min',
        'ng-sortable': '/base/assets/js/vendor/ng-sortable',
        'angular-moment': '/base/node_modules/angular-moment/angular-moment.min',
        'ngFileUpload': '/base/node_modules/angular-file-upload/dist/angular-file-upload.min',
        'ng-i18next': '/base/assets/js/vendor/ng-i18next',

        // jquery & stuffs
        'jquery': '/base/node_modules/jquery/dist/jquery.min',
        'jquery_migrate': '/base/assets/js/vendor/jquery-migrate-1.2.1.min',
        'jquery_ui': '/base/node_modules/jquery-ui/jquery-ui',
        'bootstrap': '/base/assets/js/bootstrap.min',
        'slimscroll': '/base/assets/js/jquery.slimscroll.min',
        'datatables': '/base/node_modules/datatables/media/js/jquery.dataTables',
        'datatables_scroller': '/base/assets/js/vendor/dataTables.scroller.min',

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
        'i18next': '/base/node_modules/i18next/lib/dep/i18next.min',
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
        'conduitjs': '/base/node_modules/postal/node_modules/conduitjs/lib/conduit.min',
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
            exports: 'angular-validation'
        },

        'angular-validation-rule': {
            deps: ['angular', 'angular-validation'],
            exports: 'angular-validation-rule'
        },

        'angular-route': {
            deps: ['angular'],
            exports: 'angular-route'
        },

        'ngFileUpload': {
            deps: ['angular'],
            exports: 'ngFileUpload'
        },

        'angular-draganddrop': {
            deps: ['angular'],
            exports: 'angular-draganddrop'
        },

        'angular-moment': {
            deps: ['angular', 'moment'],
            exports: 'angular-moment'
        },

        'angular-bootstrap': {
            deps: ['angular'],
            exports: 'angular-bootstrap'
        },

        'angularRecursion': {
            deps: ['angular'],
            exports: 'angularRecursion'
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

        //endregion

        //region Jquery & stuffs
        'jquery': {
            exports: '$'
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

        'datatables_scroller': {
            deps: ['jquery', 'datatables']
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
            exports: 'flot-resize'
        },

        'flot-stack': {
            deps: ['jquery', 'flot'],
            exports: 'flot-stack'
        },

        'flot-pie': {
            deps: ['jquery', 'flot'],
            exports: 'flot-pie'
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
        'signals': {
            exports: 'signals'
        },
        'moment': {
            exports: 'moment'
        },
        'i18next': {
            exports: 'i18next'
        }
        //endregion
    },

    'deps': [

        /* jquery & its plugins */
        'jquery', 'jquery_migrate', 'jquery_ui', 'bootstrap', 'slimscroll',
        'datatables',

        /* Angular & Its plugins */
        'angular', 'ngSanitize', 'ngFileUpload', 'angular-route', 'angular-validation', 'angular-validation-rule',
        'angular-draganddrop',
        'angular-bootstrap',
        'ng-sortable', 'angular-moment', 'ng-i18next', 'infinite-scroll',

        'angularRecursion',

        /*3rd party libs */
        'i18next',
        // 'framework',

        'functional-option',
        'moment',

        'q', 'postal', 'meld',

        'underscore', 'signals',

        /* Flot & stuffs */
        'flot', 'flot-categories', 'flot-crosshair', 'flot-resize', 'flot-pie', 'flot-stack',
        'crypto.SHA1'
    ],

    callback: test_main
});

function test_main() {
    // initialize the base application
    //main();
    // run tests
    //require(app.manifest.src, function () {
    //    require(tests, window.__karma__.start);
    //});

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
var jasmineMock = function (constr, name) {
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