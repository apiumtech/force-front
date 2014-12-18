/**
 * Created by justin on 12/17/14.
 */
app.registerDirective(function (container) {

    function IntensityDirective() {
        return {
            restrict: 'EAC',
            scope: {
                name: "@"
            },
            templateUrl: '/templates/intensityDir.html'

        }
    }

    return IntensityDirective;
});