/**
 * Created by joanllenas on 4/21/15.
 */

app.registerModel(function (container) {
    var AjaxService = container.getService("services/AjaxService");
    var Configuration = container.getService("Configuration");

    function TopMenuModel(ajaxService, configuration) {
        this.ajaxService = ajaxService;
        this.configuration =  configuration;
    }

    TopMenuModel.newInstance = function (ajaxService, configuration) {
        var _ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        var _configuration = configuration || Configuration;

        return Some(new TopMenuModel(_ajaxService, _configuration));
    };

    return {newInstance: TopMenuModel.newInstance};
});
