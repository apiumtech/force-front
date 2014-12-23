/**
 * Created by kevin on 10/22/14.
 */

var app = null;

function main() {
    /** AngularJS App Configuration **/
    function AngularConfig($routeProvider) {

        $routeProvider
            .when('/analytics/intensity', {
                templateUrl: '/templates/analytics/intensity.html',
                controller: 'IntensityController'
            })
            .otherwise({templateUrl: '/templates/account.html', controller: 'AccountController'})
    }

    AngularConfig.$inject = ['$routeProvider'];

    /** Application Building **/
    app = ApplicationFactory.newRequireApplication("RequireJS")
        .composedWith(ApplicationFactory.newAngularApplication('AngularApp', ['ngRoute', 'infinite-scroll'], AngularConfig));

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
            'views/WidgetBaseView',

            'services/WidgetBase',

            'models/fakes/FakeDatabase',
            'controllers/AccountController', 'views/AccountView', 'presenters/AccountPresenter', 'models/AccountModel',
            // Intensity Page
            'controllers/IntensityController', 'views/IntensityView', 'presenters/IntensityPresenter', 'models/IntensityModel',

            // Wrapper for widget
            'controllers/WidgetWrapperController', 'views/WidgetWrapperView',

            // intensity 1st widget
            'services/bus/ReloadWidgetChannel',
            'controllers/IntensityFirstWidgetController', 'views/IntensityFirstWidgetView', 'models/IntensityFirstWidgetModel', 'presenters/IntensityFirstWidgetPresenter',

            // intensity 2nd widget
            'controllers/IntensitySecondWidgetController', 'views/IntensitySecondWidgetView', 'models/IntensitySecondWidgetModel', 'presenters/IntensitySecondWidgetPresenter',


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
