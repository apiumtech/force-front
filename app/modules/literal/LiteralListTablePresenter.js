define([], function () {

    function LiteralListTablePresenter() {}

    LiteralListTablePresenter.prototype.show = function (view, model) {
        var self = this;

        view.event.onDelete = function (id) {
        };

        view.event.onGetList = function () {
        };

        view.event.onInit = function () {
        };

        view.event.onSearch = function (searchQuery) {
        };
    };


    LiteralListTablePresenter.newInstance = function () {
        return new LiteralListTablePresenter();
    };

    return {newInstance: LiteralListTablePresenter.newInstance};
});

