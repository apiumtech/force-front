/**
 * Created by justin on 3/9/15.
 */
app.registerModel(function (container) {
    var AjaxService = container.getService("services/AjaxService");

    function AccountDetailsModel(ajaxService) {
        this.ajaxService = ajaxService;
    }

    AccountDetailsModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || ajaxService.newInstance().getOrElse(throwInstantiateException(ajaxService));

        return Some(new AccountDetailsModel(ajaxService));
    };

    return AccountDetailsModel;
});