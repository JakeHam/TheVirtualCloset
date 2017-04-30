var Sidebar = function() {
  EC = protractor.ExpectedConditions;

  this.menuButton = element.all(by.css('button.button.button-icon.button-clear.ion-navicon')).first();
  this.sidemenu = element(by.css('ion-side-menu.menu.menu-left'));
  this.MyClosetLink = element(by.id('myclosetlink'));
  this.SearchLink = element(by.id('searchlink'));
  this.OutfitsLink = element(by.id('outfitslink'));
  this.CalendarLink = element(by.id('calendarlink'));
  this.WishListLink = element(by.id('wishlistlink'));
  this.ConnectionsLink = element(by.id('connectionslink'));
  this.OptionsLink = element(by.id('optionslink'));
  this.LogoutLink = element(by.id('optionslink'));

  // no way to tell if open or not, so we toggle instead
  this.toggle = function() {
    this.menuButton.click();
    browser.wait(EC.visibilityOf(this.sidemenu), 5000);
    browser.driver.sleep(10000);
  },
  this.clickMyClosetLink = function() {
    browser.wait(EC.elementToBeClickable(this.MyClosetLink), 3000);
    browser.actions().mouseMove(this.MyClosetLink).click().perform();
  },
  this.clickSearchLink = function() {
    browser.wait(EC.elementToBeClickable(this.SearchLink), 3000);
    browser.actions().mouseMove(this.SearchLink).click().perform()
  },
  this.clickOutfitsLink = function() {
    browser.wait(EC.elementToBeClickable(this.OutfitsLink), 3000);
    browser.actions().mouseMove(this.OutfitsLink).click().perform()
  },
  this.clickCalendarLink = function() {
    browser.wait(EC.elementToBeClickable(this.CalendarLink), 3000);
    this.CalendarLink.click();
  },
  this.clickWishListLink = function() {
    browser.wait(EC.elementToBeClickable(this.WishListLink), 3000);
    this.WishListLink.click();
  },
  this.clickConnectionsLink = function() {
    browser.wait(EC.elementToBeClickable(this.ConnectionsLink), 3000);
    this.ConnectionsLink.click();
  },
  this.clickOptionsLink = function() {
    browser.wait(EC.elementToBeClickable(this.OptionsLink), 3000);
    this.OptionsLink.click();
  },
  this.clickLogoutLink = function() {
    browser.wait(EC.elementToBeClickable(this.LogoutLink), 3000);
    this.LogoutLink.click();
  }

};

module.exports = new Sidebar();
