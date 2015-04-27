/**
 * Created by joanllenas on 4/21/15.
 */

app.registerView(function(container) {
    var BaseView = container.getView('views/BaseView');
    var TopMenuModel = container.getModel('models/TopMenuModel');
    var TopMenuPresenter = container.getPresenter('presenters/TopMenuPresenter');


    /**
     * @constructor
     */
    function TopMenuView($scope, $model, $presenter, $window) {
        BaseView.call(this, $scope, $model, $presenter);
        this.$window = $window;

        this.web3Urls = [
            /*"localhost",
            "127.0.0.1",
            "54.171.216.35"*/
        ];

        this.configureData();
        this.configureEvents();
    }


    TopMenuView.WEB3_TEMPLATE_NAME = 'topMenuWeb3';
    TopMenuView.WEB2_TEMPLATE_NAME = 'topMenuWeb2';
    TopMenuView.prototype = Object.create(BaseView.prototype, {});


    TopMenuView.prototype.configureData = function () {
        this.data.currentError = "";
        this.data.userSections = []; // userSections.sections
        this.data.userOptions = []; // userOptions.menuItems
        this.data.userData = null; // userData
        this.data.unreadNotifications = 0; // unreadNotifications.notifications
        this.data.tasksForToday = 0; // unreadNotifications.tasks
        this.data.eventsForToday = 0; // unreadNotifications.events
    };

    TopMenuView.prototype.configureEvents = function () {
        this.fn.getMenuTemplateName = this.getMenuTemplateName.bind(this);
        this.fn.onInit = this.onInit.bind(this);

        this.fn.hasEventsOrTasksForToday = this.hasEventsOrTasksForToday.bind(this);
        this.fn.hasTasksForToday = this.hasTasksForToday.bind(this);
        this.fn.hasEventsForToday = this.hasEventsForToday.bind(this);
        this.fn.hasUnreadNotifications = this.hasUnreadNotifications.bind(this);
    };


    TopMenuView.prototype.hasEventsOrTasksForToday = function () {
        return this.hasEventsForToday() || this.hasTasksForToday();
    };
    TopMenuView.prototype.hasEventsForToday = function () {
        return this.data.eventsForToday > 0;
    };
    TopMenuView.prototype.hasTasksForToday = function () {
        return this.data.tasksForToday > 0;
    };
    TopMenuView.prototype.hasUnreadNotifications = function () {
        return this.data.unreadNotifications > 0;
    };


    TopMenuView.prototype.inWeb3 = function () {
        var self = this;
        var shouldBeWeb3 = this.web3Urls.filter(function(item){
                var found = self.$window.location.href.indexOf(item) > -1;
                return found;
            }).length > 0;
        return shouldBeWeb3;
    };

    TopMenuView.prototype.onInit = function () {
        this.inWeb3() ? this.onInitWeb3() : this.onInitWeb2();
    };
    TopMenuView.prototype.onInitWeb2 = function () {
        this.presenter.getUserDataInfo();
    };
    TopMenuView.prototype.onInitWeb3 = function () {
    };


    TopMenuView.prototype.getMenuTemplateName = function () {
        return this.inWeb3() ? TopMenuView.WEB3_TEMPLATE_NAME : TopMenuView.WEB2_TEMPLATE_NAME;
    };



    TopMenuView.prototype.onGetUserDataInfo = function () {
        this.data.userSections = this.presenter.getUserSections();
        this.data.userOptions = this.presenter.getUserOptions();
        this.data.userData = this.presenter.getUserData();

        var unreadNotifications = this.presenter.getUserNotifications();
        this.data.unreadNotifications = unreadNotifications.notifications;
        this.data.tasksForToday = unreadNotifications.tasks;
        this.data.eventsForToday = unreadNotifications.events;
    };

    TopMenuView.prototype.onGetUserDataInfoError = function (error) {
        this.data.currentError = error;
    };


    TopMenuView.newInstance = function($scope, $model, $presenter, $window, $viewRepAspect, $logErrorAspect) {
        var scope = $scope || {};
        var model = $model || TopMenuModel.newInstance().getOrElse(throwInstantiateException(TopMenuModel));
        var presenter = $presenter || TopMenuPresenter.newInstance().getOrElse(throwInstantiateException(TopMenuPresenter));
        var view = new TopMenuView(scope, model, presenter, $window);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return TopMenuView;
});
