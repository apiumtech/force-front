define([
    'jquery',
    'config',
    'shared/services/JsonWebTokenService',
    'shared/services/StorageService',
    'moment',
    'numbro'
], function ($, config, JsonWebTokenService, StorageService, moment, numbro) {
    'use strict';

    function doBadTokenAction(reason){
        window.console.error("Server error: " + reason);
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
                doBadTokenAction(responseJSON.message.code);
            }
        }
    });

    var clearPageLayouts = function() {
      var storageService = StorageService.newInstance();
      ['intensity','distribution','conversion'].forEach(function(pageName){
        var pageLayoutStorageKey = "pageLayout_" + pageName;
        storageService.remove(pageLayoutStorageKey, true);
      });
      storageService.remove('all_widgets', true);
    };
    clearPageLayouts();

    var saveUserCode = function (userCode) {
        StorageService.newInstance().store(config.userCodeKey, userCode, true);
    };

    var saveImplementationCode = function (implCode) {
        StorageService.newInstance().store(config.implementationCodeKey, implCode, true);
    };

    // en-gb, en-us, de-de, es-es, fr-fr, pt-pt, it-it
    var configureLibraryLanguages = function(lang) {
        var locale = window.navigator.userLanguage || window.navigator.language;
        lang = lang || locale;

        // normalize language code
        if( lang.split("-").length > 1 ) {
            var parts = lang.split("-");
            lang = parts[0].toLowerCase() +"-"+ parts[1].toUpperCase();
        } else {
            lang = lang.toLowerCase();
            lang =  lang === 'es' ? 'es-ES' :
                    lang === 'en' ? 'en-US' :
                    lang === 'de' ? 'de-DE' :
                    lang === 'fr' ? 'fr-FR' :
                    lang === 'pt' ? 'pt-PT' :
                    lang === 'ru' ? 'ru-RU' :
                    lang === 'br' ? 'pt-BR' :
                    lang === 'it' ? 'it-IT' : 'en-US';
        }

        moment.locale(lang);
        numbro.culture(lang);
    };

    var token;
    var platform = config.web3PlatformCode;
    var language = config.defaultLiteralLang;
    var implementationCode = config.noImplementationCode;
    var locale = language;
    try {
        token = StorageService.newInstance().retrieve(config.tokenStorageKey, true);
        var payload = new JsonWebTokenService(token).getPayload();
        language = payload.language || config.defaultLiteralLang;
        locale = payload.locate || language;
        implementationCode = payload.implementationCode;
        saveUserCode(payload.userCode);
        saveImplementationCode(implementationCode);

    } catch(err){
    } finally {
        if( !config.isDevMode() &&
            (token === undefined || token === null || token === "") ){
            doBadTokenAction("Error processing token");
        }
        configureLibraryLanguages(locale);
    }




    return {
      language: language,
      implementationCode: implementationCode,
      platform: platform
    };
});
