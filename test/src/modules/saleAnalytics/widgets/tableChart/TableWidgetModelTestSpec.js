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
            it('should call _baseReload', function () {
                spyOn(sut, '_baseReload');
                sut._reload();
                expect(sut._baseReload).toHaveBeenCalled();
            });
        });

        describe('parseFlatStructure', function () {
            describe('data is empty', function () {
                it("should return empty", function () {
                    var emptyData = [];

                    expect(function () {
                        sut.parseFlatStructure(emptyData);
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
                };

                var output = sut.parseFlatStructure(input);
                expect(output).toEqual(expected);
            });
        });

        describe("parseData", function () {
            it("should call userExtraFieldsDataParser when widget option is set to 'userExtraFieldsDecorator'", function () {
                spyOn(sut, "userExtraFieldsDataParser");
                sut.parseData("some data", "userExtraFieldsDecorator");
                expect(sut.userExtraFieldsDataParser).toHaveBeenCalledWith("some data");
            });

            it("should call parseFlatStructure when widget option is not set", function () {
                spyOn(sut, "parseFlatStructure");
                sut.parseData("more data");
                expect(sut.parseFlatStructure).toHaveBeenCalledWith("more data");
            });
        });

        describe("userExtraFieldsDataParser", function () {
            var rawData, columns, rows;
            beforeEach(function () {
                columns = ["Id", "Name", "Z_facebug", "Z_hasFB"];
                rows = [
                    [109,"Bruno Ràfols","este es mi facebuk","True"],
                    [238,"Cristian Oyarzo","","False"]
                ];
                rawData = [
                    {
                        "Id": 109,
                        "Name": "Bruno Ràfols",
                        "extrafields": [
                            {
                                "Name": "Z_facebug",
                                "Value": "este es mi facebuk"
                            },
                            {
                                "Name": "Z_hasFB",
                                "Value": "True"
                            }
                        ]
                    },
                    {
                        "Id": 238,
                        "Name": "Cristian Oyarzo",
                        "extrafields": [
                            {
                                "Name": "Z_facebug",
                                "Value": ""
                            },
                            {
                                "Name": "Z_hasFB",
                                "Value": "False"
                            }
                        ]
                    }
                ];
            });
            it('should extract columns from the data', function () {
                expect(sut.userExtraFieldsDataParser(rawData).columns).toEqual(columns);
            });
            it('should extract rows from the data', function () {
                expect(sut.userExtraFieldsDataParser(rawData).data).toEqual(rows);
            });
        });
    });

});