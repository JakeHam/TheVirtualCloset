var LoginPage = function() {
  this.emailInput = element(by.model('$parent.email')),
  this.passInput = element(by.model('$parent.password')),
  this.loginButton = element(by.css('input.loginButton')),

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
    this.loginButton.click();
  }
};

module.exports = new LoginPage();
