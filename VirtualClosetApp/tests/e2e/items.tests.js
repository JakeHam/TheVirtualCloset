var basePath = browser.params.basePath;
var loginPage = require(basePath + '/tests/e2e/pages/LoginPage.js');
var myClosetPage = require(basePath + '/tests/e2e/pages/MyClosetPage.js');
var header = require(basePath + '/tests/e2e/pages/Header.js');
var newItemPage = require(basePath + '/tests/e2e/pages/NewItemPage.js');
var sidebar = require(basePath + '/tests/e2e/pages/Sidebar.js');
var optionsPage = require(basePath + '/tests/e2e/pages/OptionsPage.js');

var EC = protractor.ExpectedConditions;

describe('Items', function() {
  beforeAll(function() {
    loginPage.get();
    loginPage.fillEmail("jakehamelhs@gmail.com");
    loginPage.fillPass("testpass");
    loginPage.login();
    browser.wait(EC.urlContains('mycloset'), 5000);
  });

  describe('Add Item:', function() {

    it('Adding a tops item', function() {
      header.addNewItemButton.click();
      browser.wait(EC.urlContains('newItem'), 3000);
      newItemPage.topsOption.click();
      newItemPage.fillName("Shirt");
      newItemPage.fillBrand("Nike");
      newItemPage.fillColor("Red");
      newItemPage.saveItem();
      myClosetPage.topsButton.click();
      browser.wait(EC.urlContains('tops'), 3000);
      expect(element(by.css('div.item-content')).isPresent()).toBe(true);
      myClosetPage.get();
    });

    it('Resetting a closet', function() {
      sidebar.toggle();
      sidebar.clickOptionsLink();
      optionsPage.resetCloset();
      sidebar.toggle();
      sidebar.clickMyClosetLink();
      myClosetPage.topsButton.click();
      browser.wait(EC.urlContains('tops'), 3000);
      expect(element(by.css('div.item-content')).isPresent()).toBe(false);
    });
  });
});
