var PageObject = function(){
    var EC = protractor.ExpectedConditions;

    var widgetAdministration;

    this.get = function(){
        browser.get('#/analytics/distribution');
        widgetAdministration = {
            container: element(by.css('#WidgetAdministrationContainer')),
            toggleButton: element(by.css('.widget-administration-button'))
        };
        browser.wait(EC.and(
            EC.presenceOf(widgetAdministration.container),
            EC.presenceOf(widgetAdministration.toggleButton)
        ), 5000);
    };

    // -----------------------
    //  API
    // -----------------------

    this.isWidgetAdministrationContainerOpen = function(){
        return widgetAdministration.container.isDisplayed();
    };

    this.pressToggleButton = function(){
        return widgetAdministration.toggleButton.click();
    };
};

module.exports = PageObject;