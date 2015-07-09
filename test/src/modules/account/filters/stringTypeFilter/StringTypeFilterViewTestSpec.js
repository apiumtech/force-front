/**
 * Created by Justin on 4/2/2015.
 */
define([
    'modules/account/filters/stringTypeFilter/StringTypeFilterView'
], function (StringTypeFilterView) {
    'use strict';
    describe("StringTypeFilterView", function () {

        var sut, scope, element, model, presenter;

        describe("construct", function () {
            it("should call configureEvents", function () {
                spyOn(StringTypeFilterView.prototype, 'configureEvents');
                new StringTypeFilterView();
                expect(StringTypeFilterView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        beforeEach(function () {
            scope = {
                $on: function () {
                },
                $watch: function () {
                },
                filterFor: {
                    data: {}
                }
            };
            element = {};
            model = {};
            presenter = {};
            sut = StringTypeFilterView.newInstance(scope, element, model, presenter, false, false);
        });

        describe("configureEvents", function () {
            describe("loadStringFilters", function () {
                beforeEach(function () {
                    spyOn(sut.awaitHelper, 'await');
                    sut.fn.loadStringFilters();
                });
                it("should turn requestingFilterList to true to show the indicator on the view", function () {
                    expect(sut.data.requestingFilterList).toEqual(true);
                });

                it("should call await from AwaitHelper for keeping ajax request clean until user stop typing", function () {
                    expect(sut.awaitHelper.await).toHaveBeenCalledWith(sut.fn.fireSearchEvent, 200);
                });
            });

            describe("prePostFilterChanged", function () {
                it("should fire event filterSelectionToggled with correct params", function () {
                    sut.event.filterSelectionToggled = jasmine.createSpy();
                    sut.data.valueList = [{
                        name: "notSelected",
                        selected: false
                    }, {
                        name: "selected 1",
                        selected: true
                    }, {
                        name: "notSelected",
                        selected: false
                    }, {
                        name: "selected 156",
                        selected: true
                    }];

                    var expected = ["selected 1", "selected 156"];
                    sut.fn.prePostFilterChanged();
                    expect(sut.event.filterSelectionToggled).toHaveBeenCalledWith(sut.$scope.filterFor.key, expected);
                });
            });

            describe("fireSearchEvent", function () {
                it("should call searchValueChanged on event", function () {
                    sut.event.searchValueChanged = jasmine.createSpy();
                    sut.fn.fireSearchEvent();
                    expect(sut.event.searchValueChanged).toHaveBeenCalledWith(sut.$scope.filterFor.key, sut.data.filterValue);
                });
            });
        });

        describe("onFieldValuesLoaded", function () {
            var data = [];
            beforeEach(function () {
                sut.onFieldValuesLoaded(data);
            });
            it("should assign valueList with data", function () {
                expect(sut.data.valueList).toEqual(data);
            });
            it("should turn off indicator for loading data by switch requestingFilterList to false", function () {
                expect(sut.data.requestingFilterList).toBeFalsy();
            });
        });

        describe("onFieldChanged", function () {
            beforeEach(function () {
                sut.event.searchValueChanged = jasmine.createSpy();
            });

            describe("no data is defined for 'filterFor' value", function () {
                it("should not fire event searchValueChanged", function () {
                    sut.$scope.filterFor = null;
                    sut.onFieldChanged();
                    expect(sut.event.searchValueChanged).not.toHaveBeenCalled();
                });
            });
            describe("data is defined for 'filterFor' value", function () {
                it("should fire event searchValueChanged", function () {
                    sut.onFieldChanged();
                    expect(sut.event.searchValueChanged).toHaveBeenCalledWith(sut.$scope.filterFor.key, sut.data.filterValue);
                });
            });
        });
    });

});