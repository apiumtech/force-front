var LoginPage = require('./login.page.js');

describe('angularjs login page', function() {

    var page;

    beforeEach(function(){
        page = new LoginPage();
    });

    it('should redirect to /login', function() {
        expect(browser.getCurrentUrl()).toMatch(/#\/login/);
    });

});