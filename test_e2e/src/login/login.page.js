var LoginPage = function(){
    var EC = protractor.ExpectedConditions;
    var LoginServer = require('./login.server');

    var mockServer = new LoginServer();
    mockServer.start();


    browser.get('#/login');

    var usernameField = element(by.model('data.loginUser'));
    var passwordField = element(by.model('data.loginPassword'));
    var loginButton = element(by.css('#loginButton'));
    var errorMessageElement = element(by.model('data.errorMessage'));

    browser.wait(EC.and(
        EC.presenceOf(usernameField),
        EC.presenceOf(passwordField),
        EC.presenceOf(loginButton)
    ), 5000);


    this.typeUsername = function (keys) { usernameField.sendKeys(keys); };
    this.typePassword = function (keys) { passwordField.sendKeys(keys); };
    this.login = function () { loginButton.click(); };
    this.clearFields = function () {
        usernameField.clear();
        passwordField.clear();
    };
    this.getErrorMessageElementContent = function() {
        return errorMessageElement.getText();
    };


    // ------------------------------------
    //
    //  ExpectedConditions
    //
    // ------------------------------------

    this.waitForUrlToChange = function(currentUrl, timeout) {
        var waitForChange = function() {
            return browser.getCurrentUrl().then(function(url) {
                return url.indexOf(currentUrl) === -1;
            });
        };
        var condition = EC.and(waitForChange);
        browser.wait(condition, timeout);
    };

    this.waitForErrorMessageToBeShown = function(timeout) {
        browser.wait(EC.and(EC.presenceOf(errorMessageElement)), timeout);
    };
};

module.exports = LoginPage;