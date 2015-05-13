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
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            })


            .when('/literal-list', {
                templateUrl: 'templates/literalList.html',
                controller: 'LiteralListController'
            })
            .when('/literal/:literalId/edit', {
                templateUrl: 'templates/literal/literal.html',
                controller: 'LiteralController'
            })
            .when('/literal', {
                templateUrl: 'templates/literal/literal.html',
                controller: 'LiteralController'
            })


            .when('/accounts', {
                templateUrl: 'templates/account.html',
                controller: 'AccountController'
            })

            .when('/accounts/:account_id', {
                templateUrl: 'templates/accountDetails/account_details.html',
                controller: 'AccountDetailsController'
            })
            .when('/accounts/:account_id/edit', {
                templateUrl: 'templates/accountDetails/accountEdit.html',
                controller: 'AccountEditController'
            })
            .when('/account/create', {
                templateUrl: 'templates/accountDetails/accountCreate.html',
                controller: 'AccountCreateController'
            })

            .when('/analytics/conversion', {
                templateUrl: 'templates/analytics/conversion.html',
                controller: 'ConversionController'
            })
            .when('/analytics/distribution', {
                templateUrl: 'templates/analytics/distribution.html',
                controller: 'DistributionController'
            })
            .when('/analytics/intensity', {
                templateUrl: 'templates/analytics/intensity.html',
                controller: 'IntensityController'
            })
            .when('/contacts', {
                templateUrl: 'templates/contact.html',
                controller: 'ContactController'
            })


            .when('/dashboard', {
                templateUrl: 'templates/dashboard/dashboardIndex.html',
                controller: 'DashboardIndexController'
            })
            .when('/opportunities', {
                templateUrl: 'templates/opportunities/opportunitiesList.html',
                controller: 'OpportunitiesListController'
            })
            .when('/opportunities/detail', {
                templateUrl: 'templates/opportunities/opportunitiesDetail.html',
                controller: 'OpportunitiesDetailController'
            })
            .when('/quotes', {
                templateUrl: 'templates/quotes/quotesList.html',
                controller: 'QuotesListController'
            })
            .when('/quotes/detail', {
                templateUrl: 'templates/quotes/quotesDetail.html',
                controller: 'QuotesDetailController'
            })
            .when('/agenda', {
                templateUrl: 'templates/agenda.html',
                controller: 'AgendaController'
            })
            .when('/product', {
                templateUrl: 'templates/products/productsList.html',
                controller: 'ProductsListController'
            })
            .when('/product/detail', {
                templateUrl: 'templates/products/productDetail.html',
                controller: 'ProductDetailController'
            })
            .when('/document', {
                templateUrl: 'templates/document/documentList.html',
                controller: 'DocumentListController'
            })
            .when('/activity', {
                templateUrl: 'templates/activity/activityList.html',
                controller: 'ActivityListController'
            })
            .otherwise('/analytics/intensity');

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
            'ngSanitize',
            'ngRoute',
            'ui.bootstrap',
            'jm.i18next',
            'forcefront.sortable',
            'angularMoment',
            'angularFileUpload',
            'infinite-scroll',
            'validation',
            'validation.rule'
        ], AngularConfig));

    app.manifest = {
        authors: ['apiumtech'],
        version: 0.1,
        src: [
            'Configuration',
            'AppsAdapter',
            'directives/ScrollTopButtonDirective',
            'services/EventBus', 'services/AjaxService', 'services/ajax/AuthAjaxService', 'services/QueryBuilder',
            'services/ObjectMerger',
            'aspects/ViewRepaintAspect', 'aspects/LogErrorAspect',
            // Channels
            'services/bus/FilterChannel',

            'services/bus/BaseWidgetEventBus',
            // plots
            'plots/Plot', 'plots/LineGraphPlot',
            'plots/PieChart',
            'plots/MapChart',
            'services/GoogleMapService',
            'plots/BarChart',
            'plots/SingleLineChart',

            'services/PopoverAdapter',
            'services/bus/ScrollEventBus',
            'directives/HighLightResultDirective',
            'directives/TriStateCheckBoxDirective',
            'directives/ForceDatePickerDirective',


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



            // Literal
            'models/literal/LiteralModel',

            // Literal List Page
            'controllers/literal/LiteralListController',
            'views/literal/LiteralListView',
            'presenters/literal/LiteralListPresenter',

            //Literal Page
            'controllers/literal/LiteralController',
            'views/literal/LiteralView',
            'presenters/literal/LiteralPresenter',



            // Account Page
            'controllers/account/AccountController',
            'models/account/AccountModel',
            'views/account/AccountView',
            'presenters/account/AccountPresenter',

            // confirmation dialog
            'controllers/ConfirmationDialogController',
            'controllers/NotificationDialogController',
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

            'views/widgets/WidgetWrapperView',
            'controllers/widgets/WidgetWrapperController',
            'directives/widgets/WidgetWrapperDirective',

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
            'models/accountDetails/DocumentsWidgetModel',
            'views/accountDetails/DocumentsWidgetView',
            'presenters/accountDetails/DocumentsWidgetPresenter',

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
            'directives/widgets/IntensityGraphWidgetDirective',
            'controllers/widgets/IntensityGraphWidgetController', 'views/GraphWidgetView', 'models/widgets/GraphWidgetModel', 'presenters/widgets/GraphWidgetPresenter',

            // Map chart widget
            'directives/widgets/DistributionGeographicalWidgetDirective',
            'controllers/widgets/DistributionGeographicalWidgetController', 'views/MapChartWidgetView', 'presenters/widgets/MapChartWidgetPresenter', 'models/widgets/MapChartWidgetModel',

            // Pie chart widget
            'presenters/widgets/PieChartWidgetPresenter',
            'views/widgets/PieChartWidgetView',
            'models/widgets/PieChartWidgetModel',
            // Distribution Segment Pie Chart
            'directives/widgets/DistributionSegmentPieWidgetDirective',
            'models/widgets/SegmentPieChartWidgetModel',
            'controllers/widgets/DistributionSegmentPieWidgetController',
            'views/SegmentPieChartWidgetView',
            // Distribution Hour Pie Chart
            'directives/widgets/DistributionHourPieWidgetDirective',
            'models/widgets/HourPieChartWidgetModel',
            'controllers/widgets/DistributionHourPieWidgetController',
            'views/HourPieChartWidgetView',

            // Bar chart widget
            'directives/widgets/BarChartWidgetDirective',
            'controllers/widgets/BarChartWidgetController', 'views/widgets/BarChartWidgetView', 'presenters/widgets/BarChartWidgetPresenter', 'models/widgets/BarChartWidgetModel',

            // SingleLine chart widget
            'directives/widgets/DistributionHourLineWidgetDirective',
            'controllers/widgets/DistributionHourLineWidgetController',
            'views/SingleLineChartWidgetView', 'presenters/widgets/SingleLineChartWidgetPresenter', 'models/widgets/SingleLineChartWidgetModel',

            // Table widget
            'directives/widgets/IntensityRankingWidgetDirective',
            'controllers/widgets/IntensityRankingWidgetController', 'views/TableWidgetView', 'models/widgets/TableWidgetModel', 'presenters/widgets/TableWidgetPresenter',
            'controllers/widgets/IntensityRankingWidgetController', 'views/TableWidgetView', 'models/widgets/TableWidgetModel', 'presenters/widgets/TableWidgetPresenter',

            'controllers/TopMenuController', 'views/TopMenuView',
            'views/topMenu/TopMenuWeb2View', 'presenters/topMenu/TopMenuWeb2Presenter', 'models/topMenu/TopMenuWeb2Model',
            'views/topMenu/TopMenuWeb3View',

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

            // Dashboard
            'controllers/dashboard/DashboardIndexController',

            // Opportunities page
            'controllers/opportunities/OpportunitiesListController',
            'controllers/opportunities/OpportunitiesDetailController',

            // Quotes page
            'controllers/quotes/QuotesListController',
            'controllers/quotes/QuotesDetailController',

            // Agenda page
            'controllers/agenda/AgendaController',

            // Products page
            'controllers/products/ProductsListController',
            'controllers/products/ProductDetailController',

            // Document page
            'controllers/document/DocumentListController',

            // Activity
            'controllers/activity/ActivityListController',

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
