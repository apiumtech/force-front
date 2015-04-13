requirejs.config({
    'baseUrl': 'app/',
    'out': 'build/force-manager.min.js',
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
        'functional-option': '../framework/Option',
        'framework': '../framework/ApplicationFactory',
        'meld': '../node_modules/meld/meld',
        'AppsAdapter': '../assets/js/AppsAdapter',
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
        'crypto': "../node_modules/cryptojs/lib/Crypto",
        'crypto.SHA1': "../node_modules/cryptojs/lib/SHA1",
        //'bootstrap-datepicker': '/node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min',
        'fullcalendar': "../node_modules/fullcalendar/dist/fullcalendar.min"
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
            exports: 'angularValidation'
        },

        'angular-validation-rule': {
            deps: ['angular', 'angular-validation'],
            exports: 'angularValidationRule'
        },

        'infinite-scroll': {
            deps: ['angular'],
            exports: 'infiniteScroll'
        },

        'angular-route': {
            deps: ['angular'],
            exports: 'angularRoute'
        },

        'ngFileUpload': {
            deps: ['angular'],
            exports: 'ngFileUpload'
        },

        'angular-draganddrop': {
            deps: ['angular'],
            exports: 'angularDraganddrop'
        },

        'angular-moment': {
            deps: ['angular', 'moment'],
            exports: 'angularMoment'
        },

        'angular-bootstrap': {
            deps: ['angular'],
            exports: 'angularBootstrap'
        },

        'ng-i18next': {
            deps: ['angular', 'i18next'],
            exports: 'ngI18next'
        },

        'ng-sortable': {
            deps: ['angular', 'jquery'],
            exports: 'ngSortable'
        },

        'jquery': {
            exports: '$'
        },

        'flot': {
            exports: 'flot'
        },

        'flot-resize': {
            deps: ['jquery', 'flot'],
            exports: 'flotResize'
        },

        'datatables': {
            deps: ['jquery'],
            exports: 'datatables'
        },

        'flot-stack': {
            deps: ['jquery', 'flot'],
            exports: 'flotStack'
        },

        'flot-pie': {
            deps: ['jquery', 'flot'],
            exports: 'flotPie'
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

        'fullcalendar': {
            deps: ['moment'],
            exports: 'fullcalendar'
        },

        'crypto.SHA1': ['crypto']
    },

    include: [
        'jquery', 'angular', 'ngFileUpload', 'infinite-scroll', 'angular-route', 'angular-validation', 'angular-validation-rule',
        'angular-draganddrop', 'angular-bootstrap',
        'q', 'postal', 'meld',
        'framework', 'functional-option', 'moment',
        'i18next', 'ng-i18next',
        'underscore', 'signals', 'ng-sortable', 'angular-moment',
        'datatables',
        'flot', 'flot-categories', 'flot-crosshair', 'flot-resize', 'flot-pie', 'flot-stack',
        'crypto.SHA1', 'fullcalendar',

        // app dependencies

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

        // main application
        
        'main',

    ]
});