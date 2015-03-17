/**
 * Created by justin on 3/16/15.
 */
app.registerModel(function (container) {
    var AjaxService = container.getService("services/AjaxService");
    var Configuration = app.getService('Configuration');

    function ActivityWidgetModel(ajaxService) {
        this.ajaxService = ajaxService;
    }

    ActivityWidgetModel.prototype = Object.create(Object.prototype);

    ActivityWidgetModel.prototype.loadActivity = function (id, pageIndex) {
        var self = this;

        var query = "";
        if (pageIndex) query += "?pageIndex=" + pageIndex;

        var params = {
            url: Configuration.api.getActivity + '/' + id + query,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params).then(self.decorateActivityData.bind(self));
    };

    ActivityWidgetModel.prototype.toggleFollow = function (activityId) {
        var params = {
            url: Configuration.api.toggleFollowActivity + "/" + activityId,
            type: 'post',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params);
    };

    ActivityWidgetModel.prototype.decorateActivityData = function (data) {
        // TODO: Fake for now
        return data;
    };

    ActivityWidgetModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));

        return Some(new ActivityWidgetModel(ajaxService));
    };

    return ActivityWidgetModel;
});