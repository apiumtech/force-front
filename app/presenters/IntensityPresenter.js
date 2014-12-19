/**
 * Created by justin on 12/17/14.
 */
app.registerPresenter(function(container){
    function IntensityPresenter() {

    }

    IntensityPresenter.prototype.show = function (view) {
        view.event.onInit = function () {
            console.log('init left menu');
        };
    };

    IntensityPresenter.newInstance = function() {
        return Some(new IntensityPresenter());
    };

    return {
        newInstance: IntensityPresenter.newInstance
    };
});