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
                            "id": 1,
                            "name": "A",
                            "idParent": -1
                        },
                        {
                            "id": 2,
                            "name": "B",
                            "idParent": -1
                        },
                        {
                            "id": 3,
                            "name": "C",
                            "idParent": -1
                        },
                        {
                            "id": 4,
                            "name": "D",
                            "idParent": -1
                        },
                        {
                            "id": 5,
                            "name": "Child of A",
                            "idParent": 1
                        },
                        {
                            "id": 6,
                            "name": "Child of B 1",
                            "idParent": 2
                        },
                        {
                            "id": 7,
                            "name": "Child of B 2",
                            "idParent": 2
                        },
                        {
                            "id": 8,
                            "name": "Child of D 1",
                            "idParent": 4
                        },
                        {
                            "id": 9,
                            "name": "Child of D 2",
                            "idParent": 4
                        },
                        {
                            "id": 10,
                            "name": "Child of Child of D 2",
                            "idParent": 9
                        },
                        {
                            "id": 11,
                            "name": "Child of Child of Child of D 2",
                            "idParent": 10
                        }];

                    var expected = [
                        {
                            "id": 1,
                            "name": 'A',
                            "idParent": -1,
                            "children": [
                                {
                                    "id": 5,
                                    "name": "Child of A",
                                    "idParent": 1
                                }
                            ]
                        },
                        {
                            "id": 2,
                            "name": "B",
                            "idParent": -1,
                            children: [
                                {
                                    "id": 6,
                                    "name": "Child of B 1",
                                    "idParent": 2
                                },
                                {
                                    "id": 7,
                                    "name": "Child of B 2",
                                    "idParent": 2
                                }
                            ]
                        },
                        {
                            "id": 3,
                            "name": "C",
                            "idParent": -1
                        },
                        {
                            "id": 4,
                            "name": "D",
                            "idParent": -1,
                            children: [
                                {
                                    "id": 8,
                                    "name": "Child of D 1",
                                    "idParent": 4
                                },
                                {
                                    "id": 9,
                                    "name": "Child of D 2",
                                    "idParent": 4,
                                    children: [
                                        {
                                            "id": 10,
                                            "name": "Child of Child of D 2",
                                            "idParent": 9,
                                            children: [
                                                {
                                                    "id": 11,
                                                    "name": "Child of Child of Child of D 2",
                                                    "idParent": 10
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ];
                    spyOn(sut.arrayHelper, 'makeTree').and.callThrough();
                    var output = sut.decorateServerData(input);
                    expect(sut.arrayHelper.makeTree).toHaveBeenCalledWith(input, 'idParent', 'id', 'children', -1);
                    expect(output).toEqual(expected);
                });
            });
        });


    });
});