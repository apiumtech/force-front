/**
 * Created by Justin on 4/3/2015.
 */
app.registerModel(function (container) {
    var BaseAccountFilterModel = container.getService("models/filters/BaseAccountFilterModel");
    var AjaxService = container.getService("services/AjaxService");
    var Configuration = container.getService("Configuration");

    function StringFilterModel(ajaxService) {
        BaseAccountFilterModel.call(this, ajaxService);
    }

    StringFilterModel.prototype = Object.create(BaseAccountFilterModel.prototype, {});

    StringFilterModel.prototype._getFilterValues = BaseAccountFilterModel.prototype.getFilterValues;
    StringFilterModel.prototype.getFilterValues = function (fieldName, queryString) {
        return this._getFilterValues(fieldName, queryString)
            .then(this.decorateResponseData.bind(this));
    };

    StringFilterModel.prototype.decorateResponseData = function (data) {
        return data.map(function (string) {
            return {name: string, selected: false};
        });
    };

    StringFilterModel.newInstance = function (ajaxService) {
        return Some(new StringFilterModel(ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService))));
    };

    return StringFilterModel;
});