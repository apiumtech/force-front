define([
    'jquery',
    'config'
], function ($, config) {
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
                    // TODO: pick the correct params.data values
                    var params = {
                        url: config.api.literalValueDictionary,
                        data: {
                            language: 'es',
                            implementationCode: '-1',
                            platform: '108'
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