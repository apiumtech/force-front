/**
 * Created by Justin on 2/5/2015.
 */
app.registerModel(function (container) {
    var Q = container.getFunction('q');
    var AjaxService = container.getService("services/ajax/AuthAjaxService");
    // TODO: REMOVE WHEN HAVE CORRECT CONTRACT
    var FakeAjaxService = container.getService("services/FakeAjaxService");
    var StorageService = container.getService("services/StorageService");
    var Configuration = container.getService("Configuration");

    function SalesAnalyticsFilterModel(ajaxService, storageService) {
        this.ajaxService = ajaxService;
        // TODO: REMOVE WHEN HAVE CORRECT CONTRACT
        this.fakeAjaxService = FakeAjaxService.newInstance();
        this.storageService = storageService;
        this.currentQuery = 'Environment';
    }

    SalesAnalyticsFilterModel.prototype = Object.create(Object.prototype, {});

    SalesAnalyticsFilterModel.prototype.addQuery = function (value) {
        this.currentQuery = value;
    };

    SalesAnalyticsFilterModel.prototype._getUsers = function () {
        var self = this;

        var url = Configuration.api.userTreeFiltersApi.format(self.currentQuery);

        var params = {
            url: url,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        // TODO: Remove when have correct contract
        var ajaxService = self.currentQuery === 'Environment' ? self.ajaxService : self.fakeAjaxService;

        if (self.currentQuery !== 'Environment') {
            params.result = '[{"id":"8AD6BC42-1956-4902-9E1A-2FD1FCF8118A",            "name":"jc-addded---blahblah",                "idParent":"-1",                "isTeamLeader":false},        {"id":"56FE524B-23CD-40AC-9979-E6FFA9BD5D13",            "name":"Jose Luis Garcia",            "idParent":"8AD6BC42-1956-4902-9E1A-2FD1FCF8118A",            "isTeamLeader":true,            "children":[{"id":"8AD6BC42-1956-4902-9E1A-2FD1FCF8118A",            "name":"jc-addded---blahblah",            "idParent":"-1",            "isTeamLeader":false},            {"id":"56FE524B-23CD-40AC-9979-E6FFA9BD5D13",                "name":"Jose Luis Garcia",                "idParent":"8AD6BC42-1956-4902-9E1A-2FD1FCF8118A",                "isTeamLeader":true,                "children":[{"id":"8AD6BC42-1956-4902-9E1A-2FD1FCF8118A",                    "name":"jc-addded---blahblah",                    "idParent":"-1",                    "isTeamLeader":false},                    {"id":"56FE524B-23CD-40AC-9979-E6FFA9BD5D13",                        "name":"Jose Luis Garcia",                        "idParent":"8AD6BC42-1956-4902-9E1A-2FD1FCF8118A",                        "isTeamLeader":true},                    {"id":"14195428-31A7-4302-8B00-8387A78EBDB7",                        "name":"Laura Del Monte Oscuro",                        "idParent":"8AD6BC42-1956-4902-9E1A-2FD1FCF8118A",                        "isTeamLeader":false}]},            {"id":"56F61AB3-9B78-4FEF-B7C1-F257DF2954C9",                "name":"Antonia Marin",                "idParent":"8AD6BC42-1956-4902-9E1A-2FD1FCF8118A",                "isTeamLeader":false},            {"id":"14195428-31A7-4302-8B00-8387A78EBDB7",                "name":"Laura Del Monte Oscuro",                "idParent":"8AD6BC42-1956-4902-9E1A-2FD1FCF8118A",                "isTeamLeader":false}]},        {"id":"56F61AB3-9B78-4FEF-B7C1-F257DF2954C9",            "name":"Antonia Marin",            "idParent":"8AD6BC42-1956-4902-9E1A-2FD1FCF8118A",            "isTeamLeader":false},        {"id":"14195428-31A7-4302-8B00-8387A78EBDB7",            "name":"Laura Del Monte Oscuro",            "idParent":"8AD6BC42-1956-4902-9E1A-2FD1FCF8118A",            "isTeamLeader":false}]';
        }

        var deferred = self.defer();

        ajaxService.rawAjaxRequest(params)
            .then(function (data) {
                if (typeof data === 'string') {
                    try {
                        data = JSON.parse(data);
                    } catch (e) {
                        deferred.reject(e);
                    }
                }

                var formattedData = self.decorateData(data);
                deferred.resolve(formattedData);
            },
            function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    };

    SalesAnalyticsFilterModel.prototype.getUsers = function () {
        return Q.fcall(this._getUsers.bind(this));
    };

    SalesAnalyticsFilterModel.prototype.decorateData = function (data) {
        return data.data;
    };

    SalesAnalyticsFilterModel.prototype.defer = function () {
        var deferred = Q.defer();
        return deferred;
    };

    SalesAnalyticsFilterModel.newInstance = function (ajaxService, storageService) {
        var _ajaxService = ajaxService || AjaxService.newInstance();
        var _storageService = storageService || StorageService.newInstance();

        return new SalesAnalyticsFilterModel(_ajaxService, _storageService);
    };

    return SalesAnalyticsFilterModel;
});