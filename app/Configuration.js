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
        getAgenda: '/api/agenda',
        uploadFile: '/upload',
        createAccount: '/api/accounts',
        authentication: '/api/authentication',

        getContacts: '/api/contacts',/*https://backenddev.forcemanager.net/api/queries/crm/contacts*/
        getContactFields: '/api/contacts/meta/fields'
    };

    return {
        api: api,
        env: "dev"
    };
});