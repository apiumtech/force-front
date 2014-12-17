/**
 * Created by justin on 12/17/14.
 */
app.registerPresenter(function(container){
    function IntensityPresenter() {

    }

    IntensityPresenter.newInstance = function() {
        return Some(new IntensityPresenter());
    };

    return {
        newInstance: IntensityPresenter.newInstance
    };
});