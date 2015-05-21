/**
 * Created by Justin on 3/17/2015.
 */
define([
    'i18next'
], function (i18n) {

    console.log(i18n);

    function TranslatorService(translator) {
        this.translator = translator;
    }

    TranslatorService.prototype.translate = function (key, options) {
        return this.translator.t(key, options);
    };

    TranslatorService.newInstance = function () {
        return new TranslatorService(i18n);
    };

    return TranslatorService;
});