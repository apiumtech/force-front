/**
 * Created by justin on 5/9/15.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/scatterChart/ConversionDiagramActivityWidgetController'
], function(app, ConversionDiagramActivityWidgetController){

    function ConversionDiagramActivityWidgetDirective() {
        return {
            restrict: "EAC",
            controller: ConversionDiagramActivityWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/scatterChart/scatter.html'
        };
    }

    app.register.directive('conversionDiagramActivityWidget', [ConversionDiagramActivityWidgetDirective]);

    return ConversionDiagramActivityWidgetDirective;
});