/**
 * Created by kevin on 10/24/14.
 */

describe("AccountModel", function () {
    var AccountModel = app.getModel('models/AccountModel');
    var QueryBuilder = app.getService('services/QueryBuilder');
    var FakeDatabase = app.getModel('models/fakes/FakeDatabase');

    function exerciseQueryBuilder() {
        return QueryBuilder.newInstance().getOrElse(throwException("Could not create query builder!"));
    }

    function exerciseCreateModel(gateway, queryBuilder) {
        return AccountModel.newInstance(gateway || {}, queryBuilder || exerciseQueryBuilder()).getOrElse(throwException("Could not create AccountModel!"));
    }

    describe("constructor", function () {
        describe("empty constructor", function () {
            var sut = null;

            beforeEach(function () {
                sut = exerciseCreateModel();
            });

            it("should contain empty sorting", function () {
                expect(sut.sorting).toEqual({});
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

    describe("private methods", function () {
        it("should flat an object as an array", function () {
            var model = exerciseCreateModel();
            var obj = {a: 1, b: {c: 2, d: 3}};
            var expected = [{name: "a", value: 1}, {name: "b.c", value: 2}, {name: "b.d", value: 3}];

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

