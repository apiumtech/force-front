/**
 * Created by Justin on 3/16/2015.
 */

define([
    'modules/account/widgets/agenda/AgendaWidgetModel'
], function (AgendaWidgetModel) {
    function AgendaWidgetPresenter(model) {
        this.model = model || new AgendaWidgetModel();
    }

    AgendaWidgetPresenter.prototype.show = function (view) {
        this.view = view;
        var model = this.model;
        view.event = view.event || {};

        view.event.onLoadAgenda = function (accountId) {
            model.loadAgendaData(accountId)
                .then(view.onAgendaLoaded.bind(view), view.showError.bind(view));
        };

        view.event.onAddEvent = function(event){
            model.addEvent(event)
                .then(view.onEventAdded.bind(view), view.showError.bind(view));
        };

    };

    return AgendaWidgetPresenter;
});