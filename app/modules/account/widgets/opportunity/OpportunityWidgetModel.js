/**
 * Created by justin on 3/16/15.
 */
define([
    'shared/services/ajax/AjaxService',
    'config'
], function (AjaxService, Configuration) {

    function OpportunityWidgetModel(ajaxService) {
        this.ajaxService = ajaxService;
    }

    OpportunityWidgetModel.prototype = Object.create(Object.prototype);

    OpportunityWidgetModel.prototype.loadOpportunities = function (id) {
        var self = this;

        var params = {
            url: Configuration.api.getOpportunities + '/' + id,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params).then(self.decorateOpportunityData.bind(self));
    };

    OpportunityWidgetModel.prototype.decorateOpportunityData = function (data) {
        // TODO: Fake for now
        return data;
    };

    OpportunityWidgetModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AjaxService.newInstance();

        return new OpportunityWidgetModel(ajaxService);
    };

    return OpportunityWidgetModel;
});