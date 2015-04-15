/**
 * Created by justin on 4/14/15.
 */
app.registerView(function (container) {
    var BaseView = container.getView('views/BaseView');
    var ModalDialogAdapter = container.getService("services/ModalDialogAdapter");

    var AccountDetailWidgetEventBus = container.getService('services/bus/AccountDetailWidgetEventBus'),
        DocumentsWidgetModel = container.getModel('models/accountDetails/DocumentsWidgetModel');
    var DocumentsWidgetPresenter = container.getPresenter('presenters/accountDetails/DocumentsWidgetPresenter');

    function DocumentsWidgetView($scope, model, presenter, modalDialogService) {
        BaseView.call(this, $scope, model, presenter);
        this.modalDialogService = modalDialogService;
        this.data.documentsList = [];
    }

    DocumentsWidgetView.prototype = Object.create(BaseView.prototype, {
        eventChannel: {
            get: function () {
                return this.$scope.eventChannel || (this.$scope.eventChannel = AccountDetailWidgetEventBus.newInstance().getOrElse(throwInstantiateException(AccountDetailWidgetEventBus)));
            },
            set: function (value) {
                this.$scope.eventChannel = value;
            }
        }
    });

    DocumentsWidgetView.prototype.show = function () {
        BaseView.prototype.show.call(this);
        this.configureEvents();
    };

    DocumentsWidgetView.prototype.configureEvents = function () {
        var self = this;
        var eventChannel = self.eventChannel;

        eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));
        self.fn.saveRecordName = function (record) {
            // todo : save record
            record.editing = false;
        };

        self.fn.startEditing = function (record) {
            record._name = record.name;
            record.editing = true;
        };

        self.fn.cancelEditing = function (record) {
            record.name = record._name;
            record.editing = false;
            delete record._name;
        };

        self.fn.deleteDocument = function (record) {
            self.modalDialogService.confirm("Delete document",
                "Are you sure want to delete this document? ", self.onDeletionConfirmed.bind(self, record), function () {
                }, "Yes, delete it", "No, thanks");
        };

        self.$scope.$watch("accountId", self.onAccountIdChanged.bind(self));
        self.$scope.$on("$destroy", self.onDisposing.bind(self));
    };

    DocumentsWidgetView.prototype.onDeletionConfirmed = function (record) {

    };

    DocumentsWidgetView.prototype.onAccountIdChanged = function () {
        var self = this;
        var value = self.$scope.accountId;

        value && self.onReloadCommandReceived();
    };

    DocumentsWidgetView.prototype.onReloadCommandReceived = function () {
        var self = this;
        self.event.onLoadDocument(self.$scope.accountId);
    };

    DocumentsWidgetView.prototype.onDocumentsLoaded = function (data) {
        var self = this;
        self.eventChannel.sendReloadCompleteCommand();
        self.data.documentsList = data.map(function (record) {
            record.editing = false;
            return record;
        });
    };

    DocumentsWidgetView.prototype.onDisposing = function () {
        var self = this;
        self.eventChannel.unsubscribeReloadCommand();
        self.eventChannel.unsubscribeReloadCompleteCommand();
        self.eventChannel = null;
    };

    DocumentsWidgetView.newInstance = function ($scope, model, presenter, viewRepaintAspect, logErrorAspect) {
        var modal = $scope.injector.get("$modal");

        var modalDialog = ModalDialogAdapter.newInstance(modal).getOrElse(throwInstantiateException(ModalDialogAdapter));

        model = model || DocumentsWidgetModel.newInstance().getOrElse(throwInstantiateException(DocumentsWidgetModel));
        presenter = presenter || DocumentsWidgetPresenter.newInstance().getOrElse(throwInstantiateException(DocumentsWidgetPresenter));

        var view = new DocumentsWidgetView($scope, model, presenter, modalDialog);
        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return DocumentsWidgetView;
});