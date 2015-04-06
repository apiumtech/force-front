var require = {
    'baseUrl': 'app/',
    'paths': {
        'lodash': '../node_modules/postal/node_modules/lodash/dist/lodash.min',
        'conduitjs': '../node_modules/postal/node_modules/conduitjs/lib/conduit.min',
        'angular-route': '../node_modules/angular-route/angular-route.min',
        'angular-draganddrop': '../node_modules/angular-draganddrop/angular-draganddrop.min',
        'angular-validation': '../node_modules/angular-validation/dist/angular-validation.min',
        'angular-validation-rule': '../node_modules/angular-validation/dist/angular-validation-rule.min',
        'angular-bootstrap': '../node_modules/angular-bootstrap/dist/ui-bootstrap-tpls.min',
        'angular': '../node_modules/angular/angular.min',
        'infinite-scroll': '../node_modules/ng-infinite-scroll/build/ng-infinite-scroll.min',
        'jquery': '../node_modules/jquery/dist/jquery.min',
        'postal': '../node_modules/postal/lib/postal.min',
        'q': '../node_modules/q/q',
        'functional-option': '/framework/Option',
        'framework': '/framework/ApplicationFactory',
        'meld': '../node_modules/meld/meld',
        'AppsAdapter': '/assets/js/AppsAdapter',
        'i18next': '../node_modules/i18next/lib/dep/i18next.min',
        'ng-i18next': '../assets/js/vendor/ng-i18next',
        'ng-sortable': '../assets/js/vendor/ng-sortable',
        'signals': '../node_modules/signals/dist/signals.min',
        'underscore': '../node_modules/underscore/underscore-min',
        'flot': '../node_modules/flot/jquery.flot',
        'flot-resize': '../node_modules/flot/jquery.flot.resize',
        'flot-stack': '../node_modules/flot/jquery.flot.stack',
        'flot-pie': '../node_modules/flot/jquery.flot.pie',
        'flot-categories': '../node_modules/flot/jquery.flot.categories',
        'flot-crosshair': '../node_modules/flot/jquery.flot.crosshair',
        'moment': '../node_modules/moment/min/moment.min',
        'datatables': '../node_modules/datatables/media/js/jquery.dataTables',
        'angular-moment': '../node_modules/angular-moment/angular-moment.min',
        'ngFileUpload': '../node_modules/angular-file-upload/dist/angular-file-upload.min',
        'crypto': "/node_modules/cryptojs/lib/Crypto",
        'crypto.SHA1': "/node_modules/cryptojs/lib/SHA1",
        //'bootstrap-datepicker': '/node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min',
        //'fullcalendar': "/node_modules/fullcalendar/dist/fullcalendar.min"
    },

    'shim': {
        'angular': {
            exports: 'angular'
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

        'angular-validation': {
            deps: ['angular'],
            exports: 'angular-validation'
        },

        //'bootstrap-datepicker': {
        //    deps: ['jquery'],
        //    exports: 'bootstrap-datepicker'
        //},

        'angular-validation-rule': {
            deps: ['angular', 'angular-validation'],
            exports: 'angular-validation-rule'
        },

        'infinite-scroll': {
            deps: ['angular'],
            exports: 'infinite-scroll'
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

        'ng-i18next': {
            deps: ['angular', 'i18next'],
            exports: 'ng-i18next'
        },

        'ng-sortable': {
            deps: ['angular', 'jquery', 'signals'],
            exports: 'ng-sortable'
        },

        'jquery': {
            exports: '$'
        },

        'flot': {
            exports: 'flot'
        },

        'flot-resize': {
            deps: ['jquery', 'flot'],
            exports: 'flot-resize'
        },

        'datatables': {
            deps: ['jquery'],
            exports: 'datatables'
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

        'functional-option': {
            exports: 'Option'
        },

        'framework': {
            deps: ['angular', 'functional-option'],
            exports: 'ApplicationFactory'
        },

        //'fullcalendar': {
        //    deps: ['moment'],
        //    exports: 'fullcalendar'
        //},

        'crypto.SHA1': ['crypto']
    },

    'deps': [
        'jquery', 'angular', 'ngFileUpload', 'infinite-scroll', 'angular-route', 'angular-validation', 'angular-validation-rule',
        'angular-draganddrop', 'angular-bootstrap',
        'q', 'postal', 'meld',
        'framework', 'functional-option', 'moment',
        'i18next', 'ng-i18next',
        'underscore', 'signals', 'ng-sortable', 'angular-moment',
        'datatables',
        'flot', 'flot-categories', 'flot-crosshair', 'flot-resize', 'flot-pie', 'flot-stack',
        'crypto.SHA1' //, 'bootstrap-datepicker', 'fullcalendar'
    ],

    callback: main
};