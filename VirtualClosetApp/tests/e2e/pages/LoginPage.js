var LoginPage = function() {
  EC = protractor.ExpectedConditions;

  this.emailInput = element(by.model('$parent.email')),
  this.passInput = element(by.model('$parent.password')),
  this.loginButton = element(by.css('input.loginButton[ng-click="loginToAccount()"]')),
  this.signUpButton = element(by.css('input.loginButton[ng-click="toRegisterPage()"]')),

  this.get = function() {
    browser.get('#/app/login');
  },
  this.fillEmail = function(email) {
    this.emailInput.clear();
    this.emailInput.sendKeys(email);
  },
  this.fillPass = function(password) {
    this.passInput.clear();
    this.passInput.sendKeys(password);
  },
  this.login = function() {
    browser.wait(EC.elementToBeClickable(this.loginButton), 1000);
    this.loginButton.click();
  },
  this.toSignUpPage = function() {
    browser.wait(EC.elementToBeClickable(this.signUpButton), 1000);
    this.signUpButton.click();
  }
};

module.exports = new LoginPage();
