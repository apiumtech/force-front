/**
 * Created by Justin on 4/3/2015.
 */
define([
    'shared/services/ajax/AuthAjaxService',
    'config'
], function (AuthAjaxService, Configuration) {

    function BaseAccountFilterModel(authAjaxService) {
        this.authAjaxService = authAjaxService || AuthAjaxService._diResolve();
    }

    BaseAccountFilterModel.prototype.getFilterValues = function (filterName, queryString) {
        return this.authAjaxService.rawAjaxRequest({
            url: Configuration.api.getFilterValues + "?fieldName=" + filterName + "&queryString=" + queryString,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        });
    };

    return BaseAccountFilterModel;
});