/**
 * Created by Justin on 3/19/2015.
 */
app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");

    function ConfirmationDialogView($scope, $modalInstance) {
        BaseView.call(this, $scope);

        this.modalInstance = $modalInstance;
    }

    ConfirmationDialogView.prototype = Object.create(BaseView.prototype, {});

    ConfirmationDialogView.prototype.show = function () {
        this.configureEvents();
    };

    ConfirmationDialogView.prototype.configureEvents = function () {
        var self = this;

        self.fn.cancelBtnClicked = function () {
            self.modalInstance.dismiss();
        };

        self.fn.okBtnClicked = function () {
            self.modalInstance.close(true);
        };
    };

    ConfirmationDialogView.newInstance = function (scope, modalInstance, model, presenter, viewRepaintAspect, logErrorAspect) {
        var view = new ConfirmationDialogView(scope, modalInstance, model, presenter);
        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return ConfirmationDialogView;
});