var LoginPage = function(){
    browser.get('#/login');
};

LoginPage.prototype = Object.create({
    usernameField: { get: function () { return element(by.model('data.loginUser')); }}
});

module.exports = LoginPage;