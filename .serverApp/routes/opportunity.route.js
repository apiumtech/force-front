/**
 * Created by Justin on 3/17/2015.
 */
var OpportunityController = require('../controllers/OpportunityController');

module.exports = function(app){
    app.route('/api/opportunities/:accountId')
        .get(OpportunityController.getOpportunitiesFromAccount);
};