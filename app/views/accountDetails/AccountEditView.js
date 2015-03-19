/**
 * Created by Justin on 3/19/2015.
 */
app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");
    var ModalDialogAdapter = container.getService('services/ModalDialogAdapter');

    function doNothing() {
    }

    function AccountEditView($scope, $modalInstance, model, presenter) {
        BaseView.call(this, $scope, model, presenter);

        this.modalInstance = $modalInstance;
        this.modalDialogAdapter = ModalDialogAdapter.newInstance($scope.$modal).getOrElse(throwInstantiateException(ModalDialogAdapter));
    }

    AccountEditView.prototype = Object.create(BaseView.prototype, {});

    AccountEditView.prototype.show = function () {
        BaseView.prototype.show.call(this);
        this.configureEvents();
    };

    AccountEditView.prototype.configureEvents = function () {
        var self = this;

        self.fn.closeDialog = function () {
            self.modalDialogAdapter.confirm("Close confirmation",
                "Are you sure want to close this dialog without saving?",
                self.modalInstance.dismiss,
                doNothing,
                "Yes", "No");
        };

        self.fn.saveAccount = function () {
            // TODO : save the data then close the dialog
            self.onAccountSaved();
        };
    };

    AccountEditView.prototype.onAccountSaved = function () {
        var self = this;
        self.modalInstance.close(self.$scope.accountId);
    };

    AccountEditView.newInstance = function (scope, modalInstance, model, presenter, viewRepaintAspect, logErrorAspect) {

        var view = new AccountEditView(scope, modalInstance, model, presenter);
        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return AccountEditView;
});