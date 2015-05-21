exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',

    framework: 'jasmine2',

    //Says in which browsers the tests should run
    multiCapabilities: [
        {
            'browserName' : 'chrome'
        }
    ],

    //Configure the browser to your tests
    onPrepare: function() {
        browser.driver.manage().window().setSize(1024, 800);
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true,
        includeStackTrace: true
    },

    specs: ['src/**/*.test.js'],

    baseUrl: 'http://localhost:8081'
}