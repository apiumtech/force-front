/**
 * Created by Justin on 3/16/2015.
 */
describe("DateTimeDecoratorService", function () {
    var DateTimeDecoratorService = app.getService("services/DateTimeDecoratorService");
    var sut, translator;

    beforeEach(function () {
        translator = {
            translate: function () {
            }
        };
        sut = DateTimeDecoratorService.newInstance(translator).getOrElse(throwInstantiateException(DateTimeDecoratorService));
    });

    describe("getFormattedDateDistance", function () {
        [{
            dateFar: new Date(2015, 2, 16),
            dateClose: new Date(2015, 2, 16),
            expected: "DateTime.Today",
            params: null
        }, {
            dateFar: new Date(2015, 2, 15),
            dateClose: new Date(2015, 2, 16),
            expected: "DateTime.Yesterday",
            params: null
        }, {
            dateFar: new Date(2015, 2, 14),
            dateClose: new Date(2015, 2, 16),
            expected: "DateTime.DaysAgo",
            params: {xx: 2}
        }, {
            dateFar: new Date(2015, 2, 10),
            dateClose: new Date(2015, 2, 16),
            expected: "DateTime.DaysAgo",
            params: {xx: 6}
        }, {
            dateFar: new Date(2015, 2, 8),
            dateClose: new Date(2015, 2, 16),
            expected: "DateTime.LastWeek",
            params: null
        }, {
            dateFar: new Date(2015, 2, 3),
            dateClose: new Date(2015, 2, 16),
            expected: "DateTime.LastWeek",
            params: null
        }, {
            dateFar: new Date(2015, 2, 1),
            dateClose: new Date(2015, 2, 16),
            expected: "DateTime.WeeksAgo",
            params: {xx: 2}
        }, {
            dateFar: new Date(2015, 1, 1),
            dateClose: new Date(2015, 2, 16),
            expected: "DateTime.LastMonth",
            params: null
        }, {
            dateFar: new Date(2015, 0, 1),
            dateClose: new Date(2015, 2, 16),
            expected: "DateTime.MonthsAgo",
            params: {xx: 2}
        }, {
            dateFar: new Date(2014, 11, 1),
            dateClose: new Date(2015, 2, 16),
            expected: "DateTime.MonthsAgo",
            params: {xx: 3}
        }, {
            dateFar: new Date(2014, 2, 1),
            dateClose: new Date(2015, 2, 16),
            expected: "DateTime.LastYear",
            params: null
        }, {
            dateFar: new Date(2013, 2, 1),
            dateClose: new Date(2015, 2, 16),
            expected: "DateTime.YearsAgo",
            params: {xx: 2}
        }].forEach(function (testCase) {
                var momentEarlier = testCase.dateFar;
                var dateClose = testCase.dateClose;
                var expected = testCase.expected;
                it("should return correct result", function () {
                    spyOn(translator, 'translate');
                    sut.getFormattedDateDistance(momentEarlier, dateClose);
                    if (testCase.params)
                        expect(sut.translator.translate).toHaveBeenCalledWith(expected, testCase.params);
                    else
                        expect(sut.translator.translate).toHaveBeenCalledWith(expected);
                });
            });
    });
});