/**
 * Created by joanllenas on 03/31/15.
 */

define([
    'modules/contact/ContactView'
], function(ContactView){
    'use strict';

    function ContactController($scope) {
        ContactController.configureView($scope);
    }

    ContactController.configureView = function ($scope) {
        var view = ContactView.newInstance($scope);
        view.show();
    };

    return ContactController;
});
