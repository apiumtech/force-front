/**
 * Created by justin on 4/16/15.
 */
define([
    'app',
    'jquery',
    'shared/services/bus/ScrollEventBus'
], function (app, $, ScrollEventBus) {
    'use strict';

    function ScrollTopButtonDirective() {
        return {
            restrict: "EAC",
            link: function (scope, element) {
                $(window).scroll(function () {
                    if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                        ScrollEventBus.fireScrolledToBottom();
                    }
                });

                $(document).scroll(function () {
                    var totalScroll = $(document).scrollTop();

                    if (totalScroll >= 200) {
                        $(element).addClass('in');
                    } else {
                        $(element).removeClass('in');
                    }
                });

                $(element).click(function (e) {
                    e.preventDefault();
                    $('html, body').animate({
                        scrollTop: $("body").offset().top
                    }, 500);
                });
            }
        };
    }

    app.register.directive('scrollTopButton', [ScrollTopButtonDirective]);

    return ScrollTopButtonDirective;
});