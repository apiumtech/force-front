/**
 * Created by Justin on 3/19/2015.
 */
app.registerService(function (container) {
    function ModalDialogAdapter(modalService) {
        this.modalService = modalService;
    }

    ModalDialogAdapter.prototype.createDialog = function (templateUrl, controller, size, resolve, submitCallback, dismissCallback) {
        var modalInstance = this.modalService.open({
            templateUrl: templateUrl,
            backdrop: 'static',
            keyboard: false,
            controller: controller,
            size: size || '',
            resolve: resolve
        });

        modalInstance.result.then(submitCallback, dismissCallback);
        return modalInstance;
    };

    ModalDialogAdapter.prototype.confirm = function (title, message, onConfirmed, onCancelled, okButtonTitle, cancelButtonTitle) {
        var modalInstance = this.modalService.open({
            templateUrl: '/templates/confirmationDialog.html',
            backdrop: 'static',
            keyboard: false,
            controller: 'ConfirmationDialogController',
            size: 'md',
            resolve: {
                title: function () {
                    return title;
                },
                message: function () {
                    return message;
                },
                okButtonTitle: function () {
                    return okButtonTitle || "OK";
                },
                cancelButtonTitle: function () {
                    return cancelButtonTitle || "Cancel";
                }
            }
        });

        modalInstance.result.then(function (answer) {
            if (answer)
                onConfirmed();
        }, onCancelled);
        return modalInstance;
    };

    ModalDialogAdapter.newInstance = function (modalService) {
        assertNotNull('modalService', modalService);
        return Some(new ModalDialogAdapter(modalService));
    };

    return ModalDialogAdapter;
});