/**
 * Created by justin on 3/16/15.
 */
define([
    'shared/services/ajax/AjaxService',
    'config',
    'shared/services/ajax/FakeAjaxService'
], function (AjaxService, Configuration, FakeAjaxService) {

    function AgendaWidgetModel(ajaxService) {
        this.ajaxService = ajaxService || new AjaxService();
        this.fakeAjaxService = new FakeAjaxService();
    }

    AgendaWidgetModel.inherits(Object);

    AgendaWidgetModel.prototype.loadAgendaData = function (id) {
        var self = this;

        var params = {
            url: Configuration.api.getAgenda + '/' + id,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json',
            result: [{
                id: 1,
                eventName: "eventname",
                date: new Date(2015, 15, 3).toISOString()
            }]
        };

        return this.ajaxService.rawAjaxRequest(params).then(self.decorateAgendaData.bind(self));
    };

    AgendaWidgetModel.prototype.addEvent = function (event) {
        var self = this;

        return this.fakeAjaxService.rawAjaxRequest({
            result: event
        });
    };

    AgendaWidgetModel.prototype.decorateAgendaData = function (data) {
        // TODO: Fake for now
        return data;
    };

    AgendaWidgetModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AjaxService.newInstance();

        return new AgendaWidgetModel(ajaxService);
    };

    return AgendaWidgetModel;
});