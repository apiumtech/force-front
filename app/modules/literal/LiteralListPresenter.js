/**
 * Created by joanllenas 5/14/15
 */

define([], function () {

    function LiteralListPresenter() {}

    LiteralListPresenter.prototype.show = function (view, model) {
        var self = this;

        view.event.onDelete = function (id) {
            model.deleteLiteral(id)
                .then(
                view.event.getLiteralList.bind(view.event),
                view.showError.bind(view)
            );
        };

        view.event.getLiteralList = function () {
            model.getLiteralList("")
                .then(
                view.showTableData.bind(view),
                view.showError.bind(view)
            );
        };

        view.event.onInit = onInit = function () {
            model.getLanguageList()
                .then(
                view.onGetLanguageList.bind(view),
                view.showError.bind(view)
            );
        };

        view.event.onSearchTextFilterChanged = function (searchQuery) {
            model.getLiteralList(searchQuery).then(
                view.showTableData.bind(view),
                view.showError.bind(view)
            );
        };
    };


    LiteralListPresenter.newInstance = function () {
        return new LiteralListPresenter();
    };

    return {newInstance: LiteralListPresenter.newInstance};
});

