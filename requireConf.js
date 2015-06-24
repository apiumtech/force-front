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
        'angular-validation': '../bower_components/angular-validation/dist/angular-validation.min',
        'angular-validation-rule': '../bower_components/angular-validation/dist/angular-validation-rule.min',
        'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'angularRecursion': "../bower_components/angular-recursion/angular-recursion.min",
        'angular_touch': '../bower_components/angular-touch/angular-touch.min',

        'ngSanitize': '../bower_components/angular-sanitize/angular-sanitize.min',
        'angular-moment': '../bower_components/angular-moment/angular-moment.min',
        'ng-i18next': '../bower_components/ng-i18next/dist/ng-i18next',

        'infinite-scroll': '../node_modules/ng-infinite-scroll/build/ng-infinite-scroll.min',
        'ngFileUpload': '../node_modules/angular-file-upload/dist/angular-file-upload.min',

        // jquery & stuffs
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'jquery_migrate': '../bower_components/jquery-migrate/jquery-migrate',
        'jquery_ui': '../bower_components/jqueryui/jquery-ui.min',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
        'slimscroll': '../bower_components/jquery-slimscroll/jquery.slimscroll.min',
        'selectToAutocomplete': '../bower_components/selectToAutocomplete/jquery.select-to-autocomplete',
        'fullcalendar': '../bower_components/fullcalendar/dist/fullcalendar',
        'toastr': '../bower_components/toastr/toastr.min',

        'datatables': '../node_modules/datatables/media/js/jquery.dataTables',

        // flot & stuffs
        'flot': '../node_modules/flot/jquery.flot',
        'flot-resize': '../node_modules/flot/jquery.flot.resize',
        'flot-stack': '../node_modules/flot/jquery.flot.stack',
        'flot-pie': '../node_modules/flot/jquery.flot.pie',
        'flot-categories': '../node_modules/flot/jquery.flot.categories',
        'flot-crosshair': '../node_modules/flot/jquery.flot.crosshair',

        // 3rd party
        'postal': '../node_modules/postal/lib/postal.min',
        'q': '../node_modules/q/q',
        'meld': '../node_modules/meld/meld',
        'i18next': '../bower_components/i18next/i18next.min',

        'di4js': '../bower_components/di4js/di4js',

        'signals': '../node_modules/signals/dist/signals.min',
        'underscore': '../node_modules/underscore/underscore-min',
        'moment': '../node_modules/moment/min/moment.min',
        'crypto': "../node_modules/cryptojs/lib/Crypto",
        'crypto.SHA1': "../node_modules/cryptojs/lib/SHA1",

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
            exports: 'jquery',
        },

        'jquery_migrate': {
            deps: ['jquery']
        },

        'selectToAutocomplete': {
            deps: ['jquery'],
            exports: 'selectToAutocomplete'
        },

        'fullcalendar': {
            deps: ['jquery'],
            exports: 'fullcalendar'
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

        'datatables': {
            deps: ['jquery']
        },

        'toastr': {
            deps: ['jquery'],
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
        },
        'di': {
            exports: 'di'
        }
        //endregion
    },

    'deps': [
        /* jquery & its plugins */
        'jquery', 'jquery_migrate', 'jquery_ui', 'bootstrap', 'slimscroll', 'selectToAutocomplete', 'fullcalendar',
        'datatables', 'toastr',

        /* Angular & Its plugins */
        'angular', 'angular_touch', 'ngSanitize', 'ngFileUpload',
        'angular-route', 'angular-validation', 'angular-validation-rule',

        'angular-bootstrap',
        'angular-moment', 'ng-i18next', 'infinite-scroll',

        'angularRecursion',

        /*3rd party libs */
        'i18next',

        'functional-option',
        'moment',

        'q', 'postal', 'meld',

        'underscore', 'signals',

        /* Flot & stuffs */
        'flot', 'flot-categories', 'flot-crosshair', 'flot-resize', 'flot-pie', 'flot-stack', 'crypto',
        'crypto.SHA1',

        /* Dependency Injection configuration loader */
        'diConfig'
    ],
    callback: function () {
        require(['main']);
    }
};
