/**
 * Created by Justin on 3/19/2015.
 */
app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");

    function AccountEditView($scope, $modalInstance, model, presenter) {
        BaseView.call(this, $scope, model, presenter);

        this.modalInstance = $modalInstance;
    }

    AccountEditView.prototype = Object.create(BaseView.prototype, {});

    AccountEditView.prototype.show = function () {
        BaseView.prototype.show.call(this);
        this.configureEvents();
    };

    AccountEditView.prototype.configureEvents = function () {
        var self = this;

        self.fn.closeDialog = function () {
            self.modalInstance.dismiss();
        };

        self.fn.saveAccount = function () {
            self.modalInstance.close(self.$scope.accountId);
        };
    };

    AccountEditView.newInstance = function (scope, modalInstance, model, presenter, viewRepaintAspect, logErrorAspect) {

        var view = new AccountEditView(scope, modalInstance, model, presenter);
        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return AccountEditView;
});