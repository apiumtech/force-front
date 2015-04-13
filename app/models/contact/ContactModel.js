/**
 * Created by joanllenas on 3/31/15.
 */
app.registerModel(function (container) {
    var Configuration = container.getService('Configuration');
    var AjaxService = container.getService("services/AjaxService");


    function ContactModel(ajaxService, configuration) {
        this.ajaxService = ajaxService;
        this.configuration = configuration;
    }

    ContactModel.prototype.loadContactFields = function () {
        var params = {
            url: this.configuration.api.getContactFields,
            type: 'GET',
            contentType: 'application/json',
            accept: 'application/json',
            headers: {
                token: 'atoken'
            }
        };
        return this.ajaxService.rawAjaxRequest(params);
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

    ContactModel.newInstance = function (ajaxService, configuration) {
        ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        configuration = configuration || Configuration;

        return Some(new ContactModel(ajaxService, configuration));
    };

    return ContactModel;
});
