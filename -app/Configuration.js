/**
 * Created by kevin on 10/29/14.
 */
define([], function (container) {

    var baseLocation = getLocation();

    var baseUrl = "https://backenddev.forcemanager.net";
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
        authentication: baseUrl + '/api/commands/security/login',
        getContacts: baseUrl + '/api/queries/crm/contacts',

        intensityWidgetApi: baseUrl + '/api/stats/dashboard/intensity/{0}',

        userTreeFiltersApi: baseUrl + '/api/crm/users/users/users{0}TreeByAccountForStatsQuery',

        graphWidgetIntensityDataApi: baseUrl + '/api/queries/stats/dashboard/intensity/{0}IntensityByUsersAndPeriod',

        rankingWidgetIntensityDataApi: baseUrl + '/api/queries/stats/dashboard/intensity/usersIntensityStatsTableByUsersAndPeriod',

        geographicalWidgetDistributionDataApi: baseUrl + '/api/queries/stats/dashboard/distribution/{0}GeographicalDistributionByUsersAndPeriod',
        segmentWidgetDistributionDataApi: baseUrl + '/api/queries/stats/dashboard/distribution/{0}SegmentDistributionByUsersAndPeriod',
        hourWidgetDistributionDataApi: baseUrl + '/api/queries/stats/dashboard/distribution/{0}TimeDistributionByUsersAndPeriod',
        coverageWidgetDistributionDataApi: baseUrl + '/api/queries/stats/dashboard/distribution/coverage{0}DistributionByUsersAndPeriod',


        createLiteral: baseUrl + '/api/commands/commons/literals/createLiteral',
        changeLiteralDetails: baseUrl + '/api/commands/commons/literals/changeLiteralDetails',
        deleteLiteral: baseUrl + '/api/commands/commons/literals/deleteLiteral',
        literalListBySearch: baseUrl + '/api/queries/commons/literals/literalListBySearch',
        literalById: baseUrl + '/api/queries/commons/literals/literalById',

        languageList: baseUrl + '/api/queries/commons/languages/languageList',
        deviceCategoryList: baseUrl + '/api/queries/commons/devices/deviceCategoryList',
        literalTypeList: baseUrl + '/api/queries/commons/literals/literalTypeList',
        deviceTypeList: baseUrl + '/api/queries/commons/devices/deviceTypeList',

        literalValueDictionaryByLanguageAndImplementationCode: baseUrl + '/api/queries/commons/literalValues/literalValueDictionaryByLanguageAndImplementationCode'
        
    };

    return {
        api: api,
        env: "dev",
        shortDateFormat: {
            moment: "DD/MM/YYYY",
            default: "dd/MM/yyyy"
        },
        corsEnabled: true,
        pageSize: 10,
        defaultDateSubtraction: 30,
        tokenStorageKey: "token",
        defaultLiteralLang: "en"
    };
});