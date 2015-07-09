define([
    'modules/saleAnalytics/reports/allReport/AllReportModel'
], function (AllReportModel) {
    'use strict';

    describe('AllReportModel', function () {

        var sut, ajaxService;

        beforeEach(function () {
            ajaxService = {
                rawAjaxRequest: function () {
                }
            };
            sut = new AllReportModel(ajaxService);
        });

        describe('_reload', function () {
            it('should call decoration method to decorate data from server', function (done) {
                spyOn(sut, 'decorateServerData');
                spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                sut._reload().then(function () {
                    expect(sut.decorateServerData).toHaveBeenCalled();
                    done();
                });
            });

        });

        describe('decorateServerData', function () {
            describe('data is empty', function () {
                it("should return data empty error", function () {
                    var data = [];
                    expect(function () {
                        sut.decorateServerData(data);
                    }).toThrow(new Error("No data received from server"));
                });
            });

            describe('has value in server response', function () {
                it("should decorate the data into tree", function () {
                    var input = [
                        {
                            "Id": 1,
                            "Name": "A",
                            "IdParent": -1
                        },
                        {
                            "Id": 2,
                            "Name": "B",
                            "IdParent": -1
                        },
                        {
                            "Id": 3,
                            "Name": "C",
                            "IdParent": -1
                        },
                        {
                            "Id": 4,
                            "Name": "D",
                            "IdParent": -1
                        },
                        {
                            "Id": 5,
                            "Name": "Child of A",
                            "IdParent": 1
                        },
                        {
                            "Id": 6,
                            "Name": "Child of B 1",
                            "IdParent": 2
                        },
                        {
                            "Id": 7,
                            "Name": "Child of B 2",
                            "IdParent": 2
                        },
                        {
                            "Id": 8,
                            "Name": "Child of D 1",
                            "IdParent": 4
                        },
                        {
                            "Id": 9,
                            "Name": "Child of D 2",
                            "IdParent": 4
                        },
                        {
                            "Id": 10,
                            "Name": "Child of Child of D 2",
                            "IdParent": 9
                        },
                        {
                            "Id": 11,
                            "Name": "Child of Child of Child of D 2",
                            "IdParent": 10
                        }];

                    var expected = [
                        {
                            "Id": 1,
                            "Name": 'A',
                            "IdParent": -1,
                            "children": [
                                {
                                    "Id": 5,
                                    "Name": "Child of A",
                                    "IdParent": 1
                                }
                            ]
                        },
                        {
                            "Id": 2,
                            "Name": "B",
                            "IdParent": -1,
                            children: [
                                {
                                    "Id": 6,
                                    "Name": "Child of B 1",
                                    "IdParent": 2
                                },
                                {
                                    "Id": 7,
                                    "Name": "Child of B 2",
                                    "IdParent": 2
                                }
                            ]
                        },
                        {
                            "Id": 3,
                            "Name": "C",
                            "IdParent": -1
                        },
                        {
                            "Id": 4,
                            "Name": "D",
                            "IdParent": -1,
                            children: [
                                {
                                    "Id": 8,
                                    "Name": "Child of D 1",
                                    "IdParent": 4
                                },
                                {
                                    "Id": 9,
                                    "Name": "Child of D 2",
                                    "IdParent": 4,
                                    children: [
                                        {
                                            "Id": 10,
                                            "Name": "Child of Child of D 2",
                                            "IdParent": 9,
                                            children: [
                                                {
                                                    "Id": 11,
                                                    "Name": "Child of Child of Child of D 2",
                                                    "IdParent": 10
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ];
                    spyOn(sut.arrayHelper, 'makeTree').and.callThrough();
                    var cqrsWrapperData = {data:input};
                    var output = sut.decorateServerData(cqrsWrapperData);
                    expect(sut.arrayHelper.makeTree).toHaveBeenCalledWith(input, 'IdParent', 'Id', 'children', -1);
                    expect(output).toEqual(expected);
                });
            });
        });


    });
});