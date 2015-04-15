/**
 * Created by joanllenas on 3/31/15.
 */
app.registerModel(function (container) {
    var Configuration = container.getService('Configuration');
    var AjaxService = container.getService("services/AjaxService");
    var EntityService = container.getService("services/config/EntityService");
    var StorageService = container.getService("services/StorageService");
    var Q = container.getFunction("q");


    function ContactModel(ajaxService, entityService, storageService, configuration) {
        this.ajaxService = ajaxService;
        this.entityService = entityService;
        this.storageService = storageService;
        this.configuration = configuration;
    }

    ContactModel.prototype.loadContactColumns = function () {
        var deferred = Q.defer();

        try {
            var columns = this.entityService.getEntityColumns("contact");
            setTimeout(deferred.resolve, 10, columns );
        } catch(err) {
            setTimeout(deferred.reject, 10, "Error loading contacts" );
        }

        return deferred.promise
    };

    ContactModel.prototype.loadContacts = function () {

        var params = {
            url: this.configuration.api.getContacts,
            type: 'GET',
            contentType: 'application/json',
            accept: 'application/json',
            dataType: 'json',
            headers: {
                token: this.storageService.retrieve("token")
            }
        };
        return this.ajaxService.rawAjaxRequest(params);
    };

    ContactModel.newInstance = function (ajaxService, entityService, storageService, configuration) {
        ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        entityService = entityService || EntityService.newInstance().getOrElse(throwInstantiateException(EntityService));
        storageService = storageService || StorageService.newInstance().getOrElse(throwInstantiateException(StorageService));
        configuration = configuration || Configuration;

        return Some(new ContactModel(ajaxService, entityService, storageService, configuration));
    };

    return ContactModel;
});
