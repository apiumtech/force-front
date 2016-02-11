define([
    'shared/BaseView',
    'core/topMenu/TopMenuWeb2Model',
    'core/topMenu/TopMenuWeb2Presenter',
    'jquery'
], function (BaseView, TopMenuWeb2Model, TopMenuWeb2Presenter, $) {
    'use strict';

    function TopMenuWeb4View($scope, $model, $presenter, $window) {
        BaseView.call(this, $scope, $model, $presenter);
        this.$window = $window;

        this.configureData();
        this.configureEvents();
    }

    TopMenuWeb4View.inherits(BaseView);


    TopMenuWeb4View.prototype.configureData = function () {
        this.data.currentError = "";
        this.data.userSections = []; // userSections.sections
        this.data.userOptions = []; // userOptions.menuItems
        this.data.userData = null; // userData
        this.data.unreadNotifications = 0; // unreadNotifications.notifications
        this.data.tasksForToday = 0; // unreadNotifications.tasks
        this.data.eventsForToday = 0; // unreadNotifications.events
    };

    TopMenuWeb4View.prototype.configureEvents = function () {
        this.fn.getMenuTemplateName = this.getMenuTemplateName.bind(this);
        this.fn.onInit = this.onInit.bind(this);
        this.fn.adjustLinkToParentFolder = this.adjustLinkToParentFolder.bind(this);
        this.fn.adjustDefaultAccessPageLink = this.adjustDefaultAccessPageLink.bind(this);
        this.fn.doProfileMenuAction = this.doProfileMenuAction.bind(this);
        this.fn.hasEventsOrTasksForToday = this.hasEventsOrTasksForToday.bind(this);
        this.fn.hasTasksForToday = this.hasTasksForToday.bind(this);
        this.fn.hasEventsForToday = this.hasEventsForToday.bind(this);
        this.fn.hasUnreadNotifications = this.hasUnreadNotifications.bind(this);

        this.event.getUserDataInfo = function () {};
        this.event.getUserSections = function () {};
        this.event.getUserOptions = function () {};
        this.event.getUserData = function () {};
        this.event.getUserNotifications = function () {};
        this.event.logout = function () {};
    };


    TopMenuWeb4View.prototype.hasEventsOrTasksForToday = function () {
        return this.hasEventsForToday() || this.hasTasksForToday();
    };
    TopMenuWeb4View.prototype.hasEventsForToday = function () {
        return this.data.eventsForToday > 0;
    };
    TopMenuWeb4View.prototype.hasTasksForToday = function () {
        return this.data.tasksForToday > 0;
    };
    TopMenuWeb4View.prototype.hasUnreadNotifications = function () {
        return this.data.unreadNotifications > 0;
    };


    TopMenuWeb4View.prototype.onInit = function () {
        //$('.content').addClass('with-web2-menu');
        this.event.getUserDataInfo();
    };


    TopMenuWeb4View.prototype.onLogout = function () {
        this.$window.location.href = "/Login.aspx";
    };
    TopMenuWeb4View.prototype.onLogoutError = function (error) {
        this.data.currentError = error;
    };


    TopMenuWeb4View.prototype.onGetUserDataInfo = function () {
        this.data.userSections = this.event.getUserSections();
        this.data.userOptions = this.event.getUserOptions();
        this.data.userData = this.event.getUserData();

        var unreadNotifications = this.event.getUserNotifications();
        this.data.unreadNotifications = unreadNotifications.notifications;
        this.data.tasksForToday = unreadNotifications.tasks;
        this.data.eventsForToday = unreadNotifications.events;
    };
    TopMenuWeb4View.prototype.onGetUserDataInfoError = function (error) {
        this.data.currentError = error;
    };


    TopMenuWeb4View.prototype.doProfileMenuAction = function (id, linkToGo, target) {
        if (id === "logout") {
            this.event.logout();
        } else {
            if (target === "_blank") {
                this.$window.open(linkToGo, target);
            } else {
                this.$window.location.href = linkToGo;
            }
        }
    };


    TopMenuWeb4View.prototype.adjustLinkToParentFolder = function (url) {
        return "../views/" + url;
    };

    TopMenuWeb4View.prototype.adjustDefaultAccessPageLink = function (url) {
        return "../" + url;
    };

    TopMenuWeb4View.prototype.getMenuTemplateName = function () {
        return 'topMenuWeb4';
    };

    //TopMenuWeb4View.prototype._getUserPhoto = function (userPhoto) {
    //    return (userPhoto == "" || !userPhoto) ? 'url("../../assets/images/defaultUserPicture.png")' : 'url(data:image/png;base64,'+userPhoto+')';
    //};


    TopMenuWeb4View.newInstance = function ($scope, $model, $presenter, $window, $viewRepAspect, $logErrorAspect) {
        var scope = $scope || {};
        var model = $model || TopMenuWeb2Model.newInstance();
        var presenter = $presenter || TopMenuWeb2Presenter.newInstance();
        $window = $window || document.window;
        var view = new TopMenuWeb4View(scope, model, presenter, $window);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };


    return {newInstance: TopMenuWeb4View.newInstance};
});
