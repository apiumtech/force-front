/**
 * Created by joanllenas on 4/27/15.
 */

define([
    'shared/BaseView',
    'core/topMenu/TopMenuWeb2Model',
    'core/topMenu/TopMenuWeb2Presenter',
    'jquery'
], function (BaseView, TopMenuWeb2Model, TopMenuWeb2Presenter, $) {
    'use strict';

    function TopMenuWeb2View($scope, $model, $presenter, $window) {
        BaseView.call(this, $scope, $model, $presenter);
        this.$window = $window;

        this.configureData();
        this.configureEvents();
    }


    //TopMenuWeb2View.inherits(BaseView, {});
    TopMenuWeb2View.inherits(BaseView);


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
        this.fn.adjustLinkToParentFolder = this.adjustLinkToParentFolder.bind(this);
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
        this.event.getUserDataInfo();
    };


    TopMenuWeb2View.prototype.onLogout = function () {
        this.$window.location.href = "/Login.aspx";
    };
    TopMenuWeb2View.prototype.onLogoutError = function (error) {
        this.data.currentError = error;
    };


    TopMenuWeb2View.prototype.onGetUserDataInfo = function () {
        this.data.userSections = this.event.getUserSections();
        this.data.userOptions = this.event.getUserOptions();
        this.data.userData = this.event.getUserData();

        var unreadNotifications = this.event.getUserNotifications();
        this.data.unreadNotifications = unreadNotifications.notifications;
        this.data.tasksForToday = unreadNotifications.tasks;
        this.data.eventsForToday = unreadNotifications.events;
    };
    TopMenuWeb2View.prototype.onGetUserDataInfoError = function (error) {
        this.data.currentError = error;
    };


    TopMenuWeb2View.prototype.doProfileMenuAction = function (id, linkToGo, target) {
        if (id == "logout") {
            this.event.logout();
        } else {
            if (target == "_blank") {
                this.$window.open(linkToGo, target);
            } else {
                this.$window.location.href = linkToGo;
            }
        }
    };


    TopMenuWeb2View.prototype.adjustLinkToParentFolder = function (url) {
        return "../" + url;
    };

    TopMenuWeb2View.prototype.getMenuTemplateName = function () {
        return 'topMenuWeb2';
    };


    TopMenuWeb2View.newInstance = function ($scope, $model, $presenter, $window, $viewRepAspect, $logErrorAspect) {
        var scope = $scope || {};
        var model = $model || TopMenuWeb2Model.newInstance();
        var presenter = $presenter || TopMenuWeb2Presenter.newInstance();
        $window = $window || document.window;
        var view = new TopMenuWeb2View(scope, model, presenter, $window);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };


    return {newInstance: TopMenuWeb2View.newInstance};
});
