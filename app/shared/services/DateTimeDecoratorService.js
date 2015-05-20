/**
 * Created by Justin on 3/16/2015.
 */
define([
    'moment',
    'shared/services/TranslatorService'
], function (moment, Translator) {

    function DateTimeDecoratorService(translator) {
        this.translator = translator;
    }

    DateTimeDecoratorService.prototype.getFormattedDateDistance = function (earlier, dateClose) {
        var dateFar = moment(earlier);
        var dateClose = moment(dateClose);

        var different = dateClose.diff(dateFar, 'days');
        if (different == 0)
            return this.translator.translate('DateTime.Today');
        else if (different == 1)
            return this.translator.translate('DateTime.Yesterday');
        else if (different <= 7)
            return this.translator.translate('DateTime.DaysAgo', {xx: different});
        else if (different <= 14)
            return this.translator.translate("DateTime.LastWeek");

        different = dateClose.diff(dateFar, 'weeks');
        if (different < 4)
            return this.translator.translate("DateTime.WeeksAgo", {xx: different});

        different = dateClose.diff(dateFar, 'months');
        if (different == 1)
            return this.translator.translate("DateTime.LastMonth");
        else if (different < 12)
            return this.translator.translate("DateTime.MonthsAgo", {xx: different});

        different = dateClose.diff(dateFar, 'years');
        if (different == 1)
            return this.translator.translate("DateTime.LastYear");
        else
            return this.translator.translate("DateTime.YearsAgo", {xx: different});
    };


    DateTimeDecoratorService.newInstance = function (translator) {
        translator = translator || Translator.newInstance();
        return new DateTimeDecoratorService(translator);
    };

    return DateTimeDecoratorService;
});