/**
 * Created by Justin on 3/16/2015.
 */
var ActivityController = require('../controllers/ActivityController');

module.exports = function(app){
    app.route('/api/activity/:accountId')
        .get(ActivityController.getActivityFromAccount);

    app.route('/api/activity/toggleFollow/:activityId')
        .post(ActivityController.toggleFollow);
};