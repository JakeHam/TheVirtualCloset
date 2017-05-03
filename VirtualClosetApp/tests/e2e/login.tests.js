var basePath = browser.params.basePath;
var loginPage = require(basePath + '/tests/e2e/pages/LoginPage.js');
var myClosetPage = require(basePath + '/tests/e2e/pages/myClosetPage.js');

EC = protractor.ExpectedConditions;

describe('Login:', function() {
  beforeEach(function() {
    loginPage.get();
  });

  it('Invalid input should not progress', function() {
    loginPage.fillEmail('garbage');
    loginPage.fillPass('garbage');
    loginPage.login();
    expect(browser.getCurrentUrl()).toContain('login');
  });
  
  it('Valid input should progress', function() {
    loginPage.fillEmail('jakehamelhs@gmail.com');
    loginPage.fillPass('testpass');
    loginPage.login();
    browser.wait(EC.visibilityOf(myClosetPage.topsButton), 1000);
    expect(browser.getCurrentUrl()).toContain('mycloset');
  })
});
