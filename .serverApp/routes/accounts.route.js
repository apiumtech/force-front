/**
 * Created by justin on 3/9/15.
 */

var AccountService = require('../services/accountService');

module.exports = function (app) {
    var AccountController = require('../controllers/accountController');

    app.post('/api/accounts/dataTables', AccountController.getFilteredData);

    app.get('/api/accounts/availableOwners', AccountController.getAvailableOwners);

    app.get('/api/accounts/environments', AccountController.getAvailableEnvironments);

    app.get('/api/accounts/accountTypes', AccountController.getAvailableAccountTypes);

    app.get('/api/accounts/views', AccountController.getViews);

    app.route('/api/accounts/:id')
        .get(AccountController.getAccount)
        .put(AccountController.updateAccount);

    app.route('/api/accounts/:id/summary')
        .get(AccountController.getSummaryAccount);

    app.post('/api/accounts/toggleFollow/:id', AccountController.toggleFollow);
};