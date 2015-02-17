/**
 * Created by kevin on 10/24/14.
 */

describe("AccountModel", function () {
    var AccountModel = app.getModel('models/account/AccountModel');
    var QueryBuilder = app.getService('services/QueryBuilder');
    var FakeDatabase = app.getModel('models/fakes/FakeDatabase');

    function exerciseQueryBuilder() {
        return QueryBuilder.newInstance({}).getOrElse(throwException("Could not create query builder!"));
    }

    function exerciseFakeDb() {
        return FakeDatabase.newInstance().getOrElse(throwException("Could not create fake db!"));
    }

    function exerciseCreateModel(gateway, queryBuilder) {
        return AccountModel.newInstance(gateway || exerciseFakeDb(), queryBuilder || exerciseQueryBuilder()).getOrElse(throwException("Could not create AccountModel!"));
    }

    var defaultOrder = {
        offset: 0,
        limit: 15
    };

    describe("constructor", function () {
        describe("empty constructor", function () {
            var sut = null;

            beforeEach(function () {
                sut = exerciseCreateModel();
            });

            it("should contain empty sorting", function () {
                expect(sut.sorting).toEqual({});
            });

            it("should contain empty columnKeys", function () {
                expect(sut.columnKeys).toEqual([]);
            });

            it("should contain empty columns", function () {
                expect(sut.columns).toEqual([]);
            });

            it("should contain empty filterName", function () {
                expect(sut.filterName).toEqual("");
            });

            it("should contain null allColumns", function () {
                expect(sut.allColumns).toEqual(null);
            });
        });

        describe("basic constructor", function () {
            it("should contain the provided gateway", function () {
                var gateway = "gateway";
                var sut = exerciseCreateModel(gateway);

                expect(sut.gateway).toEqual(gateway);
            });

            it("should contain the provided querybuilder", function () {
                var querybuilder = "querybuilder";
                var sut = exerciseCreateModel({}, querybuilder);

                expect(sut.queryBuilder).toEqual(querybuilder);
            })
        });
    });

    describe("setNameFilter", function () {
        var sut = null;
        var name = "name";

        beforeEach(function () {
            sut = exerciseCreateModel();
            sut.setNameFilter(name);
        });

        it("should apply the name filter", function () {
            expect(sut.queryBuilder.build()).toEqual({
                filters: [{columnKey: "name", value: name}],
                fields: [],
                order: defaultOrder
            });
        });

        it("should set the first page", function () {
            expect(sut.queryBuilder.build().order.offset).toEqual(0);
        });
    });

    describe("setFilters", function () {
        function exerciseFilter(name, value) {
            return { columnKey: name, value: value };

        }
        function exerciseNameFilter(name) {
            return exerciseFilter("name", name);
        }

        var filterDefName = exerciseNameFilter('');
        var filterA_undefined = exerciseFilter("a", undefined);
        var filterA_A = exerciseFilter("a", "a");

        var sut = exerciseCreateModel();
        [
            { filters: [], expected: [ filterDefName ] },
            { filters: null, expected: [ filterDefName ] },
            { filters: undefined, expected: [ filterDefName ] },
            { filters: [ filterA_undefined ], expected: [ filterDefName ]},
            { filters: [ filterA_A ], expected: [ filterA_A, filterDefName ]}
        ].forEach(function (testCase) {
                it("should set the filters", function () {
                    sut.setFilters(testCase.filters);
                    expect(sut.queryBuilder.build().filters).toEqual(testCase.expected);
                });
            });
    });

    describe("toggleField", function () {
        it("should add a new field", function () {
            var sut = exerciseCreateModel();
            sut.toggleField({ columnKey: "a" });

            expect(sut.columnKeys).toEqual(["a"]);
        });

        it("should remove an existing field", function () {
            var sut = exerciseCreateModel();
            sut.toggleField({ columnKey: "a" });
            sut.toggleField({ columnKey: "a" });

            expect(sut.columnKeys).toEqual([]);
        })
    });

    describe("addField", function () {
        var sut = null;
        var column = "a";

        beforeEach(function () {
            sut = exerciseCreateModel();
            sut.addField(column);
        });

        it("should apply add the new field", function () {
            expect(sut.queryBuilder.build()).toEqual({
                filters: [],
                fields: [column],
                order: defaultOrder
            });
        });

        it("should set the first page", function () {
            expect(sut.queryBuilder.build().order.offset).toEqual(0);
        });
    });

    describe("removeField", function () {
        var sut = null;
        var column = "a";

        beforeEach(function () {
            sut = exerciseCreateModel();
            sut.addField(column);
        });

        it("should ignore non-existing fields", function () {
            sut.removeField({columnKey: "??"});
            expect(sut.queryBuilder.build()).toEqual({
                filters: [],
                fields: [column],
                order: defaultOrder
            });
        });

        it("should remove an existing field", function () {
            sut.removeField({columnKey: column});
            expect(sut.queryBuilder.build().fields).toEqual([]);
        });

        it("should remove an existing filter for this field", function () {
            sut.setFilters([{columnKey: "a", value: "b"}]);
            sut.removeField({columnKey: column});
            expect(sut.queryBuilder.build().filters).toEqual([{columnKey: "name", value: ""}]);
        });

        it("should set the first page", function () {
            expect(sut.queryBuilder.build().order.offset).toEqual(0);
        });
    });

    describe("private methods", function () {
        it("should flat an object as an array", function () {
            var model = exerciseCreateModel();
            var obj = {id: 0, a: 1, b: {c: 2, d: 3}};
            var expected = [{name: "a", value: 1,id: 0},
                            {name: "b.c", value: 2,id: 0},
                            {name: "b.d", value: 3,id: 0}];

            var result = model._flatObject(obj);
            expect(result).toEqual(expected);
        });

        it("should sort a flatted object by a template", function () {
            var model = exerciseCreateModel();
            var template = ['b.c', 'a', 'b.d'];
            var result = [{name: "a", value: 1}, {name: "b.c", value: 2}, {name: "b.d", value: 3}];
            var expected = [{name: "b.c", value: 2}, {name: "a", value: 1}, {name: "b.d", value: 3}];

            result.sort(model._sortByPosition(template));
            expect(result).toEqual(expected);
        });

        it("should save data as is if not merged", function () {
            var model = exerciseCreateModel();
            var msg = {merge: false, data: [{a: 1, b: 2}, {a: 2, b: 3}]};

            model._mergeOrSave(msg);
            expect(model.data).toEqual(msg.data);
        });

        it("should merge data", function () {
            var model = exerciseCreateModel();
            var step1 = {merge: false, data: [{a: 1, b: 2}, {a: 2, b: 3}]};
            model._mergeOrSave(step1);

            var step2 = {merge: true, data: [{c: 3}, {d: 4}]};
            model._mergeOrSave(step2);

            expect(model.data).toEqual([{a: 1, b: 2, c: 3}, {a: 2, b: 3, d: 4}]);
        });
    });
});

