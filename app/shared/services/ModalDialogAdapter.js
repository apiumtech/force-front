/**
 * Created by Justin on 3/19/2015.
 */
define([
    'app',
    'underscore'
], function (app, _) {

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

    ModalDialogAdapter.prototype.open = function (conf) {
        var modalInstance = this.modalService.open(conf);

        return modalInstance;
    };

    ModalDialogAdapter.prototype.confirm = function (title, message,
                                                     onConfirmed, onCancelled,
                                                     okButtonTitle, cancelButtonTitle,
                                                     resolveObject) {

        var resolve = _.extend(resolveObject || {}, {
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
        });

        var modalInstance = this.modalService.open({
            templateUrl: 'app/shared/components/confirmationDialog/confirmationDialog.html',
            backdrop: 'static',
            keyboard: false,
            controller: 'ConfirmationDialogController',
            size: 'md',
            resolve: resolve
        });

        modalInstance.result.then(function (answer) {
            if (answer)
                onConfirmed();
        }, onCancelled);
        return modalInstance;
    };

    ModalDialogAdapter.prototype.notify = function (title, message,
                                                    resolveObject,
                                                    callBackWhenClose) {

        var resolve = _.extend(resolveObject || {}, {
            title: function () {
                return title;
            },
            message: function () {
                return message;
            }
        });

        var modalInstance = this.modalService.open({
            templateUrl: 'app/shared/components/confirmationDialog/notifyDialog.html',
            backdrop: 'static',
            keyboard: false,
            controller: 'NotificationDialogController',
            size: 'md',
            resolve: resolve
        });

        if (callBackWhenClose){
            modalInstance.result.then(callBackWhenClose);
        }

        return modalInstance;
    };

    ModalDialogAdapter.newInstance = function (modalService) {
        assertNotNull('modalService', modalService);
        return new ModalDialogAdapter(modalService);
    };

    app.di.register('modalDialogAdapter').as(ModalDialogAdapter);

    return ModalDialogAdapter;
});