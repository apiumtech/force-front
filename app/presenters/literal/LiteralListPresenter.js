/**
 * Created by kevin on 10/22/14.
 */

app.registerPresenter(function (container) {

    // FIXME: LiteralListPresenter with a instance of LiteralModel :(
    var LiteralModel = container.getModel('models/literal/LiteralModel');

    function LiteralListPresenter(literalmodel) {
        this.literalmodel = literalmodel;
    }

    LiteralListPresenter.prototype.show = function (view, model) {

        view.event.onSearchTextFilterChanged = function (value) {
            model.setSearchTextFilter(value)
                .then(
                    view.showTableData.bind(view),
                    view.showError.bind(view)
                );
        };

        view.event.onInit = function () {
            model.getLiteralKeyList()
                .then(
                view.showTableData.bind(view),
                view.showError.bind(view)
            );
        };

        view.event.onDelete = function (id) {
            this.literalmodel.deleteLiteral(id)
                .then(model.getLiteralKeyList.bind(model), view.showError.bind(view))
                .then(view.showTableData.bind(view), view.showError.bind(view));
        }.bind(this);

    };

    LiteralListPresenter.newInstance = function ($filterChannel, $literalmodel) {
        var literalmodel = $literalmodel || LiteralModel.newInstance();

        return new LiteralListPresenter(literalmodel);
    };

    return {newInstance: LiteralListPresenter.newInstance};
});

