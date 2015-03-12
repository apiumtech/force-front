/**
 * Created by kevin on 10/29/14.
 */
app.registerService(function (container) {

    var api = {
        dataTableRequest: '/api/accounts/dataTables',
        getAvailableOwners: '/api/accounts/availableOwners',
        getAvailableEnvironments: '/api/accounts/environments',
        getAvailableViews: '/api/accounts/views',
        getAvailableAccountTypes: '/api/accounts/accountTypes',
        getAccount: '/api/accounts',
        toggleFollow: '/api/accounts/toggleFollow',
        updateAccount: '/api/accounts'
    };

    return {
        api: api
    };
});