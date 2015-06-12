define([
    'app',
    'toastr'
], function (app, toastr) {
    'use strict';

    function ToastService() {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }

    ToastService.prototype.success = function (message) {
        toastr.success(message);
    };


    ToastService.prototype.info = function (message) {
        toastr.info(message);
    };


    ToastService.prototype.warning = function (message) {
        toastr.warning(message);
    };


    ToastService.prototype.error = function (message) {
        toastr.error(message);
    };


    ToastService.getInstance = function () {
        return ToastService.__instance || (ToastService.__instance = new ToastService());
    };


    return ToastService;
});