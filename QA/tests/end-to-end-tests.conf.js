exports.config = {
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            args: ['--disable-web-security']
        }
    },
    baseUrl: 'http://localhost:8100',
    specs: [
        'end-to-end-tests/**/*.tests.js'
    ],
    jasmineNodeOpts: {
        isVerbose: true
    }
};