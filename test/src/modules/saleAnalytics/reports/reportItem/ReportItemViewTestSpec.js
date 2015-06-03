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

            describe('fn.send', function () {
                it("should call getParameters function", function () {
                    var response = {someFakeParameters: 123};
                    sut.event = {
                        getParameters: function () {
                        }
                    };
                    spyOn(sut.event, 'getParameters').and.callFake(function (reportId, callback) {
                        callback(response);
                    });
                    sinon.stub(sut, 'onParameterLoadedForSend');
                    sut.fn.send();
                    expect(sut.event.getParameters).toHaveBeenCalledWith(123, jasmine.any(Function));
                    expect(sut.onParameterLoadedForSend).toHaveBeenCalledWith(response);
                });
            });

            describe('fn.download', function () {
                it("should call getParameters function", function () {
                    var response = {someFakeParameters: 123};
                    sut.event = {
                        getParameters: function () {
                        }
                    };
                    spyOn(sut.event, 'getParameters').and.callFake(function (reportId, callback) {
                        callback(response);
                    });
                    sinon.stub(sut, 'onParameterLoadedForDownload');
                    sut.fn.download();
                    expect(sut.event.getParameters).toHaveBeenCalledWith(123, jasmine.any(Function));
                    expect(sut.onParameterLoadedForDownload).toHaveBeenCalledWith(response);
                })
            });

            describe('fn.preview', function () {
                it("should call getParameters function", function () {
                    var response = {someFakeParameters: 123};
                    sut.event = {
                        getParameters: function () {
                        }
                    };
                    spyOn(sut.event, 'getParameters').and.callFake(function (reportId, callback) {
                        callback(response);
                    });
                    sinon.stub(sut, 'onParameterLoadedForPreview');
                    sut.fn.preview();
                    expect(sut.event.getParameters).toHaveBeenCalledWith(123, jasmine.any(Function));
                    expect(sut.onParameterLoadedForPreview).toHaveBeenCalledWith(response);
                })
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

        describe('onSaveNameError', function () {

        });

        describe('onSaveDescriptionError', function () {

        });

        describe('onParameterLoadedForSend', function () {
            beforeEach(function () {
                sut.$scope.report = {
                    id: 123,
                    name: "123456",
                    description: "description_blahblah"
                };
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
                sut.onParameterLoadedForSend(data);
                expect(sut.$scope.report.paramConfig).toEqual(data.params);
            });

            describe("there is no params passed", function () {
                it("should call getReportURL function", function () {
                    var response = {URL: 'http://this.is/the/url'};
                    sut.event = {
                        getReportURL: function () {
                        }
                    };
                    spyOn(sut.event, 'getReportURL').and.callFake(function (reportId, callback) {
                        callback(response);
                    });
                    sinon.stub(sut, 'onReportURLLoadedForSend');

                    var data = {
                        params: []
                    };
                    sut.onParameterLoadedForSend(data);
                    expect(sut.event.getReportURL).toHaveBeenCalledWith(123, jasmine.any(Function));
                    expect(sut.onReportURLLoadedForSend).toHaveBeenCalledWith(response);
                });
            });

        });

        describe('onParameterLoadedForDownload', function () {
            beforeEach(function () {
                sut.$scope.report = {
                    id: 123,
                    name: "123456",
                    description: "description_blahblah"
                };
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
                sut.onParameterLoadedForDownload(data);
                expect(sut.$scope.report.paramConfig).toEqual(data.params);
            });

            describe("there is no params passed", function () {
                it("should call getReportURL function", function () {
                    var response = {URL: 'http://this.is/the/url'};
                    sut.event = {
                        getReportURL: function () {
                        }
                    };
                    spyOn(sut.event, 'getReportURL').and.callFake(function (reportId, callback) {
                        callback(response);
                    });
                    sinon.stub(sut, 'onReportURLLoadedForDownload');

                    var data = {
                        params: []
                    };
                    sut.onParameterLoadedForDownload(data);
                    expect(sut.event.getReportURL).toHaveBeenCalledWith(123, jasmine.any(Function));
                    expect(sut.onReportURLLoadedForDownload).toHaveBeenCalledWith(response);
                });
            });

        });

        describe('onParameterLoadedForPreview', function () {
            var promise;
            beforeEach(function () {
                sut.$scope.report = {
                    id: 123,
                    name: "123456",
                    description: "description_blahblah"
                };

                promise = {
                    "obj" : 1
                };

                var paramDialog = {
                    result: {
                        then: function(b){
                            b(promise);
                        }
                    }
                };

                scope.$modal.open.returns(paramDialog);
            });
            it("should set the passed params to report's params", function () {
                var data = {
                    params: []
                };
                sut.onParameterLoadedForPreview(data);
                expect(sut.$scope.report.paramConfig).toEqual(data.params);
            });

            describe("there is no params passed", function () {
                it("should open preview", function () {
                    var data = {
                        params: []
                    };
                    sinon.stub(sut.fn, 'openPreviewDialog');
                    sut.onParameterLoadedForPreview(data);
                    expect(sut.fn.openPreviewDialog).toHaveBeenCalled();
                });
            });

            describe("there are params passed", function () {
                var data = {
                    params: [
                        'a', 'b', 'c'
                    ]
                };
                it("should open params dialog", function () {
                    sinon.stub(sut.fn, 'openParamsDialog');
                    sut.onParameterLoadedForPreview(data);
                    expect(sut.fn.openParamsDialog).toHaveBeenCalled();
                });

                it("saving params from param dialog should call onParameterSetForPreview with the right param(s)", function () {
                    spyOn(sut.fn, 'openParamsDialog').and.callFake(function(b){
                        b(promise);
                    });
                    sinon.stub(sut, 'onParameterSetForPreview');
                    sut.onParameterLoadedForPreview(data);
                    expect(sut.onParameterSetForPreview).toHaveBeenCalledWith(promise);
                });

            });

        });

    });
});