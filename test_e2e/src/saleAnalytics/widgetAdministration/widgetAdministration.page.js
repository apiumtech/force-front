var PageObject = function(){
    var EC = protractor.ExpectedConditions;

    this.distributionUrlHash = /#\/analytics\/distribution/;
    browser.get('#/analytics/distribution');

    var pageElements = {
        container: element(by.css('#WidgetAdministrationContainer')),
        toggleButton: element(by.css('.widget-administration-button'))
    };

    browser.wait(EC.and(
        EC.presenceOf(pageElements.container),
        EC.presenceOf(pageElements.toggleButton)
    ), 5000);


    // -----------------------
    //  API
    // -----------------------

    this.isMainContainerOpen = function(){
        return pageElements.container.isDisplayed();
    };

    this.pressMainContainerToggleButton = function(){
        return pageElements.toggleButton.click();
    };
};

module.exports = PageObject;