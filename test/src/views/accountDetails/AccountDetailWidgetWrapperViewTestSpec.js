/**
 * Created by justin on 3/13/15.
 */
describe("AccountDetailWidgetWrapperView", function () {
    var AccountDetailWidgetWrapperView = app.getView('views/accountDetails/AccountDetailWidgetWrapperView');

    var sut, presenter, model, scope, element;

    beforeEach(function () {
        scope = {
            foreverScroll: function () {
            },
            $watch: function () {
            },
            $on: function () {
            }
        };
        element = {};
        sut = AccountDetailWidgetWrapperView.newInstance(scope, element, false, false).getOrElse(throwInstantiateException(AccountDetailWidgetWrapperView));
    });

    describe("handleScroll", function () {
        [{
            divHeight: 300,
            scrollTop: 40,
            contentHeight: 700,
            toCall: false
        }, {
            divHeight: 300,
            scrollTop: 350,
            contentHeight: 700,
            toCall: false
        }, {
            divHeight: 300,
            scrollTop: 400,
            contentHeight: 700,
            toCall: true
        }].forEach(function (testCase) {

                it("should fire event foreverScroll if the content is scroll to bottom", function () {
                    var event = {
                        target: {
                            offsetHeight: testCase.divHeight,
                            scrollTop: testCase.scrollTop,
                            scrollHeight: testCase.contentHeight
                        }
                    };

                    spyOn(scope, 'foreverScroll');
                    sut.handleScroll(event);
                    if (testCase.toCall)
                        expect(scope.foreverScroll).toHaveBeenCalled();
                    else
                        expect(scope.foreverScroll).not.toHaveBeenCalled();
                });
            });
    });

});