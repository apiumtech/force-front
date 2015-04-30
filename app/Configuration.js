/**
 * Created by kevin on 10/29/14.
 */
app.registerService(function (container) {

    var baseLocation = getLocation();

    var baseUrl = "https://backenddev.forcemanager.net/api";
    var baseProxy = "http://websta.forcemanager.net/ASMX/Proxy.asmx";

    var baseApi = '';

    var api = {
        dataTableRequest: baseApi + '/api/accounts/dataTables',
        getAvailableOwners: baseApi + '/api/accounts/availableOwners',
        getAvailableEnvironments: baseApi + '/api/accounts/environments',
        getAvailableViews: baseApi + '/api/accounts/views',
        getAvailableAccountTypes: baseApi + '/api/accounts/accountTypes',

        getAccount: baseApi + '/api/accounts/{0}',
        getAccountSummary: baseApi + '/api/accounts/{0}/summary',
        updateAccount: baseApi + '/api/accounts/{0}',
        createAccount: baseApi + '/api/accounts',

        getActivity: baseApi + "/api/activity",
        toggleFollow: baseApi + '/api/accounts/toggleFollow/{0}',
        toggleFollowActivity: baseApi + '/api/activity/toggleFollow',
        getOpportunities: baseApi + '/api/opportunities',
        getAgenda: baseApi + '/api/agenda',
        uploadFile: baseApi + '/api/upload',
        getFilterValues: baseApi + '/api/getFilterValues',

        getDocuments: baseApi + '/api/accounts/{0}/documents',
        deleteDocument: baseApi + '/api/documents/{0}',
        updateDocument: baseApi + '/api/documents/{0}',

        getUserDataInfo: baseProxy + '/getUserDataInfo',
        logout: baseProxy + '/LogOff',
        authentication: baseUrl + '/commands/security/login',
        getContacts: baseUrl + '/queries/crm/contacts',

        intensityWidgetApi: baseUrl + '/stats/dashboard/intensity/{0}',

        userTreeFiltersApi: baseUrl + '/crm/users/users/users{0}TreeByAccountForStatsQuery'
    };

    return {
        api: api,
        env: "dev",
        shortDateFormat: {
            moment: "DD/MM/YYYY",
            default: "dd/MM/yyyy"
        },
        pageSize: 10,
        tokenStorageKey: "token"
    };
});