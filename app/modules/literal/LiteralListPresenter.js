/**
 * Created by joanllenas 5/14/15
 */

define([], function () {

    function LiteralListPresenter() {
    }

    var proto = LiteralListPresenter.prototype;


    proto.show = function (view, model) {
        this.model = model;
        this.view = view;

        view.event.onDelete = this.onDelete.bind(this);
        view.event.onInit = this.onInit.bind(this);
    };


    proto.getLiteralList = function () {
        var self = this;
        self.model.getLiteralList("")
            .then(
            self.view.showTableData.bind(self.view),
            self.view.showError.bind(self.view)
        );
    };


    proto.onInit = function () {
        var self = this;
        self.model.getLiteralDictionary();

        self.model.getLanguageList()
            .then(
            self.view.onGetLanguageList.bind(self.view),
            self.view.showError.bind(self.view)
        );
    };


    proto.onSearchTextFilterChanged = function (searchQuery) {
        var self = this;
        self.model.getLiteralList(searchQuery).then(
            self.view.showTableData.bind(self.view),
            self.view.showError.bind(self.view)
        );
    };


    proto.onDelete = function (id) {
        var self = this;
        self.model.deleteLiteral(id)
            .then(
            self.getLiteralList.bind(self),
            self.view.showError.bind(self.view)
        );
    };


    LiteralListPresenter.newInstance = function () {
        return new LiteralListPresenter();
    };

    return LiteralListPresenter;
});

