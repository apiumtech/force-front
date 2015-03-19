/**
 * Created by Justin on 3/19/2015.
 */
app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");
    var ModalDialogAdapter = container.getService('services/ModalDialogAdapter');

    function doNothing() {
    }

    function AccountCreateView($scope, $modalInstance, model, presenter) {
        BaseView.call(this, $scope, model, presenter);

        this.modalInstance = $modalInstance;
        this.modalDialogAdapter = ModalDialogAdapter.newInstance($scope.$modal).getOrElse(throwInstantiateException(ModalDialogAdapter));
    }

    AccountCreateView.prototype = Object.create(BaseView.prototype, {});

    AccountCreateView.prototype.show = function () {
        BaseView.prototype.show.call(this);
        this.configureEvents();
    };

    AccountCreateView.prototype.configureEvents = function () {
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

    AccountCreateView.prototype.onAccountSaved = function () {
        var self = this;
        self.modalInstance.close();
    };

    AccountCreateView.newInstance = function (scope, modalInstance, model, presenter, viewRepaintAspect, logErrorAspect) {

        var view = new AccountCreateView(scope, modalInstance, model, presenter);
        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return AccountCreateView;
});