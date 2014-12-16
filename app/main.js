/**
 * Created by kevin on 10/22/14.
 */

var app = null;

function main() {
    /** AngularJS App Configuration **/
    function AngularConfig($routeProvider) {
        $routeProvider.otherwise({templateUrl: '/templates/account.html', controller: 'AccountController'})
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
            'services/EventBus', 'services/AjaxService', 'services/ajax/AuthAjaxService', 'services/QueryBuilder',
            'services/ObjectMerger',
            'aspects/ViewRepaintAspect', 'aspects/LogErrorAspect',
            // Channels
            'services/bus/FilterChannel',

            'models/fakes/FakeDatabase',
            'controllers/AccountController', 'views/AccountView', 'presenters/AccountPresenter', 'models/AccountModel',
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
