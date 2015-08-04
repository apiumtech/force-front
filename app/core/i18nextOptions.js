define([
    'jquery',
    'config',
    'shared/services/JsonWebTokenService',
    'shared/services/StorageService'
], function ($, config, JsonWebTokenService, StorageService) {

    var platform = '108';//web3
    var language;
    var implementationCode = '-1';
    try {
        var token = StorageService.newInstance().retrieve(config.tokenStorageKey, true);
        var payload = new JsonWebTokenService(token).getPayload();
        language = payload.language || 'en';
        implementationCode = payload.implementationCode;
    } catch(err){
    }

    // FIXME: (joanllenas) for some reason prod's customLoad is being called three times. This is a hack to avoid it meanwhile.
    var isFetching = false;

    return {
        dev_local: {
            resGetPath: 'assets/translations/en.json'
        },
        dev: {
            lng: 'en',
            useCookie: false,
            useLocalStorage: false,
            fallbackLng: 'en',
            resGetPath: '/api/translations/__lng__'
        },
        prod: {
            lng: 'en',
            useCookie: false,
            useLocalStorage: false,
            fallbackLng: 'en',
            customLoad: function (lng, ns, options, loadComplete) {
                if (!isFetching) {
                    isFetching = true;
                    var params = {
                        url: config.api.literalValueDictionary,
                        data: {
                            language: language,
                            implementationCode: implementationCode,
                            platform: platform
                        },
                        crossDomain: true,
                        jsonp: false,
                        type: 'GET',
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        dataType: 'json'
                    };
                    $.ajax(params).then(
                        function (data) {

                            loadComplete(null, data);

                            var $body = angular.element(document.body);
                            var $rootScope = $body.injector().get('$rootScope');
                            $rootScope.$broadcast('i18nextLanguageChange');
                        },
                        function (err) {
                            var msg = 'Error loading literals: ' + err;
                            console.error(msg);
                            loadComplete(msg);
                        }
                    );
                }
            }
        }
    };
});