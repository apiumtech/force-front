define([
    'jquery',
    'config'
], function ($, config) {
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
                var params = {
                    url: config.api.literalsObject,
                    data: JSON.stringify({
                        credentials: {
                            keys: {key: '', user: '', userkey: '', localTime: ''}
                        },
                        language: 'en',
                        idImplementation: '-1'
                    }),
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json'
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
    };
});