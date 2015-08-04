/**
 * Created by kevin on 10/29/14.
 */
define(function () {
    
    //var baseUrl = "http://localhost:1900";
    var baseUrl = "https://backenddev.forcemanager.net";
    var baseProxy = window.location.protocol +"//"+ window.location.hostname + "/ASMX/Proxy.asmx";

    var baseApi = '';

    var api = {
        dataTableRequest: baseUrl + '/api/accounts/dataTables',
        getAvailableOwners: baseUrl + '/api/accounts/availableOwners',
        getAvailableEnvironments: baseUrl + '/api/accounts/environments',
        getAvailableViews: baseUrl + '/api/accounts/views',
        getAvailableAccountTypes: baseUrl + '/api/accounts/accountTypes',

        getAccount: baseUrl + '/api/accounts/getAccount/{0}',
        getAccountSummary: baseUrl + '/api/accounts/{0}/summary',
        updateAccount: baseUrl + '/api/accounts/update/{0}',
        createAccount: baseUrl + '/api/accounts/create',
        deleteAccount: baseUrl + '/api/accounts/delete/{0}',
        getAccountRelatedContact: baseUrl + '/api/queries/accounts/{0}/contacts',
        addAccountRelatedContact: baseUrl + '/api/queries/accounts/{0}/addContact',
        getAccountRelatedCompany: baseUrl + '/api/queries/accounts/{0}/companies',
        addAccountRelatedCompany: baseUrl + '/api/queries/accounts/{0}/addCompany',
        getCompanyRelationType: baseUrl + '/api/queries/getCompanyRelationTypes',
        getCompanyNameSuggestions: baseUrl + '/api/queries/getCompanyNameSuggestions?query={0}',

        getCompany: baseUrl + '/api/queries/companies?companyName={0}',

        getActivity: baseUrl + "/api/queries/accounts/{0}/activities",
        toggleFollow: baseUrl + '/api/accounts/{0}/toggleFollow',
        accountGeoLocation: baseUrl + '/api/accounts/{0}/geolocation',
        toggleFollowActivity: baseUrl + '/api/queries/activities/{0}/toggleFollow',
        
        getOpportunities: baseUrl + '/api/queries/account/opportunities',

        getAgenda: baseUrl + '/api/queries/account/{0}/agenda',
        deleteAgenda: baseUrl + '/api/queries/account/agenda/delete',
        createAgenda: baseUrl + '/api/queries/account/agenda/create',

        uploadFile: baseUrl + '/api/upload',
        uploadDocuments: baseUrl + '/api/uploadDocument',

        getFilterValues: baseUrl + '/api/accounts/getFilterValues',
        getAvailableFields: baseUrl + '/api/accounts/availableFields',

        getDocuments: baseUrl + '/api/accounts/{0}/documents',
        deleteDocument: baseUrl + '/api/documents/{0}',
        updateDocument: baseUrl + '/api/documents/{0}',

        getUserDataInfo: baseProxy + '/getUserDataInfo',
        logout: baseProxy + '/LogOff',
        authentication: baseUrl + '/api/commands/security/login',
        getContacts: baseUrl + '/api/queries/crm/contacts',

        intensityWidgetApi: baseUrl + '/api/stats/dashboard/intensity/{0}',

        //userTreeFiltersApi: baseUrl + '/api/crm/users/users/users{0}TreeByAccountForStatsQuery',
        userTreeFiltersApi: baseUrl + '/api/queries/stats/users/users{0}Tree',

        graphWidgetIntensityDataApi: baseUrl + '/api/queries/stats/dashboard/intensity/{0}IntensityByUsersAndPeriod',

        rankingWidgetIntensityDataApi: baseUrl + '/api/queries/stats/dashboard/intensity/usersIntensityStatsTableByUsersAndPeriod',
        rankingWidgetConversionDataApi: baseUrl + '/api/queries/stats/dashboard/conversion/usersConversionStatsTableByUsersAndPeriod',

        userExtraFieldsDataApi: baseUrl + '/api/queries/stats/extrafields/extrafieldList',

        geographicalWidgetDistributionDataApi: baseUrl + '/api/queries/stats/dashboard/distribution/{0}GeographicalDistributionByUsersAndPeriod',
        segmentWidgetDistributionDataApi: baseUrl + '/api/queries/stats/dashboard/distribution/{0}SegmentDistributionByUsersAndPeriod',
        hourWidgetDistributionDataApi: baseUrl + '/api/queries/stats/dashboard/distribution/{0}TimeDistributionByUsersAndPeriod',
        typeWidgetDistributionDataApi: baseUrl + '/api/queries/stats/dashboard/distribution/{0}AccountTypeDistributionByUsersAndPeriod',
        coverageWidgetDistributionDataApi: baseUrl + '/api/queries/stats/dashboard/distribution/coverage{0}DistributionByUsersAndPeriod',

        //conversion activity/sales
        activityWidgetConversionDataApi: baseUrl + '/api/queries/stats/dashboard/conversion/activitySalesConversionByUsersAndPeriod',

        //conversion visits/sales
        visitWidgetConversionDataApi: baseUrl + '/api/queries/stats/dashboard/conversion/visitsSalesBy{0}ConversionByUsersAndPeriod',

        //report
        getAllReports: baseUrl + '/api/queries/stats/reports/allReports?idCompany=0&idUser=1&idEnvironment=1',
        getFavouriteReports: baseUrl + '/api/queries/stats/reports/favouriteReports',
        toggleFavouriteReport: baseUrl + '/api/queries/stats/reports/toggleFavourite/{0}',
        updateReport: baseUrl + '/api/queries/stats/reports/update/{0}',
        getReportParameters: baseUrl + '/api/queries/stats/reports/{0}/parameters',
        getReportUrl: baseUrl + '/api/queries/stats/reports/downloadReport?idUser=-1&idReport={0}&idCompany=-1&idEnvironment=-1&ReportName={1}&ReportFormat={2}&Parameters={3}',
        searchReport: baseUrl + '/api/queries/stats/reports/searchReports?idCompany=0&idUser=1&idEnvironment=1&searchQuery={0}',
        previewReport: baseUrl + '/api/queries/stats/reports/{0}/previewImageUrl',
        getReportListOfValues: baseUrl + '/api/queries/stats/reportValues/reportValueList?tableName={0}',

        widgetList: baseUrl + '/api/queries/stats/widgets/widgetList',
        fuzzysearch: baseUrl + '/api/queries/stats/fuzzysearch/getfuzzy?service=sfm&textToSearch={0}&maxRowCount={1}&entity={2}',
        //getCustomWidget: baseUrl + '/api/queries/stats/widgets/customWidget',
        customDataAccess: baseUrl + '/api/queries/stats/customDataAccess?storedName={0}&storedParams={1}',

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

        literalValueDictionary: baseUrl + '/api/queries/commons/literalValues/literalValueObject'

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
        permissionsStorageKey: "fm_permissions",
        implementationCodeKey: "fm_implementationCode",
        defaultLiteralLang: "en",
        maxSizeUploadAllowed: 25,
        useAuthRequest: true
    };
});