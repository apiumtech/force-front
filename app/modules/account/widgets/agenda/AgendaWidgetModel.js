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

    AgendaWidgetModel.prototype.loadEvents = function(accountId){
        if(!accountId) accountId = 28;
        var url = Configuration.api.getAgenda.format(accountId);
        var params = {
            url: url,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params);
    };

    AgendaWidgetModel.prototype.deleteEvent = function(event){
        var url = Configuration.api.deleteAgenda + "/" + event.id;
        var params = {
            url: url,
            type: 'delete',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params);
    };

    AgendaWidgetModel.prototype.addEvent = function (event) {
        var url = Configuration.api.createAgenda;
        var params = {
            url: url,
            data: event,
            type: 'POST',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params);
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