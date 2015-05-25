/**
 * Created by justin on 12/30/14.
 */
define([
    'modules/saleAnalytics/widgets/tableChart/TableWidgetModel'
], function (TableWidgetModel) {
    'use strict';
    describe("TableWidgetModel", function () {

        var sut, ajaxService;

        beforeEach(function () {
            ajaxService = {
                rawAjaxRequest: function () {
                }
            };
            sut = TableWidgetModel.newInstance(ajaxService);
        });

        describe('_reload', function () {
            it('should call decoration method to decorate data from server', function (done) {
                spyOn(sut, 'decorateServerData');
                spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                sut.fetchPoint = "fake_url";
                sut._reload().then(function () {
                    expect(sut.decorateServerData).toHaveBeenCalled();
                    done();
                });
            });
        });

        describe('decorateServerData', function () {
            describe('data is empty', function () {
                it("should return empty", function () {
                    var emptyData = [];

                    expect(function () {
                        sut.decorateServerData(emptyData);
                    }).toThrow(new Error("No data received from server"));
                });
            });

            it("should return correct output", function () {
                var input = [
                    {
                        "Id": 1,
                        "IdFm": 1,
                        "Name": "1_string",
                        "PhotoUrl": "1_string_2",
                        "ActivityIndex": 1,
                        "Visits": 1,
                        "Activities": 1,
                        "Activity": 1,
                        "PhoneCallsTime": 1,
                        "Emails": 1,
                        "Orders": 1,
                        "Quotes": 1
                    },
                    {
                        "Id": 2,
                        "IdFm": 1,
                        "Name": "1_string",
                        "PhotoUrl": "1_string_2",
                        "ActivityIndex": 1,
                        "Visits": 1,
                        "Activities": 1,
                        "Activity": 1,
                        "PhoneCallsTime": 1,
                        "Emails": 1,
                        "Orders": 1,
                        "Quotes": 1
                    },
                    {
                        "Id": 3,
                        "IdFm": 1,
                        "Name": "1_string",
                        "PhotoUrl": "1_string_2",
                        "ActivityIndex": 1,
                        "Visits": 1,
                        "Activities": 1,
                        "Activity": 1,
                        "PhoneCallsTime": 1,
                        "Emails": 1,
                        "Orders": 1,
                        "Quotes": 1
                    },
                    {
                        "Id": 4,
                        "IdFm": 1,
                        "Name": "1_string",
                        "PhotoUrl": "1_string_2",
                        "ActivityIndex": 1,
                        "Visits": 1,
                        "Activities": 1,
                        "Activity": 1,
                        "PhoneCallsTime": 1,
                        "Emails": 1,
                        "Orders": 1,
                        "Quotes": 1
                    },
                    {
                        "Id": 5,
                        "IdFm": 1,
                        "Name": "1_string",
                        "PhotoUrl": "1_string_2",
                        "ActivityIndex": 1,
                        "Visits": 1,
                        "Activities": 1,
                        "Activity": 1,
                        "PhoneCallsTime": 1,
                        "Emails": 1,
                        "Orders": 1,
                        "Quotes": 1
                    }
                ];

                var expected = {
                    data: {
                        params: {
                            columns: [
                                "Id", "IdFm", "Name", "PhotoUrl", "ActivityIndex", "Visits", "Activities", "Activity", "PhoneCallsTime", "Emails", "Orders", "Quotes"
                            ],
                            data: [
                                [1, 1, "1_string", "1_string_2", 1, 1, 1, 1, 1, 1, 1, 1],
                                [2, 1, "1_string", "1_string_2", 1, 1, 1, 1, 1, 1, 1, 1],
                                [3, 1, "1_string", "1_string_2", 1, 1, 1, 1, 1, 1, 1, 1],
                                [4, 1, "1_string", "1_string_2", 1, 1, 1, 1, 1, 1, 1, 1],
                                [5, 1, "1_string", "1_string_2", 1, 1, 1, 1, 1, 1, 1, 1]
                            ]
                        }
                    }
                };

                var output = sut.decorateServerData(input);
                expect(output).toEqual(expected);
            });
        });
    });

});