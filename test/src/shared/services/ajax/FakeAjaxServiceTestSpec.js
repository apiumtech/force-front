/**
 * Created by justin on 3/30/15.
 */
define(['shared/services/ajax/FakeAjaxService'], function (FakeAjaxService) {
    'use strict';
    describe("FakeAjaxService", function () {

        var sut;

        beforeEach(function () {
            sut = FakeAjaxService.newInstance();
        });

        describe("rawAjaxRequest", function () {
            describe("Making request", function () {
                it("should return promise with data from input result", function (done) {
                    var input = [{
                        fake: "fake data",
                        id: "123"
                    }, {
                        fake: "fake data2",
                        id: "456"
                    }];

                    sut.rawAjaxRequest({
                        result: input
                    }).then(function (data) {
                        expect(data).toEqual(input);
                        done()
                    });
                });
            });
        });
    });
});