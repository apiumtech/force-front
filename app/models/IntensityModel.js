/**
 * Created by justin on 12/17/14.
 */

app.registerModel(function (container) {

    function IntensityModel() {

    }

    IntensityModel.newInstance = function () {
        return Some(new IntensityModel());
    };

    return IntensityModel;
});