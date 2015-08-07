define([
    'jquery',
    'config',
    'shared/services/JsonWebTokenService',
    'shared/services/StorageService'
], function ($, config, JsonWebTokenService, StorageService) {

    var saveUserCode = function (userCode) {
        StorageService.newInstance().store(config.userCodeKey, userCode, true);
    };

    var platform = config.web3PlatformCode;
    var language = config.defaultLiteralLang;
    var implementationCode = config.noImplementationCode;
    try {
        var token = StorageService.newInstance().retrieve(config.tokenStorageKey, true);
        var payload = new JsonWebTokenService(token).getPayload();
        language = payload.language || config.defaultLiteralLang;
        implementationCode = payload.implementationCode;

        // TODO: move this logic to a bootstrapping routine
        saveUserCode(payload.userCode);

    } catch(err){
    }

    // FIXME: (joanllenas) for some reason prod's customLoad is being called three times. This is a hack to avoid it meanwhile.
    var isFetching = false;

    return {
        dev_local: {
            resGetPath: 'assets/translations/en.json'
        },
        dev: {
            lng: language,
            useCookie: false,
            useLocalStorage: false,
            fallbackLng: config.defaultLiteralLang,
            resGetPath: '/api/translations/__lng__'
        },
        prod: {
            lng: language,
            useCookie: false,
            useLocalStorage: false,
            fallbackLng: config.defaultLiteralLang,
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