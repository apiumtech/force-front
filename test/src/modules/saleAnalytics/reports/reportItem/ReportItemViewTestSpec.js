define([
    'modules/saleAnalytics/reports/reportItem/ReportItemView',
    'modules/saleAnalytics/reports/reportItem/ReportItemPresenter'
], function (ReportItemView, ReportItemPresenter) {
    'use strict';

    describe('ReportItemView', function () {
        describe("construct", function () {
            it("should call configureEvents", function () {
                spyOn(ReportItemView.prototype, 'configureEvents').and.callThrough();
                var scope = {},
                    element = {},
                    presenter = jasmineMock(ReportItemPresenter);
                var sut = new ReportItemView(scope, element, presenter);
                expect(ReportItemView.prototype.configureEvents).toHaveBeenCalled();
            })
        });

        var sut, scope, element, presenter;

        beforeEach(function () {
            scope = {};
            element = {};
            presenter = jasmineMock(ReportItemPresenter);
            sut = new ReportItemView(scope, element, presenter);
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
                beforeEach(function () {
                    sut.event = {
                        onSaveName: jasmine.createSpy()
                    };
                    sut.fn.saveName();
                });
                it("should fire event onSaveName", function () {
                    expect(sut.event.onSaveName).toHaveBeenCalledWith(sut.report.id, sut.report.name);
                });
            });

            describe('fn.cancelEditingName', function () {
                beforeEach(function () {
                    sut.originalName = 'backed-up-name';
                    sut.$scope.report.name = "new_name_entered";
                    sut.fn.cancelEditingName();
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
                beforeEach(function () {
                    sut.event = {
                        onSaveDescription: jasmine.createSpy()
                    };
                    sut.fn.saveDescription();
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
                it("should reverse the original name", function () {
                    expect(sut.report.description).toEqual('backed-up-name');
                });

                it("should turn off editing desc", function () {
                    expect(sut.editingDescription).toEqual(false);
                });
            });
        });

    });
});