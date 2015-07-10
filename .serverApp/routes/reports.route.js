var ReportsController = require("../controllers/reportsController");

module.exports = function (app) {
    app.get('/api/reportListOfValues/:list', ReportsController.getReportListOfValues);
};