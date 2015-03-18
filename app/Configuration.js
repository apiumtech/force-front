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
        getActivity: "api/activity",
        toggleFollow: '/api/accounts/toggleFollow',
        toggleFollowActivity: '/api/activity/toggleFollow',
        updateAccount: '/api/accounts',
        getOpportunities: '/api/opportunities',
        getAgenda: '/api/agenda'
    };

    return {
        api: api
    };
});