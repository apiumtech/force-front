/**
 * Created by justin on 5/20/15.
 */
define([
    'shared/services/notification/NotificationService',
    'core/topMenu/TopMenuWeb2Controller',
    'core/topMenu/TopMenuWeb4Controller',
    'core/sideMenu/SideMenuController',
    'core/topMenu/TopMenuCFMController',

    'shared/components/TriStateCheckBoxDirective',
    'shared/components/ScrollTopButtonDirective',
    'shared/components/datePicker/ForceDatePickerDirective',
    'shared/components/HighLightResultDirective',
    'shared/components/ResizableTextAreaDirective',
    'shared/components/CellCompilerDirective',

    'shared/components/confirmationDialog/ConfirmationDialogController',
    'shared/components/confirmationDialog/NotificationDialogController'

], function (NotificationService) {
    'use strict';
    NotificationService._diResolve();

});
