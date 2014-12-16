/**
 * Created by kevin on 10/22/14.
 */

app.registerPresenter(function (container) {

    function LeftMenuPresenter() {
    }

    LeftMenuPresenter.prototype.show = function (view) {
        view.event.onInit = function () {
            console.log('init left menu');
        };
    };

    LeftMenuPresenter.newInstance = function () {
        return Some(new LeftMenuPresenter());
    };

    return {newInstance: LeftMenuPresenter.newInstance};
});
