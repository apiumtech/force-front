/**
 * Created by justin on 3/9/15.
 */

module.exports = function (app) {
    var AccountController = require('../controllers/accountController');

    app.route('/api/accounts/dataTables')
        .post(AccountController.getFilteredData);

    app.route('/api/accounts/availableOwners')
        .get(AccountController.getAvailableOwners);

    app.route('/api/accounts/environments')
        .get(AccountController.getAvailableEnvironments);

    app.route('/api/accounts/accountTypes')
        .get(AccountController.getAvailableAccountTypes);

    app.route('/api/accounts/views')
        .get(AccountController.getViews);

    app.route('/api/accounts/:id')
        .get(AccountController.getAccount)
        .put(AccountController.updateAccount);

    app.route('/api/accounts/:id/summary')
        .get(AccountController.getSummaryAccount);

    app.route('/api/accounts/toggleFollow/:id')
        .post(AccountController.toggleFollow);

    app.route('/api/getFilterValues')
        .get(AccountController.getFilterValues);

    app.route('/api/accounts')
        .post(AccountController.createAccount);
};