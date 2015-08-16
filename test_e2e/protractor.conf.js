exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',

    //Says in which browsers the tests should run
    multiCapabilities: [
        {
            'browserName' : 'chrome',
            'chromeOptions': {
                'args': ['--disable-web-security']// to avoid CORS issues
            }
        }
    ],

    //Configure the browser to your tests
    onPrepare: function() {
        browser.driver.manage().window().setSize(1280, 800);
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true,
        includeStackTrace: true
    },

    //framework: 'cucumber',
    //specs:     ['features/**/*.feature'],

    framework: 'jasmine2',
    specs:     ['src/**/*.test.js'],

    baseUrl: 'http://localhost:8085'
}