/**
 * Created by justin on 3/4/15
 */

describe("AccountFilterModel", function () {
    var AccountFilterModel = app.getModel('models/account/AccountFilterModel');
    var Configuration = app.getService('Configuration');
    var sut, ajaxService;

    beforeEach(function () {
        ajaxService = {
            rawAjaxRequest: function () {
            }
        };
        sut = AccountFilterModel.newInstance(ajaxService).getOrElse(throwInstantiateException(AccountFilterModel));
    });

    function exerciseAjaxOk() {
        return {
            then: function (a, b) {
                a();
                return exerciseAjaxOk();
            }
        }
    }

    describe("getAvailableOwners", function () {
        function exerciseTest() {
            spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseAjaxOk());
            spyOn(sut, 'decorateAvailableOwners');
            sut.getAvailableOwners();
        }

        it("should call ajaxService with correct params", function () {
            exerciseTest();
            expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(Configuration.api.getAvailableOwners);
            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('get');
        });

        it("should call decorateAvailableOwners", function () {
            exerciseTest();
            expect(sut.decorateAvailableOwners).toHaveBeenCalled();
        });
    });

    describe("decorateAvailableOwners", function () {
        it("should init 'availableOwners' property if not initialized", function () {
            sut.availableOwners = null;
            var result = [{
                id: 1,
                name: "user1"
            }, {
                id: 2,
                name: "user2"
            }];
            var expected = [{
                id: 1,
                name: "user1",
                selected: false
            }, {
                id: 2,
                name: "user2",
                selected: false
            }];
            sut.decorateAvailableOwners(result);
            expect(sut.availableOwners).toEqual(expected);
        });

        it("should merge 'availableOwners' property if initialized", function () {
            sut.availableOwners = [{
                id: 1,
                name: "user1",
                selected: false
            }, {
                id: 2,
                name: "user2",
                selected: true
            }];
            var result = [{
                id: 2,
                name: "user2"
            }];
            var expected = [{
                id: 2,
                name: "user2",
                selected: true
            }];
            sut.decorateAvailableOwners(result);
            expect(sut.availableOwners).toEqual(expected);
        });
    });
});

