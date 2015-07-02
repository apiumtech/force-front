/**
 * Created by justin on 3/16/15.
 */
define([
    'shared/services/ajax/AjaxService',
    'config'
], function (AjaxService, Configuration) {

    function ActivityWidgetModel(ajaxService) {
        this.authAjaxService = ajaxService;
    }

    ActivityWidgetModel.inherits(Object);

    ActivityWidgetModel.prototype.loadActivity = function (id, pageIndex) {
        var self = this;

        var query = "";
        if (pageIndex) query += "?pageIndex=" + pageIndex;

        var params = {
            url: Configuration.api.getActivity.format(id) + query,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.authAjaxService.rawAjaxRequest(params).then(self.decorateActivityData.bind(self));
    };

    ActivityWidgetModel.prototype.toggleFollow = function (activityId) {
        var params = {
            url: Configuration.api.toggleFollowActivity.format(activityId),
            type: 'post',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.authAjaxService.rawAjaxRequest(params);
    };

    ActivityWidgetModel.prototype.decorateActivityData = function (data) {
        // TODO: Fake for now
        return data;
    };

    ActivityWidgetModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AjaxService.newInstance();

        return new ActivityWidgetModel(ajaxService);
    };

    return ActivityWidgetModel;
});