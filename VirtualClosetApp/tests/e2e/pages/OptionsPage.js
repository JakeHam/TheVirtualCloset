var OptionsPage = function() {
  EC = protractor.ExpectedConditions;

  this.deleteAccountButton = element(by.css('input.loginButton[ng-click="deleteAccount()"]')),
  this.deleteConfirmationButton = element(by.css('div.popup-buttons button.button-positive')),

  this.deleteAccount = function() {
    browser.wait(EC.elementToBeClickable(this.deleteAccountButton), 1000);
    this.deleteAccountButton.click();
    browser.wait(EC.elementToBeClickable(this.deleteConfirmationButton), 1000);
    this.deleteConfirmationButton.click();
  }
};

module.exports = new OptionsPage();
