/**
 * Created by kevin on 10/22/14.
 */

app.registerPresenter(function (container) {
    var FilterChannel = container.getService('services/bus/FilterChannel');

    function LeftMenuPresenter(filterEventChannel) {
        this.filterChannel = filterEventChannel;
    }

    LeftMenuPresenter.prototype.show = function (view) {

        view.event.onInit = function () {
            console.log('init left menu');
        };

        view.event.onToggleSubMenu = function (target) {
            view.toggleAnalyticsSubmenu(target);
        };
    };

    LeftMenuPresenter.newInstance = function ($filterChannel) {
        var filterChannel = $filterChannel || FilterChannel.newInstance().getOrElse(throwException("Could not create FilterChannel!"));
        return Some(new LeftMenuPresenter(filterChannel));
    };

    return {newInstance: LeftMenuPresenter.newInstance};
});
