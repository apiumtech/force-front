define([
    'modules/saleAnalytics/reports/reportItem/ReportItemView',
    'modules/saleAnalytics/reports/reportItem/ReportItemPresenter',
    'modules/saleAnalytics/reports/ReportEventBus'
], function (ReportItemView, ReportItemPresenter, ReportEventBus) {
    'use strict';

    describe('ReportItemView', function () {
        describe("construct", function () {
            it("should call configureEvents", function () {
                spyOn(ReportItemView.prototype, 'configureEvents').and.callThrough();
                var scope = {},
                    element = {},
                    presenter = mock(ReportItemPresenter);
                new ReportItemView(scope, element, presenter);
                expect(ReportItemView.prototype.configureEvents).toHaveBeenCalled();
            })
        });

        var sut, scope, element, presenter, eventBus;

        // init params
        beforeEach(function () {
            inject(function ($rootScope) {
                scope = $rootScope.$new();
                scope.$modal = {
                    open: function () {
                    }
                };
                sinon.stub(scope.$modal, 'open');
            });
            element = {};
            presenter = mock(ReportItemPresenter);
            eventBus = mock(ReportEventBus);
            sut = new ReportItemView(scope, element, presenter, eventBus);
        });

        describe('configureEvents', function () {

            beforeEach(function () {
                sut.$scope.report = {
                    id: 123,
                    name: "123456",
                    description: "description_blahblah"
                };
            });

            describe('fn.startEditingName', function () {
                beforeEach(function () {
                    sut.fn.startEditingName();
                });
                it("should save the original name to backup", function () {
                    expect(sut.originalName).toEqual("123456");
                });

                it("should turn on editing name", function () {
                    expect(sut.editingName).toEqual(true);
                });
            });

            describe('fn.saveName', function () {

                it("should show error if the name is empty", function () {
                    sut.report.name = "";

                    sut.fn.saveName();
                    expect(sut.nameError).toEqual("Name cannot be empty");
                });

                beforeEach(function () {
                    sut.event = {
                        onSaveName: jasmine.createSpy()
                    };
                });

                it("should remove error if the name is not empty", function () {
                    sut.fn.saveName();
                    expect(sut.nameError).toEqual("");
                });

                it("should fire event onSaveName", function () {
                    sut.fn.saveName();
                    expect(sut.event.onSaveName).toHaveBeenCalledWith(sut.report.id, sut.report.name);
                });

                it("should show error if the name is empty", function () {
                    sut.report.name = "";

                    sut.fn.saveName();
                    expect(sut.nameError).toEqual("Name cannot be empty");
                });
            });

            describe('fn.cancelEditingName', function () {


                beforeEach(function () {
                    sut.originalName = 'backed-up-name';
                    sut.$scope.report.name = "new_name_entered";
                    sut.fn.cancelEditingName();
                });

                it("should remove error", function () {
                    sut.fn.cancelEditingName();
                    expect(sut.nameError).toEqual("");
                });

                it("should reverse the original name", function () {
                    expect(sut.report.name).toEqual('backed-up-name');
                });

                it("should turn off editing name", function () {
                    expect(sut.editingName).toEqual(false);
                });
            });

            describe('fn.startEditingDescription', function () {

                beforeEach(function () {
                    sut.fn.startEditingDescription();
                });
                it("should save the original desc to backup", function () {
                    expect(sut.originalDescription).toEqual("description_blahblah");
                });

                it("should turn on editing description", function () {
                    expect(sut.editingDescription).toEqual(true);
                });
            });

            describe('fn.saveDescription', function () {
                it("should show error if the description is empty", function () {
                    sut.report.description = "";

                    sut.fn.saveDescription();
                    expect(sut.descriptionError).toEqual("Description cannot be empty");
                });
                beforeEach(function () {
                    sut.event = {
                        onSaveDescription: jasmine.createSpy()
                    };
                    sut.fn.saveDescription();
                });

                it("should remove error if the description is not empty", function () {
                    sut.fn.saveDescription();
                    expect(sut.descriptionError).toEqual("");
                });

                it("should fire event onSaveDescription", function () {
                    expect(sut.event.onSaveDescription).toHaveBeenCalledWith(sut.report.id, sut.report.description);
                });
            });

            describe('fn.cancelEditingDescription', function () {
                beforeEach(function () {
                    sut.originalDescription = 'backed-up-name';
                    sut.$scope.report.description = "new_name_entered";
                    sut.fn.cancelEditingDescription();
                });

                it("should remove error", function () {
                    sut.fn.cancelEditingDescription();
                    expect(sut.descriptionError).toEqual("");
                });

                it("should reverse the original name", function () {
                    expect(sut.report.description).toEqual('backed-up-name');
                });

                it("should turn off editing desc", function () {
                    expect(sut.editingDescription).toEqual(false);
                });
            });

            describe('fn.saveName', function () {
                it("should assign new value to selectedReportType", function () {
                    sut.$scope.report.reportType = ['PDF', 'DOC', 'XSL'];
                    sut.selectedReportType = 'PDF';
                    var newValue = 'DOC';
                    sut.fn.changeReportType(newValue);
                    expect(sut.selectedReportType).toEqual(newValue);
                });
            });

            describe('fn.toggleFavouriteReport', function () {

                beforeEach(function () {
                    sut.$scope.report.favourite = false;
                    sut.event = {
                        toggleFavouriteReport: sinon.spy()
                    };
                    sut.fn.toggleFavouriteReport();
                });

                it("should set toggle the state of report.favourite", function () {
                    expect(sut.$scope.report.favourite).toBeTruthy();
                });

                it("should call event.toggleFavouriteReport function", function () {
                    expect(sut.event.toggleFavouriteReport).toHaveBeenCalledWith(123);
                });

            });

            describe('item actions fn: preview, send, download', function () {
                beforeEach(function () {
                    sut.event = {
                        getReportURL: function () {
                        },
                        getParameterConfiguration: function () {
                        }
                    };
                });

                [
                    {
                        method: 'send',
                        haveNoParameterMethod: 'sendReport'
                    },
                    {
                        method: 'download',
                        haveNoParameterMethod: 'downloadReport'
                    },
                    {
                        method: 'preview',
                        haveNoParameterMethod: 'previewReport'
                    }
                ].forEach(function (test) {
                        describe('fn.' + test.method, function () {
                            it("should set currentActionForEmptyParameters to ", function () {
                                spyOn(sut, test.haveNoParameterMethod);
                                sut.fn[test.method]();
                                sut.currentActionForEmptyOrAssignedParameters();
                                expect(sut[test.haveNoParameterMethod]).toHaveBeenCalled();
                            });

                            it("should set currentActionForParameters to ", function () {
                                var params = {
                                    "p1": "b"
                                };
                                spyOn(sut, 'configureParameters');
                                sut.fn[test.method]();
                                sut.currentActionForParameters(params);
                                expect(sut.configureParameters).toHaveBeenCalledWith(params);
                            });

                            it("should call getParameterConfiguration", function () {
                                spyOn(sut, 'getParameterConfiguration');
                                sut.fn[test.method]();
                                expect(sut.getParameterConfiguration).toHaveBeenCalled();
                            });
                        });
                    });
            });

        });

        describe('onSaveNameSuccess', function () {
            var serverResponse = {
                name: "new_name_here",
                id: 123
            };
            beforeEach(function () {
                sut.$scope.report = {
                    id: 123,
                    name: "123456",
                    description: "description_blahblah"
                };
                sut.editingName = true;
            });
            it("should update the name to the report", function () {

                sut.onSaveNameSuccess(serverResponse);
                expect(sut.report.name).toEqual('new_name_here');
            });

            it("should turn off editing name", function () {
                sut.onSaveNameSuccess(serverResponse);
                expect(sut.editingName).toEqual(false);
            });
        });

        describe('onSaveDescriptionSuccess', function () {
            var serverResponse = {
                description: "new_description_here",
                id: 123
            };
            beforeEach(function () {
                sut.$scope.report = {
                    id: 123,
                    name: "123456",
                    description: "description_blahblah"
                };
                sut.editingDescription = true;
            });
            it("should update the description to the report", function () {

                sut.onSaveDescriptionSuccess(serverResponse);
                expect(sut.report.description).toEqual('new_description_here');
            });

            it("should turn off editing description", function () {
                sut.onSaveDescriptionSuccess(serverResponse);
                expect(sut.editingDescription).toEqual(false);
            });
        });

        describe('getParameterConfiguration', function () {
            it("should call view.event.getParameterConfiguration function and return the result to onParameterConfigurationLoaded", function () {
                sut.$scope.report = {
                    id: 123,
                    name: "123456",
                    description: "description_blahblah"
                };
                var response = {someFakeParameters: 123};
                sut.event = {
                    getParameterConfiguration: function () {
                    }
                };
                spyOn(sut.event, 'getParameterConfiguration').and.callFake(function (reportId, callback) {
                    callback(response);
                });
                sinon.stub(sut, 'onParameterConfigurationLoaded');
                sut.getParameterConfiguration();
                expect(sut.event.getParameterConfiguration).toHaveBeenCalledWith(123, jasmine.any(Function));
                expect(sut.onParameterConfigurationLoaded).toHaveBeenCalledWith(response);
            });
        });

        describe('onParameterConfigurationLoaded', function () {
            beforeEach(function () {
                sut.$scope.report = {
                    id: 123,
                    name: "123456",
                    description: "description_blahblah"
                };
                sut.currentActionForEmptyOrAssignedParameters = sinon.stub();
                sut.currentActionForParameters = sinon.stub();
            });

            it("should set the passed params to report's params", function () {
                var data = {
                    params: [
                        {
                            p1: 1234
                        },
                        {
                            p2: "abcd"
                        }
                    ]
                };
                sut.onParameterConfigurationLoaded(data);
                expect(sut.$scope.report.parameterConfigurations).toEqual(data.params);
            });

            describe("there is no params passed", function () {
                it("should call currentActionForEmptyParameters function", function () {
                    var data = {
                        params: []
                    };
                    sut.onParameterConfigurationLoaded(data);
                    expect(sut.currentActionForEmptyOrAssignedParameters).toHaveBeenCalled();
                });
            });

            describe("there are params passed", function () {
                it("should call currentActionForParameters function", function () {
                    var data = {
                        params: [
                            {'p1': 123456}
                        ]
                    };
                    sut.onParameterConfigurationLoaded(data);
                    expect(sut.currentActionForParameters).toHaveBeenCalledWith(data.params);
                });
            });

        });

        describe('configureParameters', function () {
            var params = {
                this: 'params'
            };
            var promise = {
                "obj": 1
            };
            beforeEach(function () {
                scope.report = {
                    id: 123,
                    name: "the report"
                };
                var paramDialog = {
                    result: {
                        then: function (b) {
                            b(promise);
                        }
                    }
                };
                scope.$modal.open.returns(paramDialog);
                spyOn(sut, 'openParamsDialog').and.callFake(function(b){
                    b(promise);
                });
                spyOn(sut, 'onParameterSet');
                sut.configureParameters(params);
            });

            it("should assign report.parameterConfigurations", function () {
                expect(sut.report.parameterConfigurations).toEqual(params);
            });

            it("should call openParamsDialog function", function () {
                expect(sut.openParamsDialog).toHaveBeenCalledWith(jasmine.any(Function));
            });

            it("should call openParamsDialog function", function () {
                expect(sut.onParameterSet).toHaveBeenCalledWith(promise);
            });

        });

        describe('sendReport', function () {
            it("should call getReportURL function", function () {
                var response = {URL: 'http://this.is/the/url'};
                sut.event = {
                    getReportURL: function () {
                    }
                };
                spyOn(sut.event, 'getReportURL').and.callFake(function (report, callback) {
                    callback(response);
                });
                sinon.stub(sut, 'onReportURLLoadedForSend');
                sut.sendReport();
                expect(sut.event.getReportURL).toHaveBeenCalledWith(sut.report, jasmine.any(Function));
                expect(sut.onReportURLLoadedForSend).toHaveBeenCalledWith(response);
            });
        });

        describe('downloadReport', function () {
            it("should call getReportURL function", function () {
                var response = {URL: 'http://this.is/the/url'};
                sut.event = {
                    getReportURL: function () {
                    }
                };
                spyOn(sut.event, 'getReportURL').and.callFake(function (report, callback) {
                    callback(response);
                });
                sinon.stub(sut, 'onReportURLLoadedForDownload');
                sut.downloadReport();
                expect(sut.event.getReportURL).toHaveBeenCalledWith(sut.report, jasmine.any(Function));
                expect(sut.onReportURLLoadedForDownload).toHaveBeenCalledWith(response);
            });
        });

    });
});