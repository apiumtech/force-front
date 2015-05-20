/**
 * Created by Justin on 4/2/2015.
 */
describe("BooleanTypeFilterView", function () {
    var BooleanTypeFilterView = app.getView("views/filters/BooleanTypeFilterView");

    var sut, scope, element, model, presenter;
    describe("construct", function () {
        it("should call configureEvents", function () {
            spyOn(BooleanTypeFilterView.prototype, 'configureEvents');
            new BooleanTypeFilterView();
            expect(BooleanTypeFilterView.prototype.configureEvents).toHaveBeenCalled();
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
        sut = BooleanTypeFilterView.newInstance(scope, element, model, presenter, false, false);
    });
    describe("configureEvents", function () {
        describe("prePostFilterChanged", function () {
            it("should fire event filterSelectionToggled with correct params", function () {
                sut.event.filterSelectionToggled = jasmine.createSpy();
                sut.data.valueList = [{
                    name: 'true',
                    selected: false
                }, {
                    name: 'false',
                    selected: true
                }];

                var expected = [false];
                sut.fn.prePostFilterChanged();
                expect(sut.event.filterSelectionToggled).toHaveBeenCalledWith(sut.$scope.filterFor.data, expected);
            });
        });
    });
});