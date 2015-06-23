/**
 * Created by Justin on 3/17/2015.
 */
define([
    'app'
], function (app) {

    function TranslatorService(translator) {
        this.translator = translator || i18n;
    }

    TranslatorService.prototype.translate = function (key, options) {
        return this.translator.t(key, options);
    };

    TranslatorService.newInstance = function () {
        return new TranslatorService(i18n);
    };

    app.di.register('translatorService').as(TranslatorService).asSingleton();

    return TranslatorService;
});