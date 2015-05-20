/**
 * Created by kevin on 1/2/15.
 */
describe("QueryBuilder", function () {
    var QueryBuilder = app.getService('services/QueryBuilder');

    function exerciseSut(defaultQuery) {
        return QueryBuilder.newInstance(defaultQuery || {});
    }

    describe("constructor", function () {
        describe("empty constructor", function () {
            var sut = null;

            beforeEach(function () {
                sut = exerciseSut();
            });

            it("should contain a default empty query", function () {
                expect(sut.query).toEqual({filters: [], fields: [], order: {}});
            });
        });

        describe("default query constructor", function () {
            var sut = null;
            var defaultQuery = {filters: [1], fields: [2]};

            beforeEach(function () {
                sut = exerciseSut(defaultQuery);
            });

            it("should contain the default query", function () {
                expect(sut.query).toEqual(defaultQuery);
            });
        });
    });

    describe("setFilter", function () {
        it("should add a new filter", function () {
            var sut = exerciseSut();
            expect(sut.setFilter("a", 1).build().filters).toEqual([{columnKey: "a", value: 1}]);
        });

        it("should change value of an existing filter", function () {
            var sut = exerciseSut();
            sut.setFilter("a", 5);

            expect(sut.setFilter("a", 1).build().filters).toEqual([{columnKey: "a", value: 1}]);
        });

        it("should not repeat filters", function () {
            var sut = exerciseSut();

            function exerciseSetFiler() {
                sut.setFilter("a", 1);
            }

            for (var i = 0; i < 5; i++) {
                exerciseSetFiler();
            }

            expect(sut.build().filters).toEqual([{columnKey: "a", value: 1}]);
        });
    });

    describe("removeFilter", function () {
        it("should remove an existing filter", function () {
            var sut = exerciseSut();
            sut.setFilter("a", 1).removeFilter("a");

            expect(sut.build().filters).toEqual([]);
        });

        it("should not remove a different filter", function () {
            var sut = exerciseSut();
            sut.setFilter("a", 1).removeFilter("b");

            expect(sut.build().filters).toEqual([{columnKey: "a", value: 1}]);
        });
    });

    describe("allFields", function () {
        it("should setup all fields on query", function () {
            var sut = exerciseSut();
            sut.addField("a").allFields();

            expect(sut.build().fields).toEqual([]);
        });
    });

    describe("addField", function () {
        [
            { currentFields: ["a", "b"], fieldToAdd: "a", expect: ["a", "b"] },
            { currentFields: ["a", "b"], fieldToAdd: "c", expect: ["a", "b", "c"] },
            { currentFields: [], fieldToAdd: "c", expect: ["c"] }
        ].forEach(function (fieldCase) {
                it("should add fields without duplicates", function () {
                    var sut = exerciseSut({ fields: fieldCase.currentFields });
                    sut.addField(fieldCase.fieldToAdd);

                    expect(sut.build().fields).toEqual(fieldCase.expect);
                });
            });

    });

    describe("removeField", function () {
        [
            { currentFields: ["a", "b"], fieldToRemove: "a", expect: ["b"] },
            { currentFields: ["a", "b"], fieldToRemove: "c", expect: ["a", "b"] },
            { currentFields: [], fieldToRemove: "c", expect: [] }
        ].forEach(function (fieldCase) {
                it("should remove fields without duplicates", function () {
                    var sut = exerciseSut({ fields: fieldCase.currentFields });
                    sut.removeField(fieldCase.fieldToRemove);

                    expect(sut.build().fields).toEqual(fieldCase.expect);
                });
            });

    });

    describe("setOrder", function () {
        var sut = null;

        beforeEach(function () {
            sut = exerciseSut();
        });

        it("should set the field to order in a query", function () {
            sut.setOrder("a", 'asc');
            expect(sut.build().order.field).toEqual("a");
        });

        it("should set the sorting direction in a query", function () {
            sut.setOrder("a", 'asc');
            expect(sut.build().order.direction).toEqual("asc");
        });
    });

    describe("setPage", function () {
        var sut = null;

        beforeEach(function () {
            sut = exerciseSut();
        });

        it("should set the current offset", function () {
            sut.setPage(0, 10);
            expect(sut.build().order.offset).toEqual(0);
        });

        it("should set the current limit", function () {
            sut.setPage(0, 10);
            expect(sut.build().order.limit).toEqual(10);
        });
    });

    describe("nextPage", function () {
        it("should set the offset based on the current limit", function () {
            var sut = exerciseSut();
            sut.setPage(0, 10).nextPage();
            expect(sut.build().order.offset).toEqual(10);
        });
    });
});