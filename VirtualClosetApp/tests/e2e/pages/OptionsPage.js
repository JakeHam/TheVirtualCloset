var OptionsPage = function() {
  EC = protractor.ExpectedConditions;

  this.resetClosetButton = element(by.css('input.loginButton[ng-click="resetCloset()"]')),
  this.deleteAccountButton = element(by.css('input.loginButton[ng-click="deleteAccount()"]')),
  this.confirmationButton = element(by.css('div.popup-buttons button.button-positive')),

  this.deleteAccount = function() {
    browser.wait(EC.elementToBeClickable(this.deleteAccountButton), 1000);
    this.deleteAccountButton.click();
    browser.wait(EC.elementToBeClickable(this.confirmationButton), 1000);
    this.confirmationButton.click();
  },
  this.resetCloset = function() {
    browser.wait(EC.elementToBeClickable(this.resetClosetButton), 1000);
    this.resetClosetButton.click();
    browser.wait(EC.elementToBeClickable(this.confirmationButton), 1000);
    this.confirmationButton.click();
  }
};

module.exports = new OptionsPage();
