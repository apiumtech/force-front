/**
 * Created by Justin on 3/17/2015.
 */
app.registerService(function (container) {

    function TranslatorService(translator) {
        this.translator = translator;
    }

    TranslatorService.prototype.translate = function (key, options) {
        return this.translator.t(key, options);
    };

    TranslatorService.newInstance = function () {
        return Some(new TranslatorService(i18n));
    };

    return TranslatorService;
});