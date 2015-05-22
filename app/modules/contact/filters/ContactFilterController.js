/**
 * Created by joanllenas on 03/31/15.
 */

define([
    'modules/contact/filters/ContactFilterView'
], function (ContactFilterView) {
    'use strict';

    function ContactFilterController($scope) {
        ContactFilterController.configureView($scope);
    }

    ContactFilterController.configureView = function ($scope) {
        var view = ContactFilterView.newInstance($scope);
        view.show();
    };

    return ContactFilterController;
});
