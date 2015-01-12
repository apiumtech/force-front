var require = {
    'baseUrl': 'app/',
    'paths': {
        'lodash': '/node_modules/postal/node_modules/lodash/dist/lodash.min',
        'conduitjs': '/node_modules/postal/node_modules/conduitjs/lib/conduit.min',
        'angular-route': '/node_modules/angular-route/angular-route.min',
        'angular-draggable': '../node_modules/angular-draganddrop/angular-draganddrop.min',
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
        'underscore': '/node_modules/underscore/underscore-min'
    },

    'shim': {
        'angular': {
            exports: 'angular'
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

        'angular-draggable': {
            deps: [ 'angular' ],
            exports: 'angular-draggable'
        },

        'ng-i18next': {
            deps: ['angular', 'i18next'],
            exports: 'ng-i18next'
        },

        'jquery': {
            exports: '$'
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
        'angular', 'infinite-scroll', 'angular-route', 'angular-draggable', 'jquery', 'q', 'postal', 'meld', 'framework', 'functional-option',
        'i18next', 'ng-i18next', 'underscore'
    ],

    callback: main
};