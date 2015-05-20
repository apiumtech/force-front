requirejs.config({
    'baseUrl': 'app/',
    'paths': {
        // angular & stuffs
        'angular': '../node_modules/angular/angular.min',
        'angular-route': '../node_modules/angular-route/angular-route.min',
        'angular-draganddrop': '../node_modules/angular-draganddrop/angular-draganddrop.min',
        'angular-validation': '../node_modules/angular-validation/dist/angular-validation.min',
        'angular-validation-rule': '../node_modules/angular-validation/dist/angular-validation-rule.min',
        'angular-bootstrap': '../node_modules/angular-bootstrap/dist/ui-bootstrap-tpls.min',
        'angularRecursion': "../node_modules/angular-recursion/angular-recursion.min",
        'ngSanitize': '../node_modules/angular-sanitize/angular-sanitize.min',
        'infinite-scroll': '../node_modules/ng-infinite-scroll/build/ng-infinite-scroll.min',
        'ng-sortable': '../assets/js/vendor/ng-sortable',
        'angular-moment': '../node_modules/angular-moment/angular-moment.min',
        'ngFileUpload': '../node_modules/angular-file-upload/dist/angular-file-upload.min',
        'ng-i18next': '../assets/js/vendor/ng-i18next',

        // jquery & stuffs
        'jquery': '../node_modules/jquery/dist/jquery.min',
        'jquery_migrate': '../assets/js/vendor/jquery-migrate-1.2.1.min',
        'jquery_ui': '../node_modules/jquery-ui/jquery-ui',
        'bootstrap': '../assets/js/bootstrap.min',
        'slimscroll': '../assets/js/jquery.slimscroll.min',
        'datatables': '../node_modules/datatables/media/js/jquery.dataTables',
        'datatables_scroller': '../assets/js/vendor/dataTables.scroller.min',

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
        'i18next': '../node_modules/i18next/lib/dep/i18next.min',
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

    callback: function () {
        require(['main']);
    }
});