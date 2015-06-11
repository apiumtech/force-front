/**
 * Created by justin on 5/20/15.
 */
define([
    'shared/services/notification/NotificationService',
    'core/topMenu/TopMenuController',

    'shared/components/TriStateCheckBoxDirective',
    'shared/components/ScrollTopButtonDirective',
    'shared/components/datePicker/ForceDatePickerDirective',
    'shared/components/HighLightResultDirective',
    'shared/components/countrySelector/CountrySelectorDirective',

    'shared/components/confirmationDialog/ConfirmationDialogController',
    'shared/components/confirmationDialog/NotificationDialogController'
], function (NotificationService) {
    'use strict';
    NotificationService.getInstance();
    console.log("initialized notification service");
});