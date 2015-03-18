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
        resGetPath: '/api/translations/__lng__'
    };
    // make sure i18n configuration is loaded before the other controllers and apps
    i18n.init($i18nextProviderOptions);

    angular.module('jm.i18next').config(['$i18nextProvider', function ($i18nextProvider) {
        $i18nextProvider.options = $i18nextProviderOptions;
    }]);

    /** AngularJS App Configuration **/
    function AngularConfig($routeProvider, $i18nextProvider) {
        $routeProvider
            .when('/accounts', {
                templateUrl: '/templates/account.html',
                controller: 'AccountController'
            })


            .when('/accounts/:account_id', {
                templateUrl: '/templates/accountDetails/account_details.html',
                controller: 'AccountDetailsController'
            })

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
            'ui.bootstrap',
            'jm.i18next',
            'forcefront.sortable',
            'angularMoment',
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
            // plots
            'plots/Plot', 'plots/LineGraphPlot',
            'plots/PieChart',
            'plots/MapChart',
            'services/GoogleMapService',
            'plots/BarChart',
            'plots/SingleLineChart',

            'services/PopoverAdapter',

            // views
            'views/BaseView',
            'views/WidgetDecoratedPageView',
            'views/WidgetBaseView',

            'services/WidgetBase',
            'services/WidgetService',
            'services/b64StringEncoder',
            'services/StorageService',
            'services/DateTimeDecoratorService',
            'services/bus/AccountDetailWidgetEventBus',
            'services/TranslatorService',

            'services/DataTableService',
            'services/SignalService',
            'services/SimpleTemplateParser',

            'models/fakes/FakeDatabase',
            'models/WidgetDecoratedPageModel',

            // Account Page
            'controllers/account/AccountController', 'views/account/AccountView', 'presenters/account/AccountPresenter', 'models/account/AccountModel',

            // Account Details Page
            'controllers/accountDetails/AccountDetailsController',
            'views/accountDetails/AccountDetailsView',
            'presenters/accountDetails/AccountDetailsPresenter',
            'models/accountDetails/AccountDetailsModel',
            'services/AccountService',


            'views/accountDetails/AccountDetailWidgetWrapperView',
            'controllers/accountDetails/AccountDetailWidgetWrapperController',
            'directives/WidgetWrapperDirective',

            // Activity widget
            'directives/AccountDetailActivityDirective',
            'controllers/accountDetails/ActivityWidgetController',
            'views/accountDetails/ActivityWidgetView',
            'presenters/accountDetails/ActivityWidgetPresenter',
            'models/accountDetails/ActivityWidgetModel',

            // Opportunity Widget
            'directives/AccountDetailOpportunityDirective',
            'controllers/accountDetails/OpportunityWidgetController',
            'views/accountDetails/OpportunityWidgetView',
            'presenters/accountDetails/OpportunityWidgetPresenter',
            'models/accountDetails/OpportunityWidgetModel',

            // Agenda Widget
            'directives/AccountDetailAgendaDirective',
            'controllers/accountDetails/AgendaWidgetController',
            'views/accountDetails/AgendaWidgetView',
            'presenters/accountDetails/AgendaWidgetPresenter',
            'models/accountDetails/AgendaWidgetModel',

            // Account Filter
            'controllers/account/AccountFilterController', 'views/account/AccountFilterView',
            'presenters/account/AccountFilterPresenter', 'models/account/AccountFilterModel',

            // Intensity Page
            'controllers/IntensityController', 'views/IntensityView', 'presenters/IntensityPresenter', 'models/IntensityModel',

            // Distribution Page
            'controllers/DistributionController', 'views/DistributionView', 'presenters/DistributionPresenter', 'models/DistributionModel',

            // Conversion Page
            'controllers/ConversionController', 'views/ConversionView', 'presenters/ConversionPresenter', 'models/ConversionModel',

            // Wrapper for widget
            'controllers/WidgetWrapperController', 'views/WidgetWrapperView',

            'services/bus/WidgetEventBus',
            'services/bus/SalesAnalyticsFilterChannel',

            'controllers/filters/SalesAnalyticsFilterController',
            'views/filters/SalesAnalyticsFilterView',
            'models/filters/SalesAnalyticsFilterModel',
            'models/filters/SalesAnalyticsFilterPresentationModel',
            'presenters/filters/SalesAnalyticsFilterPresenter',

            // Graph widget
            'controllers/GraphWidgetController', 'views/GraphWidgetView', 'models/GraphWidgetModel', 'presenters/GraphWidgetPresenter',

            // Map chart widget
            'controllers/MapChartWidgetController', 'views/MapChartWidgetView', 'presenters/MapChartWidgetPresenter', 'models/MapChartWidgetModel',

            // Pie chart widget
            'controllers/PieChartWidgetController', 'views/PieChartWidgetView', 'presenters/PieChartWidgetPresenter', 'models/PieChartWidgetModel',

            // Bar chart widget
            'controllers/BarChartWidgetController', 'views/BarChartWidgetView', 'presenters/BarChartWidgetPresenter', 'models/BarChartWidgetModel',

            // SingleLine chart widget
            'controllers/SingleLineChartWidgetController', 'views/SingleLineChartWidgetView', 'presenters/SingleLineChartWidgetPresenter', 'models/SingleLineChartWidgetModel',

            // Table widget
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
