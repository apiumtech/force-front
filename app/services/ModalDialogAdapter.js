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

    ModalDialogAdapter.newInstance = function (modalService) {
        assertNotNull('modalService', modalService);

        return Some(new ModalDialogAdapter(modalService));
    };

    return ModalDialogAdapter;
});