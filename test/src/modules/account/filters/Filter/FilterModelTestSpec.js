/**
 * Created by kevin on 10/24/14.
 */

define([
    'modules/account/filters/Filter/FilterModel'
], function (FilterModel) {
    'use strict';
    describe("FilterModel", function () {

        function exerciseFilter(id) {
            return {columnKey: id, name: id};
        }

        function exerciseSut(fakeDb) {
            return FilterModel.newInstance(fakeDb);
        }

        function exerciseFakeDbWithAvailableFilter(filters) {
            return {
                getAvailableFilters: function () {
                    return {data: filters};
                }
            };
        }

        function exerciseFakeDbWithAvailableOwners(owners) {
            return {
                getAvailableOwners: function () {
                    return {data: owners};
                }
            };
        }

        function exerciseOwner(id, selected) {
            return {id: id, selected: selected || false};
        }

        describe("constructor", function () {
            var sut = null;
            var fakeDb = "Some Fake DB";

            beforeEach(function () {
                sut = exerciseSut(fakeDb);
            });

            it("should assign fakeDatabase", function () {
                expect(sut.fakeDatabase).toEqual(fakeDb);
            });

            it("should have empty filters", function () {
                expect(sut.filters).toEqual([]);
            });

            it("should have empty selected owners", function () {
                expect(sut.selectedOwners).toEqual([]);
            });
        });

        describe("addFilter", function () {
            var filter1 = exerciseFilter.bind(null, "filter1");
            var filter2 = exerciseFilter.bind(null, "filter2");
            [
                {currentFilters: [], newFilter: filter1(), expected: [filter1()]},
                {currentFilters: [filter1()], newFilter: filter2(), expected: [filter1(), filter2()]},
                {currentFilters: [filter2()], newFilter: filter2(), expected: [filter2()]}
            ].forEach(function (filterCase) {
                    it("should not contain duplicates and add new filters", function () {
                        var sut = exerciseSut();
                        sut.filters = filterCase.currentFilters;
                        sut.addFilter(filterCase.newFilter)
                            .then(function (filters) {
                                expect(filters).toEqual(filterCase.expected);
                            });
                    });
                });
        });

        describe("removeFilter", function () {
            var filter1 = exerciseFilter.bind(null, "filter1");
            var filter2 = exerciseFilter.bind(null, "filter2");
            [
                {currentFilters: [], filterToRemove: filter1(), expected: []},
                {currentFilters: [filter1()], filterToRemove: filter2(), expected: [filter1()]},
                {currentFilters: [filter2()], filterToRemove: filter2(), expected: []},
                {currentFilters: [filter1(), filter2()], filterToRemove: filter2(), expected: [filter1()]}
            ].forEach(function (filterCase) {
                    it("should not contain duplicates and remove filters", function () {
                        var sut = exerciseSut();
                        sut.filters = filterCase.currentFilters;
                        sut.removeFilter(filterCase.filterToRemove)
                            .then(function (filters) {
                                expect(filters).toEqual(filterCase.expected);
                            });
                    });
                });
        });

        describe("getAvailableFilters", function () {
            it("should get the database available filters", function () {
                var sut = exerciseSut(exerciseFakeDbWithAvailableFilter([1, 2]));
                sut.getAvailableFilters()
                    .then(function (filters) {
                        expect(filters).toEqual([1, 2]);
                    });
            });
        });

        describe("getAvailableOwners", function () {
            it("should get the database available owners", function () {
                var exampleOwners = [exerciseOwner(1), exerciseOwner(2)];
                var sut = exerciseSut(exerciseFakeDbWithAvailableOwners(exampleOwners));
                sut.getAvailableOwners()
                    .then(function (owners) {
                        expect(owners).toEqual(exampleOwners);
                    });
            });

            it("should trace the selected owners", function () {
                var exampleOwners = [exerciseOwner(1), exerciseOwner(2)];
                var sut = exerciseSut(exerciseFakeDbWithAvailableOwners(exampleOwners));
                sut.selectedOwners = [exampleOwners[0]];

                sut.getAvailableOwners()
                    .then(function (owners) {
                        expect(owners[0].selected).toEqual(true);
                    });
            });
        });

        describe("toggleOwnerFilter", function () {
            it("should assign a filter with the responsible.id", function () {
                var exampleOwners = [exerciseOwner(1), exerciseOwner(2)];
                var sut = exerciseSut(exerciseFakeDbWithAvailableOwners(exampleOwners));

                sut.toggleOwnerFilter(exerciseOwner(1))
                    .then(function (filters) {
                        expect(filters).toEqual([{columnKey: "responsible.id", value: [1]}]);
                    });
            });

            it("should assign a filter with more than one responsible.id", function () {
                var exampleOwners = [exerciseOwner(1, true), exerciseOwner(2)];
                var sut = exerciseSut(exerciseFakeDbWithAvailableOwners(exampleOwners));
                sut.selectedOwners = [exampleOwners[0]];

                sut.toggleOwnerFilter(exerciseOwner(2))
                    .then(function (filters) {
                        expect(filters).toEqual([{columnKey: "responsible.id", value: [1, 2]}]);
                    });
            });
        });
    });

});

