define([
    'shared/BaseView',
    'modules/account/widgets/documents/documentPreview/DocumentPreviewView'
], function (BaseView, DocumentPreviewView) {
    'use strict';

    describe('DocumentPreviewView Test', function () {
        var sut;
        beforeEach(function () {
            sut = new DocumentPreviewView();
        });

        describe("show", function () {
            beforeEach(function(){
                sinon.stub(BaseView.prototype, 'show');
                sinon.stub(sut, 'configureEvents');
            });

            afterEach(function() {
                BaseView.prototype.show.restore();
            });

            it("should call BaseView's show method", function () {
                sut.show();
                expect(BaseView.prototype.show).toHaveBeenCalled();
            });

            it("should call configure events to configure interaction events", function () {
                sut.show();
                expect(sut.configureEvents).toHaveBeenCalled();
            });
        });
    });
});