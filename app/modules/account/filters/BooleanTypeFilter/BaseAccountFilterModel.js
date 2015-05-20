/**
 * Created by Justin on 4/3/2015.
 */
app.registerModel(function (container) {
    var AjaxService = container.getService("services/AjaxService");
    var Configuration = container.getService("Configuration");

    function BaseAccountFilterModel(ajaxService) {
        this.ajaxService = ajaxService || AjaxService.newInstance();
    }

    BaseAccountFilterModel.prototype.getFilterValues = function (filterName, queryString) {
        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.getFilterValues + "?fieldName=" + filterName + "&queryString=" + queryString,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        });
    };

    return BaseAccountFilterModel;
});