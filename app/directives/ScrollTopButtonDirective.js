/**
 * Created by justin on 4/16/15.
 */
app.registerDirective(function (container) {
    var $ = container.getFunction("jquery");
    var ScrollEventBus = container.getService('services/bus/ScrollEventBus').getInstance();

    function ScrollTopButtonDirective() {
        return {
            restrict: "EAC",
            link: function (scope, element) {
                $(window).scroll(function () {
                    if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                        ScrollEventBus.sendScrolledToBottomEvent();
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

    return ScrollTopButtonDirective;
});