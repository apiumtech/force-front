var LoginPage = function(){
    browser.get('http://localhost:8081');
};

LoginPage.prototype = Object.create({
    usernameField: { get: function () { return element(by.model('data.loginUser')); }}
});

module.exports = LoginPage;