/**
 * Created by trung.dang on 02/12/2015
 */
app.registerModel(function (container) {
    var Configuration = container.getService('Configuration');
    var AjaxService = container.getService("services/AjaxService");
    var Q = container.getFunction('q');

    function AccountFilterModel(ajaxService) {
        this.ajaxService = ajaxService;
        this.availableOwners = null;
    }

    AccountFilterModel.prototype.getAvailableOwners = function (filter) {
        var query = "";
        if (filter) {
            query += "?query=" + filter;
        }

        var params = {
            url: Configuration.api.getAvailableOwners + query,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params).then(this.decorateAvailableOwners.bind(this));
    };

    AccountFilterModel.prototype.decorateAvailableOwners = function (result) {
        var self = this;

        result.forEach(function (record) {
            var existRecord = _.find(self.availableOwners, function (r) {
                return r.id == record.id;
            });

            if (existRecord) {
                record.selected = existRecord.selected;
            }
            else
                record.selected = false;
        });

        this.availableOwners = result;
        return this.availableOwners;
    };

    AccountFilterModel.newInstance = function (ajaxService) {
        var _ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        return Some(new AccountFilterModel(_ajaxService));
    };

    return AccountFilterModel;

});