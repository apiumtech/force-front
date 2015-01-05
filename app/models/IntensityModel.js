/**
 * Created by justin on 12/17/14.
 */

app.registerModel(function (container) {
    var Q = container.getFunction('q');
    var WidgetDecoratedPageModel = container.getModel("models/WidgetDecoratedPageModel");
    var WidgetService = container.getService("services/WidgetService");

    function IntensityModel(widgetService) {
        WidgetDecoratedPageModel.call(this, widgetService);
        this.pageName = "intensity";
    }

    IntensityModel.prototype = Object.create(WidgetDecoratedPageModel.prototype, {});

    IntensityModel.newInstance = function (widgetService) {
        var _widgetService = widgetService || WidgetService.newInstance().getOrElse(throwInstantiateException(WidgetService));

        return Some(new IntensityModel(_widgetService));
    };

    return IntensityModel;
});