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
    function AngularConfig($routeProvider, $validationProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: '/templates/login.html',
                controller: 'LoginController'
            })
            .when('/accounts', {
                templateUrl: '/templates/account.html',
                controller: 'AccountController'
            })

            .when('/accounts/:account_id', {
                templateUrl: '/templates/accountDetails/account_details.html',
                controller: 'AccountDetailsController'
            })
            .when('/accounts/:account_id/edit', {
                templateUrl: '/templates/accountDetails/accountEdit.html',
                controller: 'AccountEditController'
            })
            .when('/account/create', {
                templateUrl: '/templates/accountDetails/accountCreate.html',
                controller: 'AccountCreateController'
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
            .when('/contacts', {
                templateUrl: '/templates/contact.html',
                controller: 'ContactController'
            })
            .otherwise('/login');

        // configure validation system here
        var expression = {
            nilOrNumber: function (value) {
                if (!value)
                    return true;

                return value.match(/^\d+$/);
            },
            nilOrUrl: function (value) {
                if (!value)
                    return true;

                return value.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);
            },
            nilOrEmail: function (value) {
                if (!value)
                    return true;

                return value.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
            }
        };
        var defaultMsg = {
            required: {
                error: i18n.t('validationMsg.required')
            },
            email: {
                error: i18n.t('validationMsg.email')
            },
            nilOrEmail: {
                error: i18n.t('validationMsg.email')
            },
            number: {
                error: i18n.t('validationMsg.number')
            },
            nilOrNumber: {
                error: i18n.t('validationMsg.number')
            },
            url: {
                error: i18n.t('validationMsg.url')
            },
            nilOrUrl: {
                error: i18n.t('validationMsg.url')
            }
        };

        $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
    }

    AngularConfig.$inject = ['$routeProvider', '$validationProvider'];

    /** Application Building **/
    app = ApplicationFactory.newRequireApplication("RequireJS")
        .composedWith(ApplicationFactory.newAngularApplication('AngularApp', [
            'ngRoute',
            'ui.bootstrap',
            'jm.i18next',
            'forcefront.sortable',
            'angularMoment',
            'angularFileUpload',
            'infinite-scroll',
            'validation', 'validation.rule'
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

            // TODO: to be removed in production
            'services/FakeAjaxService',

            // views
            'views/BaseView',
            'views/WidgetDecoratedPageView',
            'views/WidgetBaseView',

            'services/DataTableDataProvider',
            'services/EventBase',
            'services/AccountEventBus',
            'services/ModalDialogAdapter',
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

            //Login Page
            'controllers/LoginController',
            'views/LoginView',
            'presenters/LoginPresenter',
            'models/LoginModel',

            // Account Page
            'controllers/account/AccountController',
            'models/account/AccountModel',
            'views/account/AccountView',
            'presenters/account/AccountPresenter',

            // confirmation dialog
            'controllers/ConfirmationDialogController',
            'views/ConfirmationDialogView',

            'models/filters/BaseAccountFilterModel',

            'services/AwaitHelper',

            // string type filter
            'directives/filters/StringTypeFilterDirective',
            'controllers/filters/StringTypeFilterController',
            'views/filters/StringTypeFilterView',
            'models/filters/StringTypeFilterModel',
            'presenters/filters/StringTypeFilterPresenter',

            'directives/filters/DatetimeTypeFilterDirective',
            'controllers/filters/DatetimeTypeFilterController',
            'views/filters/DatetimeTypeFilterView',
            'presenters/filters/DatetimeTypeFilterPresenter',

            'directives/filters/BooleanTypeFilterDirective',
            'controllers/filters/BooleanTypeFilterController',
            'presenters/filters/BooleanTypeFilterPresenter',
            'views/filters/BooleanTypeFilterView',


            'presenters/accountDetails/AccountEditingSharedPresenter',
            'models/accountDetails/AccountEditingModel',

            // Account Create Page
            'controllers/accountDetails/AccountCreateController',
            'views/accountDetails/AccountCreateView',
            'presenters/accountDetails/AccountCreatePresenter',

            // Account Edit Page
            'controllers/accountDetails/AccountEditController',
            'views/accountDetails/AccountEditView',
            'presenters/accountDetails/AccountEditPresenter',

            // Account Details Page
            'controllers/accountDetails/AccountDetailsController',
            'models/accountDetails/AccountDetailsModel',
            'views/accountDetails/AccountDetailsView',
            'presenters/accountDetails/AccountDetailsPresenter',
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

            // Last documents Widget
            'directives/AccountDetailDocumentsDirective',
            'controllers/accountDetails/DocumentsController',
            'views/accountDetails/DocumentsWidgetView',

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
            'controllers/filters/FilterController', 'views/filters/FilterView', 'presenters/filters/FilterPresenter', 'models/filters/FilterModel',

            //Design Prove Controller
            'controllers/DesignProveController',

            // Contacts Page
            'controllers/contact/ContactController',
            'models/contact/ContactModel',
            'views/contact/ContactView',
            'presenters/contact/ContactPresenter',

            // Contacts filter
            'controllers/contact/ContactFilterController',
            'models/contact/ContactFilterModel',
            'views/contact/ContactFilterView',
            'presenters/contact/ContactFilterPresenter',

            //config
            'services/config/EntityService'

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
