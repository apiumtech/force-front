var DistributionPage = require('./distribution.page');

describe('Distribution page', function() {
    var page;

    beforeEach(function(){
        page = new DistributionPage();
    });

    it('should be in analytics/distribution', function() {
        expect(browser.getCurrentUrl()).toMatch(/#\/analytics\/distribution/);
    });

    describe("WidgetAdministration", function () {
        it('should be closed by default', function() {
            expect( page.isWidgetAdministrationContainerOpen() ).toBe(false);
        });
    });

});