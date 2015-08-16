var DistributionPage = require('../distribution/distribution.page');

module.exports = function () {

    this.Given("I'm logged In", function (callback) {
        // TODO: implement login
        callback.pending();
    });

    this.Given("I'm on the distribution page", function () {
        this.page = new DistributionPage();
        return this.page.get();
    });

    this.Then("the panel should not be opened", function (callback) {
        var isOpen = this.page.isWidgetAdministrationContainerOpen();
        if (isOpen) {
            callback.fail(new Error("The Panel should not be opened"));
        } else {
            callback();
        }
    });


    this.When("I press the Widget Administration button", function () {
        return page.pressToggleButton();
    });

    this.Then("the panel should be opened", function (callback) {
        var isOpen = this.page.isWidgetAdministrationContainerOpen();
        if (isOpen) {
            callback();
        } else {
            callback.fail(new Error("The panel should be opened"));
        }
    });


};