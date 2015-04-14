/**
 * Created by joanllenas on 3/31/15.
 */
app.registerModel(function (container) {
    var Configuration = container.getService('Configuration');
    var AjaxService = container.getService("services/AjaxService");
    var EntityService = container.getService("services/config/EntityService");
    var Q = container.getFunction("q");


    function ContactModel(ajaxService, entityService, configuration) {
        this.ajaxService = ajaxService;
        this.entityService = entityService;
        this.configuration = configuration;
    }

    ContactModel.prototype.loadContactColumns = function () {
        var deferred = Q.defer();
        setTimeout(function(){
            var entity = this.entityService.getEntityByName("contact");
            var columns = this.entityService.getEntityColumns(entity);
            deferred.resolve( colmns );
        }, 100);
        return deferred.promise
    };

    ContactModel.prototype.loadContacts = function () {
        var params = {
            url: this.configuration.api.getContacts,
            type: 'GET',
            contentType: 'application/json',
            accept: 'application/json',
            headers: {
                token: 'atoken'
            }
        };
        return this.ajaxService.rawAjaxRequest(params);
    };

    ContactModel.newInstance = function (ajaxService, entityService, configuration) {
        ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        entityService = entityService || EntityService.newInstance().getOrElse(throwInstantiateException(EntityService));
        configuration = configuration || Configuration;

        return Some(new ContactModel(ajaxService, entityService, configuration));
    };

    return ContactModel;
});
