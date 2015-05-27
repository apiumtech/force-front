define([
    'shared/services/ajax/FakeAjaxService'
], function (AjaxService) {
    'use strict';

    function ReportItemModel(ajaxService) {
        this.ajaxService = ajaxService || new AjaxService();
    }

    ReportItemModel.prototype.saveName = function (id, newName) {
        return this.ajaxService.rawAjaxRequest({
            result: {
                name: newName,
                id: id
            }
        });
    };


    ReportItemModel.prototype.saveDescription = function (id, newDescription) {
        return this.ajaxService.rawAjaxRequest({
            result: {
                description: newDescription,
                id: id
            }
        });
    };

    return ReportItemModel;
});