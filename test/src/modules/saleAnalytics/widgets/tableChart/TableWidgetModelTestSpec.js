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
