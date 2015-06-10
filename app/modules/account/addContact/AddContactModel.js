define([
    'app',
    'shared/services/ajax/AjaxService'
], function (app, AjaxService) {
    'use strict';

    function AddContactModel(ajaxService) {
        this.ajaxService = ajaxService;
    }

    app.di.register('addContactModel')
        .as(AddContactModel)
        .withConstructor();

    return AddContactModel;
});
