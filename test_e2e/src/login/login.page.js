var LoginPage = function(){
    browser.get('/');
};

LoginPage.prototype = Object.create({
    usernameField: { get: function () { return element(by.model('data.loginUser')); }}
});

module.exports = LoginPage;