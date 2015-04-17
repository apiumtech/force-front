var LoginPage = require('./login.page');
var LoginServer = require('./login.server');

describe('angularjs login page', function() {

    var page;

    beforeEach(function(){
        page = new LoginPage();
        browser.driver.executeScript(LoginServer.mock);
    });

    it('should redirect to /login', function() {
        expect(browser.driver.executeScript( 'return FakeXMLHttpRequest.LOADING;' )).toBe('3');
        expect(browser.getCurrentUrl()).toMatch(/#\/login/);
    });


});