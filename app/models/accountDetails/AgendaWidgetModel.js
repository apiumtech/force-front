/**
 * Created by justin on 3/16/15.
 */
app.registerModel(function (container) {
    var AjaxService = container.getService("services/AjaxService");
    var Configuration = app.getService('Configuration');

    function AgendaWidgetModel(ajaxService) {
        this.ajaxService = ajaxService;
    }

    AgendaWidgetModel.prototype = Object.create(Object.prototype);

    AgendaWidgetModel.prototype.loadAgendaData = function (id) {
        var self = this;

        var params = {
            url: Configuration.api.getAgenda + '/' + id,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params).then(self.decorateAgendaData.bind(self));
    };

    AgendaWidgetModel.prototype.decorateAgendaData = function (data) {
        // TODO: Fake for now
        return data;
    };

    AgendaWidgetModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));

        return Some(new AgendaWidgetModel(ajaxService));
    };

    return AgendaWidgetModel;
});