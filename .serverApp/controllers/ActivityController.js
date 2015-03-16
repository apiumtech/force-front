/**
 * Created by Justin on 3/16/2015.
 */

var ActivityService = require('../services/activityService');

function ActivityController() {
}

ActivityController.prototype.getActivityFromAccount = function (request, response) {
    var accountId = request.params.accountId;
    var pageSize = request.query.pageSize || 3;
    var pageIndex = request.query.pageIndex || 0;
    var data = ActivityService.getAccountActivities(accountId, pageIndex, pageSize);
    setTimeout(function () {
        response.json(data);
    }, 1000);
};

var instance = new ActivityController(ActivityService);

module.exports = instance;