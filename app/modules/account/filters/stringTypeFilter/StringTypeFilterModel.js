/**
 * Created by Justin on 4/3/2015.
 */
define([
    'modules/account/filters/BaseAccountFilterModel',
    'shared/services/ajax/AjaxService'
], function (BaseAccountFilterModel, AjaxService) {

    function StringFilterModel(ajaxService) {
        BaseAccountFilterModel.call(this, ajaxService);
    }

    //StringFilterModel.inherits(BaseAccountFilterModel, {});

    StringFilterModel.inherits(BaseAccountFilterModel);

    StringFilterModel.prototype._getFilterValues = BaseAccountFilterModel.prototype.getFilterValues;
    StringFilterModel.prototype.getFilterValues = function (fieldName, queryString) {
        return this._getFilterValues(fieldName, queryString)
            .then(this.decorateResponseData.bind(this));
    };

    StringFilterModel.prototype.decorateResponseData = function (data) {
        console.log("TEST",data);
        return data.map(function (string) {
            return {name: string, selected: false};
        });
    };

    StringFilterModel.newInstance = function (ajaxService) {
        return new StringFilterModel(ajaxService || AjaxService.newInstance());
    };

    return StringFilterModel;
});