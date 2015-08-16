var PageObject = require('./distribution.page');

describe('Distribution page', function() {
    var page;

    beforeEach(function(){
        page = new PageObject();
    });

    it('should be in analytics/distribution', function() {
        expect(browser.getCurrentUrl()).toMatch(page.urlHash);
    });
});