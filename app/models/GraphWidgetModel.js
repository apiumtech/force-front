/**
 * Created by justin on 12/17/14.
 */

app.registerModel(function (container) {
    var WidgetBase = container.getService('services/WidgetBase');

    function GraphWidgetModel() {
        WidgetBase.call(this);
    }

    GraphWidgetModel.prototype = Object.create(WidgetBase.prototype, {});

    GraphWidgetModel.newInstance = function () {
        return Some(new GraphWidgetModel());
    };

    return GraphWidgetModel;
});