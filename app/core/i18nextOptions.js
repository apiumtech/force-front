define([
    'jquery',
    'config',
    'shared/services/JsonWebTokenService',
    'shared/services/StorageService'
], function ($, config, JsonWebTokenService, StorageService) {


    // --------------------------------------------------------
    //  TODO: move all this logic to a bootstrapping module
    // --------------------------------------------------------
    function doBadTokenRedirection(){
        window.location.href = "/"+ config.badTokenRedirectionPage;
    }

    $( document ).ajaxComplete(function( event, xhr, settings ) {
        if(!config.isDevMode() && xhr.responseJSON && xhr.responseJSON.status === 'nack'){
            if(xhr.responseJSON.message.code === '00.00.0.20' ||
                xhr.responseJSON.message.code === '00.00.0.21' ||
                xhr.responseJSON.message.code === '00.00.0.22'){
                doBadTokenRedirection();
            }
        }
    });

    var saveUserCode = function (userCode) {
        StorageService.newInstance().store(config.userCodeKey, userCode, true);
    };

    var token;
    var platform = config.web3PlatformCode;
    var language = config.defaultLiteralLang;
    var implementationCode = config.noImplementationCode;
    try {
        token = StorageService.newInstance().retrieve(config.tokenStorageKey, true);
        var payload = new JsonWebTokenService(token).getPayload();
        language = payload.language || config.defaultLiteralLang;
        implementationCode = payload.implementationCode;
        saveUserCode(payload.userCode);

    } catch(err){
    } finally {
        if( !config.isDevMode() &&
            (token === undefined || token === null || token === "") ){
            doBadTokenRedirection();
        }
    }
    // --------------------------------------------------------



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
    };
});