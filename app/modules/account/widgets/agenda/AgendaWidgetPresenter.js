/**
 * Created by Justin on 3/16/2015.
 */

app.registerPresenter(function () {
    function AgendaWidgetPresenter() {

    }

    AgendaWidgetPresenter.prototype.show = function (view, model) {
        this.view = view;
        this.model = model;

        view.event.onLoadAgenda = function (accountId) {
            model.loadAgendaData(accountId)
                .then(view.onAgendaLoaded.bind(view), view.showError.bind(view));
        };
    };

    AgendaWidgetPresenter.newInstance = function () {
        return new AgendaWidgetPresenter();
    };

    return AgendaWidgetPresenter;
});