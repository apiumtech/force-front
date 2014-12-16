/**
 * Created by xavi on 12/16/14.
 */

app.registerView(function (container) {
    var LeftMenuPresenter = container.getPresenter('presenters/LeftMenuPresenter');

    function LeftMenuView($scope, $presenter) {
        this.event = {};
        this.fn = {};

        this.$scope = $scope;
        $scope.event = this.event;
        $scope.fn = this.fn;

        this.presenter = $presenter;

        this.fn.toggleAnalyticsSubmenu = function (target) {
            var element = angular.element(target);
            if (element.slideToggle) element.slideToggle(250);
        };

        this.fn.toggleSideBar = function () {
            console.log('toggleSideBar');
            var sidebarClass = 'page-sidebar-minified';
            var targetContainer = '#sidebar';
            if (angular.element(targetContainer).hasClass(sidebarClass)) {
                angular.element(targetContainer).removeClass(sidebarClass);
                if (angular.element(targetContainer).hasClass('page-sidebar-fixed')) {
                    this.generateSlimScroll(angular.element('#sidebar [data-scrollbar="true"]'));
                }
            } else {
                angular.element(targetContainer).addClass(sidebarClass);
                if (angular.element(targetContainer).hasClass('page-sidebar-fixed')) {
                    angular.element('#sidebar [data-scrollbar="true"]').slimScroll({destroy: true});
                    angular.element('#sidebar [data-scrollbar="true"]').removeAttr('style');
                }
                // firefox bugfix
                angular.element('#sidebar [data-scrollbar=true]').trigger('mouseover');
            }
            angular.element(window).trigger('resize');

        };

    }

    LeftMenuView.generateSlimScroll = function(element) {
        var dataHeight = $(element).attr('data-height');
        dataHeight = (!dataHeight) ? $(element).height() : dataHeight;

        var scrollBarOption = {
            height: dataHeight,
            alwaysVisible: true
        };
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            scrollBarOption.wheelStep = 1;
            scrollBarOption.touchScrollStep = 100;
        }
        $(element).slimScroll(scrollBarOption);
    };

    LeftMenuView.prototype.show = function () {
        this.presenter.show(this);
    };

    LeftMenuView.newInstance = function ($scope, $presenter) {
        var scope = $scope || {};
        var presenter = $presenter || LeftMenuPresenter.newInstance().getOrElse(throwException("LeftMenuPresenter could not be instantiated!!"));

        var view = new LeftMenuView(scope, presenter);

        return Some(view);
    };

    return {newInstance: LeftMenuView.newInstance};
});
