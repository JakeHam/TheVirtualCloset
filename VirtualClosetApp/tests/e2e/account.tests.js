var basePath = browser.params.basePath;
var loginPage = require(basePath + '/tests/e2e/pages/LoginPage.js');
var signUpPage = require(basePath + '/tests/e2e/pages/SignUpPage.js');
var sidebar = require(basePath + '/tests/e2e/pages/Sidebar.js');
var optionsPage = require(basePath + '/tests/e2e/pages/OptionsPage.js');
var myClosetPage = require(basePath + '/tests/e2e/pages/MyClosetPage.js');

EC = protractor.ExpectedConditions;

var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
var randEmail = '';
for (var i=0; i<8; i++) {
    randEmail += chars[Math.floor(Math.random() * chars.length)];
}
randEmail += '@example.com';

describe('Account:', function() {
  /* Setup */
  beforeAll(function() {
    loginPage.get();
    loginPage.toSignUpPage();
  });

  it('Create an account', function() {
    signUpPage.fillEmail(randEmail);
    signUpPage.fillPass('testpass');
    signUpPage.signUp();
    browser.wait(EC.visibilityOf(myClosetPage.topsButton), 1000);
    expect(browser.getCurrentUrl()).toContain('mycloset');
  });
  it('Delete account', function() {
    sidebar.toggle();
    sidebar.clickOptionsLink();
    optionsPage.deleteAccount();
    expect(browser.getCurrentUrl()).toContain('login');
  })
});
