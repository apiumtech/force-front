var PageObject = require('./widgetAdministration.page');

describe('Widget Administration', function() {
    var page;

    beforeEach(function(){
        page = new PageObject();
    });

    it('should be in analytics/distribution', function() {
        expect(browser.getCurrentUrl()).toMatch(page.distributionUrlHash);
    });

    describe("toggled state", function () {
        it('should be closed by default', function() {
            expect( page.isMainContainerOpen() ).toBe(false);
        });
        it('should be opened when pressing the administration button', function() {
            page.pressMainContainerToggleButton();
            expect( page.isMainContainerOpen() ).toBe(true);
        });
    });

    xdescribe("loading state", function () {
        it('should display loading spinner while loading widgets', function() {
            expect( page.isSpinnerVisible() ).toBe(true);
        });
    });

});