/**
 * Created by Justin on 4/3/2015.
 */
define([
    'shared/services/ajax/AjaxService',
    'config'
], function (AjaxService, Configuration) {

    function BaseAccountFilterModel(ajaxService) {
        this.ajaxService = ajaxService || AjaxService.newInstance();
    }

    BaseAccountFilterModel.prototype.getFilterValues = function (filterName, queryString) {
        console.log("filter values", filterName);
        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.getFilterValues + "?fieldName=" + filterName + "&queryString=" + queryString,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        });
    };

    return BaseAccountFilterModel;
});