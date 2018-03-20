define([
    'jquery',
    'config',
    'angular'
], function ($, config, angular) {
    'use strict';

    var createOptions = function(language, implementationCode, platform) {
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
              defaultLoadingValue: '',
              customLoad: function (lng, ns, options, loadComplete) {
                  var params = {
                      url: config.api.literalValueDictionary,
                      data: {
                          language: language,
                          implementationCode: implementationCode,
                          platform: platform,
                          date: "2018-01-30"
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
                          window.console.error(msg);
                          loadComplete(msg);
                      }
                  );
              }
          }
      };
    };

    return {
      createOptions: createOptions
    };
});
