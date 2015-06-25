/**
 * Created by kevin on 10/29/14.
 */
define(function () {
    
    var baseUrl = "http://localhost:1999";
    //var baseUrl = "https://backenddev.forcemanager.net";
    var baseProxy = "https://webpre.forcemanager.net/ASMX/Proxy.asmx";

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

        getActivity: baseApi + "/api/queries/accounts/{0}/activities",
        toggleFollow: baseApi + '/api/accounts/toggleFollow/{0}',
        toggleFollowActivity: baseApi + '/api/queries/activities/{0}/toggleFollow',
        getOpportunities: baseApi + '/api/opportunities',
        getAgenda: baseApi + '/api/opportunities',

        uploadFile: baseUrl + '/api/upload',
        uploadDocuments: baseUrl + '/api/uploadDocument',


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

        //conversion activity/sales
        activityWidgetConversionDataApi: baseUrl + '/api/queries/stats/dashboard/conversion/activitySalesConversionByUsersAndPeriod',

        //conversion visits/sales
        visitWidgetConversionDataApi: baseUrl + '/api/queries/stats/dashboard/conversion/visitsSalesBy{0}ConversionByUsersAndPeriod',

        widgetList: baseUrl + '/api/queries/stats/widgets/widgetList',
        getCustomWidget: baseUrl + '/api/queries/stats/widgets/customWidget',



        createLiteral: baseUrl + '/api/commands/commons/literals/createLiteral',
        changeLiteralDetails: baseUrl + '/api/commands/commons/literals/changeLiteralDetails',
        deleteLiteral: baseUrl + '/api/commands/commons/literals/deleteLiteral',

        literalList: baseUrl + '/api/queries/commons/literals/literalList',
        literalById: baseUrl + '/api/queries/commons/literals/literalById',

        languageList: baseUrl + '/api/queries/commons/languages/languageList',
        literalTypeList: baseUrl + '/api/queries/commons/literals/literalTypeList',
        deviceTypeList: baseUrl + '/api/queries/commons/devices/deviceTypeList',


        createCustomLiteral: baseUrl + '/api/commands/commons/literals/createCustomLiteral',
        changeCustomLiteralDetails: baseUrl + '/api/commands/commons/literals/changeCustomLiteralDetails',
        deleteCustomLiteral: baseUrl + '/api/commands/commons/literals/deleteCustomLiteral',

        customLiteralList: baseUrl + '/api/queries/commons/literals/customLiteralList',
        customLiteralById: baseUrl + '/api/queries/commons/literals/customLiteralById',

        implementationList: baseUrl + '/api/queries/commons/implementations/implementationList',


        literalValueDictionary: 'https://backend.forcemanager.net/api/queries/commons/literalValues/literalValueDictionary'
    };

    return {
        appName: "force_manager_crm",
        api: api,
        env: "dev",
        shortDateFormat: {
            moment: "DD/MM/YYYY",
            default: "dd/MM/yyyy"
        },
        corsEnabled: true,
        pageSize: 10,
        defaultDateSubtraction: 30,
        tokenStorageKey: "fm_token",
        implementationCodeKey: "fm_implementationCode",
        defaultLiteralLang: "en",
        maxSizeUploadAllowed: 25

    };
});