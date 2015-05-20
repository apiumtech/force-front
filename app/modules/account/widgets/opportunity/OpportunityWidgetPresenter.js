/**
 * Created by Justin on 3/16/2015.
 */

app.registerPresenter(function () {
    function OpportunityWidgetPresenter() {

    }

    OpportunityWidgetPresenter.prototype.show = function (view, model) {
        this.view = view;
        this.model = model;

        view.event.onLoadOpportunities = function (accountId) {
            model.loadOpportunities(accountId)
                .then(view.onOpportunitiesLoaded.bind(view), view.showError.bind(view));
        };
    };

    OpportunityWidgetPresenter.newInstance = function () {
        return new OpportunityWidgetPresenter();
    };

    return OpportunityWidgetPresenter;
});