var LoginServer = function () {
    this.start = function () {
        browser.addMockModule('force_manager_crm.mockServer', function () {


            angular.module("force_manager_crm.mockServer", [])
                .run(function () {
                    /*
                    Inside define() somehow monkey path AjaxService.newInstance
                    AjaxService.newInstance = function () {
                     window.alert("injected!!!");
                     var ajaxImpl = FakeAjaxService.newInstance();
                     return new AjaxService(ajaxImpl);
                     };
                     */
                    return {};
                });

        });
    };
};

module.exports = LoginServer;