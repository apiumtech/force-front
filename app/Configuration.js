/**
 * Created by kevin on 10/29/14.
 */
app.registerService(function (container) {

    var baseUrl = "https://backenddev.forcemanager.net/api";

    var api = {
        dataTableRequest: '/api/accounts/dataTables',
        getAvailableOwners: '/api/accounts/availableOwners',
        getAvailableEnvironments: '/api/accounts/environments',
        getAvailableViews: '/api/accounts/views',
        getAvailableAccountTypes: '/api/accounts/accountTypes',

        getAccount: '/api/accounts/{0}',
        getAccountSummary: '/api/accounts/{0}/summary',
        updateAccount: '/api/accounts/{0}',
        createAccount: '/api/accounts',

        getActivity: "api/activity",
        toggleFollow: '/api/accounts/toggleFollow/{0}',
        toggleFollowActivity: '/api/activity/toggleFollow',
        getOpportunities: '/api/opportunities',
        getAgenda: '/api/agenda',
        uploadFile: '/upload',
        getFilterValues: '/api/getFilterValues',

        authentication: baseUrl + '/commands/security/login',
        getContacts: baseUrl + '/queries/crm/contacts'
    };

    return {
        api: api,
        env: "dev"
    };
});