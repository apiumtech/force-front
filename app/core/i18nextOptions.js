define([
    'jquery',
    'config'
], function ($, config) {
    // FIXME: (joanllenas) for some reason prod's customLoad is being called three times. This is a hack to avoid it meanwhile.
    var isFetching = false;
    return {
        dev: {
            lng: 'en',
            useCookie: false,
            useLocalStorage: false,
            fallbackLng: 'en',
            resGetPath: '/api/translations/__lng__'
        },
        prod: {
            useCookie: false,
            useLocalStorage: false,
            customLoad: function (lng, ns, options, loadComplete) {
                if (!isFetching) {
                    isFetching = true;
                    var params = {
                        url: config.api.literalValueDictionary,
                        data: {
                            language: 'es',
                            implementationCode: '-1',
                            deviceType: '108'
                        },
                        type: 'GET',
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        dataType: 'json'
                    };
                    $.ajax(params).then(
                        function (data) {

                            loadComplete(null, data);
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