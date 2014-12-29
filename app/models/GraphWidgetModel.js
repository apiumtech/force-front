/**
 * Created by justin on 12/17/14.
 */

app.registerModel(function (container) {
    var WidgetBase = container.getService('services/WidgetBase');
    var Q = container.getFunction('q');

    function GraphWidgetModel() {
        WidgetBase.call(this);
        this.widgetType = 'intensity';
        this.widgetName = '1';
    }

    GraphWidgetModel.prototype = Object.create(WidgetBase.prototype);

    GraphWidgetModel.newInstance = function () {
        return Some(new GraphWidgetModel());
    };

    return GraphWidgetModel;
});