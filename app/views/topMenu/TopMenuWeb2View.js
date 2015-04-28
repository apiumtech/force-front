/**
 * Created by joanllenas on 4/27/15.
 */

app.registerView(function(container) {
    var BaseView = container.getView('views/BaseView');
    var TopMenuWeb2Presenter = container.getPresenter('presenters/topMenu/TopMenuWeb2Presenter');
    var TopMenuWeb2Model = container.getModel('models/topMenu/TopMenuWeb2Model');


    /**
     * @constructor
     */
    function TopMenuWeb2View($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);

        this.configureData();
        this.configureEvents();
    }


    TopMenuWeb2View.prototype = Object.create(BaseView.prototype, {});


    TopMenuWeb2View.prototype.configureData = function () {
        this.data.currentError = "";
        this.data.userSections = []; // userSections.sections
        this.data.userOptions = []; // userOptions.menuItems
        this.data.userData = null; // userData
        this.data.unreadNotifications = 0; // unreadNotifications.notifications
        this.data.tasksForToday = 0; // unreadNotifications.tasks
        this.data.eventsForToday = 0; // unreadNotifications.events
    };

    TopMenuWeb2View.prototype.configureEvents = function () {
        this.fn.getMenuTemplateName = this.getMenuTemplateName.bind(this);
        this.fn.onInit = this.onInit.bind(this);

        this.fn.hasEventsOrTasksForToday = this.hasEventsOrTasksForToday.bind(this);
        this.fn.hasTasksForToday = this.hasTasksForToday.bind(this);
        this.fn.hasEventsForToday = this.hasEventsForToday.bind(this);
        this.fn.hasUnreadNotifications = this.hasUnreadNotifications.bind(this);
    };



    TopMenuWeb2View.prototype.hasEventsOrTasksForToday = function () {
        return this.hasEventsForToday() || this.hasTasksForToday();
    };
    TopMenuWeb2View.prototype.hasEventsForToday = function () {
        return this.data.eventsForToday > 0;
    };
    TopMenuWeb2View.prototype.hasTasksForToday = function () {
        return this.data.tasksForToday > 0;
    };
    TopMenuWeb2View.prototype.hasUnreadNotifications = function () {
        return this.data.unreadNotifications > 0;
    };



    TopMenuWeb2View.prototype.onInit = function () {
        $('.content').addClass('with-web2-menu');
        this.presenter.getUserDataInfo();
    };

    TopMenuWeb2View.prototype.onGetUserDataInfo = function () {
        this.data.userSections = this.presenter.getUserSections();
        this.data.userOptions = this.presenter.getUserOptions();
        this.data.userData = this.presenter.getUserData();

        var unreadNotifications = this.presenter.getUserNotifications();
        this.data.unreadNotifications = unreadNotifications.notifications;
        this.data.tasksForToday = unreadNotifications.tasks;
        this.data.eventsForToday = unreadNotifications.events;
    };



    TopMenuWeb2View.prototype.getMenuTemplateName = function () {
        return 'topMenuWeb2';
    };


    TopMenuWeb2View.prototype.onGetUserDataInfoError = function (error) {
        this.data.currentError = error;
    };


    TopMenuWeb2View.newInstance = function($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var scope = $scope || {};
        var model = $model || TopMenuWeb2Model.newInstance().getOrElse(throwInstantiateException(TopMenuWeb2Model));
        var presenter = $presenter || TopMenuWeb2Presenter.newInstance().getOrElse(throwInstantiateException(TopMenuWeb2Presenter));
        var view = new TopMenuWeb2View(scope, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };


    return TopMenuWeb2View;
});
