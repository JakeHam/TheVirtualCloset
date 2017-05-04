var Sidebar = function() {
  EC = protractor.ExpectedConditions;

  this.menuButton = element(by.css('ion-side-menus [nav-bar="active"] [menu-toggle="left"]'));
  this.MyClosetLink = element(by.css('#myclosetlink a'));
  this.SearchLink = element(by.css('#searchlink a'));
  this.OutfitsLink = element(by.css('#outfitslink a'));
  this.CalendarLink = element(by.css('#calendarlink a'));
  this.WishListLink = element(by.css('#wishlistlink a'));
  this.ConnectionsLink = element(by.css('#connectionslink a'));
  this.OptionsLink = element(by.css('#optionslink a'));
  this.LogoutLink = element(by.css('#logoutlink a'));

  // no way to tell if open or not, so we toggle instead
  this.toggle = function() {
    this.menuButton.click();
  },
  this.clickMyClosetLink = function() {
    browser.wait(EC.elementToBeClickable(this.MyClosetLink), 3000);
    browser.actions().mouseMove(this.MyClosetLink).click().perform();
  },
  this.clickSearchLink = function() {
    browser.wait(EC.elementToBeClickable(this.SearchLink), 3000);
    browser.actions().mouseMove(this.SearchLink).click().perform();
  },
  this.clickOutfitsLink = function() {
    browser.wait(EC.elementToBeClickable(this.OutfitsLink), 3000);
    browser.actions().mouseMove(this.OutfitsLink).click().perform();
  },
  this.clickCalendarLink = function() {
    browser.wait(EC.elementToBeClickable(this.CalendarLink), 3000);
    browser.actions().mouseMove(this.CalendarLink).click().perform();
  },
  this.clickWishListLink = function() {
    browser.wait(EC.elementToBeClickable(this.WishListLink), 3000);
    browser.actions().mouseMove(this.WishListLink).click().perform();
  },
  this.clickConnectionsLink = function() {
    browser.wait(EC.elementToBeClickable(this.ConnectionsLink), 3000);
    browser.actions().mouseMove(this.ConnectionsLink).click().perform();
  },
  this.clickOptionsLink = function() {
    browser.wait(EC.elementToBeClickable(this.OptionsLink), 3000);
    browser.actions().mouseMove(this.OptionsLink).click().perform();
  },
  this.clickLogoutLink = function() {
    browser.wait(EC.elementToBeClickable(this.LogoutLink), 3000);
    browser.actions().mouseMove(this.LogoutLink).click().perform();
  }

};

module.exports = new Sidebar();
