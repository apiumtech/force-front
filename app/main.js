/**
 * Created by kevin on 10/22/14.
 */

var app = null;

function main() {
    var $i18nextProviderOptions = {
        lng: 'en',
        useCookie: false,
        useLocalStorage: false,
        fallbackLng: 'en',
        resGetPath: '/app/translations/__lng__.json'
    };
    // make sure i18n configuration is loaded before the other controllers and apps
    i18n.init($i18nextProviderOptions);

    angular.module('jm.i18next').config(['$i18nextProvider', function ($i18nextProvider) {
        $i18nextProvider.options = $i18nextProviderOptions;
    }]);

    /** AngularJS App Configuration **/
    function AngularConfig($routeProvider, $i18nextProvider) {

        $routeProvider
            .when('/analytics/conversion', {
                templateUrl: '/templates/analytics/conversion.html',
                controller: 'ConversionController'
            })
            .when('/analytics/distribution', {
                templateUrl: '/templates/analytics/distribution.html',
                controller: 'DistributionController'
            })
            .when('/analytics/intensity', {
                templateUrl: '/templates/analytics/intensity.html',
                controller: 'IntensityController'
            })
            .otherwise({templateUrl: '/templates/account.html', controller: 'AccountController'});
    }

    AngularConfig.$inject = ['$routeProvider', '$i18nextProvider'];

    /** Application Building **/
    app = ApplicationFactory.newRequireApplication("RequireJS")
        .composedWith(ApplicationFactory.newAngularApplication('AngularApp', [
            'ngRoute',
            'jm.i18next',
            'infinite-scroll'
        ], AngularConfig));

    app.manifest = {
        authors: ['apiumtech'],
        version: 0.1,
        src: [
            'Configuration',
            'AppsAdapter',
            'services/EventBus', 'services/AjaxService', 'services/ajax/AuthAjaxService', 'services/QueryBuilder',
            'services/ObjectMerger',
            'aspects/ViewRepaintAspect', 'aspects/LogErrorAspect',
            // Channels
            'services/bus/FilterChannel',

            'views/BaseView',
            'views/WidgetDecoratedPageView',
            'views/WidgetBaseView',

            'services/WidgetBase',
            'services/WidgetService',
            'services/b64StringEncoder',

            'models/fakes/FakeDatabase',
            'controllers/AccountController', 'views/AccountView', 'presenters/AccountPresenter', 'models/AccountModel',
            // Intensity Page
            'controllers/IntensityController', 'views/IntensityView', 'presenters/IntensityPresenter', 'models/IntensityModel',

            // Distribution Page
            'controllers/DistributionController', 'views/DistributionView', 'presenters/DistributionPresenter', 'models/DistributionModel',

            // Conversion Page
            'controllers/ConversionController', 'views/ConversionView', 'presenters/ConversionPresenter', 'models/ConversionModel',

            // Wrapper for widget
            'controllers/WidgetWrapperController', 'views/WidgetWrapperView',

            'services/bus/WidgetEventBus',

            // Graph widget
            'controllers/GraphWidgetController', 'views/GraphWidgetView', 'models/GraphWidgetModel', 'presenters/GraphWidgetPresenter',

            // table widget
            'controllers/TableWidgetController', 'views/TableWidgetView', 'models/TableWidgetModel', 'presenters/TableWidgetPresenter',


            'controllers/LeftMenuController', 'views/LeftMenuView', 'presenters/LeftMenuPresenter',
            'controllers/filters/FilterController', 'views/filters/FilterView', 'presenters/filters/FilterPresenter', 'models/filters/FilterModel'
        ]
    };

    /** Application basic configuration **/
    app.registerObject({name: 'SourceList', dependencies: app.manifest.src}, function () {
        return app.manifest.src;
    });

    app.registerObject({name: "Application", dependencies: ["SourceList"]}, function () {
        return app;
    });

    app.initialize();
    return app;
}
