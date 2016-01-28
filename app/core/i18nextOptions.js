define([
    'jquery',
    'config',
    'shared/services/JsonWebTokenService',
    'shared/services/StorageService'
], function ($, config, JsonWebTokenService, StorageService) {
    'use strict';

    // --------------------------------------------------------
    //  TODO: move all this logic to a bootstrapping module
    // --------------------------------------------------------
    function doBadTokenRedirection(reason){
        window.console.error("Server error: " + reason);
        /*window.console.error("Redirecting due to session error...");
        setTimeout(function () {
            window.location.href = "/"+ config.badTokenRedirectionPage;
        },5000);*/
    }

    $( document ).ajaxComplete(function( event, xhr, settings ) {
        var responseJSON;
        if(xhr.responseJSON){
            responseJSON = xhr.responseJSON;
        } else if(xhr.responseText && xhr.responseText.indexOf("success") > -1){
            responseJSON = JSON.parse(xhr.responseText);
        }
        if(responseJSON && responseJSON.success === false){
            if(responseJSON.message.code === '00.00.0.20' ||
                responseJSON.message.code === '00.00.0.21' ||
                responseJSON.message.code === '00.00.0.22'){
                doBadTokenRedirection(responseJSON.message.code);
            }
        }
    });

    var saveUserCode = function (userCode) {
        StorageService.newInstance().store(config.userCodeKey, userCode, true);
    };

    var saveImplementationCode = function (implCode) {
        StorageService.newInstance().store(config.implementationCodeKey, implCode, true);
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
        saveImplementationCode(implementationCode);

    } catch(err){
    } finally {
        if( !config.isDevMode() &&
            (token === undefined || token === null || token === "") ){
            doBadTokenRedirection("Error processing token");
        }
    }
    // --------------------------------------------------------


    // defaultValue: ''
    return {
        dev_local: {
            resGetPath: 'assets/translations/en.json',
            keyseparator: '::' // this is to make sure that keys with dot notation are parsed statically (don't need to be nested). Was '.' before
        },
        dev: {
            lng: language,
            useCookie: false,
            useLocalStorage: false,
            fallbackLng: config.defaultLiteralLang,
            resGetPath: '/api/translations/__lng__',
            keyseparator: '::'
        },
        prod: {
            keyseparator: '::', // this is to make sure that keys with dot notation are parsed statically (don't need to be nested)
            lng: language,
            useCookie: false,
            useLocalStorage: false,
            fallbackLng: config.defaultLiteralLang,
            defaultValue: '', // make literal placeholders empty while loading
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
                        $rootScope.i18nextLanguageReady = true;
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