define(function () {
    'use strict';

    var apiVersion = "1.5";
    var baseUrl = "https://backend.forcemanager.net/" + apiVersion;

    if (window.location.hostname.indexOf('webpre') > -1) {
      baseUrl = "https://backendpre.forcemanager.net/" + apiVersion;
    }
    else if (
      window.location.hostname.indexOf('localhost') > -1 ||
      window.location.hostname.indexOf('127.0.0.1') > -1 ||
      window.location.hostname  === 'websta.forcemanager.net' ||
      window.location.hostname.indexOf('webtest') > -1
    ) {
      baseUrl = "https://backenddev.forcemanager.net";
    }

    var baseLiteralsUrl = "https://literals.forcemanager.net";


    var baseProxy = window.location.protocol +"//"+ window.location.hostname + "/ASMX/Proxy.asmx";

    var api = {
        getUserDataInfo: baseProxy + '/getUserDataInfo',
        logout: baseProxy + '/LogOff',
        userTreeFiltersApi: baseUrl + '/api/queries/stats/users/users{0}Tree',

        /*
        userExtraFieldsDataApi: baseUrl + '/api/queries/stats/extrafields/extrafieldList',
        userTreeFiltersApi: baseUrl + '/api/queries/stats/users/users{0}Tree',
        intensityWidgetApi: baseUrl + '/api/stats/dashboard/intensity/{0}',
        graphWidgetIntensityDataApi: baseUrl + '/api/queries/stats/dashboard/intensity/{0}IntensityByUsersAndPeriod',
        rankingWidgetIntensityDataApi: baseUrl + '/api/queries/stats/dashboard/intensity/usersIntensityStatsTableByUsersAndPeriod',
        rankingWidgetConversionDataApi: baseUrl + '/api/queries/stats/dashboard/conversion/usersConversionStatsTableByUsersAndPeriod',
        geographicalWidgetDistributionDataApi: baseUrl + '/api/queries/stats/dashboard/distribution/{0}GeographicalDistributionByUsersAndPeriod',
        segmentWidgetDistributionDataApi: baseUrl +      '/api/queries/stats/dashboard/distribution/{0}SegmentDistributionByUsersAndPeriod',
        hourWidgetDistributionDataApi: baseUrl +         '/api/queries/stats/dashboard/distribution/{0}TimeDistributionByUsersAndPeriod',
        typeWidgetDistributionDataApi: baseUrl +         '/api/queries/stats/dashboard/distribution/{0}TypeDistributionByUsersAndPeriod',
        coverageWidgetDistributionDataApi: baseUrl +     '/api/queries/stats/dashboard/distribution/coverage{0}DistributionByUsersAndPeriod',
        cycleCoverageWidgetDistributionDataApi: baseUrl +'/api/queries/stats/dashboard/distribution/cycleCoverageSegmentDistributionByUsersAndPeriod',
        stateWidgetDistributionDataApi: baseUrl +         '/api/queries/stats/dashboard/distribution/{0}StateDistributionByUsersAndPeriod',
        activityWidgetConversionDataApi: baseUrl + '/api/queries/stats/dashboard/conversion/activitySalesConversionByUsersAndPeriod',
        visitWidgetConversionDataApi: baseUrl + '/api/queries/stats/dashboard/conversion/visitsSalesBy{0}ConversionByUsersAndPeriod',
        customerAcquisitionFunnelDataApi: baseUrl + '/api/queries/stats/dashboard/conversion/customerAcquisitionFunnelByUsersAndPeriod',
        customerDevelopmentFunnelDataApi: baseUrl + '/api/queries/stats/dashboard/conversion/customerDevelopmentFunnelByUsersAndPeriod',
        opportunityFunnelDataApi: baseUrl + '/api/queries/stats/dashboard/conversion/opportunityFunnelConversionByUsersAndPeriod',
        */


        //report
        getAllReports: baseUrl + '/api/queries/stats/reports/allReports?idCompany=0&idUser=1&idEnvironment=1',
        reportList: baseUrl + '/api/queries/reports/reportList',
        getFavouriteReports: baseUrl + '/api/queries/stats/reports/favouriteReports',
        toggleFavouriteReport: baseUrl + '/api/queries/stats/reports/toggleFavourite/{0}',
        updateReport: baseUrl + '/api/queries/stats/reports/update/{0}',
        getReportParameters: baseUrl + '/api/queries/stats/reports/{0}/parameters',
        getReportUrl: baseUrl + '/api/queries/stats/reports/downloadReport?idUser=-1&idReport={0}&idCompany=-1&idEnvironment=-1&ReportName={1}&ReportFormat={2}&Parameters={3}',
        searchReport: baseUrl + '/api/queries/stats/reports/searchReports?idCompany=0&idUser=1&idEnvironment=1&searchQuery={0}',
        previewReport: baseUrl + '/api/queries/stats/reports/{0}/previewImageUrl',
        tablePreview: baseUrl + '/api/queries/reports/table/reportData',
        getReportListOfValues: baseUrl + '/api/queries/stats/reportValues/reportValueList?tableName={0}',
        fuzzysearch: baseUrl + '/api/queries/stats/fuzzysearch/getfuzzy?service=sfm&textToSearch={0}&maxRowCount={1}&entity={2}',


        customDataAccess: baseUrl + '/api/queries/stats/customDataAccess?storedName={0}&storedParams={1}',
        widgetList: baseUrl + '/api/queries/config/widgets/userWidgetList',
        changeWidgetOrder: baseUrl + '/api/commands/config/widgets/userWidget/changeOrder',
        changeWidgetVisibilityToVisible: baseUrl + '/api/commands/config/widgets/userWidget/changeVisibilityToVisible',
        changeWidgetVisibilityToHidden: baseUrl + '/api/commands/config/widgets/userWidget/changeVisibilityToHidden',


        literals: {
            languageList: baseUrl + '/api/queries/commons/languages/languageList',
            literalTypeList: baseUrl + '/api/queries/commons/literals/literalTypeList',
            platformList: baseUrl + '/api/queries/commons/platforms/platformList',
            implementationList: baseUrl + '/api/queries/commons/implementations/implementationList',
            generic: {
                createLiteral: baseUrl + '/api/commands/commons/literals/createGenericLiteral',
                changeLiteralDetails: baseUrl + '/api/commands/commons/literals/changeGenericLiteralDetails',
                literalById: baseUrl + '/api/queries/commons/literals/genericLiteralById',
                literalList: baseUrl + '/api/queries/commons/literals/genericLiteralList',
                deleteLiteral: baseUrl + '/api/commands/commons/literals/deleteGenericLiteral'
            }
        },


        createCustomLiteral: baseUrl + '/api/commands/commons/literals/createCustomLiteral',
        changeCustomLiteralDetails: baseUrl + '/api/commands/commons/literals/changeCustomLiteralDetails',
        deleteCustomLiteral: baseUrl + '/api/commands/commons/literals/deleteCustomLiteral',

        customLiteralList: baseUrl + '/api/queries/commons/literals/customLiteralList',
        customLiteralById: baseUrl + '/api/queries/commons/literals/customLiteralById',

        literalValueDictionary: baseLiteralsUrl + '/api/queries/commons/literalValues/literalValueObject',
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
        pageSize: 25,
        defaultDateSubtraction: 179,
        tokenStorageKey: "fm_token",
        permissionsStorageKey: "fm_permissions",
        implementationCodeKey: "fm_implementationCode",
        userCodeKey: "fm_userCode",
        web3PlatformCode: '108',
        noImplementationCode: '-1',
        defaultLiteralLang: "en",
        maxSizeUploadAllowed: 25,
        useAuthRequest: true,
        badTokenRedirectionPage: "Login.aspx",
        isDevMode: function(){
            return window.location.hostname === "127.0.0.1" ||
                window.location.hostname === "localhost" ||
                window.location.hostname.indexOf("192.168") > -1;
        },
        isWinter: true,
        salesAnalytics: {
            intensityActivityChartDateFormat: 'dddd D MMMM YYYY',
            intensityActivityChartWeekFormat: 'D MMM YYYY',
            intensityActivityChartMonthFormat: 'MMM YYYY'
        },
        appendBaseUrl: function(urlFragment){
          return baseUrl + urlFragment;
        }
    };
});
