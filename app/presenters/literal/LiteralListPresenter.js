/**
 * Created by joanllenas 5/14/15
 */

app.registerPresenter(function (container) {

    var LiteralModel = container.getModel('models/literal/LiteralModel');

    function LiteralListPresenter() {
    }


    LiteralListPresenter.prototype.show = function (view, model) {
        this.model = model;
        this.view = view;

        view.event.onSearchTextFilterChanged = this.onSearchTextFilterChanged.bind(this);
        view.event.onDelete = this.onDelete.bind(this);
        view.event.onInit = this.onInit.bind(this);
    };


    LiteralListPresenter.prototype.getLiteralList = function () {
        var self = this;
        self.model.getLiteralList("")
            .then(
            self.view.showTableData.bind(self.view),
            self.view.showError.bind(self.view)
        );
    };


    LiteralListPresenter.prototype.onInit = function () {
        var self = this;
        self.model.getLanguageList()
            .then(
            self.view.onGetLanguageList.bind(self.view),
            self.view.showError.bind(self.view)
        );
    };


    LiteralListPresenter.prototype.onSearchTextFilterChanged = function (value) {
        var self = this;
        self.model.getLiteralList(value)
            .then(
            self.view.showTableData.bind(self.view),
            self.view.showError.bind(self.view)
        );
    };


    LiteralListPresenter.prototype.onDelete = function (id) {
        var self = this;
        self.model.deleteLiteral(id)
            .then(self.model.getLiteralList.bind(self.model), self.view.showError.bind(self.view))
            .then(self.view.showTableData.bind(self.view), self.view.showError.bind(self.view));
    };


    LiteralListPresenter.newInstance = function () {
        return Some(new LiteralListPresenter());
    };

    return {newInstance: LiteralListPresenter.newInstance};
});

