/**
 * Created by justin on 3/9/15.
 */

var WidgetController = require("../controllers/widgetController");

module.exports = function (app) {

    app.get('/api/widgets/:page', WidgetController.getWidgetsByPage);

    app.put('/api/widgets', WidgetController.updateWidgets);

    app.get('/api/widget/:id', WidgetController.getWidget);
};