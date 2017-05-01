var SignUpPage = function() {
  EC = protractor.ExpectedConditions;

  this.emailInput = element(by.css('input#email')),
  this.passInput = element(by.css('input#password')),
  this.submitButton = element(by.css('input#registerButton')),

  this.fillEmail = function(email) {
    this.emailInput.clear();
    this.emailInput.sendKeys(email);
  },
  this.fillPass = function(password) {
    this.passInput.clear();
    this.passInput.sendKeys(password);
  },
  this.signUp = function() {
    browser.wait(EC.elementToBeClickable(this.submitButton), 1000);
    this.submitButton.click();
  }
};

module.exports = new SignUpPage();
