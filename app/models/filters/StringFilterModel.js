/**
 * Created by Justin on 4/3/2015.
 */
app.registerModel(function (container) {
    var BaseAccountFilterModel = container.getService("models/filters/BaseAccountFilterModel");
    var AjaxService = container.getService("services/FakeAjaxService");
    var Configuration = container.getService("Configuration");

    function StringFilterModel(ajaxService) {
        BaseAccountFilterModel.call(this, ajaxService);
    }

    StringFilterModel.prototype = Object.create(BaseAccountFilterModel.prototype, {});

    StringFilterModel.prototype.getFilterValues = function (filterName, queryString) {
        return this.ajaxService.rawAjaxRequest({
            result: []
        });
    };

    StringFilterModel.newInstance = function (ajaxService) {
        return Some(new StringFilterModel(ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService))));
    };

    return StringFilterModel;
});