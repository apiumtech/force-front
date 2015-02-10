var require = {
    'baseUrl': 'app/',
    'paths': {
        'lodash': '/node_modules/postal/node_modules/lodash/dist/lodash.min',
        'conduitjs': '/node_modules/postal/node_modules/conduitjs/lib/conduit.min',
        'angular-route': '/node_modules/angular-route/angular-route.min',
        'angular-draganddrop': '../node_modules/angular-draganddrop/angular-draganddrop.min',
        'angular-bootstrap': '../node_modules/angular-bootstrap/dist/ui-bootstrap-tpls.min',
        'angular': '/node_modules/angular/angular.min',
        'infinite-scroll': '/node_modules/ng-infinite-scroll/build/ng-infinite-scroll.min',
        'jquery': '/node_modules/jquery/dist/jquery.min',
        'postal': '/node_modules/postal/lib/postal.min',
        'q': '/node_modules/q/q',
        'functional-option': '/framework/Option',
        'framework': '/framework/ApplicationFactory',
        'meld': '/node_modules/meld/meld',
        'AppsAdapter': '/assets/js/AppsAdapter',
        'i18next': '/node_modules/i18next/lib/dep/i18next.min',
        'ng-i18next': '/assets/js/vendor/ng-i18next',
        'ng-sortable': '/assets/js/vendor/ng-sortable',
        'signals': '/node_modules/signals/dist/signals.min',
        'underscore': '/node_modules/underscore/underscore-min',
        'flot': '/node_modules/flot/jquery.flot',
        'flot-resize': '/node_modules/flot/jquery.flot.resize',
        'flot-stack': '/node_modules/flot/jquery.flot.stack',
        'flot-pie': '/node_modules/flot/jquery.flot.pie',
        'flot-categories': '/node_modules/flot/jquery.flot.categories',
        'flot-crosshair': '/node_modules/flot/jquery.flot.crosshair',
        'moment': '/node_modules/moment/min/moment.min',
        'jvectormap': '/assets/plugins/jquery-jvectormap/jquery-jvectormap-1.2.2.min',
        'jvectormap-millmap': '/assets/plugins/jquery-jvectormap/jquery-jvectormap-world-mill-en'
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

        'infinite-scroll': {
            deps: ['angular'],
            exports: 'infinite-scroll'
        },

        'angular-route': {
            deps: ['angular'],
            exports: 'angular-route'
        },

        'angular-draganddrop': {
            deps: ['angular'],
            exports: 'angular-draganddrop'
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

        'jvectormap': {
            deps: ['jquery'],
            exports: 'jvectormap'
        },

        'jvectormap-millmap': {
            deps: ['jquery', 'jvectormap'],
            exports: 'jvectormap-millmap'
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

        'functional-option': {
            exports: 'Option'
        },

        'framework': {
            deps: ['angular', 'functional-option'],
            exports: 'ApplicationFactory'
        }
    },

    'deps': [
        'angular', 'infinite-scroll', 'angular-route', 'angular-draganddrop', 'angular-bootstrap',
        'jquery', 'q', 'postal', 'meld',
        'framework', 'functional-option', 'moment',
        'i18next', 'ng-i18next', 'underscore', 'signals', 'ng-sortable',
        'flot', 'flot-categories', 'flot-crosshair', 'flot-resize', 'flot-pie', 'flot-stack', 'jvectormap', 'jvectormap-millmap'
    ],

    callback: main
};