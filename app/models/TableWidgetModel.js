/**
 * Created by justin on 12/17/14.
 */

app.registerModel(function (container) {
    var WidgetBase = container.getService('services/WidgetBase');
    var Q = container.getFunction('q');

    function TableWidgetModel() {
        WidgetBase.call(this);
        this.widgetType = 'intensity';
        this.widgetName = '2';
    }

    TableWidgetModel.prototype = Object.create(WidgetBase.prototype);

    TableWidgetModel.newInstance = function () {
        return Some(new TableWidgetModel());
    };

    return TableWidgetModel;
});