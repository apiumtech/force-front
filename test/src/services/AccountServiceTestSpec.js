/**
 * Created by justin on 3/4/15
 */

describe("AccountService", function () {
    var AccountService = app.getModel('services/AccountService');
    var Configuration = app.getService('Configuration');
    var sut, ajaxService;

    beforeEach(function () {
        ajaxService = {
            rawAjaxRequest: function () {
            }
        };
        sut = AccountService.newInstance(ajaxService);
    });

    function exerciseAjaxOk() {
        return {
            then: function (a, b) {
                a();
                return exerciseAjaxOk();
            }
        }
    }

    describe("getAccount", function () {
        beforeEach(function () {

        });

        describe("calling getAccount", function () {
            it("should call ajaxService rawAjaxRequest", function () {
                spyOn(sut.ajaxService, 'rawAjaxRequest').and.returnValue(exerciseAjaxOk());
                sut.getAccount(10);
                expect(sut.ajaxService.rawAjaxRequest).toHaveBeenCalledWith(jasmine.objectContaining({
                    url: Configuration.api.getAccount.format(10),
                    type: "get"
                }));
            });
        });
    });

    describe("updateAccount", function () {
        beforeEach(function () {

        });

        describe("calling getAccount", function () {
            it("should call ajaxService rawAjaxRequest", function () {
                spyOn(sut.ajaxService, 'rawAjaxRequest').and.returnValue(exerciseAjaxOk());
                sut.updateAccount(10, {});
                expect(sut.ajaxService.rawAjaxRequest).toHaveBeenCalledWith(jasmine.objectContaining({
                    url: Configuration.api.updateAccount.format(10),
                    type: "put",
                    data: {}
                }));
            });
        });
    });

    describe("getAvailableOwners", function () {
        function exerciseTest(query) {
            spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseAjaxOk());
            spyOn(sut, 'decorateAvailableOwners');
            sut.getAvailableOwners(query);
        }

        [{
            message: "no query defined",
            query: null,
            correctUrl: Configuration.api.getAvailableOwners
        }, {
            message: "has query",
            query: "apiumtech",
            correctUrl: Configuration.api.getAvailableOwners + "?query=apiumtech"
        }].forEach(function (test) {
                describe(test.message, function () {
                    it("should call ajaxService with correct params", function () {
                        exerciseTest(test.query);
                        expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                        expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(test.correctUrl);
                        expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('get');
                    });
                });
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
            sut.decorateAvailableOwners(result);
            expect(sut.availableOwners).toEqual(result);
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
            expect(sut.availableOwners).toEqual(result);
        });
    });

    describe("getAvailableEnvironments", function () {
        function exerciseTest(query) {
            spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseAjaxOk());
            spyOn(sut, 'decorateAvailableEnvironments');
            sut.getAvailableEnvironments(query);
        }

        [{
            message: "no query defined",
            query: null,
            correctUrl: Configuration.api.getAvailableEnvironments
        }, {
            message: "has query",
            query: "apiumtech",
            correctUrl: Configuration.api.getAvailableEnvironments + "?query=apiumtech"
        }].forEach(function (test) {
                describe(test.message, function () {
                    it("should call ajaxService with correct params: " + test.correctUrl, function () {
                        exerciseTest(test.query);
                        expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                        expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(test.correctUrl);
                        expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('get');
                    });
                });
            });

        it("should call decorateAvailableEnvironments", function () {
            exerciseTest();
            expect(sut.decorateAvailableEnvironments).toHaveBeenCalled();
        });
    });

    describe("decorateAvailableEnvironments", function () {
        it("should init 'availableEnvironments' property if not initialized", function () {
            sut.availableEnvironments = null;
            var result = [{
                id: 1,
                name: "environment1"
            }, {
                id: 2,
                name: "environment2"
            }];
            sut.decorateAvailableEnvironments(result);
            expect(sut.availableEnvironments).toEqual(result);
        });

        it("should merge 'availableEnvironments' property if initialized", function () {
            sut.availableEnvironments = [{
                id: 1,
                name: "environment1",
                selected: false
            }, {
                id: 2,
                name: "environment2",
                selected: true
            }];
            var result = [{
                id: 2,
                name: "environment2"
            }];
            sut.decorateAvailableEnvironments(result);
            expect(sut.availableEnvironments).toEqual(result);
        });
    });

    describe("getAvailableAccountTypes", function () {
        function exerciseTest(query) {
            spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseAjaxOk());
            spyOn(sut, 'decorateAvailableAccountTypes');
            sut.getAvailableAccountTypes(query);
        }

        [{
            message: "no query defined",
            query: null,
            correctUrl: Configuration.api.getAvailableAccountTypes
        }, {
            message: "has query",
            query: "apiumtech",
            correctUrl: Configuration.api.getAvailableAccountTypes + "?query=apiumtech"
        }].forEach(function (test) {
                describe(test.message, function () {
                    it("should call ajaxService with correct params", function () {
                        exerciseTest(test.query);
                        expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                        expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(test.correctUrl);
                        expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('get');
                    });
                });
            });

        it("should call decorateAvailableAccountTypes", function () {
            exerciseTest();
            expect(sut.decorateAvailableAccountTypes).toHaveBeenCalled();
        });
    });

    describe("decorateAvailableAccountTypes", function () {
        it("should init 'availableAccountTypes' property if not initialized", function () {
            sut.availableAccountTypes = null;
            var result = [{
                id: 1,
                name: "user1"
            }, {
                id: 2,
                name: "user2"
            }];
            sut.decorateAvailableAccountTypes(result);
            expect(sut.availableAccountTypes).toEqual(result);
        });

        it("should merge 'availableAccountTypes' property if initialized", function () {
            sut.availableAccountTypes = [{
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
            sut.decorateAvailableAccountTypes(result);
            expect(sut.availableAccountTypes).toEqual(result);
        });
    });

    describe("getAvailableViews", function () {
        function exerciseTest(query) {
            spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseAjaxOk());
            spyOn(sut, 'decorateAvailableViews');
            sut.getAvailableViews(query);
        }

        [{
            message: "no query defined",
            query: null,
            correctUrl: Configuration.api.getAvailableViews
        }, {
            message: "has query",
            query: "apiumtech",
            correctUrl: Configuration.api.getAvailableViews + "?query=apiumtech"
        }].forEach(function (test) {
                describe(test.message, function () {
                    it("should call ajaxService with correct params", function () {
                        exerciseTest(test.query);
                        expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                        expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(test.correctUrl);
                        expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('get');
                    });
                });
            });

        it("should call decorateAvailableViews", function () {
            exerciseTest();
            expect(sut.decorateAvailableViews).toHaveBeenCalled();
        });
    });

    describe("decorateAvailableViews", function () {
        it("should init 'availableViews' property if not initialized", function () {
            sut.availableViews = null;
            var result = [{
                id: 1,
                name: "user1"
            }, {
                id: 2,
                name: "user2"
            }];
            sut.decorateAvailableViews(result);
            expect(sut.availableViews).toEqual(result);
        });

        it("should merge 'availableViews' property if initialized", function () {
            sut.availableViews = [{
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
            sut.decorateAvailableViews(result);
            expect(sut.availableViews).toEqual(result);
        });
    });
});

