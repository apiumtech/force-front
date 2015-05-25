var LoginPage = require('./login.page');

describe('Login page', function() {
    var page;

    beforeEach(function(){
        page = new LoginPage();
    });

    it('should be in /login', function() {
        expect(browser.getCurrentUrl()).toMatch(/#\/login/);
    });

    it('should redirect to another url after successful login', function() {
        page.clearFields();
        page.typeUsername('bruno_test@gmail.com');
        page.typePassword('dimarts1*');
        page.login();
        page.waitForUrlToChange("#/login", 5000);

        expect(browser.getCurrentUrl()).not.toMatch(/#\/login/);
    });

    it('should show an error message after failing to login', function(){
        page.clearFields();
        page.typeUsername('xxx@xxx.xxx');
        page.typePassword('0123abcd');
        page.login();
        page.waitForErrorMessageToBeShown(3000);

        expect(page.getErrorMessageElementContent().length).toBeGreaterThan(1);
    });


});