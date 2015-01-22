/**
 * Created by justin on 12/22/14.
 */
describe("GraphWidgetView", function () {
    var GraphWidgetView = app.getView('views/GraphWidgetView');
    var WidgetBaseView = app.getView('views/WidgetBaseView');
    var sut;

    function initSut() {
        sut = GraphWidgetView.newInstance({}, {}, {}, {}, false, false).getOrElse(throwInstantiateException(GraphWidgetView));
    }

    describe("configureEvents", function () {
        beforeEach(initSut);

        [
            {method: 'assignWidget', exercise: assignWidgetTestExercise},
            {method: 'changeFilterRange', exercise: changeFilterRangeTestExercise},
            {method: 'changeFilter', exercise: changeFilterTestExercise},
            {method: 'switchToFilled', exercise: switchToFilledTestExercise},
            {method: 'switchToLine', exercise: switchToLineTestExercise},
            {method: 'toggleDisplayField', exercise: toggleDisplayFieldTestExercise},
            {method: 'refreshChart', exercise: refreshChartTestExercise}
        ].forEach(function (testCase) {
                var method = testCase.method,
                    exercise = testCase.exercise;

                it("should declare method fn." + method, function () {
                    expect(sut.fn[method]).not.toBeNull();
                    expect(isFunction(sut.fn[method])).toEqual(true);
                });

                if (exercise)
                    describe("calling fn." + method, function () {
                        beforeEach(function () {
                            spyOn(sut, 'refreshChart');
                        });

                        exercise();
                    });
            });

        function assignWidgetTestExercise() {
            var outerWidgetScope = {
                widgetId: 10,
                order: 10
            };

            function spyEvent() {
                sut.event.onReloadWidgetStart = jasmine.createSpy();
            }

            it("should assign outer scope to current instance", function () {
                spyEvent();
                sut.fn.assignWidget(outerWidgetScope);
                expect(sut.widget).toEqual(outerWidgetScope);
            });

            it("should fire event 'onReloadWidgetStart'", function () {
                spyEvent();
                sut.fn.assignWidget(outerWidgetScope);
                expect(sut.event.onReloadWidgetStart).toHaveBeenCalled();
            });

        }

        function changeFilterRangeTestExercise() {
            beforeEach(function () {
                sut.event.onFilterRangeChanged = jasmine.createSpy();
            });
            function performFilterChange() {
                var param = 'hour';
                sut.fn.changeFilterRange(param);
                return param;
            }

            it("should assign correct value", function () {
                var param = performFilterChange();
                expect(sut.$scope.selectedRangeOption).toEqual(param);
            });

            it("Should fire event onFilterRangeChanged", function () {
                performFilterChange();
                expect(sut.event.onFilterRangeChanged).toHaveBeenCalled();
            });
        }

        function changeFilterTestExercise() {
            it("Should fire event onFilterChanged", function () {
                sut.event.onFilterChanged = jasmine.createSpy();
                sut.fn.changeFilter();
                expect(sut.event.onFilterChanged).toHaveBeenCalled();
            });
        }

        function switchToFilledTestExercise() {
            it("should assign currentChartType with 'filled'", function () {
                sut.fn.switchToFilled();
                expect(sut.$scope.currentChartType).toEqual('filled');
            });

            assertCallRefreshChart(function () {
                sut.fn.switchToFilled();
            });
        }

        function switchToLineTestExercise() {
            it("should assign currentChartType with 'line'", function () {
                sut.fn.switchToLine();
                expect(sut.$scope.currentChartType).toEqual('line');
            });

            assertCallRefreshChart(function () {
                sut.fn.switchToLine();
            });
        }

        function refreshChartTestExercise() {
            assertCallRefreshChart(function () {
                sut.fn.refreshChart();
            });
        }

        function toggleDisplayFieldTestExercise() {
            it("should remove field if it's already displaying", function () {
                sut.$scope.displayFields = ["field1", "field2"];
                var fieldToToggle = "field1";
                sut.fn.toggleDisplayField(fieldToToggle);
                expect(sut.$scope.displayFields.length).toEqual(1);
                expect(sut.$scope.displayFields.indexOf(fieldToToggle)).toEqual(-1);
            });

            it("should add field if it's not displaying", function () {
                sut.$scope.displayFields = ["field1", "field2"];
                var fieldToToggle = "field3";
                sut.fn.toggleDisplayField(fieldToToggle);
                expect(sut.$scope.displayFields.length).toEqual(3);
                expect(sut.$scope.displayFields.indexOf(fieldToToggle)).toEqual(2);
            });

            it("should call refreshChart", function () {
                sut.$scope.displayFields = ["field1", "field2"];
                var fieldToToggle = "field3";
                sut.fn.toggleDisplayField(fieldToToggle);
                expect(sut.refreshChart).toHaveBeenCalled();
            });
        }

        function assertCallRefreshChart(exercise) {
            it("should call refreshChart", function () {
                exercise();
                expect(sut.refreshChart).toHaveBeenCalled();
            });
        }
    });

    describe("onReloadWidgetSuccess", function () {
        var fakeResponseData = {
            data: {
                widgetType: "graph",
                params: {
                    filters: ['abc', 'def'],
                    fields: []
                }
            }
        };

        function instantiateSut() {
            sut = new GraphWidgetView({}, {});
            sut.event = {};
            sut.event.onReloadWidgetDone = function () {
            };

            spyOn(sut, 'extractFilters');
            spyOn(sut, 'extractDisplayFields');
            spyOn(sut, 'refreshChart');
            sut.$scope.apply = function () {
            };
        }

        it("Should assign data to scope", function () {
            instantiateSut();
            spyOn(sut.event, 'onReloadWidgetDone');
            sut.onReloadWidgetSuccess(fakeResponseData);
            expect(sut.data).toEqual(fakeResponseData.data.params);
        });

        it("should call extractFilters method", function () {
            instantiateSut();
            sut.onReloadWidgetSuccess(fakeResponseData);
            expect(sut.extractFilters).toHaveBeenCalled();
        });

        it("should call extractDisplayFields method", function () {
            instantiateSut();
            sut.onReloadWidgetSuccess(fakeResponseData);
            expect(sut.extractDisplayFields).toHaveBeenCalled();
        });

        it("should call refreshChart method", function () {
            instantiateSut();
            sut.onReloadWidgetSuccess(fakeResponseData);
            expect(sut.refreshChart).toHaveBeenCalled();
        });

        it("Should fire done reload widget event", function () {
            instantiateSut();
            spyOn(sut.event, 'onReloadWidgetDone');
            sut.onReloadWidgetSuccess(fakeResponseData);
            expect(sut.event.onReloadWidgetDone).toHaveBeenCalledWith();
        });
    });

    describe("extractDisplayFields", function () {
        beforeEach(initSut);

        var fields = [{
            name: 'field1', data: []
        }, {
            name: 'field2', data: []
        }, {
            name: 'field3', data: []
        }, {
            name: 'field4', data: []
        }];
        var expected = ['field1', 'field2', 'field3', 'field4'];

        beforeEach(function () {
            sut.data = {
                fields: fields
            };
        });
        it("should assign availableFields", function () {
            sut.extractDisplayFields();
            expect(sut.$scope.availableFields).toEqual(expected);
        });

        describe("displayFields has value", function () {
            it("should not change current values if values are available in new data", function () {
                sut.$scope.displayFields = ['field1', 'field4'];
                sut.extractDisplayFields();
                expect(sut.$scope.displayFields.length).toEqual(2);
                expect(sut.$scope.displayFields[0]).toEqual('field1');
                expect(sut.$scope.displayFields[1]).toEqual('field4');
            });

            it("should assign new value if current values not in new data", function () {
                sut.$scope.displayFields = ['field5', 'field6'];
                exerciseShouldAssignNewValue();
            });
        });

        describe("displayFields has no value", function () {
            it("should assign new value", function () {
                sut.$scope.displayFields = [];
                exerciseShouldAssignNewValue();
            });
        });

        function exerciseShouldAssignNewValue() {
            sut.extractDisplayFields();
            expect(sut.$scope.displayFields.length).toEqual(4);
            expect(sut.$scope.displayFields).toEqual(expected);
        }
    });

    describe("extractFilters", function () {
        beforeEach(initSut);

        it("should assign filters from data", function () {
            sut.data.filters = ['filter1', 'filter2'];
            sut.extractFilters();
            expect(sut.$scope.filters).toEqual(sut.data.filters);
        });

        describe("assign new value to selectedFilter", function () {
            describe("current value is empty", function () {
                it("should assign selectedFilter to the first element in array", function () {
                    sut.data.filters = ['filter1', 'filter2', 'filter3'];
                    sut.extractFilters();
                    expect(sut.$scope.selectedFilter).toEqual('filter1');
                });
            });

            describe("current value is not in filters list", function () {
                it("should assign selectedFilter to the first element in array", function () {
                    sut.$scope.selectedFilter = 'filterNotInList';
                    sut.data.filters = ['filter1', 'filter2', 'filter3'];
                    sut.extractFilters();
                    expect(sut.$scope.selectedFilter).toEqual('filter1');
                });
            });

            describe("current value is in filters list", function () {
                it("should not assign selectedFilter if it has value", function () {
                    sut.$scope.selectedFilter = 'filter2';
                    sut.data.filters = ['filter1', 'filter2'];
                    sut.extractFilters();
                    expect(sut.$scope.selectedFilter).toEqual('filter2');
                });
            });
        });
    });

    describe("refreshChart", function () {
        beforeEach(initSut);

        beforeEach(function () {
            sut.element = {
                find: jasmine.createSpy()
            };
        });

        describe("data is invalid", function () {

            [{
                testCase: "fields is not defined", prepare: function () {
                    sut.data = {};
                }
            }, {
                testCase: "fields is null", prepare: function () {
                    sut.data = {fields: null};
                }
            }, {
                testCase: "fields is not array", prepare: function () {
                    sut.data = {fields: {blah: 123456}};
                }
            }].forEach(function (test) {
                    describe(test.testCase, function () {
                        it("Should not call paintChart", function () {
                            test.prepare();
                            spyOn(sut, 'paintChart');
                            sut.refreshChart();
                            expect(sut.paintChart).not.toHaveBeenCalled();
                        });
                    });
                });
        });

        describe("data is valid", function () {
            beforeEach(function () {
                spyOn(sut, 'getLineGraph');
                spyOn(sut, 'paintChart');
            });

            function performRefreshChart() {
                sut.data = {
                    fields: [{
                        name: 'abc',
                        data: []
                    }, {
                        name: 'def',
                        data: []
                    }]
                };
                sut.refreshChart();
            }

            it("should call getLineGraph()", function () {
                performRefreshChart();
                expect(sut.getLineGraph).toHaveBeenCalled();
            });
            it("should call paintChart()", function () {
                performRefreshChart();
                expect(sut.paintChart).toHaveBeenCalled();
            });
        });
    });

    describe("getLineGraph", function () {
        beforeEach(initSut);

        var displayFields = ['field1', 'field2'];
        var fields = {
            name: "field1", data: []
        };

        [{
            displayFields: ['field1', 'field2'],
            field: {name: "field1", data: []},
            hidden: false,
            filledStatus: 'filled',
            filled: true
        }, {
            displayFields: ['field1', 'field2'],
            field: {name: "field3", data: []},
            hidden: true,
            filledStatus: 'filled',
            filled: true
        }, {
            displayFields: ['field1', 'field2'],
            field: {name: "field3", data: []},
            hidden: true,
            filledStatus: 'line',
            filled: false
        }].forEach(function (testCase) {
                var field = testCase.field,
                    displayFields = testCase.displayFields,
                    hidden = testCase.hidden,
                    filledStatus = testCase.filledStatus,
                    filled = testCase.filled;

                it("should call getLineGraphInstance with correct arguments", function () {
                    GraphWidgetView.getLineGraphInstance = jasmine.createSpy();
                    sut.getLineGraph(field, displayFields, filledStatus);
                    expect(GraphWidgetView.getLineGraphInstance).toHaveBeenCalledWith(field, hidden, filled);
                });
            });
    });
});