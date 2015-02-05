/**
 * Created by Justin on 2/5/2015.
 */
app.registerModel(function (container) {
    var Q = container.getFunction('q');
    var AjaxService = container.getService("services/AjaxService");
    var StorageService = container.getService("services/StorageService");

    function SalesAnalyticsFilterModel(ajaxService, storageService) {
        this.ajaxService = ajaxService;
        this.storageService = storageService;
    }

    SalesAnalyticsFilterModel.prototype = Object.create(Object.prototype, {});

    SalesAnalyticsFilterModel.prototype._getUsers = function () {
        var self = this;

        var params = {
            url: '/api/users',
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        var deferred = SalesAnalyticsFilterModel.defer();

        self.ajaxService.ajax(params)
            .then(function (data) {
                deferred.resolve(data.data);
            },
            function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    };

    SalesAnalyticsFilterModel.prototype.getUsers = function () {
        return Q.fcall(this._getUsers.bind(this));
    };

    SalesAnalyticsFilterModel.defer = function () {
        var deferred = Q.defer();
        return deferred;
    };

    SalesAnalyticsFilterModel.newInstance = function (ajaxService, storageService) {
        var _ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        var _storageService = storageService || StorageService.newInstance().getOrElse(throwInstantiateException(StorageService));

        return Some(new SalesAnalyticsFilterModel(_ajaxService, _storageService));
    };

    return SalesAnalyticsFilterModel;
});