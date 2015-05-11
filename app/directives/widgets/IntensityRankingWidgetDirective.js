/**
 * Created by justin on 5/9/15.
 */
app.registerDirective(function (container) {
    var RankingWidgetController = container.getController("controllers/widgets/IntensityRankingWidgetController");

    function IntensityRankingWidgetDirective() {
        return {
            restrict: "EAC",
            controller: RankingWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'templates/widgets/intensityRankingWidget.html'
        };
    }

    return IntensityRankingWidgetDirective;
});