define([
    'shared/BaseView',
    'modules/account/addContact/AddContactView'
], function (BaseView, AddContactView) {
    'use strict';

    describe('AddContactView Test', function () {
        var sut;
        beforeEach(function () {
            sut = new AddContactView();
        });
        describe("show", function () {
            beforeEach(function () {
                sinon.stub(BaseView.prototype, 'show');
                sinon.stub(AddContactView.prototype, 'configureEvents');
            });
            afterEach(function () {
                BaseView.prototype.show.restore();
                AddContactView.prototype.configureEvents.restore();
            });

            beforeEach(function () {
                sut.show();
            });
            it("should call BaseView show method", function () {
                expect(BaseView.prototype.show).toHaveBeenCalled();
            });
            it("should call configureEvents method", function () {
                expect(AddContactView.prototype.configureEvents).toHaveBeenCalled();
            });
        });
    });
});