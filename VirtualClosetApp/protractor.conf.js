exports.config = {
  framework: 'jasmine',

  instrument: {
    files: './tests/end-to-end-tests/**/*.js',
    options: {
      lazy: true,
      basePath: "instrumented"
    }
  },

  params: {
    basePath: __dirname,
    baseUrl: 'http://192.168.1.44:8100/#/app/'
  },

  onPrepare: function() {
    var jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter( {
      consolidateAll: true,
      savePath:       './tests/testresults',
      filePrefix:     'xmloutput'
    }));

    var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
    jasmine.getEnv().addReporter(new SpecReporter( {
      displayStacktrace: true,
      displayFailuresSummary: true,
      displayPendingSummary: true,
      displaySuccessfulSpec: true,
      displayFailedSpec: true,
      displayPendingSpec: true,
      displaySpecDuration: true,
      displaySuiteNumber: false,
      colors: {
        success: 'green',
        failure: 'red',
        pending: 'yellow'
      },
      customProcessors: []
    }));
  },

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      args: ['--disable-web-security']
    }
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://10.140.17.67:8100',
  suites: {
    login: './tests/e2e/login.tests.js',
    navigation: './tests/e2e/navigation.tests.js',
    account: './tests/e2e/account.tests.js',
    items: './tests/e2e/items.tests.js'
  }
};
