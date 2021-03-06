/**
 * Created by Justin on 5/27/2015.
 */

define(function () {
    if (undefined === window) global.window = {};
    return requireConf;
});

var requireConf = {
    'baseUrl': 'app/',
    'waitSeconds': 0,
    'paths': {
        // angular & stuffs
        'angular': '../bower_components/angular/angular.min',
        'angular-route': '../bower_components/angular-route/angular-route.min',
        'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'angularRecursion': "../bower_components/angular-recursion/angular-recursion.min",
        'angular_touch': '../bower_components/angular-touch/angular-touch.min',
        'angular-validation': '../bower_components/angular-validation/dist/angular-validation.min',
        'angular-validation-rule': '../bower_components/angular-validation/dist/angular-validation-rule.min',

        'ngSanitize': '../bower_components/angular-sanitize/angular-sanitize.min',
        'angular-moment': '../bower_components/angular-moment/angular-moment.min',
        'bootstrap-daterangepicker': '../bower_components/bootstrap-daterangepicker/daterangepicker',
        'angular-daterangepicker': '../bower_components/angular-daterangepicker/js/angular-daterangepicker',
        'ng-i18next': '../bower_components/ng-i18next/dist/ng-i18next',

        // jquery & stuffs
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'jquery_migrate': '../bower_components/jquery-migrate/jquery-migrate',
        'jquery_ui': '../bower_components/jqueryui/jquery-ui.min',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
        'slimscroll': '../bower_components/jquery-slimscroll/jquery.slimscroll.min',
        'selectToAutocomplete': '../bower_components/selectToAutocomplete/jquery.select-to-autocomplete',
        'toastr': '../bower_components/toastr/toastr',
        'readmore-js': '../node_modules/readmore-js/readmore',


        // 3rd party
        'postal': '../node_modules/postal/lib/postal.min',
        'q': '../node_modules/q/q',
        'meld': '../node_modules/meld/meld',
        'i18next': '../bower_components/i18next/i18next.min',

        'di4js': '../bower_components/di4js/di4js',

        'signals': '../node_modules/signals/dist/signals.min',
        'underscore': '../node_modules/underscore/underscore-min',
        'moment': '../node_modules/moment/min/moment-with-locales.min',
        'numbro': '../bower_components/numbro/dist/numbro.min',
        'numbroLang': '../bower_components/numbro/dist/languages.min',
        'crypto': "../node_modules/cryptojs/lib/Crypto",
        'crypto.SHA1': "../node_modules/cryptojs/lib/SHA1",
        'crypto.MD5': "../node_modules/cryptojs/lib/MD5",

        'd3': "../node_modules/d3/d3.min",
        'd3-funnel': "../node_modules/d3-funnel/dist/d3-funnel.min",


        // TODO: delete or not
        'functional-option': '../framework/Option',
        'framework': '../framework/ApplicationFactory',
        'AppsAdapter': '../assets/js/AppsAdapter',
        'lodash': '../node_modules/postal/node_modules/lodash/dist/lodash.min',
        'conduitjs': '../node_modules/postal/node_modules/conduitjs/lib/conduit.min',

        'diConfig': '../framework/diConfig'
    },

    'shim': {
        'diConfig': {
            deps: ['di4js']
        },

        //region Angular & Stuffs
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'ngSanitize': {
            deps: ['angular'],
            exports: 'ngSanitize'
        },
        'angular_touch': {
            deps: ['angular'],
            exports: 'angular_touch'
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

        'angular-daterangepicker': {
            deps: ['jquery', 'angular', 'moment', 'bootstrap-daterangepicker'],
            exports: 'angular-daterangepicker'
        },

        //endregion

        //region Jquery & stuffs
        'jquery': {
            exports: 'jquery',
        },

        'jquery_migrate': {
            deps: ['jquery']
        },

        'selectToAutocomplete': {
            deps: ['jquery'],
            exports: 'selectToAutocomplete'
        },

        'jquery_ui': {
            deps: ['jquery', 'jquery_migrate'],
            exports: 'jquery_ui'
        },

        'slimscroll': {
            deps: ['jquery', 'jquery_migrate']
        },

        'bootstrap': {
            deps: ['jquery', 'jquery_migrate', 'jquery_ui'],
            exports: 'bootstrap'
        },

        'toastr': {
            deps: ['jquery', 'jquery_migrate'],
            exports: 'toastr'
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

        //region 3rd party libs
        'crypto.SHA1': {
            deps: ['crypto'],
            exports: 'cryptoSha1'
        },
        'crypto.MD5': {
            deps: ['crypto'],
            exports: 'cryptoMd5'
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
        'numbro': {
            exports: 'numbro'
        },
        'numbroLang': {
            deps: ['numbro'],
            exports: 'numbroLang'
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
        },
        'di': {
            exports: 'di'
        }
        //endregion
    },

    'deps': [
        /* jquery & its plugins */
        'jquery', 'jquery_migrate', 'jquery_ui', 'bootstrap', 'slimscroll', 'selectToAutocomplete',

        'readmore-js', 'd3', 'd3-funnel',

        /* Angular & Its plugins */
        'angular', 'angular_touch', 'ngSanitize',
        'angular-route', 'angular-validation', 'angular-validation-rule',

        'angular-bootstrap',
        'angular-moment', 'ng-i18next',

        'angularRecursion',

        'angular-daterangepicker',
        'bootstrap-daterangepicker',

        /*3rd party libs */
        'i18next',

        'functional-option',
        'moment',
        'numbroLang',
        'numbro',

        'q', 'postal', 'meld',

        'underscore', 'signals',


        'crypto', 'crypto.SHA1', 'crypto.MD5',

        /* Dependency Injection configuration loader */
        'diConfig'
    ],
    callback: function () {
        require(['main']);
    }
};
