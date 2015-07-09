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
                    Id: 123,
                    Name: "123456",
                    Description: "description_blahblah"
                };
            });

            describe('fn.startEditingName', function () {
                describe('fireOpenReport is false', function () {
                    beforeEach(function () {
                        sut.fireOpenReport = false;
                        sut.fn.startEditingName();
                    });
                    it("should save the original name to backup", function () {
                        expect(sut.originalName).toEqual("123456");
                    });
                    it("should turn on editing name", function () {
                        expect(sut.editingName).toEqual(true);
                    });
                });
                describe('fireOpenFolder is true', function () {
                    it("should not save original name nor turn on editing name", function () {
                        sut.originalName = "some old name";
                        sut.fireOpenFolder = true;
                        sut.fn.startEditingName();
                        expect(sut.originalName).not.toEqual("123456");
                        expect(sut.originalName).toEqual("some old name");
                        expect(sut.editingName).not.toEqual(true);
                    });
                });
            });

            describe('fn.saveName', function () {

                it("should show error if the name is empty", function () {
                    sut.report.Name = "";

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
                    expect(sut.event.onSaveName).toHaveBeenCalledWith(sut.report);
                });

                it("should show error if the name is empty", function () {
                    sut.report.Name = "";

                    sut.fn.saveName();
                    expect(sut.nameError).toEqual("Name cannot be empty");
                });

                it("should mark inProgress as true", function () {
                    sut.inProgress = false;
                    sut.fn.saveName();
                    expect(sut.inProgress).toBeTruthy();
                });
            });

            describe('fn.cancelEditingName', function () {


                beforeEach(function () {
                    sut.originalName = 'backed-up-name';
                    sut.$scope.report.Name = "new_name_entered";
                    sut.fn.cancelEditingName();
                });

                it("should remove error", function () {
                    sut.fn.cancelEditingName();
                    expect(sut.nameError).toEqual("");
                });

                it("should reverse the original name", function () {
                    expect(sut.report.Name).toEqual('backed-up-name');
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
                    sut.report.Description = "";

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
                    expect(sut.event.onSaveDescription).toHaveBeenCalledWith(sut.report);
                });

                it("should mark inProgress as true", function () {
                    sut.inProgress = false;
                    sut.fn.saveDescription();
                    expect(sut.inProgress).toBeTruthy();
                });
            });

            describe('fn.cancelEditingDescription', function () {
                beforeEach(function () {
                    sut.originalDescription = 'backed-up-name';
                    sut.$scope.report.Description = "new_name_entered";
                    sut.fn.cancelEditingDescription();
                });

                it("should remove error", function () {
                    sut.fn.cancelEditingDescription();
                    expect(sut.descriptionError).toEqual("");
                });

                it("should reverse the original name", function () {
                    expect(sut.report.Description).toEqual('backed-up-name');
                });

                it("should turn off editing desc", function () {
                    expect(sut.editingDescription).toEqual(false);
                });
            });

            describe('fn.saveName', function () {
                it("should assign new value to selectedReportType", function () {
                    sut.$scope.report.ReportType = ['PDF', 'DOC', 'XSL'];
                    sut.selectedReportType = 'PDF';
                    var newValue = 'DOC';
                    sut.fn.changeReportType(newValue);
                    expect(sut.selectedReportType).toEqual(newValue);
                });
            });

            describe('fn.toggleFavouriteReport', function () {

                beforeEach(function () {
                    sut.$scope.report.Favorite = false;
                    sut.event = {
                        toggleFavouriteReport: sinon.spy()
                    };
                    sut.inProgress = false;
                    sut.fn.toggleFavouriteReport();
                });

                it("should call event.toggleFavouriteReport function", function () {
                    expect(sut.event.toggleFavouriteReport).toHaveBeenCalledWith(123);
                });

                it('should mark inProgress to true', function () {
                    expect(sut.inProgress).toBeTruthy();
                });


            });


            describe('fn.sendReportOpenCommand', function () {
                it("should fire fireReportSelected event if report's type is report", function () {
                    sut.fireOpenFolder = true;
                    var report = {
                        Id: 3,
                        Name: "my-report",
                        Type: "report"
                    };
                    sut.fn.sendReportOpenCommand(report);
                    expect(sut.reportEventBus.fireReportSelected).toHaveBeenCalledWith(3);

                });
            });

            describe('fn.sendFolderReportOpenCommand', function () {
                it("should fire fireFolderReportSelected event if report's type is folder", function () {
                    sut.fireOpenFolder = true;
                    var report = {
                        Id: 3,
                        Name: "my-report",
                        Type: "folder"
                    };
                    sut.fn.sendFolderReportOpenCommand(report);
                    expect(sut.reportEventBus.fireFolderReportSelected).toHaveBeenCalledWith(3);

                });
            });

            describe('eventBus eventListener', function () {
                it("should set eventListener to eventbus", function () {
                    sinon.stub(sut, 'onOtherReportInProgressStateChange');
                    spyOn(eventBus, 'onReportIsInProgress').and.callFake(function (eventListener) {
                        eventBus.fireReportIsInProgress = function () {
                            eventListener();
                        }
                    });
                    sut.configureEvents();
                    expect(eventBus.onReportIsInProgress).toHaveBeenCalled();
                    eventBus.fireReportIsInProgress();
                    expect(sut.onOtherReportInProgressStateChange).toHaveBeenCalled();
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
                            it("should switch inprogress to true to block further actions and show loading indicator", function () {
                                sut.fn[test.method]();
                                expect(sut.inProgress).toBeTruthy();
                            });
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
                Name: "new_name_here",
                Id: 123
            };
            beforeEach(function () {
                sut.$scope.report = {
                    Id: 123,
                    Name: "123456",
                    Description: "description_blahblah"
                };
                sut.editingName = true;
            });
            it("should update the name to the report", function () {

                sut.onSaveNameSuccess(serverResponse);
                expect(sut.report.Name).toEqual('new_name_here');
            });

            it("should turn off editing name", function () {
                sut.onSaveNameSuccess(serverResponse);
                expect(sut.editingName).toEqual(false);
            });
        });

        describe('onSaveDescriptionSuccess', function () {
            var serverResponse = {
                Description: "new_description_here",
                Id: 123
            };
            beforeEach(function () {
                sut.$scope.report = {
                    Id: 123,
                    Name: "123456",
                    Description: "description_blahblah"
                };
                sut.editingDescription = true;
            });
            it("should update the description to the report", function () {

                sut.onSaveDescriptionSuccess(serverResponse);
                expect(sut.report.Description).toEqual('new_description_here');
            });

            it("should turn off editing description", function () {
                sut.onSaveDescriptionSuccess(serverResponse);
                expect(sut.editingDescription).toEqual(false);
            });
        });

        describe('getParameterConfiguration', function () {
            var response;
            beforeEach(function () {
                sut.$scope.report = {
                    Id: 123,
                    Name: "123456",
                    Description: "description_blahblah"
                };
                response = {someFakeParameters: 123};
                sut.event = {
                    getParameterConfiguration: function () {
                    }
                };
                spyOn(sut.event, 'getParameterConfiguration').and.callFake(function (reportId, callback) {
                    callback(response);
                });
                sinon.stub(sut, 'onParameterConfigurationLoaded');
                sut.getParameterConfiguration();
            });
            it("should fire reportIsInProgress to eventbus with id and true", function () {
                expect(eventBus.fireReportIsInProgress).toHaveBeenCalledWith(123, true);
            });
            it("should call view.event.getParameterConfiguration function and return the result to onParameterConfigurationLoaded", function () {
                expect(sut.event.getParameterConfiguration).toHaveBeenCalledWith(123, jasmine.any(Function));
                expect(sut.onParameterConfigurationLoaded).toHaveBeenCalledWith(response);
            });
        });

        describe('onParameterConfigurationLoaded', function () {
            beforeEach(function () {
                sut.$scope.report = {
                    Id: 123,
                    Name: "123456",
                    Description: "description_blahblah"
                };
                sut.currentActionForEmptyOrAssignedParameters = sinon.stub();
                sut.currentActionForParameters = sinon.stub();
            });

            function exerciseTestOnLoadedConfiguration() {
                var data =
                    [
                        {
                            p1: 1234
                        },
                        {
                            p2: "abcd"
                        }
                    ]
                ;
                sut.onParameterConfigurationLoaded(data);
                return data;
            }

            it("should set the passed params to report's params", function () {
                var data = exerciseTestOnLoadedConfiguration();
                expect(sut.$scope.report.parameterConfigurations).toEqual(data);
            });

            describe("there is no params passed", function () {
                it("should call currentActionForEmptyParameters function", function () {
                    var data = [];
                    sut.onParameterConfigurationLoaded(data);
                    expect(sut.currentActionForEmptyOrAssignedParameters).toHaveBeenCalled();
                });
            });

            describe("there are params passed", function () {
                it("should call currentActionForParameters function", function () {
                    var data =
                        [
                            {'p1': 123456}
                        ]
                    ;
                    sut.onParameterConfigurationLoaded(data);
                    expect(sut.currentActionForParameters).toHaveBeenCalledWith(data);
                });
            });

            it("should switch inprogress to false to unblock further actions and hide loading indicator", function () {
                exerciseTestOnLoadedConfiguration();
                expect(sut.inProgress).toBeFalsy();
            });

            it("should fire ReportInProgress event to event bus with current report id and false", function () {
                exerciseTestOnLoadedConfiguration();
                expect(eventBus.fireReportIsInProgress).toHaveBeenCalledWith(sut.report.Id, false);
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
                    Id: 123,
                    Name: "the report"
                };
                var paramDialog = {
                    result: {
                        then: function (b) {
                            b(promise);
                        }
                    }
                };
                scope.$modal.open.returns(paramDialog);
                spyOn(sut, 'openParamsDialog').and.callFake(function (b) {
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


        describe('onOtherReportInProgressStateChange', function () {
            beforeEach(function () {
                sut.$scope.report = {
                    Id: 2002
                };
            });

            describe('current report change', function () {
                it("should not change current state", function () {
                    sut.otherReportInProgress = false;
                    sut.onOtherReportInProgressStateChange(2002, true);
                    expect(sut.otherReportInProgress).toBeFalsy();
                });
            });

            describe('not current report change', function () {
                it("should change current state with state from input", function () {
                    sut.otherReportInProgress = false;
                    sut.onOtherReportInProgressStateChange(2003, true);
                    expect(sut.otherReportInProgress).toBeTruthy();
                    // in truthy state already
                    sut.onOtherReportInProgressStateChange(2003, false);
                    expect(sut.otherReportInProgress).toBeFalsy();
                });
            });
        });

        describe('onToggledFavouriteReport', function () {

            it('should change report\'s favourite property to true if it is currently false', function () {
                sut.report = {
                    Id: 123,
                    Name: "report name",
                    Description: "description of a report",
                    Favorite: false
                };
                sut.onToggledFavouriteReport();
                expect(sut.report.Favorite).toBeTruthy();
            });

            it('should change report\'s favourite property to false if it is currently true', function () {
                sut.report = {
                    Id: 123,
                    Name: "report name",
                    Description: "description of a report",
                    Favorite: true
                };
                sut.onToggledFavouriteReport();
                expect(sut.report.Favorite).toBeFalsy();
            });

            it('should mark inProgress to false', function () {
                sut.report = {
                    Id: 123,
                    Name: "report name",
                    Description: "description of a report",
                    Favorite: true
                };
                sut.inProgress = true;
                sut.onToggledFavouriteReport();
                expect(sut.inProgress).toBeFalsy();
            });

        });

    });
});