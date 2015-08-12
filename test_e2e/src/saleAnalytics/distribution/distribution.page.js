var PageObject = function(){
    var EC = protractor.ExpectedConditions;

    browser.get('#/analytics/distribution');

    var widgetAdministration = {
        container: element(by.css('#WidgetAdministrationContainer')),
        toggleButton: element(by.css('.widget-administration-button'))
    };

    browser.wait(EC.and(
        EC.presenceOf(widgetAdministration.container),
        EC.presenceOf(widgetAdministration.toggleButton)
    ), 5000);


    // -----------------------
    //  API
    // -----------------------

    this.isWidgetAdministrationContainerOpen = function(){
        return widgetAdministration.container.isDisplayed();
    };
};

module.exports = PageObject;